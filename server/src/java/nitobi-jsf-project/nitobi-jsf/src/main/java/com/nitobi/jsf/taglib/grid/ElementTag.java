/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIElement;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class ElementTag extends UIComponentELTag {

    private ValueExpression data = null;
    private static Logger logger = Logger.getLogger(ElementTag.class.getName());
 
    public static final String DATA_ATTNAME = "data";
    
    @Override
    public String getComponentType() {
        return UIElement.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIElement.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        data = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        logger.finest("ElementTag setProperties called.");
        component.setValueExpression(DATA_ATTNAME, data);
    }

    public void setData(ValueExpression data) {
        logger.finest("receiving 'data' value expression: " + data.toString());
        this.data = data;
    }
    
    
    
}
