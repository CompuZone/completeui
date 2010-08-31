/**
 * Globals
 *
 */
var MODE_DIV = document.mode_div.document;
var GRID_PROPS = document.grid_props.document;

var MODE_LIST = MODE_DIV.mode_list;
var WIDTH_INPUT = GRID_PROPS.width_input;
var OFFSET_INPUT = GRID_PROPS.offset_input;
var HEIGHT_INPUT = GRID_PROPS.height_input;
var THEME_LIST = GRID_PROPS.theme_list;

function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6874&product=all&type=art&a=10767");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:treegrid')
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
	if (origMarkup == null)
	{
		return;
	}
	
	clearInputs();
	populateGridInfo(origMarkup);
}

function clearInputs()
{
	WIDTH_INPUT.value = "";
	HEIGHT_INPUT.value = "";
	OFFSET_INPUT.value = "";
	MODE_LIST.selectedIndex = 0;
	THEME_LIST.selectedIndex = 0;
}

function populateGridInfo(declaration)
{
	var grid = nitobi.util.getTag(declaration, "ntb:treegrid", 0);
	
	var mode = nitobi.util.getAttribute(grid, "mode");
	var width = nitobi.util.getAttribute(grid, "width");
	var height = nitobi.util.getAttribute(grid, "height");
	var theme = nitobi.util.getAttribute(grid, "theme");
	var offset = nitobi.util.getAttribute(grid, "groupoffset");
	
	WIDTH_INPUT.value = (width?width:"");
	HEIGHT_INPUT.value = (height?height:"");
	OFFSET_INPUT.value = (offset?offset:"");
	nitobi.util.chooseSelectOption(theme, THEME_LIST);
	
	var modeElement = MODE_LIST;
	for (var i = 0; i < modeElement.options.length; i++)
	{
		if (modeElement.options[i].value == mode)
		{
			modeElement.selectedIndex = i;
			break;
		}
	}
}

function updateTag(name, value, tag)
{
	if (name == "width" || name == "height")
	{
		if (isNaN(value))
		{
			alert("Invalid value.  " + name + " must be a number.");
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