/**
 * User: Eric Buitenhuis 
 * Date: May 24, 2008
 * Time: 12:21:07 PM
 */

package com.nitobi.beans;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

/**
 * JavascriptArgument
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class JavascriptArgument {
    private final Object value;
    private final ArgumentType type;


    private static final String WINDOW = "window";
    private static final String DOCUMENT = "document";
    private static final String DOM_FINDBYID_PRE = "$('";
    private static final String DOM_FINDYBID_POST = "')";
    private static final String SINGLE_QUOTE = "'";
    private static final String DOUBLE_QUOTE = "\"";
    public static enum ArgumentType { DOMELEMENT, OBJECT, STRING, NUMBER, CHARS }

    public JavascriptArgument(Object value, ArgumentType type) {
        this.value = value;
        if(type == null) {
            this.type = ArgumentType.OBJECT;
        } else {
            this.type = type;
        }
    }

    @Override
    public String toString() {
        if(value == null) {
            return (String)value;
        } else {
            StringBuffer sb = new StringBuffer(value.toString());
            switch(type) {
                case DOMELEMENT:
                    if(!value.equals(WINDOW) && !value.equals(DOCUMENT)) {
                        sb.insert(0, DOM_FINDBYID_PRE);
                        sb.append(DOM_FINDYBID_POST);
                    }
                    break;
                case OBJECT:
                    // no manipulation needed
                    break;
                case STRING:
                    sb.insert(0, DOUBLE_QUOTE);
                    sb.append(DOUBLE_QUOTE);
                    break;
                case NUMBER:
                    // no manipulation needed
                    break;
                case CHARS:
                    sb.insert(0,SINGLE_QUOTE);
                    sb.append(SINGLE_QUOTE);
                default:
            }
            return sb.toString();
        }
    }
}
