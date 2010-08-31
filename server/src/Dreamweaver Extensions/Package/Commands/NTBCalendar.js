var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var PAGE3 = document.page3.document;
var BUTTONS = document.buttons.document;

var ID_INPUT = PAGE1.id_input;
var INVALID_DIV = PAGE1.invalid_div;
var INVALIDMINDATE_DIV = PAGE1.invalidmindate_div
var INVALIDMAXDATE_DIV = PAGE1.invalidmaxdate_div
var INVALIDSELECTEDDATE_DIV = PAGE1.invalidselecteddate_div

var MINDATE_LIST = PAGE1.mindate_list;
var MAXDATE_LIST = PAGE1.maxdate_list;
var SELECTEDDATE_LIST = PAGE1.selecteddate_list;
var SUBMITMASK_INPUT = PAGE1.submitmask_input;
var THEME_LIST = PAGE1.theme_list;
var THEME_IMG = PAGE1.theme_img;

var DISPLAYMASK_INPUT = PAGE2.displaymask_input;
var EDITMASK_INPUT = PAGE2.editmask_input;
var WIDTH_INPUT = PAGE2.width_input;
var EDITABLE_INPUT = PAGE2.editable_input;
var DISABLED_INPUT = PAGE2.disabled_input;

var INVALIDDISPLAYMASK_DIV = PAGE2.invaliddisplaymask_div;
var INVALIDEDITMASK_DIV = PAGE2.invalideditmask_div;
var INVALIDWIDTH_DIV = PAGE2.invalidwidth_div;

var MONTHROWS_INPUT = PAGE3.monthrows_input;
var MONTHCOLUMNS_INPUT = PAGE3.monthcolumns_input;

var INVALIDMONTHROWS_DIV = PAGE3.invalidmonthrows_div;
var INVALIDMONTHCOLUMNS_DIV = PAGE3.invalidmonthcolumns_div;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var pages = [];
pages[1] = document.page1;
pages[2] = document.page2;
pages[3] = document.page3;

var wizard;
var currentPage = 1;
var totalPages = 3;

function canAcceptCommand()
{
	return false;
}

function commandButtons()
{
	return new Array();
}

function windowDimensions()
{
	return "550,675";
}

function init()
{
	showPage(1);
	document.buttons.visibility = "visible";
}

function doNext()
{
	if (currentPage < totalPages)
	{
		if (currentPage == 1)
		{
			if (validateDatePickerProperties())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if(currentPage == 2)
		{
			if (validateDateInputProperties())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		if (currentPage > 1)
		{
			PREVIOUS_BUTTON.disabled = "false";
		}
		if (currentPage == totalPages)
		{
			NEXT_BUTTON.value = "Finish";
		}
	}
	else
	{
		if (validateCalendarProperties())
		{
			insertDeclaration();
			nitobi.util.addNitobiNamespace(dw.getDocumentDOM());
			window.close();
		}
	}
}

function doPrevious()
{
	if (currentPage > 1)
	{
		hidePage(currentPage);
		currentPage--;
		showPage(currentPage);
		if (currentPage == 1)
		{
			PREVIOUS_BUTTON.disabled = "true";
		}
		NEXT_BUTTON.value = "Next";
		NEXT_BUTTON.disabled = false;
	}
}

function showPage(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

function hidePage(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

function insertDeclaration()
{
	var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	dom.insertHTML(getDeclaration());
	var id = ID_INPUT.value;
	var code = nitobi.util.getComponentInitCode(id);
	MM.setBusyCursor();
	
	var pathToRoot = nitobi.util.getPathToRoot();
	
	if (nitobi.util.getDWVersion() == "9" || nitobi.util.getDWVersion() == "10")
	{
		if (typeof AssetInfo == "undefined")
		{
			dw.runCommand("NTBLoadAssetInfo.htm");
		}
		// We gotta put the toolkit declaration at the beginning of the head to avoid conflicts in the case
		// the user is inserting the component into a template.
		if (dom.getIsTemplateDocument())
		{
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
		}
		else
		{
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
		}
		if (dom.getSelectedEditableRegion() == -1)
		{	
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
			}
		}
		else
		{
			var editableRegions = dom.getEditableRegionList();
			var headRegion;
			for (var i = 0; i < editableRegions.length; i++)
			{
				if (editableRegions[i].parentNode.tagName.toLowerCase() == "head")
				{
					headRegion = editableRegions[i];
					break;
				}
			}
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					if (headRegion)
					{
						headRegion.innerHTML = toolkitSrc + "\n" + headRegion.innerHTML;
					}
					else
					{
						alert('There must be an editable region in the head of this document in order to properly add this component');
						return;
					}
				}
			}
		}
		var assetList = nitobi.util.getAssetList("calendar");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("calendar");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.calendar.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.calendar.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.calendar.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.calendar.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.calendar.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.calendar.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
				}
				headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
			}
		}
		else
		{
			var editableRegions = dom.getEditableRegionList();
			var headRegion;
			for (var i = 0; i < editableRegions.length; i++)
			{
				if (editableRegions[i].parentNode.tagName.toLowerCase() == "head")
				{
					headRegion = editableRegions[i];
					break;
				}
			}
			if (!headRegion)
			{
				alert('There must be an editable region in the head of this document in order to properly add this component');
				return;
			}
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = toolkitSrc + "\n" + headRegion.innerHTML;
				}
				if (!(/nitobi.calendar.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.calendar.js/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + componentSrc + "\n";
				}
				headRegion.innerHTML = headRegion.innerHTML + "\n<script>" + code + "</script>\n";
			}
		}
	}
	
	MM.clearBusyCursor();
}

