var PAGE1 = document.page1.document;
var PAGE2 = document.page2.document;
var PAGE3 = document.page3.document;
var BUTTONS = document.buttons.document;

var SERVER_LIST = PAGE1.server_list;
var CONNECTION_LIST = PAGE1.connection_list;
var TABLE_LIST = PAGE1.table_list;
var DATABASE_LIST = PAGE1.database_list;

var KEY_LIST = PAGE2.key_list;
var INCLUDE_COLUMNS_LIST = PAGE2.include_columns_list;
var EXCLUDE_COLUMNS_LIST = PAGE2.exclude_columns_list;

var SORTCOLUMN_LIST = PAGE3.sortcolumn_list;
var SORTDIRECTION_LIST = PAGE3.sortdirection_list;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var pages = new Array();
pages[1] = document.page1;
pages[2] = document.page2;
pages[3] = document.page3;

function canAcceptCommand()
{
	return false;
}

function commandButtons()
{
	return new Array();
}

function init()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	document.page1.visibility = "visible";
	wizard.showButtons();
	wizard.selectServerModel();
	wizard.populateConnectionList();
	wizard.populateTableList();
	wizard.populateDatabaseList();
}

function windowDimensions()
{
	return "600,440";
}

function doNext()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	if (wizard.currentPage < wizard.totalPages)
	{
		wizard.hidePage(wizard.currentPage);
		wizard.currentPage++;
		wizard.showPage(wizard.currentPage);
		if (wizard.currentPage > 1)
		{
			PREVIOUS_BUTTON.disabled = "false";
		}
		if (wizard.currentPage == wizard.totalPages)
		{
			NEXT_BUTTON.value = "Finish";
		}
	}
	else
	{
		// copy file to site, read it to string, replace anchors with values obtained from wizard.
		var serverModelName = wizard.getServerModelName();
		var sourceFile = nitobi.dw.GridWizard.getSourceFile(serverModelName);
		var destFile = nitobi.dw.GridWizard.getDestFile(serverModelName);
		DWfile.copy(sourceFile, destFile);
		var file = wizard.createHandler(destFile);
		DWfile.write(destFile, file);
		nitobi.util.lastFileCreated = destFile;
		
		// Also need to copy appropriate xml converters
		nitobi.dw.GridWizard.copyXmlConverter(serverModelName);
		window.close();
	}
}

function doPrevious()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	if (wizard.currentPage > 1)
	{
		wizard.hidePage(wizard.currentPage);
		wizard.currentPage--;
		wizard.showPage(wizard.currentPage);
		if (wizard.currentPage == 1)
		{
			PREVIOUS_BUTTON.disabled = "true";
		}
		NEXT_BUTTON.value = "Next";
	}
}

function populateTableList()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	wizard.clear();
	wizard.populateTableList();
}

function populateColumnLists()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	wizard.populateColumnLists();
}

function showConnectionManager()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	MMDB.showConnectionMgrDialog();
	wizard.clear();
	wizard.populateConnectionList();
	wizard.populateTableList();
}

function addColumn()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	var includeList = INCLUDE_COLUMNS_LIST;
	var excludeList = EXCLUDE_COLUMNS_LIST;
	
	if (excludeList.selectedIndex > -1)
	{
		var item = excludeList.options[excludeList.selectedIndex];
		includeList.innerHTML += item.outerHTML;
		var newList = excludeList.innerHTML.replace(item.outerHTML, "");
		excludeList.innerHTML = newList;
	}
}

function removeColumn()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	var includeList = INCLUDE_COLUMNS_LIST;
	var excludeList = EXCLUDE_COLUMNS_LIST;
	
	if (includeList.selectedIndex > -1)
	{
		var item = includeList.options[includeList.selectedIndex];
		excludeList.innerHTML += item.outerHTML;
		var newList = includeList.innerHTML.replace(item.outerHTML, "");
		includeList.innerHTML = newList;
	}
}

function toggleCustomArea(databaseType)
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	var label = document.getElementById("custom_sql_label");
	var textarea = document.getElementById("custom_sql_area");
	if (databaseType == "other")
	{
		label.style.display = "block";
		textarea.style.display = "block";
	}
	else
	{
		label.style.display = "none";
		textarea.style.display = "none";
	}
}

function populateDatabaseList()
{
	var wizard = nitobi.dw.GridWizard.getInstance();
	wizard.populateDatabaseList();
}