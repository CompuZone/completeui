/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="combotextbox"
 * description="A tag to output a ntb:ComboTextBox element"
 *
 */
public class ComboTextBox extends NitobiBodyTag 
{
	private static final long serialVersionUID = -5171947941694464308L;
	private String cssclassname;
	private String datafieldindex;
	private String editable;
	private String height;
	private String value;
	private String width;
	private String oneditkeyupevent;
	
	public int doStartTag() throws JspException
	{
		writeComboTextBoxStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeComboTextBoxEndTag();
		return EVAL_PAGE;
	}
	
	private void writeComboTextBoxStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:ComboTextBox ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
		
	}
	
	private void writeComboTextBoxEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:ComboTextBox>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
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
	 * 				  description="The editable attribute" 
	 * @return the editable
	 */
	public String getEditable() {
		return editable;
	}
	/**
	 * @param editable the editable to set
	 */
	public void setEditable(String editable) {
		this.editable = editable;
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
	 * 				  description="The oneditkeyupevent attribute" 
	 * @return the oneditkeyupevent
	 */
	public String getOneditkeyupevent() {
		return oneditkeyupevent;
	}
	/**
	 * @param oneditkeyupevent the oneditkeyupevent to set
	 */
	public void setOneditkeyupevent(String oneditkeyupevent) {
		this.oneditkeyupevent = oneditkeyupevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The value attribute" 
	 * @return the value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
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
