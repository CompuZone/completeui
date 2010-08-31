package com.nitobi.jsf.component.callout;

import javax.faces.component.UIComponentBase;

/**
 * User: Eric Buitenhuis
 * Date: Apr 26, 2008
 * Time: 9:10:05 PM
 */
public class UIHint extends UIComponentBase {

    public static final String DEFAULT_RENDERER_TYPE = "HintRenderer";
    public static final String DEFAULT_FAMILY = "HintFamily";
    public static final String DEFAULT_COMPONENT_TYPE = "UIHint";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}
