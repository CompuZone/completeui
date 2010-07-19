package com.nitobi.resources.context;

import com.nitobi.resources.Resource;
import com.nitobi.resources.ResourceNotFoundException;

/**
 * An interface for he context in which the Nitobi resources will be managed. The
 * implementation may or may not utilize caching.
 *
 * @author <a href="mailto:eric.buitenhuis@giglinesoftware.com">Eric Buitenhuis</a>
 * @version 1.0
 */
public interface ResourceContext {

    /**
     * Loads a resource into the context, getting it ready for processing.
     *
     * @param path The path to the resource
     * @throws ResourceNotFoundException Thrown if the resource could not be acquired.
     */
    public void prepareResource(String path) throws ResourceNotFoundException;

    /**
     * Grabs the requested resource
     *
     * @param path The URI of the desired resource
     * @return A fully populated Resource
     * @throws ResourceNotFoundException If for some reason the resource is not available.
     */
    public Resource getResource(String path) throws ResourceNotFoundException;

}
