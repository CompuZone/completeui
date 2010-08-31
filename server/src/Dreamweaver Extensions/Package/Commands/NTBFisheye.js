var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var BUTTONS = document.buttons.document;

var ID_INPUT = PAGE1.id_input;
var GROWPERCENT_INPUT = PAGE1.growpercent_input;
var ICONWIDTH_INPUT = PAGE1.iconwidth_input;
var OPENDIRECTION_LIST = PAGE1.opendirection_list;
var EXPANDDIRECTION_LIST = PAGE1.expanddirection_list;
var INVALID_DIV = PAGE1.invalid_div;
var GROWPERCENTERROR_DIV = PAGE1.growpercenterror_div;
var WIDTHERROR_DIV = PAGE1.widtherror_div;

var LABEL_INPUT = PAGE2.label_input;
var IMAGESOURCE_INPUT = PAGE2.imagesource_input;
var ONCLICK_INPUT = PAGE2.onclick_input;

var ADD_BUTTON = PAGE2.add_button;
var REMOVE_BUTTON = PAGE2.remove_button;
var UP_BUTTON = PAGE2.up_button;
var DOWN_BUTTON = PAGE2.down_button;

var ITEMS_TREE = PAGE2.items_tree;
var ITEMSERROR_DIV = PAGE2.itemserror_div;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var pages = [];
pages[1] = document.page1;
pages[2] = document.page2;

var wizard;
var currentPage = 1;
var totalPages = 2;

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
	return "500,525";
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
			if (validateFisheyeProperties())
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
		if (validateItems())
		{
			insertDeclaration();
			nitobi.util.addNitobiNamespace(dw.getDocumentDOM());
			window.close();
		}
	}
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
		var assetList = nitobi.util.getAssetList("fisheye");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("fisheye");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.fisheye.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.fisheye.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.fisheye.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.fisheye.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.fisheye.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.fisheye.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.fisheye.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.fisheye.js/.test(headElement.innerHTML)))
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
	var expand = nitobi.util.getSelectedOption(EXPANDDIRECTION_LIST);
	var openDir = nitobi.util.getSelectedOption(OPENDIRECTION_LIST);
	var grow = GROWPERCENT_INPUT.value;
	var iconwidth = ICONWIDTH_INPUT.value;
	
	var declaration = "<ntb:fisheye ";
	if (id != "")
	{
		declaration += "id=\"" + id + "\" ";
	}
	declaration += "opendirection=\"" + (openDir == ""?"up":openDir) + "\" ";
	declaration += "expanddirection=\"" + (expand == ""?"right":expand) + "\" ";
	declaration += "growpercent=\"" + (grow == ""?"200":grow) + "\" ";
	declaration += "theme=\"nitobi\" ";
	declaration += "iconwidth=\"" + (iconwidth == ""?"40px":iconwidth) + "\">";
	
	var items = ITEMS_TREE.getElementsByTagName("mm:treenode");
	
	for (var i = 0; i < items.length; i++)
	{
		var itemObj = items[i].itemObj;
		if (itemObj)
		{
			declaration += itemObj.getTag() + "\n";
		}
	}
	declaration += "</ntb:fisheye>\n";
	return declaration;
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

function addItem()
{
	var tree = ITEMS_TREE;
	var itemNumber = tree.getElementsByTagName("mm:treenode").length;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		selNode.removeAttribute("selected");
	}
	tree.innerHTML += "<mm:treenode name=\"Item" + itemNumber + "\" value=\"Item" + itemNumber + "||\" selected></mm:treenode>";
	
	var itemObj = new nitobi.dw.MenuItem("Item" + itemNumber, "", "");
	tree.childNodes[tree.childNodes.length - 1].itemObj = itemObj;
	NEXT_BUTTON.disabled = false;
	configureControls();
	displayOptions();
	validateItems();
}

function removeItem()
{
	var tree = ITEMS_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		if (selNode.previousSibling && selNode.previousSibling.tagName.toLowerCase() != "mm:treecolumn")
		{
			selNode.previousSibling.setAttribute("selected", "true");
		}
		else if (selNode.nextSibling)
		{
			selNode.nextSibling.setAttribute("selected", "true");
		}
		selNode.outerHTML = "";
		selNode = null;
		
		selNode = tree.selectedNodes[0];
		configureControls();
		if (selNode)
		{
			displayOptions();
		}
		else
		{
			clearOptions();
		}
		validateItems();
	}
}

function clearOptions()
{
	LABEL_INPUT.value = "";
	IMAGESOURCE_INPUT.value = "";
	ONCLICK_INPUT.value = "";
}

