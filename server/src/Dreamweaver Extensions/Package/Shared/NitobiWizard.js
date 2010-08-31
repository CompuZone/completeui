if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.Wizard = function()
{
}

nitobi.dw.Wizard.columnDefinitionMap = {};
nitobi.dw.Wizard.columnDefinitionMap["php"] = "$getHandler->DefineField(\"columnName\");\n\t";
nitobi.dw.Wizard.columnDefinitionMap["cfm"] = "#EBAGetHandler_DefineField(\"columnName\")#\n\t";
nitobi.dw.Wizard.columnDefinitionMap["asp"] = "EBAGetHandler_DefineField(\"columnName\")\n\t";
nitobi.dw.Wizard.columnDefinitionMap["jsp"] = "myGetHandler.defineField(\"columnName\");\n\t";

nitobi.dw.Wizard.recordDefinitionMap = {};
nitobi.dw.Wizard.recordDefinitionMap["php"] = "$record->add(\"columnName\", $row[\"columnName\"]);\n\t\t";
nitobi.dw.Wizard.recordDefinitionMap["cfm"] = "#EBAGetHandler_DefineRecordFieldValue(\"columnName\", columnName)#\n\t\t\t";
nitobi.dw.Wizard.recordDefinitionMap["asp"] = "EBAGetHandler_DefineRecordFieldValue \"columnName\", RecordSet(\"columnName\")\n\t\t\t\t";
nitobi.dw.Wizard.recordDefinitionMap["jsp"] = "curRecord.setField(\"columnName\", rs.getString(\"columnName\"));\n\t\t";

nitobi.dw.Wizard.detailgridQueryMap = {};
nitobi.dw.Wizard.gridQueryMap = {};
nitobi.dw.Wizard.gridQueryMap["php"] = {};
nitobi.dw.Wizard.detailgridQueryMap["php"] = {};
nitobi.dw.Wizard.gridQueryMap["php"]["mysql"] = "SELECT * FROM \" . $tableName . \" ORDER BY \" . $sortColumn . \" \" . $sortDirection .\" LIMIT \". $ordinalStart .\",\". ($pageSize) .\";";
nitobi.dw.Wizard.detailgridQueryMap["php"]["mysql"] = "SELECT * FROM \" . $tableName . \" \" . $whereClause . \" ORDER BY \" . $sortColumn . \" \" . $sortDirection .\" LIMIT \". $ordinalStart .\",\". ($pageSize) .\";";


nitobi.dw.Wizard.gridQueryMap["asp"] = {};
nitobi.dw.Wizard.detailgridQueryMap["asp"] = {};
nitobi.dw.Wizard.gridQueryMap["asp"]["access"] = "\"SELECT * FROM (SELECT TOP \" & PageSize & \" * FROM (SELECT TOP \" & MaxRecords &  \"  * FROM \" & TableName & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \") ORDER BY \" & SortColumn & \" \" & ReverseDirection & \") ORDER BY \" & SortColumn & \" \" & SortDirection";
nitobi.dw.Wizard.gridQueryMap["asp"]["sqlserver"] = "\"SELECT * FROM (SELECT TOP \" & PageSize & \" * FROM (SELECT TOP \" & MaxRecords &  \"  * FROM \" & TableName & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \") DERIVEDTBL ORDER BY \" & SortColumn & \" \" & ReverseDirection & \") DERIVEDTBL2 ORDER BY \" & SortColumn & \" \" & SortDirection";
nitobi.dw.Wizard.gridQueryMap["asp"]["sqlserver2005"] = "\"SELECT TOP \" & PageSize & \"* FROM (SELECT ROW_NUMBER() OVER (ORDER BY \" & SortColumn & \") AS RowNumber, * FROM \" & TableName & \") _myResults WHERE RowNumber > \" & StartRecordIndex";
nitobi.dw.Wizard.gridQueryMap["asp"]["mysql"] = "\"SELECT * FROM \" & TableName & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \" LIMIT \" & StartRecordIndex & \", \" & PageSize";
nitobi.dw.Wizard.detailgridQueryMap["asp"]["access"] = "\"SELECT * FROM (SELECT TOP \" & PageSize & \" * FROM (SELECT TOP \" & MaxRecords &  \"  * FROM \" & TableName & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \") ORDER BY \" & SortColumn & \" \" & ReverseDirection & \")\" & \" \" & WhereClause & \" ORDER BY \" & SortColumn & \" \" & SortDirection";
nitobi.dw.Wizard.detailgridQueryMap["asp"]["sqlserver"] = "\"SELECT * FROM (SELECT TOP \" & PageSize & \" * FROM (SELECT TOP \" & MaxRecords &  \"  * FROM \" & TableName & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \") DERIVEDTBL ORDER BY \" & SortColumn & \" \" & ReverseDirection & \") DERIVEDTBL2 \" & WhereClause &ORDER BY \" & SortColumn & \" \" & SortDirection";
nitobi.dw.Wizard.detailgridQueryMap["asp"]["sqlserver2005"] =  "\"SELECT TOP \" & PageSize & \"* FROM (SELECT ROW_NUMBER() OVER (ORDER BY \" & SortColumn & \") AS RowNumber, * FROM \" & TableName & \"  \" & WhereClause & \") _myResults WHERE RowNumber > \" & StartRecordIndex";
nitobi.dw.Wizard.detailgridQueryMap["asp"]["mysql"] = "\"SELECT * FROM \" & TableName & \" \" & WhereClause &\" ORDER BY \" & SortColumn & \" \" & SortDirection & \" LIMIT \" & StartRecordIndex & \", \" & PageSize";


