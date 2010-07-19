/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.combo;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.combo.ComboColumnDefinitionTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class ComboColumnDefinitionRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:combocolumndefinition";

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

        atts.put("Align", ComboColumnDefinitionTag.ALIGN_ATTNAME);
        atts.put("ColumnType", ComboColumnDefinitionTag.COLUMN_TYPE_ATTNAME);
        atts.put("CSSClassName", ComboColumnDefinitionTag.CSS_CLASS_NAME_ATTNAME);
        atts.put("DataFieldIndex", ComboColumnDefinitionTag.DATA_FIELD_INDEX_ATTNAME);
        atts.put("HeaderLabel", ComboColumnDefinitionTag.HEADER_LABEL_ATTNAME);
        atts.put("HTMLPrefix", ComboColumnDefinitionTag.HTML_PREFIX_ATTNAME);
        atts.put("HTMLSuffix", ComboColumnDefinitionTag.HTML_SUFFIX_ATTNAME);
        atts.put("ImageHandlerURL", ComboColumnDefinitionTag.IMAGE_HANDLER_URL_ATTNAME);
        atts.put("TextColor", ComboColumnDefinitionTag.TEXT_COLOR_ATTNAME);
        atts.put("Width", ComboColumnDefinitionTag.WIDTH_ATTNAME);

        return atts;
    }
}
