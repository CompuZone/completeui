/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.jsf.listener.NitobiGetPhaseListener;
import com.nitobi.type.NitobiAttribute;

import javax.el.ELContext;
import javax.el.Expression;
import javax.el.ExpressionFactory;
import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.render.Renderer;
import javax.faces.FacesException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public abstract class NitobiRenderer extends Renderer {

    private static final Logger logger = Logger.getLogger(NitobiRenderer.class.getName());

    private static final String NAMESPACE_TEXT = "<?XML:NAMESPACE prefix=\"ntb\" />";

    /*
     * Common String fragments to be used with StringBuffer. According to the StringBuffer docs, appending
     * a char value is the same as String.valueOf('c'), which means it will create a string every time anyway.
     * Thus, creating a single-character static final String would save the step of creating a new String
     * object every time.
     */
    public static final String ENDL = "\n";
    public static final String AUTOINIT = "autoinitialize";
    public static final String NULL = "null";
    public static final String BEGIN_PARENS = "(";
    public static final String END_PARENS = ")";
    public static final String COMMA = ",";
    public static final String COMMA_SQ = ",'";
    public static final String VAR_DECL = "var ";
    public static final String SCRIPT_TAG = "script";
    public static final String TXT_JS_TYPE = "text/javascript";
    public static final String SEMICOLON = ";";
    private static final String GET = "get";
    


    /**
     * This is meant to help generate a unique clientId. It should not be used anymore; the user is responsible for making
     * the necessary id specifications.
     *
     * @deprecated
     * @return the specific type
     */
    protected String getNitobiType() {
        return null;
    }

    /**
     * Grab all the required scripts for this component. No script request will be rendered more than once in a given
     * session.
     *
     * @return Array of String objects with the required scripts
     */
    protected String[] getRequiredScripts() {
        /*
         * Set the default action to null, since most components are children of other comnponents that will need
         * to return actual values;
         */
        return null;
    }

    /**
     * Grab all the styles this component requires. The output will include links to each. No repeat style
     * references will be outputted. The repeats are tracked at the request level.
     *
     * @return Array of Strings with all the stylesheet names
     */
    protected String[] getRequiredStyles() {
        /*
         * Set the default action to null, since most components are children of other comnponents that will need
         * to return actual values;
         */
        return null;
    }

    /**
     * Whether or not the component requires the <?XML:NAMESPACE prefix="ntb" /> printed before the component.
     * Generally, this is true if the component is a parent, but the children components do not need this as long as you
     * include it for the parent. The base class defaults to false.
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
    protected abstract String getTagName();

    /**
     * Whether or not you want the id attribute printed with the output. The default
     * value returned is false, so if the component must output the id, override and
     * return true.
     * 
     * @return true if you want the id of the component printed as a DOM id
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
     * @return Map of the new attributes key and value
     */
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        return null;
    }

    /**
     * A method to get a single derived attribute
     *
     * @param attributeName The name of the attribute, according to the NitobiAttribute list in the component
     * @param component The component associated with this renderer.
     * @param context The current FacesContext instance
     * @return A String representing the value of the derived element.
     */
    protected String getDerivedAttribute(String attributeName, UIComponent component, FacesContext context) {
        return null;
    }
    
    /*--------------------------- PUBLIC METHODS -------------------------------*/

    @Override
    public void encodeBegin(FacesContext context, UIComponent component) throws IOException {
        if(logger.isLoggable(Level.FINE)) {
            logger.entering("NitobiRenderer", "encodeBegin()");
        }

        ResponseWriter writer = context.getResponseWriter();
        String clientId = component.getClientId(context);
        Map<String, Object> attributes = component.getAttributes();

        if(logger.isLoggable(Level.FINE)) {
            logger.fine("NitobiRenderer is rendering component: " + component.getClass().getName() + " with id: " +component.getClientId(context));
        }
        
        prepareRequiredIncludes(writer, component, context, getRequiredScripts(), getRequiredStyles());
        
        /*
         * Onload script - check to make sure autoload is true. Autoinitialize is
         * false by default. To turn on a component the user must expressly pass
         * a "true" value.
         */
        Boolean autoinitialize = (Boolean)attributes.get(AUTOINIT);
        if(logger.isLoggable(Level.FINEST)) {
            logger.finest("Autoinitialize is set to " + autoinitialize);
        }
        if(autoinitialize != null && autoinitialize) {
            writeAutoInitialize(writer, component, clientId);
        }
        
        /*
         * If the page hasn't alread printed the XML Nitobi namespace, do so now. Whether
         * or not this is true is left up to the subclass.
         */
        if(needsXmlNamespaceDecl()) {
            writer.write(NAMESPACE_TEXT);
            writer.write(ENDL);
        }
        
        writer.startElement(getTagName(), component);

        if(printId()) {
            writer.writeAttribute("id", clientId, null);
        }
        


        /*
         * The new method of processing attributes.
         */
        if(Arrays.asList(component.getClass().getInterfaces()).contains(AttributeAware.class)) {

            if(logger.isLoggable(Level.FINEST)) {
                logger.log(Level.FINEST, "Found a AttributeAware class: " + component.getClass().getName());
            }

            AttributeAware attributeAware = (AttributeAware)component;
            List<NitobiAttribute> nitobiAttributes = attributeAware.getComponentAttributes();
            if(nitobiAttributes != null) {
                /*
                 * Iterate through all the attributes and process them one at a time.
                 */
                for(NitobiAttribute nitobiAttribute : nitobiAttributes) {
                    /*
                     * First check to see if the attribute was mapped with the ValueExpressions. NOTE: All mapping
                     * by convention must be done using the jsfAttributeName and not the domAttribute name.
                     */
                    if(logger.isLoggable(Level.FINEST)) {
                        logger.finest("Processing attribute '" + nitobiAttribute.jsfAttributeName() + "'.");
                    }
                    if(attributes.containsKey(nitobiAttribute.jsfAttributeName())) {
                        /*
                         * Grab the object
                         */
                        Object attribute = attributes.get(nitobiAttribute.jsfAttributeName());
                        /*
                         * If the attribute is null, ignore it. The user didn't enter anything. Otherwise process it.
                         */
                        if(attribute == null) {
                            /*
                             * Do nothing here. The user did not enter this attribute.
                             */
                            if(logger.isLoggable(Level.FINEST)) {
                                logger.finest("The attribute '" + nitobiAttribute.jsfAttributeName() + "' was in the attribute map but was null. Ignoring...");
                            }
                        } else {
                            /*
                             * If the attribute is passthrough, we can write it directly to the writer. Otherwise we
                             * have to get the derived attribute value.
                             */
                            if(nitobiAttribute.isPassthrough()) {
                                writer.writeAttribute(nitobiAttribute.domAttributeName(), attribute.toString(), null);
                                if(logger.isLoggable(Level.FINER)) {
                                    logger.finer("The passthrough attribute '" + nitobiAttribute.domAttributeName() + "' was written as value '" + attribute + "'.");
                                }
                            } else {
                                /*
                                 * Process derived attributes...
                                 *
                                 * Each subclass can write their own custom attributes that either are
                                 * not in the component or need special modifications before they output. This
                                 * hook is to output the non-passthrough attributes.
                                 */
                                String derivedAttribute = getDerivedAttribute(nitobiAttribute.jsfAttributeName(), component, context);

                                if(derivedAttribute == null) {
                                    logger.warning("The NitobiRenderer could not get the derived attributes for NitobiAttribute '" + nitobiAttribute.domAttributeName() + "'." );
                                } else {
                                    writer.writeAttribute(nitobiAttribute.domAttributeName(), derivedAttribute, null);
                                    if(logger.isLoggable(Level.FINER)) {
                                        logger.finer("The derived attribute '" + nitobiAttribute.jsfAttributeName() + "' was written as value '" + derivedAttribute + "'.");
                                    }
                                }
                            }
                        }
                    } else {
                        /*
                         * If it's not in the attribute map, then it might be a MethodExpression. Check that. If it is, process
                         * it. If it isn't, it wasn't ever entered by the user. As a convention, all attributes were set as
                         * either a ValueExpression or a MethodExpression.
                         */
                        if(nitobiAttribute.isMethodExpression()) {

                            /*
                             * Create the getter method string for this method expression
                             */
                            StringBuffer getterMethodStringBuffer = new StringBuffer(nitobiAttribute.jsfAttributeName());
                            getterMethodStringBuffer.replace(0, 1, nitobiAttribute.jsfAttributeName().substring(0, 1).toUpperCase());
                            getterMethodStringBuffer.insert(0, GET);

                            /*
                             * Create the Method object for the getter string.
                             */
                            Method method;
                            try {
                                method = component.getClass().getMethod(getterMethodStringBuffer.toString());
                            } catch (NoSuchMethodException e) {
                                logger.severe("NitobiRenderer could not obtain the jsf attribute '" + nitobiAttribute.jsfAttributeName() + "' from the component.");
                                throw new FacesException("NitobiRenderer could not obtain the jsf attribute '" + nitobiAttribute.jsfAttributeName() + "' from the component.");
                            }

                            if(method != null) {
                                /*
                                 * Invoke the getter method.
                                 */
                                Object getterResultObject;
                                try {
                                    getterResultObject = method.invoke(component);
                                } catch (IllegalAccessException e) {
                                    logger.severe("Unable to access '" + getterMethodStringBuffer.toString() + "' in this class.");
                                    throw new FacesException("Unable to access '" + getterMethodStringBuffer.toString() + "' in this class.");
                                } catch (InvocationTargetException e) {
                                    logger.severe("Could not invoke the method '" + getterMethodStringBuffer.toString());
                                    throw new FacesException("Could not invoke the method '" + getterMethodStringBuffer.toString());
                                }

                                /*
                                 * If there was a method expression in the components member variable, process it.
                                 */
                                if(getterResultObject != null) {
                                    /*
                                     * Need to convert the method expression to a URL string that the listener can understand.
                                     */
                                    String outputValue = convertExpressionToURL(
                                            (Expression)getterResultObject,
                                            null,
                                            context.getExternalContext().getRequestContextPath());
                                    writer.writeAttribute(nitobiAttribute.domAttributeName(), outputValue, null);
                                }
                            }
                        }
                    }
                }
            } else {
                logger.warning("NitobiRenderer found a AttributeAware class that did not return any attributes.");
            }
        } else { // deal with the classes still using the old method
            /*
             * Iterate through the map of attributes and print them using the values
             * directly from the component. This is basically for passthrough elements.
             */
            Map<String, String> passthroughAtts = getPassthroughAttributes();
            if(passthroughAtts != null) {
                if(logger.isLoggable(Level.FINER)) {
                    logger.finer("NitobiRenderer rendering passthrough attributes: " + passthroughAtts.toString());
                }
                Set<String> keys = passthroughAtts.keySet();
                for(String key : keys) {
                    Object attr = attributes.get(passthroughAtts.get(key));
                    if(attr != null && attr.getClass().getName().equalsIgnoreCase(Boolean.class.getCanonicalName())) {
                        writer.writeAttribute(key, attr.toString(), null);
                    } else {
                        writer.writeAttribute(key, attr, null);
                    }
                }
            }

            /*
             * Each subclass can write their own custom attributes that either are
             * not in the component or need special modifications before they output. This
             * hook is to output the non-passthrough attributes.
             */
            Map<String, String> derivedAtts = getDerivedAttributes(component, context);
            if(derivedAtts != null) {
                if(logger.isLoggable(Level.FINEST)) {
                    logger.finest("Outputting derived attributes: " + derivedAtts.toString());
                }
                for(Map.Entry<String,String> entry : derivedAtts.entrySet()) {
                    writer.writeAttribute(entry.getKey(), entry.getValue(), null);
                }
            }
            writer.writeText(ENDL, null);
        }


        if(logger.isLoggable(Level.FINE)) {
            logger.exiting("NitobiRenderer","encodeBegin()");
        }
    }



    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        writer.endElement(getTagName());
        writer.writeText(ENDL, null);
    }
    
    /**
     * This method will make sure that this request scope includes all the necessary dependencies for a calling
     * component. This method wraps around the NitobiIncludes managed bean, which is a request-level bean and manages
     * which dependencies (scripts and css) have already been included in the response stream.
     *
     * This method will automatically include the toolkit if it has not been included already.
     *
     * @param writer The response writer
     * @param component The component that this renderer is rendering.
     * @param context The current FacesContext instance.
     * @param scripts An array of strings, each being a required script for the calling component.
     * @param styles An array of Strings, each being a required stylesheet for the calling component.
     * @throws java.io.IOException When the resource is not available.
     */
    public void prepareRequiredIncludes(ResponseWriter writer,
            UIComponent component,
            FacesContext context,
            String[] scripts,
            String[] styles) throws IOException {
        
        /*
         * Prepare access to the managed bean NitobiIncludes
         */
        ELContext elContext = context.getELContext();
        ExpressionFactory expressionFactory = context.getApplication().getExpressionFactory();
        MethodExpression methodExpression =
                expressionFactory.createMethodExpression(elContext,
                        "#{NitobiIncludes.registerInclude}",
                        Boolean.TYPE,
                        new Class[] {String.class});

        /*
         * Include the toolkit if it hasn't already been.
         */
        if((Boolean)methodExpression.invoke(elContext, new Object[] {NitobiIncludes.TOOLKIT})) {
            writeScriptInclude(writer, component, NitobiIncludes.TOOLKIT);
        }
        
        /*
         * Include the scripts if they haven't already been.
         */
        if(scripts != null) {
            for (String include : scripts) {
                if ((Boolean) methodExpression.invoke(elContext, new Object[]{include})) {
                    writeScriptInclude(writer, component, include);
                }
            }
        }
        
        /*
         * Include the styles if they haven't already been.
         */
        if(styles != null) {
            for (String style : styles) {
                if ((Boolean) methodExpression.invoke(elContext, new Object[]{style})) {
                    writeCSSInclude(writer, component, style);
                }
            }
        }
    }

    /**
     * 
     * @param writer
     * @param component
     * @param clientId
     * @throws java.io.IOException
     */
    public void writeAutoInitialize(ResponseWriter writer, UIComponent component, String clientId) throws IOException {

        /*
         * Construct the function
         */
        StringBuffer function = new StringBuffer("function onLoad");


        // Make sure the components within a form don't have the colons in their init function names;
        String suffix;
        int begin = clientId.indexOf(":");
        if(begin >= 0) {
            suffix = clientId.substring(begin+1,clientId.length());
        } else {
            suffix = clientId;
        }

        function.append(suffix);
        function.append("(){nitobi.loadComponent(\"");
        function.append(clientId);
        function.append("\");}nitobi.html.attachEvent(window,\"load\",onLoad").append(suffix).append(");");

        writer.startElement(SCRIPT_TAG, component);
        writer.writeAttribute("type", TXT_JS_TYPE, null);
        writer.writeText(function.toString(), null);
        writer.endElement(SCRIPT_TAG);
        writer.writeText(ENDL,null);

    }


    
    /**
     * Helper method to write include script HTML
     * 
     * @param writer The ResponseWriter to use to output
     * @param component What component requires the script
     * @param includeKey the name of the script
     * @throws java.io.IOException
     */
    public void writeScriptInclude(ResponseWriter writer, UIComponent component, String includeKey) throws IOException {
        writer.startElement(SCRIPT_TAG, component);
        writer.writeAttribute("type", TXT_JS_TYPE, null);
        writer.writeAttribute("src", includeKey, null);
        writer.endElement(SCRIPT_TAG);
        writer.writeText(ENDL,null);
    }
    
    /**
     * 
     * @param writer
     * @param component
     * @param includeKey
     * @throws java.io.IOException
     */
    public void writeCSSInclude(ResponseWriter writer, UIComponent component, String includeKey) throws IOException {
        writer.startElement("link", component);
            writer.writeAttribute("type", "text/css", null);
            writer.writeAttribute("rel", "stylesheet", null);
            writer.writeAttribute("href", includeKey, null);
            writer.endElement("link");
            writer.writeText(ENDL,null);
    }

    /*--------------------------- PROTECTED METHODS -------------------------------*/

    /**
     * Takes a <code>StringBuffer</code> reference and appends a <code>String</code> value
     * wrapped in single quotes.
     *
     * @param sb A <code>StringBuffer</code> object reference
     * @param value The <code>String</code> value to be wrapped in single quotes.
     */
    protected void appendInSingleQuotes(StringBuffer sb, String value) {
        sb.append('\'');
        sb.append(value);
        sb.append('\'');
    }

    /**
     * Takes a <code>StringBuffer</code> reference and appends a <code>String</code> value
     * wrapped in double quotes.
     *
     * @param sb A <code>StringBuffer</code> object reference
     * @param value The <code>String</code> value to be wrapped in double quotes.
     */
    protected void appendInDoubleQuotes(StringBuffer sb, String value) {
        sb.append("\"");
        sb.append(value);
        sb.append("\"");
    }

    /**
     * Takes a <code>StringBuffer</code> reference and appends a <code>String</code> value
     * wrapped in double quotes.
     *
     * @param sb A <code>StringBuffer</code> object reference
     * @param value The <code>String</code> value to be wrapped in double quotes.
     */
    protected void appendInDomIdShortcut(StringBuffer sb, String value) {
        sb.append("$('");
        sb.append(value);
        sb.append("')");
    }

    /**
     * This method will convert an Expression to the URL necessary for a client component to trigger
     * a targeted PhaseListener. It accounts for two scenarios: <br/>
     * <ol>
     * <li>In the case where the Expression is literal text, it will assume it needs to go to a servlet. Thus, the
     * Expression string "/fooServlet" targeting the either one will end up being
     * "/MyApp/fooServlet".</li>
     * <li>In the case where the Expression is a real expression, it will translate the parts to paths. The result of
     * "#{foo.bar}" targeting the NitobiSaveHandlerListener would be "/MyApp/faces/nitobi_save_trigger/foo/bar"
     * </ol>
     *
     * @param expression The Expression to be converted
     * @param trigger The trigger used by the targeted phase listener
     * @param contextPath The context path for this application. Used for when the Expression is literal text.
     * @return A String that will trigger the appropriate listener.
     */
    protected String convertExpressionToURL(Expression expression, String trigger, String contextPath) {
        String result;

        String expressionString = expression.getExpressionString();

        if (expression.isLiteralText()) {
            if (logger.isLoggable(Level.FINE)) {
                logger.log(Level.FINE, "Processing the expressionString with literel text: " + expressionString);
            }
            /*
             * Account for the possibility that the user may or may not enter a '/' before the servlet mapping
             */
            if (expressionString.startsWith("/")) {
                result = contextPath + expressionString;
            } else {
                result = contextPath + "/" + expressionString;
            }
        } else {
            /*
             * This method will default to the NitobiGetPhaseListener trigger.
             */
            if(trigger == null) {
                trigger = NitobiGetPhaseListener.NITOBI_AJAX_TRIGGER;
            }


            if(logger.isLoggable(Level.FINE)) {
                logger.log(Level.FINE, "Processing the expressionString with method expression: " + expressionString);
            }
            StringBuffer sb = new StringBuffer(expressionString);

            // replace the dot with a slash
            int dot = sb.indexOf(".");
            sb.replace(dot, dot + 1, "/");

            // remove the '#{' and '}' and prepend the necessary trigger value
            sb.replace(0, 2, contextPath + "/faces/" + trigger + "/");
            sb.delete(sb.length() - 1, sb.length());

            result = sb.toString();
        }
        return result;
    }
}
