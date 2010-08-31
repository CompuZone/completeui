package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.ImageEditorTag;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class ImageEditorRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:imageeditor";


    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        atts.put("imageurl", ImageEditorTag.IMAGE_URL_ATTNAME);
        return atts;
    }

}
