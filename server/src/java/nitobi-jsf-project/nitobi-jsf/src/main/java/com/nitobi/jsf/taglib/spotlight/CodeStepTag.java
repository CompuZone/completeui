/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:00:29 PM
 */

package com.nitobi.jsf.taglib.spotlight;

import com.nitobi.jsf.component.spotlight.UICodeStep;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * CodeStepTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class CodeStepTag extends UIComponentELTag {

    private ValueExpression code = null;
    private ValueExpression delayAfter = null;

    public static final String CODE = "code";
    public static final String DELAYAFTER = "delayAfter";

    public String getComponentType() {
        return UICodeStep.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return null;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(CODE,code);
        uiComponent.setValueExpression(DELAYAFTER, delayAfter);
    }

    @Override
    public void release() {
        super.release();
        setCode(null);
        setDelayAfter(null);
    }

    public void setCode(ValueExpression code) {
        this.code = code;
    }

    public void setDelayAfter(ValueExpression delayAfter) {
        this.delayAfter = delayAfter;
    }


}
