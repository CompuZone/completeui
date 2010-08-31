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
	public partial class SimpleComboLocalHandler : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			c.Data.provider().GetData += new Nitobi.GetDataHandler(SimpleCombLocalHandler_GetData);
		}

		object SimpleCombLocalHandler_GetData(HttpRequest request, Nitobi.AjaxGetDataHandlerEventArgs args)
		{
			//Rather than hard coding the same test data processing, use the standard one in our TestDataProvider
			return TestDataProvider.dropDown_GetData(request, args);
		}
	}
}
