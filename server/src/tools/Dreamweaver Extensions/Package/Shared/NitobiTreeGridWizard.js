if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.TreeGridWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 3;
}

nitobi.dw.TGWiz = nitobi.dw.TreeGridWizard;
nitobi.dw.TreeGridWizard.instance = null;

nitobi.dw.TreeGridWizard.getInstance = function()
{
	if (nitobi.dw.TreeGridWizard.instance == null)
	{
		nitobi.dw.TreeGridWizard.instance = new nitobi.dw.TreeGridWizard();
	}
	return nitobi.dw.TreeGridWizard.instance;
}

nitobi.dw.TreeGridWizard.copyXmlConverter = function(serverName)
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

nitobi.dw.TreeGridWizard.getSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/treegrid.load." + serverName;
	return sourceFile;	
}

nitobi.dw.TreeGridWizard.getDestFile = function(serverName, id, tableName)
{
	var files;
	var destFile;	
	//files = DWfile.listFolder(dw.getSiteRoot() + "grid.load*." + serverName);
	//destFile = dw.getSiteRoot() + "grid.load" + files.length + "." + serverName;
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".load." + serverName;
	return destFile;
}

nitobi.dw.TreeGridWizard.prototype.createHandler = function(destFile, tableName, pKey, fKey, sortDir, sortCol, serverModelName, dbName, connName, isRoot)
{
	var file = DWfile.read(destFile);
	var colDef = nitobi.dw.TreeGridWizard.getColumnDefinition(serverModelName, pKey, tableName);
	var recDef = nitobi.dw.TreeGridWizard.getRecordDefinition(serverModelName, pKey, tableName);
	var query = nitobi.dw.TreeGridWizard.getQuery(dbName, serverModelName, tableName);
	var fKeyType = nitobi.dw.TreeGridWizard.getDbType(tableName, connName, fKey);
	var whereClause = nitobi.dw.TreeGridWizard.getWhereClause(fKey, serverModelName, dbName, (fKeyType.toLowerCase() == "integer" || fKeyType.toLowerCase() == "int"?false:true));
	var connectionFile = this.getConnectionFilePath(serverModelName, connName);
	var fKeyQString = nitobi.dw.TreeGridWizard.getFKeyQString(fKey, serverModelName);
	var fKeyDef = nitobi.dw.TreeGridWizard.getFKeyDefinition(serverModelName, fKey);
	var fKeyVal = nitobi.dw.TreeGridWizard.getFKeyValue(serverModelName, fKey);
	var conn = MMDB.getConnection(connName);
	var databaseName = "$database_" + conn.name;
	var connectionString = "MM_" + connName + "_STRING";
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
	file = file.replace(/\/\*\*\*\s*NTB_FKEY_QSTRING\s*\*\*\*\//g, fKeyQString);
	file = file.replace(/\/\*\*\*\s*NTB_FKEY_FIELD\s*\*\*\*\//g, fKeyDef);
	file = file.replace(/\/\*\*\*\s*NTB_FKEY_VALUE\s*\*\*\*\//g, fKeyVal);
	file = file.replace(/\/\*\*\*\s*NTB_SORTCOLUMN\s*\*\*\*\//g, sortCol);
	file = file.replace(/\/\*\*\*\s*NTB_SORTDIRECTION\s*\*\*\*\//g, sortDir);
	file = file.replace(/\/\*\*\*\s*NTB_COLUMNDEF\s*\*\*\*\//g, colDef);
	file = file.replace(/\/\*\*\*\s*NTB_KEY\s*\*\*\*\//g, pKey);
	file = file.replace(/\/\*\*\*\s*NTB_DATABASE\s*\*\*\*\//g, databaseName);
	file = file.replace(/\/\*\*\*\s*NTB_RECORDDEF\s*\*\*\*\//g, recDef);
	file = file.replace(/\/\*\*\*\s*NTB_WHERECLAUSE\s*\*\*\*\//g, whereClause);
	file = file.replace(/\/\*\*\*\s*NTB_QUERY\s*\*\*\*\//g, query);
	file = file.replace(/\/\*\*\*\s*NTB_TABLE\s*\*\*\*\//g, tableName);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_FILE\s*\*\*\*\//g, connectionFile);
	file = file.replace(/\/\*\*\*\s*NTB_CONNECTION_STRING\s*\*\*\*\//g, connectionString);
	file = file.replace(/\/\*\*\*\s*NTB_DATASOURCE\s*\*\*\*\//g, datasource);
	file = file.replace(/\/\*\*\*\s*NTB_DBUSER\s*\*\*\*\//g, dbUsername);
	file = file.replace(/\/\*\*\*\s*NTB_DBPASSWORD\s*\*\*\*\//g, dbPassword);
	file = file.replace(/\/\*\*\*\s*NTB_DBDRIVER\s*\*\*\*\//g, dbDriver);
	
	return file;
}

nitobi.dw.TreeGridWizard.prototype.getConnectionFilePath = function(serverModelName, connName)
{
	var connectionFilePath = "Connections/" + connName + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.TreeGridWizard.getColumnDefinition = function(serverModelName, key, tableName)
{
	var bufferTree = BUFFER_TREE;
	var columnsHtml = columnTableHash[tableName];
	nitobi.util.clearTree(bufferTree);
	bufferTree.innerHTML += columnsHtml;
	var colDef = "";
	var columnDefinitionTemplate = nitobi.dw.Wizard.columnDefinitionMap[serverModelName];
	//var columns = COLUMNS_TREE.getElementsByTagName("mm:treenode");
	var columns = bufferTree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		/*if (!(serverModelName == "jsp" && values[0] == key))
		{
			colDef += columnDefinitionTemplate.replace(/columnName/g, values[0]);
		}*/
		colDef += columnDefinitionTemplate.replace(/columnName/g, values[0]);
	}
	return colDef;
}

nitobi.dw.TreeGridWizard.getQuery = function(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.treeGridQueryMap[serverModelName][dbName];
	return query;
}

nitobi.dw.TreeGridWizard.getWhereClause = function(fKey, serverModelName, dbType, isString)
{
	if (fKey == "")
		return "";
	
	var whereClause = "";
	if (serverModelName == "asp")
		whereClause = "WHERE " + fKey + "=" + (isString?"'":"") + "\" & " + fKey + " & \"" + (isString?"'":"");
	
	if (serverModelName == "php")
		whereClause = "WHERE " + fKey + "=" + (isString?"'":"") + "\" . $" + fKey + " . \"" + (isString?"'":"");
	if (serverModelName == "cfm")
		whereClause = (dbType != "oracle"?"WHERE ":"") + fKey + "=" + (isString?"'":"") + "#" + fKey + "#" + (isString?"'":"");
	if (serverModelName == "jsp")
		whereClause = "WHERE " + fKey + "=" + (isString?"'":"") + "\" + fKey + \"" + (isString?"'":"");
		
	return whereClause;
}

// TODO: Make a nitobi.util function
nitobi.dw.TreeGridWizard.getDbType = function(tableName, connName, colName)
{
	var colTypeList = MMDB.getColumnAndTypeList(connName, "SELECT * FROM " + tableName);
	for (var i = 0; i < colTypeList.length; i++)
	{
		if (colTypeList[i] == colName)
			return colTypeList[i+1];
	}
	return "";
}

nitobi.dw.TreeGridWizard.getRecordDefinition = function(serverModelName, key, tableName)
{
	var bufferTree = BUFFER_TREE;
	var columnsHtml = columnTableHash[tableName];
	nitobi.util.clearTree(bufferTree);
	bufferTree.innerHTML += columnsHtml;
	var recDef = "";
	var recordTemplate = nitobi.dw.Wizard.recordDefinitionMap[serverModelName];
	var columns = bufferTree.getElementsByTagName("mm:treenode");
	for (var i = 0; i < columns.length; i++)
	{
		var column = columns[i];
		var values = column.value.split("|");
		/*if (!(serverModelName == "jsp" && values[0] == key))
		{
			recDef += recordTemplate.replace(/columnName/g, values[0]);
		}*/
		if (serverModelName == "jsp" && values[0] == key)
			recDef += "curRecord.setField(\"" + values[0] + "\", key);\n\t\t";
		else
			recDef += recordTemplate.replace(/columnName/g, values[0]);
	}
	return recDef;
}

nitobi.dw.TreeGridWizard.getFKeyQString = function(fKey, serverModelName)
{
	var qs = "";
	if (fKey == "")
		return qs;
	if (serverModelName == "asp")
	{
		qs = "dim " + fKey;
		qs += "\n\t" + fKey + " = cstr(request(\"" + fKey + "\"))";
	}
	if (serverModelName == "php")
	{
		qs += "\n\t$" + fKey + "=\"\";";
		qs += "\n\tif (isset($_GET[\"" + fKey + "\"])) {";
		qs += "\n\t\t$" + fKey + "=$_GET[\"" + fKey + "\"];";
		qs += "\n\t}";
	}
	if (serverModelName == "cfm")
	{
	}
	if (serverModelName == "jsp")
	{
		qs += "String fKey = request.getParameter(\"" + fKey + "\");";
	}
	return qs;
}

nitobi.dw.TreeGridWizard.getFKeyDefinition = function(serverModelName, fKey)
{	
	var def = ""
	if (fKey == "")
		return def;
	if (serverModelName == "asp")
	{
		def += "EBAGetHandler_DefineForeignKey(\"" + fKey + "\")";
		def += "\n\tEBAGetHandler_DefineForeignKeyValue(" + fKey + ")";
	}
	if (serverModelName == "php")
	{
		def += "$getHandler->DefineForeignKey(\"" + fKey + "\");";
		def += "\n\t$getHandler->DefineForeignKeyValue($" + fKey + ");";
	}
	if (serverModelName == "cfm")
	{
		def += "#EBAGetHandler_DefineForeignKey(\"" + fKey + "\")#";
	}
	if (serverModelName == "jsp")
	{
		def += "myGetHandler.setForeignKey(\"" + fKey + "\");";
		def += "\n\tmyGetHandler.setForeignKeyValue(fKey);";
	}
	return def;
}

nitobi.dw.TreeGridWizard.getFKeyValue = function(serverModelName, fKey)
{
	var def = "";
	if (serverModelName == "cfm" && fKey != "")
		def += "#EBAGetHandler_DefineForeignKeyValue(" + fKey + ")#"
		
	return def;
}