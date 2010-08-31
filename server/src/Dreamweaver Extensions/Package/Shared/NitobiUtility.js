//SHARE-IN-MEMORY=true

/**
 * Utility functions shared by Nitobi Extensions
 */
if (typeof nitobi == "undefined")
{
	nitobi = {};
}
if (typeof nitobi.util == "undefined")
{
	nitobi.util = {};
}

nitobi.util.lastFileCreated = "";
nitobi.util.lastSaveFileCreated = "";

nitobi.util.assetSourceDir = "";

/**
 * Given a string that contains an xml element, it will set attribute 'name'
 * with value 'value'.
 *
 * Needed this function because when dealing with translated components, we
 * deal with strings representing the untranslated markup.  We need to
 * be able to manipulate the elements in the strings.
 */
nitobi.util.setAttribute = function(tag, name, value)
{
	var nameTest = new RegExp("\\b" + name + "\\b", "i");
	if (nameTest.test(tag))
	{
		var nameMatch = new RegExp(name + "=(\"|\').*?\\1", "i");
		tag = tag.replace(nameMatch, name + "=\"" + value + "\"");
	}
	else if (value != "")
	{
		var insertIndex = tag.indexOf(">");
		tag = tag.substring(0, insertIndex) + " " + name + "=\"" + value + "\"" + tag.substring(insertIndex);
	}
	return tag;
}

/**
 * Given a string that contains an xml element, it will get attribute 'name'.
 *
 * Needed this function because when dealing with translated components, we
 * deal with strings representing the untranslated markup.  We need to
 * be able to manipulate the elements in the strings.
 */
nitobi.util.getAttribute = function(tag, name, defaultValue)
{
	var nameMatch = new RegExp("\\b" + name + "=(\"|\')(.*?)\\1", "i");
	if (tag == null)
		return null;
	var value = tag.match(nameMatch);
	if (value == null || value.length < 3)
	{
		return (defaultValue?defaultValue:null);
	}
	else
	{
		return value[2];
	}
}

nitobi.util.removeAttribute = function(tag, name)
{
	var nameMatch = new RegExp("\\s*" + name + "=(?:\'|\")(?:\\w*)(?:\'|\")", "i");
	tag = tag.replace(nameMatch, "");
	return tag;
}

/**
 * Given a string that contains xml markup, it will find the start tag for
 * 'tagName'.
 *
 * Needed this function because when dealing with translated components, we
 * deal with strings representing the untranslated markup.  We need to
 * be able to manipulate the elements in the strings.
 */
nitobi.util.getTag = function(source, tagName, index)
{
	var tagMatch = new RegExp("<" + tagName + "\\b[\\s\\S]*?>", "gi");
	var tag = source.match(tagMatch);
	if (tag == null || index >= tag.length)
	{
		return null;
	}
	if (index == null)
	{
		return tag;
	}
	return tag[index];
}

nitobi.util.getOriginalMarkup = function getOriginalMarkup()
{
	var currentDOM = dw.getDocumentDOM();
    var currSelection = currentDOM.getSelection();
    var lockedRegion = currentDOM.offsetsToNode(currSelection[0],currSelection[0]+1);

    if (lockedRegion.nodeType != Node.ELEMENT_NODE) 
	{
        return ""; 
    }
	return unescape(lockedRegion.getAttribute("ORIG"));
}

nitobi.util.setNewMarkup = function setNewMarkup(newMarkup)
{
	var currentDOM = dw.getDocumentDOM();
	var currSelection = currentDOM.getSelection();

	var docSrc = currentDOM.documentElement.outerHTML;
	var beforeSelStr = docSrc.substring(0, currSelection[0] );
	var afterSelStr = docSrc.substring(currSelection[1]);

	docSrc = beforeSelStr + newMarkup + afterSelStr;
	currentDOM.documentElement.outerHTML = docSrc;
	currentDOM.setSelection(currSelection[0], currSelection[0]+1);
}

