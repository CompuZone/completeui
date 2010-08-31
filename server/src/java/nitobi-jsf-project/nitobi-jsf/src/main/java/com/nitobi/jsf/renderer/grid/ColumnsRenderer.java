/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.component.grid.UIColumns;
import com.nitobi.jsf.listener.NitobiGetPhaseListener;
import com.nitobi.jsf.listener.NitobiSaveHandlerPhaseListener;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.ColumnsTag;

import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class ColumnsRenderer extends NitobiRenderer {

    private static Logger logger = Logger.getLogger(ColumnsRenderer.class.getName());
    
    private static final String TAGNAME = "ntb:columns";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getPassthroughAttributes() {
        Map<String, String> atts = new HashMap<String, String>();

        atts.put("headerenabled", ColumnsTag.HEADERENABLED);

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
    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {

        if (logger.isLoggable(Level.FINE)) {
            logger.entering("ColumnsRenderer", "getDerivedAttributes");
        }

        Map<String, String> atts = new HashMap<String, String>();
        UIColumns grid = null;
        try {
            grid = (UIColumns) component;
        } catch (ClassCastException e) {
            throw new IllegalStateException("The ColumnsRenderer could not cast the incoming component to a UIGrid: " + e.getMessage());
        }

        String contextPath = context.getExternalContext().getRequestContextPath();

        MethodExpression gethandlerExpression = grid.getGethandler();
        if (gethandlerExpression != null) {
            String gethandler = gethandlerExpression.getExpressionString();
            if (gethandlerExpression.isLiteralText()) {
                if (logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "ColumnsRenderer", "getDerivedAttributes", "Processing the gethandler with literel text: " + gethandler);
                }
                if (gethandler.startsWith("/")) {
                    atts.put("gethandler", contextPath + gethandler);
                } else {
                    atts.put("gethandler", contextPath + "/" + gethandler);
                }
            } else {
                if(logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "ColumnsRenderer","getDerivedAttributes","Processing the gethandler with method expression: " + gethandler);
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
            if (gethandlerExpression.isLiteralText()) {
                if(logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "ColumnsRenderer","getDerivedAttributes","Processing the savehandler with literel text: " + savehandler);
                }
                if (savehandler.startsWith("/")) {
                    atts.put("savehandler", contextPath + savehandler);
                } else {
                    atts.put("savehandler", contextPath + "/" + savehandler);
                }
            } else {
                if(logger.isLoggable(Level.FINE)) {
                    logger.logp(Level.FINE, "ColumnsRenderer","getDerivedAttributes","Processing the savehandler with method expression: " + savehandler);
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

    /**
     * Whether or not you want the id attribute printed with the output. The default
     * value returned is false, so if the component must output the id, override and
     * return true.
     *
     * @return true if you want the id of the component printed as a DOM id
     */
    @Override
    protected boolean printId() {
        return true;
    }
}
