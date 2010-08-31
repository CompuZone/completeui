package com.nitobi.jsp.calendar;

import javax.servlet.jsp.JspException;

import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="dateinput"
 *
 */
public class DateInput extends NitobiBodyTag 
{
	private String displaymask;
	private String editmask;
	private String editable;
	private String width;
	
	private String onblur;
	private String onfocus;
	
	public int doStartTag() throws JspException 
	{
		writeDateInputStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException 
	{
		writeDateInputEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDateInputStartTag() throws JspException 
	{
		try
		{
			pageContext.getOut().print("<ntb:dateinput ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeDateInputEndTag() throws JspException 
	{
		try
		{
			pageContext.getOut().print("</ntb:dateinput>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The displaymask attribute" 
	 * @return the displaymask
	 */
	public String getDisplaymask() {
		return displaymask;
	}

	/**
	 * @param displaymask the displaymask to set
	 */
	public void setDisplaymask(String displaymask) {
		this.displaymask = displaymask;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The editmask attribute" 
	 * @return the editmask
	 */
	public String getEditmask() {
		return editmask;
	}

	/**
	 * @param editmask the editmask to set
	 */
	public void setEditmask(String editmask) {
		this.editmask = editmask;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The editable attribute" 
	 * @return the editable
	 */
	public String getEditable() {
		return editable;
	}

	/**
	 * @param editable the editable to set
	 */
	public void setEditable(String editable) {
		this.editable = editable;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The width attribute" 
	 * @return the width
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * @param width the width to set
	 */
	public void setWidth(String width) {
		this.width = width;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onblur attribute" 
	 * @return the onblur
	 */
	public String getOnblur() {
		return onblur;
	}

	/**
	 * @param onblur the onblur to set
	 */
	public void setOnblur(String onblur) {
		this.onblur = onblur;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onfocus attribute" 
	 * @return the onfocus
	 */
	public String getOnfocus() {
		return onfocus;
	}

	/**
	 * @param onfocus the onfocus to set
	 */
	public void setOnfocus(String onfocus) {
		this.onfocus = onfocus;
	}
}
