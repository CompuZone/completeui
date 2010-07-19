/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 5:53:29 PM
 */

package com.nitobi.jsf.taglib.tree;

import com.nitobi.jsf.component.tree.UINode;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * NodeTag
 *
 *
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class NodeTag extends UIComponentELTag {

    private MethodExpression getHandler = null;
    private ValueExpression cssClass = null;
    private ValueExpression label = null;
    private ValueExpression expanded = null;
    private ValueExpression nodeType = null;
    private ValueExpression hasChildren = null;
    private ValueExpression onClick = null;
    private ValueExpression onSelect = null;
    private ValueExpression onDeselect = null;
    private ValueExpression url = null;

    public static final String GET_HANDLER_ATTNAME = "getHandler";
    public static final String CSS_CLASS_ATTNAME = "cssClass";
    public static final String LABEL_ATTNAME = "label";
    public static final String EXPANDED_ATTNAME = "expanded";
    public static final String NODE_TYPE_ATTNAME = "nodeType";
    public static final String HAS_CHILDREN_ATTNAME = "hasChildren";
    public static final String ON_CLICK_ATTNAME = "onClick";
    public static final String ON_DESELECT_ATTNAME = "onDeselect";
    public static final String ON_SELECT_ATTNAME = "onSelect";
    public static final String URL = "url";

    public String getComponentType() {
        return UINode.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UINode.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        getHandler = null;
        cssClass=null;
        label=null;
        expanded=null;
        nodeType=null;
        hasChildren=null;
        onClick=null;
        onDeselect=null;
        onSelect=null;
        url = null;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);

        com.nitobi.jsf.component.tree.UINode node = null;
        try {
            node = (com.nitobi.jsf.component.tree.UINode)uiComponent;
        } catch(ClassCastException e) {
            throw new IllegalStateException("Component "
                    + uiComponent.toString()
                    + " is not of expected type. Expected: com.nitobi.jsf.component.tree.UINode.");
        }

        if(getHandler != null) {
            node.setGethandler(getHandler);
        }

        uiComponent.setValueExpression(CSS_CLASS_ATTNAME,cssClass);
        uiComponent.setValueExpression(LABEL_ATTNAME,label);
        uiComponent.setValueExpression(EXPANDED_ATTNAME,expanded);
        uiComponent.setValueExpression(NODE_TYPE_ATTNAME,nodeType);
        uiComponent.setValueExpression(HAS_CHILDREN_ATTNAME,hasChildren);
        uiComponent.setValueExpression(ON_CLICK_ATTNAME,onClick);
        uiComponent.setValueExpression(ON_DESELECT_ATTNAME,onDeselect);
        uiComponent.setValueExpression(ON_SELECT_ATTNAME,onSelect);
        uiComponent.setValueExpression(URL,url);
    }

    public void setUrl(ValueExpression url) {
        this.url = url;
    }

    public void setGetHandler(MethodExpression getHandler) {
        this.getHandler = getHandler;
    }

    public void setCssClass(ValueExpression cssClass) {
        this.cssClass = cssClass;
    }

    public void setExpanded(ValueExpression expanded) {
        this.expanded = expanded;
    }

    public void setOnClick(ValueExpression onClick) {
        this.onClick = onClick;
    }

    public void setOnDeselect(ValueExpression onDeselect) {
        this.onDeselect = onDeselect;
    }

    public void setOnSelect(ValueExpression onSelect) {
        this.onSelect = onSelect;
    }

    public void setLabel(ValueExpression label) {
        this.label = label;
    }

    public void setNodeType(ValueExpression nodeType) {
        this.nodeType = nodeType;
    }

    public void setHasChildren(ValueExpression hasChildren) {
        this.hasChildren = hasChildren;
    }
}
