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

using Nitobi;

namespace test
{
	public partial class SimpleTree : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!Page.IsPostBack)
			{
				theme.DataSource = Enum.GetValues(typeof(TreeThemeName));
				theme.DataBind();
				theme.Items[(int)t.Theme].Selected = true;

				depth.Items[t.LocalDataDepth].Selected = true;
			}
			theme.SelectedIndexChanged += new EventHandler(theme_SelectedIndexChanged);
			depth.SelectedIndexChanged += new EventHandler(depth_SelectedIndexChanged);
			t.Data = new TestDataHandler();
		}

		void depth_SelectedIndexChanged(object sender, EventArgs e)
		{
			t.LocalDataDepth = int.Parse(depth.SelectedValue);
		}

		void theme_SelectedIndexChanged(object sender, EventArgs e)
		{
			t.Theme = (TreeThemeName)Enum.Parse(typeof(TreeThemeName), theme.SelectedValue);
		}
	}
}
