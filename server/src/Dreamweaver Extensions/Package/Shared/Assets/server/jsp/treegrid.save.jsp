<%@ page import="java.sql.*" %>
<%@ page import="com.nitobi.server.handler.SaveHandler" %>
<%@ page import="com.nitobi.server.tools.Record" %>
<%@ include file="/*** NTB_CONNECTION_FILE ***/" %>

<%
	/** *******************************
	 This file is used as a Save Handler for the Grid control. When the user clicks
	 the save button in index.htm a datagram is sent to this JSP page.
	 The JSP page in turn looks at each update, insert and delete in the datagram and processes them accordingly.

	 We have provided all the necessary functionality in the SaveHandler class to extract any of the update instructions.
	 For more details please have a look at our shipped online help under Reference/Server
	 *********************************** */

	// get the database connection
	Class.forName(/*** NTB_DBDRIVER ***/).newInstance();
	Connection con = DriverManager.getConnection(/*** NTB_CONNECTION_STRING ***/, /*** NTB_DBUSER ***/, /*** NTB_DBPASSWORD ***/);

	// get the ResultSet of the table tblPricing in our database
	Statement st = con.createStatement();
	
	// The com.nitobi.server.handler.SaveHandler object is used to parse the request posted from the Grid to
	// determine the number of inserts, updates, and deletes to process.
	SaveHandler mySaveHandler = new SaveHandler(request);
	
	// Begin by processing the inserts
	Record[] insertRecords = mySaveHandler.getInsertRecords();
	for (int i=0; i< insertRecords.length; i++) 
	{
		String sql = "/*** NTB_INSERTSTATEMENT ***/";
		st.executeUpdate(sql);
	}
	
	// Continue by processing our updates
	Record[] updateRecords = mySaveHandler.getUpdateRecords();
	for (int i=0; i< updateRecords.length; i++) 
	{
		String sql = "/*** NTB_UPDATESTATEMENT ***/";
		st.executeUpdate(sql);
	}
	
	// Finish by processing our deletes
	Record[] deleteRecords = mySaveHandler.getDeleteRecords();
	for (int i=0; i< deleteRecords.length; i++) 
	{
		String sql = "/*** NTB_DELETESTATEMENT ***/";
		st.executeUpdate(sql);
	}
	st.close();
	con.close();	

	// reports back to the Grid that the update has successfully been completed
	mySaveHandler.writeToClient(response);
	    	
%>