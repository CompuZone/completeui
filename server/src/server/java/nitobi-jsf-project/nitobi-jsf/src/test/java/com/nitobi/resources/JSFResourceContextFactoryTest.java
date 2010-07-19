/**
 * User: eric
 * Date: Nov 28, 2008
 * Time: 11:13:00 AM
 */

package com.nitobi.resources;

import com.nitobi.resources.context.ResourceContext;
import junit.framework.TestCase;
import org.junit.Test;

import javax.faces.context.FacesContext;

/**
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com">Eric Buitenhuis</a>
 */
public class JSFResourceContextFactoryTest extends TestCase {

    private FacesContext facesContext = FacesContext.getCurrentInstance();

    private ResourceContextFactory resourceContextFactory = new JSFResourceContextFactory();

    @Test
    public void testGetResourceContext() {
        ResourceContext resourceContext = resourceContextFactory.getResourceContext(facesContext);


        assertNotNull(resourceContext);
    }
}
