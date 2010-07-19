/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UICheckboxEditor;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class CheckboxEditorTag extends UIComponentELTag {

    private ValueExpression checkedValue = null;
    private ValueExpression uncheckedValue = null;
    private ValueExpression dataSource = null;
    private ValueExpression displayFields = null;
    private ValueExpression valueField = null;

    
    public static final String CHECKED_VALUE_ATTNAME = "checkedValue";
    public static final String UNCHECKED_VALUE_ATTNAME = "uncheckedValue";
    public static final String DATA_SOURCE_ATTNAME = "dataSource";
    public static final String DISPLAY_FIELDS_ATTNAME = "displayFields";
    public static final String VALUE_FIELD_ATTNAME = "valueField";

    
    @Override
    public String getComponentType() {
        return UICheckboxEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UICheckboxEditor.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        checkedValue = null;
        uncheckedValue = null;
        dataSource = null;
        displayFields = null;
        valueField = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(CHECKED_VALUE_ATTNAME, checkedValue);
        component.setValueExpression(UNCHECKED_VALUE_ATTNAME, uncheckedValue);
        component.setValueExpression(DATA_SOURCE_ATTNAME, dataSource);
        component.setValueExpression(DISPLAY_FIELDS_ATTNAME, displayFields);
        component.setValueExpression(VALUE_FIELD_ATTNAME, valueField);
    }

    public ValueExpression getCheckedValue() {
        return checkedValue;
    }

    public void setCheckedValue(ValueExpression checkedValue) {
        this.checkedValue = checkedValue;
    }

    public ValueExpression getUncheckedValue() {
        return uncheckedValue;
    }

    public void setUncheckedValue(ValueExpression uncheckedValue) {
        this.uncheckedValue = uncheckedValue;
    }

    public void setDataSource(ValueExpression dataSource) {
        this.dataSource = dataSource;
    }

    public void setDisplayFields(ValueExpression displayFields) {
        this.displayFields = displayFields;
    }

    public void setValueField(ValueExpression valueField) {
        this.valueField = valueField;
    }
}
