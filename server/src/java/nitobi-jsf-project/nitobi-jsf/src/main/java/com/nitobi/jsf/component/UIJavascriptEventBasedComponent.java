/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:24:43 PM
 */

package com.nitobi.jsf.component;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.beans.JavascriptDeclaration;
import com.nitobi.jsf.taglib.DependencyRenderer;
import com.nitobi.jsf.taglib.JavascriptEventBasedComponentTag;

import javax.faces.component.UIComponentBase;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;
import java.util.Map;

/**
 * UIJavascriptComponent - An abstract component that will ease the creation of
 * components whose outputs are merely a javascript method.
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public abstract class UIJavascriptEventBasedComponent extends UIComponentBase  {


    private static final String ENDL = "\n";


    @Override
    public void encodeBegin(FacesContext facesContext) throws IOException {

        super.encodeBegin(facesContext);

        ResponseWriter writer = facesContext.getResponseWriter();


        /*
         * Prepare the required includes
         */
        DependencyRenderer.writeRequiredIncludes(writer, this, facesContext, getDependentScripts(), getDependentStyles());
        /*
         * Write the the script tag
         */
        writer.startElement("script", this);
        writer.writeAttribute("type","text/javascript","type");

        /*
         * Write the function wrapper
         */
        writer.write("var " + getClientId(facesContext) + " = function() {");

        /*
         * Check to see if we need to precache
         */
        Boolean precache = (Boolean)getAttributes().get("precache");
        if(precache == null || precache) {
            writer.write("nitobi.html.Css.precacheImages();");
        }

        /*
         * Write the initial javascript object creation
         */
        writer.write(getJavascriptDeclaration().toString());
    }

    @Override
    public void encodeEnd(FacesContext facesContext) throws IOException {
        super.encodeEnd(facesContext);
        Map<String, Object> attributes = getAttributes();

        JavascriptArgument startingObjArg = new JavascriptArgument(attributes.get(JavascriptEventBasedComponentTag.STARTINGOBJECT), JavascriptArgument.ArgumentType.DOMELEMENT);
        JavascriptArgument startingEventArg = new JavascriptArgument(attributes.get(JavascriptEventBasedComponentTag.STARTINGEVENT),JavascriptArgument.ArgumentType.STRING) ;

        StringBuffer sb = new StringBuffer();
        sb.append("};nitobi.html.attachEvent(");
        sb.append(startingObjArg.toString());
        sb.append(",");
        sb.append(startingEventArg.toString());
        sb.append(",");
        sb.append(getClientId(facesContext));
        sb.append(");");

        ResponseWriter writer = facesContext.getResponseWriter();
        writer.write(sb.toString());
        writer.endElement("script");
    }

    /**
     *
     * @return
     */
    protected abstract String[] getDependentScripts();

    /**
     *
     * @return
     */
    protected abstract String[] getDependentStyles();

    /**
     * This method will create the primary javascript object that
     * will be used
     * @return
     */
    public abstract JavascriptDeclaration getJavascriptDeclaration();

}