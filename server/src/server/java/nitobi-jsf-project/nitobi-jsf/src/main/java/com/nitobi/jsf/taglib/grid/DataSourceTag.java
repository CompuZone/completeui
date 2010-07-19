/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIDataSource;

import javax.faces.webapp.UIComponentELTag;

/**
 *
 * @author eric
 */
public class DataSourceTag extends UIComponentELTag {

    @Override
    public String getComponentType() {
        return UIDataSource.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIDataSource.DEFAULT_RENDERER_TYPE;
    }

}
