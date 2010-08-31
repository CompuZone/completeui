package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.NumberEditorTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class NumberEditorRenderer extends NitobiRenderer {

    private final static String TAGNAME = "ntb:numbereditor";


    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return TAGNAME;
    }

    /**
     * Whether or not you want the id attribute printed with the output.
     *
     * @return true if you want the id of the component printed
     */
    protected boolean printId() {
        return false;
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
        atts.put("number", NumberEditorTag.NUMBER_ATTNAME);
        atts.put("mask", NumberEditorTag.MASK_ATTNAME);
        atts.put("group", NumberEditorTag.GROUP_ATTNAME);
        atts.put("decimal", NumberEditorTag.DECIMAL_ATTNAME);

        return atts;
    }

}
