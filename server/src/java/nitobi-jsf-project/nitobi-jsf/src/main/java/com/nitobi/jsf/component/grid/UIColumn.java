package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class UIColumn extends UIComponentBase {
    
    private static final transient Logger logger = Logger.getLogger(UIColumn.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "ColumnRenderer";
    public static final String COMPONENT_FAMILY = "ColumnFamily";
    public static final String COMPONENT_TYPE = "UIColumn"; // Used by tag handler
 
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
