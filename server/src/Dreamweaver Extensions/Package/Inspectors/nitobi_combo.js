// We have to hard code the elements because DW 8 doesn't support getElementById...
var MODE_DIV = document.mode_div.document;
var LIST_PROPS = document.list_props.document;
var TEXTBOX_PROPS = document.textbox_props.document;
var COLUMN_PROPS = document.column_props.document;
var COLUMNS_DIV = document.columns_div.document;
var TOGGLE_BUTTON = document.toggle_button;

var MODE_LIST = MODE_DIV.mode_list;
var COLUMN_LIST = COLUMNS_DIV.column_list;

//var TB_DATAFIELD_INPUT = TEXTBOX_PROPS.datafieldindex_input;
var TB_WIDTH_INPUT = TEXTBOX_PROPS.width_input;
//var TB_VALUE_INPUT = TEXTBOX_PROPS.value_input;

//var LIST_DATASOURCE_INPUT = LIST_PROPS.datasourceurl_input;
var LIST_HEIGHT_INPUT = LIST_PROPS.height_input;
var LIST_WIDTH_INPUT = LIST_PROPS.width_input;

var COL_DATAFIELD_INPUT = COLUMN_PROPS.datafieldindex_input;
var COL_WIDTH_INPUT = COLUMN_PROPS.width_input;
var COL_LABEL_INPUT = COLUMN_PROPS.label_input;

function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6087&product=all&type=art&a=10346");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:combo')
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
	var columns = nitobi.util.getTag(origMarkup, "ntb:ComboColumnDefinition");
	clearInputs();
	populateComboColumns(columns);
	populateComboInfo(origMarkup);
	if (!dreamweaver.getDocumentDOM().getElementById)
	{
		TOGGLE_BUTTON.style.display = "none";
	}
}

function clearInputs()
{
	MODE_LIST.selectedIndex = 0;
	
	//TB_DATAFIELD_INPUT.value = "";
	TB_WIDTH_INPUT.value = "";
	//TB_VALUE_INPUT.value = "";
	
	//LIST_DATASOURCE_INPUT.value = "";
	LIST_HEIGHT_INPUT.value = "";
	LIST_WIDTH_INPUT.value = "";
}

function populateComboInfo(declaration)
{
	var combo = nitobi.util.getTag(declaration, "ntb:Combo", 0);
	var list = nitobi.util.getTag(declaration, "ntb:ComboList", 0);
	var text = nitobi.util.getTag(declaration, "ntb:ComboTextBox", 0);
	
	var mode = nitobi.util.getAttribute(combo, "Mode");
	
	var modeElement = MODE_LIST;
	for (var i = 0; i < modeElement.options.length; i++)
	{
		if (modeElement.options[i].value.toLowerCase() == mode.toLowerCase())
		{
			modeElement.selectedIndex = i;
			break;
		}
	}
	
	if (text != null)
	{	
		var datafieldindex = nitobi.util.getAttribute(text, "DataFieldIndex");
		var textWidth = nitobi.util.getAttribute(text, "Width");
		var value = nitobi.util.getAttribute(text, "Value");
	
		//TB_DATAFIELD_INPUT.value = (datafieldindex?datafieldindex:"");
		TB_WIDTH_INPUT.value = (textWidth?textWidth:"");
		//TB_VALUE_INPUT.value = (value?value:"");
	}
	
	if (list != null)
	{
		var datasourceurl = nitobi.util.getAttribute(list, "DatasourceUrl");
		var listHeight = nitobi.util.getAttribute(list, "Height");
		var listWidth = nitobi.util.getAttribute(list, "Width");
		
		//LIST_DATASOURCE_INPUT.value = (datasourceurl?datasourceurl:"");
		LIST_HEIGHT_INPUT.value = (listHeight?listHeight:"");
		LIST_WIDTH_INPUT.value = (listWidth?listWidth:"");
	}
	
	COL_LABEL_INPUT.value = "";
	COL_DATAFIELD_INPUT.value = "";
	COL_WIDTH_INPUT.value = "";
}

