package com.nitobi.resources.handler;

import com.nitobi.resources.context.ResourceContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ResourceAgeHandler extends ResponseHandler {

    public ResourceAgeHandler(ResponseHandler successor, ResourceContext context) {
        super(successor, context);
    }

    public void handleResponse(HttpServletRequest request, HttpServletResponse response) throws Exception {

        /*
         *
         */
        long ifModifiedSinceDate = request.getDateHeader("If-Modified-Since");
        if (ifModifiedSinceDate == -1) {
            /*
             *
             */
            long ifUnmodifiedSinceDate = request.getDateHeader("If-Unmodified-Since");
            if (ifUnmodifiedSinceDate == -1) {
                /*
                 * Neither age conditions exist in the request. Proceed with successor.
                 */
                if (successor == null) {
                    /*
                     * There is no successor. Write the resource to the response
                     * as a 200 type.
                     */

                }
            }

        } else {

        }


        /*
        *
        */
    }
}
