/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UITextEditor;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class TextEditorTag extends UIComponentELTag {

    private ValueExpression maxLength = null;
    private ValueExpression onKeyDownEvent = null;
    private ValueExpression onKeyUpEvent = null;
    private ValueExpression onKeyPressEvent = null;
    private ValueExpression onChangeEvent = null;

    public static final String MAX_LENGTH = "maxLength";
    public static final String ON_KEY_DOWN_EVENT = "onKeyDownEvent";
    public static final String ON_KEY_UP_EVENT = "onKeyUpEvent";
    public static final String ON_KEY_PRESS_EVENT = "onKeyPressEvent";
    public static final String ON_CHANGE_EVENT = "onChangeEvent";


    @Override
    public String getComponentType() {
        return UITextEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UITextEditor.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setMaxLength(null);
        setOnKeyDownEvent(null);
        setOnKeyUpEvent(null);
        setOnKeyPressEvent(null);
        setOnChangeEvent(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);

        uiComponent.setValueExpression(MAX_LENGTH, maxLength);
        uiComponent.setValueExpression(ON_KEY_UP_EVENT, onKeyUpEvent);
        uiComponent.setValueExpression(ON_KEY_DOWN_EVENT, onKeyDownEvent);
        uiComponent.setValueExpression(ON_KEY_PRESS_EVENT, onKeyPressEvent);
        uiComponent.setValueExpression(ON_CHANGE_EVENT, onChangeEvent);
    }

    public void setMaxLength(ValueExpression maxLength) {
        this.maxLength = maxLength;
    }

    public void setOnKeyDownEvent(ValueExpression onKeyDownEvent) {
        this.onKeyDownEvent = onKeyDownEvent;
    }

    public void setOnKeyUpEvent(ValueExpression onKeyUpEvent) {
        this.onKeyUpEvent = onKeyUpEvent;
    }

    public void setOnKeyPressEvent(ValueExpression onKeyPressEvent) {
        this.onKeyPressEvent = onKeyPressEvent;
    }

    public void setOnChangeEvent(ValueExpression onChangeEvent) {
        this.onChangeEvent = onChangeEvent;
    }
}
