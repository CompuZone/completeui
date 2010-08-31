/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.grid.UIGrid;
import com.nitobi.jsf.listener.NitobiGetPhaseListener;
import com.nitobi.jsf.listener.NitobiSaveHandlerPhaseListener;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.GridTag;

import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author eric
 */
public class GridRenderer extends NitobiRenderer {

    private static Logger logger = Logger.getLogger(GridRenderer.class.getName());

    private static final String TAGNAME = "ntb:grid";

    @Override
    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.GRID};
    }

    @Override
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.GRID_STYLE};
    }

    @Override
    protected boolean needsXmlNamespaceDecl() {
        return true;
    }

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {

        if (logger.isLoggable(Level.FINE)) {
            logger.logp(Level.FINE, "GridRenderer", "getPassthroughAttributes", "Processing the passthrough attributes");
        }

        Map<String, String> atts = new HashMap<String, String>();
        atts.put("asynchronous", GridTag.ASYNCHRONOUS_ATTNAME);
        atts.put("autoadd", GridTag.AUTOADD_ATTNAME);
        atts.put("autosaveenabled", GridTag.AUTO_SAVE_ENABLED_ATTNAME);
        atts.put("columnindicatorsenabled", GridTag.COLUMN_INDICATORS_ENABLED_ATTNAME);
        atts.put("copyenabled", GridTag.COPY_ENABLED_ATTNAME);
        atts.put("editmode", GridTag.EDIT_MODE_ATTNAME);
        atts.put("entertab", GridTag.ENTER_TAB_ATTNAME);
        atts.put("frozenleftcolumncount", GridTag.FROZEN_LEFT_COLUMN_COUNT_ATTNAME);
        atts.put("gridresizeenabled", GridTag.GRID_RESIZE_ENABLED_ATTNAME);
        atts.put("headerheight", GridTag.HEADER_HEIGHT_ATTNAME);
        atts.put("height", GridTag.HEIGHT_ATTNAME);
        atts.put("heightfixed", GridTag.HEIGHT_FIXED_ATTNAME);
        atts.put("hwrap", GridTag.HWRAP_ATTNAME);
        atts.put("keygenerator", GridTag.KEY_GENERATOR_ATTNAME);
        atts.put("keymode", GridTag.KEYMODE_ATTNAME);
        atts.put("livescrollingmode", GridTag.LIVE_SCROLLING_MODE_ATTNAME);
        atts.put("minheight", GridTag.MIN_HEIGHT_ATTNAME);
        atts.put("minwidth", GridTag.MIN_WIDTH_ATTNAME);
        atts.put("mode", GridTag.MODE_ATTNAME);
        atts.put("multirowselectenabled", GridTag.MULTI_ROW_SELECT_ENABLED_ATTNAME);
        atts.put("onaftercopyevent", GridTag.ON_AFTER_COPY_EVENT_ATTNAME);
        atts.put("onafterloaddatapageevent", GridTag.ON_AFTER_LOAD_DATA_PAGE_EVENT_ATTNAME);
        atts.put("onafterloadnextpageevent", GridTag.ON_AFTER_LOAD_NEXT_PAGE_EVENT_ATTNAME);
        atts.put("onafterloadpreviouspageevent", GridTag.ON_AFTER_LOAD_PREVIOUS_PAGE_EVENT_ATTNAME);
        atts.put("onafterpasteevent", GridTag.ON_AFTER_PASTE_EVENT_ATTNAME);
        atts.put("onafterrefreshevent", GridTag.ON_AFTER_REFRESH_EVENT_ATTNAME);
        atts.put("onafterresizeevent", GridTag.ON_AFTER_RESIZE_EVENT_ATTNAME);
        atts.put("onafterrowdeleteevent", GridTag.ON_AFTER_ROW_DELETE_EVENT_ATTNAME);
        atts.put("onafterrowinsertevent", GridTag.ON_AFTER_ROW_INSERT_EVENT_ATTNAME);
        atts.put("onaftersaveevent", GridTag.ON_AFTER_SAVE_EVENT_ATTNAME);
        atts.put("onaftersortevent", GridTag.ON_AFTER_SORT_EVENT_ATTNAME);
        atts.put("onbeforecelleditevent", GridTag.ON_BEFORE_CELL_EDIT_EVENT_ATTNAME);
        atts.put("onbeforecopyevent", GridTag.ON_BEFORE_COPY_EVENT_ATTNAME);
        atts.put("onbeforeloaddatapageevent", GridTag.ON_BEFORE_LOAD_DATA_EVENT_ATTNAME);
        atts.put("onbeforeloadnextpageevent", GridTag.ON_BEFORE_LOAD_NEXT_PAGE_EVENT_ATTNAME);
        atts.put("onbeforeloadpreviouspageevent", GridTag.ON_BEFORE_LOAD_PREVIOUS_PAGE_EVENT_ATTNAME);
        atts.put("onbeforepasteevent", GridTag.ON_BEFORE_PASTE_EVENT_ATTNAME);
        atts.put("onbeforerefreshevent", GridTag.ON_BEFORE_REFRESH_EVENT_ATTNAME);
        atts.put("onbeforeresizeevent", GridTag.ON_BEFORE_RESIZE_EVENT_ATTNAME);
        atts.put("onbeforerowdeleteevent", GridTag.ON_BEFORE_ROW_DELETE_EVENT_ATTNAME);
        atts.put("onbeforerowinsertevent", GridTag.ON_BEFORE_ROW_INSERT_EVENT_ATTNAME);
        atts.put("onbeforesaveevent", GridTag.ON_BEFORE_SAVE_EVENT_ATTNAME);
        atts.put("onbeforesortevent", GridTag.ON_BEFORE_SORT_EVENT_ATTNAME);
        atts.put("oncellclickevent", GridTag.ON_CELL_CLICK_EVENT_ATTNAME);
        atts.put("oncelldblclickevent", GridTag.ON_CELL_DBL_CLICK_EVENT_ATTNAME);
        atts.put("oncellfocusevent", GridTag.ON_CELL_FOCUS_EVENT_ATTNAME);
        atts.put("oncellupdateevent", GridTag.ON_CELL_UPDATE_EVENT_ATTNAME);
        atts.put("oncellvalidateevent", GridTag.ON_CELL_VALIDATE_EVENT_ATTNAME);
        atts.put("oncontextmenuevvent", GridTag.ON_CONTEXT_MENU_EVENT_ATTNAME);
        atts.put("ondatareadyevent", GridTag.ON_DATA_READY_EVENT_ATTNAME);
        atts.put("onerrorevent", GridTag.ON_ERROR_EVENT_ATTNAME);
        atts.put("onfocusevent", GridTag.ON_FOCUS_EVENT_ATTNAME);
        atts.put("onhandleerrorevent", GridTag.ON_HANDLE_ERROR_EVENT_ATTNAME);
        atts.put("onhitrowendevent", GridTag.ON_HIT_ROW_END_EVENT_ATTNAME);
        atts.put("onhitrowstartevent", GridTag.ON_HIT_ROW_START_EVENT_ATTNAME);
        atts.put("onhtmlreadyevent", GridTag.ON_HTML_READY_EVENT_ATTNAME);
        atts.put("onkeydownevent", GridTag.ON_KEY_DOWN_EVENT_ATTNAME);
        atts.put("onkeypressedevent", GridTag.ON_KEY_PRESSED_EVENT_ATTNAME);
        atts.put("onkeyupevent", GridTag.ON_KEY_UP_EVENT_ATTNAME);
        atts.put("onmousemoveevent", GridTag.ON_MOUSE_MOVE_EVENT_ATTNAME);
        atts.put("onmouseoutevent", GridTag.ON_MOUSE_OUT_EVENT_ATTNAME);
        atts.put("onmouseoverevent", GridTag.ON_MOUSE_OVER_EVENT_ATTNAME);
        atts.put("onrowblurevent", GridTag.ON_ROW_BLUR_EVENT_ATTNAME);
        atts.put("onrowfocusevent", GridTag.ON_ROW_FOCUS_EVENT_ATTNAME);
        atts.put("pasteenabled", GridTag.PASTE_ENABLED_ATTNAME);
        atts.put("rendermode", GridTag.RENDER_MODE_ATTNAME);
        atts.put("rowdeleteenabled", GridTag.ROW_DELETE_ENABLED_ATTNAME);
        atts.put("rowheight", GridTag.ROW_HEIGHT_ATTNAME);
        atts.put("rowinsertenabled", GridTag.ROW_INSERT_ENABLED_ATTNAME);
        atts.put("rowselectenabled", GridTag.ROW_SELECT_ENABLED_ATTNAME);
        atts.put("rowsperpage", GridTag.ROWS_PER_PAGE_ATTNAME);
        atts.put("scrollX", GridTag.SCROLL_X_ATTNAME);
        atts.put("scrollY", GridTag.SCROLL_Y_ATTNAME);
        atts.put("showErrors", GridTag.SHOW_ERRORS_ATTNAME);
        atts.put("sortenabled", GridTag.SORT_ENABLED_ATTNAME);
        atts.put("sortmode", GridTag.SORT_MODE_ATTNAME);
        atts.put("theme", GridTag.THEME_ATTNAME);
        atts.put("toolbarenabled", GridTag.TOOLBAR_ENABLED_ATTNAME);
        atts.put("tooltipsenabled", GridTag.TOOLTIPS_ENABLED_ATTNAME);
        atts.put("vwrap", GridTag.VWRAP_ATTNAME);
        atts.put("width", GridTag.WIDTH_ATTNAME);
        atts.put("widthfixed", GridTag.WIDTH_FIXED_ATTNAME);
        atts.put("datasourceid", GridTag.DATA_SOURCE_ID_ATTNAME);

        return atts;
    }

    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {

        if (logger.isLoggable(Level.FINE)) {
            logger.entering("GridRenderer", "getDerivedAttributes");
        }

        Map<String, String> atts = new HashMap<String, String>();
        UIGrid grid = null;
        try {
            grid = (UIGrid) component;
        } catch (ClassCastException e) {
            throw new IllegalStateException("The GridRenderer could not cast the incoming component to a UIGrid: " + e.getMessage());
        }

        String contextPath = context.getExternalContext().getRequestContextPath();

        MethodExpression gethandlerExpression = grid.getGethandler();
        if (gethandlerExpression != null) {
            String gethandler = gethandlerExpression.getExpressionString();
            if (gethandlerExpression.isLiteralText()) {
                if (logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "GridRenderer", "getDerivedAttributes", "Processing the gethandler with literel text: " + gethandler);
                }
                if (gethandler.startsWith("/")) {
                    atts.put("gethandler", contextPath + gethandler);
                } else {
                    atts.put("gethandler", contextPath + "/" + gethandler);
                }
            } else {
                if (logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "GridRenderer", "getDerivedAttributes", "Processing the gethandler with method expression: " + gethandler);
                }
                StringBuffer sb = new StringBuffer(gethandler);

                // replace the dot with a slash
                int dot = sb.indexOf(".");
                sb.replace(dot, dot + 1, "/");

                // remove the '#{' and '}' and prepend the necessary trigger info
                sb.replace(0, 2, contextPath + "/faces/" + NitobiGetPhaseListener.NITOBI_AJAX_TRIGGER + "/");
                sb.delete(sb.length() - 1, sb.length());
                atts.put("gethandler", sb.toString());
            }
        }

        MethodExpression savehandlerExpression = grid.getSavehandler();
        if (savehandlerExpression != null) {
            String savehandler = savehandlerExpression.getExpressionString();
            if (savehandlerExpression.isLiteralText()) {
                if (logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "GridRenderer", "getDerivedAttributes", "Processing the savehandler with literel text: " + savehandler);
                }
                if (savehandler.startsWith("/")) {
                    atts.put("savehandler", contextPath + savehandler);
                } else {
                    atts.put("savehandler", contextPath + "/" + savehandler);
                }
            } else {
                if (logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "GridRenderer", "getDerivedAttributes", "Processing the savehandler with method expression: " + savehandler);
                }
                StringBuffer sb = new StringBuffer(savehandler);

                // replace the dot with a slash
                int dot = sb.indexOf(".");
                sb.replace(dot, dot + 1, "/");

                // remove the '#{' and '}' and prepend the necessary triggers
                sb.replace(0, 2, contextPath + "/faces/" + NitobiSaveHandlerPhaseListener.NITOBI_AJAX_TRIGGER + "/");
                sb.delete(sb.length() - 1, sb.length());

                atts.put("savehandler", sb.toString());
            }
        }
        return atts;
    }

    @Override
    protected boolean printId() {
        return true;
    }

}
