package com.nitobi.jsp.calendar;

import javax.servlet.jsp.JspException;

import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="calendar"
 *
 */
public class Calendar extends NitobiBodyTag 
{
	private String monthrows;
	private String monthcolumns;
	private String effectenabled;
	private String onhide;
	private String onshow;
	
	private String ondateclicked;
	private String onmonthchanged;
	private String onyearchanged;
	
	public int doStartTag() throws JspException 
	{
		writeCalendarStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException 
	{
		writeCalendarEndTag();
		return EVAL_PAGE;
	}
	
	private void writeCalendarStartTag() throws JspException 
	{
		try
		{
			pageContext.getOut().print("<ntb:calendar ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeCalendarEndTag() throws JspException 
	{
		try
		{
			pageContext.getOut().print("</ntb:calendar>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The monthrows attribute" 
	 * @return the monthrows
	 */
	public String getMonthrows() {
		return monthrows;
	}

	/**
	 * @param monthrows the monthrows to set
	 */
	public void setMonthrows(String monthrows) {
		this.monthrows = monthrows;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The monthcolumns attribute" 
	 * @return the monthcolumns
	 */
	public String getMonthcolumns() {
		return monthcolumns;
	}

	/**
	 * @param monthcolumns the monthcolumns to set
	 */
	public void setMonthcolumns(String monthcolumns) {
		this.monthcolumns = monthcolumns;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The effectenabled attribute" 
	 * @return the effectenabled
	 */
	public String getEffectenabled() {
		return effectenabled;
	}

	/**
	 * @param effectenabled the effectenabled to set
	 */
	public void setEffectenabled(String effectenabled) {
		this.effectenabled = effectenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onhide attribute" 
	 * @return the onhide
	 */
	public String getOnhide() {
		return onhide;
	}

	/**
	 * @param onhide the onhide to set
	 */
	public void setOnhide(String onhide) {
		this.onhide = onhide;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onshow attribute" 
	 * @return the onshow
	 */
	public String getOnshow() {
		return onshow;
	}

	/**
	 * @param onshow the onshow to set
	 */
	public void setOnshow(String onshow) {
		this.onshow = onshow;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ondateclicked attribute" 
	 * @return the ondateclicked
	 */
	public String getOndateclicked() {
		return ondateclicked;
	}

	/**
	 * @param ondateclicked the ondateclicked to set
	 */
	public void setOndateclicked(String ondateclicked) {
		this.ondateclicked = ondateclicked;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmonthchanged attribute" 
	 * @return the onmonthchanged
	 */
	public String getOnmonthchanged() {
		return onmonthchanged;
	}

	/**
	 * @param onmonthchanged the onmonthchanged to set
	 */
	public void setOnmonthchanged(String onmonthchanged) {
		this.onmonthchanged = onmonthchanged;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onyearchanged attribute" 
	 * @return the onyearchanged
	 */
	public String getOnyearchanged() {
		return onyearchanged;
	}

	/**
	 * @param onyearchanged the onyearchanged to set
	 */
	public void setOnyearchanged(String onyearchanged) {
		this.onyearchanged = onyearchanged;
	}
	
}
