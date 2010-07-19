/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UITextColumn;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class TextColumnTag extends UIComponentELTag {

    @Override
    public String getComponentType() {
        return UITextColumn.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UITextColumn.DEFAULT_RENDERER_TYPE;
    }

    private ValueExpression align = null;
    private ValueExpression className = null;
    private ValueExpression cssStyle = null;
    private ValueExpression value = null;
    private ValueExpression columnName = null;
    private ValueExpression headerElement = null;
    private ValueExpression type = null;
    private ValueExpression editable = null;
    private ValueExpression initial = null;
    private ValueExpression label = null;
    private ValueExpression sortDirection = null;
    private ValueExpression sortEnabled = null;
    private ValueExpression width = null;
    private ValueExpression visible = null;
    private ValueExpression xmlDataField = null;
    private ValueExpression onHeaderClickEvent = null;
    private ValueExpression onCellClickEvent = null;
    private ValueExpression onCellValidateEvent = null;
    private ValueExpression onBeforeCellEditEvent = null;
    private ValueExpression onAfterCellEditEvent = null;
    private ValueExpression onCellBlurEvent = null;
    private ValueExpression onCellFocusEvent = null;
    private ValueExpression onBeforeSortEvent = null;
    private ValueExpression onAfterSortEvent = null;
    private ValueExpression onKeyPressEvent = null;
    private ValueExpression onKeyDownEvent = null;
    private ValueExpression onKeyUpEvent = null;
    private ValueExpression onChangeEvent = null;

    public static final String ALIGN_ATTNAME = "align";
    public static final String CLASS_NAME_ATTNAME = "className";
    public static final String CSS_STYLE_ATTNAME = "cssStyle";
    public static final String VALUE_ATTNAME = "value";
    public static final String COLUMN_NAME_ATTNAME = "columnName";
    public static final String HEADER_ELEMENT_ATTNAME = "headerElement";
    public static final String TYPE_ATTNAME = "type";
    public static final String EDITABLE_ATTNAME = "editable";
    public static final String INITIAL_ATTNAME = "initial";
    public static final String LABEL_ATTNAME = "label";
    public static final String SORT_DIRECTION_ATTNAME = "sortDirection";
    public static final String SORT_ENABLED_ATTNAME = "sortEnabled";
    public static final String WIDTH_ATTNAME = "width";
    public static final String VISIBLE_ATTNAME = "visible";
    public static final String XML_DATA_FIELD_ATTNAME = "xmlDataField";
    public static final String ON_HEADER_CLICK_EVENT_ATTNAME = "onHeaderClickEvent";
    public static final String ON_CELL_CLICK_EVENT_ATTNAME = "onCellClickEvent";
    public static final String ON_CELL_VALIDATE_EVENT_ATTNAME = "onCellValidateEvent";
    public static final String ON_BEFORE_CELL_EDIT_EVENT_ATTNAME = "onBeforeCellEditEvent";
    public static final String ON_AFTER_CELL_EDIT_EVENT_ATTNAME = "onAfterCellEditEvent";
    public static final String ON_CELL_BLUR_EVENT_ATTNAME = "onCellBlurEvent";
    public static final String ON_CELL_FOCUS_EVENT_ATTNAME = "onCellFocusEvent";
    public static final String ON_BEFORE_SORT_EVENT_ATTNAME = "onBeforeSortEvent";
    public static final String ON_AFTER_SORT_EVENT_ATTNAME = "onAfterSortEvent";
    public static final String ON_KEY_PRESS_EVENT_ATTNAME = "onKeyPressEvent";
    public static final String ON_KEY_DOWN_EVENT_ATTNAME = "onKeyDownEvent";
    public static final String ON_KEY_UP_EVENT_ATTNAME = "onKeyUpEvent";
    public static final String ON_CHANGE_EVENT_ATTNAME = "onChangeEvent";


    @Override
    public void release() {
        super.release();
        align = null;
        className = null;
        cssStyle = null;
        value = null;
        columnName = null;
        headerElement = null;
        type = null;
        editable = null;
        initial = null;
        label = null;
        sortDirection = null;
        sortEnabled = null;
        width = null;
        visible = null;
        xmlDataField = null;
        onHeaderClickEvent = null;
        onCellClickEvent = null;
        onCellValidateEvent = null;
        onBeforeCellEditEvent = null;
        onAfterCellEditEvent = null;
        onCellBlurEvent = null;
        onCellFocusEvent = null;
        onBeforeSortEvent = null;
        onAfterSortEvent = null;
        onKeyPressEvent = null;
        onKeyDownEvent = null;
        onKeyUpEvent = null;
        onChangeEvent = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(ALIGN_ATTNAME, align);
        component.setValueExpression(CLASS_NAME_ATTNAME, className);
        component.setValueExpression(CSS_STYLE_ATTNAME, cssStyle);
        component.setValueExpression(VALUE_ATTNAME, value);
        component.setValueExpression(COLUMN_NAME_ATTNAME, columnName);
        component.setValueExpression(HEADER_ELEMENT_ATTNAME, headerElement);
        component.setValueExpression(TYPE_ATTNAME, type);
        component.setValueExpression(EDITABLE_ATTNAME, editable);
        component.setValueExpression(INITIAL_ATTNAME, initial);
        component.setValueExpression(LABEL_ATTNAME, label);
        component.setValueExpression(SORT_DIRECTION_ATTNAME, sortDirection);
        component.setValueExpression(SORT_ENABLED_ATTNAME, sortEnabled);
        component.setValueExpression(WIDTH_ATTNAME, width);
        component.setValueExpression(VISIBLE_ATTNAME, visible);
        component.setValueExpression(XML_DATA_FIELD_ATTNAME, xmlDataField);
        component.setValueExpression(ON_HEADER_CLICK_EVENT_ATTNAME, onHeaderClickEvent);
        component.setValueExpression(ON_CELL_CLICK_EVENT_ATTNAME, onCellClickEvent);
        component.setValueExpression(ON_CELL_VALIDATE_EVENT_ATTNAME, onCellValidateEvent);
        component.setValueExpression(ON_BEFORE_CELL_EDIT_EVENT_ATTNAME, onBeforeCellEditEvent);
        component.setValueExpression(ON_AFTER_CELL_EDIT_EVENT_ATTNAME, onAfterCellEditEvent);
        component.setValueExpression(ON_CELL_BLUR_EVENT_ATTNAME, onCellBlurEvent);
        component.setValueExpression(ON_CELL_FOCUS_EVENT_ATTNAME, onCellFocusEvent);
        component.setValueExpression(ON_BEFORE_SORT_EVENT_ATTNAME, onBeforeSortEvent);
        component.setValueExpression(ON_AFTER_SORT_EVENT_ATTNAME, onAfterSortEvent);
        component.setValueExpression(ON_KEY_PRESS_EVENT_ATTNAME, onKeyPressEvent);
        component.setValueExpression(ON_KEY_DOWN_EVENT_ATTNAME, onKeyDownEvent);
        component.setValueExpression(ON_KEY_UP_EVENT_ATTNAME, onKeyUpEvent);
        component.setValueExpression(ON_CHANGE_EVENT_ATTNAME, onChangeEvent);

    }

    public void setAlign(ValueExpression align) {
        this.align = align;
    }

    public void setClassName(ValueExpression className) {
        this.className = className;
    }

    public void setCssStyle(ValueExpression cssStyle) {
        this.cssStyle = cssStyle;
    }

    public void setValue(ValueExpression value) {
        this.value = value;
    }

    public void setColumnName(ValueExpression columnName) {
        this.columnName = columnName;
    }

    public void setHeaderElement(ValueExpression headerElement) {
        this.headerElement = headerElement;
    }

    public void setType(ValueExpression type) {
        this.type = type;
    }

    public void setEditable(ValueExpression editable) {
        this.editable = editable;
    }

    public void setInitial(ValueExpression initial) {
        this.initial = initial;
    }

    public void setLabel(ValueExpression label) {
        this.label = label;
    }

    public void setSortDirection(ValueExpression sortDirection) {
        this.sortDirection = sortDirection;
    }

    public void setSortEnabled(ValueExpression sortEnabled) {
        this.sortEnabled = sortEnabled;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }

    public void setVisible(ValueExpression visible) {
        this.visible = visible;
    }

    public void setOnHeaderClickEvent(ValueExpression onHeaderClickEvent) {
        this.onHeaderClickEvent = onHeaderClickEvent;
    }

    public void setOnCellClickEvent(ValueExpression onCellClickEvent) {
        this.onCellClickEvent = onCellClickEvent;
    }

    public void setOnCellValidateEvent(ValueExpression onCellValidateEvent) {
        this.onCellValidateEvent = onCellValidateEvent;
    }

    public void setOnBeforeCellEditEvent(ValueExpression onBeforeCellEditEvent) {
        this.onBeforeCellEditEvent = onBeforeCellEditEvent;
    }

    public void setOnAfterCellEditEvent(ValueExpression onAfterCellEditEvent) {
        this.onAfterCellEditEvent = onAfterCellEditEvent;
    }

    public void setOnCellBlurEvent(ValueExpression onCellBlurEvent) {
        this.onCellBlurEvent = onCellBlurEvent;
    }

    public void setOnCellFocusEvent(ValueExpression onCellFocusEvent) {
        this.onCellFocusEvent = onCellFocusEvent;
    }

    public void setOnBeforeSortEvent(ValueExpression onBeforeSortEvent) {
        this.onBeforeSortEvent = onBeforeSortEvent;
    }

    public void setOnAfterSortEvent(ValueExpression onAfterSortEvent) {
        this.onAfterSortEvent = onAfterSortEvent;
    }

    public void setOnKeyPressEvent(ValueExpression onKeyPressEvent) {
        this.onKeyPressEvent = onKeyPressEvent;
    }

    public void setOnKeyDownEvent(ValueExpression onKeyDownEvent) {
        this.onKeyDownEvent = onKeyDownEvent;
    }

    public void setOnKeyUpEvent(ValueExpression onKeyUpEvent) {
        this.onKeyUpEvent = onKeyUpEvent;
    }

    public void setOnChangeEvent(ValueExpression onChangeEvent) {
        this.onChangeEvent = onChangeEvent;
    }

    public void setXmlDataField(ValueExpression xmlDataField) {
        this.xmlDataField = xmlDataField;
    }
}
