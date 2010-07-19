/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:01:31 PM
 */

package com.nitobi.jsf.taglib.spotlight;

import com.nitobi.jsf.component.spotlight.UIFormHelperStep;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * FormHelperStep
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class FormHelperStepTag extends UIComponentELTag {

    private ValueExpression formId = null;
    private ValueExpression fieldId = null;
    private ValueExpression action = null;
    private ValueExpression delayAfter = null;
    private ValueExpression text = null;
    private ValueExpression setFocus = null;

    public static final String FORMID = "formId";
    public static final String FIELDID = "fieldId";
    public static final String ACTION = "action";
    public static final String DELAYAFTER = "delayAfter";
    public static final String TEXT = "text";
    public static final String FOCUS = "setFocus";

    public String getComponentType() {
        return UIFormHelperStep.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return null;
    }

    @Override
    public void release() {
        super.release();
        setFormId(null);
        setFieldId(null);
        setAction(null);
        setDelayAfter(null);
        setText(null);
        setSetFocus(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(FORMID, formId);
        uiComponent.setValueExpression(FIELDID, fieldId);
        uiComponent.setValueExpression(ACTION,action);
        uiComponent.setValueExpression(DELAYAFTER, delayAfter);
        uiComponent.setValueExpression(TEXT,text);
        uiComponent.setValueExpression(FOCUS, setFocus);
    }

    public void setFormId(ValueExpression formId) {
        this.formId = formId;
    }

    public void setAction(ValueExpression action) {
        this.action = action;
    }

    public void setDelayAfter(ValueExpression delayAfter) {
        this.delayAfter = delayAfter;
    }

    public void setText(ValueExpression text) {
        this.text = text;
    }

    public void setSetFocus(ValueExpression setFocus) {
        this.setFocus = setFocus;
    }

    public void setFieldId(ValueExpression fieldId) {
        this.fieldId = fieldId;
    }
}
