/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.LinkEditorTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class LinkEditorRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:linkeditor";


    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        atts.put("openwindow", LinkEditorTag.OPEN_WINDOW_ATTNAME);
        return atts;
    }
}
