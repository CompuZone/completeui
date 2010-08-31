var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var PAGE3 = document.page3.document;
var PAGE4 = document.page4.document;
var PAGE5 = document.page5.document;
var PAGE6 = document.page6.document;
var PAGE7 = document.page7.document;

var BUTTONS = document.buttons.document;

var SERVER_LIST = PAGE1.server_list;

var MASTER_CONNECTION_LIST = PAGE1.connection_list;
var MASTER_TABLE_LIST = PAGE1.table_list;
var MASTER_DATABASE_LIST = PAGE1.database_list;
var MASTER_KEY_LIST = PAGE1.key_list;

var MASTER_CONNECTIONERROR_DIV = PAGE1.connectionerror_div;
var MASTER_TABLEERROR_DIV = PAGE1.tableerror_div;
var MASTER_KEYERROR_DIV = PAGE1.keyerror_div;

var MASTER_COLUMNS_TREE = PAGE2.columns_tree;
var MASTER_COLLABEL_INPUT = PAGE2.collabel_input;
var MASTER_COLWIDTH_INPUT = PAGE2.colwidth_input;

var MASTER_COLWIDTHERROR_DIV = PAGE2.colwidtherror_div;
var MASTER_COLUMNSERROR_DIV = PAGE2.columnserror_div;

var MASTER_ADD_BUTTON = PAGE2.add_button;
var MASTER_REMOVE_BUTTON = PAGE2.remove_button;
var MASTER_UP_BUTTON = PAGE2.up_button;
var MASTER_DOWN_BUTTON = PAGE2.down_button;

var MASTER_ID_INPUT = PAGE3.id_input;
var MASTER_TEXTOPTIONS_DIV = PAGE3.textoptions_div;
var MASTER_TEXTDATAFIELD_LIST = PAGE3.textdatafield_list;
var MASTER_TEXTWIDTH_INPUT = PAGE3.textwidth_input;

var MASTER_LISTHEIGHT_INPUT = PAGE3.listheight_input;
var MASTER_LISTWIDTH_INPUT = PAGE3.listwidth_input;

var MASTER_INVALID_DIV = PAGE3.invalid_div;
var MASTER_LISTHEIGHTERROR_DIV = PAGE3.listheighterror_div;
var MASTER_LISTWIDTHERROR_DIV = PAGE3.listwidtherror_div;

var MASTER_TEXTWIDTHERROR_DIV = PAGE3.textwidtherror_div;

var DETAIL_CONNECTION_LIST = PAGE4.connection_list;
var DETAIL_TABLE_LIST = PAGE4.table_list;
var DETAIL_DATABASE_LIST = PAGE4.database_list;
var DETAIL_KEY_LIST = PAGE4.key_list;

var DETAIL_CONNECTIONERROR_DIV = PAGE4.connectionerror_div;
var DETAIL_TABLEERROR_DIV = PAGE4.tableerror_div;
var DETAIL_KEYERROR_DIV = PAGE4.keyerror_div;

var DETAIL_COLUMNS_TREE = PAGE5.columns_tree;
var DETAIL_COLLABEL_INPUT = PAGE5.collabel_input;
var DETAIL_COLWIDTH_INPUT = PAGE5.colwidth_input;

var DETAIL_COLWIDTHERROR_DIV = PAGE5.colwidtherror_div;
var DETAIL_COLUMNSERROR_DIV = PAGE5.columnserror_div;

var DETAIL_ADD_BUTTON = PAGE5.add_button;
var DETAIL_REMOVE_BUTTON = PAGE5.remove_button;
var DETAIL_UP_BUTTON = PAGE5.up_button;
var DETAIL_DOWN_BUTTON = PAGE5.down_button;

var DETAIL_ID_INPUT = PAGE6.id_input;
var DETAIL_TEXTOPTIONS_DIV = PAGE6.textoptions_div;
var DETAIL_TEXTDATAFIELD_LIST = PAGE6.textdatafield_list;
var DETAIL_TEXTWIDTH_INPUT = PAGE6.textwidth_input;

var DETAIL_LISTHEIGHT_INPUT = PAGE6.listheight_input;
var DETAIL_LISTWIDTH_INPUT = PAGE6.listwidth_input;

var DETAIL_INVALID_DIV = PAGE6.invalid_div;
var DETAIL_LISTHEIGHTERROR_DIV = PAGE6.listheighterror_div;
var DETAIL_LISTWIDTHERROR_DIV = PAGE6.listwidtherror_div;

var DETAIL_TEXTWIDTHERROR_DIV = PAGE6.textwidtherror_div;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var MASTER_DATA_LIST = PAGE7.master_cols;
var DETAIL_DATA_LIST = PAGE7.detail_cols;
var MD_TREE = PAGE7.master_detail_tree;
var LINKERROR_DIV = PAGE7.linkerror_div;
var ADDLINK_BUTTON = PAGE7.add_button;
var REMOVELINK_BUTTON = PAGE7.remove_button;

var pages = new Array();
pages[1] = document.page1;
pages[2] = document.page2;
pages[3] = document.page3;
pages[4] = document.page4;
pages[5] = document.page5;
pages[6] = document.page6;
pages[7] = document.page7;

var currentPage = 1;
var totalPages = 7;

var mastergethandler = "";
var detailgethandler = "";
var master_idValue = "";
var detail_idValue = "";


var masterColumns = [];
var detailColumns = [];
//var currentColumns = [];

var master_datasourceurl="";
var detail_datasourceurl="";


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
	return "560,575";
}

function init()
{
	document.page1.visibility = "visible";
	document.buttons.visibility = "visible";
	
	setServerModelList();
	populateMasterConnectionList();
	populateMasterTableList();	
	populateMasterDatabaseList();
	populateDetailConnectionList();
	populateDetailTableList();
	populateDetailDatabaseList();

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

function populateMasterConnectionList()
{
	var connections = MMDB.getConnectionList();
	var connection_list = MASTER_CONNECTION_LIST;
	connection_list.innerHTML = "";
	for (var i = 0; i < connections.length; i++)
	{
		var connName = connections[i];
		var option = "<option value=\"" + connName + "\">" + connName + "</option>";
		connection_list.innerHTML += option;
	}
	connection_list.selectedIndex = 0;
}

function populateDetailConnectionList()
{
	var connections = MMDB.getConnectionList();
	var connection_list = DETAIL_CONNECTION_LIST;
	connection_list.innerHTML = "";
	for (var i = 0; i < connections.length; i++)
	{
		var connName = connections[i];
		var option = "<option value=\"" + connName + "\">" + connName + "</option>";
		connection_list.innerHTML += option;
	}
	connection_list.selectedIndex = 0;
}


function populateMasterTableList()
{
	var connName = nitobi.util.getSelectedOption(MASTER_CONNECTION_LIST);
	var tables = MMDB.getTables(connName);
	var table_list = MASTER_TABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
	}
	validateMasterConnectionInfo();
}

