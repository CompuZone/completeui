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
public class UIComboButton extends UIComponentBase {

    public static final String DEFAULT_RENDERER_TYPE = "ComboButtonRenderer";
    public static final String COMPONENT_FAMILY = "ComboButtonFamily";
    public static final String COMPONENT_TYPE = "UIComboButton";

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
