package com.nitobi.jsf.renderer.grid;

import com.nitobi.jsf.renderer.NitobiRenderer;
import com.nitobi.jsf.taglib.grid.ElementTag;
import com.nitobi.jsf.util.NitobiXmlRecord;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.util.Map;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class ElementRenderer extends NitobiRenderer{

    private static Logger logger = Logger.getLogger(ElementRenderer.class.getName());
    
    private static final String TAGNAME = "ntb:e";

    @Override
    protected String getTagName() {
        return TAGNAME;
    }

    @Override
    protected Map<String, String> getDerivedAttributes(UIComponent component, FacesContext context) {
        logger.finest("Getting derived attributes for the Element tag.");
        
        Map<String, String> atts = null;
        if(component != null) {
            Map<String, Object> attributes = component.getAttributes();
            String jsonString = (String)attributes.get(ElementTag.DATA_ATTNAME);
            logger.finest("Processing JSON string: " + jsonString);
            NitobiXmlRecord nxr = new NitobiXmlRecord(jsonString);
            atts = nxr.getAttributes();
            logger.finest("Attribute map size: " + atts.size());
        }
        return atts;
    }


}
