package examples.grid.struts2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;

import com.nitobi.server.handler.GetHandler;

public class GetHandlerAction extends ActionSupport 
{
	private GetHandler gethandler;
	private String sortColumn;
	private String startParameter;
	private String pagesizeParameter;
	private String sortDirection;
	
	public String execute() throws Exception
	{
		Map parameters = ActionContext.getContext().getParameters();
		getRequestParams(parameters);
		// get the database connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		//Connection con = DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?" +
													  "user=nitobi");
		Statement st = conn.createStatement();
		String newQuery = "SELECT * FROM tblcontacts3k ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Asc"))?"Asc":"Desc") +
							" LIMIT " + startParameter + ", " + pagesizeParameter;
		ResultSet rs = st.executeQuery(newQuery);
		
		// Lets Set up the Output
		gethandler = new GetHandler();		

		// First we define how many columns we are sending in each record, and name each field.	

		gethandler.populate(rs, "ContactID");
		rs.close();
		st.close();
		conn.close();
		return SUCCESS;
	}
	
	private void getRequestParams(Map parameters)
	{
		if (parameters.get("StartRecordIndex") != null)
		{
			startParameter = ((String[]) parameters.get("StartRecordIndex"))[0];
		}
		else
		{
			startParameter = "0";
		}
		
		if (parameters.get("PageSize") != null)
		{
			pagesizeParameter = ((String[]) parameters.get("PageSize"))[0];
		}
		else
		{
			pagesizeParameter = "15";
		}
		
		if (parameters.get("SortColumn") != null)
		{
			sortColumn = ((String[]) parameters.get("SortColumn"))[0];
			if (sortColumn.length() == 0)
			{
				sortColumn = "ContactID";
			}
		}
		else
		{
			sortColumn = "ContactID";
		}

		if (parameters.get("SortDirection") != null)
		{
			sortDirection = ((String[]) parameters.get("SortDirection"))[0];
			if (sortDirection.length() == 0)
			{
				sortDirection = "ASC";
			}
		}
		else
		{
			sortDirection = "ASC";
		}
	}
	
	public GetHandler getGethandler()
	{
		return gethandler;
	}
	
	public void setGethandler(GetHandler gethandler)
	{
		this.gethandler = gethandler;
	}
}
