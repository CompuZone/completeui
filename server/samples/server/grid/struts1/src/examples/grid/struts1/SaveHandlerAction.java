package examples.grid.struts1;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.nitobi.server.handler.SaveHandler;
import com.nitobi.server.tools.Record;
import java.sql.*;

public class SaveHandlerAction extends Action 
{
	public ActionForward execute(ActionMapping mapping, ActionForm form, 
			HttpServletRequest request,HttpServletResponse response) throws java.lang.Exception
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
			// reports back to the Grid that the update has successfully been completed
			handler.writeToClient(response);
			st.close();
			conn.close();	
			return null;
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
		
	}
}
