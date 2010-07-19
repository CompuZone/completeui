package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UINumberEditor;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class NumberEditorTag extends UIComponentELTag {

    private ValueExpression number = null;
    private ValueExpression mask = null;
    private ValueExpression group = null;
    private ValueExpression decimal = null;

    public static final String NUMBER_ATTNAME = "number";
    public static final String MASK_ATTNAME = "mask";
    public static final String GROUP_ATTNAME = "group";
    public static final String DECIMAL_ATTNAME = "decimal";
    
    @Override
    public String getComponentType() {
        return UINumberEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UINumberEditor.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setNumber(null);
        setMask(null);
        setGroup(null);
        setDecimal(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(NUMBER_ATTNAME, number);
        uiComponent.setValueExpression(MASK_ATTNAME, mask);
        uiComponent.setValueExpression(GROUP_ATTNAME, group);
        uiComponent.setValueExpression(DECIMAL_ATTNAME, decimal);
    }

    public void setNumber(ValueExpression number) {
        this.number = number;
    }

    public void setMask(ValueExpression mask) {
        this.mask = mask;
    }

    public void setGroup(ValueExpression group) {
        this.group = group;
    }

    public void setDecimal(ValueExpression decimal) {
        this.decimal = decimal;
    }
}
