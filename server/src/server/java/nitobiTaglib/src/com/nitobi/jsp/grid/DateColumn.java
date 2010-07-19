/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="datecolumn"
 * description="A tag to output a ntb:datecolumn element"
 *
 */
public class DateColumn extends NitobiBodyTag 
{
	private static final long serialVersionUID = -4518982537954037473L;
	private String mask;
	private String align;
	private String classname;
	private String cssstyle;
	private String value;
	private String columnname;
	private String headerelement;
	private String type;
	private String editable = "true";
	private String initial;
	private String label;
	private String sortdirection;
	private String sortenabled = "true";
	private String width;
	private String visible = "true";
	private String xdatafld;
	private String onheaderclickevent;
	private String oncellclickevent;
	private String oncellvalidateevent;
	private String onbeforecelleditevent;
	private String onaftercelleditevent;
	private String oncellblurevent;
	private String oncellfocusevent;
	private String onbeforesortevent;
	private String onaftersortevent;
	
	public int doStartTag() throws JspException
	{
		writeTextColumnStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeTextColumnEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTextColumnStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:datecolumn ");
			writeTagAttributes();
			pageContext.getOut().print(">");
			
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTextColumnEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:datecolumn>");
			
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
	 * 				  description="The classname attribute" 
	 * @return the classname
	 */
	public String getClassname() {
		return classname;
	}
	/**
	 * @param classname the classname to set
	 */
	public void setClassname(String classname) {
		this.classname = classname;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The columnname attribute" 
	 * @return the columnname
	 */
	public String getColumnname() {
		return columnname;
	}
	/**
	 * @param columnname the columnname to set
	 */
	public void setColumnname(String columnname) {
		this.columnname = columnname;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The cssstyle attribute" 
	 * @return the cssstyle
	 */
	public String getCssstyle() {
		return cssstyle;
	}
	/**
	 * @param cssstyle the cssstyle to set
	 */
	public void setCssstyle(String cssstyle) {
		this.cssstyle = cssstyle;
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
	 * 				  description="The headerelement attribute" 
	 * @return the headerelement
	 */
	public String getHeaderelement() {
		return headerelement;
	}
	/**
	 * @param headerelement the headerelement to set
	 */
	public void setHeaderelement(String headerelement) {
		this.headerelement = headerelement;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The initial attribute" 
	 * @return the initial
	 */
	public String getInitial() {
		return initial;
	}
	/**
	 * @param initial the initial to set
	 */
	public void setInitial(String initial) {
		this.initial = initial;
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
	 * 				  description="The mask attribute" 
	 * @return the mask
	 */
	public String getMask() {
		return mask;
	}
	/**
	 * @param mask the mask to set
	 */
	public void setMask(String mask) {
		this.mask = mask;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onaftercelleditevent attribute" 
	 * @return the onaftercelleditevent
	 */
	public String getOnaftercelleditevent() {
		return onaftercelleditevent;
	}
	/**
	 * @param onaftercelleditevent the onaftercelleditevent to set
	 */
	public void setOnaftercelleditevent(String onaftercelleditevent) {
		this.onaftercelleditevent = onaftercelleditevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onaftersortevent attribute" 
	 * @return the onaftersortevent
	 */
	public String getOnaftersortevent() {
		return onaftersortevent;
	}
	/**
	 * @param onaftersortevent the onaftersortevent to set
	 */
	public void setOnaftersortevent(String onaftersortevent) {
		this.onaftersortevent = onaftersortevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforecelleditevent attribute" 
	 * @return the onbeforecelleditevent
	 */
	public String getOnbeforecelleditevent() {
		return onbeforecelleditevent;
	}
	/**
	 * @param onbeforecelleditevent the onbeforecelleditevent to set
	 */
	public void setOnbeforecelleditevent(String onbeforecelleditevent) {
		this.onbeforecelleditevent = onbeforecelleditevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforesortevent attribute" 
	 * @return the onbeforesortevent
	 */
	public String getOnbeforesortevent() {
		return onbeforesortevent;
	}
	/**
	 * @param onbeforesortevent the onbeforesortevent to set
	 */
	public void setOnbeforesortevent(String onbeforesortevent) {
		this.onbeforesortevent = onbeforesortevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncellblurevent attribute" 
	 * @return the oncellblurevent
	 */
	public String getOncellblurevent() {
		return oncellblurevent;
	}
	/**
	 * @param oncellblurevent the oncellblurevent to set
	 */
	public void setOncellblurevent(String oncellblurevent) {
		this.oncellblurevent = oncellblurevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncellclickevent attribute" 
	 * @return the oncellclickevent
	 */
	public String getOncellclickevent() {
		return oncellclickevent;
	}
	/**
	 * @param oncellclickevent the oncellclickevent to set
	 */
	public void setOncellclickevent(String oncellclickevent) {
		this.oncellclickevent = oncellclickevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncellfocusevent attribute" 
	 * @return the oncellfocusevent
	 */
	public String getOncellfocusevent() {
		return oncellfocusevent;
	}
	/**
	 * @param oncellfocusevent the oncellfocusevent to set
	 */
	public void setOncellfocusevent(String oncellfocusevent) {
		this.oncellfocusevent = oncellfocusevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncellvalidateevent attribute" 
	 * @return the oncellvalidateevent
	 */
	public String getOncellvalidateevent() {
		return oncellvalidateevent;
	}
	/**
	 * @param oncellvalidateevent the oncellvalidateevent to set
	 */
	public void setOncellvalidateevent(String oncellvalidateevent) {
		this.oncellvalidateevent = oncellvalidateevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onheaderclickevent attribute" 
	 * @return the onheaderclickevent
	 */
	public String getOnheaderclickevent() {
		return onheaderclickevent;
	}
	/**
	 * @param onheaderclickevent the onheaderclickevent to set
	 */
	public void setOnheaderclickevent(String onheaderclickevent) {
		this.onheaderclickevent = onheaderclickevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The sortdirection attribute" 
	 * @return the sortdirection
	 */
	public String getSortdirection() {
		return sortdirection;
	}
	/**
	 * @param sortdirection the sortdirection to set
	 */
	public void setSortdirection(String sortdirection) {
		this.sortdirection = sortdirection;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The sortenabled attribute" 
	 * @return the sortenabled
	 */
	public String getSortenabled() {
		return sortenabled;
	}
	/**
	 * @param sortenabled the sortenabled to set
	 */
	public void setSortenabled(String sortenabled) {
		this.sortenabled = sortenabled;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The type attribute" 
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
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
	 * 				  description="The visible attribute" 
	 * @return the visible
	 */
	public String getVisible() {
		return visible;
	}
	/**
	 * @param visible the visible to set
	 */
	public void setVisible(String visible) {
		this.visible = visible;
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
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The xdatafld attribute" 
	 * @return the xdatafld
	 */
	public String getXdatafld() {
		return xdatafld;
	}
	/**
	 * @param xdatafld the xdatafld to set
	 */
	public void setXdatafld(String xdatafld) {
		this.xdatafld = xdatafld;
	}
}
