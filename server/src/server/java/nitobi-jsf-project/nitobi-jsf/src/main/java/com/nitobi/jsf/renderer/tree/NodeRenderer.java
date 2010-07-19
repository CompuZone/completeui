/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 6:07:56 PM
 */

package com.nitobi.jsf.renderer.tree;

import com.nitobi.jsf.component.tree.UINode;
import com.nitobi.jsf.listener.NitobiGetPhaseListener;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.tree.NodeTag;

import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * NodeRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class NodeRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:node";
    private static final Logger logger = Logger.getLogger(NodeRenderer.class.getName());


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

        atts.put("cssclass", NodeTag.CSS_CLASS_ATTNAME);
        atts.put("label", NodeTag.LABEL_ATTNAME);
        atts.put("expanded", NodeTag.EXPANDED_ATTNAME);
        atts.put("nodetype", NodeTag.NODE_TYPE_ATTNAME);
        atts.put("haschildren", NodeTag.HAS_CHILDREN_ATTNAME);
        atts.put("onclick", NodeTag.ON_CLICK_ATTNAME);
        atts.put("onselect", NodeTag.ON_SELECT_ATTNAME);
        atts.put("ondeselect", NodeTag.ON_DESELECT_ATTNAME);
        atts.put("url",NodeTag.URL);

        return atts;
    }

    /**
     * For the cases where the outputted attributes do not grab the value directly
     * from the component. This method will grab the additional, derived attributes and
     * write them to the output.
     *
     * @param uiComponent The UINode component
     * @param context The current FacesContext
     */
    protected Map<String, String> getDerivedAttributes(UIComponent uiComponent, FacesContext context) {
       UINode node = null;
        try {
            node = (UINode)uiComponent;
        } catch(ClassCastException e) {
            throw new IllegalStateException("Component "
                    + uiComponent.toString()
                    + " is not of expected type. Expected: com.nitobi.jsf.component.node.UINode.");
        }
        MethodExpression gethandlerME = node.getGethandler();

        if(gethandlerME != null) {
            Map<String, String> atts = new HashMap<String, String>();
            String gethandlerString = gethandlerME.getExpressionString();
            String contextPath = context.getExternalContext().getRequestContextPath();

            if(gethandlerME.isLiteralText()) {
                if(gethandlerString.startsWith("/")) {
                    atts.put("gethandler",contextPath + gethandlerString);
                } else {
                    atts.put("gethandler",contextPath + "/" + gethandlerString);
                }
            } else {
                if(logger.isLoggable(Level.FINE)) {
                    logger.fine("Creating URI for method expression: " + gethandlerString);
                }

                StringBuffer stringBuffer = new StringBuffer(contextPath);
                stringBuffer.append("/faces/");
                stringBuffer.append(NitobiGetPhaseListener.NITOBI_AJAX_TRIGGER);
                stringBuffer.append('/');

                int dotIndex = gethandlerString.indexOf('.');
                stringBuffer.append(gethandlerString.substring(2,gethandlerString.indexOf('.')));
                stringBuffer.append("/");
                stringBuffer.append(gethandlerString.substring(dotIndex+1,gethandlerString.length()-1));
                atts.put("gethandler",stringBuffer.toString());
            }
            return atts;
        } else {
            return null;
        }
    }
}
