/**
 * 
 */
package com.nitobi.jsp.tabstrip;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="tab"
 * description="A tag to output a ntb:tab element"
 *
 */
public class Tab extends NitobiBodyTag
{
	private static final long serialVersionUID = 2946813065619138192L;
	private String width;
	private String tooltip;
	private String label;
	private String source;
	private String containertype;
	private String icon;
	private String cssclassname;
	private String scriptevaluationenabled;
	private String loadondemandenabled;
	private String hideoverflowenabled;
	private String onclick;
	private String onmouseout;
	private String onmouseover;
	private String onfocus;
	private String onblur;
	private String onactivate;
	private String ondeactivate;
	private String onload;
	
	public int doStartTag() throws JspException
	{
		writeTabStartTag();
		return SKIP_BODY;
	}
	
	public int doEndTag() throws JspException
	{
		writeTabEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTabStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:tab ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTabEndTag() throws JspException
	{
		try 
		{
			pageContext.getOut().print("</ntb:tab>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The containertype attribute" 
	 * @return the containertype
	 */
	public String getContainertype() {
		return containertype;
	}
	/**
	 * @param containertype the containertype to set
	 */
	public void setContainertype(String containertype) {
		this.containertype = containertype;
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
	 * 				  description="The hideoverflowenabled attribute" 
	 * @return the hideoverflowenabled
	 */
	public String getHideoverflowenabled() {
		return hideoverflowenabled;
	}
	/**
	 * @param hideoverflowenabled the hideoverflowenabled to set
	 */
	public void setHideoverflowenabled(String hideoverflowenabled) {
		this.hideoverflowenabled = hideoverflowenabled;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The icon attribute" 
	 * @return the icon
	 */
	public String getIcon() {
		return icon;
	}
	/**
	 * @param icon the icon to set
	 */
	public void setIcon(String icon) {
		this.icon = icon;
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
	 * 				  description="The loadondemandenabled attribute" 
	 * @return the loadondemandenabled
	 */
	public String getLoadondemandenabled() {
		return loadondemandenabled;
	}
	/**
	 * @param loadondemandenabled the loadondemandenabled to set
	 */
	public void setLoadondemandenabled(String loadondemandenabled) {
		this.loadondemandenabled = loadondemandenabled;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onactivate attribute" 
	 * @return the onactivate
	 */
	public String getOnactivate() {
		return onactivate;
	}
	/**
	 * @param onactivate the onactivate to set
	 */
	public void setOnactivate(String onactivate) {
		this.onactivate = onactivate;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onblur attribute" 
	 * @return the onblur
	 */
	public String getOnblur() {
		return onblur;
	}
	/**
	 * @param onblur the onblur to set
	 */
	public void setOnblur(String onblur) {
		this.onblur = onblur;
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
	 * 				  description="The ondeactivate attribute" 
	 * @return the ondeactivate
	 */
	public String getOndeactivate() {
		return ondeactivate;
	}
	/**
	 * @param ondeactivate the ondeactivate to set
	 */
	public void setOndeactivate(String ondeactivate) {
		this.ondeactivate = ondeactivate;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onfocus attribute" 
	 * @return the onfocus
	 */
	public String getOnfocus() {
		return onfocus;
	}
	/**
	 * @param onfocus the onfocus to set
	 */
	public void setOnfocus(String onfocus) {
		this.onfocus = onfocus;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onload attribute" 
	 * @return the onload
	 */
	public String getOnload() {
		return onload;
	}
	/**
	 * @param onload the onload to set
	 */
	public void setOnload(String onload) {
		this.onload = onload;
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
	 * 				  description="The scriptevaluationenabled attribute" 
	 * @return the scriptevaluationenabled
	 */
	public String getScriptevaluationenabled() {
		return scriptevaluationenabled;
	}
	/**
	 * @param scriptevaluationenabled the scriptevaluationenabled to set
	 */
	public void setScriptevaluationenabled(String scriptevaluationenabled) {
		this.scriptevaluationenabled = scriptevaluationenabled;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The source attribute" 
	 * @return the source
	 */
	public String getSource() {
		return source;
	}
	/**
	 * @param source the source to set
	 */
	public void setSource(String source) {
		this.source = source;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The tooltip attribute" 
	 * @return the tooltip
	 */
	public String getTooltip() {
		return tooltip;
	}
	/**
	 * @param tooltip the tooltip to set
	 */
	public void setTooltip(String tooltip) {
		this.tooltip = tooltip;
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
