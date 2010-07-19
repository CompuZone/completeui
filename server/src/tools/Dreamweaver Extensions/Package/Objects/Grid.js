var ID_INPUT = document.id;
var GETHANDLER_INPUT = document.gethandler;
var SAVEHANDLER_INPUT = document.savehandler;

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
		var assetList = nitobi.util.getAssetList("grid");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("grid");
		var headElement = dom.getElementsByTagName("head");
		if (headElement.length > 0)
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.grid.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.grid.js\"></script>";
		
			headElement = headElement[0];
			if (!(/nitobi.grid.css/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
			}
			if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + toolkitSrc + "\n";
			}
			if (!(/nitobi.grid.js/.test(headElement.innerHTML)))
			{
				headElement.innerHTML = headElement.innerHTML + componentSrc + "\n";
			}
			headElement.innerHTML = headElement.innerHTML + "\n<script>" + code + "</script>\n";
		}
	}
	
	MM.clearBusyCursor();*/
	dw.runCommand("NTBGrid.htm");
}

function getDeclaration()
{
	var id = ID_INPUT.value;
	var gethandler = GETHANDLER_INPUT.value;
	var savehandler = SAVEHANDLER_INPUT.value;
	
	var declaration = "<ntb:grid ";
	if (id != "")
	{
		declaration += "id=\"" + id + "\" ";
	}
	if (gethandler != "")
	{
		declaration += "mode=\"livescrolling\" ";
	}
	else
	{
		declaration += "mode=\"localnonpaging\" ";
	}
	if (gethandler != "")
	{
		declaration += "gethandler=\"" + gethandler + "\" ";
	}
	else
	{
		declaration += "datasourceid=\"data\" ";
	}
	if (savehandler != "")
	{
		declaration += "savehandler=\"" + savehandler + "\" ";
	}
	declaration += "height=\"300\" width=\"400\"";
	declaration += ">";
	if (gethandler != "")
	{
		var handlerFile = dw.getSiteRoot() + gethandler;
		var handler = DWfile.read(handlerFile);
		
		var fields = handler.match(/definefield\(\"\w+\"\)/gi);
		var columnNames = [];
		for (var i = 0; i < fields.length; i++)
		{
			var columns = fields[i].match(/definefield\(\"(\w+)\"\)/i);
			columnNames[i] = columns[1];
		}
		declaration += "<ntb:columns>\n";
		for (var i = 0; i < columnNames.length; i++)
		{
			// Columns should be generated either statically like this, or from the columns defined in the gethandler
			declaration += "<ntb:textcolumn width=\"100\" label=\"" + columnNames[i] + "\" xdatafld=\"" + columnNames[i] + "\"></ntb:textcolumn>\n";
		}
		declaration += "</ntb:columns>\n";
	}
	if (gethandler == "")
	{
		declaration += "<ntb:columns>\n";
		// Columns should be generated either statically like this, or from the columns defined in the gethandler
		declaration += "<ntb:textcolumn width=\"100\" label=\"Name\" xdatafld=\"Name\"></ntb:textcolumn>\n";
		declaration += "<ntb:textcolumn width=\"100\" label=\"Favourite Colour\" xdatafld=\"FavColor\"></ntb:textcolumn>\n";
		declaration += "<ntb:textcolumn width=\"100\" label=\"Favourite Animal\" xdatafld=\"FavAnimal\"></ntb:textcolumn>\n";
		declaration += "</ntb:columns>\n";
		declaration += "<ntb:datasources>\n";
		declaration += "<ntb:datasource id=\"data\">\n";
		declaration += "<ntb:datasourcestructure FieldNames=\"Name|FavColor|FavAnimal\"></ntb:datasourcestructure>\n";
		declaration += "<ntb:data>\n";
		declaration += "<ntb:e xi=\"1\" a=\"Tammara Farley\" b=\"blue\" c=\"cat\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"2\" a=\"Dwana Barton\" b=\"red\" c=\"dog\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"3\" a=\"Lucas Blake\" b=\"green\" c=\"ferret\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"4\" a=\"Lilli Bender\" b=\"grey\" c=\"squirrel\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"5\" a=\"Emilia Foster\" b=\"orange\" c=\"pig\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"6\" a=\"Steve Irwin\" b=\"beige\" c=\"crocodile\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"7\" a=\"Crystal House\" b=\"brown\" c=\"horse\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"8\" a=\"Lindsay Cohen\" b=\"cyan\" c=\"cow\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"9\" a=\"Blake Farley\" b=\"blue\" c=\"cat\" ></ntb:e>\n";
		declaration += "<ntb:e xi=\"10\" a=\"Farley Barton\" b=\"red\" c=\"dog\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"11\" a=\"Bender Dwana\" b=\"green\" c=\"ferret\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"12\" a=\"Lindsay Bender\" b=\"grey\" c=\"squirrel\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"13\" a=\"Emilia Foster\" b=\"orange\" c=\"pig\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"14\" a=\"Dwana Irwin\" b=\"beige\" c=\"crocodile\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"15\" a=\"Steve Lilli\" b=\"brown\" c=\"horse\"></ntb:e>\n";
		declaration += "<ntb:e xi=\"16\" a=\"Lindsay Dwana\" b=\"cyan\" c=\"cow\"></ntb:e>\n";
		declaration += "</ntb:data>\n</ntb:datasource>\n</ntb:datasources>\n";
	}
	declaration += "</ntb:grid>\n";
	
	return declaration;
}

function showWizard()
{
	var dom = dw.getDocumentDOM();
	dw.runCommand("NTBDatabind.htm");
	// Need to populate the gethandler field with the file name of the handler created from the above command.
	var handler = nitobi.util.lastFileCreated;
	var root = dw.getSiteRoot();
	GETHANDLER_INPUT.value = handler.substr(root.length);
	nitobi.util.lastFileCreated = "";
}

function showSaveWizard()
{
	var dom = dw.getDocumentDOM();
	dw.runCommand("NTBSaveHandler.htm");
	// Need to populate the gethandler field with the file name of the handler created from the above command.
	var handler = nitobi.util.lastSaveFileCreated;
	var root = dw.getSiteRoot();
	SAVEHANDLER_INPUT.value = handler.substr(root.length);
	nitobi.util.lastSaveFileCreated = "";
}