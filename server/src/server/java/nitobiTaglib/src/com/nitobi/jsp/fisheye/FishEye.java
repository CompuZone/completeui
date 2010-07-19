/**
 * 
 */
package com.nitobi.jsp.fisheye;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiComponentTag;
import com.nitobi.jsp.global.Globals;

/**
 * @author mhan
 * @jsp.tag name="fisheye"
 * description="The Nitobi FishEye component.
 * It will automatically include the necessary javascript and stylesheet.
 * By default, the javascript files will be loaded from ./resources/nitobi/script/ and
 * the stylesheet from ./resources/nitobi/style/"
 *
 */
public class FishEye extends NitobiComponentTag 
{
	private static final long serialVersionUID = -3460285551950894716L;
	private String id;
	private String growpercent = "200";
	private String opendirection = "up";
	private String expanddirection = "right";
	private String iconwidth = "40";
	private String theme;
	
	private String includeresources = "true";
	private String autoinitialize = "true";
	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.fisheye.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.fisheye.css";
	
	public int doStartTag() throws JspException
	{
		if (getIncluderesources() == "true")
		{
			writeScriptTags("fisheye");
			writeStyleTag("fisheye");
		}
		if (getAutoinitialize() == "true")
		{
			writeInitScript();
		}
		writeFishEyeStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeFishEyeEndTag();

		return EVAL_PAGE;
	}
	
	private void writeFishEyeStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().println("<?XML:NAMESPACE prefix=\"ntb\" />");
			pageContext.getOut().print("<ntb:fisheye ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeFishEyeEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:fisheye>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The expanddirection attribute" 
	 * @return the expanddirection
	 */
	public String getExpanddirection() {
		return expanddirection;
	}
	/**
	 * @param expanddirection the expanddirection to set
	 */
	public void setExpanddirection(String expanddirection) {
		this.expanddirection = expanddirection;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The growpercent attribute" 
	 * @return the growpercent
	 */
	public String getGrowpercent() {
		return growpercent;
	}
	/**
	 * @param growpercent the growpercent to set
	 */
	public void setGrowpercent(String growpercent) {
		this.growpercent = growpercent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The iconwidth attribute" 
	 * @return the iconwidth
	 */
	public String getIconwidth() {
		return iconwidth;
	}
	/**
	 * @param iconwidth the iconwidth to set
	 */
	public void setIconwidth(String iconwidth) {
		this.iconwidth = iconwidth;
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
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The opendirection attribute" 
	 * @return the opendirection
	 */
	public String getOpendirection() {
		return opendirection;
	}
	/**
	 * @param opendirection the opendirection to set
	 */
	public void setOpendirection(String opendirection) {
		this.opendirection = opendirection;
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
