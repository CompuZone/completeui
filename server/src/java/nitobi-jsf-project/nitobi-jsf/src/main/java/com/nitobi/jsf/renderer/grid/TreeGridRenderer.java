/**
 * User: Eric Buitenhuis 
 * Date: May 28, 2008
 * Time: 2:12:17 PM
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.taglib.grid.TreeGridTag;

import java.util.Map;

/**
 * TreeGridRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TreeGridRenderer extends GridRenderer {

    private static final String TAGNAME = "ntb:treegrid";

    @Override
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.TREEGRID_STYLE};
    }

    @Override
    protected String[] getRequiredScripts() {
        return new String[] {NitobiIncludes.TREEGRID};
    }

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = super.getPassthroughAttributes();
        atts.put("rootcolumns", TreeGridTag.ROOTCOLUMNS);
        atts.put("groupoffset", TreeGridTag.GROUPOFFSET);
        return atts;
    }
}
