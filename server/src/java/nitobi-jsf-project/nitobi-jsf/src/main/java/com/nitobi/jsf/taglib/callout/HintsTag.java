/**
 * User: Eric Buitenhuis 
 * Date: Apr 27, 2008
 * Time: 12:10:49 PM
 */

package com.nitobi.jsf.taglib.callout;

import com.nitobi.jsf.component.callout.UIHints;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * HintsTag - Processes the JSP tag for a Nitobi JSF Hints component.
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class HintsTag extends UIComponentELTag {


    public static final String TIMER_LENGTH_ATTNAME = "timerLength";
    public static final String EXPIRE_TIMEOUT_ATTNAME = "expireTimeout";

    private ValueExpression timerLength = null;
    private ValueExpression expireTimeout = null;

    @Override
    public String getComponentType() {
        return UIHints.DEFAULT_COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIHints.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        timerLength = null;
        expireTimeout = null;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(TIMER_LENGTH_ATTNAME, timerLength);
        uiComponent.setValueExpression(EXPIRE_TIMEOUT_ATTNAME, expireTimeout);
    }

    public void setTimerLength(ValueExpression timerLength) {
        this.timerLength = timerLength;
    }

    public void setExpireTimeout(ValueExpression expireTimeout) {
        this.expireTimeout = expireTimeout;
    }
}
