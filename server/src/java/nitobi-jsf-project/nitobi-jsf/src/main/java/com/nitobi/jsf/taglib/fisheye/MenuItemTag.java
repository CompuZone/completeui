/**
 * User: Eric Buitenhuis 
 * Date: May 17, 2008
 * Time: 7:47:37 PM
 */

package com.nitobi.jsf.taglib.fisheye;

import com.nitobi.jsf.component.fisheye.UIMenuItem;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 * MenuItem
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class MenuItemTag extends UIComponentELTag {

    private ValueExpression imageSrc = null;
    private ValueExpression label = null;
    private ValueExpression onClick = null;

    public static final String IMAGESRC = "imageSrc";
    public static final String LABEL = "label" ;
    public static final String ONCLICK = "onClick";
    
    public String getComponentType() {
        return UIMenuItem.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UIMenuItem.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        setImageSrc(null);
        setLabel(null);
        setOnClick(null);
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);
        uiComponent.setValueExpression(IMAGESRC, imageSrc);
        uiComponent.setValueExpression(LABEL, label);
        uiComponent.setValueExpression(ONCLICK, onClick);
    }

    public void setImageSrc(ValueExpression imageSrc) {
        this.imageSrc = imageSrc;
    }

    public void setLabel(ValueExpression label) {
        this.label = label;
    }

    public void setOnClick(ValueExpression onClick) {
        this.onClick = onClick;
    }
}
