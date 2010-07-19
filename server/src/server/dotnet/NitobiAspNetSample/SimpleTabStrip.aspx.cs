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
	public partial class SimpleTabStrip : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!Page.IsPostBack)
			{
				theme.DataSource = Enum.GetValues(typeof(TabStripThemeName));
				theme.DataBind();
				theme.Items[(int)tab1.Theme].Selected = true;
				autosize.Checked = true;
			}

			theme.SelectedIndexChanged += new EventHandler(theme_SelectedIndexChanged);

		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			if (!autosize.Checked)
				tab1.AutoSize = null;
		}
		void theme_SelectedIndexChanged(object sender, EventArgs e)
		{
			tab1.Theme = (TabStripThemeName)Enum.Parse(typeof(TabStripThemeName), theme.SelectedValue);
		}
	}
}
