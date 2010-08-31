/**
 * User: Eric Buitenhuis 
 * Date: May 28, 2008
 * Time: 9:15:08 PM
 */

package com.nitobi.jsf.component.grid;

import javax.faces.component.UIComponentBase;

/**
 * UIExpandColumn
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIExpandColumn extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UIExpandColumn";
    public static final String DEFAULT_RENDERER_TYPE = "ExpandColumnRenderer";
    public static final String DEFAULT_FAMILY = "ExpandColumnFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}