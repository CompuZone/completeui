var PAGE1 = document.page1.document;
var BUTTONS = document.buttons.document;

var SERVER_LIST = PAGE1.server_list;
var CONNECTION_LIST = PAGE1.connection_list;
var TABLE_LIST = PAGE1.table_list;
var KEY_LIST = PAGE1.key_list;

var CANCEL_BUTTON = BUTTONS.cancel_button;
var PREVIOUS_BUTTON = BUTTONS.previous_button;
var NEXT_BUTTON = BUTTONS.next_button;

var pages = new Array();
pages[1] = document.page1;

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
	var wizard = nitobi.dw.SaveWizard.getInstance();
	wizard.showPage(1);
	wizard.showButtons();
	wizard.selectServerModel();
	wizard.populateConnectionList();
	wizard.populateTableList();
}

function windowDimensions()
{
	return "600,440";
}

function populateTableList()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
	wizard.clear();
	wizard.populateTableList();
}

function populateColumnLists()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
	wizard.populateColumnLists();
}

function showConnectionManager()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
	MMDB.showConnectionMgrDialog();
	wizard.clear();
	wizard.populateConnectionList();
	wizard.populateTableList();
}

function doNext()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
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
		var wizard = nitobi.dw.SaveWizard.getInstance();
		// copy file to site, read it to string, replace anchors with values obtained from wizard.
		var serverModelName = wizard.getServerModelName();
		var destFile = wizard.copyHandlerFile(serverModelName);
		//var sourceFile = nitobi.dw.Wizard.getSourceFile(serverModelName);
		//var destFile = nitobi.dw.Wizard.getDestFile(serverModelName);
		//DWfile.copy(sourceFile, destFile);
		var file = wizard.createHandler(destFile);
		DWfile.write(destFile, file);
		nitobi.util.lastSaveFileCreated = destFile;
		
		// Also need to copy appropriate xml converters
		//nitobi.dw.Wizard.copyXmlConverter(serverModelName);
		window.close();
	}
}

function doPrevious()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
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

/*function addColumn()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
	var includeList = wizard.getColumnsList();
	var excludeList = document.getElementById("exclude_columns_list");
	
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
	var wizard = nitobi.dw.SaveWizard.getInstance();
	var includeList = wizard.getColumnsList();
	var excludeList = document.getElementById("exclude_columns_list");
	
	if (includeList.selectedIndex > -1)
	{
		var item = includeList.options[includeList.selectedIndex];
		excludeList.innerHTML += item.outerHTML;
		var newList = includeList.innerHTML.replace(item.outerHTML, "");
		includeList.innerHTML = newList;
	}
}

function updateColumnLists()
{
	var wizard = nitobi.dw.SaveWizard.getInstance();
	var gethandler = dw.getSiteRoot() + document.getElementById("gethandler").value;

}*/