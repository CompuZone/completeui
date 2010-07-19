<%@ page import="java.sql.*" %>
<%@ page import="eba.gethandler.Record" %>
<%@ page import="eba.savehandler.SaveHandler" %>

<%
	/** *******************************
	 This file is used as a Save Handler for the Grid control. When the user clicks
	 the save button in index.htm a datagram is sent to this JSP page.
	 The JSP page in turn looks at each update, insert and delete in the datagram and processes them accordingly.

	 We have provided all the necessary functionality in the SaveHandler class to extract any of the update instructions.
	 For more details please have a look at our shipped online help under Reference/Server
	 *********************************** */
	 
	String pathAfterContext = request.getServletPath();
    pathAfterContext        = pathAfterContext.substring(0,pathAfterContext.lastIndexOf("/")).replace('/','\\');

	// get the complete path on the server of our database.
	String path = config.getServletContext().getRealPath("/") + pathAfterContext + "\\data\\ContactsFlatfile3k.mdb";

	// get the database connection
	Class.forName("sun.jdbc.odbc.JdbcOdbcDriver").newInstance();
	Connection con=DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");

	// get the ResultSet of the table tblPricing in our database
	Statement st=con.createStatement();
	
	// Create the eBusiness Applications' class 'SaveHandler'. This class is defined in ebaxmlconverter.jar
	SaveHandler mySaveHandler=new SaveHandler(request,out);
	
	// Begin by processing the inserts
	Record[] insertRecords = mySaveHandler.getInsertRecords();
	for (int i=0; i< insertRecords.length; i++) {
		String sql="INSERT INTO tblContacts3k (ContactName, ContactEmail, JobTitle, CompanyName, PhoneNumber, Address) VALUES (";

		sql+= "'" + insertRecords[i].getField("ContactName").replaceAll("'","''") 	+ "',";
		sql+= "'" + insertRecords[i].getField("ContactEmail").replaceAll("'","''") 	+ "',";
		sql+= "'" + insertRecords[i].getField("JobTitle").replaceAll("'","''") 		+ "',"; 
		sql+= "'" + insertRecords[i].getField("CompanyName").replaceAll("'","''") 	+ "',";
		sql+= "'" + insertRecords[i].getField("PhoneNumber").replaceAll("'","''") 	+ "',";
		sql+= "'" + insertRecords[i].getField("Address").replaceAll("'","''") 		+ "'";
		sql+= "); ";
		st.executeUpdate(sql);
	}
	
	// Continue by processing our updates
	Record[] updateRecords = mySaveHandler.getUpdateRecords();
	for (int i=0; i< updateRecords.length; i++) {
	
		String sql = "UPDATE tblContacts3k ";		
		sql+= "SET ContactName 	= '" + updateRecords[i].getField("ContactName").replaceAll("'","''") 	+ "', ";	 
		sql+= "ContactEmail 	= '" + updateRecords[i].getField("ContactEmail").replaceAll("'","''") 	+ "', ";     
		sql+= "JobTitle 		= '" + updateRecords[i].getField("JobTitle").replaceAll("'","''") 		+ "', ";      
		sql+= "CompanyName 		= '" + updateRecords[i].getField("CompanyName").replaceAll("'","''") 	+ "', ";         
		sql+= "PhoneNumber 		= '" + updateRecords[i].getField("PhoneNumber").replaceAll("'","''") 	+ "', ";
		sql+= "Address 			= '" + updateRecords[i].getField("Address").replaceAll("'","''") 		+ "' ";    

		sql+=" WHERE ContactID = " + updateRecords[i].getID();
		st.executeUpdate(sql);
	}
	
	// Finish by processing our deletes
	Record[] deleteRecords = mySaveHandler.getDeleteRecords();
	for (int i=0; i< deleteRecords.length; i++) {
		String sql = "DELETE FROM tblContacts3k WHERE ContactID = " + deleteRecords[i].getID();
		st.executeUpdate(sql);
	}
	

	st.close();
	con.close();	

	// reports back to the Grid that the update has successfully been completed
	mySaveHandler.writeToClient();
	    	
%>