function populateDetailTableList()
{
	var connName = nitobi.util.getSelectedOption(DETAIL_CONNECTION_LIST);
	var tables = MMDB.getTables(connName);
	var table_list = DETAIL_TABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
	}
	validateDetailConnectionInfo();
}


function populateMasterDatabaseList()
{
	var list = MASTER_DATABASE_LIST;
	var serverModel = nitobi.util.getSelectedOption(SERVER_LIST);
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	validateMasterConnectionInfo();
	list.selectedIndex = 0;
}

function populateDetailDatabaseList()
{
	var list = DETAIL_DATABASE_LIST;
	var serverModel = nitobi.util.getSelectedOption(SERVER_LIST);
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	validateDetailConnectionInfo();
	list.selectedIndex = 0;
}


function populateMasterColumnLists()
{
	var connName = nitobi.util.getSelectedOption(MASTER_CONNECTION_LIST);
	var tableName = nitobi.util.getSelectedOption(MASTER_TABLE_LIST);
	
	// allColumns is a list of all the column names.  We use it when adding new
	// columns to ensure only those columns that are not already included be made available
	// to the customer.
	masterColumns = [];
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
		clearMasterColumnsTree();
		populateMasterTreeFromArray(columns);
		MASTER_LISTWIDTH_INPUT.value = (columns.length * 100) + "px";
		populateMasterColumnDetailPanel();
		validateMasterConnectionInfo();
	}
}

function populateDetailColumnLists()
{
	var connName = nitobi.util.getSelectedOption(DETAIL_CONNECTION_LIST);
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	
	// allColumns is a list of all the column names.  We use it when adding new
	// columns to ensure only those columns that are not already included be made available
	// to the customer.
	detailColumns = [];
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
			if (list.getAttribute("class").indexOf("detailColumnsList") != -1)
			{
				list.innerHTML = columnMarkup;
				list.selectedIndex = 0;
			}
		}
		clearDetailColumnsTree();
		populateDetailTreeFromArray(columns);
		DETAIL_LISTWIDTH_INPUT.value = (columns.length * 100) + "px";
		populateDetailColumnDetailPanel();
		validateDetailConnectionInfo();
	}
}


function clearMasterColumnsTree()
{
	var tree = MASTER_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		column.outerHTML = "";
		column = null;
	}
}


function clearDetailColumnsTree()
{
	var tree = DETAIL_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		column.outerHTML = "";
		column = null;
	}
}

function populateMasterTreeFromArray(columns)
{	
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		MASTER_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|100px\"></mm:treenode>";
		
		masterColumns.push(column);
		//currentColumns.push(colObj.name);
	}
	var nodes = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (nodes.length > 0)
	{
		nodes[0].setAttribute("selected", "true");
	}
}

function populateDetailTreeFromArray(columns)
{	
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		DETAIL_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|100px\"></mm:treenode>";
		
		detailColumns.push(column);
		//currentColumns.push(colObj.name);
	}
	var nodes = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (nodes.length > 0)
	{
		nodes[0].setAttribute("selected", "true");
	}
}

function populateMasterTreeFromObjects(columns)
{
	var columnNodes = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treecolumn");
	var columnDec = "";
	for (var i = 0; i < columnNodes.length; i++)
	{
		columnDec += columnNodes[i].outerHTML;
	}
	MASTER_COLUMNS_TREE.innerHTML = "";
	MASTER_COLUMNS_TREE.innerHTML += columnDec;
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		
		MASTER_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column.name + "|" + column.label + "|100px\"></mm:treenode>";
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.ComboColumn(column, column, "100px");
		MASTER_COLUMNS_TREE.childNodes[MASTER_COLUMNS_TREE.childNodes.length - 1].colObj = column;
	}
}

function populateDetailTreeFromObjects(columns)
{
	var columnNodes = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treecolumn");
	var columnDec = "";
	for (var i = 0; i < columnNodes.length; i++)
	{
		columnDec += columnNodes[i].outerHTML;
	}
	DETAIL_COLUMNS_TREE.innerHTML = "";
	DETAIL_COLUMNS_TREE.innerHTML += columnDec;
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		
		DETAIL_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column.name + "|" + column.label + "|100px\"></mm:treenode>";
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.ComboColumn(column, column, "100px");
		DETAIL_COLUMNS_TREE.childNodes[DETAIL_COLUMNS_TREE.childNodes.length - 1].colObj = column;
	}
}

function populateMasterColumnDetailPanel()
{
	clearMasterOptions();
	var tree = MASTER_COLUMNS_TREE;
	var treeNodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	//var colObj = selNode.colObj;

	var values = selNode.value.split("|");
	MASTER_COLLABEL_INPUT.value = values[1];
	MASTER_COLWIDTH_INPUT.value = values[2];
	configureMasterControls();
}

function populateDetailColumnDetailPanel()
{
	clearDetailOptions();
	var tree = DETAIL_COLUMNS_TREE;
	var treeNodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	//var colObj = selNode.colObj;

	var values = selNode.value.split("|");
	DETAIL_COLLABEL_INPUT.value = values[1];
	DETAIL_COLWIDTH_INPUT.value = values[2];
	configureDetailControls();
}


