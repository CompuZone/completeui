/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.taglib.grid.NumberColumnTag;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.Map;

/**
 *
 * @author eric
 */
public class NumberColumnRenderer extends ColumnRenderer {

    private static final String TAGNAME = "ntb:numbercolumn";
    

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = super.getPassthroughAttributes();
        
        atts.put("mask", NumberColumnTag.MASK_ATTNAME);
        atts.put("groupingseparator", NumberColumnTag.GROUPING_SEPARATOR_ATTNAME);
        atts.put("decimalseparator", NumberColumnTag.DECIMAL_SEPARATOR_ATTNAME);
        atts.put("negativemask", NumberColumnTag.NEGATIVE_MASK_ATTNAME);
        
        return atts;
    }

    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        return super.getDerivedAttributes(component, context);
    }

}
