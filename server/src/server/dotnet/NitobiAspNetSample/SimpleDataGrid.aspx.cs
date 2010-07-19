using System;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace test
{
	public partial class SimpleDataGrid : System.Web.UI.Page
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
			g.Data.provider().GetData += new Nitobi.GetDataHandler(SimpleDataGrid_GetData);
		}

		object SimpleDataGrid_GetData(HttpRequest request, Nitobi.AjaxGetDataHandlerEventArgs args)
		{
			return Session["customers"];
		}
	}
}
