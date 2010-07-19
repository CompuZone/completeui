package com.nitobi.jsf;

import javax.faces.context.FacesContext;
import java.util.HashSet;
import java.util.Set;

/**
 * This class is meant to be a request-scoped managed bean that does two things:<br/>
 * <ol>
 * <li>Registers included resources on a per-request basis to guarantee, for example, that two separate
 * components on one page don't both include the nitobi.toolkit.js file.</li>
 * <li>Acts as the central authority for Javascript and CSS dependency locations.</li>
 * </ol>
 * <br/>
 * The dependency strings are formatted to start at the context root 
 *
 * @author Eric Buitenhuis
 * @since 2008q3
 * @version 1.0
 */
public class NitobiIncludes {

    /**
     * The primary holder for the includes.
     */
    private Set<String> loadedIncludes = null;

    /**
     * This is the trigger that will be included in the URI
     */
    public static final String URI_TRIGGER = "javascript_css";

    /**
     * Gives the context root for the current application. For example, in the URL http://localhost:8080/MyWebApp/index.faces,
     * the context root would be 'MyWebApp'.
     */
    private static final String contextPath = FacesContext.getCurrentInstance().getExternalContext().getRequestContextPath();

    /**
     * String to be prepended to every dependency string
     */
    private static final String prefix = contextPath + "/faces/" + URI_TRIGGER;

    /*
     * Scripts
     */
    public static final String CALENDAR = prefix + "/script/nitobi.calendar.js";
    public static final String CALLOUT = prefix + "/script/nitobi.callout.js";
    public static final String COMBO = prefix + "/script/nitobi.combo.js";
    public static final String FISHEYE = prefix + "/script/nitobi.fisheye.js";
    public static final String GRID = prefix + "/script/nitobi.grid.js";
    public static final String SPOTLIGHT = prefix + "/script/nitobi.spotlight.js";
    public static final String TABSTRIP = prefix + "/script/nitobi.tabstrip.js";
    public static final String TOOLKIT = prefix + "/script/nitobi.toolkit.js";
    public static final String TREE = prefix + "/script/nitobi.tree.js";
    public static final String TREEGRID = prefix + "/script/nitobi.treegrid.js";

    /*
     * Styles
     */
    public static final String CALENDAR_STYLE = prefix + "/style/nitobi.calendar.css";
    public static final String CALLOUT_STYLE = prefix + "/style/nitobi.callout.css";
    public static final String COMBO_STYLE = prefix + "/style/nitobi.combo.css";
    public static final String FISHEYE_STYLE = prefix + "/style/nitobi.fisheye.css";
    public static final String GRID_STYLE = prefix + "/style/nitobi.grid.css";
    public static final String SPOTLIGHT_STYLE = prefix + "/style/nitobi.spotlight.css";
    public static final String TABSTRIP_STYLE = prefix + "/style/nitobi.tabstrip.css";
    public static final String TREE_STYLE = prefix + "/style/nitobi.tree.css";
    public static final String TREEGRID_STYLE = prefix +"/style/nitobi.treegrid.css";



    public NitobiIncludes() {
        if(loadedIncludes == null) {
            loadedIncludes = new HashSet<String>();
        }
    }

    /**
     * Register a given include after you have sent it to
     * the response.
     *
     * @param name The name by which you will remember the include
     * @return true if the name registers, false if it's already there
     */
    public Boolean registerInclude(String name) {
        return loadedIncludes.add(name);
    }
}
