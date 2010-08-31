var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var PAGE3 = document.page3.document;
var PAGE4 = document.page4.document;
var PAGE5 = document.page5.document;
var PAGE6 = document.page6.document;
var PAGE7 = document.page7.document;

var BUTTONS = document.buttons.document;

var SERVER_LIST = PAGE1.server_list;
var MASTER_SERVER_LIST = SERVER_LIST;

var CONNECTION_LIST = PAGE1.connection_list;
var TABLE_LIST = PAGE1.table_list;
var DATABASE_LIST = PAGE1.database_list;
var KEY_LIST = PAGE1.key_list;

var CONNECTIONERROR_DIV = PAGE1.connectionerror_div;
var TABLEERROR_DIV = PAGE1.tableerror_div;
var KEYERROR_DIV = PAGE1.keyerror_div;

var DETAIL_CONNECTION_LIST = PAGE4.connection_list;
var DETAIL_TABLE_LIST = PAGE4.table_list;
var DETAIL_DATABASE_LIST = PAGE4.database_list;
var DETAIL_KEY_LIST = PAGE4.key_list;

var DETAIL_CONNECTIONERROR_DIV = PAGE4.connectionerror_div;
var DETAIL_TABLEERROR_DIV = PAGE4.tableerror_div;
var DETAIL_KEYERROR_DIV = PAGE4.keyerror_div;

var COLUMNS_TREE = PAGE2.columns_tree;
var COLLABEL_INPUT = PAGE2.collabel_input;
var COLWIDTH_INPUT = PAGE2.colwidth_input;

var COLWIDTHERROR_DIV = PAGE2.colwidtherror_div;
var COLUMNSERROR_DIV = PAGE2.columnserror_div;

var ADD_BUTTON = PAGE2.add_button;
var REMOVE_BUTTON = PAGE2.remove_button;
var UP_BUTTON = PAGE2.up_button;
var DOWN_BUTTON = PAGE2.down_button;
var MASTER_LINK_LIST = PAGE7.master_cols;
var DETAIL_LINK_LIST = PAGE7.detail_cols;

// Detail Grid Options

var DETAIL_COLUMNS_TREE = PAGE5.columns_tree;
var DETAIL_LABEL_INPUT = PAGE5.label_input;
var DETAIL_COLUMNTYPE_LIST = PAGE5.columntype_list;
var DETAIL_WIDTH_INPUT = PAGE5.width_input;
var DETAIL_OPTIONS_DIV = PAGE5.options_div;
var DETAIL_TOGGLE_BUTTON = PAGE5.toggle_button;

var DETAIL_ADD_BUTTON = PAGE5.add_button;
var DETAIL_REMOVE_BUTTON = PAGE5.remove_button;
var DETAIL_UP_BUTTON = PAGE5.up_button;
var DETAIL_DOWN_BUTTON = PAGE5.down_button;

var DETAIL_COLUMNSERROR_DIV = PAGE5.columnserror_div;

var DETAIL_SORTCOLUMN_LIST = PAGE6.sortcolumn_list;
var DETAIL_SORTDIRECTION_LIST = PAGE6.sortdirection_list;
var DETAIL_ID_INPUT = PAGE6.id_input;
var DETAIL_SAVE_CHECK = PAGE6.save_check;
var DETAIL_MODE_LIST = PAGE6.mode_list;
var DETAIL_GRIDWIDTH_INPUT = PAGE6.width_input;
var DETAIL_HEIGHT_INPUT = PAGE6.height_input;
var DETAIL_GRIDOPTIONS_DIV = PAGE6.gridoptions_div;
var DETAIL_GRIDTOGGLE_BUTTON = PAGE6.gridtoggle_button;

var DETAIL_INVALID_DIV = PAGE6.invalid_div;
var DETAIL_HEIGHTERROR_DIV = PAGE6.heighterror_div;
var DETAIL_WIDTHERROR_DIV = PAGE6.widtherror_div;



