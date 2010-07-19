using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

using Nitobi;

namespace test
{
	public class TestDataHandler : XmlDataHandler
	{
		public TestDataHandler()
		{
			provider().GetData += new GetDataHandler(TestDataProvider.default_GetData);
			provider().SaveData += new SaveDataHandler(TestDataProvider.default_SaveData);
			provider().GetTotalRowCount +=new GetDataHandler(TestDataProvider.default_GetTotalRecordCount);
			provider("indentedProductNames").GetData += new GetDataHandler(TestDataProvider.indentedProductNames_GetData);
			provider("indentedProductNames").GetTotalRowCount += new GetDataHandler(TestDataProvider.default_GetTotalRecordCount);
			provider("productIds").GetData += new GetDataHandler(TestDataProvider.productIds_GetData);
			provider("c").GetData += new GetDataHandler(TestDataProvider.dropDown_GetData);
			provider("fileSys").GetData +=new GetDataHandler(TestDataProvider.fileSys_GetData);
			provider("customers").GetData +=new GetDataHandler(TestDataProvider.customers_GetData);
			provider("customers").GetTotalRowCount+=new GetDataHandler(TestDataProvider.customers_GetTotalRowCount);
			provider("customers").SaveData+=new SaveDataHandler(TestDataProvider.customers_SaveData);

			provider("xmlCustomers").GetData += new GetDataHandler(TestDataProvider.xmlCustomers_GetData);
			provider("xmlCustomers").GetTotalRowCount += new GetDataHandler(TestDataProvider.xmlCustomers_GetTotalRowCount);
			provider("xmlCustomers").SaveData += new SaveDataHandler(TestDataProvider.xmlCustomers_SaveData);

			provider("roomAvailability").GetData +=new GetDataHandler(TestDataProvider.roomAvailability_GetData);
			provider("roomAvailability").SaveData+=new SaveDataHandler(TestDataProvider.roomAvailability_SaveData);

			provider("eventTypes").GetData += new GetDataHandler(TestDataProvider.eventTypes_GetData);
		}
	}
}