function doNext()
{
	if (currentPage < totalPages)
	{
		if (currentPage == 1)
		{
			if (validateMasterConnectionInfo())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if (currentPage == 2)
		{
			if (validateMasterColumns())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if(currentPage == 3)
		{
				if (validateMasterComboProperties())
				{
					hidePage(currentPage);
					currentPage++;
					showPage(currentPage);
				}
		}
		else if (currentPage == 4)
		{
			if (validateDetailConnectionInfo())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if (currentPage == 5)
		{
			if (validateDetailColumns())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if(currentPage == 6)
		{
				if (validateDetailComboProperties())
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
		if (validateLinks())
		{
			createMasterHandler();
			createDetailHandler();
			insertDeclaration();
			nitobi.util.addNitobiNamespace(dw.getDocumentDOM());
			window.close();
		}
	}
}

function validateLinks()
{
	var tree = MD_TREE;
	var links = tree.getElementsByTagName("mm:treenode");
	if (links.length > 0)
	{
		LINKERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		LINKERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function createMasterHandler()
{
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);	
	var sourceFile = getMasterSourceFile(serverModelName);
	var tableName = nitobi.util.getSelectedOption(MASTER_TABLE_LIST);
	var id = MASTER_ID_INPUT.value;
	var destFile = getMasterDestFile(serverModelName, tableName, id);
	
	DWfile.copy(sourceFile, destFile);
	var file = populateMasterTemplate(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	master_datasourceurl = destFile.substr(root.length);
	
	copyXmlConverter(serverModelName);
}

function createDetailHandler()
{
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var id = DETAIL_ID_INPUT.value;
	var sourceFile = getDetailSourceFile(serverModelName);
	var destFile = getDetailDestFile(serverModelName, tableName, id);

	DWfile.copy(sourceFile, destFile);
	var file = populateDetailTemplate(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	detail_datasourceurl = destFile.substr(root.length);
}


function populateMasterTemplate(file)
{
	var file = DWfile.read(file);

	var table = nitobi.util.getSelectedOption(MASTER_TABLE_LIST);
	var key = nitobi.util.getSelectedOption(MASTER_KEY_LIST);
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST)
	var colDef = getMasterColumnDefinition(serverModelName, key);
	var recDef = getMasterRecordDefinition(serverModelName, key);
	var dbName = nitobi.util.getSelectedOption(MASTER_DATABASE_LIST);
	var query = getMasterQuery(dbName, serverModelName, table);
	var connectionFile = getMasterConnectionFilePath();
	var connName = nitobi.util.getSelectedOption(MASTER_CONNECTION_LIST);
	var conn = MMDB.getConnection(connName);
	var databaseName = "$database_" + conn.name;
	var connectionString;
	/*if (conn.string != "")
	{
		connectionString = conn.string;
	}
	else
	{*/
		connectionString = "MM_" + connName + "_STRING";
	//}
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + connName + "_USERNAME";
		dbPassword = "MM_" + connName + "_PASSWORD";
		dbDriver = "MM_" + connName + "_DRIVER";
	}
	var datasource = connName;
	var searchColumn = nitobi.util.getSelectedOption(MASTER_TEXTDATAFIELD_LIST);
	file = file.replace(/\/\*\*\*\s*NTB_COLUMNDEF\s*\*\*\*\//g, colDef);
	file = file.replace(/\/\*\*\*\s*NTB_KEY\s*\*\*\*\//g, key);
	file = file.replace(/\/\*\*\*\s*NTB_DATABASE\s*\*\*\*\//g, databaseName);
	file = file.replace(/\/\*\*\*\s*NTB_RECORDDEF\s*\*\*\*\//g, recDef);
	file = file.replace(/\/\*\*\*\s*NTB_QUERY\s*\*\*\*\//g, query);
	file = file.replace(/\/\*\*\*\s*NTB_TABLE\s*\*\*\*\//g, table);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_FILE\s*\*\*\*\//g, connectionFile);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, datasource);
	file = file.replace(/\/\*\*\*\s*NTB_SEARCHCOLUMN\s*\*\*\*\//g, searchColumn);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	return file;
}

function populateDetailTemplate(file)
{
	var file = DWfile.read(file);

	var table = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var key = nitobi.util.getSelectedOption(DETAIL_KEY_LIST);
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST)
	var colDef = getDetailColumnDefinition(serverModelName, key);
	var recDef = getDetailRecordDefinition(serverModelName, key);
	var dbName = nitobi.util.getSelectedOption(DETAIL_DATABASE_LIST);
	var query = getDetailQuery(dbName, serverModelName, table);
	var connectionFile = getDetailConnectionFilePath();
	var connName = nitobi.util.getSelectedOption(DETAIL_CONNECTION_LIST);
	var serverGlue = getServerCode(serverModelName);
	
	var conn = MMDB.getConnection(connName);
	var databaseName = "$database_" + conn.name;
	var connectionString;
	/*if (conn.string != "")
	{
		connectionString = conn.string;
	}
	else
	{*/
		connectionString = "MM_" + connName + "_STRING";
	//}
	
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + connName + "_USERNAME";
		dbPassword = "MM_" + connName + "_PASSWORD";
		dbDriver = "MM_" + connName + "_DRIVER";
	}
	var datasource = connName;
	var searchColumn = nitobi.util.getSelectedOption(DETAIL_TEXTDATAFIELD_LIST);
	file = file.replace(/\/\*\*\*\s*NTB_COLUMNDEF\s*\*\*\*\//g, colDef);
	file = file.replace(/\/\*\*\*\s*NTB_KEY\s*\*\*\*\//g, key);
	file = file.replace(/\/\*\*\*\s*NTB_DATABASE\s*\*\*\*\//g, databaseName);
	file = file.replace(/\/\*\*\*\s*NTB_RECORDDEF\s*\*\*\*\//g, recDef);
	file = file.replace(/\/\*\*\*\s*NTB_VAR_GETTER\s*\*\*\*\//g, serverGlue);
	file = file.replace(/\/\*\*\*\s*NTB_QUERY\s*\*\*\*\//g, query);
	file = file.replace(/\/\*\*\*\s*NTB_TABLE\s*\*\*\*\//g, table);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_FILE\s*\*\*\*\//g, connectionFile);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, datasource);
	file = file.replace(/\/\*\*\*\s*NTB_SEARCHCOLUMN\s*\*\*\*\//g, searchColumn);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	return file;
}


function getMasterColumnDefinition(serverModelName, key)
{
	var colDef = "";
	var columnDefinitionTemplate = nitobi.dw.Wizard.columnDefinitionMap[serverModelName];
	var columns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		if (!(serverModelName == "jsp" && values[0] == key))
		{
			colDef += columnDefinitionTemplate.replace(/columnName/g, values[0]);
		}
		/*(if (columns[i].colObj)
		{
			var colObj = columns[i].colObj;
			if (!(serverModelName == "jsp" && colObj.name == key))
				colDef += columnDefinitionTemplate.replace(/columnName/g, colObj.name);
		}*/
	}
	return colDef;
}


function getDetailColumnDefinition(serverModelName, key)
{
	var colDef = "";
	var columnDefinitionTemplate = nitobi.dw.Wizard.columnDefinitionMap[serverModelName];
	var columns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		if (!(serverModelName == "jsp" && values[0] == key))
		{
			colDef += columnDefinitionTemplate.replace(/columnName/g, values[0]);
		}
		/*(if (columns[i].colObj)
		{
			var colObj = columns[i].colObj;
			if (!(serverModelName == "jsp" && colObj.name == key))
				colDef += columnDefinitionTemplate.replace(/columnName/g, colObj.name);
		}*/
	}
	return colDef;
}


function getMasterRecordDefinition(serverModelName, key)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		/*var colObj = columns[i].colObj;
		if (colObj)
		{
			if (!(serverModelName == "jsp" && colObj.name == key))
			{
				recDef += recordTemplate.replace(/columnName/g, colObj.name);
			}
		}*/
		var column = columns[i];
		var values = column.value.split("|");
		if (!(serverModelName == "jsp" && values[0] == key))
		{
			recDef += recordTemplate.replace(/columnName/g, values[0]);
		}	
	}
	return recDef;
}

function getDetailRecordDefinition(serverModelName, key)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		/*var colObj = columns[i].colObj;
		if (colObj)
		{
			if (!(serverModelName == "jsp" && colObj.name == key))
			{
				recDef += recordTemplate.replace(/columnName/g, colObj.name);
			}
		}*/
		var column = columns[i];
		var values = column.value.split("|");
		if (!(serverModelName == "jsp" && values[0] == key))
		{
			recDef += recordTemplate.replace(/columnName/g, values[0]);
		}	
	}
	return recDef;
}


function getMasterQuery(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.comboQueryMap[serverModelName][dbName];
	return query;
}

function getDetailQuery(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.comboDetailQueryMap[serverModelName][dbName];
	return query;
}

function getMasterConnectionFilePath()
{
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var connectionFilePath = "Connections/" + nitobi.util.getSelectedOption(MASTER_CONNECTION_LIST) + "." + serverModelName;
	return connectionFilePath;
}

function getDetailConnectionFilePath()
{
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var connectionFilePath = "Connections/" + nitobi.util.getSelectedOption(DETAIL_CONNECTION_LIST) + "." + serverModelName;
	return connectionFilePath;
}


function getMasterSourceFile(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/combo.load." + serverName;
	return sourceFile;	
}

function getDetailSourceFile(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/detailcombo.load." + serverName;
	return sourceFile;	
}


function getMasterDestFile(serverName, tableName, id)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "combo.load*." + serverName);
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".load." + serverName;
	return destFile;
}

function getDetailDestFile(serverName, tableName, id)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "detailcombo.load*." + serverName);
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".load." + serverName;
	return destFile;
}


function copyXmlConverter(serverName)
{
	var source = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/" + nitobi.dw.Wizard.includesMap[serverName];
	if (serverName == "jsp")
	{
		var dest = dw.getSiteRoot() + "WEB-INF/lib/" + nitobi.dw.Wizard.includesMap[serverName];
	}
	else
	{
		var dest = dw.getSiteRoot() + nitobi.dw.Wizard.includesMap[serverName];
	}
		
	DWfile.copy(source, dest);
}

function insertDeclaration()
{
	var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	dom.insertHTML(getMasterDeclaration() + '\n' + getDetailDeclaration());
	var master_id = MASTER_ID_INPUT.value;
	var detail_id = DETAIL_ID_INPUT.value;
	var code = nitobi.util.getComponentInitCode(master_id);
	code += nitobi.util.getComponentInitCode(detail_id);
	code = generateGlueCode(code);
	
	MM.setBusyCursor();
	
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
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
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
		var assetList = nitobi.util.getAssetList("combo");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("combo");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.combo.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.combo.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"Nitobi/Assets/style/nitobi.combo.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"Nitobi/Assets/script/nitobi.combo.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.combo.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.combo.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.combo.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.combo.js/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + componentSrc + "\n";
				}
				headRegion.innerHTML = headRegion.innerHTML + "\n<script>" + code + "</script>\n";
			}
		}
	}
	
	MM.clearBusyCursor();
}

function getMasterDeclaration()
{
	var id = MASTER_ID_INPUT.value;
	var textdatafield = MASTER_TEXTDATAFIELD_LIST.selectedIndex;
	var textwidth = MASTER_TEXTWIDTH_INPUT.value;
	
	var listwidth = MASTER_LISTWIDTH_INPUT.value;
	var listheight = MASTER_LISTHEIGHT_INPUT.value;
	
	var declaration = "<ntb:Combo ";
	if (id != "")
	{
		declaration += "Id=\"" + id + "\" ";
	}
	declaration += "Mode=\"Classic\" ";
	declaration += "theme=\"outlook\" ";
	declaration += "OnSelectEvent=\"getChildData"+ MASTER_ID_INPUT.value + DETAIL_ID_INPUT.value +"()\"";
	declaration += ">\n";
	declaration += "<ntb:ComboTextBox ";
	declaration += "Width=\"" + (textwidth == ""?"250px":textwidth) + "\" DataFieldIndex=\"" + textdatafield + "\" ";
	declaration += "></ntb:ComboTextBox>\n";
	declaration += "<ntb:ComboList ";
	declaration += "Width=\"" + (listwidth == ""?"500px":listwidth) + "\" ";
	declaration += "Height=\"" + (listheight ==""?"400px":listheight) + "\" ";
	declaration += "DatasourceUrl=\"" + master_datasourceurl + "\">";
	
	var columns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		var columnDec = "<ntb:ComboColumnDefinition HeaderLabel=\"" + values[1] + "\" Width=\"" + values[2] + "\" DataFieldIndex=\"" + i + "\"></ntb:ComboColumnDefinition>\n";
		declaration += columnDec;
		/*var colObj = columns[i].colObj;
		if (colObj)
		{
			declaration += columns[i].colObj.getTag(i) + "\n";
		}*/
		
	}		
	declaration += "</ntb:ComboList>\n";
	declaration += "</ntb:Combo>\n";
	return declaration;
}

function getDetailDeclaration()
{
	var id = DETAIL_ID_INPUT.value;
	var textdatafield = DETAIL_TEXTDATAFIELD_LIST.selectedIndex;
	var textwidth = DETAIL_TEXTWIDTH_INPUT.value;
	
	var listwidth = DETAIL_LISTWIDTH_INPUT.value;
	var listheight = DETAIL_LISTHEIGHT_INPUT.value;
	
	var declaration = "<ntb:Combo ";
	if (id != "")
	{
		declaration += "Id=\"" + id + "\" ";
	}
	declaration += "Mode=\"Classic\" ";
	declaration += "theme=\"outlook\" ";
	declaration += ">\n";
	declaration += "<ntb:ComboTextBox ";
	declaration += "Width=\"" + (textwidth == ""?"250px":textwidth) + "\" DataFieldIndex=\"" + textdatafield + "\" ";
	declaration += "></ntb:ComboTextBox>\n";
	declaration += "<ntb:ComboList ";
	declaration += "Width=\"" + (listwidth == ""?"500px":listwidth) + "\" ";
	declaration += "Height=\"" + (listheight ==""?"400px":listheight) + "\" ";
	declaration += "DatasourceUrl=\"" + detail_datasourceurl + "\">";
	
	var columns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		var columnDec = "<ntb:ComboColumnDefinition HeaderLabel=\"" + values[1] + "\" Width=\"" + values[2] + "\" DataFieldIndex=\"" + i + "\"></ntb:ComboColumnDefinition>\n";
		declaration += columnDec;
		/*var colObj = columns[i].colObj;
		if (colObj)
		{
			declaration += columns[i].colObj.getTag(i) + "\n";
		}*/
		
	}		
	declaration += "</ntb:ComboList>\n";
	declaration += "</ntb:Combo>\n";
	return declaration;
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
		if (currentPage == 2 && MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode").length < 1)
		{
			NEXT_BUTTON.disabled = true;
		}
		else if (currentPage == 5 && DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode").length < 1)
		{
			NEXT_BUTTON.disabled = true;
		}
		else
		{
			NEXT_BUTTON.disabled = false;
		}
	}
}

function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=441");
}

function showPage(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

function hidePage(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

function clearMasterOptions()
{
	MASTER_COLLABEL_INPUT.value = "";
	MASTER_COLWIDTH_INPUT.value = "";
}

function clearDetailOptions()
{
	DETAIL_COLLABEL_INPUT.value = "";
	DETAIL_COLWIDTH_INPUT.value = "";
}

function setMasterLabel()
{
	var selNode = MASTER_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	if (selNode)
	{
		//colObj.label = COLLABEL_INPUT.value;
		var values = selNode.value.split("|");
		values[1] = MASTER_COLLABEL_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		MASTER_COLLABEL_INPUT.value = "";
		alert("Choose a column from the list above before setting values");
	}
}

function setDetailLabel()
{
	var selNode = DETAIL_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	if (selNode)
	{
		//colObj.label = COLLABEL_INPUT.value;
		var values = selNode.value.split("|");
		values[1] = DETAIL_COLLABEL_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		DETAIL_COLLABEL_INPUT.value = "";
		alert("Choose a column from the list above before setting values");
	}
}

function setMasterWidth()
{
	var selNode = MASTER_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	if (selNode)
	{
		var width = MASTER_COLWIDTH_INPUT.value;
		if (!nitobi.util.isPixelDimensions(width))
		{
			MASTER_COLWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			populateColumnDetailPanel();
		}
		else
		{
			MASTER_COLWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			//colObj.width =  COLWIDTH_INPUT.value;
			var values = selNode.value.split("|");
			values[2] = MASTER_COLWIDTH_INPUT.value;
			selNode.value = values.join("|");
			recalculateMasterListWidth();
		}
	}
	else
	{
		MASTER_COLWIDTH_INPUT.value = "";
		alert("Choose a column from the list above before setting values");
	}
		
}

function setDetailWidth()
{
	var selNode = DETAIL_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	if (selNode)
	{
		var width = DETAIL_COLWIDTH_INPUT.value;
		if (!nitobi.util.isPixelDimensions(width))
		{
			DETAIL_COLWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			populateColumnDetailPanel();
		}
		else
		{
			DETAIL_COLWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			//colObj.width =  COLWIDTH_INPUT.value;
			var values = selNode.value.split("|");
			values[2] = DETAIL_COLWIDTH_INPUT.value;
			selNode.value = values.join("|");
			recalculateDetailListWidth();
		}
	}
	else
	{
		DETAIL_COLWIDTH_INPUT.value = "";
		alert("Choose a column from the list above before setting values");
	}
		
}

function showMasterConnectionManager()
{
	MMDB.showConnectionMgrDialog();
	populateMasterConnectionList();
	populateMasterTableList();
}

function showDetailConnectionManager()
{
	MMDB.showConnectionMgrDialog();
	populateDetailConnectionList();
	populateDetailTableList();
}

function addMasterColumn()
{
	// columns is all columns
	// currentColumns is what's currently in the tree.
	var menu = new PopupMenu();
	var currentColumns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (masterColumns.length != currentColumns.length)
	{
		for (var i = 0; i < masterColumns.length; i++)
		{
			for (var j = 0; j < currentColumns.length; j++)
			{
				var values = currentColumns[j].value.split("|");
				if (values[0] == masterColumns[i])
				{
					break;
				}
			}
			if (j == currentColumns.length)
			{
				menu.addItem(masterColumns[i]);
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
		var tree = MASTER_COLUMNS_TREE;
		var selNode = tree.selectedNodes[0];
		if (selNode)
		{
			selNode.removeAttribute("selected");
		}
		
		tree.innerHTML += "<mm:treenode value=\"" + selected + "|" + selected + "|100px\" selected></mm:treenode>";
		NEXT_BUTTON.disabled = false;
		populateMasterColumnDetailPanel();
		configureMasterControls();
		recalculateMasterListWidth();
		repopulateMasterSearchList();
		validateMasterColumns();
	}
}


function addDetailColumn()
{
	// columns is all columns
	// currentColumns is what's currently in the tree.
	var menu = new PopupMenu();
	var currentColumns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (detailColumns.length != currentColumns.length)
	{
		for (var i = 0; i < detailColumns.length; i++)
		{
			for (var j = 0; j < currentColumns.length; j++)
			{
				var values = currentColumns[j].value.split("|");
				if (values[0] == detailColumns[i])
				{
					break;
				}
			}
			if (j == currentColumns.length)
			{
				menu.addItem(detailColumns[i]);
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
		var tree = DETAIL_COLUMNS_TREE;
		var selNode = tree.selectedNodes[0];
		if (selNode)
		{
			selNode.removeAttribute("selected");
		}
		
		tree.innerHTML += "<mm:treenode value=\"" + selected + "|" + selected + "|100px\" selected></mm:treenode>";
		NEXT_BUTTON.disabled = false;
		populateDetailColumnDetailPanel();
		configureDetailControls();
		recalculateDetailListWidth();
		repopulateDetailSearchList();
		validateDetailColumns();
	}
}


function removeMasterColumn()
{
	var tree = MASTER_COLUMNS_TREE;
	/*var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		selNode.outerHTML = "";
		selNode = null;
		clearOptions();
	}*/
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
		configureMasterControls();
		if (selNode)
		{
			populateMasterColumnDetailPanel();
		}
		else
		{
			clearMasterOptions();
		}
		validateMasterColumns();
		recalculateMasterListWidth();
		repopulateMasterSearchList();
	}
}

function removeDetailColumn()
{
	var tree = DETAIL_COLUMNS_TREE;
	/*var selNode = tree.selectedNodes[0];
	if (selNode)
	{
		selNode.outerHTML = "";
		selNode = null;
		clearOptions();
	}*/
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
		configureDetailControls();
		if (selNode)
		{
			populateDetailColumnDetailPanel();
		}
		else
		{
			clearDetailOptions();
		}
		validateDetailColumns();
		recalculateDetailListWidth();
		repopulateDetailSearchList();
	}
}


function moveUpMaster()
{
	var nodes = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(MASTER_COLUMNS_TREE);
	if (index > 0)
	{
		var tempValue = nodes[index - 1].value;
		//var tempColObj= nodes[index - 1].colObj;
		nodes[index - 1].value = nodes[index].value;
		//nodes[index - 1].colObj = nodes[index].colObj;
		
		nodes[index].value = tempValue;
		//nodes[index].colObj = tempColObj;
		nitobi.util.setTreeNodeIndex(MASTER_COLUMNS_TREE, index - 1);
		configureMasterControls();
	}
	repopulateMasterSearchList();
	//populateDataFieldInput();
}


function moveDownMaster()
{
	var nodes = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(MASTER_COLUMNS_TREE);
	if (index < nodes.length - 1)
	{
		var tempValue = nodes[index + 1].value;
		//var tempColObj = nodes[index + 1].colObj;
		nodes[index + 1].value = nodes[index].value;
		//nodes[index + 1].colObj = nodes[index].colObj;
		
		nodes[index].value = tempValue;
		//nodes[index].colObj = tempColObj;
		nitobi.util.setTreeNodeIndex(MASTER_COLUMNS_TREE, index + 1);
		configureMasterControls();
	}
	repopulateMasterSearchList();
	//populateDataFieldInput();
}

function moveUpDetail()
{
	var nodes = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(DETAIL_COLUMNS_TREE);
	if (index > 0)
	{
		var tempValue = nodes[index - 1].value;
		//var tempColObj= nodes[index - 1].colObj;
		nodes[index - 1].value = nodes[index].value;
		//nodes[index - 1].colObj = nodes[index].colObj;
		
		nodes[index].value = tempValue;
		//nodes[index].colObj = tempColObj;
		nitobi.util.setTreeNodeIndex(DETAIL_COLUMNS_TREE, index - 1);
		configureDetailControls();
	}
	repopulateDetailSearchList();
	//populateDataFieldInput();
}


function moveDownDetail()
{
	var nodes = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var index = nitobi.util.getTreeNodeIndex(DETAIL_COLUMNS_TREE);
	if (index < nodes.length - 1)
	{
		var tempValue = nodes[index + 1].value;
		//var tempColObj = nodes[index + 1].colObj;
		nodes[index + 1].value = nodes[index].value;
		//nodes[index + 1].colObj = nodes[index].colObj;
		
		nodes[index].value = tempValue;
		//nodes[index].colObj = tempColObj;
		nitobi.util.setTreeNodeIndex(DETAIL_COLUMNS_TREE, index + 1);
		configureDetailControls();
	}
	repopulateDetailSearchList();
	//populateDataFieldInput();
}


function repopulateMasterSearchList()
{
	var tree = MASTER_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	MASTER_TEXTDATAFIELD_LIST.innerHTML = "";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		MASTER_TEXTDATAFIELD_LIST.innerHTML += "<option value=\"" + values[0] + "\">" + values[0] + "</option>";
	}
	MASTER_TEXTDATAFIELD_LIST.selectedIndex = 0;
}

function repopulateDetailSearchList()
{
	var tree = DETAIL_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	DETAIL_TEXTDATAFIELD_LIST.innerHTML = "";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		DETAIL_TEXTDATAFIELD_LIST.innerHTML += "<option value=\"" + values[0] + "\">" + values[0] + "</option>";
	}
	DETAIL_TEXTDATAFIELD_LIST.selectedIndex = 0;
}

function populateMasterDataFieldInput()
{
	var tree = MASTER_COLUMNS_TREE;
	MASTER_TEXTDATAFIELD_LIST.innerHTML = "";
	var nodes = tree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		MASTER_TEXTDATAFIELD_LIST.innerHTML += "<option value=\"" + node.colObj.name + "\">" + node.colObj.name + "</option>";
	}
}

function populateDetailDataFieldInput()
{
	var tree = DETAIL_COLUMNS_TREE;
	DETAIL_TEXTDATAFIELD_LIST.innerHTML = "";
	var nodes = tree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		DETAIL_TEXTDATAFIELD_LIST.innerHTML += "<option value=\"" + node.colObj.name + "\">" + node.colObj.name + "</option>";
	}
}

function recalculateMasterListWidth()
{
	var tree = MASTER_COLUMNS_TREE;
	var nodes = tree.getElementsByTagName("mm:treenode");
	
	var listWidth = 0;
	for (var i = 0; i < nodes.length; i++)
	{
		//var colObj = nodes[i].colObj;
		var node = nodes[i];
		var values = node.value.split("|");
		listWidth += parseInt(values[2]);
	}
	MASTER_LISTWIDTH_INPUT.value = listWidth + "px";
}

function recalculateDetailListWidth()
{
	var tree = DETAIL_COLUMNS_TREE;
	var nodes = tree.getElementsByTagName("mm:treenode");
	
	var listWidth = 0;
	for (var i = 0; i < nodes.length; i++)
	{
		//var colObj = nodes[i].colObj;
		var node = nodes[i];
		var values = node.value.split("|");
		listWidth += parseInt(values[2]);
	}
	DETAIL_LISTWIDTH_INPUT.value = listWidth + "px";
}

function saveMasterId()
{
	masterIdValue = MASTER_ID_INPUT.value;
}

function saveDetailId()
{
	detailIdValue = DETAIL_ID_INPUT.value;
}

function validateMasterId()
{
	masterIdValue = MASTER_ID_INPUT.value;
	var id = MASTER_ID_INPUT.value;
	if (id == "")
	{
		MASTER_INVALID_DIV.setAttribute("class", "visibleWarning");
		MASTER_INVALID_DIV.innerHTML = "The id is required.";
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
					MASTER_INVALID_DIV.setAttribute("class", "visibleWarning");
					MASTER_INVALID_DIV.innerHTML = "This id is not unique.";
					return false;
				}
			}
			MASTER_INVALID_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
}

function validateDetailId()
{
	detailIdValue = DETAIL_ID_INPUT.value;
	var id = DETAIL_ID_INPUT.value;
	if (id == "")
	{
		DETAIL_INVALID_DIV.setAttribute("class", "visibleWarning");
		DETAIL_INVALID_DIV.innerHTML = "The id is required.";
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
					DETAIL_INVALID_DIV.setAttribute("class", "visibleWarning");
					DETAIL_INVALID_DIV.innerHTML = "This id is not unique.";
					return false;
				}
			}
			DETAIL_INVALID_DIV.setAttribute("class", "hiddenWarning");
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

function configureMasterControls()
{
	var tree = MASTER_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (columns.length > 1)
	{
		// Enable the remove button
		MASTER_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == columns[0])
			{
				// Enable Move down
				MASTER_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				MASTER_UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == columns[columns.length - 1])
			{
				// Disable Move down
				MASTER_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown_dis.gif";
				// Enable Move up
				MASTER_UP_BUTTON.src = "../Shared/MM/Images/btnUp.gif";
			}
			else
			{
				// If neither at top nor bottom, enable both up and down
				MASTER_UP_BUTTON.src = "../Shared/MM/Images/btnUp.gif";
				MASTER_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
			}
		}
	}
	else if (columns.length == 1)
	{
		// With only one tab selected, disable both move down and move up
		// also enable the remove button.
		MASTER_UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
		MASTER_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown_dis.gif";
		MASTER_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	}
	else
	{
		MASTER_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel_dis.gif";
	}
}

