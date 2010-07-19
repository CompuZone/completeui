using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Web.UI.HtmlControls;
using Nitobi.Components.Grid;
using Nitobi.Components.Model;

namespace GridCSharpSamples.Basic.MasterDetail
{
	/// <summary>
	/// Summary description for index.
	/// </summary>
	public class index : System.Web.UI.Page
	{
		protected Nitobi.Grid DetailGrid;
		protected Nitobi.Grid MasterGrid;
		static OleDbConnection dbConn;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
			MasterGrid.DataSources.PrimaryData.DatasourceStructure.Keys.Add("CustomerID");
			DetailGrid.DataSources.PrimaryData.DatasourceStructure.Keys.Add("OrderID");
		}

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{    
			this.MasterGrid.GetData += new Nitobi.Grid.GetEventHandler(this.MasterGrid_GetData);
			this.DetailGrid.GetData += new Nitobi.Grid.GetEventHandler(this.DetailGrid_GetData);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		private void MasterGrid_GetData(object sender, Nitobi.Components.Grid.GetEventArgs e)
		{
			OleDbDataAdapter dAdapter;
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\masterdetaildb.mdb" ); 

			dbConn.Open();
			OleDbCommand cmd = new OleDbCommand("select count(*) from tblCustomers", dbConn);
			int count = (int)cmd.ExecuteScalar();

			if  (count > e.NumRowsRequested + e.StartingRecordIndex)
			{
				count = e.NumRowsRequested + e.StartingRecordIndex;
			}
			int numRows = count - e.StartingRecordIndex;

			string query="";
			if (MasterGrid.RowsPerPage ==0) MasterGrid.RowsPerPage=20;
			string sortField = "CustomerID";
			SortOrder sortOrder = SortOrder.Asc;
			if (e!=null && e.Sort != null && e.Sort.SortField != null)
			{
				sortField = e.Sort.SortField;
				sortOrder = e.Sort.SortOrder;
			}

			string ReverseDirection;
			if (sortOrder == SortOrder.Asc) ReverseDirection = SortOrder.Desc.ToString(); else ReverseDirection = SortOrder.Asc.ToString(); 
			string tableName;

			// The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
			// Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
			// preceeding code.
			query = "SELECT * FROM (SELECT TOP " + numRows + " * FROM (SELECT TOP " + count +  "  * FROM tblCustomers ORDER BY " + sortField + " " + sortOrder + ") ORDER BY " + sortField + " " + ReverseDirection + ") ORDER BY " + sortField + " " + sortOrder;
			tableName = "tblCustomers";

			
			// Fill the tables from the dataset with the data from the database.
			DataSet ds = new DataSet(); 
			ds.Tables.Add(tableName);
			dAdapter=new OleDbDataAdapter(query,dbConn);
			dAdapter.Fill(ds.Tables[tableName]);
			dbConn.Close();
			e.DataSource = ds;
		}

		private void DetailGrid_GetData(object sender, Nitobi.Components.Grid.GetEventArgs e)
		{
			OleDbDataAdapter dAdapter;
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\masterdetaildb.mdb" ); 

			dbConn.Open();

			string customerID = System.Web.HttpContext.Current.Request["CustomerId"];
			
			// Construct the WHERE clause of the query based on the parameter set in the ChooseCustomer() function
			// on the client side.
			string whereClause = " ";
			if (customerID != null)
			{
				whereClause = " WHERE CustomerID LIKE '" + customerID + "' ";
			}

			OleDbCommand cmd = new OleDbCommand("select count(*) from tblOrders" + whereClause, dbConn);
			int count = (int)cmd.ExecuteScalar();

			if  (count > e.NumRowsRequested + e.StartingRecordIndex)
			{
				count = e.NumRowsRequested + e.StartingRecordIndex;
			}
			int numRows = count - e.StartingRecordIndex;

			string query="";
			if (DetailGrid.RowsPerPage ==0) DetailGrid.RowsPerPage=20;
			string sortField = "OrderDate";
			SortOrder sortOrder = SortOrder.Asc;
			if (e!=null && e.Sort != null && e.Sort.SortField != null)
			{
				sortField = e.Sort.SortField;
				sortOrder = e.Sort.SortOrder;
			}

			string ReverseDirection;
			if (sortOrder == SortOrder.Asc) ReverseDirection = SortOrder.Desc.ToString(); else ReverseDirection = SortOrder.Asc.ToString(); 
			string tableName;

			// The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
			// Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
			// preceeding code.
			query = "SELECT * FROM (SELECT TOP " + numRows + " * FROM (SELECT TOP " + count +  "  * FROM tblOrders" + whereClause + "ORDER BY " + sortField + " " + sortOrder + ") ORDER BY " + sortField + " " + ReverseDirection + ") ORDER BY " + sortField + " " + sortOrder;
			tableName = "tblOrders";
			
			// Fill the tables from the dataset with the data from the database.
			DataSet ds = new DataSet(); 
			ds.Tables.Add(tableName);
			dAdapter=new OleDbDataAdapter(query,dbConn);
			dAdapter.Fill(ds.Tables[tableName]);
			dbConn.Close();
			e.DataSource = ds;
		}
	}
}
