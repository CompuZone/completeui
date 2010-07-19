package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.LookupEditorTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class LookupEditorRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:lookupeditor";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        atts.put("delay", LookupEditorTag.DELAY_TAGNAME);
        atts.put("forcevalidoption", LookupEditorTag.FORCE_VALID_OPTION_TAGNAME);
        atts.put("datasourceid", LookupEditorTag.DATA_SOURCE_ID_ATTNAME);
        atts.put("gethandler", LookupEditorTag.GET_HANDLER_ATTNAME);
        atts.put("displayfields", LookupEditorTag.DISPLAY_FIELDS_ATTNAME);
        atts.put("valuefield", LookupEditorTag.VALUE_FIELD_ATTNAME);
        return atts;
    }
}
