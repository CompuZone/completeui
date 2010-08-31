package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UINumberColumn;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;

/**
 *
 * @author eric
 */
public class NumberColumnTag extends ColumnTag {

    private ValueExpression mask = null;
    private ValueExpression groupingSeparator = null;
    private ValueExpression decimalSeparator = null;
    private ValueExpression negativeMask = null;   // rel 2008q1
    
    public static final String MASK_ATTNAME = "mask";
    public static final String GROUPING_SEPARATOR_ATTNAME = "groupingSeparator";
    public static final String DECIMAL_SEPARATOR_ATTNAME = "decimalSeparator";
    public static final String NEGATIVE_MASK_ATTNAME = "negativeMask";   // rel 2008q1
    
    @Override
    public String getComponentType() {
        return UINumberColumn.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UINumberColumn.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        mask = null;
        groupingSeparator = null;
        decimalSeparator = null;
        negativeMask = null;   // rel 2008q1
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(MASK_ATTNAME, mask);
        component.setValueExpression(GROUPING_SEPARATOR_ATTNAME, groupingSeparator);
        component.setValueExpression(DECIMAL_SEPARATOR_ATTNAME, decimalSeparator);
        component.setValueExpression(NEGATIVE_MASK_ATTNAME, negativeMask);   // rel 2008q1
    }

    public ValueExpression getDecimalSeparator() {
        return decimalSeparator;
    }

    public void setDecimalSeparator(ValueExpression decimalSeparator) {
        this.decimalSeparator = decimalSeparator;
    }

    public ValueExpression getGroupingSeparator() {
        return groupingSeparator;
    }

    public void setGroupingSeparator(ValueExpression groupingSeparator) {
        this.groupingSeparator = groupingSeparator;
    }

    public ValueExpression getMask() {
        return mask;
    }

    public void setMask(ValueExpression mask) {
        this.mask = mask;
    }

    public ValueExpression getNegativeMask() {
        return negativeMask;
    }

    public void setNegativeMask(ValueExpression negativeMask) {
        this.negativeMask = negativeMask;
    }

}
