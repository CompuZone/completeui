/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 11:02:13 AM
 */

package com.nitobi.jsf.component.tabstrip;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.faces.component.UIComponentBase;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * UITabs
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UITabs extends UIComponentBase implements AttributeAware {

    //------------------------------------------------------------------------- Component Meta Constants

    public static final String COMPONENT_TYPE = "com.nitobi.jsf.Tabs";
    public static final String DEFAULT_RENDERER_TYPE = "TabsRenderer";
    public static final String COMPONENT_FAMILY = "com.nitobi.jsf.Tabs";

    //------------------------------------------------------------------------- Component Property Constants

    private enum Attribute implements NitobiAttribute {
        /*
         * ATTRIBUTE_NAME("dom attribute","java variable","type",isPassthrough)
         */
        HEIGHT("height", "height", java.lang.String.class, true, false),
        ALIGN("align","align", java.lang.String.class, true, false),
        OVERLAP("overlap","overlap",java.lang.String.class, true, false),
        ACTIVATEEFFECT("activateeffect","activateEffect",java.lang.String.class, true, false),
        ACTIVETABINDEX("activetabindex","activeTabIndex",java.lang.String.class, true, false),
        ONCLICK("onclick","onClick",java.lang.String.class, true, false),
        ONMOUSEOUT("onmouseout","onMouseOut", java.lang.String.class, true, false),
        ONMOUSEOVER("onmouseover","onMouseOver",java.lang.String.class, true, false),
        ONBEFORETABCHANGE("onbeforetabchange","onBeforeTabChange", java.lang.String.class, true, false),
        ONTABCHANGE("ontabchange","onTabChange", java.lang.String.class, true, false);
        

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
		attList.add(Attribute.HEIGHT);
		attList.add(Attribute.ALIGN);
		attList.add(Attribute.OVERLAP);
		attList.add(Attribute.ACTIVATEEFFECT);
		attList.add(Attribute.ACTIVETABINDEX);
		attList.add(Attribute.ONCLICK);
		attList.add(Attribute.ONMOUSEOUT);
		attList.add(Attribute.ONMOUSEOVER);
		attList.add(Attribute.ONBEFORETABCHANGE);
		attList.add(Attribute.ONTABCHANGE);
		COMPONENT_ATTRIBUTES = Collections.unmodifiableList(attList);
	}

    //------------------------------------------------------------------------- Public methods
    
    public List<NitobiAttribute> getComponentAttributes() {
		return COMPONENT_ATTRIBUTES;
	}

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }
}