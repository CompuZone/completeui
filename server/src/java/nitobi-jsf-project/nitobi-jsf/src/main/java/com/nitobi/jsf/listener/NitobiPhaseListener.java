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
 * @author eric
 */
public class NitobiPhaseListener implements PhaseListener {

    private final static int SUCCESS_STATUS = 200;
    private static Logger logger = Logger.getLogger(NitobiPhaseListener.class.getName());

    public void afterPhase(PhaseEvent phaseEvent) {
        FacesContext context = FacesContext.getCurrentInstance();
        String viewId = context.getViewRoot().getViewId();

        if (viewId.contains(NitobiIncludes.URI_TRIGGER)) {
            if (logger.isLoggable(Level.FINEST)) {
                logger.finest("NitobiPhaseListener::afterPhase() -- request contains resource trigger: " + NitobiIncludes.URI_TRIGGER);
            }
            HttpServletResponse response = (HttpServletResponse) context.getExternalContext().getResponse();
            String mimeType = MimeTypeRepository.getTypeForSuffix(viewId.substring(viewId.lastIndexOf(".") + 1));
            response.setContentType(mimeType);
            response.setStatus(SUCCESS_STATUS);

            BufferedInputStream bis;
            bis = new BufferedInputStream(NitobiPhaseListener.class.getResourceAsStream(viewId));
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
