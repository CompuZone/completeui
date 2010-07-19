var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var BUTTONS = document.buttons.document;

var STARTEFFECT_LIST = PAGE1.starteffect_list;
var CALLOUTSTYLE_LIST = PAGE1.calloutstyle_list;
var LENSTYPE_LIST = PAGE1.lenstype_list;
var LENSOVERSIZE_INPUT = PAGE1.lensoversize_input;
var CALLOUT_IMAGE = PAGE1.callout_image;
var ONLOAD_CHECKBOX = PAGE1.onload_checkbox;

var TOURSTEPS_TREE = PAGE2.toursteps_tree;

var STEPSERROR_DIV = PAGE2.stepserror_div;

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

var currentVisibleOptions = "";

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
	return "600,765";
}

function init()
{
	showPage(1);
	document.buttons.visibility = "visible";
	populateIdList();
	populateInputList();
}

function doNext()
{
	if (currentPage < totalPages)
	{
		hidePage(currentPage);
		currentPage++;
		showPage(currentPage);
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
		if (validateSteps())
		{
			insertSpotlightCode();
			window.close();
		}
	}
}

function insertSpotlightCode()
{
	var dom = dw.getDocumentDOM();
	var today = new Date();
	var tourFunctionName = "runTour" + today.valueOf();
	var code = "\nfunction " + tourFunctionName + "()\n{\n";
	
	var starteffect = "'" + STARTEFFECT_LIST.options[STARTEFFECT_LIST.selectedIndex].value + "'";
	var calloutstyle = "'" + CALLOUTSTYLE_LIST.options[CALLOUTSTYLE_LIST.selectedIndex].value + "'";
	var lenstype = "'" + LENSTYPE_LIST.options[LENSTYPE_LIST.selectedIndex].value + "'";
	var lensoversize = "'" + LENSOVERSIZE_INPUT.value + "'";
	
	code += "\tnitobi.html.Css.precacheImages();\n";
	code += "\tvar myTour = new nitobi.spotlight.Spotlight(" + starteffect + ", " + calloutstyle + ", " + lenstype + ", " + lensoversize + ");\n";
	var nodes = TOURSTEPS_TREE.childNodes;
	for (var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		if (node.stepObj)
		{
			code += "\t" + node.stepObj.getFunctionDef("myTour");
		}
	}
	code += "\tmyTour.play();\n}\n";
	if (ONLOAD_CHECKBOX.checked)
	{
		code += "nitobi.html.attachEvent(window,\"load\"," + tourFunctionName + ");\n";
	}
	
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
		var assetList = nitobi.util.getAssetList("spotlight");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("spotlight");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.spotlight.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.spotlight.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.spotlight.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.spotlight.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.spotlight.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.spotlight.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.spotlight.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.spotlight.js/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + componentSrc + "\n";
				}
				headRegion.innerHTML = headRegion.innerHTML + "\n<script>" + code + "</script>\n";
			}
		}
	}
	MM.clearBusyCursor();
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
		NEXT_BUTTON.disabled = false;
		NEXT_BUTTON.value = "Next";
	}
}

function addStep()
{
	var popup = new PopupMenu();
	popup.addItem("createCalloutStep");
	popup.addItem("createCodeStep");
	popup.addItem("createFocusStep");
	popup.addItem("createMouseStep");
	popup.addItem("createFormHelperStep");
	var step = popup.popup();
	
	if (step != "")
	{
		var nodeId = TOURSTEPS_TREE.childNodes.length;
		var selNode = TOURSTEPS_TREE.selectedNodes[0];
		if (selNode)
		{
			selNode.removeAttribute("selected");
		}
		TOURSTEPS_TREE.innerHTML += "<mm:treenode name=\"" + nodeId + "\" value=\"" + step + "\" selected></mm:treenode>";
		
		// Attach a SpotlightStep object to the node
		var stepObj = new nitobi.dw.SpotlightStep({type: step, params: []});
		TOURSTEPS_TREE.childNodes[TOURSTEPS_TREE.childNodes.length - 1].stepObj = stepObj;
		NEXT_BUTTON.disabled = false;
		configureControls();
		displayOptions();
		validateSteps();
	}
}

function removeStep()
{
	var tree = TOURSTEPS_TREE;
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
			hideOptions();
		}
		validateSteps();
	}
}

