/**
 * User: Eric Buitenhuis 
 * Date: Jun 22, 2008
 * Time: 12:41:49 PM
 */

package com.nitobi.jsf.example.backing.treegrid;

import com.nitobi.jsf.example.backing.BackingBase;
import com.nitobi.jsf.event.NitobiGetEvent;
import com.nitobi.jsf.event.NitobiSaveEvent;
import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.handler.SaveHandler;
import com.nitobi.server.tools.Record;

import javax.servlet.http.HttpServletRequest;
import javax.faces.FacesException;
import javax.faces.context.FacesContext;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Orders
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class Orders extends BackingBase {

    private String startParameter;
    private String pagesizeParameter;
    private String sortColumn;
    private String sortDirection;
    private String foreignKeyValue;

    public String getOrders(NitobiGetEvent event) {

        HttpServletRequest req = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
        GetHandler gethandler = event.getGethandler();
        getRequestParams(req);

        ResultSet rs = null;

        try {

            String newQuery = "SELECT * FROM tblorders WHERE CustomerID=" + foreignKeyValue + " ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc")) ? "Asc" : "Desc") +
                    " LIMIT " + startParameter + ", " + pagesizeParameter;
            rs = performQuery(newQuery, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

            // The GetHandler acts as a intermediary class to help you
            // go from a ResultSet to XML response.  Here we populate the handler
            // from the SQL ResultSet.  You can also choose to define the fields
            // and add the records manually.
            gethandler.populate(rs, "OrderID", true);
            gethandler.setForeignKey("CustomerID");
            gethandler.setForeignKeyValue(foreignKeyValue);
            gethandler.setTotalRowCount(100);
        }
        catch (Exception ex) {
            throw new FacesException(ex);
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                    closeResources();
                } catch (SQLException e) {
                    System.out.println("Could not close resources.");
                }
            }
        }

        return "success";
    }

    public String saveOrders(NitobiSaveEvent event) {
        SaveHandler handler = event.getSaveHandler();
        try {

            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Record[] insertRecords = handler.getInsertRecords();
            for (Record insertRecord : insertRecords) {
                String sql = "INSERT INTO tblorders (CustomerID, ProductName, OrderDate, ShippedDate) VALUES (";
                sql += "'" + insertRecord.getForeignKeyValue().replaceAll("'", "''") + "',";
                sql += "'" + insertRecord.getField("ProductName").replaceAll("'", "''") + "',";
                sql += "'" + insertRecord.getField("OrderDate").replaceAll("'", "''") + "',";
                sql += "'" + insertRecord.getField("ShippedDate").replaceAll("'", "''") + "'";
                sql += "); ";
                performUpdate(sql);
                //response.getWriter().print(sql);
            }
            Record[] updateRecords = handler.getUpdateRecords();
            for (Record updateRecord : updateRecords) {

                String sql = "UPDATE tblorders SET ";
                sql += "OrderDate 	= '" + updateRecord.getField("OrderDate").replaceAll("'", "''") + "', ";
                sql += "ShippedDate 	= '" + updateRecord.getField("ShippedDate").replaceAll("'", "''") + "', ";
                sql += "ProductName = '" + updateRecord.getField("ProductName").replaceAll("'", "''") + "' ";
                sql += " WHERE OrderID = " + updateRecord.getID();
                performUpdate(sql);
                //response.getWriter().print(sql);
            }
            Record[] deleteRecords = handler.getDeleteRecords();
            for (Record deleteRecord : deleteRecords) {
                String sql = "DELETE FROM tblorders WHERE OrderID = " + deleteRecord.getID();
                performUpdate(sql);
            }

            // reports back to the Grid that the update has successfully been completed
            //handler.writeToClient(response);
        } catch (Exception ex) {
            throw new FacesException(ex);
        } finally {
            closeResources();
        }
        return "success";
    }

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
            sortColumn = "CustomerID";
        }

        sortDirection = request.getParameter("SortDirection");
        if ((sortDirection == null) || (0 == sortDirection.length())) {
            sortDirection = "ASC";
        }
        foreignKeyValue = request.getParameter("CustomerID");
    }
}
