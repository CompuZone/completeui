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

namespace SmartList
{
	public partial class SmartList : System.Web.UI.Page
	{

		protected OleDbConnection dbConn;
		protected OleDbDataAdapter dbAdapter;

	// Name of combobox
		protected DataSet ds;
	
		protected void Page_Load(object sender, System.EventArgs e)
		{

			// Get the first page and link the datasource to the ComboBox.
			this.cmbContacts.DataSource=GetPage(this.cmbContacts.List.PageSize,"a",0);
			this.cmbContacts.DataMember="tblContacts";

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
			this.cmbContacts.GetPage += new Nitobi.ComboGetPageEventHandler(this.cmbContacts_GetPage);

		}
		#endregion

		/// <summary>
		/// Returns a page of data from the database.
		/// </summary>
		/// <param name="PageSize">Number of records in the page.</param>
		/// <param name="SubString">The substring to match if the user is trying to find an entry</param>
		/// <param name="CurrentRecord">The index of CurrentRecord the combo wants. This is 
		/// equal to the number of records the combo currently has cached, i.e., this number
		/// does not refer to an index in your database.
		/// </param>
		/// <returns>A dataset with the requested page.</returns>
		private DataSet GetPage(int PageSize, string SubString, int CurrentRecord)
		{
			// Retrieve the current path of the ASPX page.
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 

			// Create a DB connection to the MDB.
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + "\\data\\econtactsdb.mdb" ); 

			// Create a dataset and add the table to it.
			ds=new DataSet(); 
			ds.Tables.Add("tblContacts");
			
			// Fill the dataset with data.  Match the query to the substring and only fetch the page
			// starting at CurrentRecord.
			dbAdapter=new OleDbDataAdapter("SELECT TOP " + PageSize + " * FROM tblContacts WHERE ContactInfo LIKE '%" + SubString + "%' ORDER BY TimesEmailed DESC",dbConn);
			dbAdapter.Fill(ds,"tblContacts");

			return ds;
		}

		/// <summary>
		/// This is called when the combo wants a page.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e">Stores information about the request.</param>
		private void cmbContacts_GetPage(object sender, Nitobi.ComboGetPageEventArgs e)
		{
			e.NextPage=GetPage(e.PageSize,e.SearchSubstring,e.StartingRecordIndex);
		}

		/// <summary>
		/// This is called when the submit button is clicked.
		/// </summary>
		protected void submitButton_Click(object sender, System.EventArgs e)
		{
			lblRecipient.Visible = true;
			lblRecipient.Text = "Message sent to: " + cmbContacts.TextValue;
		}

		/// <summary>
		/// This is called when the discard button is clicked.
		/// </summary>
		protected void btnDiscard_Click(object sender, System.EventArgs e)
		{
			lblRecipient.Visible = true;
			lblRecipient.Text = "Message Discarded";
		}

		/// <summary>
		/// This is called when the save button is clicked.
		/// </summary>
		protected void btnSavedraft_Click(object sender, System.EventArgs e)
		{
			lblRecipient.Visible = true;
			lblRecipient.Text = "Message Saved";
		}
	}
}