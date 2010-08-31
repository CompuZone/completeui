var ID_INPUT = document.id;

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
		var assetList = nitobi.util.getAssetList("fisheye");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("fisheye");
		var headElement = dom.getElementsByTagName("head");
		if (headElement.length > 0)
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.fisheye.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.fisheye.js\"></script>";
		
			headElement = headElement[0];
			if (!(/nitobi.fisheye.css/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
			}
			if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + toolkitSrc + "\n";
			}
			if (!(/nitobi.fisheye.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
			}
			headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
		}
	}
	
	MM.clearBusyCursor();*/
	dw.runCommand("NTBFisheye.htm");
}
	

function getDeclaration()
{
	var id = ID_INPUT.value;
	
	var declaration = "<ntb:fisheye ";
	if (id != "")
	{
		declaration += "id=\"" + id + "\" ";
	}
	declaration += "opendirection=\"up\" ";
	declaration += "expanddirection=\"right\" ";
	declaration += "growpercent=\"200\" ";
	declaration += "iconwidth=\"40px\">";
	
	declaration += "<ntb:menuitem label=\"Item0\" imagesrc=\"Nitobi/Assets/style/fisheye/qmark.png\"></ntb:menuitem>\n";
	declaration += "<ntb:menuitem label=\"Item1\" imagesrc=\"Nitobi/Assets/style/fisheye/qmark.png\"></ntb:menuitem>\n";
	declaration += "<ntb:menuitem label=\"Item2\" imagesrc=\"Nitobi/Assets/style/fisheye/qmark.png\"></ntb:menuitem>\n";
	
	declaration += "</ntb:fisheye>\n";
	return declaration;
}