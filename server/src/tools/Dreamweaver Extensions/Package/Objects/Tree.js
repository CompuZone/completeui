var ID_INPUT = document.id;
var GETHANDLER_INPUT = document.gethandler;

function canInsertObject()
{
	return nitobi.util.canInsertComponent();
}

function isDOMRequired()
{
	return false;
}

function insertObject()
{
	/*var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	dom.insertHTML(getDeclaration());
	var id = ID_INPUT.value;
	var code = nitobi.util.getComponentInitCode(id);
	
	MM.setBusyCursor();
	
	if (nitobi.util.getDWVersion() == "9")
	{
		if (typeof AssetInfo == "undefined")
		{
			dw.runCommand("NTBLoadAssetInfo.htm");
		}
		var assetList = nitobi.util.getAssetList("tree");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("tree");
		var headElement = dom.getElementsByTagName("head");
		if (headElement.length > 0)
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.tree.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.tree.js\"></script>";
		
			headElement = headElement[0];
			if (!(/nitobi.tree.css/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
			}
			if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + toolkitSrc + "\n";
			}
			if (!(/nitobi.tree.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
			}
			headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
		}
	}
	
	MM.clearBusyCursor();*/
	dw.runCommand("NTBTree.htm");
}

function getDeclaration()
{
	var id = ID_INPUT.value;
	var gethandler = GETHANDLER_INPUT.value;
	var declaration = "<ntb:tree cssclass=\"folders\"";
	if (id != "")
	{
		declaration += " id=\"" + id + "\" ";
	}
	if (gethandler != "")
	{
		declaration += "gethandler=\"" + gethandler + "\">";
	}
	else
	{
		declaration += ">\n";
		declaration += "<ntb:children>\n";
		declaration += "<ntb:node label=\"A node (without any children)\">\n";
		declaration += "<ntb:children></ntb:children>\n";
		declaration += "</ntb:node>\n";
		declaration += "<ntb:node label=\"A leaf (no possibility of children)\"></ntb:node>\n";
		declaration += "<ntb:node label=\"A node (with children)\" expanded=\"false\">\n";
		declaration += "<ntb:children>\n";
		declaration += "<ntb:node label=\"A leaf\"></ntb:node>\n";
		declaration += "</ntb:children>\n";
		declaration += "</ntb:node>\n";
		declaration += "</ntb:children>\n";
	}
	declaration += "</ntb:tree>\n";
	return declaration;
}