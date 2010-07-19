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
	public partial class SimpleCalendar : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (!IsPostBack)
			{
				foreach (CultureInfo cul in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
				{
					ListItem l = new ListItem(cul.DisplayName, cul.Name);
					l.Selected = (cul.Equals(CultureInfo.CurrentCulture));
					calCul.Items.Add(l);
				}
				cal1.MinSelectableDate = DateTime.Today - new TimeSpan(150, 0, 0, 0, 0);
				cal1.MaxSelectableDate = DateTime.Today + new TimeSpan(150, 0, 0, 0, 0);
				cal1.SelectedDate = DateTime.Today - new TimeSpan(7, 0, 0, 0, 0);

				calTheme.DataSource = Enum.GetValues(typeof(CalendarThemeName));
				calTheme.DataBind();
				calTheme.Items[(int)cal1.Theme].Selected = true;

				calMode.DataSource = Enum.GetValues(typeof(CalendarMode));
				calMode.DataBind();
				calMode.Items[(int)cal1.Mode].Selected = true;

				calDisp.Items[0].Selected = true;
			}

			calCul.SelectedIndexChanged += new EventHandler(calCul_SelectedIndexChanged);
			calTheme.SelectedIndexChanged += new EventHandler(calTheme_SelectedIndexChanged);
			calMode.SelectedIndexChanged += new EventHandler(calMode_SelectedIndexChanged);
			calDisp.SelectedIndexChanged += new EventHandler(calDisp_SelectedIndexChanged);

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

		void calTheme_SelectedIndexChanged(object sender, EventArgs e)
		{
			cal1.Theme = (CalendarThemeName)Enum.Parse(typeof(CalendarThemeName), calTheme.SelectedValue);
		}

		void calCul_SelectedIndexChanged(object sender, EventArgs e)
		{
			cal1.Culture = new CultureInfo(calCul.SelectedValue);
		}
	}
}
