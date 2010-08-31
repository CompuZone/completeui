/**
 * User: Eric Buitenhuis 
 * Date: May 23, 2008
 * Time: 10:24:43 PM
 */

package com.nitobi.jsf.component;

import com.nitobi.beans.JavascriptArgument;

import javax.faces.component.UIComponentBase;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;
import java.util.Map;

/**
 * UIJavascriptComponent - An abstract component that will ease the creation of
 * components whose outputs are merely a javascript method.
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public abstract class UIJavascriptMethodCallComponent extends UIComponentBase {

    public static final String DOT = ".";
    public static final String COMMA = ",";
    public static final String EQUALS = "=";
    public static final String BEGIN_ARGS = "(";
    public static final String END_ARGS = ");";

    private static final String WINDOW = "window";
    private static final String DOCUMENT = "document";
    private static final String DOM_FINDBYID_PRE = "$('";
    private static final String DOM_FINDYBID_POST = "')";


    @Override
    public void encodeBegin(FacesContext facesContext) throws IOException {
        super.encodeBegin(facesContext);
        ResponseWriter writer = facesContext.getResponseWriter();

        StringBuffer sb = new StringBuffer();
        sb.append(getVariableName());
        sb.append(DOT);
        sb.append(getMethodName(facesContext));
        sb.append(BEGIN_ARGS);

        JavascriptArgument[] args = createArguments(getAttributes());

        int numberOfArgs = args.length;
        for(int i=0; i<numberOfArgs; i++) {
            sb.append(args[i].toString());
            if(i < numberOfArgs-1) {
                sb.append(COMMA);
            }
        }
        sb.append(END_ARGS);
        writer.write(sb.toString());
    }

    /**
     * The name of the object variable.
     *
     * @return The <code>String</code> representation of the variable.
     * @throws IllegalStateException if this component is not a child of a UIJavascriptEventBasedComponent
     */
    private String getVariableName() {
        if(getParent() instanceof UIJavascriptEventBasedComponent) {
            return ((UIJavascriptEventBasedComponent)getParent()).getJavascriptDeclaration().getVariableName();
        } else {
            throw new IllegalStateException("This UIJavascriptMethodCallComponent must be a child of a UIJavascriptEventBasedComponent");
        }
    }

    /**
     * The name of the method to call from the object variable.
     *
     * @param facesContext  The current facesContext
     * @return The <code>String</code> representation of the method name.
     */
    protected abstract String getMethodName(FacesContext facesContext);

    /**
     * Creates the arguments to pass to the method. The JavascriptArgument object
     * handles the type of argument it is, whether it's a plain string, boolean, object,
     * function, etc. Each JavascriptArgument must be set individually by the component
     * to ensure it is output accordingly.
     *
     * @param attributes A Map of the component's set attributes.
     * @return An array of Strings in the order in which they will be presented as args.
     */
    protected abstract JavascriptArgument[] createArguments(Map<String, Object> attributes);
}