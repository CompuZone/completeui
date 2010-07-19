namespace UserControlCombo
{
	using System;
	using System.Data;
	using System.Drawing;
	using System.Web;
	using System.Web.UI.WebControls;
	using System.Web.UI.HtmlControls;
	using System.Data.OleDb;

	/// <summary>
	///		Summary description for ComboUC.
	/// </summary>
	public partial class ComboUC : System.Web.UI.UserControl
	{
		protected OleDbConnection dbConn;
		protected OleDbDataAdapter countryAdapter;
		protected OleDbDataAdapter provinceAdapter;
		protected DataSet ds; 

		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Retrieve the current path of the ASPX page.
			string serverPath="";
			serverPath=Server.MapPath(serverPath); 

			// Create a DB connection to the MDB.
			dbConn=new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + "\\data\\countryProvince.mdb" ); 

			// Create a dataset and add the tables to it.
			ds=new DataSet(); 
			ds.Tables.Add("tblCountries");
			ds.Tables.Add("tblProvinces");

			// Fill the tables from the dataset with the data from the database.
			countryAdapter=new OleDbDataAdapter("SELECT * FROM tblCountries",dbConn);
			countryAdapter.Fill(ds.Tables["tblCountries"]);

			provinceAdapter=new OleDbDataAdapter("SELECT * FROM tblProvinces",dbConn);
			provinceAdapter.Fill(ds.Tables["tblProvinces"]);

			// Set the Combo's Datasources
			this.Country.DataSource=ds.Tables["tblCountries"].DefaultView;
			this.Province.DataSource=ds.Tables["tblProvinces"].DefaultView;

			if (this.Country.TextValue.CompareTo("[Choose Country]")==0 ) 
			{
				// just an invalid value to ensure that no province is shown
				ds.Tables["tblProvinces"].DefaultView.RowFilter="CountryID=-1"; 
			} 
			else 
			{
				ds.Tables["tblProvinces"].DefaultView.RowFilter=String.Concat("CountryID = ",this.Country.SelectedRowValues[0]);
			}

			// Bind the datasources to the controls.
			if (!this.IsPostBack && !this.Province.IsPaging)
			{ 
				this.DataBind();
			}

		}

		/// <summary>
		/// Gets the Province Combo a new page
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void Province_GetPage(object sender, Nitobi.ComboGetPageEventArgs e)
		{
			// When user changes the value of country, the old value of the province must be deleted.
			this.Province.ClearSelectedValues();

			this.ds.Tables["tblProvinces"].DefaultView.RowFilter="CountryID="+e.SearchSubstring;
			
			e.NextPage=ds.Tables["tblProvinces"].DefaultView;
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
		///		Required method for Designer support - do not modify
		///		the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.Province.GetPage += new Nitobi.ComboGetPageEventHandler(this.Province_GetPage);

		}
		#endregion

        public Nitobi.Combo Province
        {
            get
            {
                return this.cmbProvince;
            }
        }

        public Nitobi.Combo Country
        {
            get
            {
                return this.cmbCountry;
            }
        }

        public TextBox City
        {
            get
            {
                return this.txtCity;
            }
        }

        public TextBox StAddress
        {
            get
            {
                return this.StAddress;
            }
        }
        
	}
}
