/**
 * User: Eric Buitenhuis 
 * Date: May 31, 2008
 * Time: 8:06:18 AM
 */

package com.nitobi.jsf.renderer.tabstrip;

import com.nitobi.jsf.NitobiIncludes;
import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 * TabstripRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TabstripRenderer extends NitobiRenderer {

    private static final String TAGNAME = "ntb:tabstrip";

    protected String[] getRequiredScripts() {
        return new String[]{NitobiIncludes.TABSTRIP};
    }

    protected String[] getRequiredStyles() {
        return new String[]{NitobiIncludes.TABSTRIP_STYLE};
    }

    protected boolean needsXmlNamespaceDecl() {
        return true;
    }

    protected String getTagName() {
        return TAGNAME;
    }

    protected boolean printId() {
        return true;
    }
}
