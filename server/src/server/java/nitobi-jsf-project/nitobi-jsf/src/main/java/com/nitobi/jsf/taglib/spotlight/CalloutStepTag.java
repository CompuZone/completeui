/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 9:04:00 PM
 */

package com.nitobi.jsf.taglib.spotlight;

import com.nitobi.jsf.component.spotlight.UICalloutStep;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * CalloutStepTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class CalloutStepTag extends UIComponentELTag {

    private ValueExpression elementId = null;
    private ValueExpression stepTitle = null;
    private ValueExpression stepBody = null;

    public static final String ELEMENTID = "elementId";
    public static final String STEPTITLE = "stepTitle";
    public static final String STEPBODY = "stepBody";

    @Override
    public void release() {
        super.release();
        setElementId(null);
        setStepTitle(null);
        setStepBody(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(ELEMENTID, elementId);
        uiComponent.setValueExpression(STEPTITLE, stepTitle);
        uiComponent.setValueExpression(STEPBODY, stepBody);
    }

    public String getComponentType() {
        return UICalloutStep.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return null;
    }

    public void setElementId(ValueExpression elementId) {
        this.elementId = elementId;
    }

    public void setStepTitle(ValueExpression stepTitle) {
        this.stepTitle = stepTitle;
    }

    public void setStepBody(ValueExpression stepBody) {
        this.stepBody = stepBody;
    }
}
