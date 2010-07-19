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
		var assetList = nitobi.util.getAssetList("tabstrip");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("tabstrip");
		var headElement = dom.getElementsByTagName("head");
		if (headElement.length > 0)
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.tabstrip.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.tabstrip.js\"></script>";
		
			headElement = headElement[0];
			if (!(/nitobi.tabstrip.css/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
			}
			if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + toolkitSrc + "\n";
			}
			if (!(/nitobi.tabstrip.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
			}
			headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
		}
	}
	
	MM.clearBusyCursor();*/
	dw.runCommand("NTBTabstrip.htm");
}

function getDeclaration()
{
	var id = ID_INPUT.value;
	var declaration = "<ntb:tabstrip ";
	if (id != "")
	{
		declaration += "id=\"" + id + "\" ";
	}
	declaration += "width=\"400px\" ";
	declaration += "height=\"350px\">\n";
	declaration += "<ntb:tabs align=\"center\" overlap=\"15\">\n";
	
	declaration += "<ntb:tab width=\"150px\" label=\"Nitobi KB\" containertype=\"iframe\" source=\"http://www.nitobi.com/kb\"></ntb:tab>\n";
	declaration += "<ntb:tab width=\"150px\" label=\"Nitobi Blogs\" containertype=\"iframe\" source=\"http://blogs.nitobi.com\"></ntb:tab>\n";
	declaration += "<ntb:tab width=\"150px\" label=\"Ajaxian\" containertype=\"iframe\" source=\"http://www.ajaxian.com\"></ntb:tab>\n";
	
	declaration += "</ntb:tabs>\n";
	declaration += "</ntb:tabstrip>\n";
	return declaration;
}