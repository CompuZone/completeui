/**
 * 
 */
package com.nitobi.jsp.tabstrip;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="tabs"
 * description="A tag that outputs a ntb:tabs element"
 *
 */
public class Tabs extends NitobiBodyTag 
{
	private static final long serialVersionUID = -8321199074011468482L;
	private String height;
	private String align;
	private String overlap;
	private String activateeffect;
	private String activetabindex;
	private String onclick;
	private String onmouseout;
	private String onmouseover;
	private String onbeforetabchange;
	private String ontabchange;
	
	public int doStartTag() throws JspException
	{
		writeTabsStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeTabsEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTabsStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:tabs ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTabsEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:tabs>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The activateeffect attribute" 
	 * @return the activateeffect
	 */
	public String getActivateeffect() {
		return activateeffect;
	}
	/**
	 * @param activateeffect the activateeffect to set
	 */
	public void setActivateeffect(String activateeffect) {
		this.activateeffect = activateeffect;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The activetabindex attribute" 
	 * @return the activetabindex
	 */
	public String getActivetabindex() {
		return activetabindex;
	}
	/**
	 * @param activetabindex the activetabindex to set
	 */
	public void setActivetabindex(String activetabindex) {
		this.activetabindex = activetabindex;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The align attribute" 
	 * @return the align
	 */
	public String getAlign() {
		return align;
	}
	/**
	 * @param align the align to set
	 */
	public void setAlign(String align) {
		this.align = align;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The height attribute" 
	 * @return the height
	 */
	public String getHeight() {
		return height;
	}
	/**
	 * @param height the height to set
	 */
	public void setHeight(String height) {
		this.height = height;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforetabchange attribute" 
	 * @return the onbeforetabchange
	 */
	public String getOnbeforetabchange() {
		return onbeforetabchange;
	}
	/**
	 * @param onbeforetabchange the onbeforetabchange to set
	 */
	public void setOnbeforetabchange(String onbeforetabchange) {
		this.onbeforetabchange = onbeforetabchange;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onclick attribute" 
	 * @return the onclick
	 */
	public String getOnclick() {
		return onclick;
	}
	/**
	 * @param onclick the onclick to set
	 */
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseout attribute" 
	 * @return the onmouseout
	 */
	public String getOnmouseout() {
		return onmouseout;
	}
	/**
	 * @param onmouseout the onmouseout to set
	 */
	public void setOnmouseout(String onmouseout) {
		this.onmouseout = onmouseout;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseover attribute" 
	 * @return the onmouseover
	 */
	public String getOnmouseover() {
		return onmouseover;
	}
	/**
	 * @param onmouseover the onmouseover to set
	 */
	public void setOnmouseover(String onmouseover) {
		this.onmouseover = onmouseover;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ontabchange attribute" 
	 * @return the ontabchange
	 */
	public String getOntabchange() {
		return ontabchange;
	}
	/**
	 * @param ontabchange the ontabchange to set
	 */
	public void setOntabchange(String ontabchange) {
		this.ontabchange = ontabchange;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The overlap attribute" 
	 * @return the overlap
	 */
	public String getOverlap() {
		return overlap;
	}
	/**
	 * @param overlap the overlap to set
	 */
	public void setOverlap(String overlap) {
		this.overlap = overlap;
	}

	
	
	
	
}
