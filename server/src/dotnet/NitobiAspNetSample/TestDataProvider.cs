using System;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Configuration;
using System.IO;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Xml;

using Nitobi;

namespace test
{
	public class FileSysInfo : BaseTreeNode
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
	/// <summary>
	/// This class is a collection of static methods that will get data and save data for the various
	/// test pages.  Rather than coding the processing of opening the db, querying it and other things in every 
	/// page that was going to use it, they all just use these static methods.
	/// </summary>
	public class TestDataProvider
	{
		public static object fileSys_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			ArrayList files = new ArrayList();
			try
			{
				string serverPath = System.Web.HttpContext.Current.Server.MapPath("~");
				string parentPath = args.ParentRow == null?"":(string)args.ParentRow["ParentPath"];
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

		public static object xmlCustomers_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			if (System.Web.HttpContext.Current.Session["xmlCustomers"] == null)
			{
				XmlDocument doc = new XmlDocument();
				doc.LoadXml(@"
<Customers>
	<Customer Id= '0' FirstName='John'>
		<LastName>Smith</LastName>
	</Customer>
	<Customer Id= '1' FirstName='Mark' LastName='Aldrin' />
	<Customer Id= '2' FirstName='Matthew' LastName='Jones' />
	<Customer Id= '3' FirstName='Luke' LastName='Kettle' />
</Customers>
");
				System.Web.HttpContext.Current.Session["xmlCustomers"] = doc;
			}
			return ((XmlDocument)System.Web.HttpContext.Current.Session["xmlCustomers"]).SelectNodes("//Customer");
		}
		public static object xmlCustomers_GetTotalRowCount(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			return ((XmlNodeList)xmlCustomers_GetData(request, args)).Count;
		}
		public static void xmlCustomers_SaveData(HttpRequest request, Nitobi.AjaxSaveDataHandlerEventArgs args)
		{
			XmlDocument doc = (XmlDocument)System.Web.HttpContext.Current.Session["xmlCustomers"];
			XmlElement el = null;
			for (int p = 0; p < args.Count; p++)
			{
				IRow r = args[p];
				switch (r.UpdateAction)
				{
					case UpdateAction.Update:
						if ((el = findElementWithId(doc, r["Id"])) != null)
						{
							updateValue(el, "FirstName", r["FirstName"]);
							updateValue(el, "LastName", r["LastName"]);
						}
						break;
					case UpdateAction.Insert:
						break;
					case UpdateAction.Delete:
						break;
				}
			}
		}

		//------------------------------------------------------------------------------------------------------------

		public static object customers_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			if (System.Web.HttpContext.Current.Session["customers"] == null)
			{
				ArrayList l = new ArrayList();
				l.Add(new Customer("0", "John", "Smith"));
				l.Add(new Customer("1", "Mark", "Aldrin"));
				l.Add(new Customer("2", "Matthew", "Jones"));
				l.Add(new Customer("3", "Luke", "Kettle"));
				System.Web.HttpContext.Current.Session["customers"] = l;
			}
			return System.Web.HttpContext.Current.Session["customers"];
		}

		public static void customers_SaveData(HttpRequest request, Nitobi.AjaxSaveDataHandlerEventArgs args)
		{
			ArrayList l = (ArrayList)System.Web.HttpContext.Current.Session["customers"];
			for (int p = 0; p < args.Count; p++)
			{
				IRow r = args[p];
				switch (r.UpdateAction)
				{
					case UpdateAction.Update:
						Customer c = (Customer)l[Convert.ToInt32(r["Id"])];
						c.FirstName = (string)r["FirstName"];
						c.LastName = (string)r["LastName"];
						break;
					case UpdateAction.Insert:
						l.Add(new Customer(l.Count.ToString(), (string)r["FirstName"], (string)r["LastName"]));
						break;
					case UpdateAction.Delete:
						l.RemoveAt(Convert.ToInt32(r["Id"]));
						break;
				}
			}

		}

		public static object customers_GetTotalRowCount(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			if (System.Web.HttpContext.Current.Session["customers"] == null)
				customers_GetData(request, args);
			return ((ArrayList)System.Web.HttpContext.Current.Session["customers"]).Count;
		}

