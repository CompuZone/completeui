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
	public partial class MultipleComboOnXmlDataIsland : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			testIsland.Data = new TestDataHandler();
			testIsland.ColumnSource = c1;
			testIsland.Data.checkForAndProcessAjaxRequest(Request, Response);

			if (!IsPostBack)
				useRemote.Checked = testIsland.GetDataUrl != null;

			useRemote.CheckedChanged += new EventHandler(useRemote_CheckedChanged);
		}

		void useRemote_CheckedChanged(object sender, EventArgs e)
		{
			if (!useRemote.Checked)
				testIsland.GetDataUrl = null;
		}

	}
}
