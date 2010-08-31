/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

/**
 *
 * @author eric
 */
public class TextareaEditorRenderer extends TextEditorRenderer {

    private final static String TAGNAME = "ntb:textareaeditor";
  
    @Override
    protected String getTagName() {
        return TAGNAME;
    }
}
