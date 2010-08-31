/**
 * User: Eric Buitenhuis 
 * Date: May 28, 2008
 * Time: 5:53:54 PM
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIExpandColumn;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;

/**
 * ExpandTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class ExpandColumnTag extends ColumnTag {

    private ValueExpression childColumnSet = null;
    private ValueExpression width = null;

    public static final String CHILDCOLUMNSET = "childColumnSet";
    public static final String WIDTH = "width";

    @Override
    public String getComponentType() {
        return UIExpandColumn.DEFAULT_COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIExpandColumn.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setChildColumnSet(null);
        setWidth(null);
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(CHILDCOLUMNSET, childColumnSet);
        component.setValueExpression(WIDTH, width);
    }

    public void setChildColumnSet(ValueExpression childColumnSet) {
        this.childColumnSet = childColumnSet;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }
}
