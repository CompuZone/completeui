var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var BUTTONS = document.buttons.document;

var ID_INPUT = PAGE1.id_input;
var CSSCLASS_LIST = PAGE1.cssclass_list;
var ROOTENABLED_LIST = PAGE1.rootenabled_list;
var EXPANDED_LIST = PAGE1.expanded_list;
var HOVERHIGHLIGHT_LIST = PAGE1.hoverhighlight_list;

var INVALID_DIV = PAGE1.invalid_div;

var NODES_TREE = PAGE2.nodes_tree;
var LABEL_INPUT = PAGE2.label_input;
var EXPAND_CHECK = PAGE2.expand_check;

var NODESERROR_DIV = PAGE2.nodeserror_div;

var ADD_BUTTON = PAGE2.add_button;
var REMOVE_BUTTON = PAGE2.remove_button;
var UP_BUTTON = PAGE2.up_button;
var DOWN_BUTTON = PAGE2.down_button;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var NODE_COUNTER = 0;

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
	return "520,625";
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
			if (validateTreeProperties())
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
		if (validateNodes())
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
		var assetList = nitobi.util.getAssetList("tree");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("tree");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.tree.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.tree.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.tree.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.tree.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.tree.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.tree.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.tree.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.tree.js/.test(headElement.innerHTML)))
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
	var cssclass = nitobi.util.getSelectedOption(CSSCLASS_LIST);
	var rootenabled = nitobi.util.getSelectedOption(ROOTENABLED_LIST);
	var expanded = nitobi.util.getSelectedOption(EXPANDED_LIST);
	var hoverhighlight = nitobi.util.getSelectedOption(HOVERHIGHLIGHT_LIST);
	
	var declaration = "<ntb:tree ";
	if (id != "")
	{
		declaration += " id=\"" + id + "\" ";
	}
	declaration += "cssclass=\"" + (cssclass == ""?"folders":cssclass) + "\" ";
	declaration += "rootenabled=\"" + rootenabled + "\" ";
	declaration += "expanded=\"" + expanded + "\" ";
	declaration += "hoverhighlight=\"" + hoverhighlight + "\"";
	declaration += ">\n";
	declaration += "<ntb:children>\n";
	declaration += processTree(NODES_TREE);
	/*declaration += "<ntb:node label=\"A node (without any children)\">\n";
	declaration += "<ntb:children></ntb:children>\n";
	declaration += "</ntb:node>\n";
	declaration += "<ntb:node label=\"A leaf (no possibility of children)\"></ntb:node>\n";
	declaration += "<ntb:node label=\"A node (with children)\" expanded=\"false\">\n";
	declaration += "<ntb:children>\n";
	declaration += "<ntb:node label=\"A leaf\"></ntb:node>\n";
	declaration += "</ntb:children>\n";
	declaration += "</ntb:node>\n";*/
	
	declaration += "</ntb:children>\n";
	declaration += "</ntb:tree>\n";
	return declaration;
}

function processTree(root)
{
	var declaration = "";
	if (!root.hasChildNodes())
	{
		var values = root.value.split("|");
		declaration += "<ntb:node label=\"" + nitobi.util.escapeDoubleQuotes(values[0]) + "\" expanded=\"" + values[1] + "\"></ntb:node>\n";
		return declaration;
	}
	else
	{	
		if (root.tagName.toLowerCase() != "mm:treecontrol")
		{
			var values = root.value.split("|");
			declaration += "<ntb:node label=\"" + nitobi.util.escapeDoubleQuotes(values[0]) + "\"";
			if (values[1] != "")
			{
				declaration += "expanded=\"" + values[1] + "\"";
			}
			declaration += ">\n";
			declaration += "<ntb:children>\n";
		}
		var children = root.childNodes;
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].tagName.toLowerCase() != "mm:treecolumn")
			{
				declaration += processTree(children[i]);
			}
		}
		if (root.tagName.toLowerCase() != "mm:treecontrol")
		{
			declaration += "</ntb:children>\n";
			declaration += "</ntb:node>\n";
		}
		return declaration;
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
	dw.browseDocument("http://nitobi.com/kb/?artid=444");
}

