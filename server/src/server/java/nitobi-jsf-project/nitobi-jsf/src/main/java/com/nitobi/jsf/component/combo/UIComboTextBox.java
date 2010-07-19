/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.component.combo;

import javax.faces.component.UIComponentBase;

/**
 *
 * @author eric
 */
public class UIComboTextBox extends UIComponentBase {

    public static final String DEFAULT_RENDERER_TYPE = "ComboTextBoxRenderer";
    public static final String COMPONENT_FAMILY = "ComboTextBoxFamily";
    public static final String COMPONENT_TYPE = "UIComboTextBox";

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }
}
