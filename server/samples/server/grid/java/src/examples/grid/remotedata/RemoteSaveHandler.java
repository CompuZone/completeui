package examples.grid.remotedata;

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

public class RemoteSaveHandler extends HttpServlet 
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
			for (int i=0; i< insertRecords.length; i++) 
			{
				String sql="INSERT INTO tblproducts (ProductName, ProductSku, ProductPrice, ProductQuantityPerUnit, ProductCategoryName) VALUES (";	
				sql+= "'" + insertRecords[i].getField("ProductName").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("ProductSku").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("ProductPrice").replaceAll("'","''") 		+ "',"; 
				sql+= "'" + insertRecords[i].getField("ProductQuantityPerUnit").replaceAll("'","''") 	+ "',";
				sql+= "'" + insertRecords[i].getField("ProductCategoryName").replaceAll("'","''") 	+ "'";
				sql+= "); ";
				st.executeUpdate(sql);
			}
			
			// Continue by processing our updates
			Record[] updateRecords = handler.getUpdateRecords();
			for (int i=0; i< updateRecords.length; i++) 
			{
				String sql = "UPDATE tblproducts ";		
				sql+= "SET ProductName 	= '" + updateRecords[i].getField("ProductName").replaceAll("'","''") 	+ "', ";	 
				sql+= "ProductCategoryName 	= '" + updateRecords[i].getField("ProductCategoryName").replaceAll("'","''") 	+ "', ";     
				sql+= "ProductSku 		= '" + updateRecords[i].getField("ProductSku").replaceAll("'","''") 		+ "', ";      
				sql+= "ProductPrice 		= '" + updateRecords[i].getField("ProductPrice").replaceAll("'","''") 	+ "', ";         
				sql+= "ProductQuantityPerUnit 		= '" + updateRecords[i].getField("ProductQuantityPerUnit").replaceAll("'","''") 	+ "' ";
	
				sql+=" WHERE ProductID = " + updateRecords[i].getID();
				st.executeUpdate(sql);
			}
			
			// Finish by processing our deletes
			Record[] deleteRecords = handler.getDeleteRecords();
			for (int i=0; i< deleteRecords.length; i++) 
			{
				String sql = "DELETE FROM tblproducts WHERE ProductID = " + deleteRecords[i].getID();
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
