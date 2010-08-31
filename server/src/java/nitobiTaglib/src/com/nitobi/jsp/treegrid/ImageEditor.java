/**
 * 
 */
package com.nitobi.jsp.treegrid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="imageeditor"
 * description="A tag to output a ntb:imageeditor tag"
 *
 */
public class ImageEditor extends NitobiBodyTag 
{
	private static final long serialVersionUID = 2585587062691292423L;
	private String imageurl;

	public int doStartTag() throws JspException
	{
		writeImageEditorStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeImageEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writeImageEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:imageeditor ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeImageEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:imageeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The imageurl attribute" 
	 * @return the imageurl
	 */
	public String getImageurl() {
		return imageurl;
	}

	/**
	 * @param imageurl the imageurl to set
	 */
	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}
	
}
