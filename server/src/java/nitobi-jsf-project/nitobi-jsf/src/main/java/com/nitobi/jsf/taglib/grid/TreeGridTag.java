/**
 * User: Eric Buitenhuis 
 * Date: May 28, 2008
 * Time: 1:15:09 PM
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UITreeGrid;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;

/**
 * TreeGridTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TreeGridTag extends GridTag {

    private ValueExpression rootColumns = null;
    private ValueExpression groupOffset = null;

    public static final String ROOTCOLUMNS = "rootColumns";
    public static final String GROUPOFFSET = "groupOffset";

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(ROOTCOLUMNS, rootColumns);
        component.setValueExpression(GROUPOFFSET, groupOffset);
    }

    @Override
    public void release() {
        super.release();
        setRootColumns(null);
        setGroupOffset(null);
    }

    @Override
    public String getComponentType() {
        return UITreeGrid.DEFAULT_COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UITreeGrid.DEFAULT_RENDERER_TYPE;
    }

    public void setGroupOffset(ValueExpression groupOffset) {
        this.groupOffset = groupOffset;
    }

    public void setRootColumns(ValueExpression rootColumns) {
        this.rootColumns = rootColumns;
    }
}
