/**
 * User: Eric Buitenhuis 
 * Date: Jun 23, 2008
 * Time: 2:11:07 AM
 */

package com.nitobi.jsf.taglib.calendar;

import com.nitobi.jsf.component.calendar.UICalendar;
import com.nitobi.jsf.taglib.NitobiTag;

import javax.el.ValueExpression;

/**
 * CalendarTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
@SuppressWarnings({"PublicMethodNotExposedInInterface", "SameParameterValue"})
public class CalendarTag extends NitobiTag {

    private ValueExpression monthColumns =null;
    private ValueExpression monthRows =null;
    private ValueExpression effectEnabled =null;
    private ValueExpression onHide =null;
    private ValueExpression onShow =null;
    private ValueExpression onDateClicked =null;
    private ValueExpression onMonthChanged =null;
    private ValueExpression onYearChanged =null;

    public String getComponentType() {
        return UICalendar.COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UICalendar.RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setMonthColumns(null);
        setMonthRows(null);
        setEffectEnabled(null);
        setOnHide(null);
        setOnShow(null);
        setOnDateClicked(null);
        setOnMonthChanged(null);
        setOnYearChanged(null);
    }

    public ValueExpression getEffectEnabled() {
        return effectEnabled;
    }

    public void setEffectEnabled(ValueExpression effectEnabled) {
        this.effectEnabled = effectEnabled;
    }

    public ValueExpression getMonthColumns() {
        return monthColumns;
    }

    public void setMonthColumns(ValueExpression monthColumns) {
        this.monthColumns = monthColumns;
    }

    public ValueExpression getMonthRows() {
        return monthRows;
    }

    public void setMonthRows(ValueExpression monthRows) {
        this.monthRows = monthRows;
    }

    public ValueExpression getOnDateClicked() {
        return onDateClicked;
    }

    public void setOnDateClicked(ValueExpression onDateClicked) {
        this.onDateClicked = onDateClicked;
    }

    public ValueExpression getOnHide() {
        return onHide;
    }

    public void setOnHide(ValueExpression onHide) {
        this.onHide = onHide;
    }

    public ValueExpression getOnMonthChanged() {
        return onMonthChanged;
    }

    public void setOnMonthChanged(ValueExpression onMonthChanged) {
        this.onMonthChanged = onMonthChanged;
    }

    public ValueExpression getOnShow() {
        return onShow;
    }

    public void setOnShow(ValueExpression onShow) {
        this.onShow = onShow;
    }

    public ValueExpression getOnYearChanged() {
        return onYearChanged;
    }

    public void setOnYearChanged(ValueExpression onYearChanged) {
        this.onYearChanged = onYearChanged;
    }
}
