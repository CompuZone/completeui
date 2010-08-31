/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 4:31:09 PM
 */

package com.nitobi.jsf.taglib.tabstrip;

import com.nitobi.jsf.component.tabstrip.UITab;
import com.nitobi.jsf.taglib.NitobiTag;

import javax.el.ValueExpression;

/**
 * TabTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TabTag extends NitobiTag {

    private ValueExpression width = null;
    private ValueExpression tooltip = null;
    private ValueExpression label = null;
    private ValueExpression source = null;
    private ValueExpression containerType = null;
    private ValueExpression icon = null;
    private ValueExpression cssClassName = null;
    private ValueExpression scriptEvaluationEnabled = null;
    private ValueExpression loadOnDemandEnabled = null;
    private ValueExpression hideOverflowEnabled = null;
    private ValueExpression onClick = null;
    private ValueExpression onMouseOut = null;
    private ValueExpression onMouseOver = null;
    private ValueExpression onFocus = null;
    private ValueExpression onBlur = null;
    private ValueExpression onActivate = null;
    private ValueExpression onDeactivate = null;
    private ValueExpression onLoad = null;

    public String getComponentType() {
        return UITab.COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UITab.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setWidth(null);
        setTooltip(null);
        setLabel(null);
        setSource(null);
        setContainerType(null);
        setIcon(null);
        setCssClassName(null);
        setScriptEvaluationEnabled(null);
        setLoadOnDemandEnabled(null);
        setHideOverflowEnabled(null);
        setOnClick(null);
        setOnMouseOut(null);
        setOnMouseOver(null);
        setOnFocus(null);
        setOnBlur(null);
        setOnActivate(null);
        setOnDeactivate(null);
        setOnLoad(null);
    }



    public void setWidth(ValueExpression width) {
        this.width = width;
    }

    public ValueExpression getWidth() {
        return width;
    }

    public ValueExpression getContainerType() {
        return containerType;
    }

    public void setContainerType(ValueExpression containerType) {
        this.containerType = containerType;
    }

    public ValueExpression getCssClassName() {
        return cssClassName;
    }

    public void setCssClassName(ValueExpression cssClassName) {
        this.cssClassName = cssClassName;
    }

    public ValueExpression getHideOverflowEnabled() {
        return hideOverflowEnabled;
    }

    public void setHideOverflowEnabled(ValueExpression hideOverflowEnabled) {
        this.hideOverflowEnabled = hideOverflowEnabled;
    }

    public ValueExpression getIcon() {
        return icon;
    }

    public void setIcon(ValueExpression icon) {
        this.icon = icon;
    }

    public ValueExpression getLabel() {
        return label;
    }

    public void setLabel(ValueExpression label) {
        this.label = label;
    }

    public ValueExpression getLoadOnDemandEnabled() {
        return loadOnDemandEnabled;
    }

    public void setLoadOnDemandEnabled(ValueExpression loadOnDemandEnabled) {
        this.loadOnDemandEnabled = loadOnDemandEnabled;
    }

    public ValueExpression getOnActivate() {
        return onActivate;
    }

    public void setOnActivate(ValueExpression onActivate) {
        this.onActivate = onActivate;
    }

    public ValueExpression getOnBlur() {
        return onBlur;
    }

    public void setOnBlur(ValueExpression onBlur) {
        this.onBlur = onBlur;
    }

    public ValueExpression getOnClick() {
        return onClick;
    }

    public void setOnClick(ValueExpression onClick) {
        this.onClick = onClick;
    }

    public ValueExpression getOnDeactivate() {
        return onDeactivate;
    }

    public void setOnDeactivate(ValueExpression onDeactivate) {
        this.onDeactivate = onDeactivate;
    }

    public ValueExpression getOnFocus() {
        return onFocus;
    }

    public void setOnFocus(ValueExpression onFocus) {
        this.onFocus = onFocus;
    }

    public ValueExpression getOnLoad() {
        return onLoad;
    }

    public void setOnLoad(ValueExpression onLoad) {
        this.onLoad = onLoad;
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

    public ValueExpression getScriptEvaluationEnabled() {
        return scriptEvaluationEnabled;
    }

    public void setScriptEvaluationEnabled(ValueExpression scriptEvaluationEnabled) {
        this.scriptEvaluationEnabled = scriptEvaluationEnabled;
    }

    public ValueExpression getSource() {
        return source;
    }

    public void setSource(ValueExpression source) {
        this.source = source;
    }

    public ValueExpression getTooltip() {
        return tooltip;
    }

    public void setTooltip(ValueExpression tooltip) {
        this.tooltip = tooltip;
    }
}
