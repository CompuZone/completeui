/**
 * 
 */
package com.nitobi.jsp.calendar;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.global.Globals;
import com.nitobi.jsp.NitobiComponentTag;

/**
 * @author mhan
 * @jsp.tag name="datepicker"
 *
 */
public class DatePicker extends NitobiComponentTag
{
	private String id;
	private String theme;
	private String mindate;
	private String maxdate;
	private String selecteddate;
	private String submitmask;
	private String eventsurl;
	private String longmonthnames;
	private String shortmonthnames;
	private String longdaynames;
	private String shortdaynames;
	private String mindaynames;
	private String navconfirmtext;
	private String navcanceltext;
	private String navinvalidyeartext;
	private String navoutofrangetext;
	private String shimenabled;
	
	private String onsetinvaliddate;
	private String onsetoutofrangedate;
	private String onsetdisableddate;
	private String ondateselected;
	private String oneventdateselected;
	
	
	private String includeresources = "true";
	private String autoinitialize = "true";
	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.calendar.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.calendar.css";
	
	public int doStartTag() throws JspException 
	{
		if (getIncluderesources() == "true")
		{
			writeScriptTags("datepicker");
			writeStyleTag("datepicker");
		}
		if (getAutoinitialize() == "true")
		{
			writeInitScript();
		}
		writeDatePickerStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException 
	{
		writeDatePickerEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDatePickerStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().println("<?XML:NAMESPACE prefix=\"ntb\" />");
			pageContext.getOut().print("<ntb:datepicker ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (Exception e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeDatePickerEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:datepicker>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
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

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The mindate attribute" 
	 * @return the mindate
	 */
	public String getMindate() {
		return mindate;
	}

	/**
	 * @param mindate the mindate to set
	 */
	public void setMindate(String mindate) {
		this.mindate = mindate;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The maxdate attribute" 
	 * @return the maxdate
	 */
	public String getMaxdate() {
		return maxdate;
	}

	/**
	 * @param maxdate the maxdate to set
	 */
	public void setMaxdate(String maxdate) {
		this.maxdate = maxdate;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The selecteddate attribute" 
	 * @return the selecteddate
	 */
	public String getSelecteddate() {
		return selecteddate;
	}

	/**
	 * @param selecteddate the selecteddate to set
	 */
	public void setSelecteddate(String selecteddate) {
		this.selecteddate = selecteddate;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The submitmask attribute" 
	 * @return the submitmask
	 */
	public String getSubmitmask() {
		return submitmask;
	}

	/**
	 * @param submitmask the submitmask to set
	 */
	public void setSubmitmask(String submitmask) {
		this.submitmask = submitmask;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The eventsurl attribute" 
	 * @return the eventsurl
	 */
	public String getEventsurl() {
		return eventsurl;
	}

	/**
	 * @param eventsurl the eventsurl to set
	 */
	public void setEventsurl(String eventsurl) {
		this.eventsurl = eventsurl;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The longmonthnames attribute" 
	 * @return the longmonthnames
	 */
	public String getLongmonthnames() {
		return longmonthnames;
	}

	/**
	 * @param longmonthnames the longmonthnames to set
	 */
	public void setLongmonthnames(String longmonthnames) {
		this.longmonthnames = longmonthnames;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The shortmonthnames attribute" 
	 * @return the shortmonthnames
	 */
	public String getShortmonthnames() {
		return shortmonthnames;
	}

	/**
	 * @param shortmonthnames the shortmonthnames to set
	 */
	public void setShortmonthnames(String shortmonthnames) {
		this.shortmonthnames = shortmonthnames;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The longdaynames attribute" 
	 * @return the longdaynames
	 */
	public String getLongdaynames() {
		return longdaynames;
	}

	/**
	 * @param longdaynames the longdaynames to set
	 */
	public void setLongdaynames(String longdaynames) {
		this.longdaynames = longdaynames;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The shortdaynames attribute" 
	 * @return the shortdaynames
	 */
	public String getShortdaynames() {
		return shortdaynames;
	}

	/**
	 * @param shortdaynames the shortdaynames to set
	 */
	public void setShortdaynames(String shortdaynames) {
		this.shortdaynames = shortdaynames;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The mindaynames attribute" 
	 * @return the mindaynames
	 */
	public String getMindaynames() {
		return mindaynames;
	}

	/**
	 * @param mindaynames the mindaynames to set
	 */
	public void setMindaynames(String mindaynames) {
		this.mindaynames = mindaynames;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The navconfirmtext attribute" 
	 * @return the navconfirmtext
	 */
	public String getNavconfirmtext() {
		return navconfirmtext;
	}

	/**
	 * @param navconfirmtext the navconfirmtext to set
	 */
	public void setNavconfirmtext(String navconfirmtext) {
		this.navconfirmtext = navconfirmtext;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The navcanceltext attribute" 
	 * @return the navcanceltext
	 */
	public String getNavcanceltext() {
		return navcanceltext;
	}

	/**
	 * @param navcanceltext the navcanceltext to set
	 */
	public void setNavcanceltext(String navcanceltext) {
		this.navcanceltext = navcanceltext;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The navinvalidyeartext attribute" 
	 * @return the navinvalidyeartext
	 */
	public String getNavinvalidyeartext() {
		return navinvalidyeartext;
	}

	/**
	 * @param navinvalidyeartext the navinvalidyeartext to set
	 */
	public void setNavinvalidyeartext(String navinvalidyeartext) {
		this.navinvalidyeartext = navinvalidyeartext;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The navoutofrangetext attribute" 
	 * @return the navoutofrangetext
	 */
	public String getNavoutofrangetext() {
		return navoutofrangetext;
	}

	/**
	 * @param navoutofrangetext the navoutofrangetext to set
	 */
	public void setNavoutofrangetext(String navoutofrangetext) {
		this.navoutofrangetext = navoutofrangetext;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The shimenabled attribute" 
	 * @return the shimenabled
	 */
	public String getShimenabled() {
		return shimenabled;
	}

	/**
	 * @param shimenabled the shimenabled to set
	 */
	public void setShimenabled(String shimenabled) {
		this.shimenabled = shimenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onsetinvaliddate attribute" 
	 * @return the onsetinvaliddate
	 */
	public String getOnsetinvaliddate() {
		return onsetinvaliddate;
	}

	/**
	 * @param onsetinvaliddate the onsetinvaliddate to set
	 */
	public void setOnsetinvaliddate(String onsetinvaliddate) {
		this.onsetinvaliddate = onsetinvaliddate;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onsetoutofrangedate attribute" 
	 * @return the onsetoutofrangedate
	 */
	public String getOnsetoutofrangedate() {
		return onsetoutofrangedate;
	}

	/**
	 * @param onsetoutofrangedate the onsetoutofrangedate to set
	 */
	public void setOnsetoutofrangedate(String onsetoutofrangedate) {
		this.onsetoutofrangedate = onsetoutofrangedate;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onsetdisableddate attribute" 
	 * @return the onsetdisableddate
	 */
	public String getOnsetdisableddate() {
		return onsetdisableddate;
	}

	/**
	 * @param onsetdisableddate the onsetdisableddate to set
	 */
	public void setOnsetdisableddate(String onsetdisableddate) {
		this.onsetdisableddate = onsetdisableddate;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ondateselected attribute" 
	 * @return the ondateselected
	 */
	public String getOndateselected() {
		return ondateselected;
	}

	/**
	 * @param ondateselected the ondateselected to set
	 */
	public void setOndateselected(String ondateselected) {
		this.ondateselected = ondateselected;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oneventdateselected attribute" 
	 * @return the oneventdateselected
	 */
	public String getOneventdateselected() {
		return oneventdateselected;
	}

	/**
	 * @param oneventdateselected the oneventdateselected to set
	 */
	public void setOneventdateselected(String oneventdateselected) {
		this.oneventdateselected = oneventdateselected;
	}
}
