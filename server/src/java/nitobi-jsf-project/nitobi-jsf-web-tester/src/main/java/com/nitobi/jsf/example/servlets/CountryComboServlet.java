package com.nitobi.jsf.example.servlets;

import com.nitobi.server.handler.GetHandler;
import com.nitobi.exception.NitobiException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Map;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

/**
 * User: Eric Buitenhuis
 * Date: Jun 22, 2008
 * Time: 4:06:13 PM
 */

public class CountryComboServlet extends BaseServlet {


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map<String, String> params = getComboRequestParams(request);

        String searchSubstring = params.get(SEARCH_SUBSTRING);

        Connection connection = null;
        try {
            connection = getConnection();
        } catch (SQLException e) {
            log("Could not get the Connection object.");
            throw new ServletException("Could not get the Connection object for the City data: " + e.getMessage());
        }

        StringBuffer sb = new StringBuffer();
        sb.append("select * from country where 1=1 ");

        if(searchSubstring != null && !searchSubstring.equals("")) {
            sb.append("and Name like '").append(searchSubstring).append("%' ");
        }
        sb.append("order by Code ");
        sb.append("limit ").append(params.get(START_RECORD_INDEX)).append(",").append(params.get(PAGE_SIZE));

        Statement statement = null;
        ResultSet resultSet = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            doCleanup(connection, statement, null);
            throw new ServletException("Could not create a statement object: " + e.getMessage());
        }

        try {
            log("Executing Query: " + sb.toString());
            resultSet = statement.executeQuery(sb.toString());
        } catch (SQLException e) {
            doCleanup(connection, statement, resultSet);
            throw new ServletException("Could not create a statement object: " + e.getMessage());
        }

        GetHandler gethandler = new GetHandler();

        try {

            gethandler.populate(resultSet, "Code");
        } catch (NitobiException e) {
            doCleanup(connection, statement, resultSet);
            throw new ServletException("Could not populate the gethandler: " + e.getMessage());
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
