var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var PAGE3 = document.page3.document;
var BUTTONS = document.buttons.document;

var SERVER_LIST = PAGE1.server_list;
var CONNECTION_LIST = PAGE1.connection_list;
var TABLE_LIST = PAGE1.table_list;
var DATABASE_LIST = PAGE1.database_list;
var KEY_LIST = PAGE1.key_list;

var CONNECTIONERROR_DIV = PAGE1.connectionerror_div;
var TABLEERROR_DIV = PAGE1.tableerror_div;
var KEYERROR_DIV = PAGE1.keyerror_div;

var PAGE2WARNING_DIV = PAGE2.page2Warning_div;
var HIERARCHYTITLE_SPAN = PAGE2.hierarchytitle_span;
var COLUMNSTITLE_SPAN = PAGE2.columnstitle_span;
var TABLES_TREE = PAGE2.tables_tree;
var COLUMNS_TREE = PAGE2.columns_tree;
var BUFFER_TREE = PAGE2.buffer_tree;
var LABEL_INPUT = PAGE2.label_input;
var COLUMNTYPE_LIST = PAGE2.columntype_list;
var WIDTH_INPUT = PAGE2.width_input;
var OPTIONS_DIV = PAGE2.options_div;
var TOGGLE_BUTTON = PAGE2.toggle_button;
var PKEY_CHECK = PAGE2.pkey_check;
var FKEY_CHECK = PAGE2.fkey_check;

var TADD_BUTTON = PAGE2.tadd_button;
var TREMOVE_BUTTON = PAGE2.tremove_button;
var TUP_BUTTON = PAGE2.tup_button;
var TDOWN_BUTTON = PAGE2.tdown_button;

var ADD_BUTTON = PAGE2.add_button;
var REMOVE_BUTTON = PAGE2.remove_button;
var UP_BUTTON = PAGE2.up_button;
var DOWN_BUTTON = PAGE2.down_button;

var COLUMNSERROR_DIV = PAGE2.columnserror_div;

var SORTCOLUMN_LIST = PAGE3.sortcolumn_list;
var SORTDIRECTION_LIST = PAGE3.sortdirection_list;
var ID_INPUT = PAGE3.id_input;
var SAVE_CHECK = PAGE3.save_check;
var MODE_LIST = PAGE3.mode_list;
var GRIDWIDTH_INPUT = PAGE3.width_input;
var HEIGHT_INPUT = PAGE3.height_input;
var GRIDOPTIONS_DIV = PAGE3.gridoptions_div;
var GRIDTOGGLE_BUTTON = PAGE3.gridtoggle_button;

var INVALID_DIV = PAGE3.invalid_div;
var HEIGHTERROR_DIV = PAGE3.heighterror_div;
var WIDTHERROR_DIV = PAGE3.widtherror_div;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var pages = new Array();
pages[1] = document.page1;
pages[2] = document.page2;
pages[3] = document.page3;

var currentPage = 1;
var totalPages = 3;

// TODO: Don't need these.
var gethandler = "";
var savehandler = "";

var getHandlerHash = {};
var saveHandlerHash = {};

var allColumns = [];
var allTables = [];
var columnTableHash = {};
//var currentColumns = [];

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
	return "650,650";
}

/******************************
 INITIALIZATION
*******************************/
function init()
{
	nitobi.util.getAssetSourceDir();
	document.page1.visibility = "visible";
	document.buttons.visibility = "visible";
	
	setServerModelList();
	populateConnectionList();
	populateTableList();
	populateDatabaseList();
}

function setServerModelList()
{
	var dom = dw.getDocumentDOM();
	var serverModelName = dom.serverModel.getServerName();
	if (serverModelName == "Cold Fusion")
	{
		serverModelName = "cfm";
	}
	nitobi.util.chooseSelectOption(serverModelName.toLowerCase(), SERVER_LIST);
}

function populateConnectionList()
{
	var connections = MMDB.getConnectionList();
	var connection_list = CONNECTION_LIST;
	connection_list.innerHTML = "";
	for (var i = 0; i < connections.length; i++)
	{
		var connName = connections[i];
		var option = "<option value=\"" + connName + "\">" + connName + "</option>";
		connection_list.innerHTML += option;
	}
	connection_list.selectedIndex = 0;
}

function populateTableList()
{
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var tables = MMDB.getTables(connName);
	allTables = [];
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		allTables.push(tableName);
	}
	validateConnectionInfo();
}

