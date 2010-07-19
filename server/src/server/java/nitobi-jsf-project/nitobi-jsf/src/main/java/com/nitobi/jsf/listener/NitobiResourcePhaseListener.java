package com.nitobi.jsf.listener;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.util.MimeTypeRepository;

import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * A phase listener that handles the internal static resources for the Nitobi components.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com">Eric Buitenhuis</a>
 */
public class NitobiResourcePhaseListener implements PhaseListener {

    private static Logger logger = Logger.getLogger(NitobiResourcePhaseListener.class.getName());


    public void afterPhase(PhaseEvent phaseEvent) {

        FacesContext context = FacesContext.getCurrentInstance();
        String viewId = context.getViewRoot().getViewId();

        if (viewId.contains(NitobiIncludes.URI_TRIGGER)) {
            if (logger.isLoggable(Level.FINEST)) {
                logger.finest("NitobiResourcePhaseListener::afterPhase() -- request contains resource trigger: " + NitobiIncludes.URI_TRIGGER);
            }

            HttpServletResponse response = (HttpServletResponse) context.getExternalContext().getResponse();

            /*
             * Check for the If-Modified-Since request header.
             */
            HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();


            long ifModifiedSinceDate = request.getDateHeader("If-Modified-Since");

            /*
             * If the client sent the If-Modified-Since header, then we assume they already have the resource cached. Otherwise
             * we have to go get it for them.
             */
            if (ifModifiedSinceDate == -1) {

                /*
                 * Set up the response object with the status and mime type.
                 */
                String mimeType = MimeTypeRepository.getTypeForSuffix(viewId.substring(viewId.lastIndexOf(".") + 1));
                response.setContentType(mimeType);
                response.setStatus(HttpServletResponse.SC_OK);

                /*
                 * Grab the resource and write it to the resonse.
                 */
                BufferedInputStream bis;
                bis = new BufferedInputStream(NitobiResourcePhaseListener.class.getResourceAsStream(viewId));
                ServletOutputStream oStream = null;
                try {
                    int size = bis.available();
                    byte[] b = new byte[size];
                    int readSize = bis.read(b);
                    if (readSize > 0) {
                        oStream = response.getOutputStream();
                        oStream.write(b);
                    }
                } catch (IOException ex) {
                    logger.severe("IOException caught while trying to write a file to stream. Offending uri: " + viewId + " Error message: " + ex.getMessage());
                    try {
                        response.sendError(HttpServletResponse.SC_NOT_FOUND, request.getRequestURI());
                    } catch (IOException e) {
                        logger.severe("Could not send an error message to the client: " + e.getMessage());
                    }
                } finally {
                    try {
                        bis.close();
                        if (oStream != null) {
                            oStream.close();
                        }
                    } catch (IOException e) {
                        logger.severe("IOException caught while trying to close an oStream: " + e.getMessage());
                    }
                }

            } else {

                /*
                 * There is a date. In this context, everything is static and not-changing, so we can just send back
                 * a NOT_MODIFIED_STATUS message. First we need to check for the If-None-Match to make sure the request
                 * is conditional.
                 */
                if (request.getHeader("If-None-Match") == null) {
                    response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                }
            }


            /*
             * End the JSF lifecycle
             */
            phaseEvent.getFacesContext().responseComplete();
        }
    }

    public void beforePhase(PhaseEvent arg0) {
        // Don't need to do anything here
    }

    public PhaseId getPhaseId() {
        return PhaseId.RESTORE_VIEW;
    }


}