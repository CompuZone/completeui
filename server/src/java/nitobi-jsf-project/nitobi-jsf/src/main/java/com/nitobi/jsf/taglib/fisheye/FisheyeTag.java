/**
 * User: Eric Buitenhuis 
 * Date: May 17, 2008
 * Time: 7:03:40 PM
 */

package com.nitobi.jsf.taglib.fisheye;

import com.nitobi.jsf.component.fisheye.UIFisheye;
import com.nitobi.jsf.renderer.NitobiRenderer;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * FisheyeTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class FisheyeTag extends UIComponentELTag {

    private ValueExpression autoInitialize = null;
    private ValueExpression growPercent = null;
    private ValueExpression openDirection = null;
    private ValueExpression expandDirection = null;
    private ValueExpression iconWidth = null;
    private ValueExpression theme = null;

    public static final String GROWPERCENT = "growPercent";
    public static final String OPENDIRECTION = "openDirection";
    public static final String EXPANDDIRECTION = "expandDirection";
    public static final String ICONWIDTH = "iconWidth";
    public static final String THEME = "theme";

    public String getComponentType() {
        return UIFisheye.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UIFisheye.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setGrowPercent(null);
        setOpenDirection(null);
        setExpandDirection(null);
        setIconWidth(null);
        setTheme(null);
        setAutoInitialize(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(GROWPERCENT, growPercent);
        uiComponent.setValueExpression(OPENDIRECTION, openDirection);
        uiComponent.setValueExpression(EXPANDDIRECTION, expandDirection);
        uiComponent.setValueExpression(ICONWIDTH, iconWidth);
        uiComponent.setValueExpression(THEME, theme);
        uiComponent.setValueExpression(NitobiRenderer.AUTOINIT, autoInitialize);
    }

    public void setGrowPercent(ValueExpression growPercent) {
        this.growPercent = growPercent;
    }

    public void setOpenDirection(ValueExpression openDirection) {
        this.openDirection = openDirection;
    }

    public void setExpandDirection(ValueExpression expandDirection) {
        this.expandDirection = expandDirection;
    }

    public void setIconWidth(ValueExpression iconWidth) {
        this.iconWidth = iconWidth;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }

    public void setAutoInitialize(ValueExpression autoInitialize) {
        this.autoInitialize = autoInitialize;
    }
}