var ID_INPUT = PAGE3.id_input;
var TEXTOPTIONS_DIV = PAGE3.textoptions_div;
var TEXTDATAFIELD_LIST = PAGE3.textdatafield_list;
var TEXTWIDTH_INPUT = PAGE3.textwidth_input;

var LISTHEIGHT_INPUT = PAGE3.listheight_input;
var LISTWIDTH_INPUT = PAGE3.listwidth_input;

var INVALID_DIV = PAGE3.invalid_div;
var LISTHEIGHTERROR_DIV = PAGE3.listheighterror_div;
var LISTWIDTHERROR_DIV = PAGE3.listwidtherror_div;

var TEXTWIDTHERROR_DIV = PAGE3.textwidtherror_div;

var COMBO_DATA_LIST = PAGE7.master_cols;
var DETAIL_DATA_LIST = PAGE7.detail_cols;
var MD_TREE = PAGE7.master_detail_tree;

var LINKERROR_DIV = PAGE7.linkerror_div;


var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;
var MD_ADD_BUTTON = PAGE7.add_button;
var MD_REMOVE_BUTTON = PAGE7.remove_button;

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

var combogethandler = "";
var detailgethandler = "";
var detailsavehandler = "";

var comboColumns = [];
var detailColumns = [];
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
	return "560,625";
}

function init()
{
	document.page1.visibility = "visible";
	document.buttons.visibility = "visible";
		
	setServerModelList();
	populateConnectionList();
	populateTableList();
	populateDatabaseList();	
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
	var table_list = TABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
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
	validateConnectionInfo();
	list.selectedIndex = 0;
}

function populateColumnLists()
{
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var tableName = nitobi.util.getSelectedOption(TABLE_LIST);
	
	// comboColumns is a list of all the column names.  We use it when adding new
	// columns to ensure only those columns that are not already included be made available
	// to the customer.
	comboColumns = [];
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
		clearColumnsTree();
		populateTreeFromArray(columns);
		LISTWIDTH_INPUT.value = (columns.length * 100) + "px";
		populateColumnDetailPanel();
		validateConnectionInfo();
	}
}

/* Detail Grid Info */
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
	connection_list.selectedIndex = CONNECTION_LIST.selectedIndex
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

function populateDetailDatabaseList()
{
	var list = DETAIL_DATABASE_LIST;
	//var serverModel = this.getServerModelName()
	var serverModel = nitobi.util.getSelectedOption(SERVER_LIST);
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = DATABASE_LIST.selectedIndex;
	validateDetailConnectionInfo();
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
		
		//populateTreeFromString(columns);
		//populateColumnDetailPanel();
		clearDetailColumnsTree();
		for (var i = 0; i < columns.length; i++)
		{
			var column = columns[i];
			DETAIL_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|textcolumn|100\"></mm:treenode>";
			
			detailColumns.push(column);
			//currentColumns.push(colObj.name);
		}
		var nodes = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
		if (nodes.length > 0)
		{
			nodes[0].setAttribute("selected", "true");
		}
		populateDetailColumnDetailPanel();
		validateDetailConnectionInfo();
		/*i = 0;
		for (i in columns)
		{
			var column = columns[i];
			COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|textcolumn|100\"></mm:treenode>";
			// for each node we add, we need to also add a columnObj to the node itself
			var colObj = new nitobi.dw.GridColumn(column, column, "textcolumn", "100");
			COLUMNS_TREE.childNodes[COLUMNS_TREE.childNodes.length - 1].colObj = colObj;
			
			allColumns.push(colObj.name);
			//currentColumns.push(colObj.name);
		}*/
		//populateTree(columns);
	}
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