function getDeclaration()
{
	var id = ID_INPUT.value;
	var minDate = getSelectedOption(MINDATE_LIST);
	var maxDate = getSelectedOption(MAXDATE_LIST);
	var selectedDate = getSelectedOption(SELECTEDDATE_LIST);
	var theme = nitobi.util.getSelectedOption(THEME_LIST);
	var declaration = "<ntb:datepicker id=\"" + id + "\" theme=\"" + theme + "\"";
	if (typeof(minDate) != "undefined")
		declaration += " mindate=\"" + minDate + "\"";
	if (typeof(maxDate) != "undefined")
		declaration += " maxdate=\"" + maxDate + "\"";
	if (typeof(selectedDate) != "undefined")
		declaration += " selecteddate=\"" + selectedDate + "\"";
	declaration += ">\n";
	
	var displayMask = DISPLAYMASK_INPUT.value;
	var editMask = EDITMASK_INPUT.value;
	var width = WIDTH_INPUT.value;
	var editable = (PAGE2.editable[0].checked?"true":"false");
	declaration += "<ntb:dateinput";
	if (displayMask != "")
		declaration += " displaymask=\"" + displayMask + "\"";
	if (editMask != "")
		declaration += " editmask=\"" + editMask + "\"";
	if (width != "")
		declaration += " width=\"" + width + "\"";
	declaration += " editable=\"" + editable + "\"";
	declaration += "></ntb:dateinput>\n";
	
	var monthRows = MONTHROWS_INPUT.value;
	var monthColumns = MONTHCOLUMNS_INPUT.value;
	declaration += "<ntb:calendar";
	if (monthRows != "")
		declaration += " monthrows=\"" + monthRows + "\"";
	if (monthColumns != "")
		declaration += " monthcolumns=\"" + monthColumns + "\"";
		
	declaration += "></ntb:calendar>\n";
	declaration += "</ntb:datepicker>\n";
	return declaration;
}

