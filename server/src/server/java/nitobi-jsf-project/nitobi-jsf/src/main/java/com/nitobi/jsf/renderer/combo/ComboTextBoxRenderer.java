/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.combo;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.combo.ComboTextBoxTag;

import java.util.HashMap;
import java.util.Map;


/**
 *
 * @author eric
 */
public class ComboTextBoxRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:combotextbox";

    public boolean getRendersChildren() {
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
     * Grab a Map of all the passthrough attributes this component will need to output. The
     * Map key needs to be the literal text that will be sent to the client, and
     * the Map value is the variable name used to lookup the value in the component.
     *
     * @return a map of output text -> variable name
     */
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();

        atts.put("CSSClassName", ComboTextBoxTag.CSS_CLASS_NAME_ATTNAME);
        atts.put("DataFieldIndex", ComboTextBoxTag.DATA_FIELD_INDEX_ATTNAME);
        atts.put("Editable", ComboTextBoxTag.EDITABLE_ATTNAME);
        atts.put("Height", ComboTextBoxTag.HEIGHT_ATTNAME);
        atts.put("Value", ComboTextBoxTag.VALUE_ATTNAME);
        atts.put("Width", ComboTextBoxTag.WIDTH_ATTNAME);
        atts.put("OnEditKeyUpEvent", ComboTextBoxTag.ON_EDIT_KEY_UP_EVENT_ATTNAME);

        return atts;
    }

}
