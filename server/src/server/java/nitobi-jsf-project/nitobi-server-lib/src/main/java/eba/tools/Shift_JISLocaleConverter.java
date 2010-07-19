package eba.tools;

/**
 * Shift_JIS implementation of the ILocaleConverter
 * @deprecated Use com.nitobi.server.tools.Shift_JISLocaleConverter
 */
public class Shift_JISLocaleConverter 
extends LocaleConverter 
implements ILocaleConverter
{
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



