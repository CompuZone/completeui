package examples.treegrid.betademo;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;

import com.nitobi.server.handler.GetHandler;

public class GetOrdersHandler extends HttpServlet 
{
	private String startParameter;
	private String pagesizeParameter;
	private String sortColumn;
	private String sortDirection;
	private String foreignKeyValue;
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException 
	{
		getRequestParams(req);
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi&password=Sm0kie8");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM tblorders WHERE CustomerID=" + foreignKeyValue + " ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
								" LIMIT " + startParameter + ", " + pagesizeParameter;
			ResultSet rs = st.executeQuery(newQuery);
			
			// The GetHandler acts as a intermediary class to help you
			// go from a ResultSet to XML response.  Here we populate the handler
			// from the SQL ResultSet.  You can also choose to define the fields
			// and add the records manually.
			GetHandler myGetHandler = new GetHandler();			
			myGetHandler.populate(rs, "OrderID", new Boolean(true));
			myGetHandler.setForeignKey("CustomerID");
			myGetHandler.setForeignKeyValue(foreignKeyValue);
			rs.close();
			st.close();
			conn.close();
			myGetHandler.setTotalRowCount(100);
			myGetHandler.writeToClient(resp);
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
	}
	
	private void getRequestParams(HttpServletRequest request)
	{
		startParameter = request.getParameter("StartRecordIndex");
		if (startParameter == null)
		{
			startParameter = "0";         // define default value for parameter start if this page is called without parameter start.
		}
	
		pagesizeParameter = request.getParameter("PageSize");
		if ((pagesizeParameter == null) || (0 == pagesizeParameter.length()))
		{
			pagesizeParameter = "15";  // define default value for parameter pagesize if this page is called without parameter pagesize.
		}
	
		sortColumn = request.getParameter("SortColumn");
		if ((sortColumn == null) || (0 == sortColumn.length()))
		{
			sortColumn = "CustomerID";
		}
		
		sortDirection = request.getParameter("SortDirection");
		if ((sortDirection == null) || (0 == sortDirection.length()))
		{
			sortDirection = "ASC";
		}
		foreignKeyValue = request.getParameter("CustomerID");
	}
}