function populateDatabaseList()
{
	var list = DATABASE_LIST;
	var serverModel = nitobi.util.getSelectedOption(SERVER_LIST);
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = 0;
	validateConnectionInfo();
}

function populateColumnLists()
{
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var tableName = nitobi.util.getSelectedOption(TABLE_LIST);
	
	// allColumns is a list of all the column names.  We use it when adding new
	// columns to ensure only those columns that are not already included be made available
	// to the customer.
	allColumns = [];
	if (connName != "" && tableName != "")
	{
		var columns = MMDB.getColumnsOfTable(connName, tableName);
		var columnMarkup = "";
		for (var i = 0; i < columns.length; i++)
		{
			var columnName = columns[i];
			columnMarkup += "<option value=\"" + columnName + "\">" + columnName + "</option>";
		}
		var lists = document.getElementsByTagName("select");
		for (var i = 0; i < lists.length; i++)
		{
			var list = lists[i];
			if (list.getAttribute("class").indexOf("columnsList") != -1)
			{
				list.innerHTML = columnMarkup;
				list.selectedIndex = 0;
			}
		}
	}
}

function populateColumnsTree()
{
	var tree = TABLES_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		var tableName = selNode.value;
		var colTree = COLUMNS_TREE;
		
		clearTree(colTree);
		if (columnTableHash[tableName] != null)
		{
			colTree.innerHTML += columnTableHash[tableName];
		}
		else
		{
			// Put all the columns into the tree and put html into the hash for later
			var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
			var columns = MMDB.getColumnsOfTable(connName, tableName);
			var node = "";
			for (var i = 0; i < columns.length; i++)
			{
				var column = columns[i];
				node += "<mm:treenode value=\"" + column + "|" + column + "|textcolumn|100||\"";
				if (i == 0)
					node += " selected";
				node += "></mm:treenode>";
			}
			columnTableHash[tableName] = node;
			colTree.innerHTML += node;
		}
	}
	populateColumnDetailPanel();
	configureTableControls();
}

function clearTree(tree)
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

/******************************
 NAVIGATION
*******************************/
function doNext()
{
	if (currentPage < totalPages)
	{
		if (currentPage == 1)
		{
			if (validateConnectionInfo())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if (currentPage == 2)
		{
			if (validatePage2())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
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
		if (validateGridProperties())
		{
			createGetHandlers();
			if (SAVE_CHECK.checked == true)
			{
				createSaveHandlers();
			}
			insertDeclaration();
			nitobi.util.addNitobiNamespace(dw.getDocumentDOM());
			window.close();
		}
		else
		{
			hidePage(3);
			showPage(3);
		}
	}
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
		NEXT_BUTTON.value = "Next";
		NEXT_BUTTON.disabled = false;
	}
}

function doHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6874&product=all&type=art&a=10766");
}

function showPage(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

function hidePage(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}


function clearColumnsTree()
{
	var tree = COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		column.outerHTML = "";
		column = null;
	}
}

function populateTreeFromObjects(columns)
{
	var columnNodes = COLUMNS_TREE.getElementsByTagName("mm:treecolumn");
	var columnDec = "";
	for (var i = 0; i < columnNodes.length; i++)
	{
		columnDec += columnNodes[i].outerHTML;
	}
	COLUMNS_TREE.innerHTML = "";
	COLUMNS_TREE.innerHTML += columnDec;
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		
		COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column.name + "|" + column.label + "|textcolumn|100\"></mm:treenode>";
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.GridColumn(column, column, "textcolumn", "100");
		COLUMNS_TREE.childNodes[COLUMNS_TREE.childNodes.length - 1].colObj = column;
	}
}

function populateColumnDetailPanel()
{
	clearOptions();
	var tree = COLUMNS_TREE;
	var treeNodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		LABEL_INPUT.value = values[1];
		nitobi.util.chooseSelectOption(values[2], COLUMNTYPE_LIST);
		WIDTH_INPUT.value = values[3];
		PKEY_CHECK.checked = (values[4] == "Y"?true:false);
		FKEY_CHECK.checked = (values[5] == "Y"?true:false);
		configureControls();
	}
}

