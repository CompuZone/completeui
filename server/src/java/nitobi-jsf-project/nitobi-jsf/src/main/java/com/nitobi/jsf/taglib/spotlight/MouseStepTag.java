/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 9:38:14 PM
 */

package com.nitobi.jsf.taglib.spotlight;

import com.nitobi.jsf.component.spotlight.UIMouseStep;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * MouseStepTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class MouseStepTag extends UIComponentELTag {

    private ValueExpression action = null;
    private ValueExpression target = null;
    private ValueExpression delayAfter = null;

    public static final String ACTION = "action";
    public static final String TARGET = "target";
    public static final String DELAYAFTER = "delayAfter";

    public String getComponentType() {
        return UIMouseStep.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return null;
    }

    @Override
    public void release() {
        super.release();
        setAction(null);
        setTarget(null);
        setDelayAfter(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(ACTION,action);
        uiComponent.setValueExpression(TARGET, target);
        uiComponent.setValueExpression(DELAYAFTER, delayAfter);
    }

    public void setAction(ValueExpression action) {
        this.action = action;
    }

    public void setTarget(ValueExpression target) {
        this.target = target;
    }

    public void setDelayAfter(ValueExpression delayAfter) {
        this.delayAfter = delayAfter;
    }
}
