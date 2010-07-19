/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 11:28:09 AM
 */

package com.nitobi.jsf.renderer.tabstrip;

import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 * TabsRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TabsRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:tabs";

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return TAGNAME;
    }
}