function populateTreeFromArray(columns)
{
	/*var treeColumnNodes = COLUMNS_TREE.getElementsByTagName("mm:treecolumn");
	var columnDec = "";
	for (var i = 0; i < treeColumnNodes.length; i++)
	{
		columnDec += treeColumnNodes[i].outerHTML;
	}
	COLUMNS_TREE.innerHTML = "";
	COLUMNS_TREE.innerHTML += columnDec;*/
	
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|100px\"></mm:treenode>";
		
		comboColumns.push(column);
		//currentColumns.push(colObj.name);
	}
	var nodes = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (nodes.length > 0)
	{
		nodes[0].setAttribute("selected", "true");
	}
	//populateColumnDetailPanel();
		/*var column = columns[i];
		if (i == 0)
		{
			COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|100px\" selected></mm:treenode>";
		}
		else
		{
			COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|100px\"></mm:treenode>";
		}
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.ComboColumn(column, column, "100px");
		COLUMNS_TREE.childNodes[COLUMNS_TREE.childNodes.length - 1].colObj = colObj;
		
		comboColumns.push(colObj.name);*/
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
		
		COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column.name + "|" + column.label + "|100px\"></mm:treenode>";
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.ComboColumn(column, column, "100px");
		COLUMNS_TREE.childNodes[COLUMNS_TREE.childNodes.length - 1].colObj = column;
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
		
		DETAIL_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column.name + "|" + column.label + "|textcolumn|100\"></mm:treenode>";
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.GridColumn(column, column, "textcolumn", "100");
		DETAIL_COLUMNS_TREE.childNodes[DETAIL_COLUMNS_TREE.childNodes.length - 1].colObj = column;
		
		//allColumns.push(colObj.name);
		//currentColumns.push(colObj.name);
	}
}

function populateColumnDetailPanel()
{
	clearOptions();
	var tree = COLUMNS_TREE;
	var treeNodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	//var colObj = selNode.colObj;

	var values = selNode.value.split("|");
	COLLABEL_INPUT.value = values[1];
	COLWIDTH_INPUT.value = values[2];
	configureControls();
}


