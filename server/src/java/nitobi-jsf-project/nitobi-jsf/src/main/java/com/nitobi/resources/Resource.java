package com.nitobi.resources;

import java.util.Date;

/**
 * Represents a single Resource's methods for simple caching. What makes this
 * object unique from other Resource classes is its ability clear itself of content
 * while retaining header data. This will come in handy for responses to a requestor
 * that doesn't require the content as long as nothing has changed.
 * <p/>
 * For example, an image resource that is rarely used can be registered with the
 * cache without having to take up the space with actual content. That way, if the
 * user agent requesting the resource still has it, the server handler can simply
 * return a 304 type without having to store it or load it from the jar.
 * <p/>
 * Once the resource is initialized the first time, the implementation must make
 * sure the actual existence of the resource can be verified.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com>Eric Buitenhuis</a>
 * @version 1.0
 */
public interface Resource {

    /**
     * Grabs the raw bytes for a given resource.
     *
     * @return A byte array holding the resource.
     * @throws ContentNotLoadedException thrown when the resource has
     *                                   cleared its content.
     */
    public byte[] getContent() throws ContentNotLoadedException;

    /**
     * The ResourceHeader object contains the information
     * about the content in terms an HTTP Response would understand.
     *
     * @return A ResourceHeader object representing the content.
     */
    public ResourceHeader getHeader();

    /**
     * Calculates the current size of the resource. This value
     * is -1 if the content has been cleared by cache management.
     *
     * @return An int value representing the content size. -1 represents
     *         an emptied content that needs to be reset before getContent() can be
     *         called.
     */
    public int getContentSize();

    /**
     * Provides the ability to clear the Resources content without having to
     * remove the header information. This will allow the app to generate non-200
     * responses without necessarily having the content of the resource
     * in cache.
     * <p/>
     * For example, if a certain image is loaded very infrequently, it
     * doesn't make sense to waste the memory holding onto the actual item, but
     * if the client (user agent) has its own copy and passes a conditional
     * request, the server can send a 304 message without having to do the
     * work of accessing and analyzing the resource.
     */
    public void clearContent();

    /**
     * Allows the handler to populate a resource with updated content. The date
     * passed must represent when the content's state was generated. That is to say,
     * the date ought not be set to the time when this method was called. If there
     * has been no change in date and this method is being called just to re-populate
     * the previous content, passing null for the modifiedDate would cause the content
     * to replenish without modifying the date.
     *
     * @param content      The content of the resource.
     * @param modifiedDate The last modified date. If this value is passed as null,
     *                     the previous date held in the ResourceHeader will remain the same.
     */
    public void setContent(byte[] content, Date modifiedDate);

    /**
     * Check to see if this resource has had its content purged.
     *
     * @return True if the content exists.
     */
    public boolean hasContent();

    /**
     * Find out when the latest Date when this resource was accessed. This helps
     * determine whether or not this is a frequently accessed file.
     *
     * @return A Date object for when this was last accessed.
     */
    public Date getLatestAccess();
}
