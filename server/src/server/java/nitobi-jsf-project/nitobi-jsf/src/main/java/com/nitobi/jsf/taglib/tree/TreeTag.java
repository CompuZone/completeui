/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 4:31:32 PM
 */

package com.nitobi.jsf.taglib.tree;

import com.nitobi.jsf.component.tree.UITree;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * TreeTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TreeTag extends UIComponentELTag {

    private MethodExpression getHandler = null;
    private ValueExpression cssClass = null;
    private ValueExpression rootEnabled = null;
    private ValueExpression hoverHighlight = null;
    private ValueExpression targetFrame = null;
    private ValueExpression cssStyle = null;
    private ValueExpression theme = null;
    private ValueExpression expanded = null;
    private ValueExpression effect = null;
    private ValueExpression onClick = null;
    private ValueExpression onDeselect = null;
    private ValueExpression onSelect = null;
    private ValueExpression onMouseOver = null;
    private ValueExpression onMouseOut = null;
    private ValueExpression onDataReady = null;
    private ValueExpression autoinitialize = null;

    public static final String GET_HANDLER_ATTNAME = "getHandler";
    public static final String CSS_CLASS_ATTNAME = "cssClass";
    public static final String ROOT_ENABLED_ATTNAME = "rootEnabled";
    public static final String HOVER_HIGHLIGHT_ATTNAME = "hoverHighlight";
    public static final String TARGET_FRAME_ATTNAME = "targetFrame";
    public static final String CSS_STYLE_ATTNAME = "cssStyle";
    public static final String THEME_ATTNAME = "theme";
    public static final String EXPANDED_ATTNAME = "expanded";
    public static final String EFFECT_ATTNAME = "effect";
    public static final String ON_CLICK_ATTNAME = "onClick";
    public static final String ON_DESELECT_ATTNAME = "onDeselect";
    public static final String ON_SELECT_ATTNAME = "onSelect";
    public static final String ON_MOUSE_OVER_ATTNAME = "onMouseOver";
    public static final String ON_MOUSE_OUT_ATTNAME = "onMouseOut";
    public static final String ON_DATA_READY_ATTNAME = "onDataReady";
    public static final String AUTO_INITIALIZE_ATTNAME = "autoinitialize";

    public String getComponentType() {
        return UITree.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UITree.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        getHandler = null;
        cssClass=null;
        rootEnabled=null;
        hoverHighlight=null;
        targetFrame=null;
        cssStyle=null;
        theme=null;
        expanded=null;
        effect=null;
        onClick=null;
        onDeselect=null;
        onSelect=null;
        onMouseOut=null;
        onMouseOver=null;
        onDataReady=null;
        autoinitialize =null;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);

        com.nitobi.jsf.component.tree.UITree tree = null;
        try {
            tree = (com.nitobi.jsf.component.tree.UITree)uiComponent;
        } catch(ClassCastException e) {
            throw new IllegalStateException("Component "
                    + uiComponent.toString()
                    + " is not of expected type. Expected: com.nitobi.jsf.component.tree.UITree.");
        }

        if(getHandler != null) {
            tree.setGethandlerMethod(getHandler);
        }
        
        tree.setValueExpression(CSS_CLASS_ATTNAME,cssClass);
        tree.setValueExpression(ROOT_ENABLED_ATTNAME,rootEnabled);
        tree.setValueExpression(HOVER_HIGHLIGHT_ATTNAME,hoverHighlight);
        tree.setValueExpression(TARGET_FRAME_ATTNAME,targetFrame);
        tree.setValueExpression(CSS_STYLE_ATTNAME,cssStyle);
        tree.setValueExpression(THEME_ATTNAME,theme);
        tree.setValueExpression(EXPANDED_ATTNAME,expanded);
        tree.setValueExpression(EFFECT_ATTNAME,effect);
        tree.setValueExpression(ON_CLICK_ATTNAME,onClick);
        tree.setValueExpression(ON_DESELECT_ATTNAME,onDeselect);
        tree.setValueExpression(ON_SELECT_ATTNAME,onSelect);
        tree.setValueExpression(ON_MOUSE_OVER_ATTNAME,onMouseOver);
        tree.setValueExpression(ON_MOUSE_OUT_ATTNAME,onMouseOut);
        tree.setValueExpression(ON_DATA_READY_ATTNAME,onDataReady);
        tree.setValueExpression(AUTO_INITIALIZE_ATTNAME, autoinitialize);
    }

    public void setGetHandler(MethodExpression getHandler) {
        this.getHandler = getHandler;
    }

    public void setCssClass(ValueExpression cssClass) {
        this.cssClass = cssClass;
    }

    public void setRootEnabled(ValueExpression rootEnabled) {
        this.rootEnabled = rootEnabled;
    }

    public void setHoverHighlight(ValueExpression hoverHighlight) {
        this.hoverHighlight = hoverHighlight;
    }

    public void setTargetFrame(ValueExpression targetFrame) {
        this.targetFrame = targetFrame;
    }

    public void setCssStyle(ValueExpression cssStyle) {
        this.cssStyle = cssStyle;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }

    public void setExpanded(ValueExpression expanded) {
        this.expanded = expanded;
    }

    public void setEffect(ValueExpression effect) {
        this.effect = effect;
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

    public void setOnMouseOver(ValueExpression onMouseOver) {
        this.onMouseOver = onMouseOver;
    }

    public void setOnMouseOut(ValueExpression onMouseOut) {
        this.onMouseOut = onMouseOut;
    }

    public void setOnDataReady(ValueExpression onDataReady) {
        this.onDataReady = onDataReady;
    }

    public void setAutoinitialize(ValueExpression autoinitialize) {
        this.autoinitialize = autoinitialize;
    }
}
