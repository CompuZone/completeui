package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIDateColumn;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;

/**
 *
 * @author eric
 */
public class DateColumnTag extends ColumnTag {

    private ValueExpression mask = null;
    
    public static final String MASK_ATTNAME = "mask";
    
    @Override
    public String getComponentType() {
        return UIDateColumn.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIDateColumn.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        mask = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        
        component.setValueExpression(MASK_ATTNAME, mask);
    }

    public void setMask(ValueExpression mask) {
        this.mask = mask;
    }
}
