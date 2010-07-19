package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class ListboxEditorRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:listboxeditor";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        return new HashMap<String, String>();
    }

    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        return null;
    }

    @Override
    protected boolean printId() {
        return false;
    }

}
