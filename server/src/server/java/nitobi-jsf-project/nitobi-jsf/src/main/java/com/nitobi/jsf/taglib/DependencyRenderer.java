/**
 * User: Eric Buitenhuis 
 * Date: May 25, 2008
 * Time: 3:27:47 PM
 */

package com.nitobi.jsf.taglib;

import com.nitobi.jsf.NitobiIncludes;

import javax.el.ELContext;
import javax.el.ExpressionFactory;
import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;

/**
 * DependencyRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class DependencyRenderer {

    /**
     *
     * @param writer
     * @param component
     * @param context
     * @param scripts
     * @param styles
     * @throws java.io.IOException
     */
    public static void writeRequiredIncludes(ResponseWriter writer,
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
         * Include the toolkit if needed
         */
        if((Boolean)methodExpression.invoke(elContext, new Object[] {NitobiIncludes.TOOLKIT})) {
            writeScriptInclude(writer, component, NitobiIncludes.TOOLKIT);
        }

        /*
         * Include the scripts
         */
        if(scripts != null) {
            for (String include : scripts) {
                if ((Boolean) methodExpression.invoke(elContext, new Object[]{include})) {
                    writeScriptInclude(writer, component, include);
                }
            }
        }

        /*
         * Include the styles
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
     * Helper method to write include script HTML
     *
     * @param writer The ResponseWriter to use to output
     * @param component What component requires the script
     * @param scriptName the name of the script
     * @throws java.io.IOException
     */
    public static void writeScriptInclude(ResponseWriter writer, UIComponent component, String scriptName) throws IOException {
        writer.startElement("script", component);
        writer.writeAttribute("type", "text/javascript", null);
        writer.writeAttribute("src", scriptName, null);
        writer.endElement("script");
        writer.writeText("\n",null);
    }

    /**
     *
     * @param writer
     * @param component
     * @param includeKey
     * @throws java.io.IOException
     */
    public static void writeCSSInclude(ResponseWriter writer, UIComponent component, String includeKey) throws IOException {
        writer.startElement("link", component);
            writer.writeAttribute("type", "text/css", null);
            writer.writeAttribute("rel", "stylesheet", null);
            writer.writeAttribute("href", includeKey, null);
            writer.endElement("link");
            writer.writeText("\n",null);
    }
}
