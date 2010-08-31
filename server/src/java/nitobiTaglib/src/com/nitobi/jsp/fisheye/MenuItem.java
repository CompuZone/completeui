/**
 * 
 */
package com.nitobi.jsp.fisheye;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="menuitem"
 * description="A tag to output a ntb:menuitem element"
 *
 */
public class MenuItem extends NitobiBodyTag 
{
	private static final long serialVersionUID = -6641470125922321054L;
	private String imagesrc;
	private String label;
	private String onclick;

	public int doStartTag() throws JspException
	{
		writeMenuItemStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeMenuItemEndTag();
		return EVAL_PAGE;
	}
	
	private void writeMenuItemStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:menuitem ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (Exception e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeMenuItemEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:menuitem>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The imagesrc attribute" 
	 * @return the imagesrc
	 */
	public String getImagesrc() {
		return imagesrc;
	}
	/**
	 * @param imagesrc the imagesrc to set
	 */
	public void setImagesrc(String imagesrc) {
		this.imagesrc = imagesrc;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The label attribute" 
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}
	/**
	 * @param label the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
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
	
	
}
