/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:03:32 PM
 */

package com.nitobi.jsf.component.spotlight;

import com.nitobi.beans.JavascriptArgument;
import com.nitobi.jsf.component.UIJavascriptMethodCallComponent;
import com.nitobi.jsf.taglib.spotlight.FormHelperStepTag;

import javax.faces.component.UIComponent;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;
import java.util.Map;

/**
 * UIFormHelperStep
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIFormHelperStep extends UIJavascriptMethodCallComponent {

    public static final String DEFAULT_COMPONENT_TYPE = "UIFormHelperStep";
    public static final String METHOD_NAME = "createFormHelperStep";
    public static final String DEFAULT_FAMILY = "FormHelperStepFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }

    /**
     * The name of the method to call from the object variable.
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

        String formId = (String)attributes.get(FormHelperStepTag.FORMID);
        String fieldId = (String)attributes.get(FormHelperStepTag.FIELDID);

        FacesContext context = FacesContext.getCurrentInstance();
        UIViewRoot viewRoot = context.getViewRoot();
        UIComponent comp = viewRoot.findComponent(formId);
        if(comp != null) {
            fieldId = comp.getClientId(context) + ":" + fieldId;
        }
        
        StringBuffer sb = new StringBuffer("document.forms['");
        sb.append(formId);
        sb.append("']['");
        sb.append(fieldId);
        sb.append("']");
        
        return new JavascriptArgument[] {
                new JavascriptArgument(sb.toString(), JavascriptArgument.ArgumentType.OBJECT),
                new JavascriptArgument(attributes.get(FormHelperStepTag.ACTION), JavascriptArgument.ArgumentType.STRING),
                new JavascriptArgument(attributes.get(FormHelperStepTag.DELAYAFTER), JavascriptArgument.ArgumentType.NUMBER),
                new JavascriptArgument(attributes.get(FormHelperStepTag.TEXT), JavascriptArgument.ArgumentType.STRING),
                new JavascriptArgument(attributes.get(FormHelperStepTag.FOCUS), JavascriptArgument.ArgumentType.OBJECT),
        };
    }
}