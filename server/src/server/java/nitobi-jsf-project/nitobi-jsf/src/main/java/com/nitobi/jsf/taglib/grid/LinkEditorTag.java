/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UILinkEditor;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class LinkEditorTag extends UIComponentELTag {

    private ValueExpression openWindow = null;
    
    public static final String OPEN_WINDOW_ATTNAME = "openWindow";
    
    @Override
    public String getComponentType() {
        return UILinkEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UILinkEditor.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        openWindow = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(OPEN_WINDOW_ATTNAME, openWindow);
    }

    public void setOpenWindow(ValueExpression openWindow) {
        this.openWindow = openWindow;
    }
}
