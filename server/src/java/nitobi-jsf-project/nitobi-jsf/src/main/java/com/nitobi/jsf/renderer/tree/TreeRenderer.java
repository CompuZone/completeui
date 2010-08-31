/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 4:58:49 PM
 */

package com.nitobi.jsf.renderer.tree;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.tree.UITree;
import com.nitobi.jsf.listener.NitobiGetPhaseListener;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.tree.TreeTag;

import javax.el.MethodExpression;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * TreeRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TreeRenderer extends NitobiRenderer {

    private static final String TAGNAME="ntb:tree";
    private static final Logger logger = Logger.getLogger(TreeRenderer.class.getName());

    /**
     * Grab all the required scripts for this component. No script request will be rendered more than once in a given
     * session.
     *
     * @return Array of String objects with the required scripts
     */
    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.TREE};
    }

    /**
     * Grab all the styles this component requires. The output will include links to each. No repeat style
     * references will be outputted. The repeats are tracked at the request level.
     *
     * @return Array of Strings with all the stylesheet names
     */
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.TREE_STYLE};
    }

    /**
     * Whether or not the component requires the <?XML:NAMESPACE prefix="ntb" /> printed before the component.
     * Generally, this is true if the component is a parent, but the children components do not need this as long as you
     * include it for the parent.
     *
     * @return true if you want the namespace declaration
     */
    protected boolean needsXmlNamespaceDecl() {
        return true;
    }

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return TAGNAME;
    }

    /**
     * Whether or not you want the id attribute printed with the output.
     *
     * @return true if you want the id of the component printed
     */
    protected boolean printId() {
        return true;
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
        atts.put("cssclass", TreeTag.CSS_CLASS_ATTNAME);
        atts.put("rootenabled", TreeTag.ROOT_ENABLED_ATTNAME);
        atts.put("hoverhighlight", TreeTag.HOVER_HIGHLIGHT_ATTNAME);
        atts.put("targetframe", TreeTag.TARGET_FRAME_ATTNAME);
        atts.put("cssstyle", TreeTag.CSS_STYLE_ATTNAME);
        atts.put("theme", TreeTag.THEME_ATTNAME);
        atts.put("expanded", TreeTag.EXPANDED_ATTNAME);
        atts.put("effect", TreeTag.EFFECT_ATTNAME);
        atts.put("onclick", TreeTag.ON_CLICK_ATTNAME);
        atts.put("ondeselect", TreeTag.ON_DESELECT_ATTNAME);
        atts.put("onselect", TreeTag.ON_SELECT_ATTNAME);
        atts.put("onmouseover", TreeTag.ON_MOUSE_OVER_ATTNAME);
        atts.put("onmouseout", TreeTag.ON_MOUSE_OUT_ATTNAME);
        atts.put("ondataready", TreeTag.ON_DATA_READY_ATTNAME);

        return atts;
    }

    /**
     * For the cases where the outputted attributes do not grab the value directly
     * from the component. This method will grab the additional, derived attributes and
     * write them to the output.
     *
     * @param uiComponent The UITree object
     * @param context The FacesContext instance
     */
    protected Map<String, String> getDerivedAttributes(UIComponent uiComponent, FacesContext context) {

        UITree tree = null;
        try {
            tree = (UITree)uiComponent;
        } catch(ClassCastException e) {
            throw new IllegalStateException("Component "
                    + uiComponent.toString()
                    + " is not of expected type. Expected: com.nitobi.jsf.component.tree.UITree.");
        }
        MethodExpression gethandlerME = tree.getGethandlerMethod();

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
