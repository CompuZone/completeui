/**
 * User: Eric Buitenhuis 
 * Date: May 24, 2008
 * Time: 2:54:46 PM
 */

package com.nitobi.beans;

import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * JavascriptDeclaration
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class JavascriptDeclaration {
    private String variableName = null;
    private String createdObject = null;
    private List<JavascriptArgument> arguments;

    public JavascriptDeclaration() {
        this.arguments = new LinkedList<JavascriptArgument>();
    }

    public JavascriptDeclaration(String variableName, String createdObject) {
        this.arguments = new LinkedList<JavascriptArgument>();
        this.variableName = variableName;
        this.createdObject = createdObject;
    }

    public JavascriptDeclaration(String variableName, String createdObject, JavascriptArgument... arguments) {
        this.arguments = new LinkedList<JavascriptArgument>();
        this.variableName = variableName;
        this.createdObject = createdObject;
        this.arguments.addAll(Arrays.asList(arguments));
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer("var ");
        sb.append(variableName);
        sb.append(" = new ");
        sb.append(createdObject);
        sb.append("(");
        JavascriptArgument arg;
        for(Iterator<JavascriptArgument> iter = arguments.iterator(); iter.hasNext();) {
            arg = iter.next();
            sb.append(arg.toString());
            if(iter.hasNext()) {
                sb.append(",");
            }
        }
        sb.append(");");
        return sb.toString();
    }

    public void addArgument(JavascriptArgument arg) {
        this.arguments.add(arg);
    }

    public String getVariableName() {
        return variableName;
    }

    public void setVariableName(String variableName) {
        this.variableName = variableName;
    }

    public String getCreatedObject() {
        return createdObject;
    }

    public void setCreatedObject(String createdObject) {
        this.createdObject = createdObject;
    }

    public List<JavascriptArgument> getArguments() {
        return arguments;
    }

    public void setArguments(List<JavascriptArgument> arguments) {
        this.arguments = arguments;
    }
}