/*function createSaveHandler()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var destFile = wizard.copyHandlerFile(serverModelName);

	var file = wizard.createHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	savehandler = destFile.substr(root.length);
}

function createHandler()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var sourceFile = nitobi.dw.GridWizard.getSourceFile(serverModelName);
	var destFile = nitobi.dw.GridWizard.getDestFile(serverModelName);
	DWfile.copy(sourceFile, destFile);
	var file = wizard.createHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	gethandler = destFile.substr(root.length);
	
	nitobi.dw.GridWizard.copyXmlConverter(serverModelName);
}*/

function createGetHandlers()
{
	var wizard = nitobi.dw.TreeGridWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var dbName = nitobi.util.getSelectedOption(DATABASE_LIST);
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var id = ID_INPUT.value;
	var rootNode = getFirstNode(TABLES_TREE);
	var rootTable = rootNode.value;
	for (var name in columnTableHash)
	{
		if (columnTableHash[name] == null)
			return;
		// For each table in the selected hierarchy, we
		// 1) copy the template backend script
		// 2) create the handler from the template (specify whether it is root and if saving is enabled).
		// 3) remember the name of the handler -> tableName association in a hash
		// 4) copy the appropriate xml converter
		var sourceFile = nitobi.dw.TreeGridWizard.getSourceFile(serverModelName);
		var destFile = nitobi.dw.TreeGridWizard.getDestFile(serverModelName, id, name);
		DWfile.copy(sourceFile, destFile);
		var pKey = getPKey(name);
		var fKey = getFKey(name);
		var sortDir = "ASC";
		var sortCol = pKey;
		var file = wizard.createHandler(destFile, name, pKey, fKey, sortDir, sortCol, serverModelName, dbName, connName, (name == rootTable?true:false));
		DWfile.write(destFile, file);
		var siteRoot = dw.getSiteRoot();
		getHandlerHash[name] = destFile.substr(siteRoot.length);
	}
	nitobi.dw.TreeGridWizard.copyXmlConverter(serverModelName);
}

function createSaveHandlers()
{
	var wizard = nitobi.dw.tgsw.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var dbName = nitobi.util.getSelectedOption(DATABASE_LIST);
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var id = ID_INPUT.value;
	//var destFile = wizard.copyHandlerFile(serverModelName, );
	var rootNode = getFirstNode(TABLES_TREE);
	var rootTable = rootNode.value;
	for (var name in columnTableHash)
	{
		if (columnTableHash[name] == null)
			return;
			
		var sourceFile = nitobi.dw.tgsw.getSourceFile(serverModelName);
		var destFile = nitobi.dw.tgsw.getDestFile(serverModelName, id, name);
		DWfile.copy(sourceFile, destFile);
		var pKey = getPKey(name);
		var fKey = getFKey(name);
		var file = wizard.createHandler(destFile, serverModelName, connName, name, pKey, fKey, dbName, true);
		DWfile.write(destFile, file);
		var siteRoot = dw.getSiteRoot();
		saveHandlerHash[name] = destFile.substr(siteRoot.length);
	}
	
	/*
	var file = wizard.createHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	savehandler = destFile.substr(root.length);*/
}

function getPKey(tableName)
{
	var bufferTree = BUFFER_TREE;
	var columnsHtml = columnTableHash[tableName];
	clearTree(bufferTree);
	bufferTree.innerHTML += columnsHtml;
	var columns = bufferTree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		if (values[4] == "Y")
			return values[0];
	}
	return "";
}

function getFKey(tableName)
{
	var bufferTree = BUFFER_TREE;
	var columnsHtml = columnTableHash[tableName];
	clearTree(bufferTree);
	bufferTree.innerHTML += columnsHtml;
	var columns = bufferTree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		if (values[5] == "Y")
			return values[0];
	}
	return "";
}

function insertDeclaration()
{
	var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	dom.insertHTML(getDeclaration());
	var id = ID_INPUT.value;
	var code = nitobi.util.getComponentInitCode(id);
	
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
		var assetList = nitobi.util.getAssetList("treegrid");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("treegrid");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.treegrid.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.treegrid.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.treegrid.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.treegrid.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.treegrid.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.treegrid.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.treegrid.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.treegrid.js/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + componentSrc + "\n";
				}
				headRegion.innerHTML = headRegion.innerHTML + "\n<script>" + code + "</script>\n";
			}
		}
	}
	
	MM.clearBusyCursor();
}

