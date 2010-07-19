var ID_INPUT = document.id;
var DATASOURCEURL_INPUT = document.datasourceurl;

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
		var assetList = nitobi.util.getAssetList("combo");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("combo");
		var headElement = dom.getElementsByTagName("head");
		if (headElement.length > 0)
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.combo.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.combo.js\"></script>";
		
			headElement = headElement[0];
			if (!(/nitobi.combo.css/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
			}
			if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + toolkitSrc + "\n";
			}
			if (!(/nitobi.combo.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
			}
			headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
		}
	}
	
	MM.clearBusyCursor();*/
	dw.runCommand("NTBComboCombo.htm");
}

function getDeclaration()
{
	var id = ID_INPUT.value;
	var datasourceurl = DATASOURCEURL_INPUT.value;
	var declaration = "<ntb:Combo ";
	if (id != "")
	{
		declaration += "Id=\"" + id + "\" ";
	}
	if (datasourceurl != "")
	{
		declaration += "Mode=\"Classic\" ";
	}
	else
	{
		declaration += "Mode=\"Unbound\" ";
	}	
	declaration += ">\n";
	if (datasourceurl != "")
	{
		var handlerFile = dw.getSiteRoot() + datasourceurl;
		var handler = DWfile.read(handlerFile);
		
		var searchColumnMatch = handler.match(/\"*SearchColumn\"*(?:\s\w+|\s*)=\s*\"(\w*)\"/i);
		var searchColumnName = "";
		if (searchColumnMatch.length > 1)
		{
			searchColumnName = searchColumnMatch[1];
		}
		var searchColumnIndex;
		
		var fields = handler.match(/definefield\(\"\w+\"\)/gi);
		var columnNames = [];
		for (var i = 0; i < fields.length; i++)
		{
			var columns = fields[i].match(/definefield\(\"(\w+)\"\)/i);
			columnNames[i] = columns[1];
			if (columns[1] == searchColumnName)
			{
				searchColumnIndex = i;
			}
		}
		declaration += "<ntb:ComboTextBox ";
		declaration += "Width=\"250px\" DataFieldIndex=\"" + searchColumnIndex + "\"";
		declaration += "></ntb:ComboTextBox>\n";
		declaration += "<ntb:ComboList ";
		declaration += "Width=\"" + columnNames.length * 100 + "px\" ";
		declaration += "DatasourceUrl=\"" + datasourceurl + "\">\n";
		

		for (var i = 0; i < columnNames.length; i++)
		{
			declaration += "<ntb:ComboColumnDefinition width=\"100px\" HeaderLabel=\"" + columnNames[i] + "\" DataFieldIndex=\"" + i + "\"></ntb:ComboColumnDefinition>\n";
		}		
		declaration += "</ntb:ComboList>\n";
	}
	else
	{
		declaration += "<ntb:ComboTextBox ";
		declaration += "Width=\"100px\" DataFieldIndex=\"0\"";
		declaration += "></ntb:ComboTextBox>\n";
		declaration += "<ntb:ComboList>\n";
		declaration += "<ntb:ComboColumnDefinition Width=\"100px\" DataFieldIndex=\"0\"></ntb:ComboColumnDefinition>\n";
		declaration += "<ntb:ComboColumnDefinition Width=\"70px\" DataFieldIndex=\"1\"></ntb:ComboColumnDefinition>\n";
		declaration += "</ntb:ComboList>\n";
		declaration += "<ntb:ComboValues fields=\"City|Population\">\n";
		declaration += "<ntb:ComboValue a=\"Vancouver\" b=\"3,000,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Toronto\" b=\"4,500,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Ottawa\" b=\"1,000,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"California\" b=\"4,500,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Halifax\" b=\"900,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Calgary\" b=\"1,500,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Red Deer\" b=\"100,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Prince George\" b=\"200,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Portland\" b=\"1,500,000\" ></ntb:ComboValue>\n";
		declaration += "<ntb:ComboValue a=\"Atlanta\" b=\"4,500,000\" ></ntb:ComboValue>\n";
		declaration += "</ntb:ComboValues>\n";
	}
	declaration += "</ntb:Combo>\n";
	return declaration;
}

function showWizard()
{
	var dom = dw.getDocumentDOM();
	dw.runCommand("NTBComboCombo.htm");
	// Need to populate the gethandler field with the file name of the handler created from the above command.
	var handler = nitobi.util.lastFileCreated;
	var root = dw.getSiteRoot();
	DATASOURCEURL_INPUT.value = handler.substr(root.length);
	nitobi.util.lastFileCreated = "";
}