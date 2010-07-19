using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace test
{
	public partial class MainMenu : System.Web.UI.UserControl
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			mainMenu.MenuItemClick += new MenuEventHandler(mainMenu_MenuItemClick);
		}

		void mainMenu_MenuItemClick(object sender, MenuEventArgs e)
		{
			if (e.Item.Value.StartsWith("Theme_"))
			{
				Session["theme"] = e.Item.Value.Substring(6);
				Response.Redirect(Request.Url.LocalPath);
			}
		}
	}
}