nitobi.util.updateTag = function(name, value, tag)
{
	var origMarkup = nitobi.util.getOriginalMarkup();	
	var tag = nitobi.util.getTag(origMarkup, tag, 0);
	if (tag != null)
	{
		var startIndex = origMarkup.indexOf(tag);
		var endIndex = startIndex + tag.length;
		if (value == nitobi.util.getAttribute(tag, name) || (value == "" && nitobi.util.getAttribute(tag, name) == null))
		{
			return null;
		}
		else
		{
			/*if (name == "id")
			{
				var oldId = nitobi.util.getAttribute(tag, "id");
				var idRegExp = new RegExp("nitobi\\.loadComponent\\s*?\\(\\s*?[\"']" + oldId + "[\"']\\)");
				var scriptTags = dw.getDocumentDOM().getElementsByTagName("script");
				for( var i = 0; i < scriptTags.length; i++ )
				{
					if( scriptTags[i].innerHTML.match(idRegExp) )
					{
						scriptTags[i].innerHTML = scriptTags[i].innerHTML.replace(idRegExp, "nitobi.loadComponent('" + value + "')");
					}
				}
				//origMarkup = origMarkup.replace(idRegExp, "nitobi.loadComponent('" + value + "')");
			}*/
			if (value != "")
				tag = nitobi.util.setAttribute(tag, name, value);
			else
				tag = nitobi.util.removeAttribute(tag, name);
			var newMarkup = origMarkup.substring(0, startIndex) + tag + origMarkup.substring(endIndex);
			return newMarkup;
		}
	}
}

/*nitobi.util.updateId = function(id, tag)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var tag = nitobi.util.getTag(origMarkup, tag, 0);
	if (tag != null)
	{
		if (value == nitobi.util.getAttribute(tag, "id") || (value == "" && nitobi.util.getAttribute(tag, "id") == null))
		{
			return null;
		}
		else
		{
			var startIndex = origMarkup.indexOf(tag);
			var endIndex = startIndex + tag.length;
			
			var oldId = nitobi.util.getAttribute(tag, "id");
			tag = nitobi.util.setAttribute(tag, name, value);
			
			var newMarkup = origMarkup.substring(0, startIndex) + tag + origMarkup.substring(endIndex);
			var idRegExp = new RegExp("nitobi\\.loadComponent\\s*?\\(\\s*?[\"']" + oldId + "[\"']\\)");
			alert(oldId);
			newMarkup.replace(idRegExp, "nitobi.loadComponent('" + id + "')");
			return newMarkup;
		}
	}
}*/

nitobi.util.createAssetsList = function(source)
{
	var list = new Array();
	if (dwscripts.isFile(source))
	{
		var dest = source.match(/Configuration\/Shared\/(.*)/);
		var destUrl = dest[1];
		
		var src = source.match(/Configuration\/(.*)/);
		var srcUrl = src[1];
		
		var assetInfo = new AssetInfo(srcUrl, destUrl, "", false);
		var assetList = [assetInfo];
		return assetList;
	}
	
	var contents = dwscripts.listFolder(source);
	for (var i = 0; i < contents.length; i++)
	{
		var asset = nitobi.util.createAssetsList(source + "/" + contents[i]);
		list = list.concat(asset);
	}
	return list;
}

nitobi.util.getComponentInitCode = function(id)
{
	return "nitobi.html.attachEvent(window,\"load\",function(){nitobi.loadComponent(\"" + id + "\")});";
}

nitobi.util.getAssetList = function(component)
{
	var dom = dw.getDocumentDOM();
	var stylesheet = "nitobi." + component + ".css";
	var script = "nitobi." + component + ".js";
	var sourceDir = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/style/" + component;
	//var sourceDir = nitobi.util.assetSourceDir + "style/" + component;
	var assetList = nitobi.util.createAssetsList(sourceDir);
	var assetInfo = new AssetInfo("Shared/Nitobi/Assets/style/" + stylesheet, "Nitobi/Assets/style/" + stylesheet, "link", false);
	assetList.push(assetInfo);
	assetInfo = new AssetInfo("Shared/Nitobi/Assets/script/nitobi.toolkit.js", "Nitobi/Assets/script/nitobi.toolkit.js", "", false);
	assetList.push(assetInfo);
	assetInfo = new AssetInfo("Shared/Nitobi/Assets/script/" + script, "Nitobi/Assets/script/" + script, "javascript", false);
	assetList.push(assetInfo);
	
	return assetList;
}

