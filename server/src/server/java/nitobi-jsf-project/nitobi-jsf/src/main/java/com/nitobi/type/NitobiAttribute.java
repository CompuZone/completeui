/**
 * User: Eric Buitenhuis 
 * Date: Jun 1, 2008
 * Time: 1:25:14 PM
 */

package com.nitobi.type;

/**
 * @author Eric Buitenhuis
 * @version 1.0
 */
public interface NitobiAttribute {
    /**
     * The name that is meant to be printed to the HTML output.
     *
     * @return The name that will be printed in the HTML output.
     */
    public String domAttributeName();

    /**
     * The name that is used by JSF Taglib and Taglib classes.
     *
     * @return The name as it is used for JSF variables and tags
     */
    public String jsfAttributeName();

    /**
     * What kind of data this is. This value should map directly to the
     * type that Nitobi has declared it in their Javascript libs. This is
     * NOT meant to reflect Method Expression types or Value Expression
     * types.
     *
     * @return The Java corresponding type to what will be in Javascript
     */
    public Class dataType();

    /**
     * Whether or not this attribute needs manipulation before outputting
     * to HTML.
     *
     * @return True if this attribute is passthrough
     */
    public boolean isPassthrough();

    /**
     * Whether or not this attribute is a method expression.
     *
     * @return True if it is a method expression
     */
    public boolean isMethodExpression();
}
