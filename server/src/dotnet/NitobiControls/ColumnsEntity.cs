using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Security.Permissions;
using System.Xml;
using System.Xml.Serialization;

namespace Nitobi
{
	/// <summary>
	/// This is the root contain for a collection of columns and is used by all ColumnControlBase
	/// child classes to manage their columns.
	/// </summary>
	/// <remarks>This class goes beyond being a simple list of columns by providing properties
	/// that help the control manage the way the client html is rendered to the browser.  For example,
	/// there are several places where it is necesary to get a string that has the names of the columns
	/// concatenated by the | symbol.
	/// 
	/// This class also manages the generation of XML to represent itself and its columns as well as
	/// to be able to created by the simpler XML it can generate from itself.  This allow applications
	/// to provide the control a simple string for the columns to use and their property values.  This is
	/// valuable in situations where the specific columns to shown at the moment are not static, such as
	/// different users having different columns shown based on their security level.
	/// 
	/// Use the static ColumnsEntity.createFromXml method to create an instance of this class
	/// from an appropriately formatted XML string.</remarks>
	[AspNetHostingPermission(SecurityAction.Demand, Level = AspNetHostingPermissionLevel.Minimal)]
	[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
	[ParseChildren(true, "Columns")]
	public class ColumnsEntity : BaseEntity, IColumnCollection
	{
		protected bool s_registered = BaseEntity.registerChildType(typeof(ColumnsEntity));
		protected List<Column> m_columns = new List<Column>();
		protected string m_dataSourceId = null;

		public List<Column> Columns { get { return m_columns; } }

		[XmlIgnore]
		public string DataSourceId { get { return m_dataSourceId; } }

		[XmlIgnore]
		public string Xml
		{
			get
			{
				StringWriter w = new StringWriter();
				using (XmlTextWriter xw = new XmlTextWriter(w))
				{
					base.writeXmlState(xw);
					return w.ToString();
				}
			}
		}

		[XmlIgnore]
		public string ColumnNames
		{
			get
			{
				StringBuilder buff = new StringBuilder(200);
				foreach (Column c in Columns)
					if(c.ContributesToData)
						buff.Append(c.Name).Append('|');
				return buff.Length==0?"":buff.ToString(0,buff.Length - 1);
			}
		}

		[XmlIgnore]
		public string KeyColumnNames
		{
			get
			{
				StringBuilder buff = new StringBuilder(200);
				foreach (Column c in Columns)
					if (c is KeyColumn)
						buff.Append(c.Name).Append('|');
				return buff.Length == 0 ? "" : buff.ToString(0, buff.Length - 1);
			}
		}

		[XmlIgnore]
		public KeyColumn KeyColumns
		{
			get
			{
				foreach (Column c in Columns)
					if (c is KeyColumn)
						return (KeyColumn)c;
				return null;
			}
		}

		public static ColumnsEntity createFromXml(string xml)
		{
			if (Cmn.IsEmpty(xml))
				return new ColumnsEntity();

            XmlNameTable nt = new NameTable();
            XmlNamespaceManager nsMgr = new XmlNamespaceManager(nt);
            XmlParserContext context = new XmlParserContext(nt, nsMgr, null, XmlSpace.None);
            XmlTextReader xmlIn = new XmlTextReader(xml, XmlNodeType.Element, context);
            if (xmlIn.MoveToContent() == XmlNodeType.Element)
				return (ColumnsEntity)BaseEntity.createFromXml(xmlIn);
			return null;
		}

		internal virtual void setColumnsCollection(List<Column> columns)
		{
			m_columns = columns;
		}
	}

}
