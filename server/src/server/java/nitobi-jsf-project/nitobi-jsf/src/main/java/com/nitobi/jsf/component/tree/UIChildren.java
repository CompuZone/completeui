/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 6:06:27 PM
 */

package com.nitobi.jsf.component.tree;

import javax.faces.component.UIComponentBase;

/**
 * UIChildren
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIChildren extends UIComponentBase {


    public static final String DEFAULT_COMPONENT_TYPE = "UIChildren";
    public static final String DEFAULT_RENDERER_TYPE = "ChildrenRenderer";
    public static final String DEFAULT_FAMILY = "ChildrenFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}
