/**
 * User: Eric Buitenhuis 
 * Date: May 19, 2008
 * Time: 7:29:46 PM
 */

package com.nitobi.jsf.component.spotlight;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.beans.JavascriptDeclaration;
import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.UIJavascriptEventBasedComponent;
import com.nitobi.jsf.taglib.spotlight.SpotlightTag;

import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * UISpotlight
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UISpotlight extends UIJavascriptEventBasedComponent {

    private JavascriptDeclaration jsDeclaration = null;

    public static final String DEFAULT_COMPONENT_TYPE = "UISpotlight";
    public static final String DEFAULT_RENDERER_TYPE = "SpotlightRenderer";
    public static final String DEFAULT_FAMILY = "SpotlightFamily";
    public static final String JS_OBJECT_COUNTERPART = "nitobi.spotlight.Spotlight";
    public static final String VARIABLE_NAME = "spotlight";

    public static boolean isInitialized = false;
    public static final List<String> EFFECTS = new ArrayList<String>();
    public static final List<String> STYLESHEETS = new ArrayList<String>();
    public static final List<String> LENSTYPE = new ArrayList<String>();

    protected String[] getDependentScripts() {
        return new String[]{NitobiIncludes.SPOTLIGHT};
    }

    protected String[] getDependentStyles() {
        return new String[]{NitobiIncludes.SPOTLIGHT_STYLE};
    }

    public JavascriptDeclaration getJavascriptDeclaration() {
        if(jsDeclaration == null) {
            jsDeclaration = createJavascriptDeclaration();
        }
        return jsDeclaration;
    }

    private JavascriptDeclaration createJavascriptDeclaration() {
        return new JavascriptDeclaration(
                VARIABLE_NAME,
                JS_OBJECT_COUNTERPART,
                new JavascriptArgument(getAttributes().get(SpotlightTag.THISEFFECT), JavascriptArgument.ArgumentType.STRING),
                new JavascriptArgument(getAttributes().get(SpotlightTag.STYLESHEET), JavascriptArgument.ArgumentType.STRING),
                new JavascriptArgument(getAttributes().get(SpotlightTag.LENSTYPE), JavascriptArgument.ArgumentType.STRING),
                new JavascriptArgument(getAttributes().get(SpotlightTag.LENSOVERSIZE), JavascriptArgument.ArgumentType.NUMBER)
        );
    }

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }

    @Override
    public void encodeBegin(FacesContext facesContext) throws IOException {
        super.encodeBegin(facesContext);

        Boolean allowAutoscroll = (Boolean)getAttributes().get(SpotlightTag.ALLOWSCROLLING);
        if(allowAutoscroll == null || !allowAutoscroll) {
            ResponseWriter writer = facesContext.getResponseWriter();
            writer.write(VARIABLE_NAME);
            writer.write(".allowscrolling = true;");
        }

    }

    @Override
    public void encodeEnd(FacesContext facesContext) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();
        writer.write(VARIABLE_NAME);
        writer.write(".play();");
        super.encodeEnd(facesContext);
    }
}