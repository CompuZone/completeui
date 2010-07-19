package com.nitobi.server.tools;

import javax.servlet.ServletRequest;
import java.io.UnsupportedEncodingException;

/**
 * Shift_JIS implementation of the ILocaleConverter
 */
public class Shift_JISLocaleConverter extends LocaleConverter implements ILocaleConverter
{
	/**
	 * Returns a Unicode string with the value of the request objects parameter
	 * @param name       Parameter in the requests query string
     * @param request    A javax.servlet.ServletRequest object containing the query string of interest
     * @return The string value of the named parameter in Unicode
	 */
	public String getUnicodeRequestParameter(ServletRequest request, String name) throws UnsupportedEncodingException
	{
		return createUnicodeString(request.getParameter(name).getBytes("Shift_JIS"));
	}
	
    /**
     * Returns a copy of the string in UTF8.
     * 
     * @param  sjis_bytes The byte to be encoded
     * @return the Unicode string
     */
    public String createUnicodeString(byte [] sjis_bytes) 
    	throws java.io.UnsupportedEncodingException
    {
        return new String(sjis_bytes,"Shift_JIS");	
    }
}
