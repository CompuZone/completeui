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
	/// <summary>
	/// This ASPX code behind class creates a simple list of Customer objects and puts
	/// them into session state to use during AJAX event call backs.
	/// </summary>
	public partial class GridBoundToListOfObjects : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (Session["customers"] == null)
			{
				ArrayList l = new ArrayList();
				l.Add(new Customer("0", "John", "Smith"));
				l.Add(new Customer("1", "Mark", "Aldrin"));
				l.Add(new Customer("2", "Matthew", "Jones"));
				l.Add(new Customer("3", "Luke", "Kettle"));
				Session["customers"] = l;
			}
			g.Data.provider().GetData += new Nitobi.GetDataHandler(GridBoundToListOfObjects_GetData);
			g.Data.provider().SaveData += new Nitobi.SaveDataHandler(GridBoundToListOfObjects_SaveData);
			g.Data.checkForAndProcessAjaxRequest(Request, Response);
		}

		object GridBoundToListOfObjects_GetData(HttpRequest request, Nitobi.AjaxGetDataHandlerEventArgs args)
		{
			return Session["customers"];
		}

		void GridBoundToListOfObjects_SaveData(HttpRequest request, Nitobi.AjaxSaveDataHandlerEventArgs args)
		{
			ArrayList l = (ArrayList)Session["customers"];
			for (int p = 0; p < args.Count; p++)
			{
				IRow r = args[p];
				switch (r.UpdateAction)
				{
					case UpdateAction.Update:
						Customer c = (Customer)l[Convert.ToInt32(r["Id"])];
						c.FirstName = (string)r["FirstName"];
						c.LastName = (string)r["LastName"];
						break;
					case UpdateAction.Insert:
						l.Add(new Customer(l.Count.ToString(), (string)r["FirstName"], (string)r["LastName"]));
						break;
					case UpdateAction.Delete:
						l.RemoveAt(Convert.ToInt32(r["Id"]));
						break;
				}
			}

		}
	}
}