		//------------------------------------------------------------------------------------------------------------
		public static object roomAvailability_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			if (System.Web.HttpContext.Current.Session["roomAvailability"] == null)
			{
				ArrayList l = new ArrayList();
				l.Add(new BaseCalendarEvent(DateTime.Today + new TimeSpan(7, 0, 0, 0, 0), "Cebu City", "Scuba diving at Ocean Safari", "event", null, null, "border-top:solid red 2px;border-left:solid red 2px;"));
				l.Add(new BaseCalendarEvent(DateTime.Today + new TimeSpan(12, 0, 0, 0, 0), "Moal-Boal", "Photo shoot for Living magazine", "event", null, "CalEvent_Flight", null));
				l.Add(new BaseCalendarEvent(DateTime.Today + new TimeSpan(18, 0, 0, 0, 0), "Cebu City", "Scuba diving at Ocean Safari", "event", null, "CalEvent_Flight", null));
				l.Add(new BaseCalendarEvent(DateTime.Today - new TimeSpan(2, 0, 0, 0, 0), "Cebu City", "Wife birthday", "event", null, "CalEvent_Birthday", null));
				System.Web.HttpContext.Current.Session["roomAvailability"] = l;
			}
			return System.Web.HttpContext.Current.Session["roomAvailability"];
		}

		public static void roomAvailability_SaveData(HttpRequest request, Nitobi.AjaxSaveDataHandlerEventArgs args)
		{
			ArrayList l = (ArrayList)System.Web.HttpContext.Current.Session["roomAvailability"];
			int c = args.Count;
			for (int pos = 0; pos < c; pos++)
			{
				IRow r = args[pos];
				if (r.UpdateAction == UpdateAction.Update || r.UpdateAction == UpdateAction.Insert)
				{
					BaseCalendarEvent e = null;
					if (r.UpdateAction == UpdateAction.Update)
					{
						int index = int.Parse(r.RowKey.ToString()) - 1;
						e = (BaseCalendarEvent)l[index];
					}
					else
					{
						l.Add(e = new BaseCalendarEvent());
						r.RowKey = l.Count;
						e.StartDate = DateTime.Today;
						e.EventType = "event";
					}
					if(!Cmn.IsEmpty(r["StartDate"]))
						e.StartDate = DateTime.Parse(r["StartDate"].ToString());
					if(r["Tooltip"] != null)
						e.Tooltip = r["Tooltip"].ToString();
					if (r["Location"] != null)
						e.Location = r["Location"].ToString();
					if (r["Description"] != null)
						e.Description = r["Description"].ToString();
					if (r["CssStyle"] != null)
						e.CssStyle = r["CssStyle"].ToString();
					if (r["CssClass"] != null)
						e.CssClass = r["CssClass"].ToString();
				}
			}
		}
		//------------------------------------------------------------------------------------------------------------

		public static object productIds_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			OleDbDataAdapter dAdapter;
			string serverPath = System.Web.HttpContext.Current.Server.MapPath("~");
			OleDbConnection dbConn = new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb");

