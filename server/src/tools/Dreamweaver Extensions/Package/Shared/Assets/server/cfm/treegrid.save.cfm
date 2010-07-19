<!--- We include the Nitobi CF XML library 1.0 --->
<cfinclude template = "nitobi.xml.cfm">

<!--- This file is used as a Save Handler for the Nitobi Grid control. When sends data,--->
<!--- to the server for saving, it calls this page with a form post containing UPDATE's, --->
<!--- INSERT's, and DELETE's. This page decodes that and turns them into SQL statements --->
<!--- for a database. --->

<!--- First we set up the get handler by calling EBASaveHandler_ProcessRecords() --->
<CFOUTPUT>
	#EBASaveHandler_ProcessRecords()#
</CFOUTPUT>

<!--- Loop through all the insert instructions sent by the grid --->
<cfloop index = "InsertLoop" from = "1" to = #EBASaveHandler_ReturnInsertCount#>
	<cfquery datasource="/*** NTB_DATASOURCE ***/" name="InsertRecord" result="InsertResult">
    	/*** NTB_INSERTSTATEMENT ***/
	</cfquery>	
    
    <!--- To properly edit a row after inserting, we need to send the key of the new
		 row back to the Grid.  We can do this using the EBASaveHandler_SetRecordKey function.
		 If you are using either an Access database or MS SQL, you can use the code below: ---> 
	<!--- 
	<cfquery datasource="NitobiTestDB" name="pkey">
		
    </cfquery>
    <cfscript>
		EBASaveHandler_SetRecordKey(InsertLoop, pkey.pkey);
	</cfscript>
	--->
</cfloop>

<!--- Loop through all the update instructions sent by the grid --->
<cfloop index = "UpdateLoop" from = "1" to = #EBASaveHandler_ReturnUpdateCount#>
	<cfquery datasource="/*** NTB_DATASOURCE ***/" name="UpdateRecord">
    	/*** NTB_UPDATESTATEMENT ***/
	</cfquery>	
</cfloop>

<!--- Loop through all the delete instructions sent by the grid --->
<cfloop index = "DeleteLoop" from = "1" to = #EBASaveHandler_ReturnDeleteCount#>
	<cfquery datasource="/*** NTB_DATASOURCE ***/" name="DeleteRecord">
    	/*** NTB_DELETESTATEMENT ***/
	</cfquery>
</cfloop>

<!--- Now we call EBASaveHandler_CompleteSave to echo back all our xml to the browser. --->
<cfscript>
	EBASaveHandler_CompleteSave();
</cfscript>
