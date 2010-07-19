/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UILookupEditor;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class LookupEditorTag extends UIComponentELTag {

    private ValueExpression delay = null;
    private ValueExpression forceValidOption = null;
    private ValueExpression displayFields = null;
    private ValueExpression getHandler = null;
    private ValueExpression dataSourceId = null;
    private ValueExpression valueField = null;
    
    public static final String DELAY_TAGNAME = "delay";
    public static final String FORCE_VALID_OPTION_TAGNAME = "forceValidOption";
    public static final String DISPLAY_FIELDS_ATTNAME = "displayFields";
    public static final String GET_HANDLER_ATTNAME = "getHandler";
    public static final String DATA_SOURCE_ID_ATTNAME = "dataSourceId";
    public static final String VALUE_FIELD_ATTNAME = "valueField";
    
    @Override
    public String getComponentType() {
        return UILookupEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UILookupEditor.DEFAULT_RENDERER_TYPE;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        
        component.setValueExpression(DELAY_TAGNAME, delay);
        component.setValueExpression(FORCE_VALID_OPTION_TAGNAME, forceValidOption);
        component.setValueExpression(DISPLAY_FIELDS_ATTNAME, displayFields);
        component.setValueExpression(GET_HANDLER_ATTNAME, getHandler);
        component.setValueExpression(DATA_SOURCE_ID_ATTNAME, dataSourceId);
        component.setValueExpression(VALUE_FIELD_ATTNAME, valueField);
    }

    @Override
    public void release() {
        super.release();
        
        setDelay(null);
        setForceValidOption(null);
        setDisplayFields(null);
        setGetHandler(null);
        setDataSourceId(null);
        setValueField(null);
    }
    
    public ValueExpression getDelay() {
        return delay;
    }

    public void setDelay(ValueExpression delay) {
        this.delay = delay;
    }

    public ValueExpression getForceValidOption() {
        return forceValidOption;
    }

    public void setForceValidOption(ValueExpression forceValidOption) {
        this.forceValidOption = forceValidOption;
    }

    public void setDisplayFields(ValueExpression displayFields) {
        this.displayFields = displayFields;
    }

    public void setGetHandler(ValueExpression getHandler) {
        this.getHandler = getHandler;
    }

    public void setDataSourceId(ValueExpression dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public void setValueField(ValueExpression valueField) {
        this.valueField = valueField;
    }
}
