package com.nitobi.jsf.component.calendar;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.el.MethodExpression;
import javax.faces.component.UIInput;
import javax.faces.component.ValueHolder;
import javax.faces.context.FacesContext;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author eric
 */
public class UIDatePicker extends UIInput implements AttributeAware, ValueHolder {

    //------------------------------------------------------------------------- Constants

    public static final String DEFAULT_RENDERER_TYPE = "com.nitobi.jsf.DatePickerRenderer";
    public static final String DEFAULT_COMPONENT_FAMILY = "com.nitobi.jsf.DatePickerFamily";
    public static final String DEFAULT_COMPONENT_TYPE = "com.nitobi.jsf.DatePicker";

    public static final String NITOBI_TAGNAME = "ntb:datepicker";

    //------------------------------------------------------------------------- Attribute Definition

    /**
     * Represents a Nitobi attribute, mapping dom attribute names to java attribute names, defining
     * types, passthrough/derived, and whether or not it's a MethodExpression. This enum makes sure these
     * are only defined once in the application to reduce memory and eliminate the need for String
     * creation at each layer.
     * <p/>
     * TODO: Create base enum for Attribute enum so components don't need to repeat code.
     */
    private enum Attribute implements NitobiAttribute {
        THEME("theme", "theme", java.lang.Integer.class, true, false),
        MINDATE("mindate", "minDate", java.lang.Integer.class, true, false),
        MAXDATE("maxdate", "maxDate", java.lang.Boolean.class, true, false),
        SELECTEDDATE("selecteddate", "selectedDate", java.lang.String.class, false, false),
        SUBMITMASK("submitmask", "submitMask", java.lang.String.class, true, false),
        LONGMONTHNAMES("longmonthnames", "longMonthNames", java.lang.String.class, true, false),
        SHORTMONTHNAMES("shortmonthnames", "shortMonthNames", java.lang.String.class, true, false),
        LONGDAYNAMES("longdaynames", "longDayNames", java.lang.String.class, true, false),
        SHORTDAYNAMES("shortdaynames", "shortDayNames", java.lang.String.class, true, false),
        MINDAYNAMES("mindaynames", "minDayNames", java.lang.String.class, true, false),
        EVENTSURL("eventsurl", "eventsUrl", java.lang.String.class, true, true),
        ONSETINVALIDDATE("onsetinvaliddate", "onSetInvalidDate", java.lang.String.class, true, false),
        ONSETOUTOFRANGE("onsetoutofrangedate", "onSetOutOfRangeDate", java.lang.String.class, true, false),
        ONSETDISABLEDDATE("onsetdisableddate", "onSetDisabledDate", java.lang.String.class, true, false),
        ONDATESELECTED("ondateselected", "onDateSelected", java.lang.String.class, true, false),
        NAVCONFIRMTEXT("navconfirmtext", "navConfirmText", java.lang.String.class, true, false),
        NAVCANCELTEXT("navcanceltext", "navCancelText", java.lang.String.class, true, false),
        NAVOUTOFRANGETEXT("navoutofrangetext", "navOutOfRangeText", java.lang.String.class, true, false),
        NAVINVALIDYEARTEXT("navinvalidyeartext", "navInvalidYearText", java.lang.String.class, true, false),
        SHIMENABLED("shimenabled", "shimEnabled", java.lang.Boolean.class, true, false),
        ONEVENTDATESELECTED("oneventdateselected", "onEventDateSelected", java.lang.String.class, true, false);


        private final Class dataType;
        private final String jsfAttributeName;
        private final String domAttributeName;
        private final boolean isPassthrough;
        private final boolean isMethodExpression;

        private Attribute(String domAttributeName,
                          String jsfAttributeName,
                          Class dataType,
                          boolean isPassthrough,
                          boolean isMethodExpression) {
            this.dataType = dataType;
            this.domAttributeName = domAttributeName;
            this.isPassthrough = isPassthrough;
            this.jsfAttributeName = jsfAttributeName;
            this.isMethodExpression = isMethodExpression;
        }


