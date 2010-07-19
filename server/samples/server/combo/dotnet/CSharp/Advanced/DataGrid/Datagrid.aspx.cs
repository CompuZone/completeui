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
using Nitobi;

namespace DataGridDemo
{
	public class DataGrid : System.Web.UI.Page
	{
		protected System.Web.UI.WebControls.DataGrid DataGrid1;
		protected System.Web.UI.WebControls.Label lblUpdate;
		private const int nameCol = 1;		// Database column containing contact name 
		private const int emailCol = 2;		// Database column containing contact email
		private const int compCol = 4;		// Database column containing contact company name
		private const string dbPath = @"\data\customerdb.mdb";	// path to database file
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			if (!Page.IsPostBack)
			{ 
				BindGrid();
			}

			// if datagrid is in edit mode, bind events to comboboxes
			if (DataGrid1.EditItemIndex != -1) 
			{
				BindCombo(DataGrid1.EditItemIndex);
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
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		private void BindGrid()
		{
			OleDbConnection dbConn;
			OleDbDataAdapter dAdapter;
			DataSet ds;
			string serverPath = Server.MapPath(""); 

			// Create a DB connection to the MDB.
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + dbPath ); 
			// Create a dataset and add the tables to it.
			ds = new DataSet(); 
			ds.Tables.Add("tblCustomers");
			// Fill the tables from the dataset with the data from the database.
			dAdapter=new OleDbDataAdapter("SELECT * FROM tblCustomers WHERE ContactId  >= 47000 AND ContactId <= 47020",dbConn);
			dAdapter.Fill(ds.Tables["tblCustomers"]);
			DataGrid1.DataSource = ds.Tables["tblCustomers"].DefaultView;
			// Bind the grid to the datasource
			this.DataBind();
		}

		protected void DataGrid1_Edit(Object sender, DataGridCommandEventArgs e) 
		{
			// Set the EditItemIndex property to the index of the item clicked 
			// in the DataGrid control to enable editing for that item. 
			string currText = ((DataBoundLiteralControl) DataGrid1.Items[e.Item.ItemIndex].Cells[2].Controls[0]).Text;
			DataGrid1.EditItemIndex = e.Item.ItemIndex;
			BindGrid();
			// Set the combobox's text field to selected contact name
			Combo cmbName = (Combo) DataGrid1.Items[e.Item.ItemIndex].FindControl("cmbName");
			cmbName.TextValue = currText.Trim();
		}
								
		protected void DataGrid1_Cancel(Object sender, DataGridCommandEventArgs e)
		{
			// On a cancel request, return datagrid to non-edit mode.
			DataGrid1.EditItemIndex = -1;
			BindGrid();
		}

		protected void DataGrid1_Update(Object sender, DataGridCommandEventArgs e)
		{
			// Update info and return grid to non-edit mode. Here, the label control at the bottom of the page
			// displays the updated info. In a functioning datagrid, the mdb file would be updated through SQL.
			System.Web.UI.WebControls.TextBox txtEmail, txtComp;
			Nitobi.Combo cmbName;
			// Use the event argument and FindControl function to retrieve references to cmbName, and textboxes
			cmbName = (Nitobi.Combo) e.Item.Cells[nameCol].FindControl("cmbName");
			txtEmail = (System.Web.UI.WebControls.TextBox) e.Item.Cells[emailCol].FindControl("txtEmail");
			txtComp = (System.Web.UI.WebControls.TextBox) e.Item.Cells[compCol].FindControl("txtComp");
			// Update label with new data
			lblUpdate.Text = "Row: " + e.Item.ItemIndex + " has been updated with values of: Name="+ cmbName.TextBox.Value + ", Email= " + txtEmail.Text + ", Company= " + txtComp.Text;
			lblUpdate.Visible = true;
			DataGrid1.EditItemIndex = -1;
			BindGrid();
		}

		protected DataSet GetInitialDataSource(int pageSize)
		{
			// Called from within the aspx page using databind syntax
			return GetComboDs(pageSize,"a",0,"");
		}

		private DataSet GetComboDs(int PageSize, string SubString, int CurrentRecord, string LastString)
		{
			OleDbConnection dbConn;
			OleDbDataAdapter dbAdapter;
			DataSet ds;
			string serverPath = Server.MapPath("");

			// Create a DB connection to the MDB.
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + dbPath); 

			// Create a dataset and add the table to it.
			ds = new DataSet(); 
			ds.Tables.Add("tblCustomers");	
			// Fill the dataset with data.  Match the query to the substring and only fetch the page
			// starting at CurrentRecord.
			dbAdapter = new OleDbDataAdapter("SELECT TOP " + PageSize + " * FROM tblCustomers WHERE ContactName > '" + LastString + "' AND ContactName LIKE '" + SubString + "%' ORDER BY ContactName", dbConn);
			dbAdapter.Fill(ds,"tblCustomers");
			return ds;
		}

		private void cmbName_GetPage(object sender, Nitobi.ComboGetPageEventArgs e)
		{
			// Getpage event handler. This will send a new page of data to combobox.
			e.NextPage = GetComboDs(e.PageSize,e.SearchSubstring,e.StartingRecordIndex,e.LastString);
		}

		private void cmbName_Select(object sender, EventArgs e)
		{
			// Called when a name is selected from cmbName.
			System.Web.UI.WebControls.TextBox txtEmail, txtComp;
			Nitobi.Combo cmbName = null;
			// Retrieving the combobox from sender
			cmbName = (Nitobi.Combo) sender;
			// Using the sender object to retrieve its parent row.
			DataGridItem dgi = (DataGridItem) cmbName.Parent.Parent;
			// Using FindControl to retrieve references to both textboxes
			txtEmail = (System.Web.UI.WebControls.TextBox) dgi.FindControl("txtEmail");
			txtComp = (System.Web.UI.WebControls.TextBox) dgi.FindControl("txtComp");
			if (cmbName.SelectedItem != null)
			{
				// Retrieve associated email and company name
				txtEmail.Text = cmbName.SelectedRowValues[emailCol];
				txtComp.Text = cmbName.SelectedRowValues[compCol];
			}
		}
		
		private void BindCombo(int curRow)
		{
			// This function is called on each postback caused by the select or getpage events. 
			// It is necessary to rebind the combobox on each postback.
			Nitobi.Combo cmbName;
			// Locate the row being edited and use FindControl function to retrieve combobox
			cmbName = (Nitobi.Combo) DataGrid1.Items[curRow].FindControl("cmbName");
			if (cmbName != null)
			{
				// Bind combobox to appropriate datasource
				cmbName.DataSource = GetComboDs(cmbName.List.PageSize,"a",0,"");
				// Bind comboxes events to appropriate event handlers
				cmbName.GetPage += new Nitobi.ComboGetPageEventHandler(this.cmbName_GetPage);
				cmbName.Select += new EventHandler(cmbName_Select);
			}
		}
	}
}