nitobi.dw.Wizard.gridQueryMap["cfm"] = {};
nitobi.dw.Wizard.detailgridQueryMap["cfm"] = {};
nitobi.dw.Wizard.gridQueryMap["cfm"]["access"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM #TableName# ORDER BY #SortColumn# #SortDirection#";
nitobi.dw.Wizard.gridQueryMap["cfm"]["mysql"] = "SELECT * FROM #TableName# ORDER BY #SortColumn# #SortDirection# LIMIT 0, #TotalRecordsToRetrieve#";
nitobi.dw.Wizard.gridQueryMap["cfm"]["sqlserver"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM #TableName# ORDER BY #SortColumn# #SortDirection#";
nitobi.dw.Wizard.gridQueryMap["cfm"]["sqlserver2005"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM (SELECT ROW_NUMBER() OVER (ORDER BY #SortColumn#) AS RowNumber, * FROM #TableName#) _myResults WHERE RowNumber > 0";
nitobi.dw.Wizard.gridQueryMap["cfm"]["db2"] = "SELECT * FROM #TableName# ORDER BY #SortColumn# #SortDirection# FETCH FIRST #TotalRecordsToRetrieve# ROWS ONLY";
nitobi.dw.Wizard.gridQueryMap["cfm"]["oracle"] = "SELECT * FROM #TableName# WHERE ROWNUM <= #TotalRecordsToRetrieve# ORDER BY #SortColumn# #SortDirection#";

nitobi.dw.Wizard.detailgridQueryMap["cfm"]["access"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection#";
nitobi.dw.Wizard.detailgridQueryMap["cfm"]["mysql"] = "SELECT * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection# LIMIT 0, #TotalRecordsToRetrieve#";
nitobi.dw.Wizard.detailgridQueryMap["cfm"]["sqlserver"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection#";
nitobi.dw.Wizard.gridQueryMap["cfm"]["sqlserver2005"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM (SELECT ROW_NUMBER() OVER (ORDER BY #SortColumn#) AS RowNumber, * FROM #TableName# #PreserveSingleQuotes(WhereClause)#) _myResults WHERE RowNumber > 0";
nitobi.dw.Wizard.detailgridQueryMap["cfm"]["db2"] = "SELECT * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection# FETCH FIRST #TotalRecordsToRetrieve# ROWS ONLY";
nitobi.dw.Wizard.detailgridQueryMap["cfm"]["oracle"] = "SELECT * FROM #TableName# #PreserveSingleQuotes(WhereClause)#WHERE ROWNUM <= #TotalRecordsToRetrieve# ORDER BY #SortColumn# #SortDirection#";


nitobi.dw.Wizard.gridQueryMap["jsp"] = {};
nitobi.dw.Wizard.detailgridQueryMap["jsp"] = {};
nitobi.dw.Wizard.gridQueryMap["jsp"]["access"] = "\"SELECT * FROM ( SELECT TOP \" + pageSize + \" * FROM (SELECT TOP \" + (pageSize+ordinalStart) + \" * FROM \" + tableName + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \") ORDER BY \" + sortColumn + \" \" + ((sortDirection.equalsIgnoreCase(\"Desc\"))?\"Asc\":\"Desc\") + \") ORDER BY \" + sortColumn + \" \" + sortDirection + \";\";";
nitobi.dw.Wizard.gridQueryMap["jsp"]["mysql"] = "\"SELECT * FROM \" + tableName + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \" LIMIT \" + ordinalStart + \", \" + pageSize + \";\"";
nitobi.dw.Wizard.gridQueryMap["jsp"]["sqlserver"] =  "\"SELECT * FROM ( SELECT TOP \" + pageSize + \" * FROM (SELECT TOP \" + (pageSize+ordinalStart) + \" * FROM \" + tableName + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \") ORDER BY \" + sortColumn + \" \" + ((sortDirection.equalsIgnoreCase(\"Desc\"))?\"Asc\":\"Desc\") + \") ORDER BY \" + sortColumn + \" \" + sortDirection + \";\";";
nitobi.dw.Wizard.gridQueryMap["jsp"]["sqlserver2005"] = "\"SELECT TOP \" + pageSize + \" * FROM (SELECT ROW_NUMBER() OVER (ORDER BY \" + sortColumn + \") AS RowNumber, * FROM \" + tableName + \") _myResults WHERE RowNumber > \" + ordinalStart ";

nitobi.dw.Wizard.gridQueryMap["jsp"]["db2"] = "\"SELECT * FROM \" + tableName + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \" FETCH FIRST #TotalRecordsToRetrieve# ROWS ONLY";
nitobi.dw.Wizard.gridQueryMap["jsp"]["oracle"] = "";

nitobi.dw.Wizard.detailgridQueryMap["jsp"]["access"] = "\"SELECT * FROM ( SELECT TOP \" + pageSize + \" * FROM (SELECT TOP \" + (pageSize+ordinalStart) + \" * FROM \" + tableName + \" \"  + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \") ORDER BY \" + sortColumn + \" \" + ((sortDirection.equalsIgnoreCase(\"Desc\"))?\"Asc\":\"Desc\") + \") ORDER BY \" + sortColumn + \" \" + sortDirection + \";\";";
nitobi.dw.Wizard.detailgridQueryMap["jsp"]["mysql"] = "\"SELECT * FROM \" + tableName + \" \"  + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \" LIMIT \" + ordinalStart + \", \" + pageSize + \";\"";
nitobi.dw.Wizard.detailgridQueryMap["jsp"]["sqlserver"] =  "\"SELECT * FROM ( SELECT TOP \" + pageSize + \" * FROM (SELECT TOP \" + (pageSize+ordinalStart) + \" * FROM \" + tableName + \" \"  + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \") ORDER BY \" + sortColumn + \" \" + ((sortDirection.equalsIgnoreCase(\"Desc\"))?\"Asc\":\"Desc\") + \") ORDER BY \" + sortColumn + \" \" + sortDirection + \";\";";
nitobi.dw.Wizard.detailgridQueryMap["jsp"]["sqlserver2005"] = "\"SELECT TOP \" + pageSize + \" * FROM (SELECT ROW_NUMBER() OVER (ORDER BY \" + sortColumn + \") AS RowNumber, * FROM \" + tableName + \" \"  + whereClause + \") _myResults WHERE RowNumber > \" + ordinalStart ";

nitobi.dw.Wizard.detailgridQueryMap["jsp"]["db2"] = "\"SELECT * FROM \" + tableName + \" \"  + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \" FETCH FIRST #TotalRecordsToRetrieve# ROWS ONLY";
nitobi.dw.Wizard.gridQueryMap["jsp"]["oracle"] = "";

nitobi.dw.Wizard.databaseMap = {};
nitobi.dw.Wizard.databaseMap["php"] = "<option value=\"mysql\">MySQL</option>";
nitobi.dw.Wizard.databaseMap["cfm"] = "<option value=\"mysql\">MySQL</option><option value=\"access\">MS Access</option><option value=\"sqlserver\">SQL Server</option><option value=\"sqlserver2005\">SQL Server 2005</option>";
nitobi.dw.Wizard.databaseMap["asp"] = "<option value=\"access\">MS Access</option><option value=\"sqlserver\">SQL Server</option><option value=\"sqlserver2005\">SQL Server 2005</option><option value=\"mysql\">MySQL</option>";
nitobi.dw.Wizard.databaseMap["jsp"] = "<option value=\"mysql\">MySQL</option><option value=\"access\">MS Access</option><option value=\"sqlserver\">SQL Server</option><option value=\"sqlserver2005\">SQL Server 2005</option>";

nitobi.dw.Wizard.includesMap = {};
nitobi.dw.Wizard.includesMap["php"] = "nitobi.xml.php";
nitobi.dw.Wizard.includesMap["asp"] = "nitobi.xml.inc";
nitobi.dw.Wizard.includesMap["cfm"] = "nitobi.xml.cfm";
nitobi.dw.Wizard.includesMap["jsp"] = "nitobi-server-lib.jar"

nitobi.dw.Wizard.comboQueryMap = {};
nitobi.dw.Wizard.comboQueryMap["asp"] = {};
nitobi.dw.Wizard.comboQueryMap["asp"]["access"] = "\"SELECT TOP \" & PageSize & \" * FROM \" & TableName & \" WHERE \" & SearchColumn & \" > '\" & LastString & \"' AND \" & SearchColumn & \" LIKE '\" & SearchSubstring & \"%' ORDER BY \" & SearchColumn";
nitobi.dw.Wizard.comboQueryMap["asp"]["mysql"] = "\"SELECT * FROM \" & TableName & \" WHERE \" & SearchColumn & \" LIKE '\" & SearchSubString & \"%' LIMIT \" & StartingRecordIndex & \",\" & PageSize & \";\"";
nitobi.dw.Wizard.comboQueryMap["asp"]["sqlserver"] = "\"SELECT TOP \" & PageSize & \" * FROM \" & TableName & \" WHERE \" & SearchColumn & \" > '\" & LastString & \"' AND \" & SearchColumn & \" LIKE '\" & SearchSubstring & \"%' ORDER BY \" & SearchColumn";

nitobi.dw.Wizard.comboQueryMap["php"] = {};
nitobi.dw.Wizard.comboQueryMap["php"]["mysql"] = "\"SELECT * FROM \" . $tableName . \" WHERE \" . $searchColumn . \" LIKE '\" . $searchSubString . \"%' LIMIT \" . $startingRecordIndex . \",\" . $pageSize . \";\"";

nitobi.dw.Wizard.comboQueryMap["cfm"] = {};
nitobi.dw.Wizard.comboQueryMap["cfm"]["access"] = "SELECT TOP #PageSize# * FROM #TableName# WHERE #SearchColumn# > '#LastString#' AND #SearchColumn# LIKE '#SearchSubString#%' ORDER BY #SearchColumn#";
nitobi.dw.Wizard.comboQueryMap["cfm"]["mysql"] = "SELECT * FROM #TableName# WHERE #SearchColumn# LIKE '#SearchSubString#%' ORDER BY #SearchColumn# LIMIT #StartingRecordIndex#, #PageSize#";
nitobi.dw.Wizard.comboQueryMap["cfm"]["sqlserver"] = "SELECT TOP #PageSize# * FROM #TableName# WHERE #SearchColumn# > '#LastString#' AND #SearchColumn# LIKE '#SearchSubString#%' ORDER BY #SearchColumn#"
nitobi.dw.Wizard.comboQueryMap["cfm"]["db2"] = "SELECT * FROM #TableName# WHERE #SearchColumn# > 'LastString' AND #SearchColumn# LIKE '#SearchSubstring#%' ORDER BY #SearchColumn# FETCH FIRST #PageSize# ROWS ONLY";
nitobi.dw.Wizard.comboQueryMap["cfm"]["oracle"] = "SELECT * FROM (SELECT * FROM #TableName# WHERE #SearchColumn# > 'LastString' AND #SearchColumn# LIKE 'SearchSubstring%' ORDER BY #SearchColumn#) WHERE ROWNUM <= #PageSize#";

nitobi.dw.Wizard.comboQueryMap["jsp"] = {};
nitobi.dw.Wizard.comboQueryMap["jsp"]["access"] = "\"SELECT TOP \" + pageSize + \" * FROM \" + tableName + \" WHERE \" + searchColumn + \" > '\" + lastString + \"' AND \" + searchColumn + \" LIKE '\" + searchSubString + \"%' ORDER BY \" + searchColumn + \";\"";
nitobi.dw.Wizard.comboQueryMap["jsp"]["mysql"] = "\"SELECT * FROM \" + tableName + \" WHERE \" + searchColumn + \" LIKE '\" + searchSubString + \"%' ORDER BY \" + searchColumn + \" LIMIT \" + startParameter + \", \" + pageSizeParam;";
nitobi.dw.Wizard.comboQueryMap["jsp"]["sqlserver"] = "\"SELECT TOP \" + pageSize + \" * FROM \" + tableName + \" WHERE \" + searchColumn + \" > '\" + lastString + \"' AND \" + searchColumn + \" LIKE '\" + searchSubString + \"%' ORDER BY \" + searchColumn + \";\"";
nitobi.dw.Wizard.comboQueryMap["jsp"]["db2"] = "";
nitobi.dw.Wizard.comboQueryMap["jsp"]["oracle"] = "";


nitobi.dw.Wizard.comboDetailQueryMap = {};
nitobi.dw.Wizard.comboDetailQueryMap["asp"] = {};
nitobi.dw.Wizard.comboDetailQueryMap["asp"]["access"] = "\"SELECT TOP \" & PageSize & \" * FROM \" & TableName & \" WHERE \" & SearchColumn & \" > '\" & LastString & \"' AND \" & SearchColumn & \" LIKE '\" & SearchSubstring & \"%' \" & WhereClause & \" ORDER BY \" & SearchColumn";
nitobi.dw.Wizard.comboDetailQueryMap["asp"]["mysql"] = "\"SELECT * FROM \" & TableName & \" WHERE \" & SearchColumn & \" LIKE '\" & SearchSubString & \"%' AND \" & WhereClause & \" LIMIT \" & StartingRecordIndex & \",\" & PageSize & \";\"";
nitobi.dw.Wizard.comboDetailQueryMap["asp"]["sqlserver"] = "\"SELECT TOP \" & PageSize & \" * FROM \" & TableName & \" WHERE \" & SearchColumn & \" > '\" & LastString & \"' AND \" & SearchColumn & \" LIKE '\" & SearchSubstring & \"%' \" & WhereClause & \" ORDER BY \" & SearchColumn";

nitobi.dw.Wizard.comboDetailQueryMap["php"] = {};
nitobi.dw.Wizard.comboDetailQueryMap["php"]["mysql"] = "\"SELECT * FROM \" . $tableName . \" WHERE \" . $searchColumn . \" LIKE '\" . $searchSubString . \"%'\" . $whereClause . \" LIMIT \" . $startingRecordIndex . \",\" . $pageSize . \";\"";

nitobi.dw.Wizard.comboDetailQueryMap["cfm"] = {};
nitobi.dw.Wizard.comboDetailQueryMap["cfm"]["access"] = "SELECT TOP #PageSize# * FROM #TableName# WHERE #SearchColumn# > '#LastString#' AND #SearchColumn# LIKE '#SearchSubString#%' #WhereClause# ORDER BY #SearchColumn#";
nitobi.dw.Wizard.comboDetailQueryMap["cfm"]["mysql"] = "SELECT * FROM #TableName# WHERE #SearchColumn# LIKE '#SearchSubString#%' #WhereClause# ORDER BY #SearchColumn# LIMIT #StartingRecordIndex#, #PageSize#";
nitobi.dw.Wizard.comboDetailQueryMap["cfm"]["sqlserver"] = "SELECT TOP #PageSize# * FROM #TableName# WHERE #SearchColumn# > '#LastString#' AND #SearchColumn# LIKE '#SearchSubString#%' #WhereClause# ORDER BY #SearchColumn#"
nitobi.dw.Wizard.comboDetailQueryMap["cfm"]["db2"] = "SELECT * FROM #TableName# WHERE #SearchColumn# > 'LastString' AND #SearchColumn# LIKE '#SearchSubstring#%' #WhereClause# ORDER BY #SearchColumn# FETCH FIRST #PageSize# ROWS ONLY";
nitobi.dw.Wizard.comboDetailQueryMap["cfm"]["oracle"] = "SELECT * FROM (SELECT * FROM #TableName# WHERE #SearchColumn# > 'LastString' AND #SearchColumn# LIKE 'SearchSubstring%' ORDER BY #SearchColumn# #WhereClause#) WHERE ROWNUM <= #PageSize#";

nitobi.dw.Wizard.comboDetailQueryMap["jsp"] = {};
nitobi.dw.Wizard.comboDetailQueryMap["jsp"]["access"] = "\"SELECT TOP \" + pageSize + \" * FROM \" + tableName + \" WHERE \" + searchColumn + \" > '\" + lastString + \"' AND \" + searchColumn + \" LIKE '\" + searchSubString + \"%' \" + whereClause + \" ORDER BY \" + searchColumn + \";\"";
nitobi.dw.Wizard.comboDetailQueryMap["jsp"]["mysql"] = "\"SELECT * FROM \" + tableName + \" WHERE \" + searchColumn + \" LIKE '\" + searchSubString + \"%' \" + whereClause + \" ORDER BY \" + searchColumn + \" LIMIT \" + startParameter + \", \" + pageSizeParam;";
nitobi.dw.Wizard.comboDetailQueryMap["jsp"]["sqlserver"] = "\"SELECT TOP \" + pageSize + \" * FROM \" + tableName + \" WHERE \" + searchColumn + \" > '\" + lastString + \"' \" + searchColumn + \" LIKE '\" + searchSubString + \"%' AND \" + whereClause + \" ORDER BY \" + searchColumn + \";\"";
nitobi.dw.Wizard.comboDetailQueryMap["jsp"]["db2"] = "";
nitobi.dw.Wizard.comboDetailQueryMap["jsp"]["oracle"] = "";

nitobi.dw.Wizard.treeGridQueryMap = {};
nitobi.dw.Wizard.treeGridQueryMap["asp"] = {};
nitobi.dw.Wizard.treeGridQueryMap["asp"]["access"] = "\"SELECT * FROM (SELECT TOP \" & PageSize & \" * FROM (SELECT TOP \" & MaxRecords &  \"  * FROM \" & TableName & \" \" & WhereClause &  \" ORDER BY \" & SortColumn & \" \" & SortDirection & \") ORDER BY \" & SortColumn & \" \" & ReverseDirection & \") ORDER BY \" & SortColumn & \" \" & SortDirection";
nitobi.dw.Wizard.treeGridQueryMap["asp"]["sqlserver"] = "\"SELECT * FROM (SELECT TOP \" & PageSize & \" * FROM (SELECT TOP \" & MaxRecords &  \"  * FROM \" & TableName & \" \" & WhereClause & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \") DERIVEDTBL ORDER BY \" & SortColumn & \" \" & ReverseDirection & \") DERIVEDTBL2 ORDER BY \" & SortColumn & \" \" & SortDirection";
nitobi.dw.Wizard.treeGridQueryMap["asp"]["sqlserver2005"] = "\"SELECT TOP \" & PageSize & \"* FROM (SELECT ROW_NUMBER() OVER (ORDER BY \" & SortColumn & \") AS RowNumber, * FROM \" & TableName & \" \" & WhereClause & \") _myResults WHERE RowNumber > \" & StartRecordIndex";
nitobi.dw.Wizard.treeGridQueryMap["asp"]["mysql"] = "\"SELECT * FROM \" & TableName & \" \" & WhereClause & \" ORDER BY \" & SortColumn & \" \" & SortDirection & \" LIMIT \" & StartRecordIndex & \", \" & PageSize";

nitobi.dw.Wizard.treeGridQueryMap["php"] = {};
nitobi.dw.Wizard.treeGridQueryMap["php"]["mysql"] = "SELECT * FROM \" . $tableName . \" \" . $whereClause . \" ORDER BY \" . $sortColumn . \" \" . $sortDirection .\" LIMIT \". $ordinalStart .\",\". ($pageSize) .\";";


nitobi.dw.Wizard.treeGridQueryMap["cfm"] = {};
nitobi.dw.Wizard.treeGridQueryMap["cfm"]["access"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection#";
nitobi.dw.Wizard.treeGridQueryMap["cfm"]["mysql"] = "SELECT * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection# LIMIT 0, #TotalRecordsToRetrieve#";
nitobi.dw.Wizard.treeGridQueryMap["cfm"]["sqlserver"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection#";
nitobi.dw.Wizard.treeGridQueryMap["cfm"]["sqlserver2005"] = "SELECT TOP #TotalRecordsToRetrieve# * FROM (SELECT ROW_NUMBER() OVER (ORDER BY #SortColumn#) AS RowNumber, * FROM #TableName# #PreserveSingleQuotes(WhereClause)#) _myResults WHERE RowNumber > 0";
nitobi.dw.Wizard.treeGridQueryMap["cfm"]["db2"] = "SELECT * FROM #TableName# #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection# FETCH FIRST #TotalRecordsToRetrieve# ROWS ONLY";
nitobi.dw.Wizard.treeGridQueryMap["cfm"]["oracle"] = "SELECT * FROM #TableName# WHERE ROWNUM <= #TotalRecordsToRetrieve# AND #PreserveSingleQuotes(WhereClause)# ORDER BY #SortColumn# #SortDirection#";

nitobi.dw.Wizard.treeGridQueryMap["jsp"] = {};
nitobi.dw.Wizard.treeGridQueryMap["jsp"]["access"] = "\"SELECT * FROM ( SELECT TOP \" + pageSize + \" * FROM (SELECT TOP \" + (pageSize+ordinalStart) + \" * FROM \" + tableName + \" \" + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \") ORDER BY \" + sortColumn + \" \" + ((sortDirection.equalsIgnoreCase(\"Desc\"))?\"Asc\":\"Desc\") + \") ORDER BY \" + sortColumn + \" \" + sortDirection + \";\";";
nitobi.dw.Wizard.treeGridQueryMap["jsp"]["mysql"] = "\"SELECT * FROM \" + tableName + \" \" + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \" LIMIT \" + ordinalStart + \", \" + pageSize + \";\"";
nitobi.dw.Wizard.treeGridQueryMap["jsp"]["sqlserver"] =  "\"SELECT * FROM ( SELECT TOP \" + pageSize + \" * FROM (SELECT TOP \" + (pageSize+ordinalStart) + \" * FROM \" + tableName + \" \" + whereClause + \" ORDER BY \" + sortColumn + \" \" + sortDirection + \") ORDER BY \" + sortColumn + \" \" + ((sortDirection.equalsIgnoreCase(\"Desc\"))?\"Asc\":\"Desc\") + \") ORDER BY \" + sortColumn + \" \" + sortDirection + \";\";";
nitobi.dw.Wizard.treeGridQueryMap["jsp"]["sqlserver2005"] = "\"SELECT TOP \" + pageSize + \" * FROM (SELECT ROW_NUMBER() OVER (ORDER BY \" + sortColumn + \") AS RowNumber, * FROM \" + tableName + \" \" + whereClause + \") _myResults WHERE RowNumber > \" + ordinalStart ";
nitobi.dw.Wizard.treeGridQueryMap["jsp"]["db2"] = "";
nitobi.dw.Wizard.treeGridQueryMap["jsp"]["oracle"] = "";