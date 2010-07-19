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
public class UINumberEditor extends UIComponentBase {

    private static final transient Logger logger = Logger.getLogger(UINumberEditor.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "NumberEditorRenderer";
    public static final String COMPONENT_FAMILY = "NumberEditorFamily";
    public static final String COMPONENT_TYPE = "UINumberEditor"; // Used by tag handler
    
    
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
