/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="combobutton"
 * description="A tag to output a ntb:ComboButton element"
 *
 */
public class ComboButton extends NitobiBodyTag 
{
	private static final long serialVersionUID = -3643146415495335017L;
	private String defaultcssclassname;
	private String height;
	private String pressedcssclassname;
	private String width;
	private String onbeforeselectevent;
	private String onblurevent;
	private String onfocusevent;
	private String onloadevent;
	private String onselectevent;
	private String ontabevent;
	
	public int doStartTag() throws JspException
	{
		writeComboButtonStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeComboButtonEndTag();
		return EVAL_PAGE;
	}
	
	private void writeComboButtonStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:ComboButton ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeComboButtonEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:ComboButton>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The defaultcssclassname attribute" 
	 * @return the defaultcssclassname
	 */
	public String getDefaultcssclassname() {
		return defaultcssclassname;
	}

	/**
	 * @param defaultCssClassname the defaultCssClassname to set
	 */
	public void setDefaultcssclassname(String defaultCssClassname) {
		this.defaultcssclassname = defaultCssClassname;
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
	 * 				  description="The onbeforeselectevent attribute" 
	 * @return the onbeforeselectevent
	 */
	public String getOnbeforeselectevent() {
		return onbeforeselectevent;
	}

	/**
	 * @param onbeforeselectevent the onbeforeselectevent to set
	 */
	public void setOnbeforeselectevent(String onBeforeSelectEvent) {
		this.onbeforeselectevent = onBeforeSelectEvent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onblurevent attribute" 
	 * @return the onblurevent
	 */
	public String getOnblurevent() {
		return onblurevent;
	}

	/**
	 * @param onblurevent the onblurevent to set
	 */
	public void setOnblurevent(String onBlurEvent) {
		this.onblurevent = onBlurEvent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onfocusevent attribute" 
	 * @return the onfocusevent
	 */
	public String getOnfocusevent() {
		return onfocusevent;
	}

	/**
	 * @param onfocusevent the onfocusevent to set
	 */
	public void setOnfocusevent(String onFocusEvent) {
		this.onfocusevent = onFocusEvent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onloadevent attribute" 
	 * @return the onloadevent
	 */
	public String getOnloadevent() {
		return onloadevent;
	}

	/**
	 * @param onloadevent the onloadevent to set
	 */
	public void setOnloadevent(String onLoadEvent) {
		this.onloadevent = onLoadEvent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onselectevent attribute" 
	 * @return the onselectevent
	 */
	public String getOnselectevent() {
		return onselectevent;
	}

	/**
	 * @param onselectevent the onselectevent to set
	 */
	public void setOnselectevent(String onSelectEvent) {
		this.onselectevent = onSelectEvent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ontabevent attribute" 
	 * @return the ontabevent
	 */
	public String getOntabevent() {
		return ontabevent;
	}

	/**
	 * @param ontabevent the ontabevent to set
	 */
	public void setOntabevent(String onTabEvent) {
		this.ontabevent = onTabEvent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The pressedcssclassname attribute" 
	 * @return the pressedcssclassname
	 */
	public String getPressedcssclassname() {
		return pressedcssclassname;
	}

	/**
	 * @param pressedCssClassname the pressedcssclassname to set
	 */
	public void setPressedcssclassname(String pressedCssClassname) {
		this.pressedcssclassname = pressedCssClassname;
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
