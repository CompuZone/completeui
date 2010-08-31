package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIDataSourceStructure;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * DataSourceStructureTag
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class DataSourceStructureTag extends UIComponentELTag {

    private ValueExpression fieldNames = null;
    private ValueExpression keys = null;
    
    public static final String FIELD_NAMES_ATTNAME = "fieldNames";
    public static final String KEYS_ATTNAME = "keys";
    
    @Override
    public String getComponentType() {
        return UIDataSourceStructure.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIDataSourceStructure.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        fieldNames = null;
        keys = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(KEYS_ATTNAME, keys);
        component.setValueExpression(FIELD_NAMES_ATTNAME, fieldNames);
    }

    public ValueExpression getFieldNames() {
        return fieldNames;
    }

    public void setFieldNames(ValueExpression fieldNames) {
        this.fieldNames = fieldNames;
    }

    public ValueExpression getKeys() {
        return keys;
    }

    public void setKeys(ValueExpression keys) {
        this.keys = keys;
    }

    
}
