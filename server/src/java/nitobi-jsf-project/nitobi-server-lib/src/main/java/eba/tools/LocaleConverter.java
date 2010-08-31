package eba.tools;

/**
 * The Default ASCII implementation of the ILocaleConverter
 * @deprecated Use com.nitobi.server.tools.LocalConverter
 */
public class LocaleConverter implements ILocaleConverter
{

    /**
     * Returns a copy of the string in unicode
     *
     * @param bytesToEncode The byte array to be encoded.  The length of the array must be exact.
     *                      The array should not have a terminal padding of zeros. 
     * @return The characters of the bytes in a unicode string
     */
    public String createUnicodeString(byte [] bytesToEncode) throws java.io.UnsupportedEncodingException
    {
        return new String(bytesToEncode);
    }


    /**
     * returns A Unicode string with the value of the request objects parameter
     *
     * @param name       Parameter in the requests query string
     * @param request    A javax.servlet.ServletRequest object containing the query string of interest
     * @return The string value of the named parameter in Unicode
     */
    public String getUnicodeRequestParameter(javax.servlet.ServletRequest request,
                                             String name)
    throws java.io.UnsupportedEncodingException
    {
        return createUnicodeString(request.getParameter(name).getBytes("8859_1"));
    }
}



