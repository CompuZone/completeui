/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:04:10 PM
 */

package com.nitobi.jsf.component.spotlight;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.jsf.component.UIJavascriptMethodCallComponent;
import com.nitobi.jsf.taglib.spotlight.MouseStepTag;

import javax.faces.context.FacesContext;
import java.util.Map;

/**
 * UIMouseStep
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIMouseStep extends UIJavascriptMethodCallComponent {

    public static final String DEFAULT_COMPONENT_TYPE = "UIMouseStep";
    public static final String METHOD_NAME = "createMouseStep";
    public static final String DEFAULT_FAMILY = "MouseStepFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }

    protected String getMethodName(FacesContext facesContext) {
        return METHOD_NAME;
    }

    protected JavascriptArgument[] createArguments(Map<String, Object> attributes) {

        return new JavascriptArgument[]{
                new JavascriptArgument(attributes.get(MouseStepTag.ACTION), JavascriptArgument.ArgumentType.CHARS),
                new JavascriptArgument(attributes.get(MouseStepTag.TARGET), JavascriptArgument.ArgumentType.CHARS),
                new JavascriptArgument(attributes.get(MouseStepTag.DELAYAFTER), JavascriptArgument.ArgumentType.NUMBER)
        };
    }
}