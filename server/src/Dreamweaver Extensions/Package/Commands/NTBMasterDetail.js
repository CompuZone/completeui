var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var PAGE3 = document.page3.document;
var PAGE4 = document.page4.document;
var PAGE5 = document.page5.document;
var PAGE6 = document.page6.document;
var PAGE7 = document.page7.document;

var BUTTONS = document.buttons.document;

// Master and Detail Grid Connection Info
var MASTER_SERVER_LIST = PAGE1.server_list;
var MASTER_CONNECTION_LIST = PAGE1.connection_list;
var DETAIL_CONNECTION_LIST = PAGE4.connection_list;
var MASTER_TABLE_LIST = PAGE1.table_list;
var DETAIL_TABLE_LIST = PAGE4.table_list;
var MASTER_DATABASE_LIST = PAGE1.database_list;
var DETAIL_DATABASE_LIST = PAGE4.database_list;
var MASTER_KEY_LIST = PAGE1.key_list;
var DETAIL_KEY_LIST = PAGE4.key_list;

var MASTER_CONNECTIONERROR_DIV = PAGE1.connectionerror_div;
var MASTER_TABLEERROR_DIV = PAGE1.tableerror_div;
var MASTER_KEYERROR_DIV = PAGE1.keyerror_div;
var DETAIL_CONNECTIONERROR_DIV = PAGE4.connectionerror_div;
var DETAIL_TABLEERROR_DIV = PAGE4.tableerror_div;
var DETAIL_KEYERROR_DIV = PAGE4.keyerror_div;

// Master Grid Options

var MASTER_COLUMNS_TREE = PAGE2.columns_tree;
var MASTER_LABEL_INPUT = PAGE2.label_input;
var MASTER_COLUMNTYPE_LIST = PAGE2.columntype_list;
var MASTER_WIDTH_INPUT = PAGE2.width_input;
var MASTER_OPTIONS_DIV = PAGE2.options_div;
var MASTER_TOGGLE_BUTTON = PAGE2.toggle_button;

var MASTER_ADD_BUTTON = PAGE2.add_button;
var MASTER_REMOVE_BUTTON = PAGE2.remove_button;
var MASTER_UP_BUTTON = PAGE2.up_button;
var MASTER_DOWN_BUTTON = PAGE2.down_button;

var MASTER_COLUMNSERROR_DIV = PAGE2.columnserror_div;

var MASTER_SORTCOLUMN_LIST = PAGE3.sortcolumn_list;
var MASTER_SORTDIRECTION_LIST = PAGE3.sortdirection_list;
var MASTER_ID_INPUT = PAGE3.id_input;
var MASTER_SAVE_CHECK = PAGE3.save_check;
var MASTER_MODE_LIST = PAGE3.mode_list;
var MASTER_GRIDWIDTH_INPUT = PAGE3.width_input;
var MASTER_HEIGHT_INPUT = PAGE3.height_input;
var MASTER_GRIDOPTIONS_DIV = PAGE3.gridoptions_div;
var MASTER_GRIDTOGGLE_BUTTON = PAGE3.gridtoggle_button;

var MASTER_INVALID_DIV = PAGE3.invalid_div;
var MASTER_HEIGHTERROR_DIV = PAGE3.heighterror_div;
var MASTER_WIDTHERROR_DIV = PAGE3.widtherror_div;

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

var MASTER_DATA_LIST = PAGE7.master_cols;
var DETAIL_DATA_LIST = PAGE7.detail_cols;
var MD_TREE = PAGE7.master_detail_tree;
var ADDLINK_BUTTON = PAGE7.addlink_button;
var REMOVELINK_BUTTON = PAGE7.removelink_button;
var LINKERROR_DIV = PAGE7.linkerror_div;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

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
var mastersavehandler = "";
var detailgethandler = "";
var detailsavehandler = "";

var masterColumns = [];
var detailColumns = [];
var masterDetailLinks = new Array();
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
	return "575,600";
}

