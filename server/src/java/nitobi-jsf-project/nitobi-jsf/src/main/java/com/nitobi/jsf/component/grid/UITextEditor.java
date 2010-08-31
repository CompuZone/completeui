/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class UITextEditor extends UIComponentBase {
    
    private static final transient Logger logger = Logger.getLogger(UITextEditor.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "TextEditorRenderer";
    public static final String COMPONENT_FAMILY = "TextEditorFamily";
    public static final String COMPONENT_TYPE = "UITextEditor"; // Used by tag handler

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
