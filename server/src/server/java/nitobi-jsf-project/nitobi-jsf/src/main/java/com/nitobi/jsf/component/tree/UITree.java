/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 4:57:18 PM
 */

package com.nitobi.jsf.component.tree;

import javax.el.MethodExpression;
import javax.faces.component.UIComponentBase;

/**
 * UITree
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UITree extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UITree";
    public static final String DEFAULT_RENDERER_TYPE = "TreeRenderer";
    public static final String DEFAULT_FAMILY = "TreeFamily";

    /**
     * The {@link MethodExpression} that, when invoked, populates the tree. If this value is a method expression, it
     * will expect the user to have created a bean of the method signature 'void populateTree(javax.jsf.event.PhaseEvent)'. If
     * it is a plain string, the gethandler will be assumed to be a servlet existing outside JSF.
     */
    private MethodExpression gethandlerMethod = null;

    public MethodExpression getGethandlerMethod() {
        return gethandlerMethod;
    }

    public void setGethandlerMethod(MethodExpression gethandlerMethod) {
        this.gethandlerMethod = gethandlerMethod;
    }

    @Override
    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}