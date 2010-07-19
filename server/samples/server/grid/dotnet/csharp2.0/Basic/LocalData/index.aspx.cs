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

namespace GridCSharpSamples.Basic.LocalData
{
	/// <summary>
	/// Summary description for index.
	/// </summary>
	public partial class index : System.Web.UI.Page
	{
		static OleDbConnection dbConn;
	
		protected void Page_Load(object sender, System.EventArgs e)
		{
			BindLocalData();
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

		}
		#endregion

		/// <summary>
		/// This demonstrates binding to a different datasource. You can also use the PrimaryDataSource
		/// using the GetData event.
		/// </summary>
		private void BindLocalData()
		{
			OleDbDataAdapter dAdapter;
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb" ); 

			dbConn.Open();
			string query = "SELECT TOP 100  * FROM tblProducts ORDER BY ProductID";
			string tableName = "tblProducts";

		
			// Fill the tables from the dataset with the data from the database.
			DataSet ds = new DataSet(); 
			ds.Tables.Add(tableName);
			dAdapter=new OleDbDataAdapter(query,dbConn);
			dAdapter.Fill(ds.Tables[tableName]);
			LocalDataGrid.DataSources["LocalData"].DatasourceStructure.Keys.Add("ProductID");
			LocalDataGrid.DataSources["LocalData"].Source = ds;
			LocalDataGrid.DataSources["LocalData"].DataBind();
			
		}
	}
}
