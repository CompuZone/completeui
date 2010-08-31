/**
 * User: Eric Buitenhuis 
 * Date: Jun 3, 2008
 * Time: 12:08:33 AM
 */

package com.nitobi.jsf.example.backing.combo;

import com.nitobi.beans.params.ComboParams;
import com.nitobi.jsf.event.NitobiGetEvent;
import com.nitobi.server.handler.GetHandler;

import java.sql.*;
import java.util.Map;

/**
 * ComboBean
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class ComboBean {

    public String populateNames(NitobiGetEvent event) {

        Map parameterMap = event.getParams();
        GetHandler gethandler = event.getGethandler();

        ComboParams params = new ComboParams(
                (String) parameterMap.get(ComboParams.COMBO_ID),
                (String) parameterMap.get(ComboParams.LAST_STRING),
                (String) parameterMap.get(ComboParams.PAGE_SIZE),
                (String) parameterMap.get(ComboParams.SEARCH_SUBSTRING),
                (String) parameterMap.get(ComboParams.STARTING_RECORD_INDEX));

        /*
        * Grab the combo parameters from the base class
        */
        ResultSet rs = null;
        Statement st = null;
        Connection conn = null;
        try {
            // get the database connection
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?user=nitobi");
            st = conn.createStatement();
            String newQuery = "SELECT * FROM tblcontacts3k WHERE ContactName LIKE '"
                    + params.getSearchSubstring()
                    + "%' LIMIT "
                    + params.getStartingRecordIndex()
                    + ","
                    + params.getPageSize();
            rs = st.executeQuery(newQuery);

            // The GetHandler acts as a intermediary class to help you
            // go from a ResultSet to XML response.  Here we populate the handler
            // from the SQL ResultSet.  You can also choose to define the fields
            // and add the records manually. Using method expressions, you don't
            // need to write the results back manually; it's done for you.

            gethandler.populate(rs, "ContactID");
        } catch (Exception ex) {
            gethandler.setErrorMessage(ex.getMessage());
        } finally {
            // clean up
            try {
                if (rs != null) {
                    rs.close();
                }
                if (st != null) {
                    st.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
            }
        }
        return null;
    }
}
