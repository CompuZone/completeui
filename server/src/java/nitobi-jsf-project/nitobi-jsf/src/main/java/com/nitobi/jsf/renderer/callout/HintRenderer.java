package com.nitobi.jsf.renderer.callout;

import com.nitobi.jsf.component.callout.UIHints;
import com.nitobi.jsf.taglib.callout.HintTag;

import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.render.Renderer;
import java.io.IOException;
import java.util.Map;

/**
 * User: eric
 * Date: Apr 26, 2008
 * Time: 9:20:34 PM
 */
public class HintRenderer extends Renderer {

    @Override
    public void encodeBegin(FacesContext context, UIComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String parentId;

        UIComponent parent = component.getParent();
        if(parent instanceof UIHints) {
            parentId = parent.getClientId(context);
        } else {
            String viewId = context.getViewRoot().getViewId();
            throw new FacesException("A Nitobi JSF UIHint component in " + viewId + " has been found outside of a UIHints component.");
        }

        /*
         * Grab the attribute values
         */
        Map<String, Object> attributes = component.getAttributes();
        String objId = (String)attributes.get(HintTag.OBJ_ID_ATTNAME);
        String title = (String)attributes.get(HintTag.TITLE_ATTNAME);
        String text = (String)attributes.get(HintTag.TEXT_ATTNAME);


        StringBuffer sb = new StringBuffer(parentId);
        if(title == null) {
            if(text == null) {
                throw new NullPointerException("For a Nitobi Hint, you cannot have both the title and the text both be null");
            } else {
                sb.append(".addHint('").append(objId).append("',null,'").append(text).append("');");   // addHint(null, 'text');
            }
        } else {
            if(text == null) {
                sb.append(".addHint('").append(objId).append("','").append(title).append("',null);");   // addHint('title',null);
            } else {
                sb.append(".addHint('").append(objId).append("','").append(title).append("','").append(text).append("');");   // addHint('title', 'text');
            }
        }

        /*
         * Output the javascript
         */
        writer.write(sb.toString());
    }
}
