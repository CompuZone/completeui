package com.nitobi.jsf.taglib.calendar;

import com.nitobi.jsf.component.calendar.UIDatePicker;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.NitobiTag;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import java.util.logging.Level;

/**
 * @author eric
 */
public class DatePickerTag extends NitobiTag {

    private ValueExpression autoInitialize = null;
    private ValueExpression value = null;
    private ValueExpression theme = null;
    private ValueExpression minDate = null;
    private ValueExpression maxDate = null;
    private ValueExpression selectedDate = null;
    private ValueExpression submitMask = null;
    private ValueExpression longMonthNames = null;
    private ValueExpression shortMonthNames = null;
    private ValueExpression longDayNames = null;
    private ValueExpression shortDayNames = null;
    private ValueExpression minDayNames = null;
    private MethodExpression eventsUrl = null;
    private ValueExpression onSetInvalidDate = null;
    private ValueExpression onSetOutOfRangeDate = null;
    private ValueExpression onSetDisabledDate = null;
    private ValueExpression onDateSelected = null;
    private ValueExpression navConfirmText = null;
    private ValueExpression navCancelText = null;
    private ValueExpression navOutOfRangeText = null;
    private ValueExpression navInvalidYearText = null;
    private ValueExpression shimEnabled = null;
    private ValueExpression onEventDateSelected = null;


    @Override
    public String getComponentType() {
        return UIDatePicker.DEFAULT_COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIDatePicker.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setAutoInitialize(null);
        setValue(null);
        setTheme(null);
        setMinDate(null);
        setMaxDate(null);
        setSelectedDate(null);
        setSubmitMask(null);
        setLongMonthNames(null);
        setShortMonthNames(null);
        setLongDayNames(null);
        setShortDayNames(null);
        setMinDayNames(null);
        setEventsUrl(null);
        setOnSetInvalidDate(null);
        setOnSetOutOfRangeDate(null);
        setOnSetDisabledDate(null);
        setOnDateSelected(null);
        setNavConfirmText(null);
        setNavCancelText(null);
        setNavOutOfRangeText(null);
        setNavInvalidYearText(null);
        setShimEnabled(null);
        setOnEventDateSelected(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);

        UIDatePicker datePicker;
        try {
            datePicker = (UIDatePicker) uiComponent;
        } catch (ClassCastException e) {
            log.logp(Level.SEVERE, DatePickerTag.class.getName(), "setProperties", "Could not cast the incoming uiComponent object to a UIDatePicker component.");
            throw new FacesException("DatePickerTag::setProperties() -- Could not cast the incoming uiComponent object to a UIDatePicker component.");
        }

        if (eventsUrl != null) {
            datePicker.setEventsUrl(eventsUrl);
        }

        datePicker.setValueExpression(NitobiRenderer.AUTOINIT, getAutoInitialize());

        if (value != null) {
            datePicker.setValueExpression("value", value);
        }
    }

    public ValueExpression getAutoInitialize() {
        return autoInitialize;
    }

    public ValueExpression getValue() {
        return value;
    }

    public void setValue(ValueExpression value) {
        this.value = value;
    }

    public void setAutoInitialize(ValueExpression autoInitialize) {
        this.autoInitialize = autoInitialize;
    }

    public ValueExpression getLongDayNames() {
        return longDayNames;
    }

    public void setLongDayNames(ValueExpression longDayNames) {
        this.longDayNames = longDayNames;
    }

    public ValueExpression getLongMonthNames() {
        return longMonthNames;
    }

    public void setLongMonthNames(ValueExpression longMonthNames) {
        this.longMonthNames = longMonthNames;
    }

    public ValueExpression getMinDayNames() {
        return minDayNames;
    }

    public void setMinDayNames(ValueExpression minDayNames) {
        this.minDayNames = minDayNames;
    }

    public ValueExpression getShortDayNames() {
        return shortDayNames;
    }

    public void setShortDayNames(ValueExpression shortDayNames) {
        this.shortDayNames = shortDayNames;
    }

    public ValueExpression getShortMonthNames() {
        return shortMonthNames;
    }

    public void setShortMonthNames(ValueExpression shortMonthNames) {
        this.shortMonthNames = shortMonthNames;
    }

    public MethodExpression getEventsUrl() {
        return eventsUrl;
    }

    public void setEventsUrl(MethodExpression eventsUrl) {
        this.eventsUrl = eventsUrl;
    }

    public ValueExpression getMaxDate() {
        return maxDate;
    }

    public void setMaxDate(ValueExpression maxDate) {
        this.maxDate = maxDate;
    }

    public ValueExpression getMinDate() {
        return minDate;
    }

    public void setMinDate(ValueExpression minDate) {
        this.minDate = minDate;
    }

    public ValueExpression getOnSetInvalidDate() {
        return onSetInvalidDate;
    }

    public void setOnSetInvalidDate(ValueExpression onSetInvalidDate) {
        this.onSetInvalidDate = onSetInvalidDate;
    }

    public ValueExpression getOnSetOutOfRangeDate() {
        return onSetOutOfRangeDate;
    }

    public void setOnSetOutOfRangeDate(ValueExpression onSetOutOfRangeDate) {
        this.onSetOutOfRangeDate = onSetOutOfRangeDate;
    }

    public ValueExpression getSelectedDate() {
        return selectedDate;
    }

    public void setSelectedDate(ValueExpression selectedDate) {
        this.selectedDate = selectedDate;
    }

    public ValueExpression getSubmitMask() {
        return submitMask;
    }

    public void setSubmitMask(ValueExpression submitMask) {
        this.submitMask = submitMask;
    }

    public ValueExpression getTheme() {
        return theme;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }

    public ValueExpression getOnDateSelected() {
        return onDateSelected;
    }

    public void setOnDateSelected(ValueExpression onDateSelected) {
        this.onDateSelected = onDateSelected;
    }

    public ValueExpression getOnSetDisabledDate() {
        return onSetDisabledDate;
    }

    public void setOnSetDisabledDate(ValueExpression onSetDisabledDate) {
        this.onSetDisabledDate = onSetDisabledDate;
    }

    public ValueExpression getNavCancelText() {
        return navCancelText;
    }

    public void setNavCancelText(ValueExpression navCancelText) {
        this.navCancelText = navCancelText;
    }

    public ValueExpression getNavConfirmText() {
        return navConfirmText;
    }

    public void setNavConfirmText(ValueExpression navConfirmText) {
        this.navConfirmText = navConfirmText;
    }

    public ValueExpression getNavInvalidYearText() {
        return navInvalidYearText;
    }

    public void setNavInvalidYearText(ValueExpression navInvalidYearText) {
        this.navInvalidYearText = navInvalidYearText;
    }

    public ValueExpression getNavOutOfRangeText() {
        return navOutOfRangeText;
    }

    public void setNavOutOfRangeText(ValueExpression navOutOfRangeText) {
        this.navOutOfRangeText = navOutOfRangeText;
    }

    public ValueExpression getShimEnabled() {
        return shimEnabled;
    }

    public void setShimEnabled(ValueExpression shimEnabled) {
        this.shimEnabled = shimEnabled;
    }

    public ValueExpression getOnEventDateSelected() {
        return onEventDateSelected;
    }

    public void setOnEventDateSelected(ValueExpression onEventDateSelected) {
        this.onEventDateSelected = onEventDateSelected;
    }
}
