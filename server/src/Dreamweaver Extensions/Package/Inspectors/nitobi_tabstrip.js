/**
 * Globals
 */
var tabsRegExp = /<ntb:tab\b.*?>[\s\S]*?<\/ntb:tab>/gi;

var TABSTRIP_PROPS = document.tabstrip_props.document;
var TABS_DIV = document.tabs_div.document;
var TAB_PROPS = document.tab_props.document;

var ALIGN_INPUT = TABSTRIP_PROPS.align_input;
var OVERLAP_INPUT = TABSTRIP_PROPS.overlap_input;
var WIDTH_INPUT = TABSTRIP_PROPS.width_input;
var HEIGHT_INPUT = TABSTRIP_PROPS.height_input;

var TABS_LIST = TABS_DIV.tabs_list;

var TAB_LABEL_INPUT = TAB_PROPS.label_input;
var TAB_WIDTH_INPUT = TAB_PROPS.width_input;
var TAB_SOURCE_INPUT = TAB_PROPS.source_input;

function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6087&product=all&type=art&a=10343");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:tabstrip')
	{
    	return true;
	}
	else
	{
    	return false
	}
}

function inspectSelection()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	// Need to get the list of tabs to populate the select list and also
	// we need to get alignment, overlap, width and height
	var tabs = origMarkup.match(tabsRegExp);
	clearInputs();
	populateTabList(tabs);
	populateTabstripInfo(origMarkup);
}

function populateTabList(tabs)
{
	var listElement = TABS_LIST;
	listElement.innerHTML = "";
	if (tabs != null)
	{
		for (var i = 0; i < tabs.length; i++)
		{
			var listItem = tabs[i];
			var label = nitobi.util.getAttribute(listItem, "label");
			var optionNode = "<option>";

			if (label != null && label != "")
			{
				optionNode += label;
			}
			else
			{
				optionNode += "** No Label **";
			}
			optionNode += "</option>";
			listElement.innerHTML += optionNode;
		}
	}
}

function populateTabstripInfo(declaration)
{
	var tabstrip = nitobi.util.getTag(declaration, "ntb:tabstrip", 0);
	var height = nitobi.util.getAttribute(tabstrip, "height");
	var width = nitobi.util.getAttribute(tabstrip, "width");
	
	HEIGHT_INPUT.value = (height?height:"");
	WIDTH_INPUT.value = (width?width:"");
	
	var tabs = nitobi.util.getTag(declaration, "ntb:tabs", 0);
	if (tabs != null)
	{
		var align = nitobi.util.getAttribute(tabs, "align");
		var overlap = nitobi.util.getAttribute(tabs, "overlap");
		
		ALIGN_INPUT.value = (align?align:"");
		OVERLAP_INPUT.value = (overlap?overlap:"");
	}
}

function clearInputs()
{
	HEIGHT_INPUT.value = "";
	WIDTH_INPUT.value = "";
	ALIGN_INPUT.value = "";
	OVERLAP_INPUT.value = "";

	TAB_LABEL_INPUT.value = "";
	TAB_WIDTH_INPUT.value = "";
	TAB_SOURCE_INPUT.value = "";
}

function populateTabInfo(selectElement)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var tabs = origMarkup.match(tabsRegExp);
	
	if (tabs == null)
	{
		return;
	}
	
	var selectedTab = tabs[selectElement.selectedIndex];
	var label = nitobi.util.getAttribute(selectedTab, "label");
	var width = nitobi.util.getAttribute(selectedTab, "width");
	var source = nitobi.util.getAttribute(selectedTab, "source");
	
	TAB_LABEL_INPUT.value = (label?label:"");
	TAB_WIDTH_INPUT.value = (width?width:"");
	TAB_SOURCE_INPUT.value = (source?source:"");
}

function addTab()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var tabs = origMarkup.match(tabsRegExp);
		
	var tab = "<ntb:tab label=\"Tab" + (tabs?tabs.length:"0") + "\"></ntb:tab>\n";

	var insertIndex = origMarkup.search(/<\/ntb:tabs>/);
	var newMarkup;
	if (insertIndex > -1)
	{
		newMarkup = origMarkup.substring(0, insertIndex) + tab + origMarkup.substring(insertIndex);
	}
	nitobi.util.setNewMarkup(newMarkup);
}

function removeTab()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var tabs = origMarkup.match(tabsRegExp);
	if (tabs == null)
	{
		return;
	}
	var listElement = TABS_LIST;
	var tabToRemove = tabs[listElement.selectedIndex];
	
	var newMarkup = origMarkup.replace(tabToRemove, "");
	nitobi.util.setNewMarkup(newMarkup);
}

function updateTabstrip(name, value, tag)
{	
	if (name == "width" || name == "height")
	{
		if (!nitobi.util.isPixelDimensions(value))
		{
			alert("Invalid value.  " + name + " must be a value in the form 123px");
			inspectSelection();
			return;
		}
	}
	var newMarkup = nitobi.util.updateTag(name, value, tag);
	if (newMarkup)
	{
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function updateTabs(name, value, tag)
{
	if (name == "align")
	{
		if (value.toLowerCase() != "left" && value.toLowerCase() != "center" && value.toLowerCase() != "right")
		{
			alert("Invalid value.  align must be left, center or right");
			inspectSelection();
			return;
		}
	}
	if (name == "overlap")
	{
		if (isNaN(value) || value.indexOf(".") != -1)
		{
			alert("Invalid value.  overlap must be a positive integer");
			inspectSelection();
			return;
		}
	}
	var newMarkup = nitobi.util.updateTag(name, value, tag);
	if (newMarkup)
	{
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function applyTabInfo()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	
	var label = TAB_LABEL_INPUT.value;
	var width = TAB_WIDTH_INPUT.value;
	var source = TAB_SOURCE_INPUT.value;
	
	var listElement = TABS_LIST;
	var tab = nitobi.util.getTag(origMarkup, "ntb:tab", listElement.selectedIndex);
	
	if (tab != null)
	{
		var startIndex = origMarkup.indexOf(tab);
		var endIndex = startIndex + tab.length;
		
		tab = nitobi.util.setAttribute(tab, "label", nitobi.util.escapeDoubleQuotes(label));
		if (!nitobi.util.isPixelDimensions(width))
		{
			alert("Invalid value.  Tab width must be in the form 123px");
		}
		else
		{	
			tab = nitobi.util.setAttribute(tab, "width", width);
		}
		tab = nitobi.util.setAttribute(tab, "source", source);
		
		// If the source is a url, set the containertype property
		if (/(?:ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(source))
		{
			tab = nitobi.util.setAttribute(tab, "containertype", "iframe");
		}
		else
		{
			tab = nitobi.util.setAttribute(tab, "containertype", "");
		}
		
		var newMarkup = origMarkup.substring(0, startIndex) + tab + origMarkup.substring(endIndex);
		nitobi.util.setNewMarkup(newMarkup);
	}
}