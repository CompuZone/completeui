var PROPERTIES_DIV = document.properties_div.document;
var INPUTPROPERTIES_DIV = document.inputproperties_div.document;
var CALENDARPROPERTIES_DIV = document.calendarproperties_div.document;

var MINDATE_INPUT = PROPERTIES_DIV.mindate_input;
var MAXDATE_INPUT = PROPERTIES_DIV.maxdate_input;
var SELECTEDDATE_INPUT = PROPERTIES_DIV.selecteddate_input;

var DISPLAYMASK_INPUT = INPUTPROPERTIES_DIV.displaymask_input;
var EDITMASK_INPUT = INPUTPROPERTIES_DIV.editmask_input;
var WIDTH_INPUT = INPUTPROPERTIES_DIV.width_input;

var MONTHROWS_INPUT = CALENDARPROPERTIES_DIV.monthrows_input;
var MONTHCOLUMNS_INPUT = CALENDARPROPERTIES_DIV.monthcolumns_input;


function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6087&product=all&type=art&a=10347");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:datepicker')
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
	clearInputs();
	populateCalendarInfo(origMarkup);
}

function clearInputs()
{
	MINDATE_INPUT.value = "";
	MAXDATE_INPUT.value = "";
	SELECTEDDATE_INPUT.value = "";
	DISPLAYMASK_INPUT.value = "";
	EDITMASK_INPUT.value = "";
	WIDTH_INPUT.value = "";
	MONTHROWS_INPUT.value = "";
	MONTHCOLUMNS_INPUT.value = "";
}

function populateCalendarInfo(declaration)
{
	var dp = nitobi.util.getTag(declaration, "ntb:datepicker", 0);
	var calendar = nitobi.util.getTag(declaration, "ntb:calendar", 0);
	var input = nitobi.util.getTag(declaration, "ntb:dateinput", 0);
	
	var mindate = nitobi.util.getAttribute(dp, "mindate", "");
	var maxdate = nitobi.util.getAttribute(dp, "maxdate", "");
	var selecteddate = nitobi.util.getAttribute(dp, "selecteddate", "");
	
	var displaymask = nitobi.util.getAttribute(input, "displaymask", "");
	var editmask = nitobi.util.getAttribute(input, "editmask", "");
	var width = nitobi.util.getAttribute(input, "width", "");
	
	var monthrows = nitobi.util.getAttribute(calendar, "monthrows", "");
	var monthcolumns = nitobi.util.getAttribute(calendar, "monthcolumns", "");
	
	MINDATE_INPUT.value = (mindate?mindate:"");
	MAXDATE_INPUT.value = (maxdate?maxdate:"");
	SELECTEDDATE_INPUT.value = (selecteddate?selecteddate:"");
	
	DISPLAYMASK_INPUT.value = (displaymask?displaymask:"");
	EDITMASK_INPUT.value = (editmask?editmask:"");
	WIDTH_INPUT.value = (width?width:"");
	
	MONTHROWS_INPUT.value = (monthrows?monthrows:"");
	MONTHCOLUMNS_INPUT.value = (monthcolumns?monthcolumns:"");
}

function updateTag(name, value, tag)
{
	var newMarkup = nitobi.util.updateTag(name, value, tag);
	if (newMarkup)
	{
		if (name == "startdate" && value && value != "")
		{
			var testDateObj = new Date(value);
			if (testDateObj.toString() == "Invalid Date")
			{
				INVALID_DIV.setAttribute("class", "visibleWarning");
				return;
			}
			else
			{
				INVALID_DIV.setAttribute("class", "hiddenWarning");
			}
		}
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function toggleCalendar()
{
	dreamweaver.editLockedRegions(true);
	var dom = dw.getDocumentDOM();
	var origMarkup = nitobi.util.getOriginalMarkup();
	var datePicker = nitobi.util.getTag(origMarkup, "ntb:datepicker", 0);
	var id = nitobi.util.getAttribute(datePicker, "id");
	if (id == null)
	{
		alert("You must first specify an id for the Calendar component");
		return;
	}
	
	if (nitobi.util.getDWVersion() == "9" || nitobi.util.getDWVersion() == "10")
	{
		var calendar = dom.getElementById(id + "cal");
		if (calendar.style.display = "block")
		{
			calendar.style.display = "none";
		}
		else
		{
			calendar.style.display = "block";
		}
	}
	else
	{
		alert("This feature is only supported in Dreamweaver CS3");
	}
}