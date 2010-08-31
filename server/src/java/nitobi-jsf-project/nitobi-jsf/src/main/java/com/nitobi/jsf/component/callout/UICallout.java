/**
 * User: Eric Buitenhuis 
 * Date: Apr 27, 2008
 * Time: 11:55:24 PM
 */

package com.nitobi.jsf.component.callout;

import javax.faces.component.UIComponentBase;

/**
 * UICallout
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UICallout extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UICallout";
    public static final String DEFAULT_RENDERER_TYPE = "CalloutRenderer";
    public static final String DEFAULT_FAMILY = "CalloutFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}