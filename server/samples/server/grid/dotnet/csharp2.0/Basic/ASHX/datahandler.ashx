<%@ WebHandler Language="C#" Class="DataHandler" %>
using System;
using System.Web;
using Nitobi;
using Nitobi.Components.Grid;
using Nitobi.Components.Model;
using System.Collections;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Data;
using System.Web;

public class DataHandler : IHttpHandler
{
	int StartingRecordIndex, NumRowsRequested;
	string SortField, RequestType, DataSourceId;
	SortOrder SortDirection;
	static OleDbConnection dbConn;
	Grid EditorsGrid;
	

	public bool IsReusable
	{
		get
		{
			return true;
		}
	}
	
	public void ProcessRequest(HttpContext context)
	{
		context.Response.ContentType="text/xml";
		EditorsGrid = new Grid();
		// Ordinarily, the ASPX page does this for you. In this case
		// however, there is no container for the grid. We call
		// ParseHttpRequest explicitly.
		EditorsGrid.ParseHttpRequest();
		SetQueryStringArguments(context);
		
		EditorsGrid.DataSources.PrimaryData.DatasourceStructure.Keys.Add("ProductID");
		
		if (RequestType.ToLower() == "get")
		{
			this.serviceGetRequest(context);
		} else if (RequestType.ToLower() == "save")
		{
			this.serviceSaveRequest(context);
		}
	}
	
	void SetQueryStringArguments(HttpContext context)
	{
		string temp;
		temp = context.Request["SortDirection"];
		if (temp != null)
		{
			SortDirection = (SortOrder) Enum.Parse(typeof(SortOrder),temp,true);
		} else
		{
			SortDirection = SortOrder.Asc;
		}
		SortField = context.Request["SortColumn"];
		if (SortField == null || SortField=="")
		{
			SortField = "ProductID";
		}
		DataSourceId = context.Request["TableId"];
		if (DataSourceId == null)
		{
			DataSourceId = DataSources.PrimaryDataSourceId;
		}
		RequestType = context.Request["RequestType"];
		if (RequestType == null)
		{
			RequestType = "GET";
		}
		temp = context.Request["StartRecordIndex"];
		if (temp == null)
		{
			StartingRecordIndex=0;
		}
		else
		{
			StartingRecordIndex = Convert.ToInt32(temp);
		}
		temp = context.Request["PageSize"];
		if (temp == null)
		{
			NumRowsRequested=20;
		}
		else
		{
			NumRowsRequested = Convert.ToInt32(temp);
		}
	}
	
	public void serviceSaveRequest(HttpContext context)
	{
		OleDbDataAdapter dAdapter = new OleDbDataAdapter();
		string serverPath="";
		serverPath=context.Server.MapPath(serverPath); 
		dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb" );
		dAdapter.SelectCommand = new OleDbCommand("SELECT * FROM tblProducts", dbConn);
		// The following line required for updates and inserts.
		new OleDbCommandBuilder(dAdapter);

		DataSet ds = new DataSet(); 
		ds.Tables.Add("tblProducts");
		dAdapter.TableMappings.Add("Table","tblProducts");
		dbConn.Open();
		dAdapter.Fill(ds.Tables["tblProducts"]);
		ds.Tables["tblProducts"].PrimaryKey = new DataColumn[] {ds.Tables["tblProducts"].Columns["ProductID"]};
		// Ensure that we capture the key assigned by the db in order to send it back to the grid.
		dAdapter.RowUpdated += new OleDbRowUpdatedEventHandler(RowUpdated);
		Hashtable ht = new Hashtable();
		int MDB_WORKAROUND=0, i=0;
		foreach (Row row in EditorsGrid.DataSources.PrimaryData.Rows)
		{
			UpdateAction xac = row.EditAction; 
			switch(xac)
			{
				case(UpdateAction.INSERT):
				{
					DataRow r = ds.Tables["tblProducts"].NewRow();
					// The first field is an auto-increment field.
					r[0]=MDB_WORKAROUND--;
					// Keep the row so that we can update the key later.
					ht[i] = r;
					for (int j=1;j<row.Count;j++)
					{
						if (!ds.Tables["tblProducts"].Columns[j].AutoIncrement)
						{
							r[j] = row[j];
						}
					}
					ds.Tables["tblProducts"].Rows.Add(r);
					break;
				}
				case(UpdateAction.DELETE):
				{
					DataRow r = ds.Tables["tblProducts"].Rows.Find(row[0]);
					r.Delete();
					break;
				}
				case(UpdateAction.UPDATE):
				{
					DataRow r = ds.Tables["tblProducts"].Rows.Find(row[0]);
					for (int j=0;j<row.Count;j++)
					{
						r[j] = row[j];
					}
					break;
				}

			}
			i++;
		}
		
		dAdapter.Update(ds.Tables["tblProducts"]);

		// Update the rows that were inserted with the keys that were returned
		// by the db.
		Rows rs = EditorsGrid.DataSources.PrimaryData.Rows;
		foreach (int key in ht.Keys)
		{
			string s = ((DataRow)ht[key])[0].ToString();
			rs[key][0] = s;
		}

		dbConn.Close();
		context.Response.Write(EditorsGrid.SerializeToXml());
	}
	
	public void serviceGetRequest(HttpContext context)
	{
		OleDbDataAdapter dAdapter;
		string serverPath="";
		serverPath=context.Server.MapPath(serverPath); 
		dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb" ); 

		dbConn.Open();
		OleDbCommand cmd = new OleDbCommand("select count(*) from tblProducts", dbConn);
		int count = (int)cmd.ExecuteScalar();

		if  (count > NumRowsRequested + StartingRecordIndex)
		{
			count = NumRowsRequested + StartingRecordIndex;
		}
		int numRows = count - StartingRecordIndex;

		string query="";
		if (EditorsGrid.RowsPerPage ==0 ) EditorsGrid.RowsPerPage=20;
				
		string ReverseDirection;
		if (SortDirection == SortOrder.Asc) ReverseDirection = SortOrder.Desc.ToString(); else ReverseDirection = SortOrder.Asc.ToString(); 
		
		if (DataSourceId == DataSources.PrimaryDataSourceId)
		{
			// The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
			// Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
			// preceeding code.
			query = "SELECT * FROM (SELECT TOP " + numRows + " * FROM (SELECT TOP " + count +  "  * FROM tblProducts ORDER BY " + SortField + " " + SortDirection + ") ORDER BY " + SortField + " " + ReverseDirection + ") ORDER BY " + SortField + " " + SortDirection;

		}

		// Fill the tables from the dataset with the data from the database.
		DataSet ds = new DataSet(); 
		ds.Tables.Add("tblProducts");
		dAdapter=new OleDbDataAdapter(query,dbConn);
		dAdapter.Fill(ds.Tables["tblProducts"]);
		EditorsGrid.DataSources.PrimaryData.Source = ds;
				
		EditorsGrid.DataSources.PrimaryData.DataBind();
		
		
		context.Response.Write(EditorsGrid.SerializeToXml());	
	}
	protected static void RowUpdated(object sender, OleDbRowUpdatedEventArgs args)
	{
		OleDbCommand idCMD = new OleDbCommand("SELECT @@IDENTITY", dbConn);
		if (args.StatementType == StatementType.Insert)
		{
			int newID;
			newID = (int)idCMD.ExecuteScalar();
			args.Row["ProductID"] = newID;
		}
	}
}