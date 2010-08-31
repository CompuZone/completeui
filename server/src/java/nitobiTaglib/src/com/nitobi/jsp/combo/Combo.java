/**
 * 
 */
package com.nitobi.jsp.combo;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiComponentTag;
import com.nitobi.jsp.global.Globals;

/**
 * @author mhan
 * @jsp.tag name="combo" 
 * description="The Nitobi ComboBox component.  
 * It will automatically include the necessary javascript and stylesheet.
 * By default, the javascript files will be loaded from ./resources/nitobi/script/ and
 * the stylesheet from ./resources/nitobi/style/"
 * 
 */
public class Combo extends NitobiComponentTag 
{
	private static final long serialVersionUID = -9190960383842118423L;
	private String id;
	private String cssclassname;
	private String datatextfield;
	private String datavaluefield;
	private String disabledwarningmessages;
	private String enabled;
	private String errorlevel;
	private String height;
	private String httprequestmethod;
	private String initialsearch;
	private String listzindex;
	private String mode;
	private String smartlistseparator;
	private String tabindex;
	private String width;
	private String theme;
	
	private String includeresources = "true";
	private String autoinitialize = "true";
	
	private String onbeforeselectevent;
	private String onblurevent;
	private String onfocusevent;
	private String onloadevent;
	private String onselectevent;
	private String ontabevent;
	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.combo.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.combo.css";

	public int doStartTag() throws JspException 
	{
		if (getIncluderesources() == "true")
		{
			writeScriptTags("combo");
			writeStyleTag("combo");
		}
		if (getAutoinitialize() == "true")
		{
			writeInitScript();
		}
		writeComboStartTag();

		return EVAL_BODY_INCLUDE;
	}

	public int doEndTag() throws JspException 
	{
		writeComboEndTag();
		return EVAL_PAGE;
	}

