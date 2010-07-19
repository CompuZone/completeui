<%@ page import="java.sql.*" %>
<%@ page import="eba.gethandler.*" %>

<%
	// This file is used as a Get Handler for the Grid control. When the grid is initialized,
	// the get handler JSP page is called.  The JSP page returns a properly formatted
	// xml stream. We have provided all the necessary functionality to do this without actually
	// requiring you to construct XML. Simply interface with your datasource and use the provided
	// classes in the eba.gethandler package to create the necessary output.

	// Gethandlers must be able to output xml when called without any parameters. If paging is used,
	// they need to respond to the parameters "pagesize" and "StartRecordIndex" ie:

	// gethandler.asp?pagesize=15&StartRecordIndex=101&sortcolumn&sortdirection

	// In this example above, the grid has asked the gethandler to return 15 records, beginning at record 101.
	// 101 is not an ID, its the ordinal position of the starting record.	
	
	// Server side sorting is also possible, and so the gethandler may need to respond to the parameters
	// "sortcolumn" and "sortdirection" ie:

	// gethandler.asp?pagesize=50&StartRecordIndex=99&sortcolumn=FirstName&sortdirection=ASC

	// In this example, the grid has asked the gethandler to return 15 records, beginning at record 0, 
	// from the database sorted by the FirstName column in ascending order.
	
	String startParameter=request.getParameter("StartRecordIndex");
	if (startParameter==null)
		{
			startParameter="0";         // define default value for parameter start if this page is called without parameter start.
		}
	int ordinalStart = Integer.parseInt(startParameter);	

	String pagesizeParameter=request.getParameter("PageSize");
	if ((pagesizeParameter==null)||(0 == pagesizeParameter.length()))
		{
			pagesizeParameter="15";  // define default value for parameter pagesize if this page is called without parameter pagesize.
		}
	int pageSize = Integer.parseInt(pagesizeParameter);

	String sortColumn=request.getParameter("SortColumn");
	if ((sortColumn==null) || (0 == sortColumn.length()))
		{
			sortColumn="ContactID";
		}
	
	String sortDirection=request.getParameter("SortDirection");
	if ((sortDirection==null) || (0 == sortDirection.length()))
		{
			sortDirection="ASC";
		}
	
	/**************************************************************8
		Figure out the path to the mdb file that has the needed data

		We need to create:
		C:\Program Files\Nitobi\Grid V3.X\Jsp Trial\samples\livescrolling\data\ContactsFlatfile3k.mdb

		This breaks down to the following:
		[C:\Program Files\Nitobi\Grid V3.X\Jsp Trial\]+[samples\livescrolling]+[\data\ContactsFlatfile3k.mdb]

		The above breakdown maps to the following:
		getRealPath("/") ---> [C:\Program Files\Nitobi\Grid V3.X\Jsp Trial\]
		getServletPath()  ---> [samples\LiveScrolling] (get.jsp is removed)
		hard code string ---> [\data\ContactsFlatfile3k.mdb]

	*/


	// from the URL we need to remove the first three tokens [http:/][/localhost:8080][/v32JSPSamples/]
	// Token 4 to N need to be added to the value returned from getRealPath
	// Also the last token is the name of the get handler
	String pathAfterContext = request.getServletPath();
	// remove the get.jsp part.
	pathAfterContext        = pathAfterContext.substring(0,pathAfterContext.lastIndexOf("/")).replace('/','\\');


	// get the complete path on the server of our database.
	String path = config.getServletContext().getRealPath("/") + pathAfterContext + "\\data\\ContactsFlatfile3k.mdb";
	
	// get the database connection
	Class.forName("sun.jdbc.odbc.JdbcOdbcDriver").newInstance();
	Connection con=DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");

	Statement st=con.createStatement();
	
	// this is complicated due to ms access limited SQL	
	String newQuery = "SELECT * FROM ( SELECT TOP " + pageSize + " * FROM (SELECT TOP " + (pageSize+ordinalStart)+
					  " * FROM tblContacts3k ORDER BY " + sortColumn + " " + sortDirection +
					  ") ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Desc"))?"Asc":"Desc") + 
					  ") ORDER BY " + sortColumn + " " + sortDirection + ";";
	
	ResultSet rs = st.executeQuery(newQuery);
	
	// Lets Set up the Output
	GetHandler myGetHandler = new GetHandler(response,out);		

	// First we define how many columns we are sending in each record, and name each field.	
	
	myGetHandler.defineField("ContactName");
	myGetHandler.defineField("ContactEmail");
	myGetHandler.defineField("JobTitle");
	myGetHandler.defineField("CompanyName");
	myGetHandler.defineField("PhoneNumber");
	myGetHandler.defineField("Address");
	
	// loop through the ResultSet from the Database and set values to myGetHandler
	Record curRecord;
	String customerID;
	int addedRecords=0;
	while ( rs.next() && addedRecords<pageSize ) 
	{				

			customerID = rs.getString("ContactID");
			curRecord=myGetHandler.createNewRecord(customerID);
		
			curRecord.setField("ContactName",	rs.getString("ContactName"));		
			curRecord.setField("ContactEmail",	rs.getString("ContactEmail"));
			curRecord.setField("JobTitle",		rs.getString("JobTitle"));
			curRecord.setField("CompanyName",	rs.getString("CompanyName"));
			curRecord.setField("PhoneNumber",	rs.getString("PhoneNumber"));
			curRecord.setField("Address",		rs.getString("Address"));
			
			myGetHandler.addRecord(curRecord);
			addedRecords++;
	}
	
	myGetHandler.writeToClient("UTF-8");

	// clean up 
	rs.close();
	st.close();
	con.close();

%>