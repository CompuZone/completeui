/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.combo;

import com.nitobi.jsf.component.combo.UIComboButton;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author Eric Buitenhuis
 */
public class ComboButtonTag extends UIComponentELTag {

    private ValueExpression defaultCSSClassName = null;
    private ValueExpression height = null;
    private ValueExpression pressedCSSClassName = null;
    private ValueExpression width = null;
    private ValueExpression onBeforeSelectEvent = null;
    private ValueExpression onBlurEvent = null;
    private ValueExpression onFocusEvent = null;
    private ValueExpression onLoadEvent = null;
    private ValueExpression onSelectEvent = null;
    private ValueExpression onTabEvent = null;

    public static final String DEFAULT_CSS_CLASS_NAME_ATTNAME = "defaultCSSClassName";
    public static final String HEIGHT_ATTNAME = "height";
    public static final String PRESSED_CSS_CLASS_NAME_ATTNAME = "pressedCSSClassName";
    public static final String WIDTH_ATTNAME = "width";
    public static final String ON_BEFORE_SELECT_EVENT_ATTNAME = "onBeforeSelectEvent";
    public static final String ON_BLUR_EVENT_ATTNAME = "onBlurEvent";
    public static final String ON_FOCUS_EVENT_ATTNAME = "onFocusEvent";
    public static final String ON_LOAD_EVENT_ATTNAME = "onLoadEvent";
    public static final String ON_SELECT_EVENT_ATTNAME = "onSelectEvent";
    public static final String ON_TAB_EVENT_ATTNAME = "onTabEvent";

    @Override
    public String getComponentType() {
        return UIComboButton.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIComboButton.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        defaultCSSClassName = null;
        height = null;
        pressedCSSClassName = null;
        width = null;
        onBeforeSelectEvent = null;
        onBlurEvent = null;
        onFocusEvent = null;
        onLoadEvent = null;
        onSelectEvent = null;
        onTabEvent = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        
        component.setValueExpression(DEFAULT_CSS_CLASS_NAME_ATTNAME, defaultCSSClassName);
        component.setValueExpression(HEIGHT_ATTNAME, height);
        component.setValueExpression(PRESSED_CSS_CLASS_NAME_ATTNAME, pressedCSSClassName);
        component.setValueExpression(WIDTH_ATTNAME, width);
        component.setValueExpression(ON_BEFORE_SELECT_EVENT_ATTNAME, onBeforeSelectEvent);
        component.setValueExpression(ON_BLUR_EVENT_ATTNAME, onBlurEvent);
        component.setValueExpression(ON_FOCUS_EVENT_ATTNAME, onFocusEvent);
        component.setValueExpression(ON_LOAD_EVENT_ATTNAME, onLoadEvent);
        component.setValueExpression(ON_SELECT_EVENT_ATTNAME, onSelectEvent);
        component.setValueExpression(ON_TAB_EVENT_ATTNAME, onTabEvent);
    }

    public void setDefaultCSSClassName(ValueExpression defaultCSSClassName) {
        this.defaultCSSClassName = defaultCSSClassName;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }

    public void setOnBeforeSelectEvent(ValueExpression onBeforeSelectEvent) {
        this.onBeforeSelectEvent = onBeforeSelectEvent;
    }

    public void setOnBlurEvent(ValueExpression onBlurEvent) {
        this.onBlurEvent = onBlurEvent;
    }

    public void setOnFocusEvent(ValueExpression onFocusEvent) {
        this.onFocusEvent = onFocusEvent;
    }

    public void setOnLoadEvent(ValueExpression onLoadEvent) {
        this.onLoadEvent = onLoadEvent;
    }

    public void setOnSelectEvent(ValueExpression onSelectEvent) {
        this.onSelectEvent = onSelectEvent;
    }

    public void setOnTabEvent(ValueExpression onTabEvent) {
        this.onTabEvent = onTabEvent;
    }

    public void setPressedCSSClassName(ValueExpression pressedCSSClassName) {
        this.pressedCSSClassName = pressedCSSClassName;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }

    
}
