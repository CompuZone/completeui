package com.nitobi.jsp.tree;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @jsp.tag name="children"
 * description="A tag to output a ntb:children element"
 * @author mhan
 *
 */
public class Children extends NitobiBodyTag
{
	private static final long serialVersionUID = -7225708725102334414L;

	public int doStartTag() throws JspException
	{
		writeChildrenStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeChildrenEndTag();
		return EVAL_PAGE;
	}
	
	private void writeChildrenStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:children>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeChildrenEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:children>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
}
