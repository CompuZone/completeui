if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.TreeGridSaveWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 1;
}

nitobi.dw.tgsw = nitobi.dw.TreeGridSaveWizard;

nitobi.dw.TreeGridSaveWizard.instance = null;

nitobi.dw.TreeGridSaveWizard.getInstance = function()
{
	if (nitobi.dw.TreeGridSaveWizard.instance == null)
	{
		nitobi.dw.TreeGridSaveWizard.instance = new nitobi.dw.TreeGridSaveWizard();
	}
	return nitobi.dw.TreeGridSaveWizard.instance;
}

/*nitobi.dw.tgsw.prototype.copyHandlerFile = function(serverName, id, tableName)
{
	var source = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/treegrid.save." + serverName;	
	var destFile = dw.getSiteRoot() + id + "_" + tableName + ".save." + serverName;
	
	DWfile.copy(source, destFile);
	return destFile;
}*/

nitobi.dw.tgsw.getSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/treegrid.save." + serverName;
	return sourceFile;	
}

nitobi.dw.tgsw.getDestFile = function(serverName, id, tableName)
{
	var destFile;	
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".save." + serverName;
	return destFile;
}

nitobi.dw.tgsw.prototype.createHandler = function(destFile, serverModelName, connName, tableName, pKey, fKey, dbName, isRoot)
{
	var file = DWfile.read(destFile);
	var columns = this.getColumnsNoKey(connName, tableName, pKey);
	var updateColumns = [];
	
	var bufferTree = BUFFER_TREE;
	var columnsHtml = columnTableHash[tableName];
	nitobi.util.clearTree(bufferTree);
	bufferTree.innerHTML += columnsHtml;
	
	var selectedColumns = bufferTree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < selectedColumns.length; i++)
	{
		var column = selectedColumns[i];
		var values = column.value.split("|");
		if (values[0] != pKey)
		{
			updateColumns.push(values[0]);
		}
	}
	var conn = MMDB.getConnection(connName);
	var databaseName = "$database_" + conn.name;
	var connectionFile = this.getConnectionFilePath(serverModelName, connName);
	var insertStatement = this.createInsertStatement(serverModelName, tableName, columns, fKey);
	var updateStatement = this.createUpdateStatement(serverModelName, tableName, updateColumns, pKey);
	var deleteStatement = this.createDeleteStatement(serverModelName, tableName, pKey);
	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, connName);
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
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	return file;
}

nitobi.dw.tgsw.prototype.getColumnsNoKey = function(connection, table, key)
{
	var columns = MMDB.getColumnsOfTable(connection, table);
	var newColumns = [];
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

nitobi.dw.tgsw.prototype.getConnectionFilePath = function(serverModelName, connName)
{
	var connectionFilePath = "Connections/" + connName + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.tgsw.prototype.createInsertStatement = function(serverModelName, table, columns, fKey)
{
	var statement;
	if (serverModelName == "cfm")
	{
		statement = this.createCFMInsertStatement(table, columns, fKey);
	}
	else if (serverModelName == "php")
	{
		statement = this.createPHPInsertStatement(table, columns, fKey);
	}
	else if (serverModelName == "jsp")
	{
		statement = this.createJSPInsertStatement(table, columns, fKey);
	}
	else
	{
		statement = this.createASPInsertStatement(table, columns, fKey);
	}
	return statement;
}

nitobi.dw.tgsw.prototype.createCFMInsertStatement = function(table, columns, fKey)
{
	var statement = new SQLStatement();
	statement.setInsertInto(table);
	statement.setColumns("(" + columns.toString() + ")");

	var values = "(";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		if (column == fKey)
			values += "\n\t\t'#EBASaveHandler_ReturnForeignKeyValue(InsertLoop, \"" + column + "\")#'";
		else
			values += "\n\t\t'#EBASaveHandler_ReturnInsertField(InsertLoop, \"" + column + "\")#'";
		if (i != columns.length - 1)
		{
			values += ",";
		}
	}
	values += ")";
	statement.setValues(values);
	return statement.getStatement();
}

nitobi.dw.tgsw.prototype.createPHPInsertStatement = function(table, columns, fKey)
{
	var statement = new SQLStatement();
	statement.setInsertInto(table);
	statement.setColumns("(" + columns.toString() + ")");
	
	var values = "(\" . ";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var value = "";
		if (column == fKey)
			value = "\n\t\t\"'\" . $saveHandler->ReturnForeignKeyValue($currentRecord, \"" + column + "\") . ";
		else
			value = "\n\t\t\"'\" . $saveHandler->ReturnInsertField($currentRecord, \"" + column + "\") . ";
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

nitobi.dw.tgsw.prototype.createJSPInsertStatement = function(table, columns, fKey)
{	
	var insert = "INSERT INTO " + table + " (" + columns.toString() + ") VALUES (\"";
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		if (column == fKey)
			insert += "\n\t\t+ \"'\" + insertRecords[i].getForeignKeyValue().replaceAll(\"'\", \"''\") + ";
		else
			insert += "\n\t\t+ \"'\" + insertRecords[i].getField(\"" + column + "\").replaceAll(\"'\", \"''\") + ";
		if (i != columns.length - 1)
			insert += "\"',\"";

		else
			insert += "\"'\"";
	}
	insert += "+ \");";
	return insert;
}

nitobi.dw.tgsw.prototype.createASPInsertStatement = function(table, columns, fKey)
{
	var insert = "MyQuery = \"INSERT INTO " + table + " (" + columns.toString() + ") VALUES (\""
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		if (column == fKey)
			insert += "\n\t\tMyQuery = MyQuery & \"'\" & EBASaveHandler_ReturnForeignKeyValue(CurrentRecord)";
		else
			insert += "\n\t\tMyQuery = MyQuery & \"'\" & EBASaveHandler_ReturnInsertField(CurrentRecord,\"" + column + "\")";
		
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

nitobi.dw.tgsw.prototype.createUpdateStatement = function(serverModelName, table, columns, key)
{
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

nitobi.dw.tgsw.prototype.createCFMUpdateStatement = function(table, columns, key)
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

nitobi.dw.tgsw.prototype.createPHPUpdateStatement = function(table, columns, key)
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

nitobi.dw.tgsw.prototype.createJSPUpdateStatement = function(table, columns, key)
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

nitobi.dw.tgsw.prototype.createASPUpdateStatement = function(table, columns, key)
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

nitobi.dw.tgsw.prototype.createDeleteStatement = function(serverModelName, table, key)
{
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

