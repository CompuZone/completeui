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

public class MasterHandler extends HttpServlet 
{	
	/* 
	 * This servlet is used as a Datasource for the combo. When the combo is initialized,
	 * the get handler servlet is called and expected to return a properly formatted
	 * xml stream. We have provided all the necessary functionality to do this without actually
	 * requiring you to construct XML. Simply interface with your datasource and use the provided
	 * classes in the package com.nitobi.server.handler to create the necessary output.
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=nitobi");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM tblcountries";
			ResultSet rs = st.executeQuery(newQuery);
			
			GetHandler myGetHandler = new GetHandler();	
			myGetHandler.populate(rs, "CountryID", new Boolean(true));
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
		
}
