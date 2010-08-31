/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:01:43 PM
 */

package com.nitobi.jsf.taglib.spotlight;

import com.nitobi.jsf.component.spotlight.UIFocusStep;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * FocusStepTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class FocusStepTag extends UIComponentELTag {

    private ValueExpression elementId = null;
    private ValueExpression delayAfter = null;

    public static final String ELEMENTID = "elementId";
    public static final String DELAYAFTER = "delayAfter";

    public String getComponentType() {
        return UIFocusStep.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return null;
    }

    @Override
    public void release() {
        super.release();
        setElementId(null);
        setDelayAfter(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(ELEMENTID, elementId);
        uiComponent.setValueExpression(DELAYAFTER, delayAfter);
    }

    public void setElementId(ValueExpression elementId) {
        this.elementId = elementId;
    }

    public void setDelayAfter(ValueExpression delayAfter) {
        this.delayAfter = delayAfter;
    }
}