function populateDetailColumnDetailPanel()
{
	clearDetailOptions();
	var tree = DETAIL_COLUMNS_TREE;
	var treeNodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	//var colObj = selNode.colObj;

	var values = selNode.value.split("|");
	DETAIL_LABEL_INPUT.value = values[1];
	nitobi.util.chooseSelectOption(values[2], DETAIL_COLUMNTYPE_LIST);
	DETAIL_WIDTH_INPUT.value = values[3];
	configureDetailControls();
}


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
			if (validateColumns())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if(currentPage == 3)
		{
				if (validateComboProperties())
				{
					hidePage(currentPage);
					currentPage++;
					showPage(currentPage);
				}
		}
		// Detail Grid
		else if(currentPage == 4)
		{
			if (validateDetailConnectionInfo())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if(currentPage == 5)
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
				if (validateDetailGridProperties())
				{
					populateDataColumnLists();
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
			createHandler();
			createDetailHandler();
			
			if (DETAIL_SAVE_CHECK.checked == true)
			{
				createDetailSaveHandler();
			}
			
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

function createDetailSaveHandler()
{
	var wizard = nitobi.dw.MDSaveWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var id = DETAIL_ID_INPUT.value;
	var destFile = wizard.copyHandlerFile(serverModelName, tableName, id);
	var file = wizard.createDetailHandler(destFile);
	
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	detailsavehandler = destFile.substr(root.length);
}

function createDetailHandler()
{
	var wizard = nitobi.dw.DetailGridWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var sourceFile = nitobi.dw.DetailGridWizard.getSourceFile(serverModelName);
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var id = DETAIL_ID_INPUT.value;
	var destFile = nitobi.dw.DetailGridWizard.getDestFile(serverModelName, tableName, id);
	DWfile.copy(sourceFile, destFile);
	var file = wizard.createHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	detailgethandler = destFile.substr(root.length);
}

function createHandler()
{
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var sourceFile = getSourceFile(serverModelName);
	var tableName = nitobi.util.getSelectedOption(TABLE_LIST);
	var id = ID_INPUT.value;
	var destFile = getDestFile(serverModelName, tableName, id);
	DWfile.copy(sourceFile, destFile);
	var file = populateTemplate(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	datasourceurl = destFile.substr(root.length);
	
	copyXmlConverter(serverModelName);
}

/** This handles the Combo Server Code generation, this does NOT need to be changed **/

function populateTemplate(file)
{
	var file = DWfile.read(file);

	var table = nitobi.util.getSelectedOption(TABLE_LIST);
	var key = nitobi.util.getSelectedOption(KEY_LIST);
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST)
	var colDef = getColumnDefinition(serverModelName, key);
	var recDef = getRecordDefinition(serverModelName, key);
	var dbName = nitobi.util.getSelectedOption(DATABASE_LIST);
	var query = getQuery(dbName, serverModelName, table);
	var connectionFile = getConnectionFilePath();
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	
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
	var searchColumn = nitobi.util.getSelectedOption(TEXTDATAFIELD_LIST);
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

function getColumnDefinition(serverModelName, key)
{
	var colDef = "";
	var columnDefinitionTemplate = nitobi.dw.Wizard.columnDefinitionMap[serverModelName];
	var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
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

function getRecordDefinition(serverModelName, key)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
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

function getQuery(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.comboQueryMap[serverModelName][dbName];
	return query;
}

function getConnectionFilePath()
{
	var serverModelName = nitobi.util.getSelectedOption(SERVER_LIST);
	var connectionFilePath = "Connections/" + nitobi.util.getSelectedOption(CONNECTION_LIST) + "." + serverModelName;
	return connectionFilePath;
}

function getSourceFile(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/combo.load." + serverName;
	return sourceFile;	
}


function getDestFile(serverName, tableName, id)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "combo.load*." + serverName);
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".comboload." + serverName;
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

/** This will be a bit tricky ***/

function insertDeclaration()
{
	var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	var declaration = getDeclaration() + ' ' + getDetailDeclaration();
	dom.insertHTML(declaration);
	var id = ID_INPUT.value;
	var detail_id = DETAIL_ID_INPUT.value;
	var combo_code = nitobi.util.getComponentInitCode(id);
	var grid_code = nitobi.util.getComponentInitCode(detail_id);
	var code = combo_code + '\n' +  grid_code;
	code = generateGlueCode(code);
	
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
		var assetList = nitobi.util.getAssetList("combo");
		dom.copyAssets(assetList);
		var assetList = nitobi.util.getAssetList("grid");
		dom.copyAssets(assetList);		
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("combo");
		nitobi.util.copyAssets("grid");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.combo.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.combo.js\"></script>\n";
			componentSrc += "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.grid.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.combo.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.combo.js\"></script>";
			componentSrc += "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.grid.js\"></script>";
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

function getDeclaration()
{
	var id = idValue;
	var textdatafield = TEXTDATAFIELD_LIST.selectedIndex;
	var textwidth = TEXTWIDTH_INPUT.value;
	
	var listwidth = LISTWIDTH_INPUT.value;
	var listheight = LISTHEIGHT_INPUT.value;
	
	var pathToRoot = nitobi.util.getPathToRoot();
	
	var declaration = "<ntb:Combo ";
	if (id != "")
	{
		declaration += "Id=\"" + id + "\" ";
	}
	declaration += "Mode=\"Classic\" ";
	declaration += "theme=\"outlook\" ";
	declaration += "OnSelectEvent=\"getChildData"+ ID_INPUT.value + DETAIL_ID_INPUT.value +"()\"";
	declaration += ">\n";
	declaration += "<ntb:ComboTextBox ";
	declaration += "Width=\"" + (textwidth == ""?"250px":textwidth) + "\" DataFieldIndex=\"" + textdatafield + "\" ";
	declaration += "></ntb:ComboTextBox>\n";
	declaration += "<ntb:ComboList ";
	declaration += "Width=\"" + (listwidth == ""?"500px":listwidth) + "\" ";
	declaration += "Height=\"" + (listheight ==""?"400px":listheight) + "\" ";	
	declaration += "DatasourceUrl=\"" + pathToRoot + datasourceurl + "\">";
	
	var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
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
	var mode = nitobi.util.getSelectedOption(DETAIL_MODE_LIST);
	var width = DETAIL_GRIDWIDTH_INPUT.value;
	var height = DETAIL_HEIGHT_INPUT.value;
	
	var pathToRoot = nitobi.util.getPathToRoot();
		
	/* 
	This is temporary, delete when getting the gethandler to work 	
	detailgethandler = "detailGet.php";
	detailsavehandler = "detailSave.php";
	*/
	
	var declaration = "<ntb:grid ";
	declaration += "id=\"" + id + "\" ";
	declaration += "mode=\"" + mode + "\" ";
	declaration += "gethandler=\"" + pathToRoot + detailgethandler + "\" ";

	if (DETAIL_SAVE_CHECK.checked == true)
	{
		declaration += "savehandler=\"" + pathToRoot + detailsavehandler + "\" ";
	}
	
	declaration += "height=\"" + (height != ""?height:"500") + "\" ";
	declaration += "width=\"" + (width != ""?width:"500") + "\"";
	declaration += "theme=\"nitobi\" ";
	declaration += ">\n";
	declaration += "<ntb:columns>\n";
	
	
	var columns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		/*var colObj = columns[i].colObj;
		if (colObj)
		{
			declaration += colObj.getTag() + "\n";
		}*/
		var column = columns[i];
		var values = column.value.split("|");
		var columnDec = "<ntb:" + values[2] + " xdatafld=\"" + values[0] + "\" label=\"" + values[1] + "\" width=\"" + values[3] + "\"></ntb:" + values[2] + ">\n";
		declaration += columnDec;
	}
	
	declaration += "</ntb:columns>\n";
	declaration += "</ntb:grid>\n";
	
	return declaration;
}

function generateGlueCode( code )
{
	var glueCode = code;
	var pairs =  new Array;
	var currentColumns = MD_TREE.getElementsByTagName("mm:treenode");
	
	for (var i = 0; i < currentColumns.length; i++)
	{
		var values = currentColumns[i].value.split("|");
		pairs[i] = values;
	}

	glueCode += "\n function getChildData" + ID_INPUT.value + DETAIL_ID_INPUT.value + "() \n";
	glueCode += " { \n ";
	glueCode += "	var combo = nitobi.getComponent('" + ID_INPUT.value + "'); \n ";	
	for (var i = 0; i < pairs.length; ++i)
	{
		glueCode += "	var "+ pairs[i][0] + " = combo.GetFieldFromActiveRow(\"" +  pairs[i][0] + "\");\n";
	}
	glueCode += "	var detailGrid = nitobi.getComponent('" + DETAIL_ID_INPUT.value + "'); \n";
	for (var i = 0; i < pairs.length; ++i)
	{
		glueCode += " 	detailGrid.getDataSource().setGetHandlerParameter('"+  pairs[i][1] +"',"+  pairs[i][0]+ "); \n";
	}	glueCode += "	detailGrid.dataBind();\n";
	glueCode += "	return true;\n";
	glueCode += "}";
	
	return glueCode;
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
		if (currentPage == 2 && COLUMNS_TREE.getElementsByTagName("mm:treenode").length < 1)
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

function clearOptions()
{
	COLLABEL_INPUT.value = "";
	COLWIDTH_INPUT.value = "";
}

function setLabel()
{
	var selNode = COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	if (selNode)
	{
		//colObj.label = COLLABEL_INPUT.value;
		var values = selNode.value.split("|");
		values[1] = COLLABEL_INPUT.value;
		selNode.value = values.join("|");
	}
	else
	{
		COLLABEL_INPUT.value = "";
		alert("Choose a column from the list above before setting values");
	}
}

function setWidth()
{
	var selNode = COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	if (selNode)
	{
		var width = COLWIDTH_INPUT.value;
		if (!nitobi.util.isPixelDimensions(width))
		{
			COLWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			populateColumnDetailPanel();
		}
		else
		{
			COLWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			//colObj.width =  COLWIDTH_INPUT.value;
			var values = selNode.value.split("|");
			values[2] = COLWIDTH_INPUT.value;
			selNode.value = values.join("|");
			recalculateListWidth();
		}
	}
	else
	{
		COLWIDTH_INPUT.value = "";
		alert("Choose a column from the list above before setting values");
	}
		
}

function showConnectionManager()
{
	MMDB.showConnectionMgrDialog();
	populateConnectionList();
	populateTableList();
}


function addColumn()
{
	// columns is all columns
	// currentColumns is what's currently in the tree.
	var menu = new PopupMenu();
	var currentColumns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	if (comboColumns.length != currentColumns.length)
	{
		for (var i = 0; i < comboColumns.length; i++)
		{
			for (var j = 0; j < currentColumns.length; j++)
			{
				var values = currentColumns[j].value.split("|");
				if (values[0] == comboColumns[i])
				{
					break;
				}
			}
			if (j == currentColumns.length)
			{
				menu.addItem(comboColumns[i]);
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
		
		tree.innerHTML += "<mm:treenode value=\"" + selected + "|" + selected + "|100px\" selected></mm:treenode>";
		NEXT_BUTTON.disabled = false;
		populateColumnDetailPanel();
		configureControls();
		recalculateListWidth();
		repopulateSearchList();
		validateColumns();
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
}

function removeColumn()
{
	var tree = COLUMNS_TREE;
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
		configureControls();
		if (selNode)
		{
			populateColumnDetailPanel();
		}
		else
		{
			clearOptions();
		}
		validateColumns();
		recalculateListWidth();
		repopulateSearchList();
	}
}

function moveUp()
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
		configureControls();
	}
	repopulateSearchList();
	//populateDataFieldInput();
}


function moveDown()
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
		configureControls();
	}
	repopulateSearchList();
	//populateDataFieldInput();
}

function repopulateSearchList()
{
	var tree = COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	TEXTDATAFIELD_LIST.innerHTML = "";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		TEXTDATAFIELD_LIST.innerHTML += "<option value=\"" + values[0] + "\">" + values[0] + "</option>";
	}
	TEXTDATAFIELD_LIST.selectedIndex = 0;
}

function populateDataFieldInput()
{
	var tree = COLUMNS_TREE;
	TEXTDATAFIELD_LIST.innerHTML = "";
	var nodes = tree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		TEXTDATAFIELD_LIST.innerHTML += "<option value=\"" + node.colObj.name + "\">" + node.colObj.name + "</option>";
	}
}

