var PAGE1 = document.page1.document;
var BUTTONS = document.buttons.document;

var CALLOUTID_LIST = PAGE1.calloutid_list;
var CALLOUTSTYLE_LIST = PAGE1.calloutstyle_list;
var TITLE_INPUT = PAGE1.title_input;
var BODY_TEXT = PAGE1.body_text;

var CALLOUT_IMAGE = PAGE1.callout_image;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var pages = [];
pages[1] = document.page1;

var wizard;
var currentPage = 1;
var totalPages = 1;

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
	return "600,700";
}

function init()
{
	document.buttons.visibility = "visible";
	populateIdList();
}

function doFinish()
{
	insertDeclaration();
	window.close();
}

function insertDeclaration()
{
	var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	var code = getCalloutFunction();
	
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
		var assetList = nitobi.util.getAssetList("callout");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("callout");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.callout.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.callout.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.callout.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.callout.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.callout.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.callout.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.callout.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.callout.js/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + componentSrc + "\n";
				}
				headRegion.innerHTML = headRegion.innerHTML + "\n<script>" + code + "</script>\n";
			}
		}
	}
	
	MM.clearBusyCursor();
}

function getCalloutFunction()
{
	var code = "";
	var calloutId = nitobi.util.getSelectedOption(CALLOUTID_LIST);
	var calloutStyle = nitobi.util.getSelectedOption(CALLOUTSTYLE_LIST);
	var title = TITLE_INPUT.value;
	var bodyText = BODY_TEXT.value;
	
	var functionName = "";
	if (calloutId == "null")
	{
		var today = new Date();
		functionName =  "Callout" + today.valueOf();
	}
	else
	{
		functionName = calloutId + "Callout";
	}
	code += "function " + functionName + "()\n";
	code += "{\n";
	code += "\tvar calloutObj = new nitobi.callout.Callout(\"" + calloutStyle + "\");\n";
	code += "\tcalloutObj.attachToElement(\"" + calloutId + "\");\n";
	code += "\tcalloutObj.setTitle(\"" + title + "\");\n";
	code += "\tcalloutObj.setBody(\"" + bodyText.replace(/\n/g, "<br/>").replace(/\r/g, "") + "\");\n";
	code += "\tcalloutObj.show();\n";
	code += "}\n";
	code += "nitobi.html.attachEvent(window, \"load\", " + functionName + ");\n";
	return code;
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
function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=446");
}

function switchCalloutPreview(calloutName)
{
	CALLOUT_IMAGE.src = "../Shared/Nitobi/images/calloutsamples/" + calloutName + ".png";
}
