/**
 * User: Eric Buitenhuis 
 * Date: May 30, 2008
 * Time: 6:37:36 AM
 */

package com.nitobi.jsf.taglib.tabstrip;

import com.nitobi.jsf.component.tabstrip.UITabstrip;
import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.NitobiTag;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;

/**
 * TabstripTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TabstripTag extends NitobiTag {

    private ValueExpression autoInitialize = null;
    private ValueExpression width = null;
    private ValueExpression height = null;
    private ValueExpression cssClass = null;
    private ValueExpression cssStyle = null;
    private ValueExpression tabIndex = null;
    private ValueExpression theme = null;
    private ValueExpression onClick = null;
    private ValueExpression onMouseOut = null;
    private ValueExpression onMouseOver = null;

    @Override
    public void release() {
        super.release();
        setAutoInitialize(null);
        setWidth(null);
        setHeight(null);
        setCssClass(null);
        setCssStyle(null);
        setTabIndex(null);
        setTheme(null);
        setOnClick(null);
        setOnMouseOut(null);
        setOnMouseOver(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(NitobiRenderer.AUTOINIT, autoInitialize);
    }

    public String getComponentType() {
        return UITabstrip.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UITabstrip.DEFAULT_RENDERER_TYPE;
    }

    public ValueExpression getAutoInitialize() {
        return autoInitialize;
    }

    public void setAutoInitialize(ValueExpression autoInitialize) {
        this.autoInitialize = autoInitialize;
    }

    public ValueExpression getCssClass() {
        return cssClass;
    }

    public void setCssClass(ValueExpression cssClass) {
        this.cssClass = cssClass;
    }

    public ValueExpression getCssStyle() {
        return cssStyle;
    }

    public void setCssStyle(ValueExpression cssStyle) {
        this.cssStyle = cssStyle;
    }

    public ValueExpression getHeight() {
        return height;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }

    public ValueExpression getOnClick() {
        return onClick;
    }

    public void setOnClick(ValueExpression onClick) {
        this.onClick = onClick;
    }

    public ValueExpression getOnMouseOut() {
        return onMouseOut;
    }

    public void setOnMouseOut(ValueExpression onMouseOut) {
        this.onMouseOut = onMouseOut;
    }

    public ValueExpression getOnMouseOver() {
        return onMouseOver;
    }

    public void setOnMouseOver(ValueExpression onMouseOver) {
        this.onMouseOver = onMouseOver;
    }

    public ValueExpression getTabIndex() {
        return tabIndex;
    }

    public void setTabIndex(ValueExpression tabIndex) {
        this.tabIndex = tabIndex;
    }

    public ValueExpression getTheme() {
        return theme;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }

    public ValueExpression getWidth() {
        return width;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }
}
