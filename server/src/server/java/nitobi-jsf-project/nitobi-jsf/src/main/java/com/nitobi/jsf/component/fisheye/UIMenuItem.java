/**
 * User: Eric Buitenhuis 
 * Date: May 17, 2008
 * Time: 7:49:47 PM
 */

package com.nitobi.jsf.component.fisheye;

import javax.faces.component.UIComponentBase;

/**
 * UIMenuItem
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIMenuItem extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UIMenuItem";
    public static final String DEFAULT_RENDERER_TYPE = "MenuItemRenderer";
    public static final String DEFAULT_FAMILY = "MenuItemFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}