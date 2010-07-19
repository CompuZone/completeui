package examples.grid.spring;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.nitobi.server.handler.GetHandler;

public class GetHandlerController implements Controller
{
	private String pagesizeParameter;
	private String startParameter;
	private String sortColumn;
	private String sortDirection;
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception
	{
		getRequestParams(request);
		// get the database connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
													  "user=nitobi");
		Statement st = conn.createStatement();
		String newQuery = "SELECT * FROM tblcontacts3k ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
							" LIMIT " + startParameter + ", " + pagesizeParameter;
		ResultSet rs = st.executeQuery(newQuery);
		
		GetHandler myGetHandler = new GetHandler();
		myGetHandler.populate(rs, "ContactID");
		myGetHandler.writeToClient(response);
		rs.close();
		st.close();
		conn.close();

		// We return null to indicate we don't forward to a view page but 
		// instead return XML directly back to the component that made
		// the request.
		return null;
	}
	
	private void getRequestParams(HttpServletRequest request)
	{
		startParameter = request.getParameter("StartRecordIndex");
		if (startParameter == null)
		{
		   startParameter="0";
		}
		
		pagesizeParameter = request.getParameter("PageSize");
		if ((pagesizeParameter==null)||(0 == pagesizeParameter.length()))
		{
		   pagesizeParameter="15";
		}
		
		sortColumn = request.getParameter("SortColumn");
		if ((sortColumn==null) || (0 == sortColumn.length()))
		{
		   sortColumn="ContactID";
		}

		sortDirection = request.getParameter("SortDirection");
		if ((sortDirection==null) || (0 == sortDirection.length()))
		{
		   sortDirection="ASC";
		}
	}
}
