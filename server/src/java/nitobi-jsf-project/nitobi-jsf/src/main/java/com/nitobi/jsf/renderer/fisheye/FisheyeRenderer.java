/**
 * User: Eric Buitenhuis 
 * Date: May 17, 2008
 * Time: 7:51:28 PM
 */

package com.nitobi.jsf.renderer.fisheye;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.fisheye.FisheyeTag;

import java.util.HashMap;
import java.util.Map;

/**
 * FisheyeRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class FisheyeRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:fisheye";

    /**
     * Grab all the required scripts for this component. No script request will be rendered more than once in a given
     * session.
     *
     * @return Array of String objects with the required scripts
     */
    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.FISHEYE};
    }

    /**
     * Grab all the styles this component requires. The output will include links to each. No repeat style
     * references will be outputted. The repeats are tracked at the request level.
     *
     * @return Array of Strings with all the stylesheet names
     */
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.FISHEYE_STYLE};
    }

    /**
     * Whether or not the component requires the <?XML:NAMESPACE prefix="ntb" /> printed before the component.
     * Generally, this is true if the component is a parent, but the children components do not need this as long as you
     * include it for the parent.
     *
     * @return true if you want the namespace declaration
     */
    protected boolean needsXmlNamespaceDecl() {
        return true;
    }

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return TAGNAME;
    }

    /**
     * Whether or not you want the id attribute printed with the output.
     *
     * @return true if you want the id of the component printed
     */
    protected boolean printId() {
        return true;
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
        atts.put("growpercent", FisheyeTag.GROWPERCENT);
        atts.put("opendirection", FisheyeTag.OPENDIRECTION);
        atts.put("expanddirection", FisheyeTag.EXPANDDIRECTION);
        atts.put("iconwidth", FisheyeTag.ICONWIDTH);
        atts.put("theme", FisheyeTag.THEME);

        return atts;
    }
}