function addNode()
{
	var nodeId = NODE_COUNTER;
	var popup = new PopupMenu();
	popup.addItem("Child Node");
	popup.addItem("Sibling Node");
	var nodeType = popup.popup();

	var tree = NODES_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		if (nodeType == "Child Node")
		{
			selNode.removeAttribute("selected");
			selNode.innerHTML += "<mm:treenode name=\"" + nodeId + "\" value=\"Node" + nodeId + "|\" selected></mm:treenode>";
		}
		else
		{
			var parentNode = selNode.parentNode;
			selNode.removeAttribute("selected");
			parentNode.innerHTML += "<mm:treenode name=\"" + nodeId + "\" value=\"Node" + nodeId + "|\" selected></mm:treenode>";
		}
	}
	else
	{
		tree.innerHTML += "<mm:treenode name=\"" + nodeId + "\" value=\"Node" + nodeId + "|\" selected></mm:treenode>";
	}
	NODE_COUNTER++;
	configureControls();
	displayOptions();
	validateNodes();
}

function removeNode()
{
	var tree = NODES_TREE;
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
		else if (selNode.parentNode)
		{
			selNode.parentNode.setAttribute("selected", "true");
			
		}
		selNode.outerHTML = "";
		selNode = null;
		
		selNode = tree.selectedNodes[0];
		configureControls();
		NODE_COUNTER--;
		if (selNode)
		{
			displayOptions();
		}
		else
		{
			clearOptions();
		}
		validateNodes();
	}
}

function moveUp()
{
	var tree = NODES_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		var index;
		if (selNode.parentNode.tagName.toLowerCase() == "mm:treenode")
		{
			// The currently selected node is a child node
			var index = nitobi.util.getNodeIndex(selNode, selNode.parentNode);
		}
		else
		{
			// It is a root node
			var index = nitobi.util.getNodeIndex(selNode, tree);
		}
		if (index > 0 && selNode.previousSibling.tagName.toLowerCase() != "mm:treecolumn")
		{
			var nodes = selNode.parentNode.childNodes;
			
			var tempValue = nodes[index - 1].value;
			nodes[index - 1].value = nodes[index].value;
			nodes[index].value = tempValue;
			
			var tempChildren = nodes[index - 1].innerHTML;
			nodes[index - 1].innerHTML = nodes[index].innerHTML;
			nodes[index].innerHTML = tempChildren;
		
			selNode.removeAttribute("selected");
			nodes[index - 1].setAttribute("selected", "true");
		}
		configureControls();
		displayOptions();
	}
	
}

function moveDown()
{
	var tree = NODES_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		var index;
		if (selNode.parentNode.tagName.toLowerCase() == "mm:treenode")
		{
			// The currently selected node is a child node
			var index = nitobi.util.getNodeIndex(selNode, selNode.parentNode);
		}
		else
		{
			// It is a root node
			var index = nitobi.util.getNodeIndex(selNode, tree);
		}
		var nodes = selNode.parentNode.childNodes;
		if (index < nodes.length - 1)
		{
			//var nodes = selNode.parentNode.childNodes;
			
			var tempValue = nodes[index + 1].value;
			nodes[index + 1].value = nodes[index].value;
			nodes[index].value = tempValue;
			
			var tempChildren = nodes[index + 1].innerHTML;
			nodes[index + 1].innerHTML = nodes[index].innerHTML;
			nodes[index].innerHTML = tempChildren;
		
			selNode.removeAttribute("selected");
			nodes[index + 1].setAttribute("selected", "true");
		}
		configureControls();
		displayOptions();
	}
}

function clearOptions()
{
	LABEL_INPUT.value = "";
	EXPAND_CHECK.checked = false;
}

function displayOptions()
{
	var tree = NODES_TREE;
	var selNode = tree.selectedNodes[0];
	var nodeValues = selNode.value.split("|");
	
	LABEL_INPUT.value = nodeValues[0];
	var expanded = nodeValues[1];
	if (expanded == "true")
	{
		EXPAND_CHECK.checked = true;
	}
	else
	{
		EXPAND_CHECK.checked = false;
	}
	configureControls();
}

function showPage(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

function hidePage(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

function setLabel()
{
	var selNode = NODES_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[0] = LABEL_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		LABEL_INPUT.value = "";
		alert("Choose a node from the list above before setting values");
	}
}

function setExpand()
{
	var selNode = NODES_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[1] = EXPAND_CHECK.checked;
		selNode.value = values.join("|");
	}
	else
	{
		EXPAND_CHECK.checked = false;
		alert("Choose a node from the list above before setting values");
	}

}

function configureControls()
{
	var tree = NODES_TREE;
	var nodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (nodes.length > 1)
	{
		// Enable the remove button
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == nodes[0])
			{
				// Enable Move down
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == nodes[nodes.length - 1])
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
	else if (nodes.length == 1)
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

function validateTreeProperties()
{
	var isValid = validateId();
	return isValid;
}

function validateNodes()
{
	var tree = NODES_TREE;
	var nodes = tree.getElementsByTagName("mm:treenode");
	if (nodes.length < 1)
	{
		NODESERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		NODESERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}