function getDeclaration()
{
	var id = ID_INPUT.value;
	var mode = nitobi.util.getSelectedOption(MODE_LIST);
	var width = GRIDWIDTH_INPUT.value;
	var height = HEIGHT_INPUT.value;
	var tablesTree = TABLES_TREE;
	var rootTable = getFirstNode(tablesTree);
	var rootcolumns = rootTable.value;
	
	var declaration = "<ntb:treegrid ";
	declaration += "id=\"" + id + "\" ";
	declaration += "mode=\"" + mode + "\" ";
	declaration += "gethandler=\"" + getHandlerHash[rootcolumns] + "\" ";
	if (SAVE_CHECK.checked == true)
	{
		declaration += "savehandler=\"" + saveHandlerHash[rootcolumns] + "\" ";
	}
	
	declaration += "height=\"" + (height != ""?height:"500") + "\" ";
	declaration += "width=\"" + (width != ""?width:"500") + "\"";
	declaration += " theme=\"nitobi\"";
	declaration += " rootcolumns=\"" + rootcolumns + "\"";
	declaration += " effectsenabled=\"true\"";
	declaration += " groupoffset=\"20\"";
	declaration += ">\n";
	var tables = tablesTree.getElementsByTagName("mm:treenode");
	var columnsTree = COLUMNS_TREE;
	clearTree(columnsTree);
	for (var i = 0; i < tables.length; i++)
	{
		var table = tables[i];
		var tableName = table.value;
		declaration += "<ntb:columns ";
		declaration += "id=\"" + tableName + "\" " + (tableName != rootcolumns?"gethandler=\"" + getHandlerHash[tableName] + "\"":"") + (SAVE_CHECK.checked == true && tableName != rootcolumns?" savehandler=\"" + saveHandlerHash[tableName] + "\"":"") + ">\n";
		columnsTree.innerHTML += columnTableHash[tableName];
		var childTable = table.getElementsByTagName("mm:treenode");
		if (childTable.length > 0)
		{
			var childTableName = childTable[0].value;
			declaration += "<ntb:expandcolumn ";
			declaration += "childcolumnset=\"" + childTableName + "\" width=\"50\"></ntb:expandcolumn>\n";
		}
		var columns = columnsTree.getElementsByTagName("mm:treenode");
		for (var j = 0; j < columns.length; j++)
		{
			var column = columns[j];
			var values = column.value.split("|");
			var columnDec = "<ntb:" + values[2] + " xdatafld=\"" + values[0] + "\" label=\"" + values[1] + "\" width=\"" + values[3] + "\"></ntb:" + values[2] + ">\n";
			declaration += columnDec;
		}
		clearTree(columnsTree);
		declaration += "</ntb:columns>\n";
	}
	declaration += "</ntb:treegrid>\n";
	return declaration;
}

function show(element)
{
	className = element.getAttribute("class");
	className = className.replace("hiddenOptions", "visibleOptions");
	element.setAttribute("class", className);
}

function hide(element)
{
	className = element.getAttribute("class");
	className = className.replace("visibleOptions", "hiddenOptions");
	element.setAttribute("class", className);
}

function toggleOptionsView()
{
	className = OPTIONS_DIV.getAttribute("class");
	if (className == "visibleOptions")
	{
		hide(OPTIONS_DIV);
		TOGGLE_BUTTON.value = "[+]";
	}
	else
	{
		show(OPTIONS_DIV);
		TOGGLE_BUTTON.value = "[-]";
	}
}

function toggleGridOptionsView()
{
	className = GRIDOPTIONS_DIV.getAttribute("class");
	if (className == "visibleOptions")
	{
		hide(GRIDOPTIONS_DIV);
		GRIDTOGGLE_BUTTON.value = "[+]";
	}
	else
	{
		show(GRIDOPTIONS_DIV);
		GRIDTOGGLE_BUTTON.value = "[-]";
	}
}

function clearOptions()
{
	LABEL_INPUT.value = "";
	COLUMNTYPE_LIST.selectedIndex = 0;
	WIDTH_INPUT.value = "";
	PKEY_CHECK.checked = false;
	FKEY_CHECK.checked = false;
}

function updateColumn()
{
	var selNode = COLUMNS_TREE.selectedNodes[0];
	var colObj = selNode.colObj;

	colObj.label = LABEL_INPUT.value;
	colObj.type = nitobi.util.getSelectedOption(COLUMNTYPE_LIST);
 	colObj.width =  (WIDTH_INPUT.value.indexOf("px") == -1?WIDTH_INPUT.value:WIDTH_INPUT.value.substr(0, WIDTH_INPUT.value.length - 2));
	selNode.value = colObj.name + "|" + colObj.label + "|" + colObj.type + "|" + colObj.width;
}

