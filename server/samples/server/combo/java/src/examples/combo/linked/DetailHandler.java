package examples.combo.linked;

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

public class DetailHandler extends HttpServlet 
{
	private String whereClause = "";
	
	/* 
	 * This servlet is used as a Datasource for the combo. When the combo is initialized,
	 * the get handler servlet is called and expected to return a properly formatted
	 * xml stream. We have provided all the necessary functionality to do this without actually
	 * requiring you to construct XML. Simply interface with your datasource and use the provided
	 * classes in the package com.nitobi.server.handler to create the necessary output.
	 * 
	 * This sample uses a custom parameter to filter the detail Combo.  You can
	 * set custom query string parameters on the client side using the
	 * Javascript API.
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
			String newQuery = "SELECT * FROM tblprovinces " + whereClause;
			response.getWriter().write(newQuery);
			ResultSet rs = st.executeQuery(newQuery);
			
			GetHandler myGetHandler = new GetHandler();	
			myGetHandler.populate(rs, "ProvinceID");
			
			
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
	 * This is a helper method to get the needed parameters from the request.
	 */
	private void getRequestParams(HttpServletRequest request)
	{
		String whereClauseParam=request.getParameter("whereClause");
		if (whereClauseParam==null)
		{
			whereClauseParam="";
		} 
		else 
		{
			whereClause = "WHERE " + whereClauseParam;
		}

	}
}
