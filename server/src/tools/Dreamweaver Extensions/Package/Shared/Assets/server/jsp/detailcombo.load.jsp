<%@ page import="java.sql.*" %>
<%@ page import="com.nitobi.server.handler.GetHandler" %>
<%@ page import="com.nitobi.server.tools.Record" %>
<%@ include file="/*** NTB_CONNECTION_FILE ***/" %>

<%
	// This file is used as a Get Handler for the combo. When the combo is initialized,
	// the get handler script (this page) is called and expected to return a properly formatted
	// xml stream. We have provided all the necessary functionality to do this without actually
	// requiring you to construct XML. Simply interface with your datasource and use the provided
	// classes in ebaxmlconverter.jar to create the necessary output.

	// Gethandlers must be able to output xml when called without any parameters.
	// For more details please have a look at our shipped online help under Reference/Server


	// We begin by grabbing some of the necessary querystring variables
	
	String pageSizeParam = request.getParameter("PageSize");
	if (pageSizeParam == null) 
		pageSizeParam = "15";
	int pageSize = Integer.parseInt(pageSizeParam);	
	
	String searchSubStringParam = request.getParameter("SearchSubstring");
	if (searchSubStringParam == null) 
		searchSubStringParam = "";
	String searchSubString = searchSubStringParam;	

	String lastStringParam = request.getParameter("LastString");
	if (lastStringParam == null) 
		lastStringParam = "";
	String lastString = lastStringParam;
	
	String startParameter = request.getParameter("StartRecordIndex");
	if (startParameter == null)
	{
		startParameter = "0";
	}
	
	/*** NTB_VAR_GETTER ***/
	
	String tableName = "/*** NTB_TABLE ***/";
	String searchColumn = "/*** NTB_SEARCHCOLUMN ***/";
	
	// get the database connection
	Class.forName(/*** NTB_DBDRIVER ***/).newInstance();
	Connection con = DriverManager.getConnection(/*** NTB_CONNECTION_STRING ***/, /*** NTB_DBUSER ***/, /*** NTB_DBPASSWORD ***/);

	// get the ResultSet of the table tblPricing in our database
	Statement st = con.createStatement();
	String newQuery = /*** NTB_QUERY ***/;
	ResultSet rs = st.executeQuery(newQuery);
	
	GetHandler myGetHandler = new GetHandler();	
	
	/*** NTB_COLUMNDEF ***/
	
	// loop through the ResultSet from the Database and set values to myGetHandler
	Record curRecord;
	while ( rs.next() ) 
	{		
		curRecord = myGetHandler.createNewRecord(rs.getString("/*** NTB_KEY ***/"));
		
		/*** NTB_RECORDDEF ***/
		
		myGetHandler.addRecord(curRecord);
	}
	
	myGetHandler.writeToClient(response);
	
	rs.close();
	con.close();
%>

