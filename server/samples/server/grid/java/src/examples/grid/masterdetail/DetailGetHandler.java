package examples.grid.masterdetail;

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

public class DetailGetHandler extends HttpServlet 
{
	private String startParameter;
	private String pagesizeParameter;
	private String sortColumn;
	private String sortDirection;
	
	/* 
	 * This servlet is used as a Get Handler for the Grid component. When the grid is initialized,
	 * a request is made to the url specified by the gethandler attribute of the Grid declaration.  
	 * This servlet returns a properly formatted xml stream. We have provided all the necessary 
	 * functionality to do this without actually requiring you to construct XML. Simply interface 
	 * with your datasource and use the provided classes in the com.nitobi.server.handler package to 
	 * create the necessary output.
	 * 
	 * This sample uses a custom parameter to filter the detail Grid.  You can
	 * set custom query string parameters on the client side using the
	 * Javascript API.  See nitobi.data.DataTable.setGetHandlerParameter()
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		getRequestParams(request);
		String whereClause;
		String whereClauseqry=request.getParameter("CustomerID");	
		if ((whereClauseqry==null) || (0 == whereClauseqry.length()))
		{
			whereClause = "";
		}
		else
		{
			whereClause=" WHERE CustomerID LIKE '" + whereClauseqry + "' ";	
		}
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM tblorders " + whereClause +
				"ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
								" LIMIT " + startParameter + ", " + pagesizeParameter;
			ResultSet rs = st.executeQuery(newQuery);
			
			GetHandler myGetHandler = new GetHandler();			
			myGetHandler.populate(rs, "OrderID", new Boolean(false));
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
	
	/*
	 * When the request is issued by the Grid on the client side to this servlet, the Grid
	 * may include some query string parameters that can be used to determine the subset of data
	 * to return.
	 * Gethandlers must be able to output xml when called without any parameters. If paging is used,
	 * they need to respond to the parameters "pagesize" and "StartRecordIndex" ie:
	 *
	 * 			gethandler.asp?pagesize=15&StartRecordIndex=101&sortcolumn&sortdirection
	 *
	 * In this example above, the grid has asked the gethandler to return 15 records, beginning at record 101.
	 * 101 is not an ID, its the ordinal position of the starting record.	
	
	 * Server side sorting is also possible, and so the gethandler may need to respond to the parameters
	 * "sortcolumn" and "sortdirection" ie:
	 * 
	 * 		gethandler.asp?pagesize=50&StartRecordIndex=99&sortcolumn=FirstName&sortdirection=ASC
	 */
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
			sortColumn = "OrderID";
		}
		
		sortDirection = request.getParameter("SortDirection");
		if ((sortDirection == null) || (0 == sortDirection.length()))
		{
			sortDirection = "ASC";
		}
	}
}
