/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIColumns;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class ColumnsTag extends UIComponentELTag {

    private static Logger logger = Logger.getLogger(ColumnsTag.class.getName());

    private MethodExpression getHandler = null;
    private MethodExpression saveHandler = null;
    private ValueExpression headerEnabled = null;

    public static final String GETHANDLER = "getHandler";
    public static final String SAVEHANDLER = "saveHandler";
    public static final String HEADERENABLED = "headerEnabled";

    @Override
    public String getComponentType() {
        return UIColumns.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return UIColumns.DEFAULT_RENDERER_TYPE;
    }

    @Override
    protected void setProperties(UIComponent uiComponent) {
        super.setProperties(uiComponent);

        UIColumns columns;
        try {
            columns = (UIColumns)uiComponent;
        } catch(ClassCastException e) {
            logger.severe("Could not cast from " + uiComponent.getClass().getName() + " to com.nitobi.jsf.taglib.grid.UIColumns") ;
            throw new IllegalStateException("Could not cast from " + uiComponent.getClass().getName() + " to com.nitobi.jsf.taglib.grid.UIColumns");
        }

        if(getHandler != null) {
            columns.setGethandler(getHandler);
        }

        if(saveHandler != null) {
            columns.setSavehandler(saveHandler);
        }

        uiComponent.setValueExpression(HEADERENABLED, headerEnabled);
    }

    @Override
    public void release() {
        super.release();
        setGetHandler(null);
        setSaveHandler(null);
        setHeaderEnabled(null);
    }

    public void setGetHandler(MethodExpression getHandler) {
        this.getHandler = getHandler;
    }

    public void setHeaderEnabled(ValueExpression headerEnabled) {
        this.headerEnabled = headerEnabled;
    }

    public void setSaveHandler(MethodExpression saveHandler) {
        this.saveHandler = saveHandler;
    }
}
