/**
 * User: Eric Buitenhuis 
 * Date: May 24, 2008
 * Time: 12:12:17 AM
 */

package com.nitobi.jsf.taglib;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * JavascriptMethodTag - This taglib class is meant for components meant to be output purely as javascript. It
 * provides a uniform mechanism to define a starting object in the DOM and the event that object triggers to
 * kick off the method.
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public abstract class JavascriptEventBasedComponentTag extends UIComponentELTag {
    private ValueExpression startingObject = null;
    private ValueExpression startingEvent = null;

    public static final String STARTINGOBJECT = "startingObject";
    public static final String STARTINGEVENT = "startingEvent";

    @Override
    public void release() {
        super.release();
        setStartingEvent(null);
        setStartingObject(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(STARTINGEVENT, startingEvent);
        uiComponent.setValueExpression(STARTINGOBJECT, startingObject);
    }

    public void setStartingObject(ValueExpression startingObject) {
        this.startingObject = startingObject;
    }

    public void setStartingEvent(ValueExpression startingEvent) {
        this.startingEvent = startingEvent;
    }
}
