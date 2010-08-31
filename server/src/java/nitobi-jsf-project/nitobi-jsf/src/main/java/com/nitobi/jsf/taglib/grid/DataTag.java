/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIData;

import javax.faces.webapp.UIComponentELTag;

/**
 * DataTag
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class DataTag extends UIComponentELTag {

    @Override
    public String getComponentType() {
        return UIData.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIData.DEFAULT_RENDERER_TYPE;
    }

}
