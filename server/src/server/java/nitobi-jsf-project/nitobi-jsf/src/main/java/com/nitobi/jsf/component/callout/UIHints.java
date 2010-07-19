/**
 * User: Eric Buitenhuis 
 * Date: Apr 27, 2008
 * Time: 12:33:06 PM
 */

package com.nitobi.jsf.component.callout;

import javax.faces.component.UIComponentBase;

/**
 * UIHints
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIHints extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UIHints";
    public static final String DEFAULT_RENDERER_TYPE = "HintsRenderer";
    public static final String DEFAULT_FAMILY = "HintsFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}