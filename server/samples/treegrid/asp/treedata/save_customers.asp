<%@ Language=VBScript%>
<!--#include file="nitobi.xml.inc"-->

<%
dim objConn
dim accessdb

dim strconn

accessdb=server.mappath(".") & "\data\NorthWindUltra.mdb"
strconn="PROVIDER=Microsoft.Jet.OLEDB.4.0;DATA SOURCE=" & accessDB & ";USER ID=;PASSWORD=;"
Set objConn = Server.CreateObject("ADODB.Connection")
objConn.open strconn


dim CurrentRecord
dim MyQuery

' ********************************************************** '
' Begin by processing our inserts
' ********************************************************** '

EBASaveHandler_ProcessRecords


if EBASaveHandler_ReturnInsertCount > 0 then
	' Yes there are INSERTs to perform...

	for CurrentRecord = 0 to EBASaveHandler_ReturnInsertCount-1

		MyQuery = "INSERT INTO tblCustomers (CustomerName, ContactName, ContactEmail, PhoneNumber) VALUES ("
		MyQuery = MyQuery & "'" & EBASaveHandler_ReturnInsertField(CurrentRecord,"CustomerName") & "',"
		MyQuery = MyQuery & "'" & EBASaveHandler_ReturnInsertField(CurrentRecord,"ContactName") & "',"
		MyQuery = MyQuery & "'" & EBASaveHandler_ReturnInsertField(CurrentRecord,"ContactEmail") & "',"
		MyQuery = MyQuery & "'" & EBASaveHandler_ReturnInsertField(CurrentRecord,"PhoneNumber") & "'"
		
		MyQuery = MyQuery & ");"

		' Now we execute this query
		objConn.execute(MyQuery)

	next
end if


' ********************************************************** '
' Continue by processing our updates
' ********************************************************** '

if EBASaveHandler_ReturnUpdateCount > 0 then
	' Yes there are UPDATEs to perform...

	for CurrentRecord = 0 to EBASaveHandler_ReturnUpdateCount-1

		MyQuery = "UPDATE tblCustomers SET "
		MyQuery = MyQuery & "CustomerName = '" & EBASaveHandler_ReturnUpdateField(CurrentRecord,"CustomerName") & "', "
		MyQuery = MyQuery & "CustomerName = '" & EBASaveHandler_ReturnUpdateField(CurrentRecord,"ContactName") & "', "
		MyQuery = MyQuery & "ContactEmail = '" & EBASaveHandler_ReturnUpdateField(CurrentRecord,"ContactEmail") & "', "
		MyQuery = MyQuery & "PhoneNumber = '" & EBASaveHandler_ReturnUpdateField(CurrentRecord,"PhoneNumber") & "',"
		
		MyQuery = MyQuery & " WHERE ContactID = " & EBASaveHandler_ReturnUpdateField(CurrentRecord,"PK") & ";"
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

		MyQuery = "DELETE FROM tblCustomers WHERE ContactID = " & EBASaveHandler_ReturnDeleteField(CurrentRecord)

		' Now we execute this query
		objConn.execute(MyQuery)

	next
end if

EBASaveHandler_CompleteSave

%>
