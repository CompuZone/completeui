/**
 * User: eric
 * Date: Nov 27, 2008
 * Time: 12:47:53 PM
 */

package com.nitobi.resources;

/**
 * @author Eric Buitenhuis
 */
public interface CachedResource extends Comparable {

    public Long getContentCreatedTime();

    public String getName();
}
