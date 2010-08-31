package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;

/**
 * UIData
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class UIData extends UIComponentBase {

    public static final String DEFAULT_RENDERER_TYPE = "DataRenderer";
    public static final String COMPONENT_FAMILY = "DataFamily";
    public static final String COMPONENT_TYPE = "UIData"; // Used by tag handler
 
    
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
