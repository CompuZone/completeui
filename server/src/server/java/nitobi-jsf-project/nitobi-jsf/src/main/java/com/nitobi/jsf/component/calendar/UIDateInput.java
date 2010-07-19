/**
 * User: Eric Buitenhuis 
 * Date: Jun 22, 2008
 * Time: 9:50:47 PM
 */

package com.nitobi.jsf.component.calendar;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.faces.component.UIComponentBase;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * UIDateInput
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UIDateInput extends UIComponentBase implements AttributeAware {


    //------------------------------------------------------------------------- Constants

    public static final String COMPONENT_TYPE = "com.nitobi.jsf.DateInput";
    public static final String RENDERER_TYPE = "com.nitobi.jsf.DateInputRenderer";
    public static final String COMPONENT_FAMILY = "com.nitobi.jsf.DateInputFamily";

    public static final String NITOBI_TAGNAME = "ntb:dateinput";

    public String getFamily() {
        return COMPONENT_FAMILY;
    }

    //------------------------------------------------------------------------- Define Attribute Enum

    private enum Attribute implements NitobiAttribute  {
        DISPLAYMASK("displaymask","displayMask",java.lang.String.class, true, false),
        EDITMASK("editmask","editMask",java.lang.String.class, true, false),
        ONBLUR("onblur","onBlur",java.lang.String.class, true, false),
        ONFOCUS("onfocus","onFocus",java.lang.String.class, true, false),
        WIDTH("width","width",java.lang.Integer.class, true, false),
        EDITABLE("editable","editable",java.lang.Boolean.class, true, false);

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
         * @return
         */
        public String domAttributeName() {
            return this.domAttributeName;
        }

        /**
         * The name that is used by JSF Taglib and Taglib classes.
         *
         * @return
         */
        public String jsfAttributeName() {
            return this.jsfAttributeName;
        }

        /**
         * What kind of data this is. This value should map directly to the
         * type that Nitobi has declared it in their Javascript libs.
         *
         * @return
         */
        public Class dataType() {
            return this.dataType;
        }

        /**
         * Whether or not this attribute needs manipulation before outputting
         * to HTML.
         *
         * @return
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

    private static final List<NitobiAttribute> COMPONENT_ATTRIBUTES;
    static {
        List<NitobiAttribute> attList = new ArrayList<NitobiAttribute>();
        attList.add(Attribute.DISPLAYMASK);
        attList.add(Attribute.EDITMASK);
        attList.add(Attribute.ONBLUR);
        attList.add(Attribute.ONFOCUS);
        attList.add(Attribute.WIDTH);
        attList.add(Attribute.EDITABLE);
        COMPONENT_ATTRIBUTES = Collections.unmodifiableList(attList);
    }

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
}
