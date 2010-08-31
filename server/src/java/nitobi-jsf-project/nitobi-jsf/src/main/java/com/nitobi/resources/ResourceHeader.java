package com.nitobi.resources;

import java.util.Date;

/**
 * An interface for the methods required to access and change the header information for a given
 * resource. The header information is included in a ResourceHeader implementation with the intent of
 * separating the resource content from the header information. This will allow simpler caching
 * for requests and the ability to discard the content while retaining the header information for
 * a resource that is not used enough to justfiy the space.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com>Eric Buitenhuis</a>
 * @version 1.0
 */
public interface ResourceHeader {

    /**
     * Grabs the etag for this resource.
     *
     * @return A string representing an etag.
     */
    public String getETag();

    /**
     * Sets the etag for this resource. The caller is responsible for determining
     * this value, as the strategy should not be coupled with a ResourceHeader object.
     *
     * @param eTag The String to represent the content as an etag.
     */
    public void setETag(String eTag);

    /**
     * Grabs the last modified date of the resource.
     *
     * @return The Date of the last modification
     */
    public Date getModifiedDate();

    /**
     * Sets the last modified date for this resource. The caller is responsible
     * for determining the value of this date.
     *
     * @param modifiedDate A java.lang.Date object representing the date.
     */
    public void setModifiedDate(Date modifiedDate);

    /**
     * Grabs the MimeType of the content.
     *
     * @return A java.lang.String value representing the type of content.
     */
    public String getMimeType();

    /**
     * Sets the Mime Type of the content.
     *
     * @param mimeType A java.lang.String value representing the type of content.
     */
    public void setMimeType(String mimeType);

}
