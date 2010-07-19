package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.Map;

/**
 *
 * @author eric
 */
public class DataSourceRenderer extends NitobiRenderer{

    private static String TAGNAME = "ntb:datasource";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        return null;
    }

    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        return null;
    }

    @Override
    protected boolean printId() {
        return true;
    }

}