function init()
{
	nitobi.util.getAssetSourceDir();
	document.page1.visibility = "visible";
	document.buttons.visibility = "visible";
	
	setServerModelList();
	populateMasterConnectionList();
	populateDetailConnectionList();
	populateMasterTableList();
	populateDetailTableList();
	populateMasterDatabaseList();
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
	nitobi.util.chooseSelectOption(serverModelName.toLowerCase(), MASTER_SERVER_LIST);
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
	connection_list.selectedIndex = MASTER_CONNECTION_LIST.selectedIndex
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
	//var serverModel = this.getServerModelName()
	var serverModel = nitobi.util.getSelectedOption(MASTER_SERVER_LIST);
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = 0;
	validateMasterConnectionInfo();
}

function populateDetailDatabaseList()
{
	var list = DETAIL_DATABASE_LIST;
	//var serverModel = this.getServerModelName()
	var serverModel = nitobi.util.getSelectedOption(MASTER_SERVER_LIST);
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = MASTER_DATABASE_LIST.selectedIndex;
	validateDetailConnectionInfo();
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
			if (list.getAttribute("class").indexOf("masterColumnsList") != -1)
			{
				list.innerHTML = columnMarkup;
				list.selectedIndex = 0;
			}
		}
		
		//populateTreeFromString(columns);
		//populateColumnDetailPanel();
		clearMasterColumnsTree();
		for (var i = 0; i < columns.length; i++)
		{
			var column = columns[i];
			MASTER_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column + "|" + column + "|textcolumn|100\"></mm:treenode>";
			
			masterColumns.push(column);
			//currentColumns.push(colObj.name);
		}
		var nodes = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
		if (nodes.length > 0)
		{
			nodes[0].setAttribute("selected", "true");
		}
		
		populateMasterColumnDetailPanel();
		validateMasterConnectionInfo();
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
		
		MASTER_COLUMNS_TREE.innerHTML += "<mm:treenode value=\"" + column.name + "|" + column.label + "|textcolumn|100\"></mm:treenode>";
		// for each node we add, we need to also add a columnObj to the node itself
		var colObj = new nitobi.dw.GridColumn(column, column, "textcolumn", "100");
		MASTER_COLUMNS_TREE.childNodes[MASTER_COLUMNS_TREE.childNodes.length - 1].colObj = column;
		
		//allColumns.push(colObj.name);
		//currentColumns.push(colObj.name);
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

function populateMasterColumnDetailPanel()
{
	clearMasterOptions();
	var tree = MASTER_COLUMNS_TREE;
	var treeNodes = tree.getElementsByTagName("mm:treenode");
	var selNode = tree.selectedNodes[0];
	//var colObj = selNode.colObj;

	var values = selNode.value.split("|");
	MASTER_LABEL_INPUT.value = values[1];
	nitobi.util.chooseSelectOption(values[2], MASTER_COLUMNTYPE_LIST);
	MASTER_WIDTH_INPUT.value = values[3];
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
	DETAIL_LABEL_INPUT.value = values[1];
	nitobi.util.chooseSelectOption(values[2], DETAIL_COLUMNTYPE_LIST);
	DETAIL_WIDTH_INPUT.value = values[3];
	configureDetailControls();
}

