using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace test
{
	public class BasePage : System.Web.UI.Page
	{
		protected override void OnPreInit(EventArgs e)
		{
			if (Session["theme"] != null)
				Page.Theme = (string)Session["theme"];
		}

		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			//if (Request.UserAgent.IndexOf("AppleWebKit") > 0)
				Request.Browser.Adapters.Clear(); 
				//Request.Browser.Adapters.Remove(typeof(Menu).AssemblyQualifiedName);
		}
	}
}
