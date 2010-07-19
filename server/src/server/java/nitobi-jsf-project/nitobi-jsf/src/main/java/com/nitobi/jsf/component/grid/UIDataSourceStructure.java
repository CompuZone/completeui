package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;

/**
 * UIDataSourceStructure
 * 
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class UIDataSourceStructure extends UIComponentBase{
    
    public static final String DEFAULT_RENDERER_TYPE = "DataSourceStructureRenderer";
    public static final String COMPONENT_FAMILY = "DataSourceStructureFamily";
    public static final String COMPONENT_TYPE = "UIDataSourceStructure";
    
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }
    
}
