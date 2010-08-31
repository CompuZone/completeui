package com.nitobi.resources;

import com.nitobi.resources.context.ResourceContext;

import javax.faces.context.FacesContext;

/**
 * User: eric
 * Date: Nov 27, 2008
 * Time: 12:24:25 PM
 */
public interface ResourceContextFactory {
    ResourceContext getResourceContext(FacesContext facesContext);
}
