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
	public partial class CustomerInfoDetails : System.Web.UI.UserControl
	{
		protected override void Render(HtmlTextWriter writer)
		{
			writer.Write("<div id='{0}' style='width:450px'>\n", ClientID);
			base.Render(writer);
			writer.Write("</div>\n");
		}
	}
}