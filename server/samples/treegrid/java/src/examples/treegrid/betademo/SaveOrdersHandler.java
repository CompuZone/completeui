package examples.treegrid.betademo;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;

import com.nitobi.server.handler.SaveHandler;
import com.nitobi.server.tools.Record;

public class SaveOrdersHandler extends HttpServlet 
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
														  "user=nitobi&password=Sm0kie8");
			Statement st = conn.createStatement();
			Record[] insertRecords = handler.getInsertRecords();
			for (int i=0; i< insertRecords.length; i++) {
				String sql="INSERT INTO tblorders (CustomerID, ProductName, OrderDate, ShippedDate) VALUES (";
				sql+= "'" + insertRecords[i].getForeignKeyValue().replaceAll("'","''")		+ "',";
				sql+= "'" + insertRecords[i].getField("ProductName").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("OrderDate").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("ShippedDate").replaceAll("'","''") 	+ "'";
				sql+= "); ";
				st.executeUpdate(sql);
				response.getWriter().print(sql);
			}
			Record[] updateRecords = handler.getUpdateRecords();
			for (int i=0; i< updateRecords.length; i++) {
			
				String sql = "UPDATE tblorders SET ";		
				sql+= "OrderDate 	= '" + updateRecords[i].getField("OrderDate").replaceAll("'","''") 	+ "', ";	 
				sql+= "ShippedDate 	= '" + updateRecords[i].getField("ShippedDate").replaceAll("'","''") 	+ "', ";     
				sql+= "ProductName = '" + updateRecords[i].getField("ProductName").replaceAll("'","''") 	+ "' ";     	
				sql+=" WHERE OrderID = " + updateRecords[i].getID();
				st.executeUpdate(sql);
				//response.getWriter().print(sql);
			}
			Record[] deleteRecords = handler.getDeleteRecords();
			for (int i=0; i< deleteRecords.length; i++) {
				String sql = "DELETE FROM tblorders WHERE OrderID = " + deleteRecords[i].getID();
				st.executeUpdate(sql);
			}
			st.close();
			conn.close();	
	
			// reports back to the Grid that the update has successfully been completed
			//handler.writeToClient(response);
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
	}
}
