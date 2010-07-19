package com.nitobi.jsf.listener;

import javax.el.ELException;
import javax.el.MethodExpression;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class NitobiAjaxPhaseListener implements PhaseListener {

    public static final String NITOBI_AJAX_TRIGGER = "nitobi_ajax_trigger";
    private static final String MEX_PREFIX = "#{";
    private static final String MEX_SUFFIX = "}";
    private static Logger logger = Logger.getLogger(NitobiAjaxPhaseListener.class.getName());

    /**
     *
     * @param phaseEvent
     */
    public void afterPhase(PhaseEvent phaseEvent) {

        FacesContext context = phaseEvent.getFacesContext();
        String viewId = context.getViewRoot().getViewId();

        int triggerPosition = viewId.indexOf(NITOBI_AJAX_TRIGGER);
        if(triggerPosition > -1) {
            /*
             * Grab the method expression from the viewId
             */
            String theExpression = MEX_PREFIX + viewId.substring(triggerPosition + NITOBI_AJAX_TRIGGER.length() + 1) + MEX_SUFFIX;
            theExpression = theExpression.replace('/','.');
            if(logger.isLoggable(Level.FINE)) {
                logger.log(Level.FINE,"Nitobi Ajax Phase Listener attempting method expression: " + theExpression);
            }

            /*
             * Set up the method expression
             */
            Class[] argTypes = {};
            MethodExpression methodExpression = null;
            try {
                methodExpression = context.getApplication().getExpressionFactory().createMethodExpression(context.getELContext(), theExpression, null, argTypes);
            } catch (ELException e) {
                logger.warning("Nitobi Phase Listener could not generate the method expression for " + theExpression + " -- " + e.getMessage());
            } catch (NullPointerException e) {
                logger.warning("Nitobi Phase Listener received a NullPointerException while trying to create the methodExpression for " + theExpression + " -- " + e.getMessage());
            }

            /*
             * Invoke the method in managed bean
             */
            Object[] args = {};
            try {
                methodExpression.invoke(context.getELContext(), args);
            } catch (NullPointerException e) {
                logger.warning("Nitobi Phase Listener received a NullPointerException while trying to invoke the methodExpression for " + theExpression + " -- " + e.getMessage());
            } catch (ELException e) {
                logger.warning("Nitobi Phase Listener could not invoke the method for " + theExpression + " -- " + e.getMessage());
            }

            /*
             * End the JSF lifecycle
             */
            context.getApplication().getStateManager().saveView(context);
            context.responseComplete();
        }
    }

    public void beforePhase(PhaseEvent arg0) {
    // Don't need to do anything here
    }

    public PhaseId getPhaseId() {
        return PhaseId.RESTORE_VIEW;
    }
}