function setLabel()
{
	var selNode = COLUMNS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[1] = LABEL_INPUT.value;
		selNode.value = values.join("|");
	}
}

function setType()
{
	var selNode = COLUMNS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[2] = nitobi.util.getSelectedOption(COLUMNTYPE_LIST);
		selNode.value = values.join("|");
		validatePage2();
	}
}

function setWidth()
{
	var selNode = COLUMNS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[3] = (WIDTH_INPUT.value.indexOf("px") == -1?WIDTH_INPUT.value:WIDTH_INPUT.value.substr(0, WIDTH_INPUT.value.length - 2));
		selNode.value = values.join("|");
	}
}

function setPKey(elem)
{
	var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (elem.checked)
	{
		// Check to make sure no other columns are designated as primary key
		for (var i = 0; i < columns.length; i++)
		{
			var column = columns[i];
			var columnValues = column.value.split("|");
			if (columnValues[4] == "Y")
			{
				alert("Only one column can be designated as the primary key.  " + columnValues[0] + " is already set as the primary key.");
				PKEY_CHECK.checked = false;
				return;
			}
		}
	}
	// Otherwise, set the column as the p. key.
	var selNode = COLUMNS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[4] = (elem.checked?"Y":"");
		selNode.value = values.join("|");
		
		var tablesTree = TABLES_TREE;
		var selTable = tablesTree.selectedNodes[0];
		if (selTable)
		{
			var tableName = selTable.value;
			columnTableHash[tableName] = "";
			for (var i = 0; i < columns.length; i++)
			{
				var column = columns[i];
				columnTableHash[tableName] += column.outerHTML;
			}
		}
	}
	else
	{
		PKEY_CHECK.checked = false;
	}
	validatePage2();
}

function setFKey(elem)
{
	var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (elem.checked)
	{
		// Check to make sure no other columns are designated as primary key
		for (var i = 0; i < columns.length; i++)
		{
			var column = columns[i];
			var columnValues = column.value.split("|");
			if (columnValues[5] == "Y")
			{
				alert("Only one column can be designated as the foreign key.  " + columnValues[0] + " is already set as the primary key.");
				FKEY_CHECK.checked = false;
				return;
			}
		}
	}
	var selNode = COLUMNS_TREE.selectedNodes[0];
	if (selNode)
	{
		var values = selNode.value.split("|");
		values[5] = (elem.checked?"Y":"");
		selNode.value = values.join("|");
		
		var tablesTree = TABLES_TREE;
		var selTable = tablesTree.selectedNodes[0];
		if (selTable)
		{
			var tableName = selTable.value;
			columnTableHash[tableName] = "";
			for (var i = 0; i < columns.length; i++)
			{
				var column = columns[i];
				columnTableHash[tableName] += column.outerHTML;
			}
		}
	}
	else
	{
		FKEY_CHECK.checked = false;
	}
	validatePage2();
}

function showConnectionManager()
{
	MMDB.showConnectionMgrDialog();
	//clear();
	populateConnectionList();
	populateTableList();
}

function addTable()
{
	var menu = new PopupMenu();
	var currentTables = TABLES_TREE.getElementsByTagName("mm:treenode");
	if (allTables.length != currentTables.length)
	{
		for (var i = 0; i < allTables.length; i++)
		{
			for (var j = 0; j < currentTables.length; j++)
			{
				var values = currentTables[j].value.split("|");
				if (values[0] == allTables[i])
				{
					break;
				}
			}
			if (j == currentTables.length)
			{
				menu.addItem(allTables[i]);
			}
			
		}
	}
	else
	{
		menu.addItem("No tables to add");
	}
	var selected = menu.popup();
	if (selected && selected != "No tables to add")
	{
		var tree = TABLES_TREE;
		var firstNode = getFirstNode(tree);
		var deepNode = getDeepestNode(firstNode);
		if (deepNode && deepNode.tagName.toLowerCase() != "mm:treecolumn")
		{
			deepNode.removeAttribute("selected");
			deepNode.innerHTML += "<mm:treenode value=\"" + selected + "\" selected></mm:treenode>";
		}
		else
		{
			tree.innerHTML += "<mm:treenode value=\"" + selected + "\" selected></mm:treenode>";
		}
		populateColumnsTree();
		configureTableControls();
		validatePage2();
	}
}

