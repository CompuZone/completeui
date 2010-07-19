using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.OleDb;

namespace Unicode
{
	/// <summary>
	/// Summary description for index.
	/// </summary>
	public partial class index : System.Web.UI.Page
	{
		protected OleDbConnection dbConn;
		protected OleDbDataAdapter dbAdapter;
		protected DataSet ds; 
	
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Get the first page and link the datasource to the ComboBox.
			this.Combo1.DataSource=GetDataset(this.Combo1.List.PageSize,"",0,"");
			this.Combo1.DataMember="dvds";

			// Bind the datasources to the controls.
			if (!this.IsPostBack)
			{ 
				this.DataBind();
			}
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
			this.Combo1.GetPage += new Nitobi.ComboGetPageEventHandler(this.Combo1_GetPage);

		}
		#endregion

		private DataSet GetDataset(int PageSize, string SubString, int CurrentRecord, string LastString)
		{
			// Retrieve the current path of the ASPX page.
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 

			// Create a DB connection to the MDB.
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + "\\data\\dvds.mdb" ); 

			// Create a dataset and add the Customers table to it.
			ds=new DataSet(); 
			ds.Tables.Add("dvds");
						
			// LastString is the last element in the last page received, so we take data only from after it.
			// The knowledgebase has more information on constructing SQL queries for different database technologies
			dbAdapter=new OleDbDataAdapter("SELECT TOP " + PageSize + " * FROM dvds WHERE Title > '" + LastString + "' AND Title LIKE '" + SubString + "%' ORDER BY Title",dbConn);
			
			dbAdapter.Fill(ds,"dvds");

			return ds;
		}

		private void Combo1_GetPage(object sender, Nitobi.ComboGetPageEventArgs e)
		{
			e.NextPage = this.GetDataset(e.PageSize,e.SearchSubstring,e.StartingRecordIndex,e.LastString);		
		}
	}
}
