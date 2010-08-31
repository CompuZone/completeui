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
public class UITextareaEditor extends UIComponentBase {

    private static final transient Logger logger = Logger.getLogger(UITextareaEditor.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = ".TextareaEditorRenderer";
    public static final String COMPONENT_FAMILY = "TextareaEditorFamily";
    public static final String COMPONENT_TYPE = "UITextareaEditor"; // Used by tag handler

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
