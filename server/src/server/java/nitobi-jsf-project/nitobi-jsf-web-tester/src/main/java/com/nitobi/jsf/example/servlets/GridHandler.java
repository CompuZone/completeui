package com.nitobi.jsf.example.servlets;

import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.handler.SaveHandler;
import com.nitobi.server.tools.Record;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;



public class GridHandler extends HttpServlet {

    private String sortColumn;
	private String sortDirection;
	private String startParameter;
	private String pagesizeParameter;

    /**
     * The doPost() method is perfectly suited to handle the saves for a given grid, since the save sends a form.
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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

    /**
     * The doGet() method is perfectly suited to handle the grid loads.
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getRequestParams(request);
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM tblcontacts3k ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
								" LIMIT " + startParameter + ", " + pagesizeParameter;
			ResultSet rs = st.executeQuery(newQuery);

			// The GetHandler acts as a intermediary class to help you
			// go from a ResultSet to XML response.  Here we populate the handler
			// from the SQL ResultSet.  You can also choose to define the fields
			// and add the records manually.
			GetHandler myGetHandler = new GetHandler();
			myGetHandler.populate(rs, "ContactID");

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
			sortColumn = "ContactID";
		}

		sortDirection = request.getParameter("SortDirection");
		if ((sortDirection == null) || (0 == sortDirection.length()))
		{
			sortDirection = "ASC";
		}
	}
}
