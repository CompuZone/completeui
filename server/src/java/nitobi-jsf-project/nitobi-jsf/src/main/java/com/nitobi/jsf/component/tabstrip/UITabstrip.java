/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 8:05:27 AM
 */

package com.nitobi.jsf.component.tabstrip;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.faces.component.UIComponentBase;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * UITabstrip
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UITabstrip extends UIComponentBase implements AttributeAware {

    public static final String DEFAULT_COMPONENT_TYPE = "com.nitobi.jsf.Tabstrip";
    public static final String DEFAULT_RENDERER_TYPE = "TabstripRenderer";
    public static final String DEFAULT_FAMILY = "TabstripFamily";

    //------------------------------------------------------------------------- Component Property Constants
    
    private enum Attribute implements NitobiAttribute {
		WIDTH("width", "width", java.lang.String.class, true, false),
        HEIGHT("height","height", java.lang.String.class, true, false),
        CSSCLASS("cssclass","cssClass",java.lang.String.class, true, false),
        CSSSTYLE("cssstyle","cssStyle",java.lang.String.class, true, false),
        TABINDEX("tabindex","tabIndex",java.lang.String.class, true, false),
        THEME("theme","theme",java.lang.String.class, true, false),
        ONCLICK("onclick","onClick",java.lang.String.class, true, false),
        ONMOUSEOUT("onmouseout","onMouseOut", java.lang.String.class, true, false),
        ONMOUSEOVER("onmouseover","onMouseOver",java.lang.String.class, true, false);
		private boolean isPassthrough;
		private Class dataType;
		private String jsfAttributeName;
		private String domAttributeName;
        private boolean isMethodExpression;
        Attribute(String domAttributeName, String jsfAttributeName, Class clazz, boolean isPassthrough, boolean isMethodExpression) {
			this.domAttributeName = domAttributeName;
			this.jsfAttributeName = jsfAttributeName;
			this.dataType = clazz;
			this.isPassthrough = isPassthrough;
            this.isMethodExpression = isMethodExpression;
        }
		public String domAttributeName() {
			return this.domAttributeName;
		}
		public Class dataType() {
			return this.dataType;
		}
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

        public String jsfAttributeName() {
			return this.jsfAttributeName;
		}

    }

	private static final List<NitobiAttribute> COMPONENT_ATTRIBUTES;
	static {
		List<NitobiAttribute> attList = new ArrayList<NitobiAttribute>();
		attList.add(Attribute.WIDTH);
		attList.add(Attribute.HEIGHT);
		attList.add(Attribute.CSSCLASS);
		attList.add(Attribute.CSSSTYLE);
		attList.add(Attribute.TABINDEX);
		attList.add(Attribute.THEME);
		attList.add(Attribute.ONCLICK);
		attList.add(Attribute.ONMOUSEOUT);
		attList.add(Attribute.ONMOUSEOVER);
		COMPONENT_ATTRIBUTES = Collections.unmodifiableList(attList);
	}

    public List<NitobiAttribute> getComponentAttributes() {
		return COMPONENT_ATTRIBUTES;
	}

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}