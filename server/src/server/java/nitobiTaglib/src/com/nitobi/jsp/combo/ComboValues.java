/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="combovalues"
 *
 */
public class ComboValues extends NitobiBodyTag 
{
	private static final long serialVersionUID = 8849453698393620080L;
	private String fields;
	
	public int doStartTag() throws JspException
	{
		writeComboValuesStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeComboValuesEndTag();
		return EVAL_PAGE;
	}
	
	private void writeComboValuesStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:ComboValues ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeComboValuesEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:ComboValues>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	

	/**
	 * @jsp.attribute required="true" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The fields attribute" 
	 * @return the fields
	 */
	public String getFields() {
		return fields;
	}

	/**
	 * @param fields the fields to set
	 */
	public void setFields(String fields) {
		this.fields = fields;
	}
	
	
}
