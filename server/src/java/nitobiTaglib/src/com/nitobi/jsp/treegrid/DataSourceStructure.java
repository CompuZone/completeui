/**
 * 
 */
package com.nitobi.jsp.treegrid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="datasourcestructure"
 * description="A tag to output a ntb:datasourcestructure element"
 *
 */
public class DataSourceStructure extends NitobiBodyTag 
{
	private static final long serialVersionUID = -6055746921482059670L;
	private String keys;
	private String fieldnames;
	
	public int doStartTag() throws JspException
	{
		writeDataSourceStructureStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeDataSourceStructureEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDataSourceStructureStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:datasourcestructure ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeDataSourceStructureEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:datasourcestructure>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="true" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The fieldnames attribute" 
	 * @return the fieldnames
	 */
	public String getFieldnames() {
		return fieldnames;
	}
	/**
	 * @param fieldnames the fieldnames to set
	 */
	public void setFieldnames(String fieldnames) {
		this.fieldnames = fieldnames;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The keys attribute" 
	 * @return the keys
	 */
	public String getKeys() {
		return keys;
	}
	/**
	 * @param keys the keys to set
	 */
	public void setKeys(String keys) {
		this.keys = keys;
	}
	
	
}
