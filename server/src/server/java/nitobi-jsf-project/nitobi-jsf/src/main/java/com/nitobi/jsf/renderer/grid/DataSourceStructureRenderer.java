package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.DataSourceStructureTag;

import java.util.HashMap;
import java.util.Map;

/**
 * DataSourceStructureRenderer
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class DataSourceStructureRenderer extends NitobiRenderer {
    
    private static final String TAGNAME = "ntb:datasourcestructure";


    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();
        atts.put("fieldnames", DataSourceStructureTag.FIELD_NAMES_ATTNAME);
        atts.put("keys",DataSourceStructureTag.KEYS_ATTNAME);
        return atts;
    }


}
