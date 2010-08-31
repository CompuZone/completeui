/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 9:20:27 AM
 */

package com.nitobi.jsf.taglib.tabstrip;

import com.nitobi.jsf.component.tabstrip.UITabs;
import com.nitobi.jsf.taglib.NitobiTag;

import javax.el.ValueExpression;
import javax.servlet.jsp.JspException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * TabsTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TabsTag extends NitobiTag {

    //Log instance for this class
    private static final Logger logger = Logger.getLogger(TabsTag.class.getName());

    private ValueExpression height = null;
    private ValueExpression align = null;
    private ValueExpression overlap = null;
    private ValueExpression activateEffect = null;
    private ValueExpression activeTabIndex = null;
    private ValueExpression onClick = null;
    private ValueExpression onMouseOut = null;
    private ValueExpression onMouseOver = null;
    private ValueExpression onBeforeTabChange = null;
    private ValueExpression onTabChange = null;

    @Override
    public void release() {
        super.release();
        setHeight(null);
        setAlign(null);
        setOverlap(null);
        setActivateEffect(null);
        setActiveTabIndex(null);
        setOnClick(null);
        setOnMouseOut(null);
        setOnMouseOver(null);
        setOnBeforeTabChange(null);
        setOnTabChange(null);
    }
    
    public String getComponentType() {
        return UITabs.COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UITabs.DEFAULT_RENDERER_TYPE;
    }

    @Override
    public int doStartTag() throws JspException {
        try {
            return super.doStartTag();
        } catch (JspException e) {
            if (logger.isLoggable(Level.WARNING)) {
                logger.log(Level.WARNING, getDebugString(), e);
            }
            throw e;
        } catch (Throwable t) {
            if (logger.isLoggable(Level.WARNING)) {
                logger.log(Level.WARNING, getDebugString(), t);
            }
            throw new JspException(t);
        }
    }

    @Override
    public int doEndTag() throws JspException {
        try {
            return super.doEndTag();
        } catch (JspException e) {
            if (logger.isLoggable(Level.WARNING)) {
                logger.log(Level.WARNING, getDebugString(), e);
            }
            throw e;
        } catch (Throwable t) {
            if (logger.isLoggable(Level.WARNING)) {
                logger.log(Level.WARNING, getDebugString(), t);
            }
            throw new JspException(t);
        }
    }

    public String getDebugString() {
        return "id: " + this.getId() + " class: " +
            this.getClass().getName();
    }

    //------------------------------------------------------------------------------------ Setter Methods

    public ValueExpression getActivateEffect() {
        return activateEffect;
    }

    public void setActivateEffect(ValueExpression activateEffect) {
        this.activateEffect = activateEffect;
    }

    public ValueExpression getActiveTabIndex() {
        return activeTabIndex;
    }

    public void setActiveTabIndex(ValueExpression activeTabIndex) {
        this.activeTabIndex = activeTabIndex;
    }

    public ValueExpression getAlign() {
        return align;
    }

    public void setAlign(ValueExpression align) {
        this.align = align;
    }

    public ValueExpression getOnBeforeTabChange() {
        return onBeforeTabChange;
    }

    public void setOnBeforeTabChange(ValueExpression onBeforeTabChange) {
        this.onBeforeTabChange = onBeforeTabChange;
    }

    public ValueExpression getOnClick() {
        return onClick;
    }

    public void setOnClick(ValueExpression onClick) {
        this.onClick = onClick;
    }

    public ValueExpression getOnMouseOut() {
        return onMouseOut;
    }

    public void setOnMouseOut(ValueExpression onMouseOut) {
        this.onMouseOut = onMouseOut;
    }

    public ValueExpression getOnMouseOver() {
        return onMouseOver;
    }

    public void setOnMouseOver(ValueExpression onMouseOver) {
        this.onMouseOver = onMouseOver;
    }

    public ValueExpression getOnTabChange() {
        return onTabChange;
    }

    public void setOnTabChange(ValueExpression onTabChange) {
        this.onTabChange = onTabChange;
    }

    public ValueExpression getOverlap() {
        return overlap;
    }

    public void setOverlap(ValueExpression overlap) {
        this.overlap = overlap;
    }

    public ValueExpression getHeight() {
        return height;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }
}
