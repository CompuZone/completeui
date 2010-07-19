/**
 * User: Eric Buitenhuis 
 * Date: May 19, 2008
 * Time: 7:19:11 AM
 */

package com.nitobi.jsf.taglib.spotlight;

import com.nitobi.jsf.component.spotlight.UISpotlight;
import com.nitobi.jsf.taglib.JavascriptEventBasedComponentTag;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;

/**
 * SpotlightTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class SpotlightTag extends JavascriptEventBasedComponentTag {

    private ValueExpression thisEffect = null;
    private ValueExpression stylesheet = null;
    private ValueExpression lensType = null;
    private ValueExpression lensOversize = null;
    private ValueExpression precache = null;
    private ValueExpression allowScrolling = null;

    public static final String THISEFFECT = "thisEffect";
    public static final String STYLESHEET = "stylesheet";
    public static final String LENSTYPE = "lensType";
    public static final String LENSOVERSIZE = "lensOversize";
    public static final String PRECACHE = "precache";
    public static final String ALLOWSCROLLING = "allowScrolling";

    public String getComponentType() {
        return UISpotlight.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return null;
    }

    @Override
    public void release() {
        super.release();
        setThisEffect(null);
        setStylesheet(null);
        setLensType(null);
        setLensOversize(null);
        setPrecache(null);
        setAllowScrolling(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(THISEFFECT, thisEffect);
        uiComponent.setValueExpression(STYLESHEET, stylesheet);
        uiComponent.setValueExpression(LENSTYPE, lensType);
        uiComponent.setValueExpression(LENSOVERSIZE, lensOversize);
        uiComponent.setValueExpression(PRECACHE, precache);
        uiComponent.setValueExpression(ALLOWSCROLLING, allowScrolling);
    }

    public void setThisEffect(ValueExpression thisEffect) {
        this.thisEffect = thisEffect;
    }

    public void setStylesheet(ValueExpression stylesheet) {
        this.stylesheet = stylesheet;
    }

    public void setLensType(ValueExpression lensType) {
        this.lensType = lensType;
    }

    public void setLensOversize(ValueExpression lensOversize) {
        this.lensOversize = lensOversize;
    }

    public void setAllowScrolling(ValueExpression allowScrolling) {
        this.allowScrolling = allowScrolling;
    }

    public void setPrecache(ValueExpression precache) {
        this.precache = precache;
    }
}
