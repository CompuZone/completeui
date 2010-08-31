/**
 * 
 */
package com.nitobi.jsp.tabstrip;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiComponentTag;
import com.nitobi.jsp.global.Globals;

/**
 * @author mhan
 * @jsp.tag name="tabstrip"
 * description="The Nitobi Tabstrip component.
 * It will automatically include the necessary javascript and stylesheet.
 * By default, the javascript files will be loaded from ./resources/nitobi/script/ and
 * the stylesheet from ./resources/nitobi/style/"
 *
 */
public class Tabstrip extends NitobiComponentTag 
{
	private static final long serialVersionUID = 5502861737192313122L;
	private String id;
	private String width;
	private String height;
	private String cssclass;
	private String cssstyle;
	private String tabindex = "0";
	private String theme;
	
	private String includeresources = "true";
	private String autoinitialize = "true";
	
	private String onclick;
	private String onmouseout;
	private String onmouseover;
	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.tabstrip.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.tabstrip.css";
	
	public int doStartTag() throws JspException
	{
		if (getIncluderesources() == "true")
		{
			writeScriptTags("tabstrip");
			writeStyleTag("tabstrip");
		}
		if (getAutoinitialize() == "true")
		{
			writeInitScript();
		}
		writeTabstripStartTag();
			
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeTabstripEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTabstripStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().println("<?XML:NAMESPACE prefix=\"ntb\" />");
			pageContext.getOut().print("<ntb:tabstrip id=\"" + getId() + "\" ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTabstripEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:tabstrip>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" rtexprvalue="true"
	 * @return the cssclass
	 */
	public String getCssclass() {
		return cssclass;
	}
	/**
	 * @param cssclass the cssclass to set
	 */
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}
	/**
	 * @jsp.attribute required="false" rtexprvalue="true"
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
	 * @jsp.attribute required="false" rtexprvalue="true"
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
	 * @jsp.attribute required="false" rtexprvalue="true"
	 * @return the onclick
	 */
	public String getOnclick() {
		return onclick;
	}
	/**
	 * @param onclick the onclick to set
	 */
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	/**
	 * @jsp.attribute required="false" rtexprvalue="true"
	 * @return the onmouseout
	 */
	public String getOnmouseout() {
		return onmouseout;
	}
	/**
	 * @param onmouseout the onmouseout to set
	 */
	public void setOnmouseout(String onmouseout) {
		this.onmouseout = onmouseout;
	}
	/**
	 * @jsp.attribute required="false" rtexprvalue="true"
	 * @return the onmouseover
	 */
	public String getOnmouseover() {
		return onmouseover;
	}
	/**
	 * @param onmouseover the onmouseover to set
	 */
	public void setOnmouseover(String onmouseover) {
		this.onmouseover = onmouseover;
	}
	/**
	 * @jsp.attribute required="false" rtexprvalue="true"
	 * @return the tabindex
	 */
	public String getTabindex() {
		return tabindex;
	}
	/**
	 * @param tabindex the tabindex to set
	 */
	public void setTabindex(String tabindex) {
		this.tabindex = tabindex;
	}
	/**
	 * @jsp.attribute required="false" rtexprvalue="true"
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

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The componentcssurl attribute" 
	 * @return the componentcssurl
	 */
	public String getComponentcssurl() {
		return componentcssurl;
	}

	/**
	 * @param componentcssurl the componentcssurl to set
	 */
	public void setComponentcssurl(String componentcssurl) {
		this.componentcssurl = componentcssurl;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The componentjsurl attribute" 
	 * @return the componentjsurl
	 */
	public String getComponentjsurl() {
		return componentjsurl;
	}

	/**
	 * @param componentjsurl the componentjsurl to set
	 */
	public void setComponentjsurl(String componentjsurl) {
		this.componentjsurl = componentjsurl;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The toolkitjsurl attribute" 
	 * @return the toolkitjsurl
	 */
	public String getToolkitjsurl() {
		return toolkitjsurl;
	}

	/**
	 * @param toolkitjsurl the toolkitjsurl to set
	 */
	public void setToolkitjsurl(String toolkitjsurl) {
		this.toolkitjsurl = toolkitjsurl;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The autoinitialize attribute" 
	 * @return the autoinitialize
	 */
	public String getAutoinitialize() {
		return autoinitialize;
	}

	/**
	 * @param autoinitialize the autoinitialize to set
	 */
	public void setAutoinitialize(String autoinitialize) {
		this.autoinitialize = autoinitialize;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The includeresources attribute" 
	 * @return the includeresources
	 */
	public String getIncluderesources() {
		return includeresources;
	}

	/**
	 * @param includeresources the includeresources to set
	 */
	public void setIncluderesources(String includeresources) {
		this.includeresources = includeresources;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The theme attribute" 
	 * @return the theme
	 */
	public String getTheme() {
		return theme;
	}

	/**
	 * @param theme the theme to set
	 */
	public void setTheme(String theme) {
		this.theme = theme;
	}
	
}
