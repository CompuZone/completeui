package com.nitobi.jsf.taglib.combo;

import com.nitobi.jsf.component.combo.UIComboBox;
import com.nitobi.jsf.renderer.NitobiRenderer;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * @author Eric Buitenhuis
 */
public class ComboBoxTag extends UIComponentELTag {

    private ValueExpression autoInitialize = null;
    private ValueExpression cssClassName = null;
    private ValueExpression dataTextField = null;
    private ValueExpression dataValueField = null;
    private ValueExpression disabledWarningMessages = null;
    private ValueExpression enabled = null;
    private ValueExpression errorLevel = null;
    private ValueExpression height = null;
    private ValueExpression httpRequestMethod = null;
    private ValueExpression initialSearch = null;
    private ValueExpression listZIndex = null;
    private ValueExpression mode = null;
    private ValueExpression smartListSeparator = null;
    private ValueExpression tabIndex = null;
    private ValueExpression width = null;
    private ValueExpression onBeforeSelectEvent = null;
    private ValueExpression onBlurEvent = null;
    private ValueExpression onFocusEvent = null;
    private ValueExpression onLoadEvent = null;
    private ValueExpression onSelectEvent = null;
    private ValueExpression onTabEvent = null;
    private ValueExpression value = null;
    private ValueExpression theme = null;

    public static final String AUTOINITIALIZE_ATTNAME = "autoInitialize";
    public static final String CSS_CLASS_NAME_ATTNAME = "cssClassName";
    public static final String DATA_TEXT_FIELD_ATTNAME = "dataTextField";
    public static final String DATA_VALUE_FIELD_ATTNAME = "dataValueField";
    public static final String DISABLED_WARNING_MESSAGES_ATTNAME = "disabledWarningMessages";
    public static final String ENABLED_ATTNAME = "enabled";
    public static final String ERROR_LEVEL_ATTNAME = "errorLevel";
    public static final String HEIGHT_ATTNAME = "height";
    public static final String HTTP_REQUEST_METHOD_ATTNAME = "httpRequestMethod";
    public static final String INITIAL_SEARCH_ATTNAME = "initialSearch";
    public static final String LIST_Z_INDEX_ATTNAME = "listZIndex";
    public static final String MODE_ATTNAME = "mode";
    public static final String SMART_LIST_SEPARATOR_ATTNAME = "smartListSeparator";
    public static final String TAB_INDEX_ATTNAME = "tabIndex";
    public static final String WIDTH_ATTNAME = "width";
    public static final String ON_BEFORE_SELECT_EVENT_ATTNAME = "onBeforeSelectEvent";
    public static final String ON_BLUR_EVENT_ATTNAME = "onBlurEvent";
    public static final String ON_FOCUS_EVENT_ATTNAME = "onFocusEvent";
    public static final String ON_LOAD_EVENT_ATTNAME = "onLoadEvent";
    public static final String ON_SELECT_EVENT_ATTNAME = "onSelectEvent";
    public static final String ON_TAB_EVENT_ATTNAME = "onTabEvent";
    public static final String VALUE = "value";
    public static final String THEME = "theme";

    public ComboBoxTag() {
        super();
    }

    @Override
    public String getComponentType() {
        return UIComboBox.COMPONENT_TYPE;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);

        component.setValueExpression(NitobiRenderer.AUTOINIT, autoInitialize);
        component.setValueExpression(CSS_CLASS_NAME_ATTNAME, cssClassName);
        component.setValueExpression(DATA_TEXT_FIELD_ATTNAME, dataTextField);
        component.setValueExpression(DATA_VALUE_FIELD_ATTNAME, dataValueField);
        component.setValueExpression(DISABLED_WARNING_MESSAGES_ATTNAME, disabledWarningMessages);
        component.setValueExpression(ENABLED_ATTNAME, enabled);
        component.setValueExpression(ERROR_LEVEL_ATTNAME, errorLevel);
        component.setValueExpression(HEIGHT_ATTNAME, height);
        component.setValueExpression(HTTP_REQUEST_METHOD_ATTNAME, httpRequestMethod);
        component.setValueExpression(INITIAL_SEARCH_ATTNAME, initialSearch);
        component.setValueExpression(LIST_Z_INDEX_ATTNAME, listZIndex);
        component.setValueExpression(MODE_ATTNAME, mode);
        component.setValueExpression(SMART_LIST_SEPARATOR_ATTNAME, smartListSeparator);
        component.setValueExpression(TAB_INDEX_ATTNAME, tabIndex);
        component.setValueExpression(WIDTH_ATTNAME, width);
        component.setValueExpression(ON_BEFORE_SELECT_EVENT_ATTNAME, onBeforeSelectEvent);
        component.setValueExpression(ON_BLUR_EVENT_ATTNAME, onBlurEvent);
        component.setValueExpression(ON_FOCUS_EVENT_ATTNAME, onFocusEvent);
        component.setValueExpression(ON_LOAD_EVENT_ATTNAME, onLoadEvent);
        component.setValueExpression(ON_SELECT_EVENT_ATTNAME, onSelectEvent);
        component.setValueExpression(ON_TAB_EVENT_ATTNAME, onTabEvent);
        component.setValueExpression(VALUE, value);
        component.setValueExpression(THEME, theme);
    }

    @Override
    public String getRendererType() {
        return UIComboBox.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        autoInitialize = null;
        cssClassName = null;
        dataTextField = null;
        dataValueField = null;
        disabledWarningMessages = null;
        enabled = null;
        errorLevel = null;
        height = null;
        httpRequestMethod = null;
        initialSearch = null;
        listZIndex = null;
        mode = null;
        smartListSeparator = null;
        tabIndex = null;
        width = null;
        onBeforeSelectEvent = null;
        onBlurEvent = null;
        onFocusEvent = null;
        onLoadEvent = null;
        onSelectEvent = null;
        onTabEvent = null;
        value = null;
        setTheme(null);
    }

    public void setAutoInitialize(ValueExpression autoInitialize) {
        this.autoInitialize = autoInitialize;
    }

    public ValueExpression getValue() {
        return value;
    }

    public void setValue(ValueExpression value) {
        this.value = value;
    }

    public void setCssClassName(ValueExpression cssClassName) {
        this.cssClassName = cssClassName;
    }

    public void setDataTextField(ValueExpression dataTextField) {
        this.dataTextField = dataTextField;
    }

    public void setDataValueField(ValueExpression dataValueField) {
        this.dataValueField = dataValueField;
    }

    public void setDisabledWarningMessages(ValueExpression disabledWarningMessages) {
        this.disabledWarningMessages = disabledWarningMessages;
    }

    public void setEnabled(ValueExpression enabled) {
        this.enabled = enabled;
    }

    public void setErrorLevel(ValueExpression errorLevel) {
        this.errorLevel = errorLevel;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }

    public void setHttpRequestMethod(ValueExpression httpRequestMethod) {
        this.httpRequestMethod = httpRequestMethod;
    }

    public void setInitialSearch(ValueExpression initialSearch) {
        this.initialSearch = initialSearch;
    }

    public void setListZIndex(ValueExpression listZIndex) {
        this.listZIndex = listZIndex;
    }

    public void setMode(ValueExpression mode) {
        this.mode = mode;
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

    public void setSmartListSeparator(ValueExpression smartListSeparator) {
        this.smartListSeparator = smartListSeparator;
    }

    public void setTabIndex(ValueExpression tabIndex) {
        this.tabIndex = tabIndex;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }
}
