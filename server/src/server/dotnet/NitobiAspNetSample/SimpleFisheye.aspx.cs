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
	public partial class SimpleFisheye : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!Page.IsPostBack)
			{
				theme.DataSource = Enum.GetValues(typeof(FisheyeThemeName));
				theme.DataBind();
				theme.Items[(int)fish.Theme].Selected = true;

				openDir.DataSource = Enum.GetValues(typeof(Fisheye.OpenDir));
				openDir.DataBind();
				openDir.Items[(int)fish.OpenDirection].Selected = true;

				expandDir.DataSource = Enum.GetValues(typeof(Fisheye.ExpandDir));
				expandDir.DataBind();
				expandDir.Items[(int)fish.ExpandDirection].Selected = true;

				gperc.Text = fish.GrowPercent.ToString();
				iwidth.Text = fish.IconWidth.ToString();
				checkPos.Checked = Fisheye.ContinuousCheckPositionInterval > 0;
			}

			theme.SelectedIndexChanged += new EventHandler(theme_SelectedIndexChanged);
			openDir.SelectedIndexChanged += new EventHandler(openDir_SelectedIndexChanged);
			expandDir.SelectedIndexChanged += new EventHandler(expandDir_SelectedIndexChanged);
			gperc.TextChanged += new EventHandler(gperc_TextChanged);
			iwidth.TextChanged += new EventHandler(iwidth_TextChanged);
			checkPos.CheckedChanged += new EventHandler(checkPos_CheckedChanged);
		}

		void checkPos_CheckedChanged(object sender, EventArgs e)
		{
			Fisheye.ContinuousCheckPositionInterval = checkPos.Checked ? 200 : 0;
		}

		void iwidth_TextChanged(object sender, EventArgs e)
		{
			int w = 0;
			int.TryParse(iwidth.Text, out w);
			if (w > 0)
				fish.IconWidth = w;
			else
				iwidth.Text = fish.IconWidth.ToString();
		}

		void gperc_TextChanged(object sender, EventArgs e)
		{
			int g = 0;
			int.TryParse(gperc.Text, out g);
			if (g > 0)
				fish.GrowPercent = g;
			else
				gperc.Text = fish.GrowPercent.ToString();
		}

		void expandDir_SelectedIndexChanged(object sender, EventArgs e)
		{
			fish.ExpandDirection = (Fisheye.ExpandDir)Enum.Parse(typeof(Fisheye.ExpandDir), expandDir.SelectedValue);
		}

		void openDir_SelectedIndexChanged(object sender, EventArgs e)
		{
			fish.OpenDirection = (Fisheye.OpenDir)Enum.Parse(typeof(Fisheye.OpenDir), openDir.SelectedValue);
		}

		void theme_SelectedIndexChanged(object sender, EventArgs e)
		{
			fish.Theme = (FisheyeThemeName)Enum.Parse(typeof(FisheyeThemeName), theme.SelectedValue);
		}
	}
}
