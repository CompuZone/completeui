using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using Nitobi;

namespace editors
{
    public class EditorsDataHandler : XmlDataHandler
    {
        public EditorsDataHandler()
        {
            provider().GetData += new GetDataHandler(EditorsDataProvider.default_GetData);
            provider().SaveData += new SaveDataHandler(EditorsDataProvider.default_SaveData);
            provider().GetTotalRowCount += new GetDataHandler(EditorsDataProvider.default_GetTotalRecordCount);
            provider("productIds").GetData += new GetDataHandler(EditorsDataProvider.productIds_GetData);
            provider("lookup").GetData += new GetDataHandler(EditorsDataProvider.dropDown_GetData);
            provider("listbox").GetData += new GetDataHandler(EditorsDataProvider.listbox_GetData);
            provider("combo").GetData += new GetDataHandler(EditorsDataProvider.combo_GetData);
            provider("smartlist").GetData += new GetDataHandler(EditorsDataProvider.smartlist_GetData);
            provider("smartsearch").GetData += new GetDataHandler(EditorsDataProvider.smartsearch_GetData);
            provider("unbound").GetData += new GetDataHandler(EditorsDataProvider.unbound_GetData);
            provider("unicode").GetData += new GetDataHandler(EditorsDataProvider.unicode_GetData);
            provider("filesys").GetData += new GetDataHandler(EditorsDataProvider.fileSys_GetData);
            provider("regions").GetData += new GetDataHandler(EditorsDataProvider.worldTree_GetData);
            provider("roomavailability").GetData += new GetDataHandler(EditorsDataProvider.roomavailability_GetData);
        }
    }
}
