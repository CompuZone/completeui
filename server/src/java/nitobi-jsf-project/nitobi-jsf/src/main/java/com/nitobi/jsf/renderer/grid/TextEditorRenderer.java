/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.TextEditorTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class TextEditorRenderer extends NitobiRenderer {

    private final static String TAGNAME = "ntb:texteditor";


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

        atts.put("maxlength", TextEditorTag.MAX_LENGTH);
        atts.put("onkeydownevent", TextEditorTag.ON_KEY_DOWN_EVENT);
        atts.put("onkeyupevent", TextEditorTag.ON_KEY_UP_EVENT);
        atts.put("onkeypressevent", TextEditorTag.ON_KEY_PRESS_EVENT);
        atts.put("onchangeevent", TextEditorTag.ON_CHANGE_EVENT);
        
        return atts;
    }

}
