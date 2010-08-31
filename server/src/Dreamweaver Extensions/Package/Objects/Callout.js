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
	var code = "";
	code += "function runCallout() {\n";
	code += "var myCallout;\n";
	code += "myCallout = new nitobi.callout.Callout(\"clean\");\n";
	code += "myCallout.attachToElement(\"callout_button\");\n";
	code += "myCallout.setTitle(\"Test callout!\");\n";
	code += "myCallout.setBody(\"This is an example callout.  Callouts can be attached to any element on your page.\");\n";
	code += "myCallout.show();\n}\n";
	code += "nitobi.html.attachEvent(window,\"load\",runCallout);\n";
	
	MM.setBusyCursor();
	
	if (nitobi.util.getDWVersion() == "9")
	{
		if (typeof AssetInfo == "undefined")
		{
			dw.runCommand("NTBLoadAssetInfo.htm");
		}
		var assetList = nitobi.util.getAssetList("callout");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{	
		nitobi.util.copyAssets("callout");
		var headElement = dom.getElementsByTagName("head");
		if (headElement.length > 0)
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.callout.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.callout.js\"></script>";
			headElement = headElement[0];
			if (!(/nitobi.callout.css/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
			}
			if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + toolkitSrc + "\n";
			}
			if (!(/nitobi.callout.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
			}
			headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
		}
	}
	
	MM.clearBusyCursor();*/
	dw.runCommand("NTBCallout.htm");
}

function getDeclaration()
{
	var declaration = "";
	declaration += "<div style=\"height:300px;\">\n";
	declaration += "<input id=\"callout_button\" type=\"button\" value=\"Callout\"/>\n";
	declaration += "</div>\n";
	return declaration;
}