function validateId()
{
	var id = ID_INPUT.value;
	if (id == "")
	{
		INVALID_DIV.setAttribute("class", "visibleWarning");
		INVALID_DIV.innerHTML = "The id is required.";
		return false;
	}
	else
	{
		var pageIds = getIds();
		if (pageIds)
		{
			for (var i = 0; i < pageIds.length; i++)
			{
				if (id == pageIds[i])
				{
					INVALID_DIV.setAttribute("class", "visibleWarning");
					INVALID_DIV.innerHTML = "This id is not unique.";
					return false;
				}
			}
			INVALID_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
}

function getIds()
{
	var dom = dw.getDocumentDOM();
	var bodyHtml = dom.body.innerHTML;
	var idElements = bodyHtml.match(/<(\w+?:\w*?)[\s\S]*?id=["']\w*?["'].*?(?:\/>|>)/gi);
	var ids = [];
	if (idElements)
	{
		for (var i = 0; i < idElements.length; i++)
		{
			var id = idElements[i].match(/<(?:\w+?:\w*?)[\s\S]*?id=["'](\w*?)["'].*?(?:\/>|>)/i);
			ids.push(id[1]);
		}
	}
	return ids;
}

function getSelectedOption(selectElement)
{
	if (selectElement.getAttribute("editable") == "true")
	{
		return selectElement.getAttribute("editText");
	}
	else
	{
		var index = selectElement.selectedIndex;
		if (index == -1)
		{
			return "";
		}
		else
		{
			return selectElement.options[index].value;
		}
	}
}

function validateMinDate()
{
	var minDate = getSelectedOption(MINDATE_LIST);
	if (MINDATE_LIST.selectedIndex > 0 || typeof(minDate) == "undefined")
	{

		INVALIDMINDATE_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		var date = new Date(minDate);
		if (date.toString() == "Invalid Date")
		{
			// SHOW WARNING
			INVALIDMINDATE_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
		else
		{
			// HIDEWARNING
			INVALIDMINDATE_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
}

function validateMaxDate()
{
	var maxDate = getSelectedOption(MAXDATE_LIST);
	if (MAXDATE_LIST.selectedIndex > 0 || typeof(maxDate) == "undefined")
	{
		INVALIDMAXDATE_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		var date = new Date(maxDate);
		if (date.toString() == "Invalid Date")
		{
			// SHOW WARNING
			INVALIDMAXDATE_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
		else
		{
			// HIDEWARNING
			INVALIDMAXDATE_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
}

function validateSelectedDate()
{
	var selectedDate = getSelectedOption(SELECTEDDATE_LIST);
	if (SELECTEDDATE_LIST.selectedIndex > 0 || typeof(minDate) == "undefined")
	{
		INVALIDSELECTEDDATE_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		var date = new Date(selectedDate);
		if (date.toString() == "Invalid Date")
		{
			// SHOW WARNING
			INVALIDSELECTEDDATE_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
		else
		{
			// HIDEWARNING
			INVALIDSELECTEDDATE_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
}

function validateDisplayMask()
{
	var mask = DISPLAYMASK_INPUT.value;
	var isValid = validateMask(mask);
	if (isValid)
	{
		INVALIDDISPLAYMASK_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		INVALIDDISPLAYMASK_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateEditMask()
{
	var mask = EDITMASK_INPUT.value;
	var isValid = validateMask(mask);
	if (isValid)
	{
		INVALIDEDITMASK_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		INVALIDEDITMASK_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateMask(mask)
{
	mask = mask.replace(/\W/g, "");
	return !(/[^yMNdE]/.test(mask));
}

function validateWidth()
{
	var width = WIDTH_INPUT.value;
	if (nitobi.util.isPixelDimensions(width) || width == "")
	{
		INVALIDWIDTH_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		INVALIDWIDTH_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function updateEditMask()
{
	EDITMASK_INPUT.value = DISPLAYMASK_INPUT.value;
}

function validateMonthRows()
{
	var months = MONTHROWS_INPUT.value;
	if (isNaN(months) && months != "")
	{
		INVALIDMONTHROWS_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		INVALIDMONTHROWS_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateMonthColumns()
{
	var months = MONTHCOLUMNS_INPUT.value;
	if (isNaN(months) && months != "")
	{
		INVALIDMONTHCOLUMNS_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		INVALIDMONTHCOLUMNS_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=447");
}

function switchPreview(name)
{
	THEME_IMG.src = "../Shared/Nitobi/images/calendar/" + name + ".png";
}

function validateDatePickerProperties()
{
	var isValid = validateId();
	isValid = validateMinDate() && isValid;
	isValid = validateMaxDate() && isValid;
	isValid = validateSelectedDate() && isValid;
	return isValid;
}

function validateDateInputProperties()
{
	var isValid = validateDisplayMask();
	isValid = validateEditMask() && isValid;
	isValid = validateWidth() && isValid;
	return isValid;
}

function validateCalendarProperties()
{
	var isValid = validateMonthRows();
	isValid = validateMonthColumns() && isValid;
	return isValid;
}