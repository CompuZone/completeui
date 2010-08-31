package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.ColumnTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class ColumnRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:column";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        
        atts.put("align", ColumnTag.ALIGN_ATTNAME);
        atts.put("classname", ColumnTag.CLASS_NAME_ATTNAME);
        atts.put("cssstyle", ColumnTag.CSS_STYLE_ATTNAME);
        atts.put("value", ColumnTag.VALUE_ATTNAME);
        atts.put("columnname", ColumnTag.COLUMN_NAME_ATTNAME);
        atts.put("headerelement", ColumnTag.HEADER_ELEMENT_ATTNAME);
        atts.put("type", ColumnTag.TYPE_ATTNAME);
        atts.put("editable", ColumnTag.EDITABLE_ATTNAME);
        atts.put("initial", ColumnTag.INITIAL_ATTNAME);
        atts.put("label", ColumnTag.LABEL_ATTNAME);
        atts.put("sortdirection", ColumnTag.SORT_DIRECTION_ATTNAME);
        atts.put("sortenabled", ColumnTag.SORT_ENABLED_ATTNAME);
        atts.put("width", ColumnTag.WIDTH_ATTNAME);
        atts.put("visible", ColumnTag.VISIBLE_ATTNAME);
        atts.put("xdatafld", ColumnTag.X_DATA_FIELD_ATTNAME);
        atts.put("onheaderclickevent", ColumnTag.ON_HEADER_CLICK_EVENT_ATTNAME);
        atts.put("oncellclickevent", ColumnTag.ON_CELL_CLICK_EVENT_ATTNAME);
        atts.put("oncellvalidateevent", ColumnTag.ON_CELL_VALIDATE_EVENT_ATTNAME);
        atts.put("onbeforecelleditevent", ColumnTag.ON_BEFORE_CELL_EDIT_EVENT_ATTNAME);
        atts.put("onaftercelleditevent", ColumnTag.ON_AFTER_CELL_EDIT_EVENT_ATTNAME);
        atts.put("oncellblurevent", ColumnTag.ON_CELL_BLUR_EVENT_ATTNAME);
        atts.put("oncellfocusevent", ColumnTag.ON_CELL_FOCUS_EVENT_ATTNAME);
        atts.put("onbeforesortevent", ColumnTag.ON_BEFORE_SORT_EVENT_ATTNAME);
        atts.put("onaftersortevent", ColumnTag.ON_AFTER_SORT_EVENT_ATTNAME);
        atts.put("onkeypressevent", ColumnTag.ON_KEY_PRESS_EVENT_ATTNAME);
        atts.put("onkeydownevent", ColumnTag.ON_KEY_DOWN_EVENT_ATTNAME);
        atts.put("onkeyupevent", ColumnTag.ON_KEY_UP_EVENT_ATTNAME);
        atts.put("onchangeevent", ColumnTag.ON_CHANGE_EVENT_ATTNAME);
        
        return atts;
    }
}