function removeTable()
{
	var tree = TABLES_TREE;
	var columnsTree = COLUMNS_TREE;
	var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		if (selNode.parentNode)
			selNode.parentNode.setAttribute("selected", "true");
		
		var tableName = selNode.value;
		columnTableHash[tableName] = null;
		var childsHtml = selNode.innerHTML;
		if (selNode.parentNode)
			selNode.parentNode.innerHTML = childsHtml;
		else
			tree.innerHTML = childsHtml;
		selNode = null;
		
		selNode = tree.selectedNodes[0];
		if (!selNode)
			clearTree(columnsTree);
		configureTableControls();
		populateColumnsTree();
		validatePage2();
	}
}

function getFirstNode(tree)
{
	var childs = tree.childNodes;
	for (var i = 0; i < childs.length; i++)
	{
		var child = childs[i];
		if (child.tagName.toLowerCase() == "mm:treenode")
			return child;
	}
}

function getDeepestNode(node)
{
	if (!node) return;
	var childNodes = node.childNodes;
	if (childNodes.length == 0)
		return node;
	return getDeepestNode(childNodes[0]);
}

function addColumn()
{
	// columns is all columns
	// currentColumns is what's currently in the tree.
	var menu = new PopupMenu();
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var tablesTree = TABLES_TREE;
	var selNode = tablesTree.selectedNodes[0];
	if (!selNode)
		return;
	var tableName = selNode.value;
	var allColumns = MMDB.getColumnsOfTable(connName, tableName);
	var currentColumns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (allColumns.length != currentColumns.length)
	{
		for (var i = 0; i < allColumns.length; i++)
		{
			for (var j = 0; j < currentColumns.length; j++)
			{
				var values = currentColumns[j].value.split("|");
				if (values[0] == allColumns[i])
				{
					break;
				}
			}
			if (j == currentColumns.length)
			{
				menu.addItem(allColumns[i]);
			}
			
		}
	}
	else
	{
		menu.addItem("No columns to add");
	}
	var selected = menu.popup();
	if (selected && selected != "No columns to add")
	{
		var tree = COLUMNS_TREE;
		var selNode = tree.selectedNodes[0];
		if (selNode)
		{
			selNode.removeAttribute("selected");
		}
		var node = "<mm:treenode value=\"" + selected + "|" + selected + "|textcolumn|100||\" selected></mm:treenode>";
		columnTableHash[tableName] += node
		tree.innerHTML += node;
		populateColumnDetailPanel();
		configureControls();
		validatePage2();
		//validateColumns();
		/*var columns = [];
		var tree = COLUMNS_TREE;
		var selNode = tree.selectedNodes[0];
		if (selNode == null)
		{
			return;
		}
		var nodes = tree.childNodes;
		for (var i = 0; i < nodes.length; i++)
		{
			if (nodes[i].colObj)
			{
				if (selNode.outerHTML == nodes[i].outerHTML)
				{
					columns.push(nodes[i].colObj);
					columns.push(new nitobi.dw.GridColumn(selected, selected, "textcolumn", "100"));
				}
				else
				{
					columns.push(nodes[i].colObj);
				}
			}
		}
		populateTreeFromObjects(columns);*/
	}
	/*
	if(selected && selected != 'No columns to add'){
		var idx = getTreeIndex(tree);
		pageObject.addColumnObjectAtIndex(columnObjects[selected],idx+1);
		var newNodes = getTreeNodesFromColumnObjects(tree, pageObject.columnObjects);
		populateTreeControlFromObjectArray(tree, idx+1, newNodes);

// If we need to avoid the populateTreeControlFromObjectArray due to performace reasons,
// we can use the following which adds the new item to the bottom of the control
//var nodeHTML = getTreeNodeHTMLFromColumnObject(tree, columnObjects[selected], true);
//var nodes = tree.getElementsByTagName("mm:treenode");
//tree.innerHTML += nodeHTML
//setTreeIndex(tree, nodes.length);
//nodes[selected].parentNode.innerHTML += nodeHTML;

	}
	handleSelectionChange(tree);*/
}

function removeColumn()
{
	var tree = COLUMNS_TREE;
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
			populateColumnDetailPanel();
		}
		else
		{
			clearOptions();
		}
		var tablesTree = TABLES_TREE;
		var selTable = tablesTree.selectedNodes[0];
		var tableName = selTable.value;
		resetColumnTableHash(tableName);
		//validateColumns();
		validatePage2();
	}
}

