using System;
using System.Collections;
using System.Data;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Web.SessionState;

using Nitobi;

namespace test
{
	/// <summary>
	/// Summary description for $codebehindclassname$
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	public class DataHandler : IHttpHandler, IRequiresSessionState
	{

		public void ProcessRequest(HttpContext context)
		{
			XmlDataHandler da = new TestDataHandler();
			da.checkForAndProcessAjaxRequest(context.Request, context.Response);
		}

		public bool IsReusable
		{
			get
			{
				return false;
			}
		}
	}
}
