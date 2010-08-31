/**
 * User: Eric Buitenhuis 
 * Date: May 28, 2008
 * Time: 9:17:38 PM
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.taglib.grid.ExpandColumnTag;

import java.util.Map;

/**
 * ExpandColumnRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class ExpandColumnRenderer extends ColumnRenderer {

    private static final String TAGNAME = "ntb:expandcolumn";

    protected String getTagName() {
        return TAGNAME;
    }

    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = super.getPassthroughAttributes();

        atts.put("childcolumnset", ExpandColumnTag.CHILDCOLUMNSET);
        atts.put("width", ExpandColumnTag.WIDTH);

        return atts;
    }
}
