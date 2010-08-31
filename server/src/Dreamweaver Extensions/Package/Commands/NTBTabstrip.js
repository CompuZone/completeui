var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var BUTTONS = document.buttons.document;

var ID_INPUT = PAGE1.id_input;
var WIDTH_INPUT = PAGE1.width_input;
var HEIGHT_INPUT = PAGE1.height_input;
var OVERLAP_INPUT = PAGE1.overlap_input;
var ALIGN_LIST = PAGE1.align_list;
var INVALID_DIV = PAGE1.invalid_div;
var WIDTHERROR_DIV = PAGE1.widtherror_div;
var HEIGHTERROR_DIV = PAGE1.heighterror_div;
var OVERLAPERROR_DIV = PAGE1.overlaperror_div;

var LABEL_INPUT = PAGE2.label_input;
var TABWIDTH_INPUT = PAGE2.tabwidth_input;
var SOURCE_INPUT = PAGE2.source_input;
var TABWIDTHERROR_DIV = PAGE2.tabwidtherror_div;

var TABS_TREE = PAGE2.tabs_tree;

var TABSERROR_DIV = PAGE2.tabserror_div;

var ADD_BUTTON = PAGE2.add_button;
var REMOVE_BUTTON = PAGE2.remove_button;
var UP_BUTTON = PAGE2.up_button;
var DOWN_BUTTON = PAGE2.down_button;

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
	return "500,550";
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
			if (validateTabstripProperties())
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
		if (validateTabs())
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
		var assetList = nitobi.util.getAssetList("tabstrip");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("tabstrip");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.tabstrip.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.tabstrip.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.tabstrip.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.tabstrip.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.tabstrip.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.tabstrip.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.tabstrip.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.tabstrip.js/.test(headElement.innerHTML)))
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
	var width = WIDTH_INPUT.value;
	var height = HEIGHT_INPUT.value;
	var overlap = OVERLAP_INPUT.value;
	var align = nitobi.util.getSelectedOption(ALIGN_LIST);
	var declaration = "<ntb:tabstrip ";
	if (id != "")
	{
		declaration += "id=\"" + id + "\" ";
	}
	declaration += "theme=\"nitobi\" ";
	declaration += "width=\"" + (width == ""?"400px":width) +  "\" ";
	declaration += "height=\"" + (height ==  ""?"350px":height) + "\">\n";
	declaration += "<ntb:tabs align=\"" +  (align == ""?"center":align) + "\" overlap=\"" + (overlap == ""?"15":overlap) + "\">\n";
	var tabs = TABS_TREE.getElementsByTagName("mm:treenode");
	
	for (var i = 0; i < tabs.length; i++)
	{
		var tabValues = tabs[i].value.split("|");
		declaration += "<ntb:tab label=\"" + tabValues[0] + "\" width=\"" + tabValues[1] + "\"";
		// There is a bug with tab that causes it to crap out when the source is just an empty string, so we
		// want to make sure the user doesn't run into that.
		if (tabValues[2] != "")
		{
			declaration += " source=\"" + tabValues[2] + "\"";
		}
		if (nitobi.util.isUrl(tabValues[2]))
		{
			declaration += " containertype=\"iframe\"";
		}
		declaration += "></ntb:tab>\n";
	}
	
	declaration += "</ntb:tabs>\n";
	declaration += "</ntb:tabstrip>\n";
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
	}
}

function configureControls()
{
	var tree = TABS_TREE;
	var tabs = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (tabs.length > 1)
	{
		// Enable the remove button
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == tabs[0])
			{
				// Enable Move down
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == tabs[tabs.length - 1])
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
	else if (tabs.length == 1)
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
function addTab()
{
	var tree = TABS_TREE;
	var nodeId = tree.getElementsByTagName("mm:treenode").length;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		selNode.removeAttribute("selected");
	}
	tree.innerHTML += "<mm:treenode name=\"" + nodeId + "\" value=\"Tab" + nodeId + "|150px|\" selected></mm:treenode>";
	configureControls();
	displayOptions();
	validateTabs();
}

function removeTab()
{
	var tree = TABS_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		// Make the previous sibling the selected node
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
		configureControls()
		if (selNode)
		{
			displayOptions();
		}
		else
		{
			clearOptions();
		}
		validateTabs();
	}
}

