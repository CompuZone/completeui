/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 *
 * @author eric
 */
public class PasswordEditorRenderer extends NitobiRenderer{

    private final static String TAGNAME = "ntb:passwordeditor";

    @Override
    protected String getTagName() {
        return TAGNAME; 
    }

}
