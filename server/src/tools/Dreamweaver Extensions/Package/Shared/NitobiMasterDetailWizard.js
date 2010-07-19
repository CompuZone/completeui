if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.MasterDetailWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 7;
}

nitobi.dw.MasterDetailWizard.instance = null;

nitobi.dw.MasterDetailWizard.getInstance = function()
{
	if (nitobi.dw.MasterDetailWizard.instance == null)
	{
		nitobi.dw.MasterDetailWizard.instance = new nitobi.dw.MasterDetailWizard();
	}
	return nitobi.dw.MasterDetailWizard.instance;
}

nitobi.dw.MasterDetailWizard.copyXmlConverter = function(serverName)
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

nitobi.dw.MasterDetailWizard.getMasterSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/grid.load." + serverName;
	return sourceFile;	
}

nitobi.dw.MasterDetailWizard.getDetailSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/detailgrid.load." + serverName;
	return sourceFile;	
}

nitobi.dw.MasterDetailWizard.getMasterDestFile = function(serverName, tableName, id)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "grid.load*." + serverName);
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".load." + serverName;
	return destFile;
}

nitobi.dw.MasterDetailWizard.getDetailDestFile = function(serverName, tableName, id)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "detailgrid.load*." + serverName);
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".load." + serverName;
	return destFile;
}

nitobi.dw.MasterDetailWizard.prototype.createMasterHandler = function(destFile)
{
	var file = DWfile.read(destFile);

	var sortColumn = this.getMasterSortColumn();
	var sortDirection = this.getMasterSortDirection();
	var table = this.getMasterTableName();
	var key = this.getMasterKey();
	
	var serverModelName = this.getServerModelName();
	var colDef = nitobi.dw.MasterDetailWizard.getMasterColumnDefinition(serverModelName, key);
	var recDef = nitobi.dw.MasterDetailWizard.getMasterRecordDefinition(serverModelName, key);
	var dbName = this.getMasterDatabaseName();
	var query = nitobi.dw.MasterDetailWizard.getMasterQuery(dbName, serverModelName, table);
	var connectionFile = this.getMasterConnectionFilePath();
	var conn = MMDB.getConnection(this.getMasterConnectionName());
	var databaseName = "$database_" + conn.name;
	var connectionString = "MM_" + this.getMasterConnectionName() + "_STRING";
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + this.getMasterConnectionName() + "_USERNAME";
		dbPassword = "MM_" + this.getMasterConnectionName() + "_PASSWORD";
		dbDriver = "MM_" + this.getMasterConnectionName() + "_DRIVER";
	}
	var datasource = this.getMasterConnectionName();
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