function configureDetailControls()
{
	var tree = DETAIL_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (columns.length > 1)
	{
		// Enable the remove button
		DETAIL_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
		if (selNode)
		{
			if (selNode == columns[0])
			{
				// Enable Move down
				DETAIL_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
				// Disable Move up
				DETAIL_UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
			}
			else if (selNode == columns[columns.length - 1])
			{
				// Disable Move down
				DETAIL_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown_dis.gif";
				// Enable Move up
				DETAIL_UP_BUTTON.src = "../Shared/MM/Images/btnUp.gif";
			}
			else
			{
				// If neither at top nor bottom, enable both up and down
				DETAIL_UP_BUTTON.src = "../Shared/MM/Images/btnUp.gif";
				DETAIL_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown.gif";
			}
		}
	}
	else if (columns.length == 1)
	{
		// With only one tab selected, disable both move down and move up
		// also enable the remove button.
		DETAIL_UP_BUTTON.src = "../Shared/MM/Images/btnUp_dis.gif";
		DETAIL_DOWN_BUTTON.src = "../Shared/MM/Images/btnDown_dis.gif";
		DETAIL_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	}
	else
	{
		DETAIL_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel_dis.gif";
	}
}


function validateMasterListHeight()
{
	var height = MASTER_LISTHEIGHT_INPUT.value;
	if (nitobi.util.isPixelDimensions(height))
	{
		MASTER_LISTHEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		MASTER_LISTHEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateDetailListHeight()
{
	var height = DETAIL_LISTHEIGHT_INPUT.value;
	if (nitobi.util.isPixelDimensions(height))
	{
		DETAIL_LISTHEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		DETAIL_LISTHEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateMasterListWidth()
{
	var width = MASTER_LISTWIDTH_INPUT.value;
	if (nitobi.util.isPixelDimensions(width))
	{
		MASTER_LISTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		MASTER_LISTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateDetailListWidth()
{
	var width = DETAIL_LISTWIDTH_INPUT.value;
	if (nitobi.util.isPixelDimensions(width))
	{
		DETAIL_LISTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		DETAIL_LISTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}


function validateMasterTextBoxWidth()
{
	var width = MASTER_TEXTWIDTH_INPUT.value;
	if (width.indexOf("%") == width.length - 1)
	{
		width = width.substr(0, width.length - 1);
		if (isNaN(width) || width == "")
		{
			MASTER_TEXTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
		else
		{
			MASTER_TEXTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
	else
	{
		if (nitobi.util.isPixelDimensions(width))
		{
			MASTER_TEXTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
		else
		{
			MASTER_TEXTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
	}
}

function validateDetailTextBoxWidth()
{
	var width = DETAIL_TEXTWIDTH_INPUT.value;
	if (width.indexOf("%") == width.length - 1)
	{
		width = width.substr(0, width.length - 1);
		if (isNaN(width) || width == "")
		{
			DETAIL_TEXTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
		else
		{
			DETAIL_TEXTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
	else
	{
		if (nitobi.util.isPixelDimensions(width))
		{
			DETAIL_TEXTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
		else
		{
			DETAIL_TEXTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
	}
}


function validateMasterComboProperties()
{
	var isValid = validateMasterId();
	isValid = validateMasterTextBoxWidth() && isValid;
	isValid = validateMasterListWidth() && isValid;
	isValid = validateMasterListHeight() && isValid;
	return isValid;
}

function validateDetailComboProperties()
{
	var isValid = validateDetailId();
	isValid = validateDetailTextBoxWidth() && isValid;
	isValid = validateDetailListWidth() && isValid;
	isValid = validateDetailListHeight() && isValid;
	return isValid;
}


function validateMasterConnectionInfo()
{
	var isValid = validateMasterConnection();
	isValid = validateMasterKey() && isValid;
	isValid = validateMasterTable() && isValid;
	return isValid;
}

function validateDetailConnectionInfo()
{
	var isValid = validateDetailConnection();
	isValid = validateDetailKey() && isValid;
	isValid = validateDetailTable() && isValid;
	return isValid;
}

function validateMasterConnection()
{
	if (MASTER_CONNECTION_LIST.selectedIndex > -1)
	{
		MASTER_CONNECTIONERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		MASTER_CONNECTIONERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
		
}

function validateDetailConnection()
{
	if (DETAIL_CONNECTION_LIST.selectedIndex > -1)
	{
		DETAIL_CONNECTIONERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		DETAIL_CONNECTIONERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
		
}

function validateMasterTable()
{
	if (MASTER_TABLE_LIST.selectedIndex > -1)
	{
		MASTER_TABLEERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		MASTER_TABLEERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateDetailTable()
{
	if (DETAIL_TABLE_LIST.selectedIndex > -1)
	{
		DETAIL_TABLEERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		DETAIL_TABLEERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}


function validateMasterKey()
{
	if (MASTER_KEY_LIST.selectedIndex > -1)
	{
		MASTER_KEYERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		MASTER_KEYERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateDetailKey()
{
	if (DETAIL_KEY_LIST.selectedIndex > -1)
	{
		DETAIL_KEYERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		DETAIL_KEYERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateMasterColumns()
{
	var tree = MASTER_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	if (columns.length < 1)
	{
		MASTER_COLUMNSERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		MASTER_COLUMNSERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function validateDetailColumns()
{
	var tree = DETAIL_COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	if (columns.length < 1)
	{
		DETAIL_COLUMNSERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		DETAIL_COLUMNSERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

function getServerCode(serverModelName)
{
	var selected_columns = MD_TREE.getElementsByTagName("mm:treenode");
	var glueCode = "";
	glueCode = makeGetGlue(serverModelName);
    return glueCode;
}

function makeGetGlue(model)
{
	var gluecode = "";
	if(model == "php")
	{
			gluecode += '$whereClause = "";\n';
			gluecode += "if (isset($_GET['whereClause'])) {\n";
			gluecode += "	$whereClause = $_GET['whereClause'];\n";
			gluecode += "}\n\n";
	}
	else if(model == "asp") 
	{
			gluecode += "if len(request.querystring(\"whereClause\")) > 0 then \n ";
			gluecode += "WhereClause = request.querystring(\"whereClause\") \n";
			gluecode += "end if \n ";
	}
	else if(model == "jsp")
	{
		gluecode += "String whereClauseqry=request.getParameter(\" whereClause \");\n";	
		gluecode += "if ((whereClauseqry==null) || (0 == whereClauseqry.length()))\n";
		gluecode += "{\n";
		gluecode += "\n";
		gluecode += "}\nelse\n";
		gluecode += "{\n";
		gluecode += "	whereClause = whereClauseqry ;\n";
		gluecode += "}\n;";
	}
	else if(model == "cfm")
	{
		gluecode += "<cfif parameterexists(whereClause) is \"YES\">\n";
		gluecode += "<cfset WhereClause = #whereClause#  >\n";
		gluecode += "<cfelse>\n";
		gluecode += "<cfset WhereClause = \"\" >\n";
		gluecode += "</cfif>\n";		
	}
	return gluecode;
}

function addComboLink()
{
	var selectedMaster = nitobi.util.getSelectedOption(MASTER_DATA_LIST);
	var selectedDetail = nitobi.util.getSelectedOption(DETAIL_DATA_LIST);
	
	var currentColumns = MD_TREE.getElementsByTagName("mm:treenode");
	if ((selectedMaster.length > 0 ) && (selectedDetail.length > 0))
	{
		for (var i = 0; i < currentColumns.length; i++)
		{
			var values = currentColumns[i].value.split("|");
			if (values[0] == selectedMaster && values[1] == selectedDetail)
			{
				alert('This link already exists!  Please choose two different columns, or click finish to complete the link');
				return;
			}
		}	
		MD_TREE.innerHTML += "<mm:treenode value=\"" +  selectedMaster + "|" + selectedDetail + "\"></mm:treenode>";
	}
	else
	{
		alert('Please select columns from both grids');
	}
	validateLinks();
	configureMdTreeControls();
}

function removeComboLink()
{
	var tree = MD_TREE;
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
		validateLinks();
		configureMdTreeControls();
	}
}

function configureMdTreeControls()
{
	var tree = MD_TREE;
	var links = tree.getElementsByTagName("mm:treenode");
	if (links.length > 0)
		REMOVELINK_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	else
		REMOVELINK_BUTTON.src = "../Shared/MM/Images/btnDel_dis.gif";
}

function generateGlueCode( code )
{
	var glueCode = code;
	var pairs =  new Array;
	var currentColumns = MD_TREE.getElementsByTagName("mm:treenode");
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var connection = nitobi.util.getSelectedOption(DETAIL_CONNECTION_LIST);
	var query = "";
	var innerString = ""; 
	var isString = false;
	
	for (var i = 0; i < currentColumns.length; i++)
	{
		var values = currentColumns[i].value.split("|");
		pairs[i] = values;
	}	

	glueCode += "\n function getChildData" + MASTER_ID_INPUT.value + DETAIL_ID_INPUT.value + "() \n";
	glueCode += " { \n ";
	glueCode += "	var masterCombo = nitobi.getComponent('" + MASTER_ID_INPUT.value + "'); \n ";	
	for (var i = 0; i < pairs.length; ++i)
	{
		var query = "SELECT " + pairs[i][1] + " from " + tableName;
		var columnArray = MMDB.getColumnAndTypeList(connection, query);
		
		if (columnArray[1] == "varchar")
		{
			isString = true;
		}
		
		glueCode += "	var "+ pairs[i][0] + " = masterCombo.GetFieldFromActiveRow(\"" +  pairs[i][0] + "\");\n";
		if (i > 0 & isString)
		{
			innerString += "+ %\" AND ";
		}
		else
		{
			innerString += " AND ";
		}
		
		if (isString)
		{
			innerString += pairs[i][1] + " LIKE '\" + " +  pairs[i][0] + " + \"%'\"";
		}
		else
		{
			innerString += pairs[i][1] + " = \" + " +  pairs[i][0] + " ";
		}
	}
	glueCode += "	var detailCombo = nitobi.getComponent('" + DETAIL_ID_INPUT.value + "'); \n";
	glueCode += "	detailCombo.GetList().Clear();\n";
	glueCode += "detailCombo.GetList().SetDatasourceUrl(\"" +  detail_datasourceurl + "?table=tblProvinces&whereClause=\" + escape(\"" +  innerString + ")  ); \n";
	glueCode += "	detailCombo.GetList().GetPage(0,0,\"\");\n";
	glueCode += "	return true;\n";
	glueCode += "}";
	
	return glueCode;
}