function recalculateListWidth()
{
	var tree = COLUMNS_TREE;
	var nodes = tree.getElementsByTagName("mm:treenode");
	
	var listWidth = 0;
	for (var i = 0; i < nodes.length; i++)
	{
		//var colObj = nodes[i].colObj;
		var node = nodes[i];
		var values = node.value.split("|");
		listWidth += parseInt(values[2]);
	}
	LISTWIDTH_INPUT.value = listWidth + "px";
}

function saveId()
{
	idValue = ID_INPUT.value;
}

function validateId()
{
	idValue = ID_INPUT.value;
	var id = ID_INPUT.value;
	if (id == "")
	{
		INVALID_DIV.setAttribute("class", "visibleWarning");
		INVALID_DIV.innerHTML = "The id is required.";
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
					return false;
				}
			}
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

function validateListHeight()
{
	var height = LISTHEIGHT_INPUT.value;
	if (nitobi.util.isPixelDimensions(height))
	{
		LISTHEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		LISTHEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateListWidth()
{
	var width = LISTWIDTH_INPUT.value;
	if (nitobi.util.isPixelDimensions(width))
	{
		LISTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		LISTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
}

function validateTextBoxWidth()
{
	var width = TEXTWIDTH_INPUT.value;
	if (width.indexOf("%") == width.length - 1)
	{
		width = width.substr(0, width.length - 1);
		if (isNaN(width) || width == "")
		{
			TEXTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
		else
		{
			TEXTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
	else
	{
		if (nitobi.util.isPixelDimensions(width))
		{
			TEXTWIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
		else
		{
			TEXTWIDTHERROR_DIV.setAttribute("class", "visibleWarning");
			return false;
		}
	}
}

function validateComboProperties()
{
	var isValid = validateId();
	isValid = validateTextBoxWidth() && isValid;
	isValid = validateListWidth() && isValid;
	isValid = validateListHeight() && isValid;
	return isValid;
}

function validateConnectionInfo()
{
	var isValid = validateConnection();
	isValid = validateKey() && isValid;
	isValid = validateTable() && isValid;
	return isValid;
}

function validateDetailConnectionInfo()
{
	var isValid = validateDetailConnection();
	isValid = validateDetailKey() && isValid;
	isValid = validateDetailTable() && isValid;
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
		CONNECTIONERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
		
}

function validateTable()
{
	if (TABLE_LIST.selectedIndex > -1)
	{
		TABLEERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
	else
	{
		TABLEERROR_DIV.setAttribute("class", "visibleWarning");
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
	var tree = COLUMNS_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	if (columns.length < 1)
	{
		COLUMNSERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		COLUMNSERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}

/* More Detail Grid stuff */

function clearDetailOptions()
{
	DETAIL_LABEL_INPUT.value = "";
	DETAIL_COLUMNTYPE_LIST.selectedIndex = 0;
	DETAIL_WIDTH_INPUT.value = "";
}

function updateDetailColumn()
{
	var selNode = DETAIL_COLUMNS_TREE.selectedNodes[0];
	var colObj = selNode.colObj;

	colObj.label = DETAIL_LABEL_INPUT.value;
	colObj.type = nitobi.util.getSelectedOption(DETAIL_COLUMNTYPE_LIST);
 	colObj.width =  (DETAIL_WIDTH_INPUT.value.indexOf("px") == -1?DETAIL_WIDTH_INPUT.value:DETAIL_WIDTH_INPUT.value.substr(0, DETAIL_WIDTH_INPUT.value.length - 2));
	selNode.value = colObj.name + "|" + colObj.label + "|" + colObj.type + "|" + colObj.width;
}

function setDetailLabel()
{
	var selNode = DETAIL_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	
	//colObj.label = LABEL_INPUT.value;
	var values = selNode.value.split("|");
	values[1] = DETAIL_LABEL_INPUT.value;
	selNode.value = values.join("|");
}

function setDetailType()
{
	var selNode = DETAIL_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	
	//colObj.type = nitobi.util.getSelectedOption(COLUMNTYPE_LIST);
	var values = selNode.value.split("|");
	values[2] = nitobi.util.getSelectedOption(DETAIL_COLUMNTYPE_LIST);
	selNode.value = values.join("|");
}

function setDetailWidth()
{
	var selNode = DETAIL_COLUMNS_TREE.selectedNodes[0];
	var colObj = selNode.colObj;
	
	//colObj.width =  (WIDTH_INPUT.value.indexOf("px") == -1?WIDTH_INPUT.value:WIDTH_INPUT.value.substr(0, WIDTH_INPUT.value.length - 2));
	var values = selNode.value.split("|");
	values[3] = (DETAIL_WIDTH_INPUT.value.indexOf("px") == -1?DETAIL_WIDTH_INPUT.value:DETAIL_WIDTH_INPUT.value.substr(0, DETAIL_WIDTH_INPUT.value.length - 2));
	selNode.value = values.join("|");
}


function showDetailConnectionManager()
{
	var wizard = nitobi.dw.MasterDetailWizard.getInstance();
	MMDB.showConnectionMgrDialog();
	//clear();
	populateDetailConnectionList();
	populateDetailTableList();
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
		tree.innerHTML += "<mm:treenode value=\"" + selected + "|" + selected + "|textcolumn|100\" selected></mm:treenode>";
		populateDetailColumnDetailPanel();
		configureDetailControls();
		validateDetailColumns();
	}
}

function removeDetailColumn()
{
	var tree = DETAIL_COLUMNS_TREE;	
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
	}
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
}

function validateDetailGridProperties()
{
	var isValid = validateDetailId();
	isValid = validateDetailWidth() && isValid;
	isValid = validateDetailHeight() && isValid;
	return isValid;
}


function validateDetailId()
{
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
			if (id == ID_INPUT.value)
			{
				DETAIL_INVALID_DIV.setAttribute("class", "visibleWarning");
				DETAIL_INVALID_DIV.innerHTML = "This id must not match the Combo ID.";
				return false;
			}
			// If we get out here, the id is ok, so we renable the button and hide the warning
			DETAIL_INVALID_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
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


function validateDetailHeight()
{
	var height = DETAIL_HEIGHT_INPUT.value;
	if (isNaN(height))
	{
		DETAIL_HEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		DETAIL_HEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
	}
}


function validateDetailWidth()
{
	var width = DETAIL_GRIDWIDTH_INPUT.value;
	if (isNaN(width))
	{
		DETAIL_WIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		DETAIL_WIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
		return true;
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

function populateDataColumnLists()
{
	var connName = nitobi.util.getSelectedOption(CONNECTION_LIST);
	var tableName = nitobi.util.getSelectedOption(TABLE_LIST);

	var columns = MMDB.getColumnsOfTable(connName, tableName);
	var columnMarkup = "";
	for (var i = 0; i < columns.length; i++)
	{
		var columnName = columns[i];
		columnMarkup += "<option value=\"" + columnName + "\">" + columnName + "</option>";
	}
	
	connName = nitobi.util.getSelectedOption(DETAIL_CONNECTION_LIST);
	tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	
	var detailColumns = MMDB.getColumnsOfTable(connName, tableName);
	var detailColumnMarkup = "";
	for (var i = 0; i < detailColumns.length; i++)
	{
		var columnName = detailColumns[i];
		detailColumnMarkup += "<option value=\"" + columnName + "\">" + columnName + "</option>";
	}
	
	COMBO_DATA_LIST.innerHTML = columnMarkup;
	DETAIL_DATA_LIST.innerHTML = detailColumnMarkup;
}

function addGridLink()
{
	var selectedMaster = nitobi.util.getSelectedOption(COMBO_DATA_LIST);
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
		MD_TREE.innerHTML += "<mm:treenode value=\"" +  selectedMaster + "|" + selectedDetail + "\" selected></mm:treenode>";
	}
	else
	{
		alert('Please select columns from Grid and Combo');
	}
	validateLinks();
	configureMDControls();
}

function removeGridLink()
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
		configureMDControls();
	}
}

function configureMDControls()
{
	var tree = MD_TREE;
	var columns = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (columns.length >= 1)
	{
		// Enable the remove button
		MD_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel.gif";
	}
	else
	{
		MD_REMOVE_BUTTON.src = "../Shared/MM/Images/btnDel_dis.gif";
	}
}

function clearMasterDetailLists()
{
	var tree = MD_TREE
	var master = COMBO_DATA_LIST;
	var detail = DETAIL_DATA_LIST;
	var columns = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	if (columns.length > 1)
	{
		
	}
}