function displayOptions()
{
	var selNode = ITEMS_TREE.selectedNodes[0];
	if (selNode)
	{
		var itemObj = selNode.itemObj;
		LABEL_INPUT.value = itemObj.label;
		IMAGESOURCE_INPUT.value = itemObj.source;
		ONCLICK_INPUT.value = itemObj.onclick;
		configureControls();
	}
}

function setLabel()
{
	var selNode = ITEMS_TREE.selectedNodes[0];
	if (selNode)
	{
		var itemObj = selNode.itemObj;
		
		itemObj.label = LABEL_INPUT.value;
		var values = selNode.value.split("|");
		values[0] = LABEL_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		LABEL_INPUT.value = "";
		alert("Choose an item from the list above before setting values");
	}
}

function setSource()
{
	var selNode = ITEMS_TREE.selectedNodes[0];
	if (selNode)
	{
		var itemObj = selNode.itemObj;
		itemObj.source = IMAGESOURCE_INPUT.value;
		var values = selNode.value.split("|");
		values[1] = IMAGESOURCE_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		IMAGESOURCE_INPUT.value = "";
		alert("Choose an item from the list above before setting values");
	}
}

function setOnclick()
{
	var selNode = ITEMS_TREE.selectedNodes[0];
	if (selNode)
	{
		var itemObj = selNode.itemObj;
		
		itemObj.onclick = ONCLICK_INPUT.value;
		var values = selNode.value.split("|");
		values[2] = ONCLICK_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		ONCLICK_INPUT.value = "";
		alert("Choose an item from the list above before setting values");
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

function moveUp()
{
	var nodes = ITEMS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(ITEMS_TREE);
	if (index > 0)
	{
		var tempValue = nodes[index -1].value;
		var tempItemObj = nodes[index - 1].itemObj;
		nodes[index - 1].value = nodes[index].value;
		nodes[index - 1].itemObj = nodes[index].itemObj;
		
		nodes[index].value = tempValue;
		nodes[index].itemObj = tempItemObj;
		nitobi.util.setTreeNodeIndex(ITEMS_TREE, index - 1);
		configureControls();
		displayOptions();
	}
}


function moveDown()
{
	var nodes = ITEMS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(ITEMS_TREE);
	if (index < nodes.length - 1)
	{
		var tempValue = nodes[index + 1].value;
		var tempItemObj = nodes[index + 1].itemObj;
		nodes[index + 1].value = nodes[index].value;
		nodes[index + 1].itemObj = nodes[index].itemObj;
		
		nodes[index].value = tempValue;
		nodes[index].itemObj = tempItemObj;
		nitobi.util.setTreeNodeIndex(ITEMS_TREE, index + 1);
		configureControls();
		displayOptions();
	}
}

function findImage()
{
	var imageFileUrl = dw.browseForFileURL("select", "Browse For Menu Item Image...", true);
	IMAGESOURCE_INPUT.value = imageFileUrl;
	setSource();
}

function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=442");
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

function validateGrowPercent()
{
	var growPercent = GROWPERCENT_INPUT.value;
	if (isNaN(growPercent))
	{
		GROWPERCENTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		GROWPERCENTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateIconWidth()
{
	var iconWidth = ICONWIDTH_INPUT.value;
	if (nitobi.util.isPixelDimensions(iconWidth))
	{
		WIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		WIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function configureControls()
{
	var tree = ITEMS_TREE;
	var items = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (items.length > 1)
	{
		// Enable the remove button
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == items[0])
			{
				// Enable Move down
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == items[items.length - 1])
			{
				// Disable Move down
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown_dis.gif";
				// Enable Move up
				UP_BUTTON.src = "../Shared/MM/Images/btnUp.gif";
			}
			else
			{
				// If neither at top nor bottom, enable both up and down
				UP_BUTTON.src = "../Shared/MM/Images/btnUp.gif";
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
			}
		}
	}
	else if (items.length == 1)
	{
		// With only one tab selected, disable both move down and move up
		// also enable the remove button.
		UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
		DOWN_BUTTON.src = "../Shared/MM/Images/btnDown_dis.gif";
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	}
	else
	{
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel_dis.gif";
	}
}

function validateFisheyeProperties()
{
	var isValid = validateId();
	isValid = validateGrowPercent() && isValid;
	isValid = validateIconWidth() && isValid;
	return isValid;
}

function validateItems()
{
	var tree = ITEMS_TREE;
	var items = tree.getElementsByTagName("mm:treenode");
	if (items.length < 1)
	{
		ITEMSERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		ITEMSERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}