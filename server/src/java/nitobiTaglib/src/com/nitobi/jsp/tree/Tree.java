package com.nitobi.jsp.tree;
import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiComponentTag;

import com.nitobi.jsp.global.Globals;

/**
 * @jsp.tag name="tree"
 * description="The Nitobi Tree component.
 * It will automatically include the necessary javascript and stylesheet.
 * By default, the javascript files will be loaded from ./resources/nitobi/script/ and
 * the stylesheet from ./resources/nitobi/style/"
 * @author mhan
 *
 */
public class Tree extends NitobiComponentTag
{
	private static final long serialVersionUID = 4439720300299388522L;
	private String id;
	private String gethandler;
	private String cssclass = "folders";
	private String rootenabled = "false";
	private String hoverhighlight = "true";
	private String targetframe;
	private String cssstyle;
	private String expanded = "false";
	private String theme;
	
	private String includeresources = "true";
	private String autoinitialize = "true";
	
	private String onclick;
	private String ondeselect;
	private String onselect;
	private String onmouseover;
	private String onmouseout;
	private String ondataready;
	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.tree.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.tree.css";
	
	public int doStartTag() throws JspException
	{
		if (getIncluderesources() == "true")
		{
			writeScriptTags("tree");
			writeStyleTag("tree");
		}
		if (getAutoinitialize() == "true")
		{
			writeInitScript();
		}
		writeTreeStartTag();
		return EVAL_BODY_INCLUDE;	
	}
	
	public int doEndTag() throws JspException
	{
		writeTreeEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTreeStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().println("<?XML:NAMESPACE prefix=\"ntb\" />");
			pageContext.getOut().print("<ntb:tree ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTreeEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:tree>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The cssclass attribute" 
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
	 * 				  description="The expanded attribute" 
	 * @return the expanded
	 */
	public String getExpanded() {
		return expanded;
	}

	/**
	 * @param expanded the expanded to set
	 */
	public void setExpanded(String expanded) {
		this.expanded = expanded;
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
	 * 				  description="The hoverhighlight attribute" 
	 * @return the hoverhighlight
	 */
	public String getHoverhighlight() {
		return hoverhighlight;
	}

	/**
	 * @param hoverhighlight the hoverhighlight to set
	 */
	public void setHoverhighlight(String hoverhighlight) {
		this.hoverhighlight = hoverhighlight;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onclick attribute" 
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
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ondataready attribute" 
	 * @return the ondataready
	 */
	public String getOndataready() {
		return ondataready;
	}

	/**
	 * @param ondataready the ondataready to set
	 */
	public void setOndataready(String ondataready) {
		this.ondataready = ondataready;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ondeselect attribute" 
	 * @return the ondeselect
	 */
	public String getOndeselect() {
		return ondeselect;
	}

	/**
	 * @param ondeselect the ondeselect to set
	 */
	public void setOndeselect(String ondeselect) {
		this.ondeselect = ondeselect;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseout attribute" 
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
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseover attribute" 
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
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onselect attribute" 
	 * @return the onselect
	 */
	public String getOnselect() {
		return onselect;
	}

	/**
	 * @param onselect the onselect to set
	 */
	public void setOnselect(String onselect) {
		this.onselect = onselect;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rootenabled attribute" 
	 * @return the rootenabled
	 */
	public String getRootenabled() {
		return rootenabled;
	}

	/**
	 * @param rootenabled the rootenabled to set
	 */
	public void setRootenabled(String rootenabled) {
		this.rootenabled = rootenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The targetframe attribute" 
	 * @return the targetframe
	 */
	public String getTargetframe() {
		return targetframe;
	}

	/**
	 * @param targetframe the targetframe to set
	 */
	public void setTargetframe(String targetframe) {
		this.targetframe = targetframe;
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
