/**
 * User: Eric Buitenhuis 
 * Date: Jun 22, 2008
 * Time: 9:47:55 PM
 */

package com.nitobi.jsf.taglib.calendar;

import com.nitobi.jsf.component.calendar.UIDateInput;
import com.nitobi.jsf.taglib.NitobiTag;

import javax.el.ValueExpression;

/**
 * DateInputTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class DateInputTag extends NitobiTag {

    private ValueExpression displayMask = null;
    private ValueExpression editMask = null;
    private ValueExpression onBlur = null;
    private ValueExpression onFocus = null;
    private ValueExpression width = null;
    private ValueExpression editable = null;

    public String getComponentType() {
        return UIDateInput.COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UIDateInput.RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setDisplayMask(null);
        setEditMask(null);
        setOnBlur(null);
        setOnFocus(null);
        setWidth(null);
        setEditable(null);
    }

    public ValueExpression getDisplayMask() {
        return displayMask;
    }

    public void setDisplayMask(ValueExpression displayMask) {
        this.displayMask = displayMask;
    }

    public ValueExpression getEditMask() {
        return editMask;
    }

    public void setEditMask(ValueExpression editMask) {
        this.editMask = editMask;
    }

    public ValueExpression getOnBlur() {
        return onBlur;
    }

    public void setOnBlur(ValueExpression onBlur) {
        this.onBlur = onBlur;
    }

    public ValueExpression getOnFocus() {
        return onFocus;
    }

    public void setOnFocus(ValueExpression onFocus) {
        this.onFocus = onFocus;
    }

    public ValueExpression getEditable() {
        return editable;
    }

    public void setEditable(ValueExpression editable) {
        this.editable = editable;
    }

    public ValueExpression getWidth() {
        return width;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }
}
