/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.component.grid;

import javax.el.MethodExpression;
import javax.faces.component.UIComponentBase;

/**
 *
 * @author eric
 */
public class UIColumns extends UIComponentBase {

    public static final String DEFAULT_RENDERER_TYPE = "ColumnsRenderer";
    public static final String COMPONENT_FAMILY = "ColumnsFamily";
    public static final String COMPONENT_TYPE = "UIColumns";

    private MethodExpression gethandler = null;
    private MethodExpression savehandler = null;

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

    public MethodExpression getGethandler() {
        return gethandler;
    }

    public void setGethandler(MethodExpression gethandler) {
        this.gethandler = gethandler;
    }

    public MethodExpression getSavehandler() {
        return savehandler;
    }

    public void setSavehandler(MethodExpression savehandler) {
        this.savehandler = savehandler;
    }
}