function populateIdList()
{
	var dom = dw.getDocumentDOM();
	//var idElements = dom.getElementsByAttributeName("id");
	var idElements = getIds();
	var idOptions = "";
	for (var i = 0; i < idElements.length; i++)
	{
		idOptions += "<option value=\"" + idElements[i] + "\">" +  idElements[i] + "</option>";
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

function populateInputList()
{
	var dom = dw.getDocumentDOM();
	//var idElements = getIds();
	var inputElements = dom.getElementsByTagName("input");
	var textAreaElements = dom.getElementsByTagName("textarea");
	var idOptions = "";
	for (var i = 0; i < inputElements.length; i++)
	{
		var inputElement = inputElements[i];
		if (inputElement.getAttribute("id"))
		{
			idOptions += "<option value=\"" + inputElement.getAttribute("id") + "\">" + inputElement.getAttribute("id") + "</option>";
		}
	}
	for (var i = 0; i < textAreaElements.length; i++)
	{
		var textAreaElement = textAreaElements[i];
		if (textAreaElement.getAttribute("id"))
		{
			idOptions += "<option value=\"" + textAreaElement.getAttribute("id") + "\">" + textAreaElement.getAttribute("id") + "</option>";
		}
	}
	
	var inputLists = document.getElementsByTagName("select");
	for (var i = 0; i < inputLists.length; i++)
	{
		var list = inputLists[i];
		if (list.getAttribute("class"))
		{
			if (list.getAttribute("class").indexOf("inputList") != -1)
			{
				list.innerHTML += idOptions;
				list.selectedIndex = 0;
			}
		}
	}
}

function getIds()
{
	var dom = dw.getDocumentDOM();
	var bodyHtml = dom.body.innerHTML;
	var idElements = bodyHtml.match(/<(\w+:?\w*?)[\s\S]*?id=["']\w*?["'].*?(?:\/>|>)/gi);
	var ids = [];
	if (idElements)
	{
		for (var i = 0; i < idElements.length; i++)
		{
			var id = idElements[i].match(/<(?:\w+?:?\w*?)[\s\S]*?id=["'](\w*?)["'].*?(?:\/>|>)/i);
			ids.push(id[1]);
		}
	}
	return ids;
}

function hideOptions()
{
	if (currentVisibleOptions != "")
	{
		var previousOptionDiv = eval("document.page2.document." + currentVisibleOptions + "_div");
		className = previousOptionDiv.getAttribute("class");
		className = className.replace("visibleOptions", "hiddenOptions");
		previousOptionDiv.setAttribute("class", className);
	}
	currentVisibleOptions = "";
}

function displayOptions()
{
	var selNode = TOURSTEPS_TREE.selectedNodes[0];
	var nodeType = selNode.stepObj.type;
	
	var optionDiv = eval("document.page2.document." + nodeType + "_div");
	var className;
	if (currentVisibleOptions != "")
	{
		var previousOptionDiv = eval("document.page2.document." + currentVisibleOptions + "_div");
		className = previousOptionDiv.getAttribute("class");
		className = className.replace("visibleOptions", "hiddenOptions");
		previousOptionDiv.setAttribute("class", className);
	}
	className = optionDiv.getAttribute("class");
	className = className.replace("hiddenOptions", "visibleOptions");
	optionDiv.setAttribute("class", className);
	
	currentVisibleOptions = nodeType;
	// We also need to populate the options with the values of the currently selected step!!!
	var params = selNode.stepObj.paramsObj.params;
	configureControls();
	switch (nodeType)
	{
		case "createCalloutStep":
		{
			if (params.length == 0)
			{
				// clearInputs
				PAGE2.calloutid_list.selectedIndex = 0;
				PAGE2.steptitle_input.value = "";
				PAGE2.stepbody_text.value = "";
			}
			else
			{
				var arg0 = params[0];
				var arg1 = params[1];
				var arg2 = params[2];
	
				nitobi.util.chooseSelectOption(arg0, PAGE2.calloutid_list);
				PAGE2.steptitle_input.value = arg1;
				PAGE2.stepbody_text.value = arg2;
			}
			break;
		}
		case "createCodeStep":
		{
			if (params.length == 0)
			{
				PAGE2.code_text.value = "";
				PAGE2.codedelay_input.value = "0";
			}
			else
			{
				var arg0 = params[0];
				var arg1 = params[1];
				
				PAGE2.code_text.value = arg0;
				PAGE2.codedelay_input.value = arg1;
			}
			break;
		}
		case "createFocusStep":
		{
			if (params.length == 0)
			{
				PAGE2.focusid_list.selectedIndex = 0;
				PAGE2.focusdelay_input.value = "0";
			}
			else
			{
				var arg0 = params[0];
				var arg1 = params[1];
				
				nitobi.util.chooseSelectOption(arg0, PAGE2.focusid_list);
				PAGE2.focusdelay_input.value = arg1;
			}
			break;
		}
		case "createMouseStep":
		{
			if (params.length == 0)
			{
				PAGE2.mousemove_list.selectedIndex = 0;
				PAGE2.mouseid_list.selectedIndex = 0;
				PAGE2.mousedelay_input.value = "0";
			}
			else
			{
				var arg0 = params[0];
				var arg1 = params[1];
				var arg2 = params[2];
				
				nitobi.util.chooseSelectOption(arg0, PAGE2.mousemove_list);
				nitobi.util.chooseSelectOption(arg1, PAGE2.mouseid_list);
				PAGE2.mousedelay_input.value = arg2;
			}
			break;
		}
		case "createFormHelperStep":
		{
			if (params.length == 0)
			{
				PAGE2.formhelperid_list.selectedIndex = 0;
				PAGE2.formaction_list.selectedIndex = 0;;
				PAGE2.formdelay_input.value = "0";
				PAGE2.formtexttype_text.value = "";
			}
			else
			{
				var arg0 = params[0];
				var arg1 = params[1];
				var arg2 = params[2];
				var arg3 = params[3];
				
				//PAGE2.formfield_input.value = arg0;
				nitobi.util.chooseSelectOption(arg0, PAGE2.formhelperid_list);
				nitobi.util.chooseSelectOption(arg1, PAGE2.formaction_list);
				PAGE2.formdelay_input.value = arg2;
				PAGE2.formtexttype_text.value = arg3;
			}
			break;
		}
	}
}

function updateStep(type)
{
	var stepObj = TOURSTEPS_TREE.selectedNodes[0].stepObj;
	switch (type)
	{
		case "callout":
		{
			var arg0 = PAGE2.calloutid_list.options[PAGE2.calloutid_list.selectedIndex].value;
			var arg1 = PAGE2.steptitle_input.value;
			var arg2 = PAGE2.stepbody_text.value;
			stepObj.paramsObj.params[0] = arg0;
			stepObj.paramsObj.params[1] = arg1;
			stepObj.paramsObj.params[2] = arg2;
			break;
		}
		case "code":
		{
			var arg0 = PAGE2.code_text.value;
			var arg1 = PAGE2.codedelay_input.value;
			stepObj.paramsObj.params[0] = arg0;
			stepObj.paramsObj.params[1] = arg1;
			break;
		}
		case "focus":
		{
			var arg0 = PAGE2.focusid_list.options[PAGE2.focusid_list.selectedIndex].value;
			var arg1 = PAGE2.focusdelay_input.value;
			stepObj.paramsObj.params[0] = arg0;
			stepObj.paramsObj.params[1] = arg1;
			break;
		}
		case "mouse":
		{
			var arg0 = PAGE2.mousemove_list.options[PAGE2.mousemove_list.selectedIndex].value;
			var arg1 = PAGE2.mouseid_list.options[PAGE2.mouseid_list.selectedIndex].value;
			var arg2 = PAGE2.mousedelay_input.value;
			stepObj.paramsObj.params[0] = arg0;
			stepObj.paramsObj.params[1] = arg1;
			stepObj.paramsObj.params[2] = arg2;
			break;
		}
		case "form":
		{
			//var arg0 = PAGE2.formfield_input.value;
			var arg0 = PAGE2.formhelperid_list.options[PAGE2.formhelperid_list.selectedIndex].value;
			var arg1 = PAGE2.formaction_list.options[PAGE2.formaction_list.selectedIndex].value;
			var arg2 = PAGE2.formdelay_input.value;
			var arg3 = PAGE2.formtexttype_text.value;
			stepObj.paramsObj.params[0] = arg0;
			stepObj.paramsObj.params[1] = arg1;
			stepObj.paramsObj.params[2] = arg2;
			stepObj.paramsObj.params[3] = arg3;
			break;
		}
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
	var nodes = TOURSTEPS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(TOURSTEPS_TREE);
	if (index > 0)
	{
		var tempValue = nodes[index -1].value;
		var tempStepObj = nodes[index - 1].stepObj;
		nodes[index - 1].value = nodes[index].value;
		nodes[index - 1].stepObj = nodes[index].stepObj;
		
		nodes[index].value = tempValue;
		nodes[index].stepObj = tempStepObj;
		nitobi.util.setTreeNodeIndex(TOURSTEPS_TREE, index - 1);
		configureControls();
		displayOptions();
	}
}


function moveDown()
{
	var nodes = TOURSTEPS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(TOURSTEPS_TREE);
	if (index < nodes.length - 1)
	{
		var tempValue = nodes[index + 1].value;
		var tempStepObj = nodes[index + 1].stepObj;
		nodes[index + 1].value = nodes[index].value;
		nodes[index + 1].stepObj = nodes[index].stepObj;
		
		nodes[index].value = tempValue;
		nodes[index].stepObj = tempStepObj;
		nitobi.util.setTreeNodeIndex(TOURSTEPS_TREE, index + 1);
		configureControls();
		displayOptions();
	}
}

function switchCalloutPreview(calloutName)
{
	CALLOUT_IMAGE.src = "../Shared/Nitobi/images/calloutsamples/" + calloutName + ".gif";
}

function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=445");
}

function configureControls()
{
	var tree = TOURSTEPS_TREE;
	var steps = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (steps.length > 1)
	{
		// Enable the remove button
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == steps[0])
			{
				// Enable Move down
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == steps[steps.length - 1])
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
	else if (steps.length == 1)
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

function validateSteps()
{
	var tree = TOURSTEPS_TREE;
	var steps = tree.getElementsByTagName("mm:treenode");
	if (steps.length < 1)
	{
		STEPSERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		STEPSERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}