<%@ page import="java.sql.*" %>
<%@ page import="com.nitobi.server.handler.GetHandler" %>
<%@ page import="com.nitobi.server.tools.Record" %>
<%@ include file="/*** NTB_CONNECTION_FILE ***/" %>
<%
	// This file is used as a Get Handler for the Grid control. When the grid is initialized,
	// the get handler JSP page is called.  The JSP page returns a properly formatted
	// xml stream. We have provided all the necessary functionality to do this without actually
	// requiring you to construct XML. Simply interface with your datasource and use the provided
	// classes in the com.nitobi.server.handler.* package to create the necessary output.
	
	// Server side sorting is also possible, and so the gethandler may need to respond to the parameters
	// "sortcolumn" and "sortdirection" ie:

	// grid.load.jsp?pagesize=50&StartRecordIndex=99&sortcolumn=FirstName&sortdirection=ASC

	
	String startParameter = request.getParameter("StartRecordIndex");
	if (startParameter == null)
	{
		startParameter = "0";
	}
	int ordinalStart = Integer.parseInt(startParameter);	

	String pagesizeParameter = request.getParameter("PageSize");
	if ((pagesizeParameter == null)||(0 == pagesizeParameter.length()))
	{
		pagesizeParameter = "15";
	}
	int pageSize = Integer.parseInt(pagesizeParameter);

	String sortColumn = request.getParameter("SortColumn");
	if ((sortColumn == null) || (0 == sortColumn.length()))
	{
		sortColumn = "/*** NTB_SORTCOLUMN ***/";
	}
	
	String sortDirection = request.getParameter("SortDirection");
	if ((sortDirection == null) || (0 == sortDirection.length()))
	{
		sortDirection = "/*** NTB_SORTDIRECTION ***/";
	}
	
	String tableName = "/*** NTB_TABLE ***/";
	
	Class.forName(/*** NTB_DBDRIVER ***/).newInstance();
	Connection con = DriverManager.getConnection(/*** NTB_CONNECTION_STRING ***/, /*** NTB_DBUSER ***/, /*** NTB_DBPASSWORD ***/);

	Statement st = con.createStatement();
	String newQuery = /*** NTB_QUERY ***/;
	ResultSet rs = st.executeQuery(newQuery);
	
	// The GetHandler object helps to format data from the server as XML that the Grid will understand.
	GetHandler myGetHandler = new GetHandler();	

	// First we define how many columns we are sending in each record and name each field.	
	/*** NTB_COLUMNDEF ***/
	
	// Next we loop through the RecordSet and create new com.nitobi.server.tools.Record objects, each one corresponding
	// to a row in the ResultSet.  We then add that Record to our GetHandler.  When we call GetHandler#writeToClient, those
	// Records will be used to create an XML document to be consumed by the Grid on the client side.
	Record curRecord;
	String key;
	int addedRecords = 0;
	while ( rs.next() && addedRecords<pageSize ) 
	{				
		key = rs.getString("/*** NTB_KEY ***/");
		curRecord = myGetHandler.createNewRecord(key);
	
		/*** NTB_RECORDDEF ***/
		
		myGetHandler.addRecord(curRecord);
		addedRecords++;
	}
	
	myGetHandler.writeToClient(response);

	// clean up 
	rs.close();
	st.close();
	con.close();

%>