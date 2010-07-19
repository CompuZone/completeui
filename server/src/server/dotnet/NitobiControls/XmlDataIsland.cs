using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Nitobi
{
	/// <summary>
	/// An ASP.NET control to render an xml data island that will contain the Nitobi compressed
	/// XML used as a datasource for other Nitobi controls.
	/// </summary>
	/// <remarks>This relatively simple class is designed to render an XML data island in the browser
	/// with the compressed XML used by Nitobi controls.  The data island can either have all of the data
	/// embedded within it on page load, or it can have a src attribute on it that will point to a data
	/// provider to get the data.  Either way the data is provided by the XmlDataHandler.
	/// 
	/// Currently, only the Combo control is capable of getting its data from an XML data island.  However,
	/// multiple combo controls can share one XML data island.  This is an important option when showing several
	/// combo controls that all use the same list for the user to choose an item from.</remarks>
	[ToolboxData("<{0}:XmlDataIsland runat=server></{0}:XmlDataIsland>")]
	public class XmlDataIsland : Control
	{
		protected XmlDataHandler m_dataHandler = null;
		protected ColumnControlBase m_columnSource = null;
		protected string m_getHandlerUrl = null;

		public XmlDataHandler Data { get { return m_dataHandler; } set { m_dataHandler = value; } }
		public ColumnControlBase ColumnSource { get { return m_columnSource; } set { m_columnSource = value; } }
		public string GetDataUrl { get { return m_getHandlerUrl; } set { m_getHandlerUrl = value; } }

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(NitobiControlBase), "Nitobi.scripts.nitobi.toolkit.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.Toolkit", scriptUrl);

		}
		protected override void Render(HtmlTextWriter output)
		{
			if (Data != null && ColumnSource != null)
				if (GetDataUrl == null)
					Data.generateXmlDataIsland(Page.Request, output, ID, ColumnSource.calculatedDataSourceId(), ColumnSource.Columns);
				else
					output.Write("<xml id='{0}' src='{1}'></xml>", ID,
						string.Format(GetDataUrl.Contains("?") ? "{0}&NitCols={1}&xid={2}" : "{0}?NitCols={1}&xid={2}",
							GetDataUrl, Uri.EscapeDataString(Cmn.ToBase64(ColumnSource.Columns.Xml)), ColumnSource.calculatedDataSourceId()));
		}
	}

}
