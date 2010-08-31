/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @author mhan
 * @jsp.tag name="combolist" 
 * description="A tag to output an ntb:ComboList element"
 *
 */
public class ComboList extends NitobiBodyTag 
{
	private static final long serialVersionUID = 1684824821205985024L;
	private String allowpaging;
	private String backgroundhighlightcolor;
	private String cliplength;
	private String customhtmldefinition;
	private String customhtmlheader;
	private String datasourceurl;
	private String foregroundhighlightcolor;
	private String fuzzysearchenabled;
	private String height;
	private String highlightcssclassname;
	private String pagesize;
	private String width;
	private String onaftersearchevent;
	private String onbeforesearchevent;
	private String onhideevent;
	private String onshowevent;
	
	public int doStartTag() throws JspException
	{
		writeComboListStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeComboListEndTag();
		return EVAL_PAGE;
	}
	
	private void writeComboListStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:ComboList ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		} 
		catch (java.io.IOException e) 
		{
			throw new JspException(e);
		}
	}
	
	private void writeComboListEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:ComboList>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The allowpaging attribute" 
	 * @return the allowpaging
	 */
	public String getAllowpaging() {
		return allowpaging;
	}
	/**
	 * @param allowpaging the allowpaging to set
	 */
	public void setAllowpaging(String allowpaging) {
		this.allowpaging = allowpaging;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The backgroundhighlightcolor attribute" 
	 * @return the backgroundhighlightcolor
	 */
	public String getBackgroundhighlightcolor() {
		return backgroundhighlightcolor;
	}
	/**
	 * @param backgroundhighlightcolor the backgroundhighlightcolor to set
	 */
	public void setBackgroundhighlightcolor(String backgroundhightlightcolor) {
		this.backgroundhighlightcolor = backgroundhightlightcolor;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The customhtmldefinition attribute" 
	 * @return the customhtmldefinition
	 */
	public String getCustomhtmldefinition() {
		return customhtmldefinition;
	}
	/**
	 * @param customhtmldefinition the customhtmldefinition to set
	 */
	public void setCustomhtmldefinition(String customhtmldefinition) {
		this.customhtmldefinition = customhtmldefinition;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The customhtmlheader attribute" 
	 * @return the customhtmlheader
	 */
	public String getCustomhtmlheader() {
		return customhtmlheader;
	}
	/**
	 * @param customhtmlheader the customhtmlheader to set
	 */
	public void setCustomhtmlheader(String customhtmlheader) {
		this.customhtmlheader = customhtmlheader;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The datasourceurl attribute" 
	 * @return the datasourceurl
	 */
	public String getDatasourceurl() {
		return datasourceurl;
	}
	/**
	 * @param datasourceurl the datasourceurl to set
	 */
	public void setDatasourceurl(String datasourceurl) {
		this.datasourceurl = datasourceurl;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The foregroundhighlightcolor attribute" 
	 * @return the foregroundhighlightcolor
	 */
	public String getForegroundhighlightcolor() {
		return foregroundhighlightcolor;
	}
	/**
	 * @param foregroundhighlightcolor the foregroundhighlightcolor to set
	 */
	public void setForegroundhighlightcolor(String foregroundhighlightcolor) {
		this.foregroundhighlightcolor = foregroundhighlightcolor;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The fuzzysearchenabled attribute" 
	 * @return the fuzzysearchenabled
	 */
	public String getFuzzysearchenabled() {
		return fuzzysearchenabled;
	}
	/**
	 * @param fuzzysearchenabled the fuzzysearchenabled to set
	 */
	public void setFuzzysearchenabled(String fuzzysearchenabled) {
		this.fuzzysearchenabled = fuzzysearchenabled;
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
	 * 				  description="The highlightcssclassname attribute" 
	 * @return the highlightcssclassname
	 */
	public String getHighlightcssclassname() {
		return highlightcssclassname;
	}
	/**
	 * @param highlightcssclassname the highlightcssclassname to set
	 */
	public void setHighlightcssclassname(String highlightcssclassname) {
		this.highlightcssclassname = highlightcssclassname;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onaftersearchevent attribute" 
	 * @return the onaftersearchevent
	 */
	public String getOnaftersearchevent() {
		return onaftersearchevent;
	}
	/**
	 * @param onaftersearchevent the onaftersearchevent to set
	 */
	public void setOnaftersearchevent(String onaftersearchevent) {
		this.onaftersearchevent = onaftersearchevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforesearchevent attribute" 
	 * @return the onbeforesearchevent
	 */
	public String getOnbeforesearchevent() {
		return onbeforesearchevent;
	}
	/**
	 * @param onbeforesearchevent the onbeforesearchevent to set
	 */
	public void setOnbeforesearchevent(String onbeforesearchevent) {
		this.onbeforesearchevent = onbeforesearchevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onhideevent attribute" 
	 * @return the onhideevent
	 */
	public String getOnhideevent() {
		return onhideevent;
	}
	/**
	 * @param onhideevent the onhideevent to set
	 */
	public void setOnhideevent(String onhideevent) {
		this.onhideevent = onhideevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onshowevent attribute" 
	 * @return the onshowevent
	 */
	public String getOnshowevent() {
		return onshowevent;
	}
	/**
	 * @param onshowevent the onshowevent to set
	 */
	public void setOnshowevent(String onshowevent) {
		this.onshowevent = onshowevent;
	}
	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The pagesize attribute" 
	 * @return the pagesize
	 */
	public String getPagesize() {
		return pagesize;
	}
	/**
	 * @param pagesize the pagesize to set
	 */
	public void setPagesize(String pagesize) {
		this.pagesize = pagesize;
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
	 * 				  description="The cliplength attribute" 
	 * @return the cliplength
	 */
	public String getCliplength() {
		return cliplength;
	}

	/**
	 * @param cliplength the cliplength to set
	 */
	public void setCliplength(String cliplength) {
		this.cliplength = cliplength;
	}
}
