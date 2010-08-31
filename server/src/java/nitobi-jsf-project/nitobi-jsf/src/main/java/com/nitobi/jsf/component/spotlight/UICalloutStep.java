/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:02:50 PM
 */

package com.nitobi.jsf.component.spotlight;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.jsf.component.UIJavascriptMethodCallComponent;
import com.nitobi.jsf.taglib.spotlight.CalloutStepTag;

import javax.faces.context.FacesContext;
import java.util.Map;

/**
 * UICalloutStep
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UICalloutStep extends UIJavascriptMethodCallComponent {

    public static final String DEFAULT_COMPONENT_TYPE = "UICalloutStep";
    public static final String DEFAULT_FAMILY = "CalloutStepFamily";
    private static final String METHOD_NAME = "createCalloutStep";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }

    /**
     * The name of the variable on which you will call the method.
     *
     * @param facesContext The current facesContext
     */
    protected String getMethodName(FacesContext facesContext) {
        return METHOD_NAME;
    }

    /**
     * Creates the arguments to pass to the method. The JavascriptArgument object
     * handles the type of argument it is, whether it's a plain string, boolean, object,
     * function, etc. Each JavascriptArgument must be set individually by the component
     * to ensure it is output accordingly.
     *
     * @param attributes A Map of the component's set attributes.
     * @return An array of Strings in the order in which they will be presented as args.
     */
    protected JavascriptArgument[] createArguments(Map<String, Object> attributes) {
        return new JavascriptArgument[]{
            new JavascriptArgument(attributes.get(CalloutStepTag.ELEMENTID), JavascriptArgument.ArgumentType.CHARS),
            new JavascriptArgument(attributes.get(CalloutStepTag.STEPTITLE), JavascriptArgument.ArgumentType.STRING),
            new JavascriptArgument(attributes.get(CalloutStepTag.STEPBODY), JavascriptArgument.ArgumentType.STRING)
        };
    }
}