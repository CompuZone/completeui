using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Collections;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Xml;

using Nitobi;

namespace editors
{
    public class EditorsDataProvider
    {
        private static string localConnectionString = ConfigurationManager.ConnectionStrings["Personal"].ConnectionString;

        public static object productIds_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            //OleDbCommand cmd = new OleDbCommand("select count(*) from tblProducts", dbConn);
            SqlCommand cmd = new SqlCommand("select count(*) from tblProducts", dbConn);
            int count = (int)cmd.ExecuteScalar();

            if (count > args.PageSize + args.StartRecordIndex)
                count = args.PageSize + args.StartRecordIndex;
            int numRows = count - args.StartRecordIndex;

            string query = "";
            string sortField = "ProductID";
            Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Asc;
            if (!Cmn.IsEmpty(args.SortColumn))
            {
                sortField = args.SortColumn;
                sortOrder = args.SortDirection;
            }

            string ReverseDirection;
            if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
            string tableName;
            // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
            // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
            // preceeding code.
            query = "SELECT * FROM tblProductCategories";
            if (!Cmn.IsEmpty(args.SearchString))
                query += " WHERE ProductCategoryName LIKE '" + args.SearchString + "%'";
            tableName = "tblProductCategories";
            DataSet ds = new DataSet();
            ds.Tables.Add(tableName);
            dAdapter = new SqlDataAdapter(query, dbConn);
            dAdapter.Fill(ds.Tables[tableName]);
            addImageCol(ds.Tables[0]);
            return ds;
        }

        protected static void addImageCol(DataTable t)
        {
            t.Columns.Add("img");
            // Fill the tables from the dataset with the data from the database.
            int p = 0;
            ArrayList imgs = new ArrayList(5);
            string dir = "/i/icons/";
            imgs.Add(dir + "customer.gif");
            imgs.Add(dir + "rss.gif");
            imgs.Add(dir + "window-hover.gif");
            imgs.Add(dir + "window.gif");
            imgs.Add(dir + "zoom.png");
            foreach (DataRow r in t.Rows)
            {
                r["img"] = imgs[++p].ToString();
                if (p == 4)
                    p = 0;
            }
            t.AcceptChanges();
        }

