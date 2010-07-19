/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.combo;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.combo.ComboButtonTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class ComboButtonRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:combobutton";


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
        
        atts.put("DefaultCSSClassName", ComboButtonTag.DEFAULT_CSS_CLASS_NAME_ATTNAME);
        atts.put("Height", ComboButtonTag.HEIGHT_ATTNAME);
        atts.put("PressedCSSClassName", ComboButtonTag.PRESSED_CSS_CLASS_NAME_ATTNAME);
        atts.put("Width", ComboButtonTag.WIDTH_ATTNAME);
        atts.put("OnBeforeSelectEvent", ComboButtonTag.ON_BEFORE_SELECT_EVENT_ATTNAME);
        atts.put("OnBlurEvent", ComboButtonTag.ON_BLUR_EVENT_ATTNAME);
        atts.put("OnFocusEvent", ComboButtonTag.ON_FOCUS_EVENT_ATTNAME);
        atts.put("OnLoadEvent", ComboButtonTag.ON_LOAD_EVENT_ATTNAME);
        atts.put("OnSelectEvent", ComboButtonTag.ON_SELECT_EVENT_ATTNAME);
        atts.put("OnTabEvent", ComboButtonTag.ON_TAB_EVENT_ATTNAME);

        return atts;
    }


}
