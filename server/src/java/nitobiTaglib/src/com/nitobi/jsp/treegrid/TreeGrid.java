/**
 * 
 */
package com.nitobi.jsp.treegrid;

import javax.servlet.jsp.JspException;

import com.nitobi.jsp.NitobiComponentTag;
import com.nitobi.jsp.global.Globals;

/**
 * @author mhan
 * @jsp.tag name="treegrid"
 * description="The Nitobi Tree Grid component.
 * It will automatically include the necessary javascript and stylesheet.
 * By default, the javascript files will be loaded from ./resources/nitobi/script/ and
 * the stylesheet from ./resources/nitobi/style/"
 *
 */
public class TreeGrid extends NitobiComponentTag {

	private String id;
	private String datasourceid;
	private String columnindicatorsenabled;
	private String toolbarenabled;
	private String frozenleftcolumncount;
	private String rowdeleteenabled;
	private String rowinsertenabled;
	private String autosaveenabled;
	private String rowsperpage;
	private String height;
	private String width;
	private String keygenerator;
	private String gethandler;
	private String savehandler;
	private String version;
	private String mode;
	private String livescrollingmode;
	private String copyenabled;
	private String pasteenabled;
	private String sortenabled;
	private String gridresizeenabled;
	private String rowheight;
	private String headerheight;
	private String sortmode;
	private String entertab;
	private String rowselectenabled;
	private String multirowselectenabled;
	private String selectedrows;
	private String rowhighlightenabled;
	private String widthfixed;
	private String heightfixed;
	private String minwidth;
	private String minheight;
	private String theme;
	private String tooltipsenabled;
	private String dragfillenabled;
	private String cellborder;
	private String toolbarheight;
	
	private String effectsenabled;
	private String groupoffset;
	private String rootcolumns;
	
	
	private String includeresources = "true";
	private String autoinitialize = "true";
	
	private String oncellclickevent;
	private String ondatareadyevent;
	private String oncelldoubleclickevent;
	private String onbeforeloadpreviouspageevent;
	private String onbeforeloadnextpageevent;
	private String onbeforeloaddatapageevent;
	private String onafterloadpreviouspageevent;
	private String onafterloadnextpageevent;
	private String onafterloaddatapageevent;
	private String onbeforeresizeevent;
	private String onafterresizeevent;
	private String onhandlererrorevent;
	private String onbeforerefreshevent;
	private String onafterrefreshevent;
	private String onbeforecelleditevent;
	private String onbeforerowinsertevent;
	private String onafterrowinsertevent;
	private String onbeforesortevent;
	private String onaftersortevent;
	private String onbeforesaveevent;
	private String onaftersaveevent;
	private String onrowblurevent;
	private String oncellfocusevent;
	private String onafterrowdeleteevent;
	private String onbeforerowdeleteevent;
	private String oncellupdateevent;
	private String onrowfocusevent;
	private String onbeforecopyevent;
	private String onaftercopyevent;
	private String onbeforepasteevent;
	private String onafterpasteevent;
	private String onerrorevent;
	private String oncontextmenuevent;
	private String onhtmlreadyevent;
	private String onhitrowstartevent;
	private String onafterdragfillevent;
	private String onbeforedragfillevent;
	private String onfocusevent;
	private String onbeforecellclick;
	private String ondatarenderevent;
	private String oncellblurevent;
	private String oncellvalidateevent;
	private String onmouseoverevent;
	private String onmouseoutevent;
	private String onmousemoveevent;
	private String onhitrowendevent;

	
	private String toolkitjsurl = Globals.SCRIPTPATH + "nitobi.toolkit.js";
	private String componentjsurl = Globals.SCRIPTPATH + "nitobi.treegrid.js";
	private String componentcssurl = Globals.STYLEPATH + "nitobi.treegrid.css";
	
