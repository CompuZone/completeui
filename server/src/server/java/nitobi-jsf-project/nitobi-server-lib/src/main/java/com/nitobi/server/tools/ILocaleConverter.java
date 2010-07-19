package com.nitobi.server.tools;

/**
 * This interface allows the creation of Nitobi Compressed XML to be extended to handle 
 * internationalize and localize concerns.
 * @author Nitobi
 * @version 1.0
 */
public interface ILocaleConverter {

    /**
     * Returns a copy of the string in unicode 
     *
     * @param bytesToEncode The bytes to be encoded
     * @return The Unicode String for the character natively encoded in the bytesToEncode array
     */
    public String createUnicodeString(byte[] bytesToEncode)
    	throws java.io.UnsupportedEncodingException;
    
    /**
     * Returns a Unicode string with the value of the request objects parameter
     *
     * @param name     The name for the name value pair in the request
     * @param request  A javax.servlet.ServletRequest object that contains the name-value pairs
     * @return The string value of the named parameter in unicode
     */
    public String getUnicodeRequestParameter(javax.servlet.ServletRequest request, String name) 
    	throws java.io.UnsupportedEncodingException;
}
