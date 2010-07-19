package com.nitobi.resources.handler;

import com.nitobi.resources.ContentNotLoadedException;
import com.nitobi.resources.Resource;
import com.nitobi.resources.context.ResourceContext;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * A Chain of Responsibility pattern meant to break up the complicated sequences and
 * conditions of HTTP responses and allow for easier testing and modification.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com">Eric Buitenhuis</a>
 * @version 1.0
 * @see com.nitobi.resources.handler.ResourceAgeHandler
 * @see com.nitobi.resources.context.ResourceContext
 * @see com.nitobi.resources.handler.ResourceMatchHandler
 * @see com.nitobi.resources.handler.URIValidationHandler
 */
public abstract class ResponseHandler {

    protected Logger logger = Logger.getLogger(ResponseHandler.class.getName());

    protected ResponseHandler successor;
    protected ResourceContext context;

    /**
     * The constructor for this class must contain a ResponseHandler and a ResourceContext
     * object. If an extending class is the last in the chain of responsibility, the ResponseHandler
     * parameter should be set to null. Create a chain of these objects in reverse order you want
     * them acting.
     *
     * @param successor The ResponseHandler that will be following directly behind this
     *                  object in succession.
     * @param context   The ResourceContext object that will provide the means to acquire the
     *                  resources needed.
     */
    public ResponseHandler(ResponseHandler successor,
                           ResourceContext context) {

        this.successor = successor;
        this.context = context;

    }

    /**
     * An abstract method for the implementing class to perform the action needed to the response.
     *
     * @param request  The HTTPServletRequest object.
     * @param response The HTTPServletResponse object to which the response will be written.
     * @throws Exception Thrown in the case where the response could not be handled.
     */
    public abstract void handleResponse(HttpServletRequest request, HttpServletResponse response) throws Exception;

    /**
     * Set the successor for this object. The successor's handleResponse object will
     * be called by this object after this object is finished dealing with its work.
     *
     * @param handler The ResponseHandler object that will be designated as the successor.
     */
    public void setSuccessor(ResponseHandler handler) {
        this.successor = handler;
    }

    /**
     * A helper method that sends a given resource inside an HTTP 200 response.
     * <p/>
     * If the content cannot be written to the Response's output stream, an
     * HTTP 500 message is sent.
     *
     * @param resource The resource to be sent.
     * @param response The response object to write to.
     * @param request  The request used for reference.
     */
    protected void sendResource(Resource resource, HttpServletResponse response, HttpServletRequest request) {
        ServletOutputStream oStream = null;

        /*
         * Set up the response object with the status and mime type.
         */
        response.setContentType(resource.getHeader().getMimeType());
        response.setStatus(HttpServletResponse.SC_OK);

        /*
         * Process the content
         */
        byte[] content = new byte[0];
        try {
            content = resource.getContent();
        } catch (ContentNotLoadedException e) {
            //TODO: handle this exception
        }
        if (content.length > 0) {
            try {
                oStream = response.getOutputStream();

                /*
                 * Write the resource
                 */
                oStream.write(content);
            } catch (IOException ex) {
                logger.severe("IOException caught while trying to write a file to stream. Error message: " + ex.getMessage());
                try {
                    /*
                     * Send a 500 error to the client.
                     */
                    response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, request.getRequestURI());
                } catch (IOException e) {
                    logger.severe("Could not send an error message to the client: " + e.getMessage());
                }
            } finally {
                try {
                    if (oStream != null) {
                        oStream.close();
                    }
                } catch (IOException e) {
                    logger.severe("IOException caught while trying to close an oStream: " + e.getMessage());
                }
            }
        }
    }
}