	public int doStartTag() throws JspException
	{
		if (getIncluderesources() == "true")
		{
			writeScriptTags("treegrid");
			writeStyleTag("treegrid");
		}
		if (getAutoinitialize() == "true")
		{
			writeInitScript();
		}
		writeTreeGridStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeTreeGridEndTag();
		return EVAL_PAGE;
	}
	
	private void writeTreeGridStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().println("<?XML:NAMESPACE prefix=\"ntb\" />");
			pageContext.getOut().print("<ntb:treegrid ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeTreeGridEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:treegrid>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
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
	public String getComponentcssurl() {
		return componentcssurl;
	}

	public String getComponentjsurl() {
		return componentjsurl;
	}

	public String getToolkitjsurl() {
		return toolkitjsurl;
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
	 * 				  description="The datasourceid attribute" 
	 * @return the datasourceid
	 */
	public String getDatasourceid() {
		return datasourceid;
	}

	/**
	 * @param datasourceid the datasourceid to set
	 */
	public void setDatasourceid(String datasourceid) {
		this.datasourceid = datasourceid;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The columnindicatorsenabled attribute" 
	 * @return the columnindicatorsenabled
	 */
	public String getColumnindicatorsenabled() {
		return columnindicatorsenabled;
	}

	/**
	 * @param columnindicatorsenabled the columnindicatorsenabled to set
	 */
	public void setColumnindicatorsenabled(String columnindicatorsenabled) {
		this.columnindicatorsenabled = columnindicatorsenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The toolbarenabled attribute" 
	 * @return the toolbarenabled
	 */
	public String getToolbarenabled() {
		return toolbarenabled;
	}

	/**
	 * @param toolbarenabled the toolbarenabled to set
	 */
	public void setToolbarenabled(String toolbarenabled) {
		this.toolbarenabled = toolbarenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The frozenleftcolumncount attribute" 
	 * @return the frozenleftcolumncount
	 */
	public String getFrozenleftcolumncount() {
		return frozenleftcolumncount;
	}

	/**
	 * @param frozenleftcolumncount the frozenleftcolumncount to set
	 */
	public void setFrozenleftcolumncount(String frozenleftcolumncount) {
		this.frozenleftcolumncount = frozenleftcolumncount;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rowdeleteenabled attribute" 
	 * @return the rowdeleteenabled
	 */
	public String getRowdeleteenabled() {
		return rowdeleteenabled;
	}

	/**
	 * @param rowdeleteenabled the rowdeleteenabled to set
	 */
	public void setRowdeleteenabled(String rowdeleteenabled) {
		this.rowdeleteenabled = rowdeleteenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rowinsertenabled attribute" 
	 * @return the rowinsertenabled
	 */
	public String getRowinsertenabled() {
		return rowinsertenabled;
	}

	/**
	 * @param rowinsertenabled the rowinsertenabled to set
	 */
	public void setRowinsertenabled(String rowinsertenabled) {
		this.rowinsertenabled = rowinsertenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The autosaveenabled attribute" 
	 * @return the autosaveenabled
	 */
	public String getAutosaveenabled() {
		return autosaveenabled;
	}

	/**
	 * @param autosaveenabled the autosaveenabled to set
	 */
	public void setAutosaveenabled(String autosaveenabled) {
		this.autosaveenabled = autosaveenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rowsperpage attribute" 
	 * @return the rowsperpage
	 */
	public String getRowsperpage() {
		return rowsperpage;
	}

	/**
	 * @param rowsperpage the rowsperpage to set
	 */
	public void setRowsperpage(String rowsperpage) {
		this.rowsperpage = rowsperpage;
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
	 * 				  description="The keygenerator attribute" 
	 * @return the keygenerator
	 */
	public String getKeygenerator() {
		return keygenerator;
	}

	/**
	 * @param keygenerator the keygenerator to set
	 */
	public void setKeygenerator(String keygenerator) {
		this.keygenerator = keygenerator;
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
	 * 				  description="The savehandler attribute" 
	 * @return the savehandler
	 */
	public String getSavehandler() {
		return savehandler;
	}

	/**
	 * @param savehandler the savehandler to set
	 */
	public void setSavehandler(String savehandler) {
		this.savehandler = savehandler;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The version attribute" 
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The mode attribute" 
	 * @return the mode
	 */
	public String getMode() {
		return mode;
	}

	/**
	 * @param mode the mode to set
	 */
	public void setMode(String mode) {
		this.mode = mode;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The livescrollingmode attribute" 
	 * @return the livescrollingmode
	 */
	public String getLivescrollingmode() {
		return livescrollingmode;
	}

	/**
	 * @param livescrollingmode the livescrollingmode to set
	 */
	public void setLivescrollingmode(String livescrollingmode) {
		this.livescrollingmode = livescrollingmode;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The copyenabled attribute" 
	 * @return the copyenabled
	 */
	public String getCopyenabled() {
		return copyenabled;
	}

	/**
	 * @param copyenabled the copyenabled to set
	 */
	public void setCopyenabled(String copyenabled) {
		this.copyenabled = copyenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The pasteenabled attribute" 
	 * @return the pasteenabled
	 */
	public String getPasteenabled() {
		return pasteenabled;
	}

	/**
	 * @param pasteenabled the pasteenabled to set
	 */
	public void setPasteenabled(String pasteenabled) {
		this.pasteenabled = pasteenabled;
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
	 * 				  description="The gridresizeenabled attribute" 
	 * @return the gridresizeenabled
	 */
	public String getGridresizeenabled() {
		return gridresizeenabled;
	}

	/**
	 * @param gridresizeenabled the gridresizeenabled to set
	 */
	public void setGridresizeenabled(String gridresizeenabled) {
		this.gridresizeenabled = gridresizeenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rowheight attribute" 
	 * @return the rowheight
	 */
	public String getRowheight() {
		return rowheight;
	}

	/**
	 * @param rowheight the rowheight to set
	 */
	public void setRowheight(String rowheight) {
		this.rowheight = rowheight;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The headerheight attribute" 
	 * @return the headerheight
	 */
	public String getHeaderheight() {
		return headerheight;
	}

	/**
	 * @param headerheight the headerheight to set
	 */
	public void setHeaderheight(String headerheight) {
		this.headerheight = headerheight;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The sortmode attribute" 
	 * @return the sortmode
	 */
	public String getSortmode() {
		return sortmode;
	}

	/**
	 * @param sortmode the sortmode to set
	 */
	public void setSortmode(String sortmode) {
		this.sortmode = sortmode;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The entertab attribute" 
	 * @return the entertab
	 */
	public String getEntertab() {
		return entertab;
	}

	/**
	 * @param entertab the entertab to set
	 */
	public void setEntertab(String entertab) {
		this.entertab = entertab;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rowselectenabled attribute" 
	 * @return the rowselectenabled
	 */
	public String getRowselectenabled() {
		return rowselectenabled;
	}

	/**
	 * @param rowselectenabled the rowselectenabled to set
	 */
	public void setRowselectenabled(String rowselectenabled) {
		this.rowselectenabled = rowselectenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The multirowselectenabled attribute" 
	 * @return the multirowselectenabled
	 */
	public String getMultirowselectenabled() {
		return multirowselectenabled;
	}

	/**
	 * @param multirowselectenabled the multirowselectenabled to set
	 */
	public void setMultirowselectenabled(String multirowselectenabled) {
		this.multirowselectenabled = multirowselectenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The selectedrows attribute" 
	 * @return the selectedrows
	 */
	public String getSelectedrows() {
		return selectedrows;
	}

	/**
	 * @param selectedrows the selectedrows to set
	 */
	public void setSelectedrows(String selectedrows) {
		this.selectedrows = selectedrows;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rowhighlightenabled attribute" 
	 * @return the rowhighlightenabled
	 */
	public String getRowhighlightenabled() {
		return rowhighlightenabled;
	}

	/**
	 * @param rowhighlightenabled the rowhighlightenabled to set
	 */
	public void setRowhighlightenabled(String rowhighlightenabled) {
		this.rowhighlightenabled = rowhighlightenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The widthfixed attribute" 
	 * @return the widthfixed
	 */
	public String getWidthfixed() {
		return widthfixed;
	}

	/**
	 * @param widthfixed the widthfixed to set
	 */
	public void setWidthfixed(String widthfixed) {
		this.widthfixed = widthfixed;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The heightfixed attribute" 
	 * @return the heightfixed
	 */
	public String getHeightfixed() {
		return heightfixed;
	}

	/**
	 * @param heightfixed the heightfixed to set
	 */
	public void setHeightfixed(String heightfixed) {
		this.heightfixed = heightfixed;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The minwidth attribute" 
	 * @return the minwidth
	 */
	public String getMinwidth() {
		return minwidth;
	}

	/**
	 * @param minwidth the minwidth to set
	 */
	public void setMinwidth(String minwidth) {
		this.minwidth = minwidth;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The minheight attribute" 
	 * @return the minheight
	 */
	public String getMinheight() {
		return minheight;
	}

	/**
	 * @param minheight the minheight to set
	 */
	public void setMinheight(String minheight) {
		this.minheight = minheight;
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
	 * 				  description="The tooltipsenabled attribute" 
	 * @return the tooltipsenabled
	 */
	public String getTooltipsenabled() {
		return tooltipsenabled;
	}

	/**
	 * @param tooltipsenabled the tooltipsenabled to set
	 */
	public void setTooltipsenabled(String tooltipsenabled) {
		this.tooltipsenabled = tooltipsenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The dragfillenabled attribute" 
	 * @return the dragfillenabled
	 */
	public String getDragfillenabled() {
		return dragfillenabled;
	}

	/**
	 * @param dragfillenabled the dragfillenabled to set
	 */
	public void setDragfillenabled(String dragfillenabled) {
		this.dragfillenabled = dragfillenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The cellborder attribute" 
	 * @return the cellborder
	 */
	public String getCellborder() {
		return cellborder;
	}

	/**
	 * @param cellborder the cellborder to set
	 */
	public void setCellborder(String cellborder) {
		this.cellborder = cellborder;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The effectsenabled attribute" 
	 * @return the effectsenabled
	 */
	public String getEffectsenabled() {
		return effectsenabled;
	}

	/**
	 * @param effectsenabled the effectsenabled to set
	 */
	public void setEffectsenabled(String effectsenabled) {
		this.effectsenabled = effectsenabled;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The groupoffset attribute" 
	 * @return the groupoffset
	 */
	public String getGroupoffset() {
		return groupoffset;
	}

	/**
	 * @param groupoffset the groupoffset to set
	 */
	public void setGroupoffset(String groupoffset) {
		this.groupoffset = groupoffset;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The rootcolumns attribute" 
	 * @return the rootcolumns
	 */
	public String getRootcolumns() {
		return rootcolumns;
	}

	/**
	 * @param rootcolumns the rootcolumns to set
	 */
	public void setRootcolumns(String rootcolumns) {
		this.rootcolumns = rootcolumns;
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
	 * 				  description="The ondatareadyevent attribute" 
	 * @return the ondatareadyevent
	 */
	public String getOndatareadyevent() {
		return ondatareadyevent;
	}

	/**
	 * @param ondatareadyevent the ondatareadyevent to set
	 */
	public void setOndatareadyevent(String ondatareadyevent) {
		this.ondatareadyevent = ondatareadyevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncelldoubleclickevent attribute" 
	 * @return the oncelldoubleclickevent
	 */
	public String getOncelldoubleclickevent() {
		return oncelldoubleclickevent;
	}

	/**
	 * @param oncelldoubleclickevent the oncelldoubleclickevent to set
	 */
	public void setOncelldoubleclickevent(String oncelldoubleclickevent) {
		this.oncelldoubleclickevent = oncelldoubleclickevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforeloadpreviouspageevent attribute" 
	 * @return the onbeforeloadpreviouspageevent
	 */
	public String getOnbeforeloadpreviouspageevent() {
		return onbeforeloadpreviouspageevent;
	}

	/**
	 * @param onbeforeloadpreviouspageevent the onbeforeloadpreviouspageevent to set
	 */
	public void setOnbeforeloadpreviouspageevent(
			String onbeforeloadpreviouspageevent) {
		this.onbeforeloadpreviouspageevent = onbeforeloadpreviouspageevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforeloadnextpageevent attribute" 
	 * @return the onbeforeloadnextpageevent
	 */
	public String getOnbeforeloadnextpageevent() {
		return onbeforeloadnextpageevent;
	}

	/**
	 * @param onbeforeloadnextpageevent the onbeforeloadnextpageevent to set
	 */
	public void setOnbeforeloadnextpageevent(String onbeforeloadnextpageevent) {
		this.onbeforeloadnextpageevent = onbeforeloadnextpageevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforeloaddatapageevent attribute" 
	 * @return the onbeforeloaddatapageevent
	 */
	public String getOnbeforeloaddatapageevent() {
		return onbeforeloaddatapageevent;
	}

	/**
	 * @param onbeforeloaddatapageevent the onbeforeloaddatapageevent to set
	 */
	public void setOnbeforeloaddatapageevent(String onbeforeloaddatapageevent) {
		this.onbeforeloaddatapageevent = onbeforeloaddatapageevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterloadpreviouspageevent attribute" 
	 * @return the onafterloadpreviouspageevent
	 */
	public String getOnafterloadpreviouspageevent() {
		return onafterloadpreviouspageevent;
	}

	/**
	 * @param onafterloadpreviouspageevent the onafterloadpreviouspageevent to set
	 */
	public void setOnafterloadpreviouspageevent(String onafterloadpreviouspageevent) {
		this.onafterloadpreviouspageevent = onafterloadpreviouspageevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterloadnextpageevent attribute" 
	 * @return the onafterloadnextpageevent
	 */
	public String getOnafterloadnextpageevent() {
		return onafterloadnextpageevent;
	}

	/**
	 * @param onafterloadnextpageevent the onafterloadnextpageevent to set
	 */
	public void setOnafterloadnextpageevent(String onafterloadnextpageevent) {
		this.onafterloadnextpageevent = onafterloadnextpageevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterloaddatapageevent attribute" 
	 * @return the onafterloaddatapageevent
	 */
	public String getOnafterloaddatapageevent() {
		return onafterloaddatapageevent;
	}

	/**
	 * @param onafterloaddatapageevent the onafterloaddatapageevent to set
	 */
	public void setOnafterloaddatapageevent(String onafterloaddatapageevent) {
		this.onafterloaddatapageevent = onafterloaddatapageevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforeresizeevent attribute" 
	 * @return the onbeforeresizeevent
	 */
	public String getOnbeforeresizeevent() {
		return onbeforeresizeevent;
	}

	/**
	 * @param onbeforeresizeevent the onbeforeresizeevent to set
	 */
	public void setOnbeforeresizeevent(String onbeforeresizeevent) {
		this.onbeforeresizeevent = onbeforeresizeevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterresizeevent attribute" 
	 * @return the onafterresizeevent
	 */
	public String getOnafterresizeevent() {
		return onafterresizeevent;
	}

	/**
	 * @param onafterresizeevent the onafterresizeevent to set
	 */
	public void setOnafterresizeevent(String onafterresizeevent) {
		this.onafterresizeevent = onafterresizeevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onhandlererrorevent attribute" 
	 * @return the onhandlererrorevent
	 */
	public String getOnhandlererrorevent() {
		return onhandlererrorevent;
	}

	/**
	 * @param onhandlererrorevent the onhandlererrorevent to set
	 */
	public void setOnhandlererrorevent(String onhandlererrorevent) {
		this.onhandlererrorevent = onhandlererrorevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforerefreshevent attribute" 
	 * @return the onbeforerefreshevent
	 */
	public String getOnbeforerefreshevent() {
		return onbeforerefreshevent;
	}

	/**
	 * @param onbeforerefreshevent the onbeforerefreshevent to set
	 */
	public void setOnbeforerefreshevent(String onbeforerefreshevent) {
		this.onbeforerefreshevent = onbeforerefreshevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterrefreshevent attribute" 
	 * @return the onafterrefreshevent
	 */
	public String getOnafterrefreshevent() {
		return onafterrefreshevent;
	}

	/**
	 * @param onafterrefreshevent the onafterrefreshevent to set
	 */
	public void setOnafterrefreshevent(String onafterrefreshevent) {
		this.onafterrefreshevent = onafterrefreshevent;
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
	 * 				  description="The onbeforerowinsertevent attribute" 
	 * @return the onbeforerowinsertevent
	 */
	public String getOnbeforerowinsertevent() {
		return onbeforerowinsertevent;
	}

	/**
	 * @param onbeforerowinsertevent the onbeforerowinsertevent to set
	 */
	public void setOnbeforerowinsertevent(String onbeforerowinsertevent) {
		this.onbeforerowinsertevent = onbeforerowinsertevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterrowinsertevent attribute" 
	 * @return the onafterrowinsertevent
	 */
	public String getOnafterrowinsertevent() {
		return onafterrowinsertevent;
	}

	/**
	 * @param onafterrowinsertevent the onafterrowinsertevent to set
	 */
	public void setOnafterrowinsertevent(String onafterrowinsertevent) {
		this.onafterrowinsertevent = onafterrowinsertevent;
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
	 * 				  description="The onbeforesaveevent attribute" 
	 * @return the onbeforesaveevent
	 */
	public String getOnbeforesaveevent() {
		return onbeforesaveevent;
	}

	/**
	 * @param onbeforesaveevent the onbeforesaveevent to set
	 */
	public void setOnbeforesaveevent(String onbeforesaveevent) {
		this.onbeforesaveevent = onbeforesaveevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onaftersaveevent attribute" 
	 * @return the onaftersaveevent
	 */
	public String getOnaftersaveevent() {
		return onaftersaveevent;
	}

	/**
	 * @param onaftersaveevent the onaftersaveevent to set
	 */
	public void setOnaftersaveevent(String onaftersaveevent) {
		this.onaftersaveevent = onaftersaveevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onrowblurevent attribute" 
	 * @return the onrowblurevent
	 */
	public String getOnrowblurevent() {
		return onrowblurevent;
	}

	/**
	 * @param onrowblurevent the onrowblurevent to set
	 */
	public void setOnrowblurevent(String onrowblurevent) {
		this.onrowblurevent = onrowblurevent;
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
	 * 				  description="The onafterrowdeleteevent attribute" 
	 * @return the onafterrowdeleteevent
	 */
	public String getOnafterrowdeleteevent() {
		return onafterrowdeleteevent;
	}

	/**
	 * @param onafterrowdeleteevent the onafterrowdeleteevent to set
	 */
	public void setOnafterrowdeleteevent(String onafterrowdeleteevent) {
		this.onafterrowdeleteevent = onafterrowdeleteevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforerowdeleteevent attribute" 
	 * @return the onbeforerowdeleteevent
	 */
	public String getOnbeforerowdeleteevent() {
		return onbeforerowdeleteevent;
	}

	/**
	 * @param onbeforerowdeleteevent the onbeforerowdeleteevent to set
	 */
	public void setOnbeforerowdeleteevent(String onbeforerowdeleteevent) {
		this.onbeforerowdeleteevent = onbeforerowdeleteevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncellupdateevent attribute" 
	 * @return the oncellupdateevent
	 */
	public String getOncellupdateevent() {
		return oncellupdateevent;
	}

	/**
	 * @param oncellupdateevent the oncellupdateevent to set
	 */
	public void setOncellupdateevent(String oncellupdateevent) {
		this.oncellupdateevent = oncellupdateevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onrowfocusevent attribute" 
	 * @return the onrowfocusevent
	 */
	public String getOnrowfocusevent() {
		return onrowfocusevent;
	}

	/**
	 * @param onrowfocusevent the onrowfocusevent to set
	 */
	public void setOnrowfocusevent(String onrowfocusevent) {
		this.onrowfocusevent = onrowfocusevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforecopyevent attribute" 
	 * @return the onbeforecopyevent
	 */
	public String getOnbeforecopyevent() {
		return onbeforecopyevent;
	}

	/**
	 * @param onbeforecopyevent the onbeforecopyevent to set
	 */
	public void setOnbeforecopyevent(String onbeforecopyevent) {
		this.onbeforecopyevent = onbeforecopyevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onaftercopyevent attribute" 
	 * @return the onaftercopyevent
	 */
	public String getOnaftercopyevent() {
		return onaftercopyevent;
	}

	/**
	 * @param onaftercopyevent the onaftercopyevent to set
	 */
	public void setOnaftercopyevent(String onaftercopyevent) {
		this.onaftercopyevent = onaftercopyevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforepasteevent attribute" 
	 * @return the onbeforepasteevent
	 */
	public String getOnbeforepasteevent() {
		return onbeforepasteevent;
	}

	/**
	 * @param onbeforepasteevent the onbeforepasteevent to set
	 */
	public void setOnbeforepasteevent(String onbeforepasteevent) {
		this.onbeforepasteevent = onbeforepasteevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterpasteevent attribute" 
	 * @return the onafterpasteevent
	 */
	public String getOnafterpasteevent() {
		return onafterpasteevent;
	}

	/**
	 * @param onafterpasteevent the onafterpasteevent to set
	 */
	public void setOnafterpasteevent(String onafterpasteevent) {
		this.onafterpasteevent = onafterpasteevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onerrorevent attribute" 
	 * @return the onerrorevent
	 */
	public String getOnerrorevent() {
		return onerrorevent;
	}

	/**
	 * @param onerrorevent the onerrorevent to set
	 */
	public void setOnerrorevent(String onerrorevent) {
		this.onerrorevent = onerrorevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The oncontextmenuevent attribute" 
	 * @return the oncontextmenuevent
	 */
	public String getOncontextmenuevent() {
		return oncontextmenuevent;
	}

	/**
	 * @param oncontextmenuevent the oncontextmenuevent to set
	 */
	public void setOncontextmenuevent(String oncontextmenuevent) {
		this.oncontextmenuevent = oncontextmenuevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onhtmlreadyevent attribute" 
	 * @return the onhtmlreadyevent
	 */
	public String getOnhtmlreadyevent() {
		return onhtmlreadyevent;
	}

	/**
	 * @param onhtmlreadyevent the onhtmlreadyevent to set
	 */
	public void setOnhtmlreadyevent(String onhtmlreadyevent) {
		this.onhtmlreadyevent = onhtmlreadyevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onhitrowstartevent attribute" 
	 * @return the onhitrowstartevent
	 */
	public String getOnhitrowstartevent() {
		return onhitrowstartevent;
	}

	/**
	 * @param onhitrowstartevent the onhitrowstartevent to set
	 */
	public void setOnhitrowstartevent(String onhitrowstartevent) {
		this.onhitrowstartevent = onhitrowstartevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onafterdragfillevent attribute" 
	 * @return the onafterdragfillevent
	 */
	public String getOnafterdragfillevent() {
		return onafterdragfillevent;
	}

	/**
	 * @param onafterdragfillevent the onafterdragfillevent to set
	 */
	public void setOnafterdragfillevent(String onafterdragfillevent) {
		this.onafterdragfillevent = onafterdragfillevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforedragfillevent attribute" 
	 * @return the onbeforedragfillevent
	 */
	public String getOnbeforedragfillevent() {
		return onbeforedragfillevent;
	}

	/**
	 * @param onbeforedragfillevent the onbeforedragfillevent to set
	 */
	public void setOnbeforedragfillevent(String onbeforedragfillevent) {
		this.onbeforedragfillevent = onbeforedragfillevent;
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
	public void setOnfocusevent(String onfocusevent) {
		this.onfocusevent = onfocusevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onbeforecellclick attribute" 
	 * @return the onbeforecellclick
	 */
	public String getOnbeforecellclick() {
		return onbeforecellclick;
	}

	/**
	 * @param onbeforecellclick the onbeforecellclick to set
	 */
	public void setOnbeforecellclick(String onbeforecellclick) {
		this.onbeforecellclick = onbeforecellclick;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ondatarenderevent attribute" 
	 * @return the ondatarenderevent
	 */
	public String getOndatarenderevent() {
		return ondatarenderevent;
	}

	/**
	 * @param ondatarenderevent the ondatarenderevent to set
	 */
	public void setOndatarenderevent(String ondatarenderevent) {
		this.ondatarenderevent = ondatarenderevent;
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
	 * 				  description="The onmouseoverevent attribute" 
	 * @return the onmouseoverevent
	 */
	public String getOnmouseoverevent() {
		return onmouseoverevent;
	}

	/**
	 * @param onmouseoverevent the onmouseoverevent to set
	 */
	public void setOnmouseoverevent(String onmouseoverevent) {
		this.onmouseoverevent = onmouseoverevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmouseoutevent attribute" 
	 * @return the onmouseoutevent
	 */
	public String getOnmouseoutevent() {
		return onmouseoutevent;
	}

	/**
	 * @param onmouseoutevent the onmouseoutevent to set
	 */
	public void setOnmouseoutevent(String onmouseoutevent) {
		this.onmouseoutevent = onmouseoutevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onmousemoveevent attribute" 
	 * @return the onmousemoveevent
	 */
	public String getOnmousemoveevent() {
		return onmousemoveevent;
	}

	/**
	 * @param onmousemoveevent the onmousemoveevent to set
	 */
	public void setOnmousemoveevent(String onmousemoveevent) {
		this.onmousemoveevent = onmousemoveevent;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onhitrowendevent attribute" 
	 * @return the onhitrowendevent
	 */
	public String getOnhitrowendevent() {
		return onhitrowendevent;
	}

	/**
	 * @param onhitrowendevent the onhitrowendevent to set
	 */
	public void setOnhitrowendevent(String onhitrowendevent) {
		this.onhitrowendevent = onhitrowendevent;
	}

	/**
	 * @param toolkitjsurl the toolkitjsurl to set
	 */
	public void setToolkitjsurl(String toolkitjsurl) {
		this.toolkitjsurl = toolkitjsurl;
	}

	/**
	 * @param componentjsurl the componentjsurl to set
	 */
	public void setComponentjsurl(String componentjsurl) {
		this.componentjsurl = componentjsurl;
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
	 * 				  description="The toolbarheight attribute" 
	 * @return the toolbarheight
	 */
	public String getToolbarheight() {
		return toolbarheight;
	}

	/**
	 * @param toolbarheight the toolbarheight to set
	 */
	public void setToolbarheight(String toolbarheight) {
		this.toolbarheight = toolbarheight;
	}

}
