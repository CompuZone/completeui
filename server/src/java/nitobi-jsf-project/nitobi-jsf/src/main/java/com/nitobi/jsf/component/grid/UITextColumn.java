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
public class UITextColumn extends UIComponentBase {

    private static final transient Logger logger = Logger.getLogger(UITextColumn.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "TextColumnRenderer";
    public static final String COMPONENT_FAMILY = "TextColumnFamily";
    public static final String COMPONENT_TYPE = "UITextColumn"; // Used by tag handler
 
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
