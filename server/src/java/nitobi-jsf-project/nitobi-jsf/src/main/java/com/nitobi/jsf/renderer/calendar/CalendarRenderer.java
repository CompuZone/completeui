/**
 * User: Eric Buitenhuis 
 * Date: Jun 23, 2008
 * Time: 2:06:59 AM
 */

package com.nitobi.jsf.renderer.calendar;

import com.nitobi.jsf.component.calendar.UICalendar;
import com.nitobi.jsf.renderer.NitobiRenderer;

/**
 * CalendarRenderer
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class CalendarRenderer extends NitobiRenderer {

    /**
     * Get the output tag name for the component
     *
     * @return A String object representing the outputed tag
     */
    protected String getTagName() {
        return UICalendar.NITOBI_TAGNAME;
    }
}
