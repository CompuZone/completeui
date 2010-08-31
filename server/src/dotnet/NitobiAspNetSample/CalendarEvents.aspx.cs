using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Globalization;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

using Nitobi;

namespace test
{
	public partial class CalendarEvents : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!IsPostBack)
			{
				cal1.SelectedDate = DateTime.Today;

				calMode.DataSource = Enum.GetValues(typeof(CalendarMode));
				calMode.DataBind();

				calMode.Items[(int)cal1.Mode].Selected = true;
				calDisp.Items[0].Selected = true;
			}

			calMode.SelectedIndexChanged += new EventHandler(calMode_SelectedIndexChanged);
			calDisp.SelectedIndexChanged += new EventHandler(calDisp_SelectedIndexChanged);
			det.ClientEvents.AfterSave = "gridSavecomplete(nitobi.getComponent('" + cal1.ClientID + "'))";
		}

		void calDisp_SelectedIndexChanged(object sender, EventArgs e)
		{
			string[] sizes = calDisp.SelectedValue.Split(',');
			cal1.MonthColumns = int.Parse(sizes[0]);
			cal1.MonthRows = int.Parse(sizes[1]);
		}

		void calMode_SelectedIndexChanged(object sender, EventArgs e)
		{
			cal1.Mode = (CalendarMode)Enum.Parse(typeof(CalendarMode), calMode.SelectedValue);
		}

	}
}
