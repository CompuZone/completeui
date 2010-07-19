/**
 * User: Eric Buitenhuis 
 * Date: Jun 1, 2008
 * Time: 10:48:42 AM
 */

package com.nitobi.jsf.component;

import com.nitobi.type.NitobiAttribute;

import java.util.List;

/**
 * For a class to implent this interface, it must provide a
 * getComponentAttributes() method returning an array of
 * NitobiAttribute objects.
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public interface AttributeAware {

    /**
     * Returns an array of NitobiAttribute objects that
     * will give the information needed to determine names, types,
     * and passthrough behavior.
     *
     * @return An array of NitobiAttribute objects.
     */
    public List<NitobiAttribute> getComponentAttributes();
}
