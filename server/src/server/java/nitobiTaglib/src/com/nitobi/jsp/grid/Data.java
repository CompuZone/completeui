/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="data"
 * description="A tag to output a ntb:data element"
 *
 */
public class Data extends NitobiBodyTag 
{
	private static final long serialVersionUID = -2353213503684781742L;

	public int doStartTag() throws JspException
	{
		writeDataStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeDataEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDataStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:data>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeDataEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:data>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
}
