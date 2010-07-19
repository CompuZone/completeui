
package com.nitobi.jsf.component.combo;

import javax.faces.component.UIComponentBase;
import javax.faces.component.UIInput;
import javax.faces.component.ValueHolder;

/**
 *
 * @author eric
 */
public class UIComboBox extends UIInput implements ValueHolder {

    public static final String DEFAULT_RENDERER_TYPE = "ComboBoxRenderer";
    public static final String COMPONENT_FAMILY = "ComboBoxFamily";
    public static final String COMPONENT_TYPE = "UIComboBox";

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

    
}
