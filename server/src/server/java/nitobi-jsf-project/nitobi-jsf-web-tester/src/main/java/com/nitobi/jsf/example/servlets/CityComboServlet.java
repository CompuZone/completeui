package com.nitobi.jsf.example.servlets;

import com.nitobi.server.handler.GetHandler;
import com.nitobi.exception.NitobiException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.Map;

/**
 * User: Eric Buitenhuis
 * Date: Jun 22, 2008
 * Time: 4:19:17 PM
 */

public class CityComboServlet extends BaseServlet {

    /**
     * Takes care of GET requests
     *
     * @param request
     * @param response
     *
     * @throws ServletException
     * @throws IOException
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Map<String, String> params = getComboRequestParams(request);

        String searchSubstring = params.get(SEARCH_SUBSTRING);

        Connection connection = null;
        try {
            connection = getConnection();
        } catch (SQLException e) {
            log("Could not get the Connection object.");
            throw new ServletException("Could not get the Connection object for the City data.");
        }

        StringBuffer sb = new StringBuffer();
        sb.append("select * from city where 1=1 ");

        if(searchSubstring != null && !searchSubstring.equals("")) {
            sb.append("and Name like '").append(searchSubstring).append("%' ");
        }
        sb.append("order by ID ");
        sb.append("limit ").append(params.get(START_RECORD_INDEX)).append(",").append(params.get(PAGE_SIZE));

        Statement statement = null;
        ResultSet resultSet = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            doCleanup(connection, statement, null);
            throw new ServletException("Could not create a statement object.");
        }

        try {
            log("Executing Query: " + sb.toString());
            resultSet = statement.executeQuery(sb.toString());
        } catch (SQLException e) {
            doCleanup(connection, statement, resultSet);
            throw new ServletException("Could not create a statement object.");
        }

        GetHandler gethandler = new GetHandler();

        try {

            gethandler.populate(resultSet, "ID");
        } catch (NitobiException e) {
            doCleanup(connection, statement, resultSet);
            throw new ServletException("Could not populate the gethandler.");
        }

        doCleanup(connection, statement, resultSet);

        try {
            gethandler.writeToClient(response);
        } catch (NitobiException e) {
            doCleanup(connection, statement, resultSet);
            throw new ServletException("Could not write the gethandler results.");
        }
    }
}
