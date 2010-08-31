/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIListboxEditor;

import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class ListboxEditorTag extends UIComponentELTag {

    @Override
    public String getComponentType() {
        return UIListboxEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIListboxEditor.DEFAULT_RENDERER_TYPE;
    }

}
