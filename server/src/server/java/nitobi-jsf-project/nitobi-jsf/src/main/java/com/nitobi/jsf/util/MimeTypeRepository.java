/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.util;

import java.util.Map;
import java.util.TreeMap;

/**
 *
 * @author eric
 */
public class MimeTypeRepository {
    
    private static Map<String, String> types=null;
    private static MimeTypeRepository instance=null;
    
    private MimeTypeRepository() {
        types = new TreeMap<String, String>();
        
        /*
         * Text types
         */
        types.put("css", "text/css");
        types.put("html", "text/html");
        
        /*
         * Application types
         */
        types.put("js", "application/javascript");
        
        /*
         * Image types
         */
        types.put("gif", "image/gif");
        types.put("jpg", "image/jpeg");
        types.put("jpeg", "image/jpeg");
        types.put("png", "image/png");
        types.put("tiff", "image/tiff");
    }
    
    public static String getTypeForSuffix(String suffix) {
        if(instance == null) {
            instance = new MimeTypeRepository();
        } 
        return types.get(suffix);
    }
    
    public static String getCategoryForSuffix(String suffix) {
        if(instance == null) {
            instance = new MimeTypeRepository();
        }
        return types.get(suffix.substring(0, suffix.indexOf("/")));
    }
}