function populateIdList()
{
	var dom = dw.getDocumentDOM();
	var idElements = dom.getElementsByAttributeName("id");
	var idOptions = "";
	for (var i = 0; i < idElements.length; i++)
	{
		idOptions += "<option value=\"" + idElements[i].id + "\">" +  idElements[i].id + "</option>";
	}
	var idLists = document.getElementsByTagName("select");
	for (var i = 0; i < idLists.length; i++)
	{
		var list = idLists[i];
		if (list.getAttribute("class"))
		{
			if (list.getAttribute("class").indexOf("idList") != -1)
			{
				list.innerHTML += idOptions;
				list.selectedIndex = 0;
			}
		}
	}
}

function clearOptions()
{
	LABEL_INPUT.value = "";
	TABWIDTH_INPUT.value = "";
	SOURCE_INPUT.value = "";
}

function displayOptions()
{
	var selNode = TABS_TREE.selectedNodes[0];
	if (selNode)
	{
		var tabValues = selNode.value.split("|");
		LABEL_INPUT.value = tabValues[0];
		TABWIDTH_INPUT.value = tabValues[1];
		SOURCE_INPUT.value = (tabValues[2]?tabValues[2]:"");
		configureControls();
	}
}

function setLabel()
{
	var selNode = TABS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[0] = LABEL_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		LABEL_INPUT.value = "";
		alert("Choose a tab from the list above before setting values");
	}
}

function setWidth()
{
	var selNode = TABS_TREE.selectedNodes[0];
	if (selNode)
	{
		var width = TABWIDTH_INPUT.value;
		if (!nitobi.util.isPixelDimensions(width))
		{
			TABWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			TABWIDTH_INPUT.value = "";
		}
		else
		{
			TABWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			var values = selNode.value.split("|");
			values[1] = TABWIDTH_INPUT.value;
			selNode.value = values.join("|");
		}
		
	}
	else
	{
		TABWIDTH_INPUT.value = "";
		alert("Choose a tab from the list above before setting values");
	}
}

function setSource()
{
	var selNode = TABS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[2] = SOURCE_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		SOURCE_INPUT.value = "";
		alert("Choose a tab from the list above before setting values");
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
	var nodes = TABS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(TABS_TREE);
	if (index > 0)
	{
		var tempValue = nodes[index -1].value;
		var tempStepObj = nodes[index - 1].stepObj;
		nodes[index - 1].value = nodes[index].value;
		nodes[index - 1].stepObj = nodes[index].stepObj;
		
		nodes[index].value = tempValue;
		nodes[index].stepObj = tempStepObj;
		nitobi.util.setTreeNodeIndex(TABS_TREE, index - 1);
		configureControls();
		displayOptions();
	}
}


function moveDown()
{
	var nodes = TABS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(TABS_TREE);
	if (index < nodes.length - 1)
	{
		var tempValue = nodes[index + 1].value;
		var tempStepObj = nodes[index + 1].stepObj;
		nodes[index + 1].value = nodes[index].value;
		nodes[index + 1].stepObj = nodes[index].stepObj;
		
		nodes[index].value = tempValue;
		nodes[index].stepObj = tempStepObj;
		nitobi.util.setTreeNodeIndex(TABS_TREE, index + 1);
		configureControls();
		displayOptions();
	}
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
			// If we get out here, the id is ok, so we renable the button and hide the warning
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

function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=443");
}

function validateWidth()
{
	var width = WIDTH_INPUT.value;
	if (!nitobi.util.isPixelDimensions(width))
	{
		WIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		WIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateHeight()
{
	var height = HEIGHT_INPUT.value;
	if (!nitobi.util.isPixelDimensions(height))
	{
		HEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		HEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateOverlap()
{
	var overlap = OVERLAP_INPUT.value;
	if (isNaN(overlap) || overlap == "")
	{
		OVERLAPERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		OVERLAPERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateTabWidth()
{
	var width = TABWIDTH_INPUT.value;
	if (!nitobi.util.isPixelDimensions(width))
	{
		TABWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
	}
	else
	{
		TABWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
	}
}

function validateTabstripProperties()
{
	var isValid = validateId();
	isValid = validateWidth() && isValid;
	isValid = validateHeight() && isValid;
	isValid = validateOverlap() && isValid;
	return isValid;
}

function validateTabs()
{
	var tree = TABS_TREE;
	var tabs = tree.getElementsByTagName("mm:treenode");
	if (tabs.length < 1)
	{
		TABSERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		TABSERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}