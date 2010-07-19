package examples.grid.livescrolling;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.nitobi.server.handler.SaveHandler;
import com.nitobi.server.tools.Record;

public class GridSaveHandler extends HttpServlet 
{
	/*
	 *  This servlet is used as a Save Handler for the Grid component. When the 
	 *  user clicks the save button on the Grid, a datagram is sent to 
	 *  the url specified by the savehandler attribute on the Grid declaration.  
	 *  This servlet looks at each update, insert and delete in the datagram 
	 *  and processes them accordingly.  We have provided all the necessary 
	 *  functionality in the SaveHandler class to extract any of the 
	 *  update instructions.
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		try
		{
			SaveHandler handler = new SaveHandler(request);
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi");
			Statement st = conn.createStatement();
			Record[] insertRecords = handler.getInsertRecords();
			for (int i=0; i< insertRecords.length; i++) {
				String sql="INSERT INTO tblContacts3k (ContactName, ContactEmail, JobTitle, CompanyName, PhoneNumber, Address, Country) VALUES (";

				sql+= "'" + insertRecords[i].getField("ContactName").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("ContactEmail").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("JobTitle").replaceAll("'","''") 		+ "',"; 
				sql+= "'" + insertRecords[i].getField("CompanyName").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("PhoneNumber").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("Address").replaceAll("'","''") 		+ "',";
				sql+= "'" + insertRecords[i].getField("Country").replaceAll("'","''") 		+ "'";
				sql+= "); ";
				st.executeUpdate(sql);
			}
			Record[] updateRecords = handler.getUpdateRecords();
			for (int i=0; i< updateRecords.length; i++) {
			
				String sql = "UPDATE tblContacts3k ";		
				sql+= "SET ContactName 	= '" + updateRecords[i].getField("ContactName").replaceAll("'","''") 	+ "', ";	 
				sql+= "ContactEmail 	= '" + updateRecords[i].getField("ContactEmail").replaceAll("'","''") 	+ "', ";     
				sql+= "JobTitle 		= '" + updateRecords[i].getField("JobTitle").replaceAll("'","''") 		+ "', ";      
				sql+= "CompanyName 		= '" + updateRecords[i].getField("CompanyName").replaceAll("'","''") 	+ "', ";         
				sql+= "PhoneNumber 		= '" + updateRecords[i].getField("PhoneNumber").replaceAll("'","''") 	+ "', ";
				sql+= "Address 			= '" + updateRecords[i].getField("Address").replaceAll("'","''") 		+ "', ";    
				sql += "Country = '" + updateRecords[i].getField("Country").replaceAll("'", "''") + "' ";
				sql+=" WHERE ContactID = " + updateRecords[i].getID();
				st.executeUpdate(sql);
			}
			Record[] deleteRecords = handler.getDeleteRecords();
			for (int i=0; i< deleteRecords.length; i++) {
				String sql = "DELETE FROM tblContacts3k WHERE ContactID = " + deleteRecords[i].getID();
				st.executeUpdate(sql);
			}
			st.close();
			conn.close();	

			// reports back to the Grid that the update has successfully been completed
			handler.writeToClient(response);
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
	}
}
