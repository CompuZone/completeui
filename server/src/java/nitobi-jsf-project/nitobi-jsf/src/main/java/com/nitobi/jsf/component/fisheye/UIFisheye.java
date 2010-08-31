/**
 * User: Eric Buitenhuis 
 * Date: May 17, 2008
 * Time: 7:48:57 PM
 */

package com.nitobi.jsf.component.fisheye;

import javax.faces.component.UIComponentBase;

/**
 * UIFisheye
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIFisheye extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UIFisheye";
    public static final String DEFAULT_RENDERER_TYPE = "FisheyeRenderer";
    public static final String DEFAULT_FAMILY = "FisheyeFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}