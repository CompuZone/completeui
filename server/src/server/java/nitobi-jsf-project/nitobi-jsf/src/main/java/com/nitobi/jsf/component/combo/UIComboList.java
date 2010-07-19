/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.component.combo;

import javax.el.MethodExpression;
import javax.faces.component.UIComponentBase;
import javax.faces.context.FacesContext;
import java.util.logging.Logger;

/**
 * @author eric
 */
public class UIComboList extends UIComponentBase {

    private static final transient Logger logger = Logger.getLogger(UIComboList.class.getName());

    private MethodExpression datasourceUrl = null;

    public static final String DEFAULT_RENDERER_TYPE = "ComboListRenderer";
    public static final String LOCAL_COMPONENT_FAMILY = "ComboListFamily";
    public static final String LOCAL_COMPONENT_TYPE = "UIComboList";

    public static final String COMBO_ID_PARAM = "ComboId";
    public static final String LAST_STRING_PARAM = "LastString";
    public static final String PAGE_SIZE_PARAM = "PageSize";
    public static final String SEARCH_SUBSTRING_PARAM = "SearchSubstring";
    public static final String STARTING_RECORD_INDEX = "StartingRecordIndex";

    @Override
    public String getFamily() {
        return LOCAL_COMPONENT_FAMILY;
    }

    public MethodExpression getDatasourceUrl() {
        return datasourceUrl;
    }

    public void setDatasourceUrl(MethodExpression datasourceUrl) {
        this.datasourceUrl = datasourceUrl;
    }

    @Override
    public Object saveState(FacesContext context) {
        Object values[] = new Object[2];
        values[0] = super.saveState(context);
        values[1] = datasourceUrl;
        return ((values));
    }

    @Override
    public void restoreState(FacesContext context, Object state) {
        Object values[] = (Object[]) state;
        super.restoreState(context, values[0]);
        datasourceUrl = (MethodExpression) values[1];
    }
}