/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.renderer.combo;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.combo.UIComboBox;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.combo.ComboBoxTag;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class ComboBoxRenderer extends NitobiRenderer {

    private static Logger logger = Logger.getLogger(ComboBoxRenderer.class.getName());

    private static final String TAGNAME = "ntb:combo";

    
    public boolean getRendersChildren() {
        return true;
    }

    /**
     * Grab all the required scripts for this component. No script request will be rendered more than once in a given
     * session.
     *
     * @return Array of String objects with the required scripts
     */
    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.COMBO};
    }

    /**
     * Grab all the styles this component requires. The output will include links to each. No repeat style
     * references will be outputted. The repeats are tracked at the request level.
     *
     * @return Array of Strings with all the stylesheet names
     */
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.COMBO_STYLE};
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
        atts.put("CSSClassName", ComboBoxTag.CSS_CLASS_NAME_ATTNAME);
        atts.put("DataTextField", ComboBoxTag.DATA_TEXT_FIELD_ATTNAME);
        atts.put("DataValueField", ComboBoxTag.DATA_VALUE_FIELD_ATTNAME);
        atts.put("DisabledWarningMessages", ComboBoxTag.DISABLED_WARNING_MESSAGES_ATTNAME);
        atts.put("Enabled", ComboBoxTag.ENABLED_ATTNAME);
        atts.put("ErrorLevel", ComboBoxTag.ERROR_LEVEL_ATTNAME);
        atts.put("Height", ComboBoxTag.HEIGHT_ATTNAME);
        atts.put("HttpRequestMethod", ComboBoxTag.HTTP_REQUEST_METHOD_ATTNAME);
        atts.put("ListZIndex", ComboBoxTag.LIST_Z_INDEX_ATTNAME);
        atts.put("Mode", ComboBoxTag.MODE_ATTNAME);
        atts.put("SmartListSeparator", ComboBoxTag.SMART_LIST_SEPARATOR_ATTNAME);
        atts.put("TabIndex", ComboBoxTag.TAB_INDEX_ATTNAME);
        atts.put("Width", ComboBoxTag.WIDTH_ATTNAME);
        atts.put("OnBeforeSelectEvent", ComboBoxTag.ON_BEFORE_SELECT_EVENT_ATTNAME);
        atts.put("OnBlurEvent", ComboBoxTag.ON_BLUR_EVENT_ATTNAME);
        atts.put("OnFocusEvent", ComboBoxTag.ON_FOCUS_EVENT_ATTNAME);
        atts.put("OnLoadEvent", ComboBoxTag.ON_LOAD_EVENT_ATTNAME);
        atts.put("OnSelectEvent", ComboBoxTag.ON_SELECT_EVENT_ATTNAME);
        atts.put("OnTabEvent", ComboBoxTag.ON_TAB_EVENT_ATTNAME);
        atts.put("theme", ComboBoxTag.THEME);
        
        return atts;
    }

    @Override
    public void decode(FacesContext facesContext, UIComponent uiComponent) {
        super.decode(facesContext, uiComponent);

        UIComboBox combo;
        try {
            combo = (UIComboBox)uiComponent;
        } catch(ClassCastException e) {
            throw new IllegalStateException("The component to be casted in ComboBoxRenderer needs to be a UIComboBox type.");
        }
        String submittedValue = facesContext.getExternalContext().getRequestParameterMap().get(uiComponent.getClientId(facesContext));
        combo.setSubmittedValue(submittedValue);
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

        UIComboBox combo;
        try {
            combo = (UIComboBox)component;
        } catch(ClassCastException e) {
            throw new IllegalStateException("The component to be casted in ComboBoxRenderer needs to be a UIComboBox type.");
        }

        /*
         * If there is no value in the component, grab the value from the initialSearch attribute.
         */
        Object value = combo.getValue();
        if(value == null) {
            value = component.getAttributes().get(ComboBoxTag.INITIAL_SEARCH_ATTNAME);
        }

        if(value != null) {
            atts.put("initialsearch", value.toString());
        }

        return atts;
    }
}
