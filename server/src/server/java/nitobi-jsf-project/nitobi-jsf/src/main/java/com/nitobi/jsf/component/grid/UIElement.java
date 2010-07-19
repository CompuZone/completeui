package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class UIElement extends UIComponentBase {

    private static Logger logger = Logger.getLogger(UIElement.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "ElementRenderer";
    public static final String COMPONENT_FAMILY = "ElementFamily";
    public static final String COMPONENT_TYPE = "UIElement"; // Used by tag handler
    
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
