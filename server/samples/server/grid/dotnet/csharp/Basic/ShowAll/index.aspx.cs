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

namespace GridCSharpSamples.Basic.ShowAll
{
	/// <summary>
	/// Summary description for index.
	/// </summary>
	public class index : System.Web.UI.Page
	{
		protected Nitobi.Grid ShowAllGrid;
		static OleDbConnection dbConn;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
			ShowAllGrid.DataSources.PrimaryData.DatasourceStructure.Keys.Add("ContactID");
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
			this.ShowAllGrid.GetData += new Nitobi.Grid.GetEventHandler(this.ShowAllGrid_GetData);
			this.ShowAllGrid.SaveData += new Nitobi.Grid.SaveEventHandler(this.ShowAllGrid_SaveData);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		private void ShowAllGrid_GetData(object sender, Nitobi.Components.Grid.GetEventArgs e)
		{
			OleDbDataAdapter dAdapter;
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\contactsflatfile3k.mdb" ); 

			dbConn.Open();
			/*OleDbCommand cmd = new OleDbCommand("select count(*) from tblContacts3k", dbConn);
			int count = (int)cmd.ExecuteScalar();

			if  (count > e.NumRowsRequested + e.StartingRecordIndex)
			{
				count = e.NumRowsRequested + e.StartingRecordIndex;
			}
			int numRows = count - e.StartingRecordIndex;
*/

			string query="";
			//if (ShowAllGrid.RowsPerPage ==0) ShowAllGrid.RowsPerPage=20;
			string sortField = "ContactID";
			SortOrder sortOrder = SortOrder.Asc;
			if (e!=null && e.Sort != null && e.Sort.SortField != null)
			{
				sortField = e.Sort.SortField;
				sortOrder = e.Sort.SortOrder;
			}

			string ReverseDirection;
			if (sortOrder == SortOrder.Asc) ReverseDirection = SortOrder.Desc.ToString(); else ReverseDirection = SortOrder.Asc.ToString(); 
			string tableName;


			query = "SELECT TOP 50 * FROM tblContacts3k ORDER BY " + sortField + " " + sortOrder;
			tableName = "tblContacts3k";

			
			
			// Fill the tables from the dataset with the data from the database.
			DataSet ds = new DataSet(); 
			ds.Tables.Add(tableName);
			dAdapter=new OleDbDataAdapter(query,dbConn);
			dAdapter.Fill(ds.Tables[tableName]);
			dbConn.Close();
			e.DataSource = ds;
		}

		private void ShowAllGrid_SaveData(object sender, Nitobi.Components.Grid.GridSaveEventArgs e)
		{
			OleDbDataAdapter dAdapter = new OleDbDataAdapter();
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\contactsflatfile3k.mdb" );
			dAdapter.SelectCommand = new OleDbCommand("SELECT * FROM tblContacts3k", dbConn);
			// The following line required for updates and inserts.
			new OleDbCommandBuilder(dAdapter);

			DataSet ds = new DataSet(); 
			ds.Tables.Add("tblContacts3k");
			dAdapter.TableMappings.Add("Table","tblContacts3k");
			dbConn.Open();
			dAdapter.Fill(ds.Tables["tblContacts3k"]);
			ds.Tables["tblContacts3k"].PrimaryKey = new DataColumn[] {ds.Tables["tblContacts3k"].Columns["ContactID"]};
			// Ensure that we capture the key assigned by the db in order to send it back to the grid.
			dAdapter.RowUpdated += new OleDbRowUpdatedEventHandler(RowUpdated);
			Hashtable ht = new Hashtable();
			int MDB_WORKAROUND=0, i=0;
			foreach (Row row in ShowAllGrid.DataSources.PrimaryData.Rows)
			{
				UpdateAction xac = row.EditAction; 
				switch(xac)
				{
					case(UpdateAction.INSERT):
					{
						DataRow r = ds.Tables["tblContacts3k"].NewRow();
						// The first field is an auto-increment field.
						r[0]=MDB_WORKAROUND--;
						// Keep the row so that we can update the key later.
						ht[i] = r;
						for (int j=1;j<row.Count;j++)
						{
							if (!ds.Tables["tblContacts3k"].Columns[j].AutoIncrement)
							{
								r[j] = row[j];
							}
						}
						ds.Tables["tblContacts3k"].Rows.Add(r);
						break;
					}
					case(UpdateAction.DELETE):
					{
						DataRow r = ds.Tables["tblContacts3k"].Rows.Find(row[0]);
						r.Delete();
						break;
					}
					case(UpdateAction.UPDATE):
					{
						DataRow r = ds.Tables["tblContacts3k"].Rows.Find(row[0]);
						for (int j=0;j<row.Count;j++)
						{
							r[j] = row[j];
						}
						break;
					}

				}
				i++;
			}
			
			dAdapter.Update(ds.Tables["tblContacts3k"]);

			// Update the rows that were inserted with the keys that were returned
			// by the db.
			Rows rs = ShowAllGrid.DataSources.PrimaryData.Rows;
			foreach (int key in ht.Keys)
			{
				string s = ((DataRow)ht[key])[0].ToString();
				rs[key][0] = s;
			}

			dbConn.Close();
		}

		protected static void RowUpdated(object sender, OleDbRowUpdatedEventArgs args)
		{
			OleDbCommand idCMD = new OleDbCommand("SELECT @@IDENTITY", dbConn);
			if (args.StatementType == StatementType.Insert)
			{
				int newID;
				newID = (int)idCMD.ExecuteScalar();
				args.Row["ContactID"] = newID;
			}
		}
	}
}
