/**
 * User: Eric Buitenhuis 
 * Date: Apr 27, 2008
 * Time: 11:56:31 PM
 */

package com.nitobi.jsf.taglib.callout;

import com.nitobi.jsf.component.callout.UICallout;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;


/**
 * CalloutTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class CalloutTag extends UIComponentELTag {

    private ValueExpression theme = null;
    private ValueExpression triggerEvent = null;
    private ValueExpression triggerSourceDOM = null;
    private ValueExpression displayJSFMessage = null;
    private ValueExpression movetoX = null;
    private ValueExpression movetoY = null;
    private ValueExpression expireTime = null;
    private ValueExpression sizeX = null;
    private ValueExpression sizeY = null;
    private ValueExpression attachToElement = null;
    private ValueExpression direction = null;
    private ValueExpression title = null;
    private ValueExpression body = null;
    private ValueExpression onAppear = null;
    private ValueExpression onDestroy = null;

    public static final String STYLE_ATTNAME = "theme";
    public static final String TRIGGER_EVENT_ATTNAME = "triggerEvent";
    public static final String TRIGGER_SOURCE_DOM_ATTNAME = "triggerSourceDOM";
    public static final String DISPLAY_JSF_MESSAGE_ATTNAME = "displayJSFMessage";
    public static final String MOVETO_X_ATTNAME = "movetoX";
    public static final String MOVETO_Y_ATTNAME = "movetoY";
    public static final String EXPIRE_TIME_ATTNAME = "expireTime";
    public static final String SIZE_X_ATTNAME = "sizeX";
    public static final String SIZE_Y_ATTNAME = "sizeY";
    public static final String ATTACH_TO_ELEMENT_ATTNAME = "attachToElement";
    public static final String DIRECTION_ATTNAME = "direction";
    public static final String TITLE_ATTNAME = "title";
    public static final String BODY_ATTNAME = "body";
    public static final String ON_APPEAR_ATTNAME = "onAppear";
    public static final String ON_DESTROY_ATTNAME = "onDestroy";

    public String getComponentType() {
        return UICallout.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UICallout.DEFAULT_RENDERER_TYPE;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(STYLE_ATTNAME, theme);
        uiComponent.setValueExpression(TRIGGER_EVENT_ATTNAME, triggerEvent);
        uiComponent.setValueExpression(TRIGGER_SOURCE_DOM_ATTNAME, triggerSourceDOM);
        uiComponent.setValueExpression(DISPLAY_JSF_MESSAGE_ATTNAME, displayJSFMessage);
        uiComponent.setValueExpression(MOVETO_X_ATTNAME, movetoX);
        uiComponent.setValueExpression(MOVETO_Y_ATTNAME, movetoY);
        uiComponent.setValueExpression(EXPIRE_TIME_ATTNAME, expireTime);
        uiComponent.setValueExpression(SIZE_X_ATTNAME, sizeX);
        uiComponent.setValueExpression(SIZE_Y_ATTNAME, sizeY);
        uiComponent.setValueExpression(ATTACH_TO_ELEMENT_ATTNAME, attachToElement);
        uiComponent.setValueExpression(DIRECTION_ATTNAME, direction);
        uiComponent.setValueExpression(TITLE_ATTNAME, title);
        uiComponent.setValueExpression(BODY_ATTNAME, body);
        uiComponent.setValueExpression(ON_APPEAR_ATTNAME, onAppear);
        uiComponent.setValueExpression(ON_DESTROY_ATTNAME, onDestroy);
    }

    @Override
    public void release() {
        super.release();
        theme =null;
        triggerEvent = null;
        triggerSourceDOM = null;
        displayJSFMessage = null;
        movetoX =null;
        movetoY =null;
        expireTime=null;
        sizeX=null;
        sizeY=null;
        attachToElement=null;
        direction = null;
        title = null;
        body = null;
        onAppear = null;
        onDestroy = null;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }

    public void setTriggerEvent(ValueExpression triggerEvent) {
        this.triggerEvent = triggerEvent;
    }

    public void setTriggerSourceDOM(ValueExpression triggerSourceDOM) {
        this.triggerSourceDOM = triggerSourceDOM;
    }

    public void setDisplayJSFMessage(ValueExpression displayJSFMessage) {
        this.displayJSFMessage = displayJSFMessage;
    }

    public void setMovetoX(ValueExpression movetoX) {
        this.movetoX = movetoX;
    }

    public void setExpireTime(ValueExpression expireTime) {
        this.expireTime = expireTime;
    }

    public void setSizeX(ValueExpression sizeX) {
        this.sizeX = sizeX;
    }

    public void setSizeY(ValueExpression sizeY) {
        this.sizeY = sizeY;
    }

    public void setAttachToElement(ValueExpression attachToElement) {
        this.attachToElement = attachToElement;
    }

    public void setDirection(ValueExpression direction) {
        this.direction = direction;
    }

    public void setTitle(ValueExpression title) {
        this.title = title;
    }

    public void setBody(ValueExpression body) {
        this.body = body;
    }

    public void setOnAppear(ValueExpression onAppear) {
        this.onAppear = onAppear;
    }

    public void setOnDestroy(ValueExpression onDestroy) {
        this.onDestroy = onDestroy;
    }

    public void setMovetoY(ValueExpression movetoY) {
        this.movetoY = movetoY;
    }
}
