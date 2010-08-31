/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.combo;

import com.nitobi.jsf.component.combo.UIComboList;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class ComboListTag extends UIComponentELTag {

    private static final Logger logger = Logger.getLogger(ComboListTag.class.getName());

    private ValueExpression allowPaging = null;
    private ValueExpression backgroundHighlightColor = null;
    private ValueExpression customHTMLDefinition = null;
    private ValueExpression customHTMLHeader = null;
    private MethodExpression datasourceUrl = null;
    private ValueExpression foregroundHighlightColor = null;
    private ValueExpression fuzzySearchEnabled = null;
    private ValueExpression height = null;
    private ValueExpression highlightCSSClassName = null;
    private ValueExpression pageSize = null;
    private ValueExpression width = null;
    private ValueExpression onAfterSearchEvent = null;
    private ValueExpression onBeforeSearchEvent = null;
    private ValueExpression onHideEvent = null;
    private ValueExpression onShowEvent = null;

    public static final String ALLOW_PAGING_ATTNAME = "allowPaging";
    public static final String BACKGROUND_HIGHLIGHT_COLOR_ATTNAME = "backgroundHighlightColor";
    public static final String CUSTOM_HTML_DEFINITION_ATTNAME = "customHTMLDefinition";
    public static final String CUSTOM_HTML_HEADER_ATTNAME = "customHTMLHeader";
    public static final String FOREGROUND_HIGHLIGHT_COLOR_ATTNAME = "foregroundHighlightColor";
    public static final String FUZZY_SEARCH_ENABLED_ATTNAME = "fuzzySearchEnabled";
    public static final String HEIGHT_ATTNAME = "height";
    public static final String HIGHLIGHT_CSS_CLASS_NAME_ATTNAME = "highlightCSSClassName";
    public static final String PAGE_SIZE_ATTNAME = "pageSize";
    public static final String WIDTH_ATTNAME = "width";
    public static final String ON_AFTER_SEARCH_EVENT_ATTNAME = "onAfterSearchEvent";
    public static final String ON_BEFORE_SEARCH_EVENT_ATTNAME = "onBeforeSearchEvent";
    public static final String ON_HIDE_EVENT_ATTNAME = "onHideEvent";
    public static final String ON_SHOW_EVENT_ATTNAME = "onShowEvent";
    public static final String DATASOURCE_URL_ATTNAME = "datasourceUrl";
    @Override
    public String getComponentType() {
        return UIComboList.LOCAL_COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIComboList.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        
        allowPaging = null;
        backgroundHighlightColor = null;
        customHTMLDefinition = null;
        customHTMLHeader = null;
        datasourceUrl = null;
        foregroundHighlightColor = null;
        fuzzySearchEnabled = null;
        height = null;
        highlightCSSClassName = null;
        pageSize = null;
        width = null;
        onAfterSearchEvent = null;
        onBeforeSearchEvent = null;
        onHideEvent = null;
        onShowEvent = null;
        //populateMethod = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);

        UIComboList comboList = null;

        try {
            comboList = (UIComboList)component;
        } catch(ClassCastException e) {
            logger.severe("Could not cast the UIComponent to type UIComboList. ");
            throw new IllegalStateException("Could not cast the UIComponent to type UIComboList");
        }
        
        comboList.setValueExpression(ALLOW_PAGING_ATTNAME, allowPaging);
        comboList.setValueExpression(BACKGROUND_HIGHLIGHT_COLOR_ATTNAME, backgroundHighlightColor);
        comboList.setValueExpression(CUSTOM_HTML_DEFINITION_ATTNAME, customHTMLDefinition);
        comboList.setValueExpression(CUSTOM_HTML_HEADER_ATTNAME, customHTMLHeader);

        if(logger.isLoggable(Level.FINE)) {
            if(datasourceUrl.isLiteralText()) {
                logger.fine("The datasourceUrl is a literal text: " + datasourceUrl.getExpressionString());
            } else {
                logger.fine("The datasourceUrl is a method expression: " + datasourceUrl.getExpressionString());
            }
        }

        if(null != datasourceUrl) {
            comboList.setDatasourceUrl(datasourceUrl);
        }
        
        comboList.setValueExpression(FOREGROUND_HIGHLIGHT_COLOR_ATTNAME, foregroundHighlightColor);
        comboList.setValueExpression(FUZZY_SEARCH_ENABLED_ATTNAME, fuzzySearchEnabled);
        comboList.setValueExpression(HEIGHT_ATTNAME, height);
        comboList.setValueExpression(HIGHLIGHT_CSS_CLASS_NAME_ATTNAME, highlightCSSClassName);
        comboList.setValueExpression(PAGE_SIZE_ATTNAME, pageSize);
        comboList.setValueExpression(WIDTH_ATTNAME, width);
        comboList.setValueExpression(ON_AFTER_SEARCH_EVENT_ATTNAME, onAfterSearchEvent);
        comboList.setValueExpression(ON_BEFORE_SEARCH_EVENT_ATTNAME, onBeforeSearchEvent);
        comboList.setValueExpression(ON_HIDE_EVENT_ATTNAME, onHideEvent);
        comboList.setValueExpression(ON_SHOW_EVENT_ATTNAME, onShowEvent);
    }

    public void setAllowPaging(ValueExpression allowPaging) {
        this.allowPaging = allowPaging;
    }

    public void setBackgroundHighlightColor(ValueExpression backgroundHighlightColor) {
        this.backgroundHighlightColor = backgroundHighlightColor;
    }

    public void setCustomHTMLDefinition(ValueExpression customHTMLDefinition) {
        this.customHTMLDefinition = customHTMLDefinition;
    }

    public void setCustomHTMLHeader(ValueExpression customHTMLHeader) {
        this.customHTMLHeader = customHTMLHeader;
    }

    public void setDatasourceUrl(MethodExpression datasourceUrl) {
        this.datasourceUrl = datasourceUrl;
    }

    public void setForegroundHighlightColor(ValueExpression foregroundHighlightColor) {
        this.foregroundHighlightColor = foregroundHighlightColor;
    }

    public void setFuzzySearchEnabled(ValueExpression fuzzySearchEnabled) {
        this.fuzzySearchEnabled = fuzzySearchEnabled;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }

    public void setHighlightCSSClassName(ValueExpression highlightCSSClassName) {
        this.highlightCSSClassName = highlightCSSClassName;
    }

    public void setOnAfterSearchEvent(ValueExpression onAfterSearchEvent) {
        this.onAfterSearchEvent = onAfterSearchEvent;
    }

    public void setOnBeforeSearchEvent(ValueExpression onBeforeSearchEvent) {
        this.onBeforeSearchEvent = onBeforeSearchEvent;
    }

    public void setOnHideEvent(ValueExpression onHideEvent) {
        this.onHideEvent = onHideEvent;
    }

    public void setOnShowEvent(ValueExpression onShowEvent) {
        this.onShowEvent = onShowEvent;
    }

    public void setPageSize(ValueExpression pageSize) {
        this.pageSize = pageSize;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }
}
