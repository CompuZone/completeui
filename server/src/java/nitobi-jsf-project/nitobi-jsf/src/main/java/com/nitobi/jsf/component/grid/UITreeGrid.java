/**
 * User: Eric Buitenhuis 
 * Date: May 28, 2008
 * Time: 2:10:52 PM
 */

package com.nitobi.jsf.component.grid;


/**
 * UITreeGrid
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UITreeGrid extends UIGrid {

    public static final String DEFAULT_COMPONENT_TYPE = "UITreeGrid";
    public static final String DEFAULT_RENDERER_TYPE = "TreeGridRenderer";
    public static final String DEFAULT_FAMILY = "TreeGridFamily";

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}