nitobi.util.canInsertComponent = function()
{
	var dom = dw.getDocumentDOM();
	if( dom.URL == '' )
	{
		if(confirm('Please save this document before inserting Nitobi components'))
		{
			if (dw.canSaveDocument(dom))
			{
				dw.saveDocument(dom);
				var saved = (dom.URL != '');
				return saved;
			}
		}
		return false;
	}
}

nitobi.util.addNitobiNamespace = function(dom)
{
	var documentElement = dom.documentElement;
	if (!/<html.*?xmlns:ntb/.test(documentElement.outerHTML))
	{
		dom.documentElement.outerHTML = dom.documentElement.outerHTML.replace(/<html\s*(\S*)>/, "<html $1 xmlns:ntb=\"http://www.nitobi.com\">");
	}
}

nitobi.util.getDWVersion = function()
{
	if (document.getElementById)
	{
		return "9";
	}
	else
	{
		return "8";
	}
}

nitobi.util.chooseSelectOption = function(value, selectElement)
{
	for (var i = 0; i < selectElement.options.length; i++)
	{
		if (value == selectElement.options[i].value)
		{
			selectElement.selectedIndex = i;
			return true;
		}
	}
	return false;
}

nitobi.util.getSelectedOption = function(selectElement)
{
	var index = selectElement.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		return selectElement.options[index].value;
	}
}

nitobi.util.getTreeNodeIndex = function(tree) 
{
	var index = -1;
    var selNode = tree.selectedNodes[0];
    var nodes = tree.getElementsByTagName("mm:treenode");
    for (i = 0; i < nodes.length; i++) 
	{
        if (nodes[i] == selNode) 
		{
            index = i;
            break;
        }
    }
    return index;
}

nitobi.util.getNodeIndex = function(selNode, context)
{
	var index = -1;
    var nodes = context.childNodes;
    for (i = 0; i < nodes.length; i++) 
	{
        if (nodes[i] == selNode) 
		{
            index = i;
            break;
        }
    }
    return index;
}

nitobi.util.setTreeNodeIndex = function(tree, index) 
{
    var nodes = tree.getElementsByTagName("MM:TREENODE");
    var currentIndex = nitobi.util.getTreeNodeIndex(tree);
    if (currentIndex >= 0) {
        nodes[currentIndex].removeAttribute("selected");
    }
    nodes[index].setAttribute("selected", "selected");
    var selNode = nodes[index];
    while (selNode.parentNode.tagName.toLowerCase() == "mm:treenode") 
	{
        selNode.parentNode.state = "expanded";
        selNode = selNode.parentNode;
    }
}