function resetColumnTableHash(tableName)
{
	var tree = COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	columnTableHash[tableName] = "";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		columnTableHash[tableName] += column.outerHTML;
	}
}

function moveUpColumn()
{
	var nodes = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(COLUMNS_TREE);
	if (index > 0)
	{
		var tempValue = nodes[index - 1].value;
		//var tempColObj= nodes[index - 1].colObj;
		nodes[index - 1].value = nodes[index].value;
		//nodes[index - 1].colObj = nodes[index].colObj;
		
		nodes[index].value = tempValue;
		//nodes[index].colObj = tempColObj;
		nitobi.util.setTreeNodeIndex(COLUMNS_TREE, index - 1);
		var tablesTree = TABLES_TREE;
		var selTable = tablesTree.selectedNodes[0];
		var tableName = selTable.value;
		resetColumnTableHash(tableName);
		configureControls();
	}
}


function moveDownColumn()
{
	var nodes = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(COLUMNS_TREE);
	if (index < nodes.length - 1)
	{
		var tempValue = nodes[index + 1].value;
		//var tempColObj = nodes[index + 1].colObj;
		nodes[index + 1].value = nodes[index].value;
		//nodes[index + 1].colObj = nodes[index].colObj;
		
		nodes[index].value = tempValue;
		//nodes[index].colObj = tempColObj;
		nitobi.util.setTreeNodeIndex(COLUMNS_TREE, index + 1);
		var tablesTree = TABLES_TREE;
		var selTable = tablesTree.selectedNodes[0];
		var tableName = selTable.value;
		resetColumnTableHash(tableName);
		configureControls();
	}
}

function validateGridProperties()
{
	var isValid = validateId();
	isValid = validateWidth() && isValid;
	isValid = validateHeight() && isValid;
	return isValid;
}