	private void writeComboStartTag() throws JspException 
	{
		try {
			pageContext.getOut().println("<?XML:NAMESPACE prefix=\"ntb\" />");
			pageContext.getOut().print("<ntb:Combo ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		} 
		catch (java.io.IOException e) 
		{
			throw new JspException(e);
		}
	}

	private void writeComboEndTag() throws JspException {
		try 
		{
			pageContext.getOut().println("</ntb:Combo>");
		} 
		catch (java.io.IOException e) 
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                cssclassname attribute"
	 * @return the cssclassname
	 */
	public String getCssclassname() {
		return cssclassname;
	}

	/**
	 * @param cssclassname
	 *            the cssclassname to set
	 */
	public void setCssclassname(String cssclassname) {
		this.cssclassname = cssclassname;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                datatextfield attribute"
	 * @return the datatextfield
	 */
	public String getDatatextfield() {
		return datatextfield;
	}

	/**
	 * @param datatextfield
	 *            the datatextfield to set
	 */
	public void setDatatextfield(String datatextfield) {
		this.datatextfield = datatextfield;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                datavaluefield attribute"
	 * @return the datavaluefield
	 */
	public String getDatavaluefield() {
		return datavaluefield;
	}

	/**
	 * @param datavaluefield
	 *            the datavaluefield to set
	 */
	public void setDatavaluefield(String datavaluefield) {
		this.datavaluefield = datavaluefield;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                disabledwarningmessages attribute"
	 * @return the disabledwarningmessages
	 */
	public String getDisabledwarningmessages() {
		return disabledwarningmessages;
	}

	/**
	 * @param disabledwarningmessages
	 *            the disabledwarningmessages to set
	 */
	public void setDisabledwarningmessages(String disabledwarningmessages) {
		this.disabledwarningmessages = disabledwarningmessages;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                enabled attribute"
	 * @return the enabled
	 */
	public String getEnabled() {
		return enabled;
	}

	/**
	 * @param enabled
	 *            the enabled to set
	 */
	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                errorlevel attribute"
	 * @return the errorlevel
	 */
	public String getErrorlevel() {
		return errorlevel;
	}

	/**
	 * @param errorlevel
	 *            the errorlevel to set
	 */
	public void setErrorlevel(String errorlevel) {
		this.errorlevel = errorlevel;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                height attribute"
	 * @return the height
	 */
	public String getHeight() {
		return height;
	}

	/**
	 * @param height
	 *            the height to set
	 */
	public void setHeight(String height) {
		this.height = height;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                httprequestmethod attribute"
	 * @return the httprequestmethod
	 */
	public String getHttprequestmethod() {
		return httprequestmethod;
	}

	/**
	 * @param httprequestmethod
	 *            the httprequestmethod to set
	 */
	public void setHttprequestmethod(String httprequestmethod) {
		this.httprequestmethod = httprequestmethod;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                listzindex attribute"
	 * @return the listzindex
	 */
	public String getListzindex() {
		return listzindex;
	}

	/**
	 * @param listzindex
	 *            the listzindex to set
	 */
	public void setListzindex(String listzindex) {
		this.listzindex = listzindex;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The mode
	 *                attribute"
	 * @return the mode
	 */
	public String getMode() {
		return mode;
	}

	/**
	 * @param mode
	 *            the mode to set
	 */
	public void setMode(String mode) {
		this.mode = mode;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                onbeforeselectevent attribute"
	 * @return the onbeforeselectevent
	 */
	public String getOnbeforeselectevent() {
		return onbeforeselectevent;
	}

	/**
	 * @param onbeforeselectevent
	 *            the onbeforeselectevent to set
	 */
	public void setOnbeforeselectevent(String onbeforeselectevent) {
		this.onbeforeselectevent = onbeforeselectevent;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                onblurevent attribute"
	 * @return the onblurevent
	 */
	public String getOnblurevent() {
		return onblurevent;
	}

	/**
	 * @param onblurevent
	 *            the onblurevent to set
	 */
	public void setOnblurevent(String onblurevent) {
		this.onblurevent = onblurevent;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                onfocusevent attribute"
	 * @return the onfocusevent
	 */
	public String getOnfocusevent() {
		return onfocusevent;
	}

	/**
	 * @param onfocusevent
	 *            the onfocusevent to set
	 */
	public void setOnfocusevent(String onfocusevent) {
		this.onfocusevent = onfocusevent;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                onloadevent attribute"
	 * @return the onloadevent
	 */
	public String getOnloadevent() {
		return onloadevent;
	}

	/**
	 * @param onloadevent
	 *            the onloadevent to set
	 */
	public void setOnloadevent(String onloadevent) {
		this.onloadevent = onloadevent;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                onselectevent attribute"
	 * @return the onselectevent
	 */
	public String getOnselectevent() {
		return onselectevent;
	}

	/**
	 * @param onselectevent
	 *            the onselectevent to set
	 */
	public void setOnselectevent(String onselectevent) {
		this.onselectevent = onselectevent;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                ontabevent attribute"
	 * @return the ontabevent
	 */
	public String getOntabevent() {
		return ontabevent;
	}

	/**
	 * @param ontabevent
	 *            the ontabevent to set
	 */
	public void setOntabevent(String ontabevent) {
		this.ontabevent = ontabevent;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                smartlistseparator attribute"
	 * @return the smartlistseparator
	 */
	public String getSmartlistseparator() {
		return smartlistseparator;
	}

	/**
	 * @param smartlistseparator
	 *            the smartlistseparator to set
	 */
	public void setSmartlistseparator(String smartlistseparator) {
		this.smartlistseparator = smartlistseparator;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                tabindex attribute"
	 * @return the tabindex
	 */
	public String getTabindex() {
		return tabindex;
	}

	/**
	 * @param tabindex
	 *            the tabindex to set
	 */
	public void setTabindex(String tabindex) {
		this.tabindex = tabindex;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                width attribute"
	 * @return the width
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * @param width
	 *            the width to set
	 */
	public void setWidth(String width) {
		this.width = width;
	}

	/**
	 * @jsp.attribute required="true" rtexprvalue="true" description="The id
	 *                attribute"
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @jsp.attribute required="false" rtexprvalue="true" description="The
	 *                initialsearch attribute"
	 * @return the initialsearch
	 */
	public String getInitialsearch() {
		return initialsearch;
	}

	/**
	 * @param initialsearch
	 *            the initialsearch to set
	 */
	public void setInitialsearch(String initialsearch) {
		this.initialsearch = initialsearch;
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
