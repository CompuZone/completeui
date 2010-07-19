package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;

/**
 *
 * @author eric
 */
public class UIDataSource extends UIComponentBase {
    
    public static final String DEFAULT_RENDERER_TYPE = "DataSourceRenderer";
    public static final String COMPONENT_FAMILY = "DataSourceFamily";
    public static final String COMPONENT_TYPE = "UIDataSource"; // Used by tag handler
    
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }
    
}
