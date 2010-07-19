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
public class UIDateColumn extends UIComponentBase {
    
    private static final transient Logger logger = Logger.getLogger(UIDateColumn.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "DateColumnRenderer";
    public static final String COMPONENT_FAMILY = "DateColumnFamily";
    public static final String COMPONENT_TYPE = "UIDateColumn"; // Used by tag handler
 
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
