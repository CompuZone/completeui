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
public class UIImageEditor extends UIComponentBase {
    private static final transient Logger logger = Logger.getLogger(UIImageEditor.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "ImageEditorRenderer";
    public static final String COMPONENT_FAMILY = "ImageEditorFamily";
    public static final String COMPONENT_TYPE = "UIImageEditor"; // Used by tag handler
 
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
