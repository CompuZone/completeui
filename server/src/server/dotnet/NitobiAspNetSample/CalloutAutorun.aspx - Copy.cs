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
	public partial class CalloutAutorun : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!Page.IsPostBack)
			{
				//co1.AttachedTo = d.ClientID;

				autostart.DataSource = Enum.GetValues(typeof(CalloutAutorunOption));
				autostart.DataBind();
				autostart.Items[(int)co1.AutoRun].Selected = true;

				theme.DataSource = Enum.GetValues(typeof(CalloutThemeName));
				theme.DataBind();
				theme.Items[(int)co1.Theme].Selected = true;

				iconType.DataSource = Enum.GetValues(typeof(CalloutIconStyle));
				iconType.DataBind();
				iconType.Items[(int)co1.IconStyle].Selected = true;

				direction.DataSource = Enum.GetValues(typeof(CalloutDirection));
				direction.DataBind();
				direction.Items[(int)co1.CalloutDirection].Selected = true;
				ViewState["OrigBody"] = co1.Body;
			}
			if (includeVid.Checked)
			{
				co1.Body = @"<div style='display:inline;float:left;'>";
				if (true)
					co1.Body += "<object width='250' height='225'><param name='movie' value='http://www.youtube.com/v/eczYAcmgdAc&hl=en&fs=1'></param><param name='allowFullScreen' value='true'></param><embed src='http://www.youtube.com/v/eczYAcmgdAc&hl=en&fs=1' type='application/x-shockwave-flash' allowfullscreen='true' width='250' height='225'></embed></object>";
				else
					co1.Body += "<object width='250' height='225'><param name='movie' value='http://www.youtube.com/v/in013-CfSj8&hl=en&fs=1'></param><param name='allowFullScreen' value='true'></param><embed src='http://www.youtube.com/v/in013-CfSj8&hl=en&fs=1' type='application/x-shockwave-flash' allowfullscreen='true' width='250' height='225'></embed></object>";
				co1.Body += "</div>" + ViewState["OrigBody"].ToString();
			}
			else
				co1.Body = ViewState["OrigBody"].ToString();

			theme.SelectedIndexChanged += new EventHandler(theme_SelectedIndexChanged);
			iconType.SelectedIndexChanged += new EventHandler(iconType_SelectedIndexChanged);
			autostart.SelectedIndexChanged += new EventHandler(autostart_SelectedIndexChanged);
			coHeight.SelectedIndexChanged += new EventHandler(coHeight_SelectedIndexChanged);
			direction.SelectedIndexChanged += new EventHandler(direction_SelectedIndexChanged);
		}

		void direction_SelectedIndexChanged(object sender, EventArgs e)
		{
			co1.CalloutDirection = (CalloutDirection)Enum.Parse(typeof(CalloutDirection), direction.SelectedValue);
		}

		void coHeight_SelectedIndexChanged(object sender, EventArgs e)
		{
			co1.Height = new Unit(coHeight.SelectedValue);
		}

		void autostart_SelectedIndexChanged(object sender, EventArgs e)
		{
			co1.AutoRun = (CalloutAutorunOption)Enum.Parse(typeof(CalloutAutorunOption), autostart.SelectedValue);
		}

		void iconType_SelectedIndexChanged(object sender, EventArgs e)
		{
			co1.IconStyle = (CalloutIconStyle)Enum.Parse(typeof(CalloutIconStyle), iconType.SelectedValue);
		}

		void theme_SelectedIndexChanged(object sender, EventArgs e)
		{
			co1.Theme = (CalloutThemeName)Enum.Parse(typeof(CalloutThemeName), theme.SelectedValue);
		}
	}
}
