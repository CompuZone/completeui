package com.nitobi.resources;

import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

/**
 * This implementation is designed to facilitate HttpResponse cases. It
 * instantiates HttpResourceHeader as its header member variable.
 *
 * @author <a href="mailto:eric@giglinesoftware.com">Eric Buitenhuis</a>
 * @version 1.0
 * @see com.nitobi.resources.Resource
 * @see HttpResourceHeader
 */
public class HttpResource implements Resource {

    /**
     * The actual content of the resource. This may or may not be populated, but
     * its state must be correctly represented by the contentCleared boolean.
     */
    private byte[] content;

    /**
     * The ResourceHeader that will hold onto the header information.
     */
    private ResourceHeader header;

    /**
     * Whether or not the content has been cleared.
     */
    private boolean contentCleared;

    /**
     * The Date stamp of when this Resource was last accessed.
     */
    private Date latestAccess;

    /**
     * A constructor that takes only an array of bytes and the mimeType. It will
     * generate a new ResourceHeader object based on what is passed.
     *
     * @param mimeType        The mime type representing what kind of data is
     *                        contained by the content
     *                        assumes the header information matches the content.
     * @param resourceContent The content of the resource.
     */
    public HttpResource(String mimeType, byte[] resourceContent) {
        /*
         * The content must be set first.
         */
        this.content = resourceContent;

        /*
         * Set the ResourceHeader
         */
        this.header = new HttpResourceHeader();
        this.header.setMimeType(mimeType);
        this.header.setModifiedDate(new Date());

        /*
         * generate the eTag representing the 
         */
        this.generateEtag();

        /*
         * be sure to show that there is content.
         */
        contentCleared = false;
    }

    /**
     * This constructor will take the input stream and the mimetype and will
     * generate a new ResourceHeader object and the content that goes with it.
     *
     * @param mimeType The mime type of the resource
     * @param is       The input stream containing the resource
     * @throws IOException Thrown when the resource could not be accessed
     *                     by the IO
     */
    public HttpResource(String mimeType, InputStream is) throws IOException {
        /*
         * Instantiate the content with the proper size and populate it
         * from the stream.
         */
        this.content = new byte[is.available()];

        //noinspection ResultOfMethodCallIgnored
        is.read(this.content);

        /*
         * Set the ResourceHeader
         */
        this.header = new HttpResourceHeader();
        this.header.setMimeType(mimeType);
        this.header.setModifiedDate(new Date());

        /*
         * generate the eTag representing the
         */
        this.generateEtag();

        /*
         * be sure to show that there is content.
         */
        contentCleared = false;
    }

    /**
     * Grabs the raw bytes for a given resource. This method also updates
     * the Date hack latestAccess.
     *
     * @return A byte array holding the resource.
     */
    public byte[] getContent() throws ContentNotLoadedException {
        if (contentCleared) {
            throw new ContentNotLoadedException();
        }

        /*
         * Update the latestAccess Date
         */
        this.latestAccess = new Date();

        return content;
    }

    /**
     * Calculates the current size of the resource. This value
     * is -1 if the content has been cleared by cache management.
     *
     * @return An int value representing the content size. -1 represents
     *         an emptied content that needs to be reset before getContent() can be
     *         called.
     */
    public int getContentSize() {
        int size;
        if (contentCleared) {
            size = -1;
        } else {
            size = content.length;
        }
        return size;
    }

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
    public void clearContent() {
        this.content = null;
        this.contentCleared = true;
    }

    /**
     * Allows the handler to populate a resource with updated content. The date
     * passed must represent when the content's state was generated. That is to say,
     * the date ought not be set to the time when this method was called. If there
     * has been no change in date and this method is being called just to re-populate
     * the previous content, passing null for the modifiedDate would cause the content
     * to replenish without modifying the date.
     * <p/>
     * This implementation sets the eTag as the MD5 digest of the content.
     *
     * @param content      The content of the resource.
     * @param modifiedDate The last modified date. If this value is passed as null,
     *                     the previous date held in the ResourceHeader will remain the same.
     */
    public void setContent(byte[] content, Date modifiedDate) {
        this.content = content;
        this.contentCleared = false;

        if (modifiedDate != null) {
            this.header.setModifiedDate(modifiedDate);
            this.generateEtag();
        }
    }

    /**
     * The ResourceHeader object contains the information
     * about the content in terms an HTTP Response would understand.
     *
     * @return A ResourceHeader object representing the content.
     */
    public ResourceHeader getHeader() {
        return this.header;
    }

    /**
     * A convenience method that generates the class's etag for the content based
     * on an MD5 hash.
     */
    private void generateEtag() {
        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("The digest type MD5 could not be created. " + e.getMessage());
        }
        messageDigest.update(this.content);
        this.header.setETag(new String(messageDigest.digest()));
    }

    /**
     * Check to see if this resource has had its content purged.
     *
     * @return True if the content exists.
     */
    public boolean hasContent() {
        return !this.contentCleared;
    }

    /**
     * Find out when the latest Date when this resource was accessed. This helps
     * determine whether or not this is a frequently accessed file.
     *
     * @return A Date object for when this was last accessed.
     */
    public Date getLatestAccess() {
        return this.latestAccess;
    }
}