function validateId()
{
	var id = ID_INPUT.value;
	if (id == "")
	{
		INVALID_DIV.setAttribute("class", "visibleWarning");
		INVALID_DIV.innerHTML = "The id is required.";
		hidePage(3);
		showPage(3);
		return false;
	}
	else
	{
		var pageIds = getIds();
		if (pageIds)
		{
			for (var i = 0; i < pageIds.length; i++)
			{
				if (id == pageIds[i])
				{
					INVALID_DIV.setAttribute("class", "visibleWarning");
					INVALID_DIV.innerHTML = "This id is not unique.";
					hidePage(3);
					showPage(3);
					return false;
				}
			}
			// If we get out here, the id is ok, so we renable the button and hide the warning
			INVALID_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
}

function getIds()
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

function validateConnectionInfo()
{
	var isValid = validateConnection();
	//isValid = validateKey() && isValid;
	//isValid = validateTable() && isValid;
	return isValid;
}

function validateConnection()
{
	if (CONNECTION_LIST.selectedIndex > -1)
	{
		CONNECTIONERROR_DIV.setAttribute("class", "hiddenWarning");
		
		return true;
	}
	else
	{
		CONNECTIONERROR_DIV.setAttribute("class", "inlineWarning");
		
		return false;
	}
		
}

function validateKey()
{
	if (KEY_LIST.selectedIndex > -1)
	{
		KEYERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		KEYERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateColumns()
{
	for (var name in columnTableHash)
	{
		var columnsHtml = columnTableHash[name];
		if (columnsHtml != null)
		{
			if (columnsHtml == "")
			{
				return false;
			}
		}
	}
	return true;
}

function validateTables()
{
	var tablesTree = TABLES_TREE;
	var tables = tablesTree.getElementsByTagName("mm:treenode");
	if (tables.length < 1)
	{
		return false;
	}
	else
	{
		return true;
	}
}

// The second page of the wizard is a bit more complicated than for other components where different
// elements of the page are bound to others so we can't do validation on individual inputs; rather, we
// validate the entire page in one go and provide error messages together.
function validatePage2()
{
	var warningMessage = "";
	PAGE2WARNING_DIV.innerHTML = "";
	if (!validateTables())
	{
		HIERARCHYTITLE_SPAN.setAttribute("class", "error");
		warningMessage += " * You must add at least one table to continue.";
	}
	else
	{
		HIERARCHYTITLE_SPAN.setAttribute("class", "");
	}
	if (!validateColumns())
	{
		COLUMNSTITLE_SPAN.setAttribute("class", "error");
		if (warningMessage != "")
			warningMessage += "<br/>";
		warningMessage += " * You all tables must have at least on column added.";
	}
	else
	{
		COLUMNSTITLE_SPAN.setAttribute("class", "");
	}
	var keylessTables = findKeylessTables();
	if (keylessTables.length > 0)
	{
		if (warningMessage != "")
			warningMessage += "<br/>";
		warningMessage += " * You must specify a primary key for every table. ";
		for (var i = 0; i < keylessTables.length; i++)
		{
			warningMessage += " " + "<span style=\"text-decoration:underline;\">" + keylessTables[i] + "</span>";
			if (i != keylessTables.length - 1)
				warningMessage += ",";
		}
		warningMessage += " " + (keylessTables.length == 1?"is":"are") + " missing primary keys.";
	}
	var unboundTables = findUnboundTables();
	if (unboundTables.length > 0)
	{
		if (warningMessage != "")
			warningMessage += "<br/>";
		
		warningMessage += " * You must specify a foreign key for all child tables. ";
		for (var i = 0; i < unboundTables.length; i++)
		{
			warningMessage += " " + "<span style=\"text-decoration:underline;\">" + unboundTables[i] + "</span>";
			if (i != unboundTables.length - 1)
				warningMessage += ",";
		}
		warningMessage += " " + (unboundTables.length == 1?"is":"are") + " missing foreign keys.";
	}
	
	if (warningMessage != "")
	{
		PAGE2WARNING_DIV.setAttribute("class", "visibleWarning");
		PAGE2WARNING_DIV.innerHTML = warningMessage;
		hidePage(2);
		showPage(2);
		return false;
	}
	else
	{
		PAGE2WARNING_DIV.setAttribute("class", "hiddenWarning");
		PAGE2WARNING_DIV.innerHTML = warningMessage;
		hidePage(2);
		showPage(2);
		return true;
	}
	
}

function findKeylessTables()
{
	var tree = BUFFER_TREE;
	var keylessTables = [];
	for (var name in columnTableHash)
	{
		var columnsHtml = columnTableHash[name];
		if (columnsHtml != null)
		{
			clearTree(tree);
			tree.innerHTML += columnsHtml;
			var columns = tree.getElementsByTagName("mm:treenode");
			for (var i = 0; i < columns.length; i++)
			{
				var column = columns[i];
				var values = column.value.split("|");
				if (values[4] == "Y")
					break;
			}
			//alert(i + ":" + (columns.length - 1));
			if (i == columns.length)
				keylessTables.push(name);
		}
	}
	return keylessTables;
}

// Used to find which tables in the hierarchy need foreign keys set
function findUnboundTables()
{
	var tablesTree = TABLES_TREE;
	var rootNode = getFirstNode(tablesTree);
	if (!rootNode)
		return [];
	var rootTable = rootNode.value;
	
	var tree = BUFFER_TREE;
	var unboundTables = [];
	for (var name in columnTableHash)
	{
		if (name != rootTable)
		{
			var columnsHtml = columnTableHash[name];
			if (columnsHtml != null)
			{
				clearTree(tree);
				tree.innerHTML += columnsHtml;
				var columns = tree.getElementsByTagName("mm:treenode");
				for (var i = 0; i < columns.length; i++)
				{
					var column = columns[i];
					var values = column.value.split("|");
					if (values[5] == "Y")
						break;
				}
				//alert(i + ":" + (columns.length - 1));
				if (i == columns.length)
					unboundTables.push(name);
			}
		}
	}
	return unboundTables;
}

function validateHeight()
{
	var height = HEIGHT_INPUT.value;
	if (isNaN(height))
	{
		HEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		HEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateWidth()
{
	var width = GRIDWIDTH_INPUT.value;
	if (isNaN(width))
	{
		WIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		WIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function configureTableControls()
{
	var tree = TABLES_TREE;
	var tables = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (tables.length > 1)
	{
		// Enable the remove button
		TREMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	}
	else if (tables.length == 1)
	{
		// With only one tab selected, disable both move down and move up
		// also enable the remove button.
		TREMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	}
	else
	{
		TREMOVE_BUTTON.src = "../Shared/MM/Images/btnDel_dis.gif";
	}
	tree.focus();
}


function configureControls()
{
	var tree = COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (columns.length > 1)
	{
		// Enable the remove button
		REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == columns[0])
			{
				// Enable Move down
				DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == columns[columns.length - 1])
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
	else if (columns.length == 1)
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
