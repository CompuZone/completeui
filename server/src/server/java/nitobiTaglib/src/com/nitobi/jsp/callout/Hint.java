package com.nitobi.jsp.callout;

import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;

import com.nitobi.jsp.global.Globals;

/**
 * @author mhan
 * @jsp.tag name="hint" 
 * description="A tag to attach a hint to a DOM node"
 * 
 */
public class Hint extends TagSupport
{
	private static final long serialVersionUID = -1764177777521055097L;
	private String target;
	private String title;
	private String body;
	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.callout.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.callout.css";
	
	public int doStartTag() throws JspException
	{
		writeScriptTags();
		writeStyleTag();
		writeHintStartTag();
		return SKIP_BODY;
	}
	
	private void writeHintStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<script>");
			
			if (pageContext.getAttribute("hintobject") == null)
			{
				pageContext.getOut().print("var myToolTips = new nitobi.callout.Hint();");
				pageContext.setAttribute("hintobject", "true");
			}
			pageContext.getOut().print("myToolTips.addHint(\"" + this.target + "\", ");
			if (getTitle() != null)
			{
				pageContext.getOut().print("\"" + getTitle() + "\", ");
			}
			if (getBody() != null)
			{
				pageContext.getOut().print("\"" + getBody() + "\");");
			}
			pageContext.getOut().print("</script>");
		} 
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeScriptTags() throws JspException
	{
		try 
		{
			// TODO: Need to make sure the attributes used here are unique and won't conflict
			// with user generated attributes
			if (pageContext.getAttribute("toolkitscript") == null)
			{
				pageContext.getOut().println("<script type=\"text/javascript\" src=\"" + getToolkitjsurl() + "\"></script>");
				pageContext.setAttribute("toolkitscript", "true");
			}
			if (pageContext.getAttribute("calloutscript") == null)
			{
				pageContext.getOut().println("<script type=\"text/javascript\" src=\"" + getComponentjsurl() + "\"></script>");
				pageContext.setAttribute("calloutscript", "true");
			}
		} 
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeStyleTag() throws JspException
	{
		try 
		{
			if (pageContext.getAttribute("calloutstyle") == null)
			{
				pageContext.getOut().println("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + getComponentcssurl() + "\"></link>");
				pageContext.setAttribute("calloutstyle", "true");
			}

		} 
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The body attribute" 
	 * @return the body
	 */
	public String getBody() {
		return body;
	}
	/**
	 * @param body the body to set
	 */
	public void setBody(String body) {
		this.body = body;
	}
	/**
	 * @jsp.attribute required="true" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The target attribute" 
	 * @return the target
	 */
	public String getTarget() {
		return target;
	}
	/**
	 * @param target the target to set
	 */
	public void setTarget(String target) {
		this.target = target;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The title attribute" 
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
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
}