function doNext()
{
	if (currentPage < totalPages)
	{
		// Master Grid Definition
		if(currentPage == 1)
		{
			if (validateMasterConnectionInfo())
			{
				hidePage(currentPage);
				currentPage++;
				showPage(currentPage);
			}
		}
		else if(currentPage == 2)
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
				if (validateMasterGridProperties())
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
			createMasterHandler();
			createDetailHandler();
			
			if (MASTER_SAVE_CHECK.checked == true)
			{
				createMasterSaveHandler();
			}
			
			if (DETAIL_SAVE_CHECK.checked == true)
			{
				createDetailSaveHandler();
			}
			insertDeclarations();
			
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

function createMasterSaveHandler()
{
	var wizard = nitobi.dw.MDSaveWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(MASTER_SERVER_LIST);	
	var tableName = nitobi.util.getSelectedOption(MASTER_TABLE_LIST);
	var id = MASTER_ID_INPUT.value;
	var destFile = wizard.copyHandlerFile(serverModelName, tableName, id);	
	var file = wizard.createMasterHandler(destFile);
	
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	mastersavehandler = destFile.substr(root.length);
}

function createDetailSaveHandler()
{
	var wizard = nitobi.dw.MDSaveWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(MASTER_SERVER_LIST);
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var id = DETAIL_ID_INPUT.value;
	var destFile = wizard.copyHandlerFile(serverModelName, tableName, id);

	var file = wizard.createDetailHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	detailsavehandler = destFile.substr(root.length);
}

function createMasterHandler()
{
	var wizard = nitobi.dw.MasterDetailWizard.getInstance();	
	var serverModelName = nitobi.util.getSelectedOption(MASTER_SERVER_LIST);
	var tableName = nitobi.util.getSelectedOption(MASTER_TABLE_LIST);
	var id = MASTER_ID_INPUT.value;
	var sourceFile = nitobi.dw.MasterDetailWizard.getMasterSourceFile(serverModelName);	
	var destFile = nitobi.dw.MasterDetailWizard.getMasterDestFile(serverModelName, tableName, id);
	DWfile.copy(sourceFile, destFile);
	var file = wizard.createMasterHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	mastergethandler = destFile.substr(root.length);
	
	nitobi.dw.MasterDetailWizard.copyXmlConverter(serverModelName);
}

function createDetailHandler()
{
	var wizard = nitobi.dw.MasterDetailWizard.getInstance();
	var serverModelName = nitobi.util.getSelectedOption(MASTER_SERVER_LIST);
	var tableName = nitobi.util.getSelectedOption(DETAIL_TABLE_LIST);
	var id = DETAIL_ID_INPUT.value;
	var sourceFile = nitobi.dw.MasterDetailWizard.getDetailSourceFile(serverModelName);
	var destFile = nitobi.dw.MasterDetailWizard.getDetailDestFile(serverModelName, tableName, id);
	DWfile.copy(sourceFile, destFile);
	var file = wizard.createDetailHandler(destFile);
	DWfile.write(destFile, file);
	var root = dw.getSiteRoot();
	detailgethandler = destFile.substr(root.length);
	
}

function insertDeclarations()
{
	var dom = dw.getDocumentDOM();
	dom.synchronizeDocument();
	var declarations = getMasterDeclaration() + ' ' + getDetailDeclaration();
	dom.insertHTML(declarations);
	var master_id = MASTER_ID_INPUT.value;
	var detail_id = DETAIL_ID_INPUT.value;
	var master_code = nitobi.util.getComponentInitCode(master_id);
	var detail_code = nitobi.util.getComponentInitCode(detail_id);
	var code = master_code + '\n' + detail_code;
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
		var assetList = nitobi.util.getAssetList("grid");
		dom.copyAssets(assetList);
		dom.addJavaScript(code, true);
	}
	else
	{
		nitobi.util.copyAssets("grid");
		// If we are inserting into a template, we need to ensure the pathing to the Nitobi assets are correct.
		if (dom.getIsTemplateDocument())
		{
			var cssLink = "<link href=\"../Nitobi/Assets/style/nitobi.grid.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"../Nitobi/Assets/script/nitobi.grid.js\"></script>";
		}
		else
		{
			var cssLink = "<link href=\"" + pathToRoot + "Nitobi/Assets/style/nitobi.grid.css\" type=\"text/css\" rel=\"stylesheet\"></link>";
			var toolkitSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.toolkit.js\"></script>";
			var componentSrc = "<script type=\"text/javascript\" src=\"" + pathToRoot + "Nitobi/Assets/script/nitobi.grid.js\"></script>";
		}
		
		// If we are inserting into a document that is based on a template, we need to find an editable region in
		// the head of the document to insert 
		if (dom.getSelectedEditableRegion() == -1)
		{
			var headElement = dom.getElementsByTagName("head");
			if (headElement.length > 0)
			{
				headElement = headElement[0];
				if (!(/nitobi.grid.css/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = headElement.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.toolkit.js/.test(headElement.innerHTML)))
				{
					headElement.innerHTML = toolkitSrc + "\n" + headElement.innerHTML;
				}
				if (!(/nitobi.grid.js/.test(headElement.innerHTML)))
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
				if (!(/nitobi.grid.css/.test(headElement.innerHTML)))
				{
					headRegion.innerHTML = headRegion.innerHTML + cssLink + "\n";
				}
				if (!(/nitobi.grid.js/.test(headElement.innerHTML)))
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
	var mode = nitobi.util.getSelectedOption(MASTER_MODE_LIST);
	var width = MASTER_GRIDWIDTH_INPUT.value;
	var height = MASTER_HEIGHT_INPUT.value;
	
	var pathToRoot = nitobi.util.getPathToRoot();
	
	/* This is temporary, delete when getting the gethandler to work  
	mastergethandler = "masterGet.php";
	mastersavehandler = "masterSave.php";
	*/
	
	var declaration = "<ntb:grid ";		
	declaration += "id=\"" + id + "\" ";
	declaration += "mode=\"" + mode + "\" ";
	declaration += "oncellclickevent=\"getChildData" + id + DETAIL_ID_INPUT.value + "(eventArgs)\" ";
	declaration += "gethandler=\"" + pathToRoot + mastergethandler + "\" ";
	
	if (MASTER_SAVE_CHECK.checked == true)
	{	
		declaration += "savehandler=\"" + pathToRoot + mastersavehandler + "\" ";
	}
	declaration += "height=\"" + (height != ""?height:"500") + "\" ";
	declaration += "width=\"" + (width != ""?width:"500") + "\"";
	declaration += "theme=\"nitobi\" ";
	declaration += ">\n";
	declaration += "<ntb:columns>\n";
	
	var columns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
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

	glueCode += "\n function getChildData" + MASTER_ID_INPUT.value + DETAIL_ID_INPUT.value + "(eventArgs) \n";
	glueCode += " { \n ";
	glueCode += "	var grid = nitobi.getComponent('" + MASTER_ID_INPUT.value + "'); \n ";
	glueCode += "	var sampleRow = eventArgs.cell.getRow(); \n";
	glueCode += "	var dataTable = grid.getDataSource(\"_default\");\n";	
	for (var i = 0; i < pairs.length; ++i)
	{
		glueCode += "	var "+ pairs[i][0] + " = dataTable.getField(sampleRow, \"" +  pairs[i][0] + "\");\n";
	}
	glueCode += "	var detailGrid = nitobi.getComponent('" + DETAIL_ID_INPUT.value + "'); \n";
	for (var i = 0; i < pairs.length; ++i)
	{
		glueCode += " 	detailGrid.getDataSource().setGetHandlerParameter('"+  pairs[i][1] +"',"+  pairs[i][0]+ "); \n";
	}
	glueCode += "	detailGrid.dataBind();\n";
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
		NEXT_BUTTON.disabled = false;
	}
}

function doHelp()
{
	dw.browseDocument("http://nitobi.com/kb/?artid=440");
}

function showPage(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

function hidePage(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
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

function clearMasterOptions()
{
	MASTER_LABEL_INPUT.value = "";
	MASTER_COLUMNTYPE_LIST.selectedIndex = 0;
	MASTER_WIDTH_INPUT.value = "";
}

function clearDetailOptions()
{
	DETAIL_LABEL_INPUT.value = "";
	DETAIL_COLUMNTYPE_LIST.selectedIndex = 0;
	DETAIL_WIDTH_INPUT.value = "";
}

function updateMasterColumn()
{
	var selNode = MASTER_COLUMNS_TREE.selectedNodes[0];
	var colObj = selNode.colObj;

	colObj.label = MASTER_LABEL_INPUT.value;
	colObj.type = nitobi.util.getSelectedOption(MASTER_COLUMNTYPE_LIST);
 	colObj.width =  (MASTER_WIDTH_INPUT.value.indexOf("px") == -1?MASTER_WIDTH_INPUT.value:MASTER_WIDTH_INPUT.value.substr(0, MASTER_WIDTH_INPUT.value.length - 2));
	selNode.value = colObj.name + "|" + colObj.label + "|" + colObj.type + "|" + colObj.width;
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

function setMasterLabel()
{
	var selNode = MASTER_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	
	//colObj.label = LABEL_INPUT.value;
	var values = selNode.value.split("|");
	values[1] = MASTER_LABEL_INPUT.value;
	selNode.value = values.join("|");
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

function setMasterType()
{
	var selNode = MASTER_COLUMNS_TREE.selectedNodes[0];
	//var colObj = selNode.colObj;
	
	//colObj.type = nitobi.util.getSelectedOption(COLUMNTYPE_LIST);
	var values = selNode.value.split("|");
	values[2] = nitobi.util.getSelectedOption(MASTER_COLUMNTYPE_LIST);
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

function setMasterWidth()
{
	var selNode = MASTER_COLUMNS_TREE.selectedNodes[0];
	var colObj = selNode.colObj;
	
	//colObj.width =  (WIDTH_INPUT.value.indexOf("px") == -1?WIDTH_INPUT.value:WIDTH_INPUT.value.substr(0, WIDTH_INPUT.value.length - 2));
	var values = selNode.value.split("|");
	values[3] = (MASTER_WIDTH_INPUT.value.indexOf("px") == -1?MASTER_WIDTH_INPUT.value:MASTER_WIDTH_INPUT.value.substr(0, MASTER_WIDTH_INPUT.value.length - 2));
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

function showMasterConnectionManager()
{
	var wizard = nitobi.dw.MasterDetailWizard.getInstance();
	MMDB.showConnectionMgrDialog();
	//clear();
	populateMasterConnectionList();
	populateMasterTableList();
}

function showDetailConnectionManager()
{
	var wizard = nitobi.dw.MasterDetailWizard.getInstance();
	MMDB.showConnectionMgrDialog();
	//clear();
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
		tree.innerHTML += "<mm:treenode value=\"" + selected + "|" + selected + "|textcolumn|100\" selected></mm:treenode>";
		populateMasterColumnDetailPanel();
		configureMasterControls();
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
		tree.innerHTML += "<mm:treenode value=\"" + selected + "|" + selected + "|textcolumn|100\" selected></mm:treenode>";
		populateDetailColumnDetailPanel();
		configureDetailControls();
		validateDetailColumns();
	}
}


function removeMasterColumn()
{
	var tree = MASTER_COLUMNS_TREE;
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

function validateMasterGridProperties()
{
	var isValid = validateMasterId();
	isValid = validateMasterWidth() && isValid;
	isValid = validateMasterHeight() && isValid;
	return isValid;
}

function validateDetailGridProperties()
{
	var isValid = validateDetailId();
	isValid = validateDetailWidth() && isValid;
	isValid = validateDetailHeight() && isValid;
	return isValid;
}


function validateMasterId()
{
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
			// If we get out here, the id is ok, so we renable the button and hide the warning
			MASTER_INVALID_DIV.setAttribute("class", "hiddenWarning");
			return true;
		}
	}
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
			if (id == MASTER_ID_INPUT.value)
			{
				DETAIL_INVALID_DIV.setAttribute("class", "visibleWarning");
				DETAIL_INVALID_DIV.innerHTML = "This id must not match the Master ID.";
				return false;
			}
			// If we get out here, the id is ok, so we renable the button and hide the warning
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

function validateMasterHeight()
{
	var height = MASTER_HEIGHT_INPUT.value;
	if (isNaN(height))
	{
		MASTER_HEIGHTERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		MASTER_HEIGHTERROR_DIV.setAttribute("class", "hiddenWarning");
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


function validateMasterWidth()
{
	var width = MASTER_GRIDWIDTH_INPUT.value;
	if (isNaN(width))
	{
		MASTER_WIDTHERROR_DIV.setAttribute("class", "visibleWarning");
		return false;
	}
	else
	{
		MASTER_WIDTHERROR_DIV.setAttribute("class", "hiddenWarning");
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


function populateDataColumnLists()
{
	var connName = nitobi.util.getSelectedOption(MASTER_CONNECTION_LIST);
	var tableName = nitobi.util.getSelectedOption(MASTER_TABLE_LIST);

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
	
	MASTER_DATA_LIST.innerHTML = columnMarkup;
	DETAIL_DATA_LIST.innerHTML = detailColumnMarkup;
}

function addGridLink()
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
		MD_TREE.innerHTML += "<mm:treenode value=\"" +  selectedMaster + "|" + selectedDetail + "\" selected></mm:treenode>";
	}
	else
	{
		alert('Please select columns from both grids');
	}
	validateLinks();
	configureMdTreeControls();
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