        public static void default_SaveData(HttpRequest request, AjaxSaveDataHandlerEventArgs args)
        {
            string tableName = "people";
            string primaryKey = "ContactID";
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            try
            {
                dbConn.Open();
                // Each element of 'args' is an XML Node representing a changed row in the Grid.
                for (int p = 0; p < args.Count; p++)
                {
                    // We cast the xml node as an IRow.
                    IRow r = args[p];
                    // Depending on the type of update action specified for the row (can be one of Insert, Update or Delete),
                    // perform the right command in our database.
                    UpdateAction action = r.UpdateAction;
                    switch (action)
                    {
                        case UpdateAction.Delete:
                            SqlCommand cmdDelete = dbConn.CreateCommand();
                            cmdDelete.CommandText = "DELETE FROM " + tableName + " WHERE " + primaryKey + " = @" + primaryKey;
                            cmdDelete.Parameters.AddWithValue("@" + primaryKey, r[primaryKey]);
                            cmdDelete.ExecuteNonQuery();
                            break;
                        case UpdateAction.Update:
                            SqlCommand cmdUpdate = dbConn.CreateCommand();
                            cmdUpdate.CommandText = "UPDATE " + tableName + " SET ContactName = @ContactName, ";
                            cmdUpdate.CommandText += "ContactEmail = @ContactEmail, JobTitle = @JobTitle, ";
                            cmdUpdate.CommandText += "CompanyName = @CompanyName, Gender = @Gender, ";
                            cmdUpdate.CommandText += "Birthday = @Birthday ";
                            cmdUpdate.CommandText += "WHERE " + primaryKey + " = @" + primaryKey;
                            cmdUpdate.Parameters.AddWithValue("@" + primaryKey, r[primaryKey]);
                            cmdUpdate.Parameters.AddWithValue("@ContactName", r["ContactName"]);
                            cmdUpdate.Parameters.AddWithValue("@ContactEmail", r["ContactEmail"]);
                            cmdUpdate.Parameters.AddWithValue("@JobTitle", r["JobTitle"]);
                            cmdUpdate.Parameters.AddWithValue("@CompanyName", r["CompanyName"]);
                            cmdUpdate.Parameters.AddWithValue("@Birthday", r["Birthday"]);
                            cmdUpdate.Parameters.Add("@Gender", OleDbType.Boolean).Value = Convert.ToBoolean(r["Gender"]);
                            cmdUpdate.ExecuteNonQuery();
                            break;
                        case UpdateAction.Insert:
                            SqlCommand cmdInsert = dbConn.CreateCommand();
                            cmdInsert.CommandText = "INSERT INTO " + tableName + " (ContactName, ContactEmail, JobTitle, CompanyName, Gender, Birthday) VALUES (@ContactName, @ContactEmail, @JobTitle, @CompanyName, @Gender, @Birthday)";
                            cmdInsert.Parameters.AddWithValue("@ContactName", r["ContactName"]);
                            cmdInsert.Parameters.AddWithValue("@ContactEmail", r["ContactEmail"]);
                            cmdInsert.Parameters.AddWithValue("@JobTitle", r["JobTitle"]);
                            cmdInsert.Parameters.AddWithValue("@CompanyName", r["CompanyName"]);
                            cmdInsert.Parameters.AddWithValue("@Birthday", r["Birthday"]);
                            cmdInsert.Parameters.Add("@Gender", OleDbType.Boolean).Value = Convert.ToBoolean(r["Gender"]);
                            cmdInsert.ExecuteNonQuery();
                            break;
                    }
                }
            }
            finally
            {
                dbConn.Close();
            }
        }
        public static object roomavailability_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            ArrayList l = new ArrayList();
            l.Add(new BaseCalendarEvent(DateTime.Now, "Nitobi Office", "We test CUI.NET today!", "event", null, null, null));
            return l;
        }
        public static object dropDown_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            DataSet ds = null;
            try
            {
                string tableName = "people", query = "";
                SqlCommand cmd = new SqlCommand("select count(*) from " + tableName, dbConn);
                int count = (int)cmd.ExecuteScalar();
                int pageSize = args.PageSize;
                if (pageSize <= 0)
                    pageSize = count > 250 ? 250 : count;

                if (count > pageSize + args.StartRecordIndex)
                    count = pageSize + args.StartRecordIndex;
                int numRows = count - args.StartRecordIndex;

                if (numRows > 0)
                {
                    string sortField = "ContactID";
                    Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Asc;
                    if (!Cmn.IsEmpty(args.SortColumn))
                    {
                        sortField = args.SortColumn;
                        sortOrder = args.SortDirection;
                    }

                    string ReverseDirection;
                    if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
                    // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
                    // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
                    // preceeding code.
                    string sort = " ORDER BY " + sortField + " " + sortOrder;
                    //SELECT DISTINCT TOP 250 JobTitle FROM (SELECT ROW_NUMBER() OVER ( ORDER BY ContactID Asc) AS Row, JobTitle FROM people WHERE JobTitle LIKE '%') AS X WHERE Row > 0
                    query = "SELECT DISTINCT TOP " + numRows + " JobTitle FROM (";
                    query += "SELECT ROW_NUMBER() OVER (" + sort + ") AS Row, JobTitle FROM " + tableName;
                    if (!Cmn.IsEmpty(args.SearchString))
                        query += " WHERE JobTitle LIKE '" + args.SearchString + "%'";
                    query += ") AS X WHERE Row > " + args.StartRecordIndex.ToString();
                }

                // Fill the tables from the dataset with the data from the database.
                ds = new DataSet();
                ds.Tables.Add(tableName);
                if (numRows > 0)
                {
                    dAdapter = new SqlDataAdapter(query, dbConn);
                    dAdapter.Fill(ds.Tables[tableName]);
                    addImageCol(ds.Tables[0]);
                }
            }
            finally
            {
                dbConn.Close();
            }
            return ds;
        }

        public static object combo_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            DataSet ds = null;
            try
            {
                string tableName = "people", query = "";
                SqlCommand cmd = new SqlCommand("select count(*) from " + tableName, dbConn);
                int count = (int)cmd.ExecuteScalar();
                int pageSize = args.PageSize;
                if (pageSize <= 0)
                    pageSize = count > 250 ? 250 : count;

                if (count > pageSize + args.StartRecordIndex)
                    count = pageSize + args.StartRecordIndex;
                int numRows = count - args.StartRecordIndex;

                if (numRows > 0)
                {
                    string sortField = "ContactName";
                    Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Asc;
                    if (!Cmn.IsEmpty(args.SortColumn))
                    {
                        sortField = args.SortColumn;
                        sortOrder = args.SortDirection;
                    }

                    string ReverseDirection;
                    if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
                    // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
                    // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
                    // preceeding code.
                    // SELECT TOP 25 * FROM tblCustomers WHERE ContactName LIKe 'search%'
                    string sort = " ORDER BY ContactID ASC";

                    query = "SELECT TOP " + numRows + " * FROM (";
                    query += "SELECT ROW_NUMBER() OVER (" + sort + ") AS Row, * FROM " + tableName;
                    query += " WHERE " + sortField + " LIKE '" + args.SearchString + "%'";
                    query += ") AS X WHERE Row > " + args.StartRecordIndex.ToString();
                }

                // Fill the tables from the dataset with the data from the database.
                ds = new DataSet();
                ds.Tables.Add(tableName);
                if (numRows > 0)
                {
                    dAdapter = new SqlDataAdapter(query, dbConn);
                    dAdapter.Fill(ds.Tables[tableName]);
                    addImageCol(ds.Tables[0]);
                }
            }
            finally
            {
                dbConn.Close();
            }
            return ds;
        }

        public static object listbox_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            DataSet ds = null;
            try
            {
                string tableName = "people", query = "";
                SqlCommand cmd = new SqlCommand("select count(*) from " + tableName, dbConn);
                int count = (int)cmd.ExecuteScalar();
                int pageSize = args.PageSize;
                if (pageSize <= 0)
                    pageSize = count > 250 ? 250 : count;

                if (count > pageSize + args.StartRecordIndex)
                    count = pageSize + args.StartRecordIndex;
                int numRows = count - args.StartRecordIndex;

                if (numRows > 0)
                {
                    string sortField = "ContactID";
                    Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Asc;
                    if (!Cmn.IsEmpty(args.SortColumn))
                    {
                        sortField = args.SortColumn;
                        sortOrder = args.SortDirection;
                    }

                    string ReverseDirection;
                    if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
                    // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
                    // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
                    // preceeding code.
                    string sort = " ORDER BY " + sortField + " " + sortOrder;
                    //SELECT DISTINCT TOP 250 JobTitle FROM (SELECT ROW_NUMBER() OVER ( ORDER BY ContactID Asc) AS Row, JobTitle FROM people WHERE JobTitle LIKE '%') AS X WHERE Row > 0
                    query = "SELECT DISTINCT TOP " + numRows + " JobTitle FROM (";
                    query += "SELECT ROW_NUMBER() OVER (" + sort + ") AS Row, JobTitle FROM " + tableName;
                    query += ") AS X WHERE Row > " + args.StartRecordIndex.ToString();
                }

                // Fill the tables from the dataset with the data from the database.
                ds = new DataSet();
                ds.Tables.Add(tableName);
                if (numRows > 0)
                {
                    dAdapter = new SqlDataAdapter(query, dbConn);
                    dAdapter.Fill(ds.Tables[tableName]);
                    addImageCol(ds.Tables[0]);
                }
            }
            finally
            {
                dbConn.Close();
            }
            return ds;
        }
        public static object default_GetTotalRecordCount(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            /*
            string serverPath = "";
            serverPath = System.Web.HttpContext.Current.Server.MapPath(serverPath);
            OleDbConnection dbConn = new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\generalproducts.mdb");
            */
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            int count = -1;
            try
            {
                SqlCommand cmd = new SqlCommand("select count(*) from tblProducts", dbConn);
                count = (int)cmd.ExecuteScalar();
            }
            finally
            {
                dbConn.Close();
            }
            return count;
        }

        public static object default_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            SqlDataAdapter dAdapter;
            /*
            string serverPath = "";
            serverPath = System.Web.HttpContext.Current.Server.MapPath(serverPath);
            OleDbConnection dbConn = new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\generalproducts.mdb");
            */
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            // Create a DataSet object - we will populate it full of data from our server and return that to the Grid.
            DataSet ds = null;
            
            try
            {
                string tableName = "people", query = "";
                SqlCommand cmd = new SqlCommand("select count(*) from " + tableName, dbConn);
                int count = (int)cmd.ExecuteScalar();
                int pageSize = args.PageSize;
                if (pageSize <= 0)
                    pageSize = 10;

                if (count > 0)
                {
                    string sortField = "ContactID";
                    Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Asc;
                    if (!Cmn.IsEmpty(args.SortColumn))
                    {
                        sortField = args.SortColumn;
                        sortOrder = args.SortDirection;
                    }

                    string ReverseDirection;
                    if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
                    // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
                    // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
                    // preceeding code.
                    string sort = " ORDER BY " + sortField + " " + sortOrder;
                    query = "SELECT TOP " + pageSize + " * FROM (";
                    query += "SELECT ROW_NUMBER() OVER (" + sort + ") AS Row, * FROM "+tableName+") AS X WHERE Row > " + args.StartRecordIndex.ToString();
                    if (!Cmn.IsEmpty(args.SearchString))
                        query += " AND JobTitle LIKE '%" + args.SearchString + "%'";
                    
                }

                // Fill the tables from the dataset with the data from the database.
                ds = new DataSet();
                ds.Tables.Add(tableName);
                if (count > 0)
                {
                    dAdapter = new SqlDataAdapter(query, dbConn);
                    dAdapter.Fill(ds.Tables[tableName]);
                    addImageCol(ds.Tables[0]);
                }
            }
            finally
            {
                dbConn.Close();
            }
            return ds;
        }

        public static object smartlist_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            string tableName = "tblContacts";
            string searchField = "ContactInfo";
            string sortField = "TimesEmailed";
            Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Desc;
            string query = "";
            int numRows = 0;

            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();

            try
            {
                SqlCommand cmd = new SqlCommand("select count(*) from " + tableName, dbConn);
                int count = (int)cmd.ExecuteScalar();
                int pageSize = args.PageSize;
                if (pageSize <= 0)
                    pageSize = count > 250 ? 250 : count;

                if (count > pageSize + args.StartRecordIndex)
                    count = pageSize + args.StartRecordIndex;
                numRows = count - args.StartRecordIndex;

                if (numRows > 0)
                {
                    if (!Cmn.IsEmpty(args.SortColumn))
                    {
                        sortField = args.SortColumn;
                        sortOrder = args.SortDirection;
                    }

                    string ReverseDirection;
                    if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
                    // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
                    // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
                    // preceeding code.
                    string sort = " ORDER BY " + sortField + " " + sortOrder;
                    query = "SELECT TOP " + numRows + " * FROM (";
                    query += "SELECT ROW_NUMBER() OVER (" + sort + ") AS Row, * FROM " + tableName + ") AS X WHERE Row > " + args.StartRecordIndex.ToString();
                    if (!Cmn.IsEmpty(args.SearchString))
                        query += " AND " + searchField + " LIKE '%" + args.SearchString + "%'";
                }
            }
            finally
            {
                dbConn.Close();
            }
            return generic_GetData(tableName, query, numRows);
        }

        public static object unbound_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            if (System.Web.HttpContext.Current.Session["xmlCities"] == null)
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(@"
<Cities>
      <City Id=""0"" CityName=""Vancouver"" Population=""3,000,000"" />
      <City Id=""1"" CityName=""Toronto"" Population=""4,500,000"" />
      <City Id=""2"" CityName=""Ottawa"" Population=""1,000,000"" />
      <City Id=""3"" CityName=""California"" Population=""4,500,000"" />
      <City Id=""4"" CityName=""Halifax"" Population=""900,000"" />
      <City Id=""5"" CityName=""Calgary"" Population=""1,500,000"" />
      <City Id=""6"" CityName=""Red Deer"" Population=""100,000"" />
      <City Id=""7"" CityName=""Prince George"" Population=""200,000"" />
      <City Id=""8"" CityName=""Portland"" Population=""1,500,000"" />
      <City Id=""9"" CityName=""Atlanta"" Population=""4,500,000"" />
</Cities>
    ");
                System.Web.HttpContext.Current.Session["xmlCities"] = doc;
            }
            return ((XmlDocument)System.Web.HttpContext.Current.Session["xmlCities"]).SelectNodes("//City");
        }

        public static object unicode_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            StreamReader sr = new StreamReader(request.PhysicalApplicationPath + "combo\\CountryNamesAndFlags.xml");
            string countries_xml = "", line;

            line = sr.ReadLine();

            while (line != null)
            {
                countries_xml += line;
                line = sr.ReadLine();
            }

            sr.Close();

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(@countries_xml);
            System.Web.HttpContext.Current.Session["unicode_countries"] = doc;

            return ((XmlDocument)System.Web.HttpContext.Current.Session["unicode_countries"]).SelectNodes("//memberNation");
        }

        public static object smartsearch_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            string tableName = "tblFolderInfo";
            string searchField = "FolderAbsolute";
            string sortField = "FolderAbsolute";
            Nitobi.SortOrder sortOrder = Nitobi.SortOrder.Asc;
            string query = "";
            int numRows = 0;

            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();

            try
            {
                SqlCommand cmd = new SqlCommand("select count(*) from " + tableName, dbConn);
                int count = (int)cmd.ExecuteScalar();
                int pageSize = args.PageSize;
                if (pageSize <= 0)
                    pageSize = count > 250 ? 250 : count;

                if (count > pageSize + args.StartRecordIndex)
                    count = pageSize + args.StartRecordIndex;
                numRows = count - args.StartRecordIndex;

                if (numRows > 0)
                {
                    if (!Cmn.IsEmpty(args.SortColumn))
                    {
                        sortField = args.SortColumn;
                        sortOrder = args.SortDirection;
                    }

                    string ReverseDirection;
                    if (sortOrder == Nitobi.SortOrder.Asc) ReverseDirection = Nitobi.SortOrder.Desc.ToString(); else ReverseDirection = Nitobi.SortOrder.Asc.ToString();
                    // The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
                    // Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
                    // preceeding code.
                    string sort = " ORDER BY " + sortField + " " + sortOrder;
                    query = "SELECT TOP " + numRows + " * FROM (";
                    query += "SELECT ROW_NUMBER() OVER (" + sort + ") AS Row, * FROM " + tableName + ") AS X WHERE Row > " + args.StartRecordIndex.ToString();
                    if (!Cmn.IsEmpty(args.SearchString))
                        query += " AND " + searchField + " LIKE '%" + args.SearchString + "%'";
                }
            }
            finally
            {
                dbConn.Close();
            }
            return generic_GetData(tableName, query, numRows);
        }

        public static object generic_GetData(string tableName, string query, int numRows)
        {
            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            DataSet ds = null;
            try
            {
                // Fill the tables from the dataset with the data from the database.
                ds = new DataSet();
                ds.Tables.Add(tableName);
                if (numRows > 0)
                {
                    dAdapter = new SqlDataAdapter(query, dbConn);
                    dAdapter.Fill(ds.Tables[tableName]);
                    addImageCol(ds.Tables[0]);
                }
            }
            finally
            {
                dbConn.Close();
            }
            return ds;
        }

        static private XmlElement findElementWithId(XmlDocument doc, object id)
        {
            XmlElement el = doc.SelectSingleNode(string.Format("//Customer[@Id = '{0}']", id)) as XmlElement;
            if (el == null)
                el = doc.SelectSingleNode(string.Format("//Customer[Id = '{0}']", id)) as XmlElement;
            return el;
        }

        static private void updateValue(XmlElement el, string key, object val)
        {
            if (val == null)
                val = "";
            if (el.HasAttribute(key))
                el.SetAttribute(key, val.ToString());
            else
            {
                XmlNode c = el.SelectSingleNode(key);
                if (c != null)
                    c.InnerText = val.ToString();
            }
        }

        public static object worldTree_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            SqlDataAdapter dAdapter;
            SqlConnection dbConn = new SqlConnection(localConnectionString);
            dbConn.Open();
            DataSet ds = null;
            ds = new DataSet();

            ArrayList regions = new ArrayList();
            string tableName = "tblRegions";
            string sortColumn = "RegionName";
            string regionOwner = args.ParentRow["RegionID"] == "0" ? "0" : (string)args.ParentRow["RegionID"];
            string query = "SELECT * FROM " + tableName + " WHERE RegionOwner = '" + regionOwner + "' ORDER BY " + sortColumn + " ASC";
            try
            {
                ds.Tables.Add(tableName);
                dAdapter = new SqlDataAdapter(query, dbConn);
                dAdapter.Fill(ds.Tables[tableName]);

                foreach (DataRow dr in ds.Tables[tableName].Rows)
                {
                    WorldNode wn = new WorldNode((string)dr["RegionName"], dr["RegionOwner"].ToString(), (int)dr["RegionID"]);
                    regions.Add(wn);
                }
            }
            finally
            {
                dbConn.Close();
            }
            return regions;
        }

        public static object fileSys_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
        {
            ArrayList files = new ArrayList();
            try
            {
                string serverPath = System.Web.HttpContext.Current.Server.MapPath("~");
                string parentPath = args.ParentRow == null ? "" : (string)args.ParentRow["ParentPath"];
                string curPath = args.ParentRow == null ? "" : (string)args.ParentRow["label"];
                DirectoryInfo di = new DirectoryInfo(Cmn.pathCombine(serverPath, parentPath, curPath));
                if (di.Exists)
                {
                    string parentName = di.FullName;
                    parentName = di.FullName.Substring(serverPath.Length);
                    foreach (DirectoryInfo cdi in di.GetDirectories())
                    {
                        FileSysInfo fs = new FileSysInfo(parentName, cdi.Name, true);
                        if (string.Compare(cdi.Name, "App_Themes", true) == 0 || string.Compare(curPath, "App_Themes", true) == 0)
                            fs.Icon = "images/theme.png";
                        files.Add(fs);
                    }
                    foreach (FileInfo cfi in di.GetFiles())
                    {
                        FileSysInfo fs = new FileSysInfo(parentName, cfi.Name, false);
                        if (File.Exists(Cmn.pathCombine(serverPath, "images", cfi.Extension.Substring(1) + ".png")))
                            fs.Icon = "images/" + cfi.Extension.Substring(1) + ".png";

                        files.Add(fs);
                    }
                }
            }
            catch (Exception e)
            {
                FileSysInfo fs = new FileSysInfo("", e.ToString(), false);
                files.Add(fs);
            }
            return files;
        }

        public class FileSysInfo : Nitobi.BaseTreeNode
        {
            public string ParentPath = "";
            public FileSysInfo(string parentPath, string fileName, bool isDirectory)
            {
                Label = fileName;
                ParentPath = parentPath;
                NodeType = isDirectory ? TreeNodeType.Node : TreeNodeType.Leaf;
                HasChildren = isDirectory ? TreeNodeChildren.True : TreeNodeChildren.False;
            }
        }

        public class WorldNode : Nitobi.BaseTreeNode
        {
            public string RegionOwner = "0";
            public int RegionID;
            public WorldNode(string regionName, string regionOwner, int id)
            {
                bool leaf = regionOwner == "0" ? false : true;
                Label = regionName;
                RegionOwner = regionOwner == "" ? "0" : regionOwner;
                NodeType = leaf ? TreeNodeType.Leaf : TreeNodeType.Node;
                HasChildren = leaf ? TreeNodeChildren.False : TreeNodeChildren.True;
                RegionID = id;
            }
        }

    }
}
