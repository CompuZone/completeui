/**
 * User: Eric Buitenhuis 
 * Date: May 17, 2008
 * Time: 8:39:25 PM
 */

package com.nitobi.jsf.renderer.fisheye;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.fisheye.MenuItemTag;

import java.util.HashMap;
import java.util.Map;

/**
 * MenuItemRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class MenuItemRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:menuitem";

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return TAGNAME;
    }

    /**
     * Grab a Map of all the passthrough attributes this component will need to output. The
     * Map key needs to be the literal text that will be sent to the client, and
     * the Map value is the variable name used to lookup the value in the component.
     *
     * @return a map of output text -> variable name
     */
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        atts.put("imagesrc", MenuItemTag.IMAGESRC);
        atts.put("label", MenuItemTag.LABEL);
        atts.put("onclick", MenuItemTag.ONCLICK);

        return atts;
    }

}
