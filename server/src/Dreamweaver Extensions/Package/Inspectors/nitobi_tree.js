var ID_DIV = document.id_div.document;
var TREE_PROPS = document.tree_props.document;

var EFFECT_LIST = TREE_PROPS.effect_list;
var TARGETFRAME_INPUT = TREE_PROPS.targetframe_input;

var EXPANDED_LIST = TREE_PROPS.expanded_list;
var ROOTENABLED_LIST = TREE_PROPS.rootenabled_list;
var HOVERHIGHLIGHT_LIST = TREE_PROPS.hoverhighlight_list;

function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6087&product=all&type=art&a=10342");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:tree')
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
	populateTreeInfo(origMarkup);
}

function clearInputs()
{
	
	TARGETFRAME_INPUT.value = "";
	
	ROOTENABLED_LIST.selectedIndex = 0;
	EXPANDED_LIST.selectedIndex = 0;
	HOVERHIGHLIGHT_LIST.selectedIndex = 0;
	EFFECT_LIST.selectedIndex = 0;
}

function populateTreeInfo(declaration)
{
	var tree = nitobi.util.getTag(declaration, "ntb:tree", 0);
	var cssclass = nitobi.util.getAttribute(tree, "cssclass");
	var gethandler = nitobi.util.getAttribute(tree, "gethandler");
	var cssstyle = nitobi.util.getAttribute(tree, "cssstyle");
	var effect = nitobi.util.getAttribute(tree, "effect");
	var target = nitobi.util.getAttribute(tree, "targetframe");
	var root = nitobi.util.getAttribute(tree, "rootenabled");
	var expanded = nitobi.util.getAttribute(tree, "expanded");
	var hover = nitobi.util.getAttribute(tree, "hoverhighlight")
	
	TARGETFRAME_INPUT.value = (target?target:"");
	
	var rootSelect = ROOTENABLED_LIST;
	for (var i = 0; i < rootSelect.options.length; i++)
	{
		if (rootSelect.options[i].value == root)
		{
			rootSelect.selectedIndex = i;
			break;
		}
	}
	
	var expandedSelect = EXPANDED_LIST;
	for (var i = 0; i < expandedSelect.options.length; i++)
	{
		if (expandedSelect.options[i].value == expanded)
		{
			expandedSelect.selectedIndex = i;
			break;
		}
	}
	
	var hoverSelect = HOVERHIGHLIGHT_LIST;
	for (var i = 0; i < hoverSelect.options.length; i++)
	{
		if (hoverSelect.options[i].value == hover)
		{
			hoverSelect.selectedIndex = i;
			break;
		}
	}
	
	var effectSelect = EFFECT_LIST;
	for (var i = 0; i < effectSelect.options.length; i++)
	{
		if (effectSelect.options[i].value == effect)
		{
			effectSelect.selectedIndex = i;
			break;
		}
	}
}

function updateTree(name, value, tag)
{
	var newMarkup = nitobi.util.updateTag(name, nitobi.util.escapeDoubleQuotes(value), tag);
	if (newMarkup)
	{
		nitobi.util.setNewMarkup(newMarkup);
	}
}