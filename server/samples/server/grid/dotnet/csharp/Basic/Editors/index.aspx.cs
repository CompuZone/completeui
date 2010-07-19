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

namespace GridCSharpSamples.Basic.Editors
{
	/// <summary>
	/// Summary description for index.
	/// </summary>
	public class index : System.Web.UI.Page
	{
		protected Nitobi.Grid EditorsGrid;
		static OleDbConnection dbConn;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// It is important that the key be specified.
			EditorsGrid.DataSources.PrimaryData.DatasourceStructure.Keys.Add("ProductID");
		}

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			this.EditorsGrid.GetData += new Nitobi.Grid.GetEventHandler(this.EditorsGrid_Get);
			this.EditorsGrid.SaveData += new Nitobi.Grid.SaveEventHandler(this.EditorsGrid_Save);
			base.OnInit(e);
		}
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{    
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		private void EditorsGrid_Get(object sender, Nitobi.Components.Grid.GetEventArgs e)
		{
			OleDbDataAdapter dAdapter;
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb" ); 

			dbConn.Open();
			OleDbCommand cmd = new OleDbCommand("select count(*) from tblProducts", dbConn);
			int count = (int)cmd.ExecuteScalar();

			if  (count > e.NumRowsRequested + e.StartingRecordIndex)
			{
				count = e.NumRowsRequested + e.StartingRecordIndex;
			}
			int numRows = count - e.StartingRecordIndex;

			string query="";
			if (EditorsGrid.RowsPerPage ==0) EditorsGrid.RowsPerPage=20;
			string sortField = "ProductID";
			SortOrder sortOrder = SortOrder.Asc;
			if (e!=null && e.Sort != null && e.Sort.SortField != null)
			{
				sortField = e.Sort.SortField;
				sortOrder = e.Sort.SortOrder;
			}

			string ReverseDirection;
			if (sortOrder == SortOrder.Asc) ReverseDirection = SortOrder.Desc.ToString(); else ReverseDirection = SortOrder.Asc.ToString(); 
			string tableName;
			if (e.DataSourceId == DataSources.PrimaryDataSourceId)
			{
				// The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
				// Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
				// preceeding code.
				query = "SELECT * FROM (SELECT TOP " + numRows + " * FROM (SELECT TOP " + count +  "  * FROM tblProducts ORDER BY " + sortField + " " + sortOrder + ") ORDER BY " + sortField + " " + ReverseDirection + ") ORDER BY " + sortField + " " + sortOrder;
				tableName = "tblProducts";

			}
			else
			{
				query = "SELECT * FROM tblProductCategories";
				if (e.SearchString != "")
				{
					query += " WHERE ProductCategoryName LIKE '" + e.SearchString + "%'";
				}
				tableName = "tblProductCategories";
				
			}
			
			// Fill the tables from the dataset with the data from the database.
			DataSet ds = new DataSet(); 
			ds.Tables.Add(tableName);
			dAdapter=new OleDbDataAdapter(query,dbConn);
			dAdapter.Fill(ds.Tables[tableName]);
			e.DataSource = ds;
		}


		private void EditorsGrid_Save(object sender, Nitobi.Components.Grid.GridSaveEventArgs e)
		{
			OleDbDataAdapter dAdapter = new OleDbDataAdapter();
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
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
		
		}

		/// <summary>
		/// Executed when the row is updated. This allows us to capture the 
		/// key assigned by the database.
		/// </summary>
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
}