			dbConn.Open();
			OleDbCommand cmd = new OleDbCommand("select count(*) from tblProducts", dbConn);
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
			dAdapter = new OleDbDataAdapter(query, dbConn);
			dAdapter.Fill(ds.Tables[tableName]);
			addImageCol(ds.Tables[0]);
			return ds;
		}

		protected static void addImageCol(DataTable t)
		{
			t.Columns.Add("img");
			// Fill the tables from the dataset with the data from the database.
			int p = 0;
			foreach (DataRow r in t.Rows)
			{
				r["img"] = string.Format("images/scustomerimage{0}.gif", ++p);
				if (p == 5)
					p = 0;
			}
			t.AcceptChanges();
		}

		public static void default_SaveData(HttpRequest request, AjaxSaveDataHandlerEventArgs args)
		{
			string serverPath = "";
			serverPath = System.Web.HttpContext.Current.Server.MapPath(serverPath);
			OleDbConnection dbConn = new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb");
			try
			{
				dbConn.Open();
				for (int p = 0; p < args.Count; p++)
				{
					IRow r = args[p];
					UpdateAction action = r.UpdateAction;
					switch (action)
					{
						case UpdateAction.Delete:
							OleDbCommand cmd = dbConn.CreateCommand();
							cmd.CommandText = "delete from tblProducts where ProductID = @productId";
							cmd.Parameters.AddWithValue("productId", r["ProductId"]);
							cmd.ExecuteNonQuery();
							break;
						case UpdateAction.Update:
							cmd = dbConn.CreateCommand();
							cmd.CommandText = "update tblProducts set ProductName = @productName, BulkAction = @bulkAction where ProductId = @productId";
							cmd.Parameters.AddWithValue("productName", r["ProductName"]);
							cmd.Parameters.Add("bulkAction", OleDbType.Boolean).Value = Convert.ToBoolean(r["BulkAction"]);
							cmd.Parameters.AddWithValue("productId", Convert.ToInt32(r["ProductId"]));
							cmd.ExecuteNonQuery();
							break;

					}
				}
			}
			finally
			{
				dbConn.Close();
			}
		}

		public static object dropDown_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			return default_GetData(request, args);
		}

		public static object default_GetTotalRecordCount(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			string serverPath = "";
			serverPath = System.Web.HttpContext.Current.Server.MapPath(serverPath);
			OleDbConnection dbConn = new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb");

			dbConn.Open();
			int count = -1;
			try
			{
				OleDbCommand cmd = new OleDbCommand("select count(*) from tblProducts", dbConn);
				count = (int)cmd.ExecuteScalar();
				if (args.PageSize <= 0)
					count = 300;
			}
			finally
			{
				dbConn.Close();
			}
			return count;
		}

		public static object default_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			OleDbDataAdapter dAdapter;
			string serverPath = "";
			serverPath = System.Web.HttpContext.Current.Server.MapPath(serverPath);
			OleDbConnection dbConn = new OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + @"\data\generalproducts.mdb");

			dbConn.Open();
			DataSet ds = null;
			try
			{
				OleDbCommand cmd = new OleDbCommand("select count(*) from tblProducts", dbConn);
				int count = (int)cmd.ExecuteScalar();

				int pageSize = args.PageSize;
				if (pageSize <= 0)
					pageSize = count > 250 ? 250 : count;

				if (count > pageSize + args.StartRecordIndex)
					count = pageSize + args.StartRecordIndex;
				int numRows = count - args.StartRecordIndex;

				string tableName = "tblProducts", query = "";
				if (numRows > 0)
				{
					string sortField = "ProductID";
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
					query = "SELECT * FROM (SELECT TOP " + numRows + " * FROM (SELECT TOP " + count + "  * FROM tblProducts ";
					if (!Cmn.IsEmpty(args.SearchString))
						query += " WHERE ProductName LIKE '%" + args.SearchString + "%'";
					query += " ORDER BY " + sortField + " " + sortOrder + ") ORDER BY " + sortField + " " + ReverseDirection + ") ORDER BY " + sortField + " " + sortOrder;
				}

				// Fill the tables from the dataset with the data from the database.
				ds = new DataSet();
				ds.Tables.Add(tableName);
				if (numRows > 0)
				{
					dAdapter = new OleDbDataAdapter(query, dbConn);
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

		public static object indentedProductNames_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			DataSet ds = default_GetData(request, args) as DataSet;
			if (ds != null)
			{
				DataTable products = ds.Tables[0];
				int indent = 0;
				foreach (DataRow row in products.Rows)
				{
					row["ProductName"] = string.Format("#&lt;#span style='padding-left: {0}px'#&gt;#{1}#&lt;#/span#&gt;#", indent++ * 25, row["ProductName"]);
					if (indent > 3)
						indent = 0;
				}
			}
			return ds;
		}


		public static object eventTypes_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			if (System.Web.HttpContext.Current.Session["CalEventTypes"] == null)
			{
				XmlDocument doc = new XmlDocument();
				doc.LoadXml(@"
<EventTypes>
	<EventType Display='Holiday' Value='CalEvent_Holiday' />
	<EventType Display='Birthday' Value='CalEvent_Birthday' />
	<EventType Display='Flight' Value='CalEvent_Flight'  />
	<EventType Display='Car In Shop' Value='CalEvent_CarInShop' />
</EventTypes>
");
				System.Web.HttpContext.Current.Session["CalEventTypes"] = doc;
			}
			return ((XmlDocument)System.Web.HttpContext.Current.Session["CalEventTypes"]).SelectNodes("//EventType");
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
	}
}
