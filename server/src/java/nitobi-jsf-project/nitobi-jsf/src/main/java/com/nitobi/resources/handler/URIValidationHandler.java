package com.nitobi.resources.handler;

import com.nitobi.resources.ResourceNotFoundException;
import com.nitobi.resources.context.ResourceContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.logging.Level;

/**
 * A handler specifically meant to determine the validity of a URI. If the resource does not
 * exist, there is no need to proceed with the other handlers, and a 404 message will be returned.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com">Eric Buitenhuis</a>
 * @version 1.0
 */
public class URIValidationHandler extends ResponseHandler {

    /**
     * This constructor simply passes the params up to super.
     *
     * @param successor The ResponseHandler that will be following directly behind this
     *                  object in succession.
     * @param context   The ResourceContext object that will provide the means to acquire the
     *                  resources needed.
     */
    public URIValidationHandler(ResponseHandler successor, ResourceContext context) {
        super(successor, context);
    }

    /**
     * This method simply checks and makes sure the resource being requested is available. It
     * will send a 404 response if it is not and will defer to the successor if it is.
     *
     * @param request  The HTTPServletRequest object.
     * @param response The HTTPServletResponse object to which the response will be written.
     * @throws Exception Thrown in the case where the response could not be handled.
     */
    public void handleResponse(HttpServletRequest request, HttpServletResponse response) throws Exception {

        if (logger.isLoggable(Level.FINER)) {
            logger.finer("Checking the validity of the request.");
        }

        /*
         * Prepare the resource in the context. If a ResourceNotFoundException is caught
         * then send a 404 response and stop propagating the chain.
         */
        try {
            this.context.prepareResource(request.getRequestURI());
        } catch (ResourceNotFoundException e) {
            if (logger.isLoggable(Level.FINER)) {
                logger.finer("Resource not found: " + request.getRequestURI());
            }
            /*
             * The resource was not found. Send a 404.
             */
            response.sendError(HttpServletResponse.SC_NOT_FOUND, request.getRequestURI());
        }

        if (this.successor == null) {
            /*
             * As long as the resource is valid, send the response
             */
            sendResource(this.context.getResource(request.getRequestURI()), response, request);
        } else {
            /*
             * There is another ResponseHandler that needs to process this request.
             */
            this.successor.handleResponse(request, response);
        }
    }

}
