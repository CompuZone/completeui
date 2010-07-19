package com.nitobi.jsf.taglib.combo;

import com.nitobi.jsf.component.combo.UIComboTextBox;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class ComboTextBoxTag extends UIComponentELTag {

    private ValueExpression cssClassName = null;
    private ValueExpression dataFieldIndex = null;
    private ValueExpression editable = null;
    private ValueExpression height = null;
    private ValueExpression value = null;
    private ValueExpression width = null;
    private ValueExpression onEditKeyUpEvent = null;

    public static final String CSS_CLASS_NAME_ATTNAME = "cssClassName";
    public static final String DATA_FIELD_INDEX_ATTNAME = "dataFieldIndex";
    public static final String EDITABLE_ATTNAME = "editable";
    public static final String HEIGHT_ATTNAME = "height";
    public static final String VALUE_ATTNAME = "value";
    public static final String WIDTH_ATTNAME = "width";
    public static final String ON_EDIT_KEY_UP_EVENT_ATTNAME = "onEditKeyUpEvent";

    @Override
    public String getComponentType() {
        return UIComboTextBox.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIComboTextBox.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        cssClassName = null;
        dataFieldIndex = null;
        editable = null;
        height = null;
        value = null;
        width = null;
        onEditKeyUpEvent = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        
        component.setValueExpression(CSS_CLASS_NAME_ATTNAME, cssClassName);
        component.setValueExpression(DATA_FIELD_INDEX_ATTNAME, dataFieldIndex);
        component.setValueExpression(EDITABLE_ATTNAME, editable);
        component.setValueExpression(HEIGHT_ATTNAME, height);
        component.setValueExpression(VALUE_ATTNAME, value);
        component.setValueExpression(WIDTH_ATTNAME, width);
        component.setValueExpression(ON_EDIT_KEY_UP_EVENT_ATTNAME, onEditKeyUpEvent);
    }

    public void setCssClassName(ValueExpression cssclassname) {
        this.cssClassName = cssclassname;
    }

    public void setDataFieldIndex(ValueExpression dataFieldIndex) {
        this.dataFieldIndex = dataFieldIndex;
    }


    public void setEditable(ValueExpression editable) {
        this.editable = editable;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }

    public void setOnEditKeyUpEvent(ValueExpression oneditkeyupevent) {
        this.onEditKeyUpEvent = oneditkeyupevent;
    }

    public void setValue(ValueExpression value) {
        this.value = value;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }
}
