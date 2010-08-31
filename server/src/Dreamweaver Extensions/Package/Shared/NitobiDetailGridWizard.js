if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.DetailGridWizard = function()
{
	this.currentPage = 1;
	this.totalPages = 3;
}

nitobi.dw.DetailGridWizard.instance = null;

nitobi.dw.DetailGridWizard.getInstance = function()
{
	if (nitobi.dw.DetailGridWizard.instance == null)
	{
		nitobi.dw.DetailGridWizard.instance = new nitobi.dw.DetailGridWizard();
	}
	return nitobi.dw.DetailGridWizard.instance;
}

nitobi.dw.DetailGridWizard.copyXmlConverter = function(serverName)
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

nitobi.dw.DetailGridWizard.getSourceFile = function(serverName)
{	
	var sourceFile = dw.getConfigurationPath() + "/Shared/Nitobi/Assets/server/" + serverName + "/detailgrid.load." + serverName;
	return sourceFile;	
}

nitobi.dw.DetailGridWizard.getDestFile = function(serverName, tableName, id)
{
	var files;
	var destFile;	
	files = DWfile.listFolder(dw.getSiteRoot() + "detailgrid.load*." + serverName);
	destFile = dw.getSiteRoot() + id + "_" + tableName + ".load." + serverName;
	return destFile;
}

nitobi.dw.DetailGridWizard.prototype.createHandler = function(destFile)
{
	var file = DWfile.read(destFile);

	var sortColumn = this.getSortColumn();
	var sortDirection = this.getSortDirection();
	var table = this.getTableName();
	var key = this.getKey();
	
	var serverModelName = this.getServerModelName();
	var serverGlue = this.getServerCode(serverModelName);
	
	var colDef = nitobi.dw.DetailGridWizard.getColumnDefinition(serverModelName, key);
	var recDef = nitobi.dw.DetailGridWizard.getRecordDefinition(serverModelName, key);
	var dbName = this.getDatabaseName();
	var query = nitobi.dw.DetailGridWizard.getQuery(dbName, serverModelName, table);
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

nitobi.dw.DetailGridWizard.getColumnDefinition = function(serverModelName, key)
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

nitobi.dw.DetailGridWizard.getRecordDefinition = function(serverModelName, key)
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

nitobi.dw.DetailGridWizard.getQuery = function(dbName, serverModelName, tableName)
{
	var query = nitobi.dw.Wizard.detailgridQueryMap[serverModelName][dbName];
	return query;
}

nitobi.dw.DetailGridWizard.prototype.getConnectionFilePath = function()
{
	var serverModelName = this.getServerModelName();
	var connectionFilePath = "Connections/" + this.getConnectionName() + "." + serverModelName;
	return connectionFilePath;
}

nitobi.dw.DetailGridWizard.prototype.populateColumnLists = function()
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

nitobi.dw.DetailGridWizard.prototype.populateTableList = function()
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

nitobi.dw.DetailGridWizard.prototype.populateConnectionList = function()
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

nitobi.dw.DetailGridWizard.prototype.getSortColumn = function()
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
	}}

nitobi.dw.DetailGridWizard.prototype.getSortDirection = function()
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

nitobi.dw.DetailGridWizard.prototype.showPage = function(pageIndex)
{
	pages[pageIndex].visibility = "visible";
}

nitobi.dw.DetailGridWizard.prototype.hidePage = function(pageIndex)
{
	pages[pageIndex].visibility = "hidden";
}

nitobi.dw.DetailGridWizard.prototype.getConnectionName = function()
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
	
nitobi.dw.DetailGridWizard.prototype.getTableName = function()
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

nitobi.dw.DetailGridWizard.prototype.getKey = function()
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

nitobi.dw.DetailGridWizard.prototype.getServerModelName = function()
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

nitobi.dw.DetailGridWizard.prototype.clear = function()
{
	DETAIL_TABLE_LIST.innerHTML = "";
	DETAIL_KEY_LIST.innerHTML = "";
	DETAIL_INCLUDE_COLUMNS_LIST.innerHTML = "";
}

nitobi.dw.DetailGridWizard.prototype.selectServerModel = function()
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

nitobi.dw.DetailGridWizard.prototype.showButtons = function()
{
	document.buttons.visibility = "visible";
}

nitobi.dw.DetailGridWizard.prototype.getDatabaseName = function()
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

nitobi.dw.DetailGridWizard.prototype.populateDatabaseList = function()
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

nitobi.dw.DetailGridWizard.prototype.getServerCode = function(serverModelName)
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

nitobi.dw.DetailGridWizard.prototype.makeGetStarter = function(model, data)
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

nitobi.dw.DetailGridWizard.prototype.makeGetGlue = function(model, data)
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