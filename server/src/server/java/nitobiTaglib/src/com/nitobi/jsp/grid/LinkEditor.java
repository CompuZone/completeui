/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="linkeditor"
 * description="A tag to output a ntb:linkeditor element"
 *
 */
public class LinkEditor extends NitobiBodyTag
{
	private static final long serialVersionUID = 7440111426335838149L;
	private String openwindow = "true";
	
	public int doStartTag() throws JspException
	{
		writeLinkEditorStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeLinkEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writeLinkEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:linkeditor ");
			writeTagAttributes();
			pageContext.getOut().print(">");
			
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeLinkEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:linkeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The openwindow attribute" 
	 * @return the openwindow
	 */
	public String getOpenwindow() {
		return openwindow;
	}

	/**
	 * @param openwindow the openwindow to set
	 */
	public void setOpenwindow(String openwindow) {
		this.openwindow = openwindow;
	}
	
}
