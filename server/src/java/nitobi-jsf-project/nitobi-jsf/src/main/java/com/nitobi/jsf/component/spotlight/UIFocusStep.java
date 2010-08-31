/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:07:35 PM
 */

package com.nitobi.jsf.component.spotlight;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.jsf.component.UIJavascriptMethodCallComponent;
import com.nitobi.jsf.taglib.spotlight.FocusStepTag;

import javax.faces.context.FacesContext;
import java.util.Map;

/**
 * UIFocusStep
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIFocusStep extends UIJavascriptMethodCallComponent {

    public static final String DEFAULT_COMPONENT_TYPE = "UIFocusStep";
    public static final String DEFAULT_FAMILY = "FocusStepFamily";
    private static final String METHOD_NAME = "createFocusStep";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }


    /**
     * The name of the variable on which you will call the method.
     *
     * @param facesContext The current facesContext
     * @return The <code>String</code> representation of the method name.
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
        return new JavascriptArgument[] {
                new JavascriptArgument(attributes.get(FocusStepTag.ELEMENTID), JavascriptArgument.ArgumentType.CHARS),
                new JavascriptArgument(attributes.get(FocusStepTag.DELAYAFTER), JavascriptArgument.ArgumentType.NUMBER)
        };

    }
}