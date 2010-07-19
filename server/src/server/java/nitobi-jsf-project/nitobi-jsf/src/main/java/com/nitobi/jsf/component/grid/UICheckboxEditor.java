package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class UICheckboxEditor extends UIComponentBase {
    private static final transient Logger logger = Logger.getLogger(UICheckboxEditor.class.getName());
    
    public static final String DEFAULT_RENDERER_TYPE = "CheckboxEditorRenderer";
    public static final String COMPONENT_FAMILY = "CheckboxEditorFamily";
    public static final String COMPONENT_TYPE = "UICheckboxEditor"; // Used by tag handler
 
    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
