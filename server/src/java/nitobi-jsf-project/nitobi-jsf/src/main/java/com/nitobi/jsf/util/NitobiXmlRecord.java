package com.nitobi.jsf.util;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Logger;

/**
 * NitobiXmlRecord
 *
 * Mar 22, 2008
 * @author Eric Buitenhuis <eric@giglinesoftware.com>
 */
public class NitobiXmlRecord {

    /*
     * Aggregate of the incoming attribute values.
     */
    private Map<String,String> attributes;
    
    /*
     * Index of the most recent non-xid attribute
     */
    private int nextColumnIndex = 0;

    /**
     * Constructs an empty NitobiXMLRecord
     */
    public NitobiXmlRecord() {
        attributes = new LinkedHashMap<String, String>();
    }
    
    private static Logger logger = Logger.getLogger(NitobiXmlRecord.class.getCanonicalName());
    
    /**
     * Constructs an NitobiXmlRecord from a JSON string object. Note that the string
     * must be a simple JSON object in the format <code>{ key:'value', ... }</code>. 
     * This constructor populates only the xid and values for the class. Anything
     * else must be done manually.
     * 
     * @example
     * <code>{xi:'97382', a:'http://google.com', b:'tamfarley@halifax.com', c:'2007/12/12 11:37:09'}</code>
     * 
     * @author Eric Buitenhuis
     * @param json
     */
    public NitobiXmlRecord(String json) {
        
        attributes = new LinkedHashMap<String, String>();

        logger.finest("Parsing JSON string: " + json);
        
        char[] jsonChars = json.toCharArray();
        int jsonSize = jsonChars.length;

        /*
         * keyBuffer and valueBuffer are temporary, mutable buffers to which 
         * we can append characters as we iterate through each character of
         * the json string.
         */
        StringBuffer keyBuffer = new StringBuffer();
        StringBuffer valueBuffer = new StringBuffer();

        /*
         * A flag to indicate if the state is within a JSON object.
         */
        boolean inJsonObject = false;

        /*
         * A flag to determine the state of either being in the single-quoted
         * area or not.
         */
        boolean inValueString = false;

        /*
         * Iterate through the entire string and populate the member variables
         */
        for (int i = 0; i < jsonSize; i++) {
            char currentChar = jsonChars[i];
            switch (currentChar) {
                case '{':
                    /*
                     * '{' denotes beginning of json object.
                     */
                    inJsonObject = true;
                    break;
                case '}':
                    /*
                     * '}' denotes end of json object. If this character is
                     * not found inside a value string, the object is done parsing.
                     * Write the vector of values to the member variable.
                     */
                    if (!inValueString) {
                        inJsonObject = false;
                    }
                    break;
                case ':':
                    /*
                     * If the colon is a part of the actual value, include it.
                     */
                    if(inJsonObject) {
                        if(inValueString) {
                            valueBuffer.append(jsonChars[i]);
                        }
                    }
//                    if (inJsonObject) {
//                        /*
//                         * If the colon is a separator for the key:value pair, 
//                         * evaluate the current keyBuffer and assign the member xkey.
//                         * Otherwise the colon is in the single-quote area, so 
//                         * just add it to the valueBuffer.
//                         */
//                        if (!inValueString) {
//                            String key = keyBuffer.toString().trim();
//                            if (key.equalsIgnoreCase("xi")) {
//                                inXid = true;
//                                keyBuffer = new StringBuffer();
//                            } else {
//                                inXid = false;
//                            }
//                        }
//                    }
                    break;
                case ',':
                    if (inJsonObject) {
                        /*
                         * If the comma is part of the value string, add it to the 
                         * valueBuffer. 
                         */
                        if (inValueString) {
                            valueBuffer.append(jsonChars[i]);
                        }
                    }
                    break;
                case '\'':
                    if (inJsonObject) {
                        if (inValueString) {
                            /*
                             * This is the end of the value. If this is the end of
                             * the Xid, set the member value. Otherwise add it to
                             * the vector of values. Clear the buffer for the next
                             * set of values.
                             */
//                            if (inXid) {
//                                attributes.put("xi", valueBuffer.toString().trim());
//                                inXid = false;
//                            } else {
//                                attributes.put(getNextColumn(),valueBuffer.toString().trim());
//                            }
                            attributes.put(keyBuffer.toString().trim(), valueBuffer.toString().trim());
                            keyBuffer = new StringBuffer();
                            valueBuffer = new StringBuffer();
                            inValueString = false;
                        } else {
                            /*
                             * This is the beginning of the value.
                             */
                            inValueString = true;
                        }
                    }
                    break;
                default:
                    if (inJsonObject) {
                        /*
                         * Add the character to the appropriate buffer.
                         */
                        if (inValueString) {
                            valueBuffer.append(currentChar);
                        } else {
                            keyBuffer.append(currentChar);
                        }
                    }
            } // end switch

        } // end for

    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    /**
     * Converts a number to its corresponding ordinal alphabetic character.
     * <p>
     * For example, the index value of 5 returns the String "f" and the index value
     * of 26 returns aa, 27 returns ab
     * </p>
     * @return the letter whose ordinal position corresponds to the index given
     * @author Nitobi
     */
    private String getNextColumn() {
        /*
         * This is called in loops.  It may be best to have a lookup array of 
         * strings or chars.
         */
        String columnIndexLetter = null;
        if (nextColumnIndex > 25) {
            // After z comes aa then ab and so on until zz, which is the limit.
            char c[] = {(char) (Math.floor(nextColumnIndex / 26) + 96), (char) ((nextColumnIndex % 26) + 97)};
            columnIndexLetter = new String(c);
        } else {
            char c[] = {(char) (nextColumnIndex + 97)};
            columnIndexLetter = new String(c);
        }
        return columnIndexLetter;
    }
}
