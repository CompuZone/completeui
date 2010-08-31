var itemsRegExp = /<ntb:menuitem\b[\s\S]*?>[\s\S]*?<\/ntb:menuitem>/gi

var FISHEYE_PROPS = document.fisheye_props.document;
var ITEMS_DIV = document.items_div.document;
var ITEM_PROPS = document.item_props.document;

var GROW_INPUT = FISHEYE_PROPS.grow_input;
var WIDTH_INPUT = FISHEYE_PROPS.width_input;
var OPEN_LIST = FISHEYE_PROPS.open_list;
var EXPAND_LIST = FISHEYE_PROPS.expand_list;

var LABEL_INPUT = ITEM_PROPS.label_input;
var SOURCE_INPUT = ITEM_PROPS.source_input;
var ONCLICK_INPUT = ITEM_PROPS.onclick_input;

var ITEM_LIST = ITEMS_DIV.item_list;

var repopulateProps = false;

function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6087&product=all&type=art&a=10345");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:fisheye')
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
	var items = origMarkup.match(itemsRegExp);
	if (repopulateProps === false)
	{
		clearInputs();
		populateItemList(items);
		populateFisheyeInfo(origMarkup);
	}
	else
	{
		repopulateProps = false;
	}
}

function clearInputs()
{
	GROW_INPUT.value = "";
	WIDTH_INPUT.value = "";
	OPEN_LIST.selectedIndex = 0;
	EXPAND_LIST.selectedIndex = 0;
	
	LABEL_INPUT.value = "";
	SOURCE_INPUT.value = "";
	ONCLICK_INPUT.value = "";
}

function populateItemList(items)
{
	var listElement = ITEM_LIST;
	listElement.innerHTML = "";
	if (items != null)
	{
		for (var i = 0; i < items.length; i++)
		{
			var listItem = items[i];
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

function populateFisheyeInfo(declaration)
{
	var fisheye = nitobi.util.getTag(declaration, "ntb:fisheye", 0);
	
	var width = nitobi.util.getAttribute(fisheye, "iconwidth");
	var expandDir = nitobi.util.getAttribute(fisheye, "expanddirection");
	var openDir = nitobi.util.getAttribute(fisheye, "opendirection");
	var growPer = nitobi.util.getAttribute(fisheye, "growpercent");
	
	WIDTH_INPUT.value = (width?width:"");
	GROW_INPUT.value = (growPer?growPer:"");
	
	var expandElement = EXPAND_LIST;
	for (var i = 0; i < expandElement.options.length; i++)
	{
		if (expandElement.options[i].value == expandDir)
		{
			expandElement.selectedIndex = i;
			break;
		}
	}
	
	var openElement = OPEN_LIST;
	for (var i = 0; i < openElement.options.length; i++)
	{
		if (openElement.options[i].value == openDir)
		{
			openElement.selectedIndex = i;
			break;
		}
	}
}

function populateItemInfo(selectElement)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	
	var index = selectElement.selectedIndex;
	var item = nitobi.util.getTag(origMarkup, "ntb:menuitem", index);
	
	var label = nitobi.util.getAttribute(item, "label");
	LABEL_INPUT.value = (label?nitobi.util.unescapeDoubleQuotes(label):"");
	var source = nitobi.util.getAttribute(item, "imagesrc");
	SOURCE_INPUT.value = (source?source:"");
	var onclick = nitobi.util.getAttribute(item, "onclick");
	ONCLICK_INPUT.value = (onclick?onclick:"");
}

function updateTag(name, value, tag)
{
	if (name == "iconwidth")
	{
		if (!nitobi.util.isPixelDimensions(value))
		{
			alert("Invalid value.  " + name + " must be a value in the form 123px");
			inspectSelection();
			return;
		}
	}
	else if (name == "growpercent")
	{
		if (isNaN(value))
		{
			alert("Invalid value.  " + name + " must be a number");
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

function applyItemInfo()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	
	var label = LABEL_INPUT.value;
	var source = SOURCE_INPUT.value;
	var onclick = ONCLICK_INPUT.value;
	
	var listElement = ITEM_LIST;
	var index = listElement.selectedIndex;
	
	var item = nitobi.util.getTag(origMarkup, "ntb:menuitem", index);
	if (item != null)
	{
		var startIndex = origMarkup.indexOf(item);
		var endIndex = startIndex + item.length;
		
		item = nitobi.util.setAttribute(item, "label", nitobi.util.escapeDoubleQuotes(label));
		item = nitobi.util.setAttribute(item, "imagesrc", source);
		item = nitobi.util.setAttribute(item, "onclick", onclick);
		
		var newMarkup = origMarkup.substring(0, startIndex) + item + origMarkup.substring(endIndex);
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function addItem()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var items = origMarkup.match(itemsRegExp);
		
	var item = "<ntb:menuitem label=\"Item" + (items?items.length:"0") + "\"></ntb:menuitem>\n";

	var insertIndex = origMarkup.search(/<\/ntb:fisheye>/);
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
	var items = origMarkup.match(itemsRegExp);
	if (items == null)
	{
		return;
	}
	var listElement = ITEM_LIST;
	var itemToRemove = items[listElement.selectedIndex];
	
	var newMarkup = origMarkup.replace(itemToRemove, "");
	nitobi.util.setNewMarkup(newMarkup);
}

function findImage()
{
	var selectedIndex = ITEM_LIST.selectedIndex;
	var imageFileUrl = dw.browseForFileURL("select", "Browse For Menu Item Image...", true);
	
	repopulateProps = true;
	SOURCE_INPUT.value = imageFileUrl;
}