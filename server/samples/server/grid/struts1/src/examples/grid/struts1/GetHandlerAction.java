package examples.grid.struts1;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.nitobi.server.handler.GetHandler;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class GetHandlerAction extends Action 
{
	private String startParameter;
	private String pagesizeParameter;
	private String sortColumn;
	private String sortDirection;
	public ActionForward execute(ActionMapping mapping, ActionForm form, 
			HttpServletRequest request,HttpServletResponse response) throws java.lang.Exception
	{	
		getRequestParams(request);
		try
		{
			// get the database connection
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			//Connection con = DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
														  "user=mike&password=Sm0kie8");
			Statement st = conn.createStatement();
			String newQuery = "SELECT * FROM tblcontacts3k ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
								" LIMIT " + startParameter + ", " + pagesizeParameter;
			ResultSet rs = st.executeQuery(newQuery);
			
			GetHandler myGetHandler = new GetHandler();			
			myGetHandler.populate(rs, "ContactID");
			myGetHandler.writeToClient(response);
	
			// clean up 
			rs.close();
			st.close();
			conn.close();
			
			return null;
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
	}
	
	private void getRequestParams(HttpServletRequest request)
	{
		startParameter = request.getParameter("StartRecordIndex");
		if (startParameter==null)
		{
			startParameter="0";         // define default value for parameter start if this page is called without parameter start.
		}	

		pagesizeParameter=request.getParameter("PageSize");
		if ((pagesizeParameter==null)||(0 == pagesizeParameter.length()))
		{
			pagesizeParameter="15";  // define default value for parameter pagesize if this page is called without parameter pagesize.
		}

		sortColumn=request.getParameter("SortColumn");
		if ((sortColumn==null) || (0 == sortColumn.length()))
		{
			sortColumn="ContactID";
		}
	
		sortDirection=request.getParameter("SortDirection");
		if ((sortDirection==null) || (0 == sortDirection.length()))
		{
			sortDirection="ASC";
		}
	}
}
