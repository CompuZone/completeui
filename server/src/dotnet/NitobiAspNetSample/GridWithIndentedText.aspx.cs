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
	public partial class IndentedGrid : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			g.Data.provider().GetData += new Nitobi.GetDataHandler(TestDataProvider.indentedProductNames_GetData);
			//g.Data.provider().SaveData += new Nitobi.SaveDataHandler(GridBoundToListOfObjects_SaveData);
		}

	}
}
