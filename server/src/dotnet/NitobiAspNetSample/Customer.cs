using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace test
{
	public class Customer
	{
		public string Id;
		public string FirstName;
		public string LastName;

		public Customer(string id, string fn, string ln)
		{
			Id = id;
			FirstName = fn;
			LastName = ln;
		}
	}
}
