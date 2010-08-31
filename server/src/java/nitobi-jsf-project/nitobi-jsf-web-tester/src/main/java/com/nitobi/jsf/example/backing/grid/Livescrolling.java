/**
 * User: Eric Buitenhuis 
 * Date: Jun 19, 2008
 * Time: 8:41:09 PM
 */

package com.nitobi.jsf.example.backing.grid;

import com.nitobi.jsf.event.NitobiGetEvent;
import com.nitobi.jsf.event.NitobiSaveEvent;
import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.handler.SaveHandler;
import com.nitobi.server.tools.Record;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Livescrolling
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class Livescrolling {

    private String sortColumn;
    private String sortDirection;
    private String startParameter;
    private String pagesizeParameter;

    public String handleGet(NitobiGetEvent event) {

        HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
        GetHandler gethandler = event.getGethandler();

        getRequestParams(request);
        try {
            // get the database connection
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
                    "user=nitobi");
            Statement st = conn.createStatement();
            String newQuery = "SELECT * FROM tblcontacts3k ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc")) ? "Asc" : "Desc") +
                    " LIMIT " + startParameter + ", " + pagesizeParameter;
            ResultSet rs = st.executeQuery(newQuery);

            // The GetHandler acts as a intermediary class to help you
            // go from a ResultSet to XML response.  Here we populate the handler
            // from the SQL ResultSet.  You can also choose to define the fields
            // and add the records manually.
            gethandler.populate(rs, "ContactID");

            rs.close();
            st.close();
            conn.close();
        }
        catch (Exception ex) {
            // do something
        }
        return "";
    }

    public String handleSave(NitobiSaveEvent event) {
        SaveHandler handler = event.getSaveHandler();
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
                    "user=nitobi");
            Statement st = conn.createStatement();
            Record[] insertRecords = handler.getInsertRecords();
            for (int i = 0; i < insertRecords.length; i++) {
                String sql = "INSERT INTO tblContacts3k (ContactName, ContactEmail, JobTitle, CompanyName, PhoneNumber, Address, Country) VALUES (";

                sql += "'" + insertRecords[i].getField("ContactName").replaceAll("'", "''") + "',";
                sql += "'" + insertRecords[i].getField("ContactEmail").replaceAll("'", "''") + "',";
                sql += "'" + insertRecords[i].getField("JobTitle").replaceAll("'", "''") + "',";
                sql += "'" + insertRecords[i].getField("CompanyName").replaceAll("'", "''") + "',";
                sql += "'" + insertRecords[i].getField("PhoneNumber").replaceAll("'", "''") + "',";
                sql += "'" + insertRecords[i].getField("Address").replaceAll("'", "''") + "',";
                sql += "'" + insertRecords[i].getField("Country").replaceAll("'", "''") + "'";
                sql += "); ";
                st.executeUpdate(sql);
            }
            Record[] updateRecords = handler.getUpdateRecords();
            for (int i = 0; i < updateRecords.length; i++) {

                String sql = "UPDATE tblContacts3k ";
                sql += "SET ContactName 	= '" + updateRecords[i].getField("ContactName").replaceAll("'", "''") + "', ";
                sql += "ContactEmail 	= '" + updateRecords[i].getField("ContactEmail").replaceAll("'", "''") + "', ";
                sql += "JobTitle 		= '" + updateRecords[i].getField("JobTitle").replaceAll("'", "''") + "', ";
                sql += "CompanyName 		= '" + updateRecords[i].getField("CompanyName").replaceAll("'", "''") + "', ";
                sql += "PhoneNumber 		= '" + updateRecords[i].getField("PhoneNumber").replaceAll("'", "''") + "', ";
                sql += "Address 			= '" + updateRecords[i].getField("Address").replaceAll("'", "''") + "', ";
                sql += "Country = '" + updateRecords[i].getField("Country").replaceAll("'", "''") + "' ";
                sql += " WHERE ContactID = " + updateRecords[i].getID();
                st.executeUpdate(sql);
            }
            Record[] deleteRecords = handler.getDeleteRecords();
            for (int i = 0; i < deleteRecords.length; i++) {
                String sql = "DELETE FROM tblContacts3k WHERE ContactID = " + deleteRecords[i].getID();
                st.executeUpdate(sql);
            }
            st.close();
            conn.close();

        }
        catch (Exception ex) {
            // do something
        }
        return "";
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
    private void getRequestParams(HttpServletRequest request) {
        startParameter = request.getParameter("StartRecordIndex");
        if (startParameter == null) {
            startParameter = "0";         // define default value for parameter start if this page is called without parameter start.
        }

        pagesizeParameter = request.getParameter("PageSize");
        if ((pagesizeParameter == null) || (0 == pagesizeParameter.length())) {
            pagesizeParameter = "15";  // define default value for parameter pagesize if this page is called without parameter pagesize.
        }

        sortColumn = request.getParameter("SortColumn");
        if ((sortColumn == null) || (0 == sortColumn.length())) {
            sortColumn = "ContactID";
        }

        sortDirection = request.getParameter("SortDirection");
        if ((sortDirection == null) || (0 == sortDirection.length())) {
            sortDirection = "ASC";
        }
    }
}
