<?php
header('Content-type: text/xml');
require("nitobi.xml.php");
require("/*** NTB_CONNECTION_FILE ***/");

/*   This file is used as a Save Handler for the Grid control. When the user clicks
	 the save button in default.php a datagram is sent to this script.
	 The script in turn looks at each update in the datagram and processes them accordingly.

	 We have provided all the necessary functionality to extract any of the update instructions.

     This block of code is ADO connection code used only for demonstration purposes
     objConn is an ADO object we use here for demonstration purposes.
 */

$saveHandler = new EBASaveHandler();
$saveHandler->ProcessRecords();

mysql_select_db(/*** NTB_DATABASE ***/) or die(mysql_error());

// ********************************************************** '
// Begin by processing our inserts
// ********************************************************** '
$insertCount = $saveHandler->ReturnInsertCount();
if ($insertCount > 0)
{
	// Yes there are INSERTs to perform...
	for ($currentRecord = 0; $currentRecord < $insertCount; $currentRecord++)
	{
		$myQuery = "/*** NTB_INSERTSTATEMENT ***/";
		// Now we execute this query
		mysql_query($myQuery);

		/******
		 * To properly edit a row after inserting, we need to send the key of the new
		 * row back to the Grid.  We can do this using the EBASaveHandler_SetRecordKey function.
		*******/
		$saveHandler->SetRecordKey($currentRecord, mysql_insert_id());
	}
}

// ********************************************************** '
// Continue by processing our updates
// ********************************************************** '
$updateCount = $saveHandler->ReturnUpdateCount();
if ($updateCount > 0)
{
	// Yes there are UPDATEs to perform...
	for ($currentRecord = 0; $currentRecord < $updateCount; $currentRecord++)
	{
		 $myQuery = "/*** NTB_UPDATESTATEMENT ***/";

		// Now we execute this query
		 mysql_query($myQuery);
	}
}

// ********************************************************** '
// Finish by processing our deletes
// ********************************************************** '

$deleteCount = $saveHandler->ReturnDeleteCount();
if ($deleteCount > 0)
{
	// Yes there are DELETES to perform...
	for ($currentRecord = 0; $currentRecord < $deleteCount; $currentRecord++)
	{
		 $myQuery = "/*** NTB_DELETESTATEMENT ***/";
		// Now we execute this query
		 mysql_query($myQuery);
	}
}

$saveHandler->CompleteSave();
mysql_close();

?>
