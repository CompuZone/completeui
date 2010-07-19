package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.taglib.grid.DateColumnTag;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class DateColumnRenderer extends ColumnRenderer {

    private static final String TAGNAME = "ntb:datecolumn";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = super.getPassthroughAttributes();
        if(atts == null) {
            atts = new HashMap<String, String>();
        }

        atts.put("mask", DateColumnTag.MASK_ATTNAME);

        return atts;
    }

    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
       return super.getDerivedAttributes(component, context);
    }
}
