/**
 * User: Eric Buitenhuis 
 * Date: Apr 29, 2008
 * Time: 5:51:46 PM
 */

package com.nitobi.jsf.taglib.tree;

import com.nitobi.jsf.component.tree.UIChildren;

import javax.faces.webapp.UIComponentELTag;

/**
 * ChildrenTag
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class ChildrenTag extends UIComponentELTag {

    public String getComponentType() {
        return UIChildren.DEFAULT_COMPONENT_TYPE;
    }

    public String getRendererType() {
        return UIChildren.DEFAULT_RENDERER_TYPE;
    }
}
