package com.nitobi.jsf.example.servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.util.Map;
import java.util.HashMap;
import java.sql.*;

/**
 * User: eric
 * Date: Sep 7, 2008
 * Time: 3:13:55 PM
 */
public class BaseServlet extends HttpServlet {

    protected static Logger logger = Logger.getLogger(BaseServlet.class.getName());

    protected static final String START_RECORD_INDEX = "StartRecordIndex";
    protected static final String PAGE_SIZE = "PageSize";
    protected static final String SEARCH_SUBSTRING = "SearchSubstring";


    static {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
        } catch (InstantiationException e) {
            System.out.println("Could not instantiate the database driver: " + e.getMessage());
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            System.out.println("Could not access the database driver: " + e.getMessage());
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            System.out.println("Could not find the database driver: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    protected Connection getConnection() throws SQLException{
        Connection connection = null;
        try {
                connection = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?user=nitobi");
                if (logger.isLoggable(Level.FINE)) {
                    logger.fine("Obtained database connection");
                }
            } catch (SQLException e) {
                logger.severe("Could not obtain the connection object: " + e.getMessage());
                throw e;
            }
        return connection;
    }

    protected void doCleanup(Connection conn, Statement st, ResultSet rs) {
        if(conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                logger.warning("Could not close the connection: " + e.getMessage());
            }
        }

        if(st != null) {
            try {
                st.close();
            } catch (SQLException e) {
                logger.warning("Could not close the statement: " + e.getMessage());
            }
        }

        if(rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                logger.warning("Could not close the result set: " + e.getMessage());
            }
        }
    }

    /*
	 * This is a helper method to get the needed parameters from the request.
	 * When the request is issued by the Combo on the client side to this servlet, the Combo
	 * may include some query string parameters that can be used to determine the subset of data
	 * to return.
	 * Gethandlers must be able to output xml when called without any parameters. If paging is used,
	 * they need to respond to the parameters "pagesize" and "StartRecordIndex" ie:
	 *
	 * 			gethandler.asp?pagesize=15&StartRecordIndex=101&sortcolumn&sortdirection
	 *
	 * In this example above, the combo has asked the gethandler to return 15 records, beginning at record 101.
	 * 101 is not an ID, its the ordinal position of the starting record.
	 */
	protected Map<String, String> getComboRequestParams(HttpServletRequest request)
	{
		Map<String, String> params = new HashMap<String, String>();

        String startParameter = request.getParameter(START_RECORD_INDEX);
		if (startParameter == null)
		{
			startParameter = "0";         // define default value for parameter start if this page is called without parameter start.
		}
        params.put(START_RECORD_INDEX, startParameter);


        String pageSizeParam=request.getParameter(PAGE_SIZE);
		if (pageSizeParam==null)
		{
			pageSizeParam="15";
		}
        params.put(PAGE_SIZE, pageSizeParam);

        String searchSubStringParam=request.getParameter(SEARCH_SUBSTRING);
        params.put(SEARCH_SUBSTRING, searchSubStringParam);

        return params;
    }
    
}
