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
	public partial class _Default : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{

			XmlDataHandler da = new XmlDataHandler();
			da.provider().GetData += new GetDataHandler(TestDataProvider.default_GetData);
			da.provider().SaveData += new SaveDataHandler(TestDataProvider.default_SaveData);
			da.provider().GetTotalRowCount += new GetDataHandler(TestDataProvider.default_GetTotalRecordCount);
			da.provider("productIds").GetData += new GetDataHandler(TestDataProvider.productIds_GetData);
			da.provider(wc1.Combo.ID).GetData += new GetDataHandler(TestDataProvider.dropDown_GetData);
			da.checkForAndProcessAjaxRequest(Request, Response);
			wc1.Grid.Data = da;
			wc1.Combo.Data = da;
			wc1.Grid.SelectedRowIds = new string[] { "5007030", "5007032", "4021026", "3028046" };
		}

	}
}
