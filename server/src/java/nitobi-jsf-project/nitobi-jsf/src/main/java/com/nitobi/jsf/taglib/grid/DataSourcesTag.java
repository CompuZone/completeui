package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIDataSources;

import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author Eric Buitenhuis
 */
public class DataSourcesTag extends UIComponentELTag {
    
    public DataSourcesTag() {
        super();
    }

    @Override
    public String getComponentType() {
        return UIDataSources.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIDataSources.DEFAULT_RENDERER_TYPE;
    }

}
