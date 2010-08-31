if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.MDSaveWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 1;
}

nitobi.dw.MDSaveWizard.instance = null;

nitobi.dw.MDSaveWizard.getInstance = function()
{
	if (nitobi.dw.MDSaveWizard.instance == null)
	{
		nitobi.dw.MDSaveWizard.instance = new nitobi.dw.MDSaveWizard();
	}
	return nitobi.dw.MDSaveWizard.instance;
}

nitobi.dw.MDSaveWizard.prototype.populateMasterTableList = function()
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

nitobi.dw.MDSaveWizard.prototype.populateDetailTableList = function()
{
	var connName = this.getConnectionName();
	var tables = MMDB.getTables(connName);
	var table_list = DETAILTABLE_LIST;
	table_list.innerHTML = "";
	for (var i = 0; i < tables.length; i++)
	{
		var tableName = tables[i].table;
		var option = "<option value=\"" + tableName + "\">" + tableName + "</option>";
		table_list.innerHTML += option;
	}
}

nitobi.dw.MDSaveWizard.prototype.showPage = function(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

nitobi.dw.MDSaveWizard.prototype.hidePage = function(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

nitobi.dw.MDSaveWizard.prototype.showButtons = function()
{
	document.buttons.visibility = "visible";
}

nitobi.dw.MDSaveWizard.prototype.clear = function()
{
	TABLE_LIST.innerHTML = "";
}

nitobi.dw.MDSaveWizard.prototype.selectServerModel = function()
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

nitobi.dw.MDSaveWizard.prototype.populateMasterConnectionList = function()
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

nitobi.dw.MDSaveWizard.prototype.populateDetailConnectionList = function()
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

nitobi.dw.MDSaveWizard.prototype.populateMasterTableList = function()
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

nitobi.dw.MDSaveWizard.prototype.populateDetailTableList = function()
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

nitobi.dw.MDSaveWizard.prototype.populateMasterColumnLists = function()
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

nitobi.dw.MDSaveWizard.prototype.populateDetailColumnLists = function()
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

nitobi.dw.MDSaveWizard.prototype.getMasterConnectionName = function()
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

nitobi.dw.MDSaveWizard.prototype.getDetailConnectionName = function()
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

nitobi.dw.MDSaveWizard.prototype.getServerModelName = function()
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

nitobi.dw.MDSaveWizard.prototype.getMasterTableName = function()
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

nitobi.dw.MDSaveWizard.prototype.getDetailTableName = function()
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

nitobi.dw.MDSaveWizard.prototype.getMasterKeyName = function()
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

nitobi.dw.MDSaveWizard.prototype.getDetailKeyName = function()
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

nitobi.dw.MDSaveWizard.prototype.getColumnsNoKey = function(connection, table, key)
{
	var columns = MMDB.getColumnsOfTable(connection, table);
	var newColumns = new Array();
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		if(column != key)
		{
			newColumns.push(column);
		}
	}
	return newColumns;
}

nitobi.dw.MDSaveWizard.prototype.getMasterConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getMasterConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.MDSaveWizard.prototype.getDetailConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getDetailConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.MDSaveWizard.prototype.copyHandlerFile = function(serverName, tableName, id)
{
	var source = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/grid.save." + serverName;	
	var files = DWfile.listFolder(dw.getSiteRoot() + "grid.save*." + serverName);
	var dest = dw.getSiteRoot() + id + "_" + tableName + ".save." + serverName;

	DWfile.copy(source, dest);
	return dest;
}

nitobi.dw.MDSaveWizard.prototype.createMasterHandler = function(destFile)
{
	var file = DWfile.read(destFile);
	var serverModelName = this.getServerModelName();
	var connection = this.getMasterConnectionName();
	var table = this.getMasterTableName();
	var key = this.getMasterKeyName();
	var columns = this.getColumnsNoKey(connection, table, key);
	var updateColumns = [];
	var selectedColumns = MASTER_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < selectedColumns.length; i++)
	{
		var column = selectedColumns[i];
		var values = column.value.split("|");
		if (values[0] != key)
		{
			updateColumns.push(values[0]);
		}
	}
	var conn = MMDB.getConnection(this.getMasterConnectionName());
	var databaseName = "$database_" + conn.name;
	var connectionFile = this.getMasterConnectionFilePath();

	var insertStatement = this.createInsertStatement(table, columns);
	var updateStatement = this.createUpdateStatement(table, updateColumns, key);
	var deleteStatement = this.createDeleteStatement(table, key);

	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, connection);
	file = file.replace(/\/\*\*\*\s*NTB_INSERTSTATEMENT\s*\*\*\*\//g, insertStatement);
	file = file.replace(/\/\*\*\*\s*NTB_UPDATESTATEMENT\s*\*\*\*\//g, updateStatement);
	file = file.replace(/\/\*\*\*\s*NTB_DELETESTATEMENT\s*\*\*\*\//g, deleteStatement);
	
	// PHP Only
	file = file.replace(/\/\*\*\*\s*NTB_DATABASE\s*\*\*\*\//g, databaseName);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_FILE\s*\*\*\*\//g, connectionFile);
	
	// ASP, JSP Only
	var connectionString;
	/*if (conn.string != "")
	{
		connectionString = conn.string;
	}
	else
	{*/
		connectionString = "MM_" + this.getMasterConnectionName() + "_STRING";
	//}
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + this.getMasterConnectionName() + "_USERNAME";
		dbPassword = "MM_" + this.getMasterConnectionName() + "_PASSWORD";
		dbDriver = "MM_" + this.getMasterConnectionName() + "_DRIVER";
	}
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	return file;
}

nitobi.dw.MDSaveWizard.prototype.createDetailHandler = function(destFile)
{
	var file = DWfile.read(destFile);
	var serverModelName = this.getServerModelName();
	var connection = this.getDetailConnectionName();
	var table = this.getDetailTableName();
	var key = this.getDetailKeyName();
	var columns = this.getColumnsNoKey(connection, table, key);
	var updateColumns = [];
	var selectedColumns = DETAIL_COLUMNS_TREE.getElementsByTagName("mm:treenode");
	for (var i = 0; i < selectedColumns.length; i++)
	{
		var column = selectedColumns[i];
		var values = column.value.split("|");
		if (values[0] != key)
		{
			updateColumns.push(values[0]);
		}
	}
	var conn = MMDB.getConnection(this.getDetailConnectionName());
	
	var databaseName = "$database_" + conn.name;
	
	
	var connectionFile = this.getDetailConnectionFilePath();
	var insertStatement = this.createInsertStatement(table, columns);
	var updateStatement = this.createUpdateStatement(table, updateColumns, key);
	var deleteStatement = this.createDeleteStatement(table, key);

	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, connection);
	file = file.replace(/\/\*\*\*\s*NTB_INSERTSTATEMENT\s*\*\*\*\//g, insertStatement);
	file = file.replace(/\/\*\*\*\s*NTB_UPDATESTATEMENT\s*\*\*\*\//g, updateStatement);
	file = file.replace(/\/\*\*\*\s*NTB_DELETESTATEMENT\s*\*\*\*\//g, deleteStatement);
		
	// PHP Only
	file = file.replace(/\/\*\*\*\s*NTB_DATABASE\s*\*\*\*\//g, databaseName);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_FILE\s*\*\*\*\//g, connectionFile);
	
	// ASP, JSP Only
	var connectionString;
	/*if (conn.string != "")
	{
		connectionString = conn.string;
	}
	else
	{*/
	
	
		connectionString = "MM_" + this.getDetailConnectionName() + "_STRING";
		
	//}
	var dbUsername = "";
	var dbPassword = "";
	var dbDriver = "";
	if (serverModelName == "jsp")
	{
		dbUsername = "MM_" + this.getDetailConnectionName() + "_USERNAME";
		dbPassword = "MM_" + this.getDetailConnectionName() + "_PASSWORD";
		dbDriver = "MM_" + this.getDetailConnectionName() + "_DRIVER";
	}

	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	
	return file;
}

nitobi.dw.MDSaveWizard.prototype.createInsertStatement = function(table, columns)
{
	var serverModelName = this.getServerModelName();
	var statement;
	if (serverModelName == "cfm")
	{
		statement = this.createCFMInsertStatement(table, columns);
	}
	else if (serverModelName == "php")
	{
		statement = this.createPHPInsertStatement(table, columns);
	}
	else if (serverModelName == "jsp")
	{
		statement = this.createJSPInsertStatement(table, columns);
	}
	else
	{
		statement = this.createASPInsertStatement(table, columns);
	}
	return statement;
}

nitobi.dw.MDSaveWizard.prototype.createCFMInsertStatement = function(table, columns)
{
	var statement = new SQLStatement();
	statement.setInsertInto(table);
	statement.setColumns("(" + columns.toString() + ")");

	var values = "(";
	for (var i = 0; i < columns.length; i++)
	{
		values += "\n\t\t'#EBASaveHandler_ReturnInsertField(InsertLoop, \"" + columns[i] + "\")#'";
		if (i != columns.length - 1)
		{
			values += ",";
		}
	}
	values += ")";
	statement.setValues(values);
	return statement.getStatement();
}

nitobi.dw.MDSaveWizard.prototype.createPHPInsertStatement = function(table, columns)
{
	var statement = new SQLStatement();
	statement.setInsertInto(table);
	statement.setColumns("(" + columns.toString() + ")");
	
	var values = "(\" . ";
	for (var i = 0; i < columns.length; i++)
	{
		var value = "\n\t\t\"'\" . $saveHandler->ReturnInsertField($currentRecord, \"" + columns[i] + "\") . ";
		values += value;
		if (i != columns.length - 1)
		{
			values += "\"', \".";
		}
		else
		{
			values += "\"' \" .";
		}
	}
	values += "\"); ";
	statement.setValues(values);
	return statement.getStatement();
}

nitobi.dw.MDSaveWizard.prototype.createJSPInsertStatement = function(table, columns)
{	
	var insert = "INSERT INTO " + table + " (" + columns.toString() + ") VALUES (\"";
	for (var i = 0; i < columns.length; i++)
	{
		insert += "\n\t\t+ \"'\" + insertRecords[i].getField(\"" + columns[i] + "\").replaceAll(\"'\", \"''\") + ";
		if (i != columns.length - 1)
			insert += "\"',\"";

		else
			insert += "\"'\"";
	}
	insert += "+ \");";
	return insert;
}

nitobi.dw.MDSaveWizard.prototype.createASPInsertStatement = function(table, columns)
{
	var insert = "MyQuery = \"INSERT INTO " + table + " (" + columns.toString() + ") VALUES (\""
	for (var i = 0; i < columns.length; i++)
	{
		insert += "\n\t\tMyQuery = MyQuery & \"'\" & EBASaveHandler_ReturnInsertField(CurrentRecord,\"" + columns[i] + "\")";
		if (i != columns.length - 1)
		{
			insert += " & \"',\"";
		}
		else
		{
			insert += " & \"' \"";
		}
	}
	insert += "\n\t\tMyQuery = MyQuery & \");\"";
	return insert;
}

nitobi.dw.MDSaveWizard.prototype.createUpdateStatement = function(table, columns, key)
{
	var serverModelName = this.getServerModelName();
	if (serverModelName == "cfm")
	{
		var statement = this.createCFMUpdateStatement(table, columns, key);
	}
	else if (serverModelName == "php")
	{
		var statement = this.createPHPUpdateStatement(table, columns, key);
	}
	else if (serverModelName == "jsp")
	{
		var statement = this.createJSPUpdateStatement(table, columns, key);
	}
	else
	{
		var statement = this.createASPUpdateStatement(table, columns, key);
	}
	return statement;
}

nitobi.dw.MDSaveWizard.prototype.createCFMUpdateStatement = function(table, columns, key)
{
	var statement = new SQLStatement();
	statement.type = SQLStatement.STMT_TYPE_UPDATE;
	statement.setUpdate(table);
	for (var i = 0; i < columns.length; i++)
	{
		statement.addSet(columns[i], "'#EBASaveHandler_ReturnUpdateField(UpdateLoop, \"" + columns[i] + "\")#'");
	}
	var where = key + " = #EBASaveHandler_ReturnUpdateField(UpdateLoop, \"EBA_PK\")#";
	statement.setWhere(where);
	return statement.getStatement();
}

nitobi.dw.MDSaveWizard.prototype.createPHPUpdateStatement = function(table, columns, key)
{
	var update = "UPDATE " + table + " SET \".";
	for (var i = 0; i < columns.length; i++)
	{
		update += "\n\t\t\"" + columns[i] + " = '\" . $saveHandler->ReturnUpdateField($currentRecord, \"" + columns[i] + "\")";
		if (i != columns.length - 1)
		{
			update += " . \"', \".";
		}
		else
		{
			update += " . \"' \".";
		}
	}
	update += "\"WHERE " + key + " = '\" . $saveHandler->ReturnUpdateField($currentRecord) . \"'\" . \";";
	return update;
}

nitobi.dw.MDSaveWizard.prototype.createJSPUpdateStatement = function(table, columns, key)
{
	var update = "UPDATE " + table + " SET \"";
	for (var i = 0; i < columns.length; i++)
	{
		update += "\n\t\t+ \"" + columns[i] + " = '\" + updateRecords[i].getField(\"" + columns[i] + "\").replaceAll(\"'\", \"''\") + ";
		if (i != columns.length - 1)
			update += "\"', \"";
		else
			update += "\"' \"";
	}
	update += "\n\t\t+ \" WHERE " + key + " = \" + updateRecords[i].getID() + \";";
	return update;
}

nitobi.dw.MDSaveWizard.prototype.createASPUpdateStatement = function(table, columns, key)
{
	var update = "MyQuery = \"UPDATE " + table + " SET \"";
	for (var i = 0; i < columns.length; i++)
	{
		update += "\n\t\tMyQuery = MyQuery & \"" + columns[i] + " = '\" & EBASaveHandler_ReturnUpdateField(CurrentRecord,\"" + columns[i] + "\")";
		if (i != columns.length - 1)
		{
			update += " & \"',\"";
		}
		else
		{
			update += " & \"' \"";
		}
	}
	update += "\n\t\tMyQuery = MyQuery & \" WHERE " + key + " = \" & EBASaveHandler_ReturnUpdateField(CurrentRecord,\"PK\") & \";\"";
	return update;
}

nitobi.dw.MDSaveWizard.prototype.createDeleteStatement = function(table, key)
{
	var serverModelName = this.getServerModelName();
	if (serverModelName == "cfm")
	{
		var statement = new SQLStatement();
		statement.setDeleteFrom(table);
		statement.setWhere(key + " = #EBASaveHandler_ReturnDeleteField(DeleteLoop, \"EBA_PK\")#");
		return statement.getStatement();
	}
	else if (serverModelName == "php")
	{
		var statement = "DELETE FROM " + table + " WHERE " + key + " = '\" . $saveHandler->ReturnDeleteField($currentRecord)";
		statement += ".\"';";
		return statement;
	}
	else if (serverModelName == "jsp")
	{
		var statement = "DELETE FROM " + table + " WHERE " + key + " = \" + deleteRecords[i].getID() + \";";
		return statement;
	}
	else
	{
		var statement = "MyQuery = \"DELETE FROM " + table + " WHERE " + key + " = \" & EBASaveHandler_ReturnDeleteField(CurrentRecord)";
		return statement;
	}
}

