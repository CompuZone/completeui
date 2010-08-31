if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.ComboWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 2;
}

nitobi.dw.ComboWizard.instance = null;

nitobi.dw.ComboWizard.getInstance = function()
{
	if (nitobi.dw.ComboWizard.instance == null)
	{
		nitobi.dw.ComboWizard.instance = new nitobi.dw.ComboWizard();
	}
	return nitobi.dw.ComboWizard.instance;
}

nitobi.dw.ComboWizard.copyXmlConverter = function(serverName)
{
	var source = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/" + nitobi.dw.Wizard.includesMap[serverName];
	if (serverName == "jsp")
	{
		var dest = dw.getSiteRoot() + "WEB-INF/lib/" + nitobi.dw.Wizard.includesMap[serverName];
		if (!DWfile.exists(dest))
		{
			alert("You will need to restart your Java Web Container");
		}
	}
	else
	{
		var dest = dw.getSiteRoot() + nitobi.dw.Wizard.includesMap[serverName];
	}
		
	DWfile.copy(source, dest);
}

nitobi.dw.ComboWizard.getSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/combo.load." + serverName;
	return sourceFile;	
}

nitobi.dw.ComboWizard.getDestFile = function(serverName)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "combo.load*." + serverName);
	destFile = dw.getSiteRoot() + "combo.load" + files.length + "." + serverName;
	return destFile;
}

nitobi.dw.ComboWizard.prototype.createHandler = function(destFile)
{
	var file = DWfile.read(destFile);

	var table = this.getTableName();
	var key = this.getKey();
	
	var columns = INCLUDE_COLUMNS_LIST;
	var serverModelName = this.getServerModelName();
	var colDef = nitobi.dw.ComboWizard.getColumnDefinition(serverModelName, columns);
	var recDef = nitobi.dw.ComboWizard.getRecordDefinition(serverModelName, columns);
	var dbName = this.getDatabaseName();
	var query = nitobi.dw.ComboWizard.getQuery(dbName, serverModelName, table);
	var connectionFile = this.getConnectionFilePath();
	var conn = MMDB.getConnection(this.getConnectionName());
	var databaseName = "$database_" + conn.name;
	var connectionString;
	/*if (conn.string != "")
	{
		connectionString = conn.string;
	}
	else
	{*/
		connectionString = "MM_" + this.getConnectionName() + "_STRING";
	//}
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + this.getConnectionName() + "_USERNAME";
		dbPassword = "MM_" + this.getConnectionName() + "_PASSWORD";
		dbDriver = "MM_" + this.getConnectionName() + "_DRIVER";
	}
	var datasource = this.getConnectionName();
	var searchColumn = this.getSearchColumnName();
	
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

nitobi.dw.ComboWizard.getColumnDefinition = function(serverModelName, columns)
{
	var colDef = "";
	var columnDefinitionTemplate = nitobi.dw.Wizard.columnDefinitionMap[serverModelName];
	for (var i = 0; i < columns.options.length; i++)
	{
		var column = columns.options[i];
		colDef += columnDefinitionTemplate.replace(/columnName/g, column.value);
	}
	return colDef;
}

nitobi.dw.ComboWizard.getRecordDefinition = function(serverModelName, columns)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	for (var i = 0; i < columns.options.length; i++)
	{
		var column = columns.options[i];
		recDef += recordTemplate.replace(/columnName/g, column.value);
	}
	return recDef;
}

nitobi.dw.ComboWizard.getQuery = function(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.comboQueryMap[serverModelName][dbName];
	return query;
}

nitobi.dw.ComboWizard.prototype.getConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.ComboWizard.prototype.populateColumnLists = function()
{
	var connName = this.getConnectionName();
	var tableName = this.getTableName();
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

nitobi.dw.ComboWizard.prototype.populateTableList = function()
{
	var connName = this.getConnectionName();
	var tables = MMDB.getTables(connName);
	var table_list = TABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
	}
}

nitobi.dw.ComboWizard.prototype.populateConnectionList = function()
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

nitobi.dw.ComboWizard.prototype.showPage = function(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

nitobi.dw.ComboWizard.prototype.hidePage = function(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

nitobi.dw.ComboWizard.prototype.getConnectionName = function()
{
	var list = CONNECTION_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		return list.options[index].value;
	}
}
	
nitobi.dw.ComboWizard.prototype.getTableName = function()
{
	var list = TABLE_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		return list.options[index].value;
	}
}

nitobi.dw.ComboWizard.prototype.getKey = function()
{
	var list = KEY_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		return list.options[index].value;
	}
}

nitobi.dw.ComboWizard.prototype.getServerModelName = function()
{
	var list = SERVER_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		var name = list.options[index].value;
		if (name == "cold fusion")
		{
			return "cfm";
		}
		else
		{
			return name;
		}
	}
}

nitobi.dw.ComboWizard.prototype.clear = function()
{
	TABLE_LIST.innerHTML = "";
	KEY_LIST.innerHTML = "";
	INCLUDE_COLUMNS_LIST.innerHTML = "";
}

nitobi.dw.ComboWizard.prototype.selectServerModel = function()
{
	var dom = dw.getDocumentDOM();
	var serverModelName = dom.serverModel.getServerName();
	var list = SERVER_LIST;
	for (var i = 0; i < list.options.length; i++)
	{
		if (list.options[i].value.toLowerCase() == serverModelName.toLowerCase())
		{
			list.selectedIndex = i;
			break;
		}
	}
}

nitobi.dw.ComboWizard.prototype.showButtons = function()
{
	document.buttons.visibility = "visible";
}

nitobi.dw.ComboWizard.prototype.getDatabaseName = function()
{
	var list = DATABASE_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		var name = list.options[index].value;
		return name;
	}
}

nitobi.dw.ComboWizard.prototype.populateDatabaseList = function()
{
	var list = DATABASE_LIST;
	var serverModel = this.getServerModelName()
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = 0;
}

nitobi.dw.ComboWizard.prototype.getSearchColumnName = function()
{
	var list = SEARCH_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		return list.options[index].value;
	}
}