package examples.tree.simple;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.tools.Record;

public class TreeHandler extends HttpServlet 
{
	/* 
	 * This servlet is used as a Get Handler for the Tree component. When a node from the tree
	 * is expanded, a request is made to the url specified in the gethandler attribute
	 * of the Tree declaration.  This servlet returns a properly formatted xml 
	 * stream based on the request. We have provided all the necessary functionality 
	 * to do this without actually requiring you to construct XML. Simply interface 
	 * with your datasource and use the provided classes in the 
	 * com.nitobi.server.handler package to create the necessary output.
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) 
		throws ServletException, IOException 
	{
		String nodeId = request.getParameter("id");
		if (nodeId==null)
		{
			nodeId="0";         // define default value for the parent's ID.
		}

		String sortColumn = "RegionName";
		String tableName = "tblregions";
		
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM " + tableName + " WHERE RegionOwner = " + nodeId + " ORDER BY " + sortColumn + ";";
			ResultSet rs = st.executeQuery(newQuery);
			
			// Lets Set up the Output
			GetHandler myGetHandler = new GetHandler();		
	
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
			while ( rs.next()) 
			{				
				String regionId = rs.getString("RegionID");
				curRecord=myGetHandler.createNewRecord(regionId);
			
				curRecord.setField("id",	regionId);		
				curRecord.setField("label",	rs.getString("RegionName"));
				
				// Here we use an SQL query to determine whether there are children for this node.
				Statement isNodeStatement = conn.createStatement();
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
			
			myGetHandler.writeToClient(response);
	
			// clean up 
			rs.close();
			st.close();
			conn.close();
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
	}
}
