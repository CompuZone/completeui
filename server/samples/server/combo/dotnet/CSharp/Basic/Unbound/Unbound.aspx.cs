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

namespace Unbound
{
	public class Unbound : System.Web.UI.Page
	{
		protected Nitobi.Combo myCombo;
		protected SortedList data;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// Specify our values
			data = new SortedList();
			data["AR"] = "Argentina";
			data["BF"] = "Burkina Faso";
			data["CA"] = "Canada";
			data["DE"] = "Germany";
			data["FR"] = "France";
			data["HK"] = "Hong Kong";
			data["KZ"] = "Kazakhstan";
			data["MX"] = "Mexico";
            data["NP"] = "Nepal";
			data["SA"] = "Saudi Arabia";
			data["US"] = "United States";

			// TextField is what appears in the combo, and ValueField could be a more machine-readable value, ID# etc.
            this.myCombo.DataSource = data;
			this.myCombo.DataTextField="Value";
			this.myCombo.DataValueField="Key";
	
			this.DataBind();
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
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		// Unbound still calls the server, just like the other modes.
		private void myCombo_GetPage(object sender, Nitobi.ComboGetPageEventArgs e)
		{
			e.NextPage=data;
		}
	}
}