package com.nitobi.resources.context;

import com.nitobi.resources.CachedResource;
import com.nitobi.resources.Resource;
import com.nitobi.resources.ResourceNotFoundException;
import com.nitobi.resources.TimeBasedCachedResource;

import java.util.*;

/**
 * User: eric
 * Date: Nov 27, 2008
 * Time: 12:28:17 AM
 */
public class TreeMapResourceContext implements ResourceContext {

    private static int MAX_SIZE = 10240; // 10 MB

    private static int CURRENT_SIZE;

    private static Map<String, Resource> resourceCache = Collections.synchronizedMap(new TreeMap<String, Resource>());

    private static Set<CachedResource> registry = Collections.synchronizedSortedSet(new TreeSet<CachedResource>());

    /**
     * Loads a resource into the context, getting it ready for processing.
     *
     * @param path The path to the resource
     * @throws com.nitobi.resources.ResourceNotFoundException
     *          Thrown if the resource could not be acquired.
     */
    public void prepareResource(String path) throws ResourceNotFoundException {

        Resource resource = null;

        /*
         * Check the cache to see if it's already there
         */
        resource = resourceCache.get(path);

        /*
         * If it wasn't there, go to the jar
         */
        if (resource == null) {
            // TODO: grab from the jar.
            // TODO: get the mime type
            // TODO: construct the resource.
            addResource(path, resource);
        }
    }

    /**
     * Grabs the requested resource
     *
     * @param path The URI of the desired resource
     * @return A fully populated Resource
     * @throws ResourceNotFoundException If for some reason the resource is not available.
     */
    public Resource getResource(String path) throws ResourceNotFoundException {
        if (!resourceCache.containsKey(path)) {
            throw new ResourceNotFoundException();
        }

        Resource resource = resourceCache.get(path);

        /*
         * If the resource doesn't have its content populated, do so.
         */
        if (!resource.hasContent()) {
            // TODO: repopulate the resource's content
        }

        return resourceCache.get(path);
    }

    /**
     * @param path dfa
     * @return adsf
     * @deprecated
     */
    public boolean contains(String path) {
        return resourceCache.containsKey(path);
    }

    /**
     * Add resource to the cache and increment the CURRENT_SIZE. If the CURRENT_SIZE > MAX_SIZE,
     * run the purgeOldResources
     *
     * @param path
     * @param resource
     */
    private void addResource(String path, Resource resource) {

        /*
         * Add the resource to the cache
         */
        resourceCache.put(path, resource);

        /*
         * Register it
         */
        registry.add(new TimeBasedCachedResource(path));

        /*
         * increment the size
         */
        CURRENT_SIZE = CURRENT_SIZE + resource.getContentSize();

        /*
         * if the size gets to big, purge out old resources.
         */
        if (CURRENT_SIZE > MAX_SIZE) {
            purgeOldResources();
        }

    }

    private void purgeOldResources() {

        int runningSizeTotal = 0;
        int purgeAmount = 3000;

        for (CachedResource aRegistry : registry) {
            if (purgeAmount > runningSizeTotal) {

                Resource r = resourceCache.get(aRegistry.getName());
                runningSizeTotal += r.getContentSize();
                r.clearContent();

            }
        }

    }
}
