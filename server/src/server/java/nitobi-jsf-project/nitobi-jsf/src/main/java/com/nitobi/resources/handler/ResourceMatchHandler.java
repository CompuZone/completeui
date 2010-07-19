package com.nitobi.resources.handler;

import com.nitobi.resources.context.ResourceContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ResourceMatchHandler extends ResponseHandler {

    /**
     * This constructor simply passes the
     *
     * @param successor The ResponseHandler that will be following directly behind this
     *                  object in succession.
     * @param context   The ResourceContext object that will provide the means to acquire the
     *                  resources needed.
     */
    public ResourceMatchHandler(ResponseHandler successor, ResourceContext context) {
        super(successor, context);
    }

    /**
     * An abstract method for the implementing class to perform the action needed to the response.
     *
     * @param request  The HTTPServletRequest object.
     * @param response The HTTPServletResponse object to which the response will be written.
     * @throws Exception Thrown in the case where the response could not be handled.
     */
    public void handleResponse(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
