/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="lookupeditor"
 * description="A tag to output a ntb:lookupeditor element"
 *
 */
public class LookupEditor extends NitobiBodyTag 
{
	private static final long serialVersionUID = 7437809945117455067L;
	private String datasource;
	private String gethandler;
	private String datasourceid;
	private String displayfields;
	private String valuefield;
	
	public int doStartTag() throws JspException
	{
		writeLookupEditorStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeLookupEditorEndTag();
		return EVAL_PAGE;
	}
	
	private void writeLookupEditorStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:lookupeditor ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeLookupEditorEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:lookupeditor>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
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
	 * 				  description="The gethandler attribute" 
	 * @return the gethandler
	 */
	public String getGethandler() {
		return gethandler;
	}
	/**
	 * @param gethandler the gethandler to set
	 */
	public void setGethandler(String gethandler) {
		this.gethandler = gethandler;
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
