/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="datasource"
 * description="A tag to output a ntb:datasource element"
 *
 */
public class DataSource extends NitobiBodyTag 
{
	private static final long serialVersionUID = -8744075569349086735L;
	private String id;
	
	public int doStartTag() throws JspException
	{
		writeDataSourceStartTag();
		return EVAL_BODY_INCLUDE;
	}
	public int doEndTag() throws JspException
	{
		writeDataSourceEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDataSourceStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:datasource ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeDataSourceEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:datasource>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="true" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The id attribute" 
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
}
