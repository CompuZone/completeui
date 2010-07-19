/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 6:06:36 PM
 */

package com.nitobi.jsf.component.tree;

import javax.el.MethodExpression;
import javax.faces.component.UIComponentBase;

/**
 * UINode
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class UINode extends UIComponentBase {

    public static final String DEFAULT_COMPONENT_TYPE = "UINode";
    public static final String DEFAULT_RENDERER_TYPE = "NodeRenderer";
    public static final String DEFAULT_FAMILY = "NodeFamily";

    private MethodExpression gethandler = null;

    public MethodExpression getGethandler() {
        return gethandler;
    }

    public void setGethandler(MethodExpression gethandler) {
        this.gethandler = gethandler;
    }

    public String getFamily() {
        return DEFAULT_FAMILY;
    }
}
