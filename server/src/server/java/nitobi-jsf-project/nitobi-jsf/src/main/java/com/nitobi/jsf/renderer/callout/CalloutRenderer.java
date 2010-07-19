/**
 * User: Eric Buitenhuis 
 * Date: Apr 28, 2008
 * Time: 12:06:20 AM
 */

package com.nitobi.jsf.renderer.callout;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.callout.CalloutTag;

import javax.faces.FacesException;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Logger;

/**
 * CalloutRenderer -
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class CalloutRenderer extends NitobiRenderer {

    private static final String VARIABLE_NAME = "this.cv";

    @Override
    public void encodeBegin(FacesContext context, UIComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();

        String viewId = context.getViewRoot().getViewId();
        String clientId = component.getClientId(context);
        clientId = clientId.replace(':','_');   // just in case this is put inside a form
        Map<String, Object> attributes = component.getAttributes();

        /*
         * Grab the attribute values
         */
        String style = (String)attributes.get(CalloutTag.STYLE_ATTNAME);
        String triggerEvent = (String)attributes.get(CalloutTag.TRIGGER_EVENT_ATTNAME);
        String triggerSourceDOM = (String)attributes.get(CalloutTag.TRIGGER_SOURCE_DOM_ATTNAME);
        Boolean displayJSFMessage = (Boolean)attributes.get(CalloutTag.DISPLAY_JSF_MESSAGE_ATTNAME);
        String movetoX = (String)attributes.get(CalloutTag.MOVETO_X_ATTNAME);
        String movetoY = (String)attributes.get(CalloutTag.MOVETO_Y_ATTNAME);
        Integer expireTime = (Integer)attributes.get(CalloutTag.EXPIRE_TIME_ATTNAME);
        Integer sizeX = (Integer)attributes.get(CalloutTag.SIZE_X_ATTNAME);
        Integer sizeY = (Integer)attributes.get(CalloutTag.SIZE_Y_ATTNAME);
        String attachToElement = (String)attributes.get(CalloutTag.ATTACH_TO_ELEMENT_ATTNAME);
        Integer direction = (Integer)attributes.get(CalloutTag.DIRECTION_ATTNAME);
        String title = (String)attributes.get(CalloutTag.TITLE_ATTNAME);
        String body = (String)attributes.get(CalloutTag.BODY_ATTNAME);
        String onAppear = (String)attributes.get(CalloutTag.ON_APPEAR_ATTNAME);
        String onDestroy = (String)attributes.get(CalloutTag.ON_DESTROY_ATTNAME);



        /*
         * Evaluate whether or not we need to render custom messages, JSF messages, or nothing.
         */
        boolean needsRendering = false;
        Iterator<FacesMessage> messagesToDisplay = null;
        
        if(displayJSFMessage != null && displayJSFMessage) {
            /*
             * Grab any clientIdsWithMessages that have been registered with JSF
             */
            Iterator<String> clientIdsWithMessages = context.getClientIdsWithMessages();
            if(clientIdsWithMessages.hasNext()) {
                /*
                 * There are clientIdsWithMessages
                 */
                if(attachToElement == null) {
                    /*
                     * We must display all clientIdsWithMessages
                     */
                    messagesToDisplay = context.getMessages();
                } else {
                    while(clientIdsWithMessages.hasNext()) {
                        if(attachToElement.equals(clientIdsWithMessages.next())) {
                            /*
                             * There is a match, so we have to display only the message for the attachToElement
                             */
                            messagesToDisplay = context.getMessages(attachToElement);
                            needsRendering = true;
                            break;
                        }
                    }
                }
            } else {
                /*
                 * There are no clientIdsWithMessages
                 */
                needsRendering = false;
            }
        } else {
            /*
             * This callout has to display custom messages instead of JSF messages
             */
            needsRendering = true;
        }

        if(needsRendering) {
            /*
             * write the includes
             */
            prepareRequiredIncludes(writer, component, context, getRequiredScripts(), getRequiredStyles());

            writer.startElement(getTagName(), component);
            writer.writeAttribute("type","text/javascript",null);
            writer.writeText(ENDL, null);
            StringBuffer sb = new StringBuffer();

            /*
             * create a namespace for the function
             */
            sb.append("nitobi.lang.defineNs(\"").append(clientId).append("\");\n");    // nitobi.lang.defineNs("myClientId");



            /*
             * Create the javascript function that will show the callout
             */
            sb.append(clientId).append(".show").append("=function() {\n");
            //sb.append("function show").append(clientId).append("() {\n") ;

            /*
             * Create the callout object
             */
            sb.append(VARIABLE_NAME).append("= new nitobi.callout.Callout(");
            if(style != null) {
                sb.append("'").append(style).append("'");
            }
            sb.append(");\n");


            /*
             * The movetoX and movetoY cannot exist one without the other. Either they are both null or both populated or
             * this will throw an exception.
             */
            boolean isMovetoSet = false;
            if((movetoX == null) ^ (movetoY == null)) {
                throw new FacesException("The Nitobi Callout located in " + viewId + ", a movetoX cannot exist without a movetoY, and vise versa.");
            } else {
                if(movetoX != null) { // if movetoX is not null, then we know movetoY can't be either becuase of the XOR we just did.
                    isMovetoSet = true;
                    sb.append(VARIABLE_NAME).append(".moveTo(").append(movetoX).append(",").append(movetoY).append(");\n");
                }
            }

            /*
             * Set the expire time
             */
            if(expireTime != null) {
                sb.append(VARIABLE_NAME).append(".setExpire(").append(expireTime).append(");\n");
            }

            /*
             * Set the onAppear
             */
            if(onAppear != null) {
                sb.append(VARIABLE_NAME).append(".setOnAppear('").append(onAppear).append("');\n");
            }

            /*
             * Set the onDestroy
             */
            if(onDestroy != null) {
                sb.append(VARIABLE_NAME).append(".setOnDestroy('").append(onDestroy).append("');\n");
            }

            /*
             * Attach the callout to an element
             */
            if(attachToElement == null) {
                if(!isMovetoSet) {
                    throw new FacesException("A problem exists in the Nitobi Callout located in " + viewId + ". If the moveto attributes are not both set, you must attach it to a DOM element.");
                }
            } else {
                sb.append(VARIABLE_NAME).append(".attachToElement('").append(attachToElement).append("');\n");
            }

            /*
             * Set the direction of the tail
             *
             * 1 - Bottom right
             * 2 - Bottom left
             * 3 - Top left
             * 4 - Top right
             * 5 - Left Top
             * 6 - Left Bottom
             * 7 - Right Top
             * 8 - Right Bottom
             *
             */
            if(direction != null) {
                sb.append(VARIABLE_NAME).append(".setCalloutDirection('").append(direction).append("');\n");
            }

            /*
             * Determine whether we need to print out a custom message or a JSF message. At this point, if there are
             * any messagesToDisplay, we need to print the JSF message. If messagesToDisplay is null, then we need to do the custom message.
             */
            if(messagesToDisplay != null) {

                StringBuffer msgBuffer = new StringBuffer();
                msgBuffer.append("<ul>");
                while(messagesToDisplay.hasNext()) {
                    FacesMessage msg = messagesToDisplay.next();
                    msgBuffer.append("<li>").append(msg.getDetail()).append("</li>");
                }
                msgBuffer.append("</ul>");

                sb.append(VARIABLE_NAME).append(".setTitle('Message');\n");
                sb.append(VARIABLE_NAME).append(".setBody('").append(msgBuffer.toString()).append("');\n");
                
            } else {

                /*
                 * One or both of the title or body must exist.
                 */
                if(title == null) {
                    if(body == null) {
                        throw new FacesException("The Callout located in " + viewId + " must contain either a title or a body" );
                    } else {
                        sb.append(VARIABLE_NAME).append(".setBody('").append(body).append("');\n");
                    }
                } else {
                    if(body == null) {
                        sb.append(VARIABLE_NAME).append(".setTitle('").append(title).append("');\n");
                    } else {
                        sb.append(VARIABLE_NAME).append(".setTitle('").append(title).append("');\n");
                        sb.append(VARIABLE_NAME).append(".setBody('").append(body).append("');\n");
                    }
                }
            }

            /*
             * Show the callout
             */
            sb.append(VARIABLE_NAME).append(".show();\n");

            /*
             * end the function
             */
            sb.append("};\n");

            /*
             * Set up an event that will show the callout. Both must be populated or else it will just load with the window load event.
             */
            if(triggerSourceDOM != null && triggerEvent != null) {
                // nitobi.html.attachEvent($('myTriggerDOMElement'), "click", myClientId.show);
                sb.append(clientId).append(".init=function(){");
                sb.append("nitobi.html.attachEvent($('").append(triggerSourceDOM).append("'),\"").append(triggerEvent).append("\", ").append(clientId).append(".show);\n\n");
                sb.append("};");

                /*
                 * create a bootstrapping function 
                 */
                sb.append("nitobi.html.attachEvent(window, \"load\",").append(clientId).append(".init);");

            } else {
                sb.append("nitobi.html.attachEvent(window,\"load\", ").append(clientId).append(".show);\n\n");
            }

            /*
             * output the whole deal
             */
            writer.write(sb.toString());

        } else {
            /*
             * We don't need to render anything for this
             */
        }
    }

    /**
     * Grab all the required scripts for this component. No script request will be rendered more than once in a given
     * session.
     *
     * @return Array of String objects with the required scripts
     */
    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.CALLOUT};
    }

    /**
     * Grab all the styles this component requires. The output will include links to each. No repeat style
     * references will be outputted. The repeats are tracked at the request level.
     *
     * @return Array of Strings with all the stylesheet names
     */
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.CALLOUT_STYLE};
    }

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return "script";
    }

}
