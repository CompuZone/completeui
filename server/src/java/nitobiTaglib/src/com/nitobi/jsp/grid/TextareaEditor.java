/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="textareaeditor"
 * description="A tag to output a ntb:textareaeditor element"
 *
 */
public class TextareaEditor extends NitobiBodyTag 
{
	private static final long serialVersionUID = -2621778343034040786L;

	public int doStartTag() throws JspException
	{
		writeTextareaEditorStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeTextareaEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTextareaEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:textareaeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTextareaEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:textareaeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
}
