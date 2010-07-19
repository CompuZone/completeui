package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.TextColumnTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class TextColumnRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:textcolumn";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
                Map<String, String> atts = new HashMap<String, String>();

        atts.put("align", TextColumnTag.ALIGN_ATTNAME);
        atts.put("classname", TextColumnTag.CLASS_NAME_ATTNAME);
        atts.put("cssstyle", TextColumnTag.CSS_STYLE_ATTNAME);
        atts.put("value", TextColumnTag.VALUE_ATTNAME);
        atts.put("columnname", TextColumnTag.COLUMN_NAME_ATTNAME);
        atts.put("headerelement", TextColumnTag.HEADER_ELEMENT_ATTNAME);
        atts.put("type", TextColumnTag.TYPE_ATTNAME);
        atts.put("editable", TextColumnTag.EDITABLE_ATTNAME);
        atts.put("initial", TextColumnTag.INITIAL_ATTNAME);
        atts.put("label", TextColumnTag.LABEL_ATTNAME);
        atts.put("sortdirection", TextColumnTag.SORT_DIRECTION_ATTNAME);
        atts.put("sortenabled", TextColumnTag.SORT_ENABLED_ATTNAME);
        atts.put("width", TextColumnTag.WIDTH_ATTNAME);
        atts.put("visible", TextColumnTag.VISIBLE_ATTNAME);
        atts.put("xdatafld", TextColumnTag.XML_DATA_FIELD_ATTNAME);
        atts.put("onheaderclickevent", TextColumnTag.ON_HEADER_CLICK_EVENT_ATTNAME);
        atts.put("oncellclickevent", TextColumnTag.ON_CELL_CLICK_EVENT_ATTNAME);
        atts.put("oncellvalidateevent", TextColumnTag.ON_CELL_VALIDATE_EVENT_ATTNAME);
        atts.put("onbeforecelleditevent", TextColumnTag.ON_BEFORE_CELL_EDIT_EVENT_ATTNAME);
        atts.put("onaftercelleditevent", TextColumnTag.ON_AFTER_CELL_EDIT_EVENT_ATTNAME);
        atts.put("oncellblurevent", TextColumnTag.ON_CELL_BLUR_EVENT_ATTNAME);
        atts.put("oncellfocusevent", TextColumnTag.ON_CELL_FOCUS_EVENT_ATTNAME);
        atts.put("onbeforesortevent", TextColumnTag.ON_BEFORE_SORT_EVENT_ATTNAME);
        atts.put("onaftersortevent", TextColumnTag.ON_AFTER_SORT_EVENT_ATTNAME);
        atts.put("onkeypressevent", TextColumnTag.ON_KEY_PRESS_EVENT_ATTNAME);
        atts.put("onkeydownevent", TextColumnTag.ON_KEY_DOWN_EVENT_ATTNAME);
        atts.put("onkeyupevent", TextColumnTag.ON_KEY_UP_EVENT_ATTNAME);
        atts.put("onchangeevent", TextColumnTag.ON_CHANGE_EVENT_ATTNAME);

        return atts;
    }

}
