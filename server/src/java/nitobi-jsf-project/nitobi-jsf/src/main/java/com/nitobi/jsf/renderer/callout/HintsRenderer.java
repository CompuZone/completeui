/**
 * User: Eric Buitenhuis 
 * Date: Apr 27, 2008
 * Time: 12:39:56 PM
 */

package com.nitobi.jsf.renderer.callout;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.callout.UIHint;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.callout.HintsTag;

import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * HintsRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class HintsRenderer extends NitobiRenderer {

    private static Logger logger = Logger.getLogger(HintsRenderer.class.getName());

    @Override
    public void encodeBegin(FacesContext context, UIComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String clientId = component.getClientId(context);
        Map<String, Object> attributes = component.getAttributes();

        /*
         * Grab the attribute values
         */
        Integer timerLength = (Integer) attributes.get(HintsTag.TIMER_LENGTH_ATTNAME);
        Integer expireTimeout = (Integer)attributes.get(HintsTag.EXPIRE_TIMEOUT_ATTNAME);

        /*
         * write the includes
         */
        prepareRequiredIncludes(writer, component, context, getRequiredScripts(), getRequiredStyles());


        writer.startElement(getTagName(), component);
        writer.writeAttribute("type","text/javascript",null);
        writer.writeText(ENDL, null);
        StringBuffer sb = new StringBuffer("var ");

        if(timerLength == null) {
            if(expireTimeout == null) {
                sb.append(clientId).append(" = new nitobi.callout.Hint(null, null);");    // = new nitobi.callout.Hint(null, null);
            } else {
                sb.append(clientId).append(" = new nitobi.callout.Hint(null,'").append(expireTimeout).append("');"); // = new nitobi.callout.Hint(null,'expireTimeout');
            }
        } else {
            if(expireTimeout == null) {
                sb.append(clientId).append(" = new nitobi.callout.Hint('").append(timerLength).append("',null);"); // = new nitobi.callout.Hint('timerLength',null);
            } else {
                sb.append(clientId).append(" = new nitobi.callout.Hint('").append(timerLength).append("','").append(expireTimeout).append("');"); // = new nitobi.callout.Hint('timerLength','expireTimeout');
            }
        }
        writer.write(sb.toString());
    }

    @Override
    public boolean getRendersChildren() {
        return false;
    }

    @Override
    public void encodeChildren(FacesContext facesContext, UIComponent uiComponent) throws IOException {
        super.encodeChildren(facesContext, uiComponent);

        if(uiComponent.getChildCount() > 0) {
            List<UIComponent> children = uiComponent.getChildren();
            for(UIComponent child: children) {
                if(child instanceof UIHint) {
                    if(logger.isLoggable(Level.FINE)) {
                        logger.log(Level.FINE,"Processing child: " + child.getClientId(facesContext));
                    }
                    child.encodeBegin(facesContext);
                } else {
                    throw new FacesException("The UIHints component contains a child class of type: "+ child.getClass().getName() +". A Nitobi JSF UIHints component can only have UIHint components as children.");
                }
            }
        } else {
            logger.info("A Nitobi JSF UIHints component has been created without any children.");
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
     * Whether or not the component requires the <?XML:NAMESPACE prefix="ntb" /> printed before the component.
     * Generally, this is true if the component is a parent, but the children components do not need this as long as you
     * include it for the parent.
     *
     * @return true if you want the namespace declaration
     */
    protected boolean needsXmlNamespaceDecl() {
        return false;
    }

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return "script";
    }

    /**
     * Whether or not you want the id attribute printed with the output.
     *
     * @return true if you want the id of the component printed
     */
    protected boolean printId() {
        return false;
    }

    /**
     * Grab a Map of all the passthrough attributes this component will need to output. The
     * Map key needs to be the literal text that will be sent to the client, and
     * the Map value is the variable name used to lookup the value in the component.
     *
     * @return a map of output text -> variable name
     */
    protected Map<String, String> getPassthroughAttributes() {
        return null;
    }

    /**
     * For the cases where the outputted attributes do not grab the value directly
     * from the component. This method will grab the additional, derived attributes and
     * write them to the output.
     *
     * @param component
     * @param context
     */
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        return null;
    }
}
