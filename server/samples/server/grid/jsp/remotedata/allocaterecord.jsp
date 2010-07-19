<%@ page import="java.sql.*" %>
<%
	// This file is used to return the next available primary key for the table,
	
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

	String randomNumber=request.getParameter("rnd");
	if (randomNumber==null)
		{
			randomNumber="123456789";         // define default value for parameter start if this page is called without parameter start.
		}


	// from the URL we need to remove the first three tokens [http:/][/localhost:8080][/v32JSPSamples/]
	// Token 4 to N need to be added to the value returned from getRealPath
	// Also the last token is the name of the get handler
	String pathAfterContext = request.getServletPath();
	// remove the get.jsp part.
	pathAfterContext        = pathAfterContext.substring(0,pathAfterContext.lastIndexOf("/")).replace('/','\\');

	// get the complete path on the server of our database.
	String path = config.getServletContext().getRealPath("/") + pathAfterContext + "\\data\\GeneralProducts.mdb";
	
	// get the database connection
	Class.forName("sun.jdbc.odbc.JdbcOdbcDriver").newInstance();
	Connection con=DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");

	Statement st=con.createStatement();
	
	String newQuery = "INSERT INTO tblproducts (ProductName) VALUES ('" + randomNumber + "')";

	st.executeUpdate(newQuery);
	
	newQuery = "SELECT ProductID FROM tblproducts WHERE ProductName LIKE '" + randomNumber + "';";
	
	ResultSet rs = st.executeQuery(newQuery);
	
	String ProductID = "none";
	
	while ( rs.next() ) 
	{				

			ProductID = rs.getString("ProductID");
	}	
	
	newQuery = "UPDATE tblproducts SET ProductName = '' WHERE ProductID LIKE " + ProductID;

	st.executeUpdate(newQuery);	

	st.close();

	// clean up 
	out.println(ProductID);
	con.close();

%>