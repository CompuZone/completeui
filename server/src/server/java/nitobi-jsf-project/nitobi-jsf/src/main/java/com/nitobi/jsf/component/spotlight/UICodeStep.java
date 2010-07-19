/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:05:52 PM
 */

package com.nitobi.jsf.component.spotlight;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.jsf.component.UIJavascriptMethodCallComponent;
import com.nitobi.jsf.taglib.spotlight.CodeStepTag;

import javax.faces.context.FacesContext;
import java.util.Map;

/**
 * UICodeStep
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UICodeStep extends UIJavascriptMethodCallComponent {

    public static final String DEFAULT_COMPONENT_TYPE = "UICodeStep";
    public static final String DEFAULT_FAMILY = "CodeStepFamily";
    public static final String METHOD_NAME = "createCodeStep";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }


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
            new JavascriptArgument(attributes.get(CodeStepTag.CODE), JavascriptArgument.ArgumentType.STRING),
            new JavascriptArgument(attributes.get(CodeStepTag.DELAYAFTER), JavascriptArgument.ArgumentType.NUMBER)
        };
    }
}