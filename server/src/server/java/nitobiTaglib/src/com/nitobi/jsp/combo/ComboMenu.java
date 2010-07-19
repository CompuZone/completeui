/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="combomenu"
 * description="A tag to output an ntb:ComboMenu element"
 *
 */
public class ComboMenu extends NitobiBodyTag 
{
	private String text;
	private String icon;
	private String onclickevent;
	private String onmouseoutevent;
	private String onmouseoverevent;
	
	public int doStartTag() throws JspException
	{
		writeComboMenuStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeComboMenuEndTag();
		return EVAL_PAGE;
	}
	
	private void writeComboMenuStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:ComboMenu ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeComboMenuEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:ComboMenu>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The icon attribute" 
	 * @return the icon
	 */
	public String getIcon() {
		return icon;
	}
	/**
	 * @param icon the icon to set
	 */
	public void setIcon(String icon) {
		this.icon = icon;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onclickevent attribute" 
	 * @return the onclickevent
	 */
	public String getOnclickevent() {
		return onclickevent;
	}
	/**
	 * @param onclickevent the onclickevent to set
	 */
	public void setOnclickevent(String onclick) {
		this.onclickevent = onclick;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseoutevent attribute" 
	 * @return the onmouseoutevent
	 */
	public String getOnmouseoutevent() {
		return onmouseoutevent;
	}
	/**
	 * @param onmouseoutevent the onmouseoutevent to set
	 */
	public void setOnmouseoutevent(String onmouseout) {
		this.onmouseoutevent = onmouseout;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseoverevent attribute" 
	 * @return the onmouseoverevent
	 */
	public String getOnmouseoverevent() {
		return onmouseoverevent;
	}
	/**
	 * @param onmouseoverevent the onmouseoverevent to set
	 */
	public void setOnmouseoverevent(String onmouseover) {
		this.onmouseoverevent = onmouseover;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The text attribute" 
	 * @return the text
	 */
	public String getText() {
		return text;
	}
	/**
	 * @param text the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}
}
