<%@ Language = VBScript %>
<!--#include file="nitobi.xml.inc"-->
<!--#include file="/*** NTB_CONNECTION_FILE ***/" -->
<%
' This file is used as a datasource for the combo.  This file transforms
' the dataset taken from the mdb into compressed XML: the compressed format is supplied by Nitobi.
' Use the nitobi.xml.inc file to convert between ado and compressed xml.

' Retrieve the arguments given to us by the the Combo.
PageSize = Request.QueryString("PageSize")

If (PageSize = "") Then
	PageSize = "15"
End If

StartingRecordIndex = Request.QueryString("StartingRecordIndex")

If (StartingRecordIndex = "") Then
	StartingRecordIndex = "0"
End If

SearchSubstring = Request.QueryString("SearchSubstring")
LastString = Request.Querystring("LastString")

dim TableName
TableName = "/*** NTB_TABLE ***/"

dim SearchColumn
SearchColumn = "/*** NTB_SEARCHCOLUMN ***/"

' Set up the database connection and get the RecordSet'
dim objConn
Set objConn = Server.CreateObject("ADODB.Connection")
objConn.open /*** NTB_CONNECTION_STRING ***/

' Open the datasource and get a page of data.
' This can be done in a variety of ways, and is dependant
' on the functionality of your database server. The page retrieved is based
' on what the user is currently searching for.
NewQuery = /*** NTB_QUERY ***/
Set RecordSet = objConn.execute(NewQuery)

' *******************************************************************
' Lets Set up the Output
' *******************************************************************

EBAGetHandler_ProcessRecords   ' We set up the getHandler and define the column 'id' as our Index

' First we define how many columns we are sending in each record, and name each field.

' We will do this by using the EBAGetHandler_DefineField function. We will name each
' field of data after its column name in the database.

/*** NTB_COLUMNDEF ***/

' *******************************************************************
' Lets loop through our data and send it to the combo
' *******************************************************************

Do While (Not RecordSet.eof)

	EBAGetHandler_CreateNewRecord(RecordSet("/*** NTB_KEY ***/"))
		/*** NTB_RECORDDEF ***/	
	EBAGetHandler_SaveRecord

	RecordSet.MoveNext
Loop

objConn.Close()
EBAGetHandler_CompleteGet
%>