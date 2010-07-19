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

namespace Paging
{
	public class Paging : System.Web.UI.Page
	{
		protected OleDbConnection dbConn;
		protected OleDbDataAdapter dbAdapter;
		protected System.Web.UI.WebControls.Label submitLabel;
		protected Nitobi.Combo myCombo;
		protected DataSet ds; 
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// Get the first page and link the datasource to the ComboBox.
			this.myCombo.DataSource=GetPage(this.myCombo.List.PageSize,"a",0,"");
			//this.myCombo.DataMember="ContactName";

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
			this.myCombo.GetPage += new Nitobi.ComboGetPageEventHandler(this.myCombo_GetPage);
			this.myCombo.Select += new System.EventHandler(this.SelectedShowData);
			this.myCombo.Load += new System.EventHandler(this.Page_Load);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		/// <summary>
		/// Returns a page of data from the database.
		/// </summary>
		/// <param name="PageSize">Number of records in the page.</param>
		/// <param name="SubString">The substring to match if the user is trying to find an entry</param>
		/// <param name="CurrentRecord">The index of CurrentRecord the combo wants. This is 
		/// equal to the number of records the combo currently has cached, i.e., this number
		/// does not refer to an index in your database.</param>
		/// <param name="LastString">The last string in the Combo's local data</param>
		/// <returns>A dataset with the requested page.</returns>
		private DataSet GetPage(int PageSize, string SubString, int CurrentRecord, string LastString)
		{
			// Retrieve the current path of the ASPX page.
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 

			// Create a DB connection to the MDB.
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + "\\data\\customerdb.mdb" ); 

			// Create a dataset and add the table to it.
			ds=new DataSet(); 
			ds.Tables.Add("tblCustomers");
			
			// LastString is the last element in the last page received, so we take data only from after it.
			// The knowledgebase has more information on constructing SQL queries for different database technologies
			dbAdapter=new OleDbDataAdapter("SELECT TOP " + PageSize + " * FROM tblCustomers WHERE ContactName > '" + LastString + "' AND ContactName LIKE '" + SubString + "%' ORDER BY ContactName",dbConn);
			dbAdapter.Fill(ds,"tblCustomers");
			
			return ds;
		}

		/// <summary>
		/// This is called when the combo wants a page.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e">Stores information about the request.</param>
		private void myCombo_GetPage(object sender, Nitobi.ComboGetPageEventArgs e)
		{
			e.NextPage=GetPage(e.PageSize,e.SearchSubstring,e.StartingRecordIndex,e.LastString);
		}

		// This is a rather trivial example, and could just as easily be written client-side,
		// but your more complicated applications can be called in the same way.
		public void SelectedShowData(object obj, EventArgs e)
		{
			submitLabel.Text += "<tr>";
			foreach (string rowValue in myCombo.SelectedRowValues)
			{
				submitLabel.Text += "<td>" + rowValue + "</td>";
			}
			submitLabel.Text += "</tr>\n";
		}
	}
}
