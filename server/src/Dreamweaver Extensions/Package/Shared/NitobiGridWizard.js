if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.GridWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 3;
}

nitobi.dw.GridWizard.instance = null;

nitobi.dw.GridWizard.getInstance = function()
{
	if (nitobi.dw.GridWizard.instance == null)
	{
		nitobi.dw.GridWizard.instance = new nitobi.dw.GridWizard();
	}
	return nitobi.dw.GridWizard.instance;
}

nitobi.dw.GridWizard.copyXmlConverter = function(serverName)
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

nitobi.dw.GridWizard.getSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/grid.load." + serverName;
	return sourceFile;	
}

nitobi.dw.GridWizard.getDestFile = function(serverName)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "grid.load*." + serverName);
	destFile = dw.getSiteRoot() + "grid.load" + files.length + "." + serverName;
	return destFile;
}

nitobi.dw.GridWizard.prototype.createHandler = function(destFile)
{
	var file = DWfile.read(destFile);

	var sortColumn = this.getSortColumn();
	var sortDirection = this.getSortDirection();
	var table = this.getTableName();
	var key = this.getKey();
	
	var serverModelName = this.getServerModelName();
	var colDef = nitobi.dw.GridWizard.getColumnDefinition(serverModelName, key);
	var recDef = nitobi.dw.GridWizard.getRecordDefinition(serverModelName, key);
	var dbName = this.getDatabaseName();
	var query = nitobi.dw.GridWizard.getQuery(dbName, serverModelName, table);
	var connectionFile = this.getConnectionFilePath();
	var conn = MMDB.getConnection(this.getConnectionName());
	var databaseName = "$database_" + conn.name;
	var connectionString = "MM_" + this.getConnectionName() + "_STRING";
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
	file = file.replace(/\/\*\*\*\s*NTB_SORTCOLUMN\s*\*\*\*\//g, sortColumn);
	file = file.replace(/\/\*\*\*\s*NTB_SORTDIRECTION\s*\*\*\*\//g, sortDirection);
	file = file.replace(/\/\*\*\*\s*NTB_COLUMNDEF\s*\*\*\*\//g, colDef);
	file = file.replace(/\/\*\*\*\s*NTB_KEY\s*\*\*\*\//g, key);
	file = file.replace(/\/\*\*\*\s*NTB_DATABASE\s*\*\*\*\//g, databaseName);
	file = file.replace(/\/\*\*\*\s*NTB_RECORDDEF\s*\*\*\*\//g, recDef);
	file = file.replace(/\/\*\*\*\s*NTB_QUERY\s*\*\*\*\//g, query);
	file = file.replace(/\/\*\*\*\s*NTB_TABLE\s*\*\*\*\//g, table);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_FILE\s*\*\*\*\//g, connectionFile);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, datasource);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	return file;
}

nitobi.dw.GridWizard.getColumnDefinition = function(serverModelName, key)
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
		/*if (columns[i].colObj)
		{
			var colObj = columns[i].colObj;
			if (!(serverModelName == "jsp" && colObj.name == key))
				colDef += columnDefinitionTemplate.replace(/columnName/g, colObj.name);
		}*/
	}
	/*for (var i = 0; i < columns.options.length; i++)
	{
		var column = columns.options[i];
		// We check for JSP because some JDBC drivers don't allow retrieval of fields more than once and we
		// already get the key to create the Record object.
		if (!(serverModelName == "jsp" && column.value == key))
			colDef += columnDefinitionTemplate.replace(/columnName/g, column.value);
	}*/
	return colDef;
}

nitobi.dw.GridWizard.getRecordDefinition = function(serverModelName, key)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		if (!(serverModelName == "jsp" && values[0] == key))
		{
			recDef += recordTemplate.replace(/columnName/g, values[0]);
		}
		/*var colObj = columns[i].colObj;
		if (colObj)
		{
			if (!(serverModelName == "jsp" && colObj.name == key))
			{
				recDef += recordTemplate.replace(/columnName/g, colObj.name);
			}
		}*/
	}
	/*for (var i = 0; i < columns.options.length; i++)
	{
		var column = columns.options[i];
		// We check for JSP because some JDBC drivers don't allow retrieval of fields more than once and we
		// already get the key to create the Record object.
		if (!(serverModelName == "jsp" && column.value == key))
			recDef += recordTemplate.replace(/columnName/g, column.value);
	}*/
	return recDef;
}

nitobi.dw.GridWizard.getQuery = function(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.gridQueryMap[serverModelName][dbName];
	return query;
}

nitobi.dw.GridWizard.prototype.getConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.GridWizard.prototype.populateColumnLists = function()
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

nitobi.dw.GridWizard.prototype.populateTableList = function()
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

nitobi.dw.GridWizard.prototype.populateConnectionList = function()
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

nitobi.dw.GridWizard.prototype.getSortColumn = function()
{
	var list = SORTCOLUMN_LIST;
	var index = list.selectedIndex;
	if (index == -1)
	{
		return "";
	}
	else
	{
		return list.options[index].value;
	}}

nitobi.dw.GridWizard.prototype.getSortDirection = function()
{
	var list = SORTDIRECTION_LIST;
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

nitobi.dw.GridWizard.prototype.showPage = function(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

nitobi.dw.GridWizard.prototype.hidePage = function(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

nitobi.dw.GridWizard.prototype.getConnectionName = function()
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
	
nitobi.dw.GridWizard.prototype.getTableName = function()
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

nitobi.dw.GridWizard.prototype.getKey = function()
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

nitobi.dw.GridWizard.prototype.getServerModelName = function()
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

nitobi.dw.GridWizard.prototype.clear = function()
{
	TABLE_LIST.innerHTML = "";
	KEY_LIST.innerHTML = "";
	INCLUDE_COLUMNS_LIST.innerHTML = "";
}

nitobi.dw.GridWizard.prototype.selectServerModel = function()
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

nitobi.dw.GridWizard.prototype.showButtons = function()
{
	document.buttons.visibility = "visible";
}

nitobi.dw.GridWizard.prototype.getDatabaseName = function()
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

nitobi.dw.GridWizard.prototype.populateDatabaseList = function()
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