<%@ page import="java.sql.*" %>
<%@ page import="eba.gethandler.*" %>

<%
	
	String nodeId=request.getParameter("id");
	if (nodeId==null)
		{
			nodeId="0";         // define default value for the parent's ID.
		}

	String sortColumn = "RegionName";
	String tableName = "tblRegions";
	

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
	String path = config.getServletContext().getRealPath("/") + pathAfterContext + "\\WorldCountryRegions.mdb";
	
	// get the database connection
	Class.forName("sun.jdbc.odbc.JdbcOdbcDriver").newInstance();
	Connection con=DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");

	Statement st=con.createStatement();
	
	// this is complicated due to ms access limited SQL	
	String newQuery = "SELECT * FROM " + tableName + " WHERE RegionOwner = " + nodeId + " ORDER BY " + sortColumn + ";";
	
	ResultSet rs = st.executeQuery(newQuery);
	
	// Lets Set up the Output
	JspGetHandler myGetHandler = new JspGetHandler(response,out);		

	// These are the required fields 	
	
	myGetHandler.defineField("id");
	myGetHandler.defineField("label");
	myGetHandler.defineField("nodetype");
	myGetHandler.defineField("haschildren");
	// These are optional, @url is used for frame targeting, and @flag is used when
	// the sidebar is turned on.
	// myGetHandler.defineField("url");
	// myGetHandler.defineField("flag");

	// You can also include any other kind of metadata you wish:
	// myGetHandler.defineField("arbitraryMetadata");
	
	// loop through the ResultSet from the Database and set values to myGetHandler
	Record curRecord;
	String customerID;
	while ( rs.next()) 
	{				
		
		String regionId = rs.getString("RegionID");
		curRecord=myGetHandler.createNewRecord(regionId);
	
		curRecord.setField("id",	regionId);		
		curRecord.setField("label",	rs.getString("RegionName"));
		
		// Here we use an SQL query to determine whether there are children for this node.
		Statement isNodeStatement=con.createStatement();
		String isNodeQuery = "SELECT COUNT(1) as childcount FROM " + tableName + " WHERE RegionOwner = " + regionId + ";";
		ResultSet isNode = isNodeStatement.executeQuery(isNodeQuery);
		isNode.next();
		
		// If there are children, then it is a node and has children.
		// (in other situations you may wish to be able to describe nodes that have
		// no children)
		if (isNode.getInt("childcount") > 0)
		{
			curRecord.setField("nodetype", "node");
			curRecord.setField("haschildren", "true");
		} 
		else
		{
			curRecord.setField("nodetype", "leaf");
			curRecord.setField("haschildren","false");
		}
		
		myGetHandler.addRecord(curRecord);
	}
	
	myGetHandler.writeToClient("UTF-8");

	// clean up 
	rs.close();
	st.close();
	con.close();


%>