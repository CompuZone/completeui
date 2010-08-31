package com.nitobi.jsf.renderer.calendar;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.component.calendar.UIDatePicker;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.type.NitobiAttribute;

import javax.faces.context.FacesContext;
import javax.faces.component.UIComponent;
import javax.faces.FacesException;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.util.List;

/**
 * User: eric
 * Date: Dec 15, 2007
 * Time: 11:39:00 AM
 */
public class DatePickerRenderer extends NitobiRenderer {

    private static Logger logger = Logger.getLogger(DatePickerRenderer.class.getName());

    @Override
    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.CALENDAR};
    }

    @Override
    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.CALENDAR_STYLE};
    }

    @Override
    protected boolean needsXmlNamespaceDecl() {
        return true;
    }

    @Override
    protected String getTagName() {
        return UIDatePicker.NITOBI_TAGNAME;
    }

    /**
     * Whether or not you want the id attribute printed with the output.
     *
     * @return true if you want the id of the component printed
     */
    protected boolean printId() {
        return true;
    }

    @Override
    public void decode(FacesContext facesContext, UIComponent uiComponent) {
        super.decode(facesContext, uiComponent);

        UIDatePicker datePicker;
        try {
            datePicker = (UIDatePicker) uiComponent;
        } catch (ClassCastException e) {
            throw new IllegalStateException("The component to be casted in DatePickerRenderer needs to be a UIDatePicker type.");
        }
        String submittedValue = facesContext.getExternalContext().getRequestParameterMap().get(uiComponent.getClientId(facesContext));
        datePicker.setSubmittedValue(submittedValue);
    }

    /**
     * A method to get a single derived attribute
     *
     * @param attributeName The name of the attribute, according to the NitobiAttribute list in the component
     * @param component     The component associated with this renderer.
     * @param context       The current FacesContext instance
     * @return A String representing the value of the derived element.
     */
    @Override
    protected String getDerivedAttribute(String attributeName, UIComponent component, FacesContext context) {

        if(logger.isLoggable(Level.FINE)) {
            logger.fine("Getting derived attributes for '" + attributeName + "'.");
        }

        String result = null;

        UIDatePicker datePicker;
        try {
            datePicker = (UIDatePicker) component;
        } catch (ClassCastException e) {
            logger.severe("Could not cast the UIComponent to a UIDatePicker component.");
            throw new FacesException("Could not cast the UIComponent to a UIDatePicker component.");
        }

        /*
         * Processes the selecteddate attribute. If there is a value to the component, then the selecteddate is ignored.
         */
        if (attributeName != null) {
            if (attributeName.equalsIgnoreCase("selecteddate")) {
                Object datePickerValue = datePicker.getValue();
                if (datePickerValue == null || datePickerValue.equals("")) {
                    result = (String) datePicker.getAttributes().get(attributeName);
                } else {
                    result = datePickerValue.toString();
                }
            }
        } else {
            throw new NullPointerException("The DatePickerRenderer is attempting to process a derived attribute, but it is null.");
        }

        if (logger.isLoggable(Level.FINEST)) {
            logger.finest("Writing the selecteddate attribute as '" + result);
        }
        return result;
    }
}
