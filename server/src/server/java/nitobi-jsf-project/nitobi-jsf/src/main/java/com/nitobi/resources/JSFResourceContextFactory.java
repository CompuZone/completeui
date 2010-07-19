/**
 * User: eric
 * Date: Nov 27, 2008
 * Time: 11:01:46 AM
 */

package com.nitobi.resources;

import com.nitobi.resources.context.ResourceContext;
import com.nitobi.resources.context.TreeMapResourceContext;

import javax.faces.context.FacesContext;
import java.io.IOException;
import java.net.URL;

/**
 * Creates a populated ResourceContext object.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com">Eric Buitenhuis</a>
 */
public class JSFResourceContextFactory implements ResourceContextFactory {

    private static String CONTEXT_ROOT = "javascript_css";

    private static ResourceContext resourceContext = null;

    public ResourceContext getResourceContext(FacesContext facesContext) {
        if (resourceContext == null) {
            resourceContext = new TreeMapResourceContext();

            /*
             * Navigate through the CONTEXT_ROOT package and construct a ResourceContext
             * based on the content found.
             */

            /*
             * TODO: Get the package structure
             */
            URL rootURL = ClassLoader.getSystemResource(CONTEXT_ROOT);

            try {
                Object rootContent = rootURL.getContent();
                System.out.println("Root Content: " + rootContent);
            } catch (IOException e) {
                System.out.println("Couldn't get the content at " + rootURL.getPath());
            }

        }

        return resourceContext;
    }


}
