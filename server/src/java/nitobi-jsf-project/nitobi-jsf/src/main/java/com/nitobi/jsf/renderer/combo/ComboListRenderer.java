/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.combo;

import com.nitobi.jsf.component.combo.UIComboList;
import com.nitobi.jsf.listener.NitobiGetPhaseListener;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.combo.ComboListTag;

import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author eric
 */
public class ComboListRenderer extends NitobiRenderer {
    
    private static final String TAGNAME = "ntb:combolist";

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

        atts.put("AllowPaging", ComboListTag.ALLOW_PAGING_ATTNAME);
        atts.put("BackgroundHighlightColor", ComboListTag.BACKGROUND_HIGHLIGHT_COLOR_ATTNAME);
        atts.put("CustomHTMLDefinition", ComboListTag.CUSTOM_HTML_DEFINITION_ATTNAME);
        atts.put("CustomHTMLHeader", ComboListTag.CUSTOM_HTML_HEADER_ATTNAME);
        atts.put("ForegroundHighlightColor", ComboListTag.FOREGROUND_HIGHLIGHT_COLOR_ATTNAME);
        atts.put("FuzzySearchEnabled", ComboListTag.FUZZY_SEARCH_ENABLED_ATTNAME);
        atts.put("Height", ComboListTag.HEIGHT_ATTNAME);
        atts.put("HighlightCSSClassName", ComboListTag.HIGHLIGHT_CSS_CLASS_NAME_ATTNAME);
        atts.put("PageSize", ComboListTag.PAGE_SIZE_ATTNAME);
        atts.put("Width", ComboListTag.WIDTH_ATTNAME);
        atts.put("OnAfterSearchEvent", ComboListTag.ON_AFTER_SEARCH_EVENT_ATTNAME);
        atts.put("OnBeforeSearchEvent", ComboListTag.ON_BEFORE_SEARCH_EVENT_ATTNAME);
        atts.put("OnHideEvent", ComboListTag.ON_HIDE_EVENT_ATTNAME);
        atts.put("OnShowEvent", ComboListTag.ON_SHOW_EVENT_ATTNAME);

        return atts;
    }

    /**
     * For the cases where the outputted attributes do not grab the value directly
     * from the component. This method will grab the additional, derived attributes and
     * write them to the output.
     *
     * @param component
     * @param context
     */
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        Map<String, String> atts = new HashMap<String, String>();
        UIComboList comboList;
        try {
            comboList = (UIComboList)component;
        } catch(ClassCastException e) {
            throw new IllegalStateException("The ComboListRenderer requires a UIComboList component to be passed to the getDerivedAttributes() method.");
        }


        MethodExpression methodExpression = comboList.getDatasourceUrl();

        if(null != methodExpression) {
            String contextPath = context.getExternalContext().getRequestContextPath();
            String methExp = methodExpression.getExpressionString();
            if(methodExpression.isLiteralText()) {
                if(methExp.startsWith("/")) {
                    atts.put("datasourceurl", contextPath + methExp);
                } else {
                    atts.put("datasourceurl", contextPath + "/" + methExp);
                }
            } else {
                StringBuffer sb = new StringBuffer(methExp);
                int dot = sb.indexOf(".");
                sb.replace(dot, dot+1, "/");

                sb.replace(0, 2, contextPath + "/faces/" + NitobiGetPhaseListener.NITOBI_AJAX_TRIGGER + "/");

                sb.delete(sb.length()-1, sb.length());
                atts.put("datasourceurl", sb.toString());
            }
        }
        return atts;
    }
}
