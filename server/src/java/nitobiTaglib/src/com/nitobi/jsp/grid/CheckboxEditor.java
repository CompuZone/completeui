/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="checkboxeditor"
 * description="A tag to output a ntb:checkboxeditor element"
 *
 */
public class CheckboxEditor extends NitobiBodyTag 
{
	private static final long serialVersionUID = -5623560615773408062L;
	private String checkedvalue;
	private String uncheckedvalue;
	private String datasource;
	private String datasourceid;
	private String displayfields;
	private String valuefield;
	
	public int doStartTag() throws JspException
	{
		writeCheckboxEditorStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeCheckboxEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writeCheckboxEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:checkboxeditor ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeCheckboxEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:checkboxeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The checkedvalue attribute" 
	 * @return the checkedvalue
	 */
	public String getCheckedvalue() {
		return checkedvalue;
	}
	/**
	 * @param checkedvalue the checkedvalue to set
	 */
	public void setCheckedvalue(String checkedvalue) {
		this.checkedvalue = checkedvalue;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The uncheckedvalue attribute" 
	 * @return the uncheckedvalue
	 */
	public String getUncheckedvalue() {
		return uncheckedvalue;
	}
	/**
	 * @param uncheckedvalue the uncheckedvalue to set
	 */
	public void setUncheckedvalue(String uncheckedvalue) {
		this.uncheckedvalue = uncheckedvalue;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The datasource attribute" 
	 * @return the datasource
	 */
	public String getDatasource() {
		return datasource;
	}

	/**
	 * @param datasource the datasource to set
	 */
	public void setDatasource(String datasource) {
		this.datasource = datasource;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The datasourceid attribute" 
	 * @return the datasourceid
	 */
	public String getDatasourceid() {
		return datasourceid;
	}

	/**
	 * @param datasourceid the datasourceid to set
	 */
	public void setDatasourceid(String datasourceid) {
		this.datasourceid = datasourceid;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The displayfields attribute" 
	 * @return the displayfields
	 */
	public String getDisplayfields() {
		return displayfields;
	}

	/**
	 * @param displayfields the displayfields to set
	 */
	public void setDisplayfields(String displayfields) {
		this.displayfields = displayfields;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The valuefield attribute" 
	 * @return the valuefield
	 */
	public String getValuefield() {
		return valuefield;
	}

	/**
	 * @param valuefield the valuefield to set
	 */
	public void setValuefield(String valuefield) {
		this.valuefield = valuefield;
	}
}