function populateComboColumns(columns)
{
	var listElement = COLUMN_LIST;
	listElement.innerHTML = "";
	if (columns != null)
	{
		for (var i = 0; i < columns.length; i++)
		{
			var listItem = columns[i];
			var label = nitobi.util.getAttribute(listItem, "HeaderLabel");
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

function populateItemInfo(selectElement)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	
	var index = selectElement.selectedIndex;
	var item = nitobi.util.getTag(origMarkup, "ntb:ComboColumnDefinition", index);
	
	var label = nitobi.util.getAttribute(item, "HeaderLabel");
	COL_LABEL_INPUT.value = (label?label:"");
	var datafield  = nitobi.util.getAttribute(item, "DataFieldIndex");
	COL_DATAFIELD_INPUT.value = (datafield?datafield:"");
	var width = nitobi.util.getAttribute(item, "Width");
	COL_WIDTH_INPUT.value = (width?width:"");
}

function updateTag(name, value, tag)
{
	if (name == "Width" || name == "Height")
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

function addItem()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var items = nitobi.util.getTag(origMarkup, "ntb:combocolumndefinition");
	var item = "<ntb:combocolumndefinition headerlabel=\"Item" + (items?items.length:"0") + "\"></ntb:combocolumndefinition>\n";

	var insertIndex = origMarkup.search(/<\/ntb:ComboList>/i);
	var newMarkup;
	if (insertIndex > -1)
	{
		newMarkup = origMarkup.substring(0, insertIndex) + item + origMarkup.substring(insertIndex);
	}
	nitobi.util.setNewMarkup(newMarkup);
}

function removeItem()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var items = origMarkup.match(/<ntb:ComboColumnDefinition\b[\s\S]*?>[\s\S]*?<\/ntb:ComboColumnDefinition>/gi);
	if (items == null)
	{
		return;
	}
	var listElement = COLUMN_LIST;
	var itemToRemove = items[listElement.selectedIndex];
	
	var newMarkup = origMarkup.replace(itemToRemove, "");
	nitobi.util.setNewMarkup(newMarkup);
}

function applyItemInfo()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	
	var itemIndex = COL_DATAFIELD_INPUT.value;
	var width = COL_WIDTH_INPUT.value;
	if (!nitobi.util.isPixelDimensions(width))
	{
		alert("Invalid value.  Width must be a value in the form 123px");
		return;
	}
	var label = COL_LABEL_INPUT.value;
	
	var listElement = COLUMN_LIST;
	var index = listElement.selectedIndex;
	
	var item = nitobi.util.getTag(origMarkup, "ntb:ComboColumnDefinition", index);
	if (item != null)
	{
		var startIndex = origMarkup.indexOf(item);
		var endIndex = startIndex + item.length;
		
		item = nitobi.util.setAttribute(item, "HeaderLabel", label);
		item = nitobi.util.setAttribute(item, "Width", width);
		item = nitobi.util.setAttribute(item, "DataFieldIndex", itemIndex);
		
		var newMarkup = origMarkup.substring(0, startIndex) + item + origMarkup.substring(endIndex);
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function toggleList()
{
	dreamweaver.editLockedRegions(true);
	var dom = dw.getDocumentDOM();
	var origMarkup = nitobi.util.getOriginalMarkup();
	var combo = nitobi.util.getTag(origMarkup, "ntb:Combo", 0);
	var id = nitobi.util.getAttribute(combo, "id");
	if (id == null)
	{
		alert("You must first specify an id for the ComboBox component");
		return;
	}
	
	if (nitobi.util.getDWVersion() == "9" || nitobi.util.getDWVersion() == "10")
	{
		var list = dom.getElementById(id + "list");
		if (list.style.display = "block")
		{
			list.style.display = "none";
		}
		else
		{
			list.style.display = "block";
		}
	}
	else
	{
		alert("This feature is only supported in Dreamweaver CS3");
	}
}
