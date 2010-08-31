package com.nitobi.jsf.taglib.callout;

import com.nitobi.jsf.component.callout.UIHint;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * User: Eric Buitenhuis
 * Date: Apr 26, 2008
 * Time: 9:03:37 PM
 */
public class HintTag extends UIComponentELTag {

    public static final String TIMER_LENGTH_ATTNAME = "timerLength";
    public static final String EXPIRE_TIMEOUT_ATTNAME = "expireTimeout";
    public static final String OBJ_ID_ATTNAME = "objId";
    public static final String TITLE_ATTNAME = "title";
    public static final String TEXT_ATTNAME = "text";

    private ValueExpression timerLength = null;
    private ValueExpression expireTimeout = null;
    private ValueExpression objId = null;
    private ValueExpression title = null;
    private ValueExpression text = null;

    @Override
    public String getComponentType() {
        return UIHint.DEFAULT_COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIHint.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        timerLength = null;
        expireTimeout = null;
        objId = null;
        title = null;
        text = null;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(TIMER_LENGTH_ATTNAME, timerLength);
        uiComponent.setValueExpression(EXPIRE_TIMEOUT_ATTNAME, expireTimeout);
        uiComponent.setValueExpression(OBJ_ID_ATTNAME, objId);
        uiComponent.setValueExpression(TITLE_ATTNAME, title);
        uiComponent.setValueExpression(TEXT_ATTNAME, text);
    }

    public void setTimerLength(ValueExpression timerLength) {
        this.timerLength = timerLength;
    }

    public void setExpireTimeout(ValueExpression expireTimeout) {
        this.expireTimeout = expireTimeout;
    }

    public void setObjId(ValueExpression objId) {
        this.objId = objId;
    }

    public void setTitle(ValueExpression title) {
        this.title = title;
    }

    public void setText(ValueExpression text) {
        this.text = text;
    }
}
