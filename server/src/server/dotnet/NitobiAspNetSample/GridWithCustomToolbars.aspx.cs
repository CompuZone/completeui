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
	public partial class GridWithCustomToolbars : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!IsPostBack)
				if (g.Mode == Nitobi.GridMode.LiveScrolling)
					gridMode.Items[0].Selected = true;
				else
					gridMode.Items[1].Selected = true;
			gridMode.SelectedIndexChanged += new EventHandler(gridMode_SelectedIndexChanged);
		}

		void gridMode_SelectedIndexChanged(object sender, EventArgs e)
		{
			g.Mode = (Nitobi.GridMode)Enum.Parse(typeof(Nitobi.GridMode), gridMode.SelectedValue);
		}
	}
}
