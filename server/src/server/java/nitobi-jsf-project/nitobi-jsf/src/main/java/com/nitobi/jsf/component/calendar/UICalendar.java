/**
 * User: Eric Buitenhuis 
 * Date: Jun 23, 2008
 * Time: 1:25:22 AM
 */

package com.nitobi.jsf.component.calendar;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.faces.component.UIComponentBase;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * UICalendar
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UICalendar extends UIComponentBase implements AttributeAware {

    //------------------------------------------------------------------------- Constants

    public static final String COMPONENT_TYPE = "com.nitobi.jsf.Calendar";
    public static final String COMPONENT_FAMILY = "com.nitobi.jsf.CalendarFamily";
    public static final String RENDERER_TYPE = "com.nitobi.jsf.CalendarRenderer";

    public static final String NITOBI_TAGNAME = "ntb:calendar";

    //------------------------------------------------------------------------- Attribute Definition

    private enum Attribute implements NitobiAttribute {
        MONTHCOLUMNS("monthcolumns", "monthColumns", java.lang.Integer.class, true, false),
        MONTHROWS("monthrows", "monthRows", java.lang.Integer.class, true, false),
        EFFECTENABLED("effectenabled", "effectEnabled", java.lang.Boolean.class, true, false),
        ONHIDE("onhide", "onHide", java.lang.String.class, true, false),
        ONSHOW("onshow", "onShow", java.lang.String.class, true, false),
        ONDATECLICKED("ondateclicked", "onDateClicked", java.lang.String.class, true, false),
        ONMONTHCHANGED("onmonthchanged", "onMonthChanged", java.lang.String.class, true, false),
        ONYEARCHANGED("onyearchanged", "onYearChanged", java.lang.String.class, true, false);

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

        public boolean isMethodExpression() {
            return this.isMethodExpression;
        }


    }

    private static final List<NitobiAttribute> COMPONENT_ATTRIBUTES;

    static {
        List<NitobiAttribute> attList = new ArrayList<NitobiAttribute>();
        attList.add(Attribute.MONTHCOLUMNS);
        attList.add(Attribute.MONTHROWS);
        attList.add(Attribute.EFFECTENABLED);
        attList.add(Attribute.ONHIDE);
        attList.add(Attribute.ONSHOW);
        attList.add(Attribute.ONDATECLICKED);
        attList.add(Attribute.ONMONTHCHANGED);
        attList.add(Attribute.ONYEARCHANGED);
        COMPONENT_ATTRIBUTES = Collections.unmodifiableList(attList);
    }

    //------------------------------------------------------------------------- Public Methods

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

    @SuppressWarnings({"PublicMethodNotExposedInInterface"})
    public String getFamily() {
        return COMPONENT_FAMILY;
    }
}
