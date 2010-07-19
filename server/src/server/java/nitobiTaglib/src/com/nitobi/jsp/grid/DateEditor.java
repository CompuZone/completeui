/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="dateeditor"
 * description="A tag to output a ntb:dateeditor element"
 *
 */
public class DateEditor extends NitobiBodyTag 
{
	private static final long serialVersionUID = 3455107702416173832L;
	private String mask;
	
	public int doStartTag() throws JspException
	{
		writeDateEditorStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeDateEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDateEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:dateeditor ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
		
	}
	
	private void writeDateEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:dateeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The mask attribute" 
	 * @return the mask
	 */
	public String getMask() {
		return mask;
	}

	/**
	 * @param mask the mask to set
	 */
	public void setMask(String mask) {
		this.mask = mask;
	}
}
