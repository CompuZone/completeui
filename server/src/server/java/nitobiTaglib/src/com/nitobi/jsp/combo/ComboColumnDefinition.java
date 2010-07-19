/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="combocolumndefinition" 
 * description="A tag to output a ntb:ComboColumnDefinition element"
 *
 */
public class ComboColumnDefinition extends NitobiBodyTag 
{
	private static final long serialVersionUID = 3314378153951256108L;
	private String align;
	private String columntype;
	private String cssclassname;
	private String datafieldindex;
	private String headerlabel;
	private String htmlprefix;
	private String htmlsuffix;
	private String imagehandlerurl;
	private String textcolor;
	private String width;
	
	public int doStartTag() throws JspException
	{
		writeComboColumnDefinitionStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeComboColumnDefinitionEndTag();
		return EVAL_PAGE;
	}
	
	private void writeComboColumnDefinitionStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:ComboColumnDefinition ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeComboColumnDefinitionEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:ComboColumnDefinition>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
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
	 * 				  description="The columntype attribute" 
	 * @return the columntype
	 */
	public String getColumntype() {
		return columntype;
	}
	/**
	 * @param columntype the columntype to set
	 */
	public void setColumntype(String columntype) {
		this.columntype = columntype;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The cssclassname attribute" 
	 * @return the cssclassname
	 */
	public String getCssclassname() {
		return cssclassname;
	}
	/**
	 * @param cssclassname the cssclassname to set
	 */
	public void setCssclassname(String cssclassname) {
		this.cssclassname = cssclassname;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The datafieldindex attribute" 
	 * @return the datafieldindex
	 */
	public String getDatafieldindex() {
		return datafieldindex;
	}
	/**
	 * @param datafieldindex the datafieldindex to set
	 */
	public void setDatafieldindex(String datafieldindex) {
		this.datafieldindex = datafieldindex;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The headerlabel attribute" 
	 * @return the headerlabel
	 */
	public String getHeaderlabel() {
		return headerlabel;
	}
	/**
	 * @param headerlabel the headerlabel to set
	 */
	public void setHeaderlabel(String headerlabel) {
		this.headerlabel = headerlabel;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The htmlprefix attribute" 
	 * @return the htmlprefix
	 */
	public String getHtmlprefix() {
		return htmlprefix;
	}
	/**
	 * @param htmlprefix the htmlprefix to set
	 */
	public void setHtmlprefix(String htmlprefix) {
		this.htmlprefix = htmlprefix;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The htmlsuffix attribute" 
	 * @return the htmlsuffix
	 */
	public String getHtmlsuffix() {
		return htmlsuffix;
	}
	/**
	 * @param htmlsuffix the htmlsuffix to set
	 */
	public void setHtmlsuffix(String htmlsuffix) {
		this.htmlsuffix = htmlsuffix;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The imagehandlerurl attribute" 
	 * @return the imagehandlerurl
	 */
	public String getImagehandlerurl() {
		return imagehandlerurl;
	}
	/**
	 * @param imagehandlerurl the imagehandlerurl to set
	 */
	public void setImagehandlerurl(String imagehandlerurl) {
		this.imagehandlerurl = imagehandlerurl;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The textcolor attribute" 
	 * @return the textcolor
	 */
	public String getTextcolor() {
		return textcolor;
	}
	/**
	 * @param textcolor the textcolor to set
	 */
	public void setTextcolor(String textcolor) {
		this.textcolor = textcolor;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The width attribute" 
	 * @return the width
	 */
	public String getWidth() {
		return width;
	}
	/**
	 * @param width the width to set
	 */
	public void setWidth(String width) {
		this.width = width;
	}
}