nitobi.util.escapeSingleQuotes = function(target)
{
	return target.replace(/'/g, "\\'");
}

nitobi.util.escapeDoubleQuotes = function(target)
{
	return target.replace(/"/g, "&quot;");
}

nitobi.util.unescapeDoubleQuotes = function(target)
{
	return target.replace(/&quot;/g, "\"");
}

nitobi.util.copyAssets = function(componentName)
{
	var siteRoot = dw.getSiteRoot();
	var configPath = dw.getConfigurationPath();
	DWfile.createFolder(siteRoot + "Nitobi");
	DWfile.createFolder(siteRoot + "Nitobi/Assets");
	DWfile.createFolder(siteRoot + "Nitobi/Assets/script");
	DWfile.createFolder(siteRoot + "Nitobi/Assets/style");

	var stylesheetSource = configPath + "/Shared/Nitobi/Assets/style/nitobi." + componentName + ".css";
	//var stylesheetSource = nitobi.util.assetSourceDir + "style/nitobi." + componentName + ".css";
	var stylesheetDest = siteRoot + "Nitobi/Assets/style/nitobi." + componentName + ".css";
	
	var scriptSource = configPath + "/Shared/Nitobi/Assets/script/nitobi." + componentName + ".js";
	//var scriptSource = nitobi.util.assetSourceDir + "script/nitobi." + componentName + ".js";
	var scriptDest = siteRoot + "Nitobi/Assets/script/nitobi." + componentName + ".js";
	
	var toolkitSource = configPath + "/Shared/Nitobi/Assets/script/nitobi.toolkit.js";
	//var toolkitSource = nitobi.util.assetSourceDir + "script/nitobi.toolkit.js";
	var toolkitDest = siteRoot + "Nitobi/Assets/script/nitobi.toolkit.js";
	
	var styleSource = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/style/" + componentName;
	//var styleSource = nitobi.util.assetSourceDir + "style/" + componentName;
	var styleDest = siteRoot + "Nitobi/Assets/style/" + componentName;
	
	if (!DWfile.exists(styleDest))
	{
		DWfile.createFolder(styleDest);
		nitobi.util.copyDir(styleSource, styleDest);
	}
	if (!DWfile.exists(stylesheetDest))
	{
		DWfile.copy(stylesheetSource, stylesheetDest);
	}
	if (!DWfile.exists(scriptDest))
	{
		DWfile.copy(scriptSource, scriptDest);
	}
	if (!DWfile.exists(toolkitDest))
	{
		DWfile.copy(toolkitSource, toolkitDest);
	}
}

nitobi.util.copyDir = function(source, dest)
{
	if (dwscripts.isFile(source))
	{
		DWfile.copy(source, dest);
		return;
	}
	
	var contents = dwscripts.listFolder(source);
	for (var i = 0; i < contents.length; i++)
	{
		if (dwscripts.isFolder(source + "/" + contents[i]))
		{
			if (!DWfile.exists(dest + "/" + contents[i]))
			{
				DWfile.createFolder(dest + "/" + contents[i]);
			}
		}
		nitobi.util.copyDir(source + "/" + contents[i], dest + "/" + contents[i]);
	}
	return;
}

nitobi.util.getAssetSourceDir = function()
{
	if (nitobi.util.assetSourceDir == "")
	{
		var source = DWfile.read(dw.getConfigurationPath() + "/Shared/Nitobi/config/assetSourceDir.txt");
		if (source == "")
		{
			dw.runCommand("NTBChooseAssetSource.htm");
		}
		else 
		{
			nitobi.util.assetSourceDir = source;
		}
	}
	return nitobi.util.assetSourceDir;
}

nitobi.util.isUrl = function(testUrl)
{
	return /(?:ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(testUrl);
}

nitobi.util.validateId = function()
{
}

nitobi.util.getIds = function()
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

nitobi.util.isPixelDimensions = function(target)
{
	if (target.indexOf("px") != -1)
	{
		var value = target.substr(0, target.length - 2);
		if (isNaN(value) ||  value == "" || value.indexOf(".") != -1)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}

nitobi.util.clearTree = function(tree)
{
	var children = tree.childNodes;
	for (var i = 0; i < children.length; i++)
	{
		var child = children[i];
		if (child.tagName.toLowerCase() == "mm:treenode")
		{
			child.outerHTML = "";
		}
	}
}

nitobi.util.isInvalidDate = function(date)
{
	return (date == null) || (date.toString() == 'Invalid Date');
}

nitobi.util.getPathToRoot = function()
{
	var root = dw.getSiteRoot();
	var documentPath = dw.getDocumentPath("document");
	
	var relativePath = documentPath.replace(root, "");
	var paths = relativePath.split("/");
	var pathPrefix = "";
	for (var i = 0; i < paths.length - 1; i++)
	{
		pathPrefix += "../";
	}
	return pathPrefix;
}