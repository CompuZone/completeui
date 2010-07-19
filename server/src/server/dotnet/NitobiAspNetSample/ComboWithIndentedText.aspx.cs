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
	public partial class IndentedCombo : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			c.Data = new TestDataHandler();
			c.Select += new EventHandler(c_Select);
			c2.Data.provider().GetData += new Nitobi.GetDataHandler(SimpleCombo_GetData);
			c2.Select += new EventHandler(c2_Select);

			clr.Click += new EventHandler(clr_Click);
		}

		void clr_Click(object sender, EventArgs e)
		{
			chosenProd.InnerHtml = "";
		}

		void c_Select(object sender, EventArgs e)
		{
			if (c.SelectedValues.Count > 0)
			{
				bool first = true;
				foreach (string v in c.SelectedValues)
				{
					if (first)
						chosenProd.InnerHtml += "<img src='" + v + "'>&nbsp;";
					else
						chosenProd.InnerHtml += v.Replace("#&lt;#", "<").Replace("#&gt;#", ">") + ", ";
					first = false;
				}
				chosenProd.InnerHtml = chosenProd.InnerText.Substring(0, chosenProd.InnerText.Length - 2) + "<br/>";
			}
		}

		void c2_Select(object sender, EventArgs e)
		{
            if (c2.SelectedValues.Count > 0)
            {
                chosenTheme.InnerHtml = string.Format("You have chosen the <b>{0}</b> theme", c2.SelectedValues[0]);
                c2.Theme = c.Theme = (Nitobi.ComboThemeName)Enum.Parse(typeof(Nitobi.ComboThemeName), c2.SelectedValues[0]);
            }
		}

		object SimpleCombo_GetData(HttpRequest request, Nitobi.AjaxGetDataHandlerEventArgs args)
		{
			return Enum.GetNames(typeof(Nitobi.ComboThemeName));
		}
	}
}
