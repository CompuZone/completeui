/**
 * 
 */
package example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.lang.reflect.Array;
import java.util.List;

import eba.savehandler.GenericSaveHandler;
import eba.gethandler.Record;

import com.opensymphony.xwork2.Action;

/**
 * @author mhan
 *
 */
public class SaveHandlerAction implements Action 
{
	private String fake;
	private Array testArray;
	private int tester;
	private List testList;
	private float floater;
	private GenericSaveHandler handler;
	
	public String execute() throws Exception 
	{
		String path = "C:\\Documents and Settings\\mhan\\eclipseWorkspaces\\struts2plugin\\struts2plugin\\WebContent\\grid\\data\\ContactsFlatfile3k.mdb";
		Class.forName("sun.jdbc.odbc.JdbcOdbcDriver").newInstance();
		Connection con = DriverManager.getConnection("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=" + path,"","");
		Statement st=con.createStatement();
		
		Record[] insertRecords = handler.getInsertRecords();
		for (int i=0; i< insertRecords.length; i++) 
		{
			String sql="INSERT INTO tblContacts3k (ContactName, ContactEmail, JobTitle, CompanyName, PhoneNumber, Address) VALUES (";

			sql+= "'" + insertRecords[i].getField("ContactName").replaceAll("'","''") 	+ "',";
			sql+= "'" + insertRecords[i].getField("ContactEmail").replaceAll("'","''") 	+ "',";
			sql+= "'" + insertRecords[i].getField("JobTitle").replaceAll("'","''") 		+ "',"; 
			sql+= "'" + insertRecords[i].getField("CompanyName").replaceAll("'","''") 	+ "',";
			sql+= "'" + insertRecords[i].getField("PhoneNumber").replaceAll("'","''") 	+ "',";
			sql+= "'" + insertRecords[i].getField("Address").replaceAll("'","''") 		+ "'";
			sql+= "); ";
			st.executeUpdate(sql);
		}
		
		// Continue by processing our updates
		Record[] updateRecords = handler.getUpdateRecords();
		for (int i=0; i< updateRecords.length; i++) {
		
			String sql = "UPDATE tblContacts3k ";		
			sql+= "SET ContactName 	= '" + updateRecords[i].getField("ContactName").replaceAll("'","''") 	+ "', ";	 
			sql+= "ContactEmail 	= '" + updateRecords[i].getField("ContactEmail").replaceAll("'","''") 	+ "', ";     
			sql+= "JobTitle 		= '" + updateRecords[i].getField("JobTitle").replaceAll("'","''") 		+ "', ";      
			sql+= "CompanyName 		= '" + updateRecords[i].getField("CompanyName").replaceAll("'","''") 	+ "', ";         
			sql+= "PhoneNumber 		= '" + updateRecords[i].getField("PhoneNumber").replaceAll("'","''") 	+ "', ";
			sql+= "Address 			= '" + updateRecords[i].getField("Address").replaceAll("'","''") 		+ "' ";    

			sql+=" WHERE ContactID = " + updateRecords[i].getID();
			st.executeUpdate(sql);
		}
		
		// Finish by processing our deletes
		Record[] deleteRecords = handler.getDeleteRecords();
		for (int i=0; i< deleteRecords.length; i++) {
			String sql = "DELETE FROM tblContacts3k WHERE ContactID = " + deleteRecords[i].getID();
			st.executeUpdate(sql);
		}
		st.close();
		con.close();	
		handler.setErrorMessage("ERROR, ERROR!");
		return SUCCESS;
	}
	
	public GenericSaveHandler getHandler()
	{
		return handler;
	}
	
	public void setfHandler(GenericSaveHandler handler)
	{
		this.handler = handler;
	}
	
	public void setFake(String fake)
	{
		this.fake = fake;
	}

	public float getFloater() {
		return floater;
	}

	public void setFloater(float floater) {
		this.floater = floater;
	}

	public Array getTestArray() {
		return testArray;
	}

	public void setTestArray(Array testArray) {
		this.testArray = testArray;
	}

	public int getTester() {
		return tester;
	}

	public void setTester(int tester) {
		this.tester = tester;
	}

	public List getTestList() {
		return testList;
	}

	public void setTestList(List testList) {
		this.testList = testList;
	}

	public String getFake() {
		return fake;
	}
}
