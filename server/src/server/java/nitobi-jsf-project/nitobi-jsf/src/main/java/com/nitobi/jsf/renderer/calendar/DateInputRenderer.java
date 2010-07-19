/**
 * User: Eric Buitenhuis 
 * Date: Jun 23, 2008
 * Time: 12:24:54 AM
 */

package com.nitobi.jsf.renderer.calendar;

import com.nitobi.jsf.component.calendar.UIDateInput;
import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 * DateInputRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class DateInputRenderer extends NitobiRenderer {

    

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return UIDateInput.NITOBI_TAGNAME;
    }
}
