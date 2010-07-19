/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 4:32:26 PM
 */

package com.nitobi.jsf.component.tabstrip;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.faces.component.UIComponentBase;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * UITab
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UITab extends UIComponentBase implements AttributeAware {

    //------------------------------------------------------------------------- Meta Constants

    public static final String COMPONENT_TYPE = "com.nitobi.jsf.Tab";
    public static final String DEFAULT_RENDERER_TYPE = "TabRenderer";
    public static final String FAMILY = "com.nitobi.jsf.Tab";

    //------------------------------------------------------------------------- Component Property Constants
    private enum Attribute implements NitobiAttribute{
		WIDTH("width", "width", java.lang.Integer.class, true, false),
        TOOLTIP("tooltip","tooltip", java.lang.String.class, true, false),
        LABEL("label", "label", java.lang.String.class, true, false),
        SOURCE("source","source",java.lang.String.class, true, false),
        CONTAINERTYPE("containertype","containerType",java.lang.String.class, true, false),
        ICON("icon","icon",java.lang.String.class, true, false),
        CSSCLASSNAME("cssclassname","cssClassName",java.lang.String.class, true, false),
        SCRIPTEVALUATIONENABLED("scriptevaluationenabled","scriptEvaluationEnabled",java.lang.Boolean.class, true, false),
        LOADONDEMANDENABLED("loadondemandenabled","loadOnDemandEnabled", java.lang.Boolean.class, true, false),
        HIDEOVERFLOWENABLED("hideoverflowenabled","hideOverflowEnabled",java.lang.Boolean.class, true, false),
        ONCLICK("onclick","onClick",java.lang.String.class, true, false),
        ONMOUSEOUT("onmouseout","onMouseOut", java.lang.String.class, true, false),
        ONMOUSEOVER("onmouseover","onMouseOver",java.lang.String.class, true, false),
        ONFOCUS("onfocus","onFocus",java.lang.String.class, true, false),
        ONBLUR("onblur","onBlur",java.lang.String.class, true, false),
        ONACTIVATE("onactivate","onActivate",java.lang.String.class, true, false),
        ONDEACTIVATE("ondeactivate","onDeactivate",java.lang.String.class, true, false),
        ONLOAD("onload","onLoad",java.lang.String.class, true, false);

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
		attList.add(Attribute.TOOLTIP);
		attList.add(Attribute.LABEL);
		attList.add(Attribute.SOURCE);
		attList.add(Attribute.CONTAINERTYPE);
		attList.add(Attribute.ICON);
		attList.add(Attribute.CSSCLASSNAME);
		attList.add(Attribute.SCRIPTEVALUATIONENABLED);
		attList.add(Attribute.LOADONDEMANDENABLED);
		attList.add(Attribute.HIDEOVERFLOWENABLED);
		attList.add(Attribute.ONCLICK);
		attList.add(Attribute.ONMOUSEOUT);
		attList.add(Attribute.ONMOUSEOVER);
		attList.add(Attribute.ONFOCUS);
		attList.add(Attribute.ONBLUR);
		attList.add(Attribute.ONACTIVATE);
		attList.add(Attribute.ONDEACTIVATE);
		attList.add(Attribute.ONLOAD);
		COMPONENT_ATTRIBUTES = Collections.unmodifiableList(attList);
	}
    
    public List<NitobiAttribute> getComponentAttributes() {
		return COMPONENT_ATTRIBUTES;
	}

    @Override
    public String getFamily() {
        return FAMILY;
    }
}