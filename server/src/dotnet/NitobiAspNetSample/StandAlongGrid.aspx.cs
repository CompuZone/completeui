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
	public partial class StandAlongGrid : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			g.Data = new TestDataHandler();
			g.SelectedRowIds = new string[] { "3", "7", "15", "10", "500", "1000", "4000"};
			g.Data.checkForAndProcessAjaxRequest(Request, Response);
		}
	}
}
