/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 6:07:46 PM
 */

package com.nitobi.jsf.renderer.tree;

import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 * ChildrenRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class ChildrenRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:children";

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return TAGNAME;
    }

}
