/**
 * 
 */
package com.nitobi.jsp.treegrid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="passwordeditor"
 * description="A tag to output a ntb:passwordeditor element"
 *
 */
public class PasswordEditor extends NitobiBodyTag 
{
	private static final long serialVersionUID = 196574092866255376L;

	public int doStartTag() throws JspException
	{
		writePasswordEditorStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writePasswordEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writePasswordEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:passwordeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writePasswordEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:passwordeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
}
