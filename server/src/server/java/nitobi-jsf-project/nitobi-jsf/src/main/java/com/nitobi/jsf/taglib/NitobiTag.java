/**
 * User: Eric Buitenhuis 
 * Date: Jun 1, 2008
 * Time: 2:13:37 PM
 */

package com.nitobi.jsf.taglib;

import com.nitobi.jsf.component.AttributeAware;
import com.nitobi.type.NitobiAttribute;

import javax.el.ValueExpression;
import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * NitobiTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public abstract class NitobiTag extends UIComponentELTag {

    private static final Logger logger = Logger.getLogger(NitobiTag.class.getName());
    private static final String GET = "get";

    @Override
    protected void setProperties(UIComponent uiComponent) {

        super.setProperties(uiComponent);

        /*
         * Cast the component to utilize the AttributeAware interface.
         */
        AttributeAware aaComponent;
        try {
            aaComponent = (AttributeAware) uiComponent;
        } catch (ClassCastException e) {
            logger.severe("All classes extending NitobiTag must point to components that implement AttributeAware.");
            throw new FacesException("All classes extending NitobiTag must point to components that implement AttributeAware.");
        }

        /*
         * Get the Component based attributes
         */
        List<NitobiAttribute> nitobiAttributes = aaComponent.getComponentAttributes();
        if (nitobiAttributes != null) {
            for (NitobiAttribute nitobiAttribute : nitobiAttributes) {
                if (logger.isLoggable(Level.FINE)) {
                    logger.fine("Processing attribute '" + nitobiAttribute.jsfAttributeName() + "'");
                }
                /*
                 * Grab the JSF Variable name for the nitobiAttribute and generate a getter string.
                 */
                StringBuffer getterMethodStringBuffer = new StringBuffer(nitobiAttribute.jsfAttributeName());
                getterMethodStringBuffer.replace(0, 1, nitobiAttribute.jsfAttributeName().substring(0, 1).toUpperCase());
                getterMethodStringBuffer.insert(0, GET);

                if (logger.isLoggable(Level.FINEST)) {
                    logger.finest("Created the getMethodStringBuffer: " + getterMethodStringBuffer.toString());
                }

                /*
                 * Create the Method object for the getter string.
                 */
                Method method;
                try {
                    method = this.getClass().getMethod(getterMethodStringBuffer.toString());
                } catch (NoSuchMethodException e) {
                    logger.severe("Method '" + getterMethodStringBuffer.toString() + "' does not exist in this class.");
                    throw new FacesException("Method '" + getterMethodStringBuffer.toString() + "' does not exist in this class.");
                }

                /*
                 * Invoke the getter method.
                 */
                Object getterResultObject;
                try {
                    getterResultObject = method.invoke(this);
                } catch (IllegalAccessException e) {
                    logger.severe("Unable to access '" + getterMethodStringBuffer.toString() + "' in this class.");
                    throw new FacesException("Unable to access '" + getterMethodStringBuffer.toString() + "' in this class.");
                } catch (InvocationTargetException e) {
                    logger.severe("Could not invoke the method '" + getterMethodStringBuffer.toString());
                    throw new FacesException("Could not invoke the method '" + getterMethodStringBuffer.toString());
                }

                if (logger.isLoggable(Level.FINE)) {
                    if (getterResultObject == null) {
                        logger.fine("Method invokation result: null");
                    } else {
                        logger.fine("Method invokation result: " + getterResultObject.toString());
                    }
                }


                if (nitobiAttribute.isMethodExpression()) {
                   // TODO: make this create a setter object and set the component's methood expression member.
                } else {
                   /*
                    * Add the result the component's value expression collection
                    */
                    if (logger.isLoggable(Level.FINE)) {
                        logger.fine("Setting the attribute '" + nitobiAttribute.jsfAttributeName() + "' to null");
                    }
                    uiComponent.setValueExpression(nitobiAttribute.jsfAttributeName(), (ValueExpression) getterResultObject);
                }
            }
        }
    }
}
