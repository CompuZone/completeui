/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.combo;

import com.nitobi.jsf.component.combo.UIComboColumnDefinition;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author Eric Buitenhuis
 */
public class ComboColumnDefinitionTag extends UIComponentELTag {

    private ValueExpression align = null;
    private ValueExpression columnType = null;
    private ValueExpression cssClassName = null;
    private ValueExpression dataFieldIndex = null;
    private ValueExpression htmlPrefix = null;
    private ValueExpression htmlSuffix = null;
    private ValueExpression headerLabel = null;
    private ValueExpression imageHandlerURL = null;
    private ValueExpression textColor = null;
    private ValueExpression width = null;

    public static final String ALIGN_ATTNAME = "align";
    public static final String COLUMN_TYPE_ATTNAME = "columnType";
    public static final String CSS_CLASS_NAME_ATTNAME = "cssClassName";
    public static final String DATA_FIELD_INDEX_ATTNAME = "dataFieldIndex";
    public static final String HTML_PREFIX_ATTNAME = "htmlPrefix";
    public static final String HTML_SUFFIX_ATTNAME = "htmlSuffix";
    public static final String HEADER_LABEL_ATTNAME = "headerLabel";
    public static final String IMAGE_HANDLER_URL_ATTNAME = "imageHandlerURL";
    public static final String TEXT_COLOR_ATTNAME = "textColor";
    public static final String WIDTH_ATTNAME = "width";

    @Override
    public String getComponentType() {
        return UIComboColumnDefinition.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIComboColumnDefinition.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        
        align = null;
        columnType = null;
        cssClassName = null;
        dataFieldIndex = null;
        htmlPrefix = null;
        htmlSuffix = null;
        imageHandlerURL = null;
        headerLabel = null;
        textColor = null;
        width = null;
    }



    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        
        component.setValueExpression(ALIGN_ATTNAME, align);
        component.setValueExpression(COLUMN_TYPE_ATTNAME, columnType);
        component.setValueExpression(CSS_CLASS_NAME_ATTNAME, cssClassName);
        component.setValueExpression(DATA_FIELD_INDEX_ATTNAME, dataFieldIndex);
        component.setValueExpression(HTML_PREFIX_ATTNAME, htmlPrefix);
        component.setValueExpression(HTML_SUFFIX_ATTNAME, htmlSuffix);
        component.setValueExpression(HEADER_LABEL_ATTNAME, headerLabel);
        component.setValueExpression(IMAGE_HANDLER_URL_ATTNAME, imageHandlerURL);
        component.setValueExpression(TEXT_COLOR_ATTNAME, textColor);
        component.setValueExpression(WIDTH_ATTNAME, width);
    }

    public void setAlign(ValueExpression align) {
        this.align = align;
    }

    public void setColumnType(ValueExpression columnType) {
        this.columnType = columnType;
    }

    public void setCssClassName(ValueExpression cssClassName) {
        this.cssClassName = cssClassName;
    }

    public void setDataFieldIndex(ValueExpression dataFieldIndex) {
        this.dataFieldIndex = dataFieldIndex;
    }

    public void setHtmlSuffix(ValueExpression htmlSuffix) {
        this.htmlSuffix = htmlSuffix;
    }

    public void setImageHandlerURL(ValueExpression imageHandlerURL) {
        this.imageHandlerURL = imageHandlerURL;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }
    
    public void setHeaderLabel(ValueExpression headerLabel) {
        this.headerLabel = headerLabel;
    }

    public void setHtmlPrefix(ValueExpression htmlPrefix) {
        this.htmlPrefix = htmlPrefix;
    }

    public void setTextColor(ValueExpression textColor) {
        this.textColor = textColor;
    }
}