        /**
         * The name that is meant to be printed to the HTML output.
         *
         * @return The name that will be printed in the HTML output.
         */
        public String domAttributeName() {
            return this.domAttributeName;
        }

        /**
         * The name that is used by JSF Taglib and Taglib classes.
         *
         * @return The name as it is used for JSF variables and tags
         */
        public String jsfAttributeName() {
            return this.jsfAttributeName;
        }

        /**
         * What kind of data this is. This value should map directly to the
         * type that Nitobi has declared it in their Javascript libs. This is
         * NOT meant to reflect Method Expression types or Value Expression
         * types.
         *
         * @return The Java corresponding type to what will be in Javascript
         */
        public Class dataType() {
            return this.dataType;
        }

        /**
         * Whether or not this attribute needs manipulation before outputting
         * to HTML.
         *
         * @return True if this attribute is passthrough
         */
        public boolean isPassthrough() {
            return this.isPassthrough;
        }

        /**
         * Whether or not this attribute is a method expression.
         *
         * @return True if it is a method expression
         */
        public boolean isMethodExpression() {
            return this.isMethodExpression;
        }


    }

    //------------------------------------------------------------------------- Private members


    /**
     * Make this static so there is only ever on Attribute List instance for all component
     * instances.
     */
    private static final List<NitobiAttribute> COMPONENT_ATTRIBUTES;

    static {
        List<NitobiAttribute> attList = new ArrayList<NitobiAttribute>();
        attList.add(Attribute.THEME);
        attList.add(Attribute.MINDATE);
        attList.add(Attribute.MAXDATE);
        attList.add(Attribute.SELECTEDDATE);
        attList.add(Attribute.SUBMITMASK);
        attList.add(Attribute.LONGMONTHNAMES);
        attList.add(Attribute.SHORTMONTHNAMES);
        attList.add(Attribute.LONGDAYNAMES);
        attList.add(Attribute.SHORTDAYNAMES);
        attList.add(Attribute.MINDAYNAMES);
        attList.add(Attribute.EVENTSURL);
        attList.add(Attribute.ONSETINVALIDDATE);
        attList.add(Attribute.ONSETOUTOFRANGE);
        attList.add(Attribute.ONSETDISABLEDDATE);
        attList.add(Attribute.ONDATESELECTED);
        attList.add(Attribute.NAVCONFIRMTEXT);
        attList.add(Attribute.NAVCANCELTEXT);
        attList.add(Attribute.NAVOUTOFRANGETEXT);
        attList.add(Attribute.NAVINVALIDYEARTEXT);
        attList.add(Attribute.SHIMENABLED);
        attList.add(Attribute.ONEVENTDATESELECTED);
        COMPONENT_ATTRIBUTES = Collections.unmodifiableList(attList);
    }

    private MethodExpression eventsUrl = null;

    //------------------------------------------------------------------------- Public methods


    /**
     * Returns an array of NitobiAttribute objects that
     * will give the information needed to determine names, types,
     * and passthrough behavior.
     *
     * @return An array of NitobiAttribute objects.
     */
    public List<NitobiAttribute> getComponentAttributes() {
        return COMPONENT_ATTRIBUTES;
    }

    @Override
    public String getFamily() {
        return DEFAULT_COMPONENT_FAMILY;
    }

    public MethodExpression getEventsUrl() {
        return eventsUrl;
    }

    public void setEventsUrl(MethodExpression eventsUrl) {
        this.eventsUrl = eventsUrl;
    }

    @Override
    public Object saveState(FacesContext facesContext) {
        Object values[] = new Object[2];
        values[0] = super.saveState(facesContext);
        values[1] = eventsUrl;
        return ((values));
    }

    @Override
    public void restoreState(FacesContext facesContext, Object state) {
        Object values[] = (Object[]) state;
        super.restoreState(facesContext, values[0]);
        this.eventsUrl = (MethodExpression) values[1];
    }
}