nitobi.dw.MasterDetailWizard.prototype.createDetailHandler = function(destFile)
{
	var file = DWfile.read(destFile);
	var sortColumn = this.getDetailSortColumn();
	var sortDirection = this.getDetailSortDirection();
	var table = this.getDetailTableName();
	var key = this.getDetailKey();
	
	var serverModelName = this.getServerModelName();
	var serverGlue = this.getServerCode(serverModelName);
	
	var colDef = nitobi.dw.MasterDetailWizard.getDetailColumnDefinition(serverModelName, key);
	var recDef = nitobi.dw.MasterDetailWizard.getDetailRecordDefinition(serverModelName, key);
	var dbName = this.getDetailDatabaseName();
	var query = nitobi.dw.MasterDetailWizard.getDetailQuery(dbName, serverModelName, table);
	var connectionFile = this.getDetailConnectionFilePath();
	var conn = MMDB.getConnection(this.getDetailConnectionName());
	var databaseName = "$database_" + conn.name;
	var connectionString = "MM_" + this.getDetailConnectionName() + "_STRING";
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + this.getDetailConnectionName() + "_USERNAME";
		dbPassword = "MM_" + this.getDetailConnectionName() + "_PASSWORD";
		dbDriver = "MM_" + this.getDetailConnectionName() + "_DRIVER";
	}
	var datasource = this.getDetailConnectionName();
	file = file.replace(/\/\*\*\*\s*NTB_SORTCOLUMN\s*\*\*\*\//g, sortColumn);
	file = file.replace(/\/\*\*\*\s*NTB_SORTDIRECTION\s*\*\*\*\//g, sortDirection);
	file = file.replace(/\/\*\*\*\s*NTB_COLUMNDEF\s*\*\*\*\//g, colDef);
	file = file.replace(/\/\*\*\*\s*NTB_KEY\s*\*\*\*\//g, key);
	file = file.replace(/\/\*\*\*\s*NTB_VAR_GETTER\s*\*\*\*\//g, serverGlue);
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

nitobi.dw.MasterDetailWizard.getMasterColumnDefinition = function(serverModelName, key)
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

nitobi.dw.MasterDetailWizard.getDetailColumnDefinition = function(serverModelName, key)
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

nitobi.dw.MasterDetailWizard.getMasterRecordDefinition = function(serverModelName, key)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
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

nitobi.dw.MasterDetailWizard.getDetailRecordDefinition = function(serverModelName, key)
{
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
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

nitobi.dw.MasterDetailWizard.getMasterQuery = function(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.gridQueryMap[serverModelName][dbName];
	return query;
}

/* This is different, because we need to specify what we are looking for in the query */
nitobi.dw.MasterDetailWizard.getDetailQuery = function(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.detailgridQueryMap[serverModelName][dbName];
	return query;
}

nitobi.dw.MasterDetailWizard.prototype.getMasterConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getMasterConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.MasterDetailWizard.prototype.getDetailConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getDetailConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.MasterDetailWizard.prototype.populateMasterColumnLists = function()
{
	var connName = this.getMasterConnectionName();
	var tableName = this.getMasterTableName();
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

nitobi.dw.MasterDetailWizard.prototype.populateDetailColumnLists = function()
{
	var connName = this.getDetailConnectionName();
	var tableName = this.getDetailTableName();
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

nitobi.dw.MasterDetailWizard.prototype.populateMasterTableList = function()
{
	var connName = this.getConnectionName();
	var tables = MMDB.getTables(connName);
	var table_list = MASTER_TABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
	}
}

nitobi.dw.MasterDetailWizard.prototype.populateDetailTableList = function()
{
	var connName = this.getConnectionName();
	var tables = MMDB.getTables(connName);
	var table_list = DETAIL_TABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
	}
}

nitobi.dw.MasterDetailWizard.prototype.populateMasterConnectionList = function()
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

nitobi.dw.MasterDetailWizard.prototype.populateDetailConnectionList = function()
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

nitobi.dw.MasterDetailWizard.prototype.getMasterSortColumn = function()
{
	var list = MASTER_SORTCOLUMN_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getDetailSortColumn = function()
{
	var list = DETAIL_SORTCOLUMN_LIST;
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


nitobi.dw.MasterDetailWizard.prototype.getMasterSortDirection = function()
{
	var list = MASTER_SORTDIRECTION_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getDetailSortDirection = function()
{
	var list = DETAIL_SORTDIRECTION_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.showPage = function(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

nitobi.dw.MasterDetailWizard.prototype.hidePage = function(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

nitobi.dw.MasterDetailWizard.prototype.getMasterConnectionName = function()
{
	var list = MASTER_CONNECTION_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getDetailConnectionName = function()
{
	var list = DETAIL_CONNECTION_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getMasterTableName = function()
{
	var list = MASTER_TABLE_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getDetailTableName = function()
{
	var list = DETAIL_TABLE_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getMasterKey = function()
{
	var list = MASTER_KEY_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getDetailKey = function()
{
	var list = DETAIL_KEY_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getServerModelName = function()
{
	var list = MASTER_SERVER_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.clear = function()
{
	MASTER_TABLE_LIST.innerHTML = "";
	MASTER_KEY_LIST.innerHTML = "";
	INCLUDE_COLUMNS_LIST.innerHTML = "";
	DETAIL_TABLE_LIST.innerHTML = "";
	DETAIL_KEY_LIST.innerHTML = "";
}

nitobi.dw.MasterDetailWizard.prototype.selectServerModel = function()
{
	var dom = dw.getDocumentDOM();
	var serverModelName = dom.serverModel.getServerName();
	var list = MASTER_SERVER_LIST;
	for (var i = 0; i < list.options.length; i++)
	{
		if (list.options[i].value.toLowerCase() == serverModelName.toLowerCase())
		{
			list.selectedIndex = i;
			break;
		}
	}
}

nitobi.dw.MasterDetailWizard.prototype.showButtons = function()
{
	document.buttons.visibility = "visible";
}

nitobi.dw.MasterDetailWizard.prototype.getMasterDatabaseName = function()
{
	var list = MASTER_DATABASE_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.getDetailDatabaseName = function()
{
	var list = DETAIL_DATABASE_LIST;
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

nitobi.dw.MasterDetailWizard.prototype.populateMasterDatabaseList = function()
{
	var list = MASTER_DATABASE_LIST;
	var serverModel = this.getServerModelName()
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = 0;
}

nitobi.dw.MasterDetailWizard.prototype.populateDetailDatabaseList = function()
{
	var list = DETAIL_DATABASE_LIST;
	var serverModel = this.getServerModelName()
	if (serverModel != "")
	{
		var options = nitobi.dw.Wizard.databaseMap[serverModel];
		list.innerHTML = options;
	}
	list.selectedIndex = 0;
}

nitobi.dw.MasterDetailWizard.prototype.getServerCode = function(serverModelName)
{
	
	var selected_columns = MD_TREE.getElementsByTagName("mm:treenode");
	var glueCode = "";
	for (var i = 0; i < selected_columns.length; i++)
		{			
			var values = selected_columns[i].value.split("|");
			if (i > 0)
			{
				glueCode += this.makeGetGlue(serverModelName, values);
			}
			else
			{
				glueCode += this.makeGetStarter(serverModelName, values);
			}	
		}
	return glueCode;
}

nitobi.dw.MasterDetailWizard.prototype.makeGetStarter = function(model, data)
{
	var gluecode = "";
	if(model == "php")
	{
			gluecode += "$whereClause='';\n";
			gluecode += "if (isset($_GET['"+ data[1] +"'])) {\n";
			gluecode += "$whereClause=\" WHERE "+ data[1] +" LIKE '\" . $_GET[\""+ data[1] +"\"] . \"' \";\n";
			gluecode += "}\n\n";
	}
	else if(model == "asp")
	{
			gluecode += "dim WhereClause\n";
			gluecode += "WhereClause = \"\"\n";
			gluecode += "if len(request.querystring(\""+ data[1] +"\")) > 0 then \n ";
			gluecode += "WhereClause = \" WHERE " + data[1] + " LIKE '\" & request.querystring(\""+ data[1] + "\") & \"' \" \n";
			gluecode += "end if \n ";
	}
	else if(model == "jsp")
	{
		gluecode += "String whereClause= \"\";\n";
		gluecode += "String " + data[1] + "qry=request.getParameter(\"" + data[1] + "\");\n";	
		gluecode += "if (("+ data[1] + "qry==null) || (0 == " + data[1] + "qry.length()))\n";
		gluecode += "{\n";
		gluecode += "\n";
		gluecode += "}\n	else\n";
		gluecode += "{\n";
		gluecode += "	whereClause=\" WHERE " + data[1] + " LIKE '\"+" + data[1] + "qry+\"' \";\n";
		gluecode += "}\n;";
	}
	else if(model == "cfm")
	{
		gluecode += "<cfif parameterexists(" + data[1] + ") is \"YES\">\n"
		gluecode += "<cfset whereClause = \"WHERE "+ data[1] + " LIKE '\#" + data[1] + "#'\"> \n";
		gluecode += "<cfelse>\n";
		gluecode += "<cfset WhereClause = \"\" >\n";
		gluecode += "</cfif>\n";
	}
	return gluecode;
}

nitobi.dw.MasterDetailWizard.prototype.makeGetGlue = function(model, data)
{
	var gluecode = "";
	if(model == "php")
	{
			gluecode += "if (isset($_GET['"+ data[1] +"'])) {\n";
			gluecode += "$whereClause +=\" AND "+ data[1] +" LIKE '\".$_GET[\""+ data[1] +"\"].\"' \" ;\n";
			gluecode += "}\n\n";
	}
	else if(model == "asp") 
	{
			gluecode += "if len(request.querystring(\""+ data[1] +"\")) > 0 then \n ";
			gluecode += "WhereClause .= \" WHERE " + data[1] + " LIKE '\" & request.querystring(\""+ data[1] + "\") & \"' \" \n";
			gluecode += "end if \n ";
	}
	else if(model == "jsp")
	{
		gluecode += "String " + data[1] + "qry=request.getParameter(\"" + data[1] + "\");\n";	
		gluecode += "if (("+ data[1] + "qry==null) || (0 == " + data[1] + "qry.length()))\n";
		gluecode += "{\n";
		gluecode += "\n";
		gluecode += "}\nelse\n";
		gluecode += "{\n";
		gluecode += "	whereClause +=\" AND " + data[1] + " LIKE '\"+" + data[1] + "qry+\"' \";\n";
		gluecode += "}\n;";
	}
	else if(model == "cfm")
	{
		gluecode += "<cfif parameterexists(" + data[1] + ") is \"YES\">\n";
		gluecode += "<cfset WhereClause = \"#whereClause#  AND " + data[1] + "LIKE '\#" + data[1] + "#'\">\n";
		gluecode += "</cfif>\n";		
	}
	return gluecode;
}

