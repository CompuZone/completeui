<%@ page import="java.sql.*" %>
<%@ page import="eba.gethandler.*" %>

<%
	
	String type = request.getParameter("type");
	String key = request.getParameter("key");
	String key2 = request.getParameter("key2");

	// get the database connection
	Class.forName("com.mysql.jdbc.Driver").newInstance();
	Connection con=DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1","root","");
	Statement st=con.createStatement();
	
	// this is complicated due to ms access limited SQL	
	String newQuery = "";
	
	if (type.equals("continent")) {
		newQuery = "SELECT DISTINCT(Region) FROM country WHERE Continent = '" + key + "' ORDER BY Region;";
	} else if (type.equals("region")) {
		newQuery = "SELECT * FROM country WHERE Region = '" + key + "' ORDER BY Name;";
	} else if (type.equals("country")) {
		newQuery = "SELECT DISTINCT(District),CountryCode FROM city WHERE CountryCode = '" + key + "' ORDER BY District;";
	} else { // if (type.equals("district"))
		newQuery = "SELECT * FROM city WHERE District = '" + key + "' AND CountryCode = '" + key2 + "' ORDER BY Name;";
	}

	ResultSet rs = st.executeQuery(newQuery);
	
	// Lets Set up the Output
	JspGetHandler myGetHandler = new JspGetHandler(response,out);		

	// These are the required fields 	
	
	// Don't send up an id field because we have no globally unique ids.
	
	// myGetHandler.defineField("id");
	myGetHandler.defineField("label");
	myGetHandler.defineField("nodetype");
	myGetHandler.defineField("haschildren");
	// These are optional, @url is used for frame targeting, and @flag is used when
	// the sidebar is turned on.
	// myGetHandler.defineField("url");
	// myGetHandler.defineField("flag");

	// Some metadata we'll need for this tree
	myGetHandler.defineField("key");
	myGetHandler.defineField("key2");
	myGetHandler.defineField("type");
	// You can also include any other kind of metadata you wish:
	// myGetHandler.defineField("arbitraryMetadata");
	
	String nodeKeyColumn = "";
	String nodeKey2Column = "";
	String nodeLabelColumn = "";
	String nodeType = "";
	if (type.equals("continent"))
	{
		nodeKeyColumn = "Region";
		nodeLabelColumn = "Region";
		nodeType = "region";
	} else if (type.equals("region")) {
		nodeKeyColumn = "Code";
		nodeLabelColumn = "Name";
		nodeType = "country";
	} else if (type.equals("country")) {
		nodeKeyColumn = "District";
		nodeKey2Column = "CountryCode";
		nodeLabelColumn = "District";
		nodeType = "district";
	} else if (type.equals("district")) {
		nodeKeyColumn = "ID";
		nodeLabelColumn = "Name";
		nodeType = "city";
	}
	// loop through the ResultSet from the Database and set values to myGetHandler

	Record curRecord;
	while ( rs.next() ) 
	{				
		String nodeKey = rs.getString(nodeKeyColumn);
		curRecord=myGetHandler.createNewRecord(nodeKey);

		curRecord.setField("key",	 nodeKey);
		curRecord.setField("label", rs.getString(nodeLabelColumn));
		curRecord.setField("type", nodeType);
		
		if (nodeKey2Column != "") {
			curRecord.setField("key2", rs.getString(nodeKey2Column));
		} else {
			curRecord.setField("key2", "");
		}
		
		if (nodeType.equals("city")) {
			curRecord.setField("nodetype", "leaf");
			curRecord.setField("haschildren", "false");
		} else {
			curRecord.setField("nodetype",	 "node");
			curRecord.setField("haschildren", "true");
		}
		
		myGetHandler.addRecord(curRecord);
	}
	myGetHandler.writeToClient("UTF-8");

	// clean up 
	rs.close();
	st.close();
	con.close();




%>