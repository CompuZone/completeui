<%@ Language=VBScript%>
<!--#include file="nitobi.xml.inc"-->
<!--#include file="/*** NTB_CONNECTION_FILE ***/" -->
<%

dim objConn
Set objConn = Server.CreateObject("ADODB.Connection")
objConn.open /*** NTB_CONNECTION_STRING ***/
	
dim CurrentRecord
dim MyQuery

' ********************************************************** '
' Begin by processing our inserts
' ********************************************************** '

EBASaveHandler_ProcessRecords


if EBASaveHandler_ReturnInsertCount > 0 then
	' Yes there are INSERTs to perform...

	for CurrentRecord = 0 to EBASaveHandler_ReturnInsertCount-1

		/*** NTB_INSERTSTATEMENT ***/
		objConn.execute(MyQuery)
		
		' ********************************************************** '
		' To properly edit a row after inserting, we need to send the key of the new
		' row back to the Grid.  We can do this using the EBASaveHandler_SetRecordKey function.
		' If you are using either an Access database or MS SQL, you can use the code below:
		'
		' dim idResultSet
		' Set idResultSet = objConn.Execute("SELECT @@IDENTITY AS NewID")
		' dim newId
		' set newId = idResultSet("NewID")
		' EBASaveHandler_SetRecordKey CurrentRecord, newId
		' ********************************************************** '
	next
end if


' ********************************************************** '
' Continue by processing our updates
' ********************************************************** '

if EBASaveHandler_ReturnUpdateCount > 0 then
	' Yes there are UPDATEs to perform...

	for CurrentRecord = 0 to EBASaveHandler_ReturnUpdateCount-1

		/*** NTB_UPDATESTATEMENT ***/
		' PK is always our Primary Key for the row

		' Now we execute this query
		objConn.execute(MyQuery)

	next
end if




' ********************************************************** '
' Finish by processing our deletes
' ********************************************************** '

if EBASaveHandler_ReturnDeleteCount > 0 then
	' Yes there are DELETEs to perform...

	for CurrentRecord = 0 to EBASaveHandler_ReturnDeleteCount-1

		/*** NTB_DELETESTATEMENT ***/
		' Now we execute this query
		objConn.execute(MyQuery)

	next
end if

EBASaveHandler_CompleteSave

%>
