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

namespace UserControlCombo
{
	/// <summary>
	/// Summary description for WebForm1.
	/// </summary>
	public class WebForm1 : System.Web.UI.Page
	{
		protected System.Web.UI.WebControls.Label Addresses;
		protected System.Web.UI.HtmlControls.HtmlForm Form1;
		protected System.Web.UI.WebControls.Button btnSubmit;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
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
			this.btnSubmit.Click += new System.EventHandler(this.btnSubmit_Click);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		private void btnSubmit_Click(object sender, System.EventArgs e)
		{
			ComboUC residentialAddress = (ComboUC) this.FindControl("ResidentialAddress");
			ComboUC mailingAddress = (ComboUC) this.FindControl("MailingAddress");
			Addresses.Text = "Residential Address<BR>" +
							 "St. Address: " + residentialAddress.StAddress.Text + "<BR>" +
							 "City: " + residentialAddress.City.Text + "<BR>" + 
							 "Province: " + residentialAddress.Province.TextValue + "<BR>" + 
							 "Country: " + residentialAddress.Country.TextValue + "<BR>" + 
							 "Mailing Address<BR>" +
							 "St. Address: " + mailingAddress.StAddress.Text + "<BR>" +
							 "City: " + mailingAddress.City.Text + "<BR>" + 
							 "Province: " + mailingAddress.Province.TextValue + "<BR>" + 
							 "Country: " + mailingAddress.Country.TextValue + "<BR>";


		}
	}
}
