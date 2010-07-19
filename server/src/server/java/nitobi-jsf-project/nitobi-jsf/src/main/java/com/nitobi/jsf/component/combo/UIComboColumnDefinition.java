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
public class UIComboColumnDefinition extends UIComponentBase {

    public static final String DEFAULT_RENDERER_TYPE = "ComboColumnDefinitionRenderer";
    public static final String COMPONENT_FAMILY = "ComboColumnDefinitionFamily";
    public static final String COMPONENT_TYPE = "UIComboColumnDefinition";

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
