package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 * DataRenderer
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class DataRenderer extends NitobiRenderer {
    private static final String TAGNAME = "ntb:data";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

}
