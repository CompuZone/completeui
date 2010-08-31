/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UITextareaEditor;

/**
 *
 * @author eric
 */
public class TextareaEditorTag extends TextEditorTag {

    @Override
    public String getComponentType() {
        return UITextareaEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UITextareaEditor.DEFAULT_RENDERER_TYPE;
    }

}
