package example;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;

import eba.gethandler.Record;
import eba.gethandler.GenericGetHandler;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

public class GetHandlerAction implements Action 
{
	GenericGetHandler gethandler;
	String fakehandler = "blah";
	public String execute() throws Exception 
	{
		Map parameters = ActionContext.getContext().getParameters();  
		String startParameter;
		if (parameters.get("StartRecordIndex") != null)
		{
			startParameter = ((String[]) parameters.get("StartRecordIndex"))[0];
		}
		else
		{
			startParameter = "0";
		}
		int ordinalStart = Integer.parseInt(startParameter); 
  
		String pagesizeParameter;
		if (parameters.get("PageSize") != null)
		{
			pagesizeParameter = ((String[]) parameters.get("PageSize"))[0];
		}
		else
		{
			pagesizeParameter = "15";
		}
		int pageSize = Integer.parseInt(pagesizeParameter);
  
		String sortColumn;
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

		String sortDirection;
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
		String path = "C:\\Documents and Settings\\mhan\\eclipseWorkspaces\\struts2plugin\\struts2plugin\\WebContent\\grid\\data\\ContactsFlatfile3k.mdb";
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver").newInstance();
		Connection con = DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");
		Statement st=con.createStatement();
  
		// N.B.:  This is complicated due to ms access limited SQL 
		String newQuery = "SELECT * FROM ( SELECT TOP " + pageSize + " * FROM (SELECT TOP " + (pageSize+ordinalStart)+
			" * FROM tblContacts3k ORDER BY " + sortColumn + " " + sortDirection +
				") ORDER BY " + sortColumn + " " + ((sortDirection.equalsIgnoreCase("Desc"))?"Asc":"Desc") +
					") ORDER BY " + sortColumn + " " + sortDirection + ";";
  
		ResultSet rs = st.executeQuery(newQuery);
		
		gethandler = new GenericGetHandler(null, null);  
		// First we define how many columns we are sending in each
		// record, and name each field. 
		gethandler.defineField("ContactName");
		gethandler.defineField("ContactEmail");
		gethandler.defineField("JobTitle");
		gethandler.defineField("CompanyName");
		gethandler.defineField("PhoneNumber");
		gethandler.defineField("Address"); 
  
  

		Record curRecord;
		String contactID;
		int addedRecords=0;
		while ( rs.next() && addedRecords<pageSize )
		{    
			contactID = rs.getString("ContactID");
			curRecord = gethandler.createNewRecord(contactID);
  
			curRecord.setField("ContactName", rs.getString("ContactName"));  
			curRecord.setField("ContactEmail", rs.getString("ContactEmail"));
			curRecord.setField("JobTitle", rs.getString("JobTitle"));
			curRecord.setField("CompanyName", rs.getString("CompanyName"));
			curRecord.setField("PhoneNumber", rs.getString("PhoneNumber"));
			curRecord.setField("Address", rs.getString("Address"));
	   
			gethandler.addRecord(curRecord);
			addedRecords++;  
		}
		rs.close();
		st.close();
		con.close();
		gethandler.setErrorMessage("Get handler error!");
		return SUCCESS;
	}

	public GenericGetHandler getGethandler()
	{
		return gethandler;
	}
	
	public String getFakehandler()
	{
		return fakehandler;
	}
}
