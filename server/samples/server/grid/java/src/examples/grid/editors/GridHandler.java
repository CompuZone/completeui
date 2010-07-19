package examples.grid.editors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.ServletException;

import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.tools.Record;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class GridHandler extends HttpServlet 
{
	private String startParameter;
	private String sortColumn;
	private String sortDirection;
	private String pagesizeParameter;
	
	/* 
	 * This servlet is used as a Get Handler for the Grid component. When the grid is initialized,
	 * a request is made to the url specified by the gethandler attribute of the Grid declaration.  
	 * This servlet returns a properly formatted xml stream. We have provided all the necessary 
	 * functionality to do this without actually requiring you to construct XML. Simply interface 
	 * with your datasource and use the provided classes in the com.nitobi.server.handler package to 
	 * create the necessary output.
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		getRequestParams(request);
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM tblproducts ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
								" LIMIT " + startParameter + ", " + pagesizeParameter;
			ResultSet rs = st.executeQuery(newQuery);
			
			// Now that we have the ResultSet, we can populate our GetHandler.
			// The GetHandler class has a populate() method that takes a ResultSet
			// and automatically defines the fields and adds records, but for this
			// example, we need to do those steps manually because we want to add
			// data that isn't in the ResultSet.  For example, we define a ProductIcon
			// field and later set it to be docicon.gif.
			GetHandler myGetHandler = new GetHandler();			
			myGetHandler.defineField("ProductName");
			myGetHandler.defineField("ProductCategoryName");
			myGetHandler.defineField("ProductSku");
			myGetHandler.defineField("ProductPrice");
			myGetHandler.defineField("ProductQuantityPerUnit");
			myGetHandler.defineField("ProductLink");  // hyperlink url
			myGetHandler.defineField("LastUpdated"); // a date field
			myGetHandler.defineField("ProductIcon"); // the image for the icon on each row
			myGetHandler.defineField("BulkAction"); // for the checkbox
			myGetHandler.defineField("ProductPassword"); //for the password field
			myGetHandler.defineField("ButtonText");	// The label on each button		
			
			// loop through the ResultSet from the Database and set values to myGetHandler
			Record curRecord;
			String customerID;
			int addedRecords = 0;
			while ( rs.next() && addedRecords < Integer.parseInt(pagesizeParameter)) 
			{				
				customerID = rs.getString("ProductID");
				curRecord=myGetHandler.createNewRecord(customerID);

				curRecord.setField("ProductIcon",	"docicon.gif");		
				curRecord.setField("ButtonText",	"I'm a button");
				curRecord.setField("ProductPassword",	"opensesame");
				curRecord.setField("ProductLink",	"http://www.chemicalproductstuff.com");			
				curRecord.setField("BulkAction",	"no");
						
				curRecord.setField("ProductName",	rs.getString("ProductName"));		
				curRecord.setField("ProductCategoryName",	rs.getString("ProductCategoryName"));
				curRecord.setField("ProductSku",	rs.getString("ProductSku"));
				curRecord.setField("ProductPrice",	rs.getString("ProductPrice"));
				curRecord.setField("ProductQuantityPerUnit",	rs.getString("ProductQuantityPerUnit"));
				curRecord.setField("LastUpdated",	"2006-09-14");
							
				myGetHandler.addRecord(curRecord);
				addedRecords++;
			}
	
			// clean up 
			rs.close();
			st.close();
			conn.close();
			// When we're done, we write out the GetHandler to the response as XML.
			myGetHandler.writeToClient(response);
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
			sortColumn = "ProductID";
		}
		
		sortDirection = request.getParameter("SortDirection");
		if ((sortDirection == null) || (0 == sortDirection.length()))
		{
			sortDirection = "ASC";
		}
	}
}
