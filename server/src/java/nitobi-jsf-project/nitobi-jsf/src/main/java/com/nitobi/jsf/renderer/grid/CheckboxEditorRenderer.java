package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.CheckboxEditorTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class CheckboxEditorRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:checkboxeditor";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        atts.put("checkedvalue", CheckboxEditorTag.CHECKED_VALUE_ATTNAME);
        atts.put("uncheckedvalue", CheckboxEditorTag.UNCHECKED_VALUE_ATTNAME);
        atts.put("datasource", CheckboxEditorTag.DATA_SOURCE_ATTNAME);
        atts.put("displayfields", CheckboxEditorTag.DISPLAY_FIELDS_ATTNAME);
        atts.put("valuefield", CheckboxEditorTag.VALUE_FIELD_ATTNAME);
        return atts;
    }

}
