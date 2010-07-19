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
public class UILinkEditor extends UIComponentBase {
    private static final transient Logger logger = Logger.getLogger(UILinkEditor.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "LinkEditorRenderer";
    public static final String COMPONENT_FAMILY = "LinkEditorFamily";
    public static final String COMPONENT_TYPE = "UILinkEditor"; // Used by tag handler
 
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
