package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIImageEditor;

import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class ImageEditorTag extends UIComponentELTag {

    private ValueExpression imageUrl = null;
    
    public static final String IMAGE_URL_ATTNAME = "imageUrl";
    
    @Override
    public String getComponentType() {
        return UIImageEditor.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIImageEditor.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public void release() {
        super.release();
        imageUrl = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        super.setProperties(component);
        component.setValueExpression(IMAGE_URL_ATTNAME, imageUrl);
    }

    public ValueExpression getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(ValueExpression imageUrl) {
        this.imageUrl = imageUrl;
    }

    
    
}
