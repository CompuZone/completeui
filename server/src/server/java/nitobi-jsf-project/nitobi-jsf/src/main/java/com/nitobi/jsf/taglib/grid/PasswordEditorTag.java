/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIPasswordEditor;

import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class PasswordEditorTag extends UIComponentELTag {

    @Override
    public String getComponentType() {
        return UIPasswordEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIPasswordEditor.DEFAULT_RENDERER_TYPE;
    }

}
