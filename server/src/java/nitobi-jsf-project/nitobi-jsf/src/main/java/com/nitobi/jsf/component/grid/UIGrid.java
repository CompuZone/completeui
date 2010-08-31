package com.nitobi.jsf.component.grid;

import javax.el.MethodExpression;
import javax.faces.component.UIComponentBase;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class UIGrid extends UIComponentBase {
    private static final transient Logger logger = Logger.getLogger(UIGrid.class.getName());

    private MethodExpression gethandler = null;
    private MethodExpression savehandler = null;

    public static final String GRID_LISTENER_PARAM = "gridlistener";
    public static final String DEFAULT_RENDERER_TYPE = "GridRenderer";
    public static final String COMPONENT_FAMILY = "GridFamily";
    public static final String COMPONENT_TYPE = "UIGrid"; // Used by tag handler

    public UIGrid() {
        logger.finest("UIGrid constructor called");
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

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

}
