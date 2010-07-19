using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Text;
using System.Web;
using System.Xml;

namespace Nitobi
{
	/// <summary>
	/// This is the main class for providing data for all of the Nitobi controls that
	/// bind to rows of data in a data source.
	/// </summary>
	/// <remarks>
	/// </remarks>
	public class XmlDataHandler
	{
		protected Dictionary<string, IDataProvider> m_dataProviders = new Dictionary<string, IDataProvider>();
		protected string m_requestColumnControlId = null;
		protected ColumnsEntity m_providedColumnsEntity = null;

		public bool checkForAndProcessAjaxRequest(HttpRequest request, HttpResponse response)
		{
			bool isAjaxRequest = false;
			int ajaxRequestType = calcAjaxRequestType(request);
			if (ajaxRequestType != AjaxRequestTypes.NotAjaxRequest)
			{
				isAjaxRequest = true;
				if (ajaxRequestType == AjaxRequestTypes.GridSaveDataRequest)
					processSaveDataRequest(request, response, ajaxRequestType);
				else
					processGetDataRequest(request, response, ajaxRequestType);
			}

			return isAjaxRequest;
		}

		public virtual IDataProvider addProvider(IDataProvider provider)
		{
			m_dataProviders.Add(provider.DataId, provider);
			return provider;
		}

		public virtual ColumnsEntity ColumnsNeededForResponse
		{
			get
			{
				return m_providedColumnsEntity;
			}
			set
			{
				m_providedColumnsEntity = value;
			}
		}

		public Dictionary<string, IDataProvider> DataProviders { get { return m_dataProviders; } }

		public GeneralDataProvider provider(string dataId)
		{
			IDataProvider ip;
			GeneralDataProvider g = null;
			if (m_dataProviders.TryGetValue(dataId, out ip))
				g = ip as GeneralDataProvider;
			else
			{
				g = new GeneralDataProvider(dataId);
				m_dataProviders.Add(dataId, g);
			}
			return g;
		}

		public GeneralDataProvider provider()
		{
			return provider("_default");
		}

		protected virtual IEnumerable getDataSourceEnumerator(object dataSource)
		{
			IEnumerable dsEn = null;

			ITypedList tl = dataSource as ITypedList;
			if (tl == null && dataSource is IListSource)
			{
				IList lists = ((IListSource)dataSource).GetList();
				foreach (object l in lists)
				{
					ICustomTypeDescriptor td = l as ICustomTypeDescriptor;
					if (td != null && td.GetProperties().Count > 0)
						if ((tl = td.GetProperties()[0].GetValue(td) as ITypedList) != null)
							break;
				}
			}

			if (tl != null)
				dsEn = (IEnumerable)tl;
			else if (dataSource is IEnumerable)
				dsEn = (IEnumerable)dataSource;

			return dsEn;
		}

		public virtual void writeStartCompressXml(XmlTextWriter xmlOut, AjaxGetDataHandlerEventArgs info, bool embeddedInCtl)
		{
			if (info.AjaxRequestType == AjaxRequestTypes.GridGetDataRequest)
				if (embeddedInCtl)
					xmlOut.WriteStartElement("ntb:datasources");
				else
					xmlOut.WriteStartElement("ntb","datasources","http://www.nitobi.com");
		}

		public virtual void writeEndCompressedXml(XmlTextWriter xmlOut, AjaxGetDataHandlerEventArgs info)
		{
			if (info.AjaxRequestType == AjaxRequestTypes.GridGetDataRequest)
				xmlOut.WriteEndElement();
		}

		public enum OutputType { FullDataSource, SimpleRoot, ComboInline, TreeInline };

		public virtual void writeRows(XmlTextWriter xmlOut, IColumnCollection columns, object dataSource, int totalRowCount, AjaxGetDataHandlerEventArgs info)
		{
            IEnumerable en = getDataSourceEnumerator(dataSource);
            IList dsl = en as IList;
			OutputType ot = OutputType.FullDataSource;
			bool isCombo = false;
			if (info.AjaxRequestType == AjaxRequestTypes.GridGetDataRequest)
			{
				string dsId = info.DataSourceId;
				if (dsId == null)
					dsId = "_default";

				xmlOut.WriteStartElement("ntb:datasource");
				xmlOut.WriteAttributeString("id", dsId);
				//This is required by the treegrid.
				if(totalRowCount > -1)
					xmlOut.WriteAttributeString("totalrowcount", totalRowCount.ToString());

				xmlOut.WriteStartElement("ntb:datasourcestructure");
                // Write out user-defined column field names, if there.
                if (columns.Columns.Count > 0)
                {
                    xmlOut.WriteAttributeString("fieldnames", columns.ColumnNames);
                }
                // If user did not specify any columns, write out all columns via the Data Source.
                else
                {
                    writeFieldNamesFromDataSource(xmlOut, dataSource, new string[]{"fieldnames"});
                }
				xmlOut.WriteFullEndElement();
				xmlOut.WriteStartElement("ntb:data");
			}
			else
			{
				isCombo = true;
				if (info.PageSize == -1)
					ot = OutputType.ComboInline;
				else if (info.PageSize > 0 || info.PageSize == -2)
					ot = OutputType.SimpleRoot;

				if (ot == OutputType.SimpleRoot)
					xmlOut.WriteStartElement("root");
				else if (info.AjaxRequestType == AjaxRequestTypes.ComboGetDataRequest)
					xmlOut.WriteStartElement("ntb:ComboValues");
				else
				{
					ot = OutputType.TreeInline;
					xmlOut.WriteStartElement("ntb:children");
				}

				if (ot != OutputType.TreeInline)
				{
                    if (columns.Columns.Count > 0)
                    {
                        xmlOut.WriteAttributeString("fields", columns.ColumnNames);
                        xmlOut.WriteAttributeString("keys", columns.ColumnNames);
                    }
                    else
                    {
                        writeFieldNamesFromDataSource(xmlOut, dataSource, new string[]{"fields","keys"});
                    }
				}
			}
			int pos = info.StartRecordIndex;
            int xi = 0;
			bool wroteNoRows = true;
            if (dsl != null)
            {
                if (pos < dsl.Count)// > info.PageSize && info.PageSize > 0)
                {
                    for (; (info.PageSize <= 0 || pos < (info.StartRecordIndex + info.PageSize)) && pos < dsl.Count; pos++, xi++)
                        writeRow(xmlOut, columns, dsl[pos], ot, isCombo, info, pos, xi);
					if(dsl.Count != 0)
						wroteNoRows = false;
                }
            }
            
            if (en != null && wroteNoRows)
                foreach (object element in en)
                {
                    wroteNoRows = false;
                    writeRow(xmlOut, columns, element, ot, isCombo, info, pos++, xi++);
                }

			if (info.AjaxRequestType == AjaxRequestTypes.GridGetDataRequest)
				xmlOut.WriteFullEndElement();
			xmlOut.WriteFullEndElement(); //If grid, we write two end elements, if combo we write just one 
		}
        /// <summary>
        /// Writes out names of the data fields, used in the 'header' of data handler responses, based on the data source.
        /// </summary>
        /// <param name="xmlOut">The xml writer object doing the writing.</param>
        /// <param name="dataSource">The object used as a data source.</param>
        /// <param name="attributeNames">An array of strings defining the attribute names to assign the field names to.</param>
        protected void writeFieldNamesFromDataSource(XmlTextWriter xmlOut, object dataSource, string[] attributeNames)
        {
            // TODO: Will likely need to cover more, different types of the data source object.
            if (dataSource is System.Data.DataSet)
            {
                System.Data.DataSet realDS = (System.Data.DataSet)dataSource;
                if (realDS.Tables.Count > 0)
                {
                    string fieldNames = "";
                    foreach (System.Data.DataColumn col in realDS.Tables[0].Columns)
                    {
                        if (col.ColumnName.Length > 0)
                        {
                            fieldNames += col.ColumnName + "|";
                        }
                        else
                        {
                            fieldNames += col.Ordinal.ToString() + "|";
                        }
                    }
                    fieldNames = fieldNames.Substring(0, fieldNames.Length - 1);
                    foreach (string attrib in attributeNames)
                    {
                        xmlOut.WriteAttributeString(attrib, fieldNames);
                    }
                }
            }
        }
		public virtual void writeRow(XmlTextWriter xmlOut, IColumnCollection columns, object element, OutputType ot, bool isCombo, AjaxGetDataHandlerEventArgs info, int pos, int xi)
		{
			if (ot == OutputType.SimpleRoot)
				xmlOut.WriteStartElement("e");
			else if (ot == OutputType.FullDataSource)
				xmlOut.WriteStartElement("ntb:e");
			else if (ot == OutputType.TreeInline)
				xmlOut.WriteStartElement("ntb:node");
			else
				xmlOut.WriteStartElement("ntb:ComboValue");

			char aName = 'a';
            if (columns.Columns.Count > 0)
            {
                foreach (Column c in columns.Columns)
                {
                    if (!c.ContributesToData)
                        continue;
                    object val = element == null ? null : c.getValueForRow(AjaxRequestTypes.SimpleControlTypes[info.AjaxRequestType], element);
                    if (shouldWriteValueInRow(c, val, info))
                        if (ot == OutputType.TreeInline)
                            xmlOut.WriteAttributeString(c.Name, val == null ? "" : val.ToString());
                        else
                            xmlOut.WriteAttributeString((aName).ToString(), val == null ? "" : val.ToString());
                    aName++;
                }
            }
            else
            {
                // TODO: This probably doesn't catch the case where the datasource is a different .NET object other than DataRowView.
                if (element is System.Data.DataRowView)
                {
                    System.Data.DataRowView drv = (System.Data.DataRowView)element;
                    foreach (object val in drv.Row.ItemArray)
                    {
                        xmlOut.WriteAttributeString((aName).ToString(), val == null ? "" : val.ToString());
                        aName++;
                    }
                }
            }
			if (element != null)
			{
				if (!isCombo)
					xmlOut.WriteAttributeString("xi", xi.ToString());
				if (ot != OutputType.TreeInline)
					if (!isCombo && columns.KeyColumns != null)
						xmlOut.WriteAttributeString("xk", columns.KeyColumns.getValueForRow("grid", element).ToString());
					else if (!isCombo)
						xmlOut.WriteAttributeString("xk", (pos + 1).ToString());

				if (ot == OutputType.TreeInline && info.CurrentTreeDepth < info.MaxTreeDepth)
				{
					AjaxGetDataHandlerEventArgs childArgs = new AjaxGetDataHandlerEventArgs(AjaxRequestTypes.TreeGetDataRequest, info.DataSourceId, info.StartRecordIndex, info.PageSize);
					childArgs.MaxTreeDepth = info.MaxTreeDepth;
					childArgs.CurrentTreeDepth = info.CurrentTreeDepth + 1;
					childArgs.ParentRow = new LateBindingDataRow(element);
					IDataProvider provider;
					if (m_dataProviders.TryGetValue(info.DataSourceId, out provider))
					{
						string nodeType = "";
						object nt = Cmn.getObjValue(element, "NodeType");
						if (nt != null)
							nodeType = nt.ToString();
						if (string.Compare("node", nodeType, true) == 0)
							writeRows(xmlOut, columns, provider.getDataSource(System.Web.HttpContext.Current.Request, childArgs),
								provider.getTotalDataSize(System.Web.HttpContext.Current.Request, childArgs), childArgs);
					}
				}
			}
			xmlOut.WriteFullEndElement();
		}


		protected virtual bool shouldWriteValueInRow(Column c, object val, AjaxGetDataHandlerEventArgs info)
		{
			bool should = true;

			if (info.AjaxRequestType == AjaxRequestTypes.CalendarGetDataRequest && Cmn.IsEmpty(val))
				should = false;

			return should;
		}

		public virtual void generateXmlDataIsland(HttpRequest request, TextWriter writer, string dataIslandId, string dataSourceId, ColumnsEntity columns)
		{
			IDataProvider provider = null;
			if (m_dataProviders.TryGetValue(dataSourceId, out provider))
			{
				AjaxGetDataHandlerEventArgs info = new AjaxGetDataHandlerEventArgs(AjaxRequestTypes.ComboGetDataRequest, dataSourceId, 0, -2, null, null);

				writer.Write("<xml id='{0}'>", dataIslandId);
				generateCompressedXml(writer, columns, provider.getDataSource(request, info), provider.getTotalDataSize(System.Web.HttpContext.Current.Request, info), info);
				writer.Write("</xml>");
			}

		}

		public virtual void generateCompressedXml(TextWriter writer, ColumnsEntity columns, object dataSource, int totalRowCount, AjaxGetDataHandlerEventArgs info)
		{
			XmlTextWriter xmlOut = new XmlTextWriter(writer);
			writeStartCompressXml(xmlOut, info, false);
			writeRows(xmlOut, columns, dataSource, totalRowCount, info);
			writeEndCompressedXml(xmlOut, info);
		}

		public virtual void generateFullCompressedXml(HttpRequest request, TextWriter writer, ColumnsEntity columns, AjaxGetDataHandlerEventArgs info)
		{
			XmlTextWriter xmlOut = new XmlTextWriter(writer);
			//IDataProvider provider;
			bool switchedId = false;
			IDataProvider provider = getDataProviderForGetRequest(request, info);
			if (provider == null && "data".CompareTo(info.DataSourceId) == 0)
			{
				info.DataSourceId = "_default";
				switchedId = true;
				provider = getDataProviderForGetRequest(request, info);
			}
			if(provider != null)
			//if (m_dataProviders.TryGetValue(info.DataSourceId, out provider))
			{
				writeStartCompressXml(xmlOut, info,true);
				if (switchedId)
					info.DataSourceId = "data";
				writeRows(xmlOut, columns, provider.getDataSource(request, info), provider.getTotalDataSize(System.Web.HttpContext.Current.Request, info), info);
				foreach (Column c in columns.Columns)
					if (c is IColumnCollection)
					{
						info.DataSourceId = ((IColumnCollection)c).DataSourceId;
						writeRows(xmlOut, (IColumnCollection)c, provider.getDataSource(request, info),provider.getTotalDataSize(System.Web.HttpContext.Current.Request, info), info);
					}
				writeEndCompressedXml(xmlOut, info);
			}
		}

		protected virtual void processSaveDataRequest(HttpRequest request, HttpResponse response, int requestType)
		{
			string xml = new StreamReader(request.InputStream).ReadToEnd();
			AjaxSaveDataHandlerEventArgs saveInfo = new AjaxSaveDataHandlerEventArgs(xml, getRequestColumns(request));
			string dataSourceId = request["did"];
			if (Cmn.IsEmpty(dataSourceId))
				dataSourceId = saveInfo.UpdatedData.GetAttribute("id");

			IDataProvider provider;
			if (m_dataProviders.TryGetValue(dataSourceId, out provider))
			{
				provider.saveData(request, saveInfo);

				// write out the compressed xml of the next page
				response.ContentType = "text/xml";
				response.Charset = "utf-8";
				response.Write(saveInfo.UpdatedData.OwnerDocument.OuterXml);
				response.Flush();
				response.End();
			}
		}

		protected virtual void processGetDataRequest(HttpRequest request, HttpResponse response, int requestType)
		{
			AjaxGetDataHandlerEventArgs args = null;
			ColumnsEntity columns = null;
			object dataSource = null;
			int startRecord = Cmn.parseInt(request["StartRecordIndex"], 0);
			int startingRecord = Cmn.parseInt(request["StartingRecordIndex"], 0);
			if (startingRecord > startRecord)
				startRecord = startingRecord;
			int pageSize = Cmn.parseInt(request["PageSize"], -1);
			//This is used only when the datasource is coming from a tree grid which doesnt really use the data source
			//ids, it uses a format like 0_0 for indexing.  
			string realDataSourceId = null;

			if (requestType == AjaxRequestTypes.GridGetDataRequest)
			{
				string dataSourceId = request["did"];
				if (Cmn.IsEmpty(dataSourceId))
					dataSourceId = request["TableId"];
				else
					realDataSourceId = request["TableId"];
				string sortColumn = request["SortColumn"];
				string sortDir = request["SortDirection"];
                string searchString = request["SearchString"];
                string lastString = request["LastString"];
                
				SortOrder sortDirection = SortOrder.Asc;
				if (sortDir != null)
					sortDirection = (SortOrder)Enum.Parse(typeof(SortOrder), sortDir);
				args = new AjaxGetDataHandlerEventArgs(requestType, dataSourceId, startRecord, pageSize, searchString, lastString, sortColumn, sortDirection);
			}
			else if (requestType == AjaxRequestTypes.ComboGetDataRequest)
			{
				string searchString = request["SearchSubstring"];
				string lastString = request["LastString"];
				string dataSourceId = request["did"];
				if (Cmn.IsEmpty(dataSourceId))
					dataSourceId = request["ComboId"];
				args = new AjaxGetDataHandlerEventArgs(requestType, dataSourceId, startRecord, pageSize, searchString, lastString);
			}
			else if (requestType == AjaxRequestTypes.CalendarGetDataRequest)
			{
				string dataSourceId = request["did"];
				args = new AjaxGetDataHandlerEventArgs(requestType, dataSourceId, 0, -2);
			}
			else if (requestType == AjaxRequestTypes.TreeGetDataRequest)
			{
				string dataSourceId = request["did"];
				if (Cmn.IsEmpty(dataSourceId))
					dataSourceId = request["treeId"];
				args = new AjaxGetDataHandlerEventArgs(requestType, dataSourceId, 0, -2, new RequestDataRow(getRequestColumns(request)));
			}
			else if (requestType == AjaxRequestTypes.XmlIslandGetDataRequest)
			{
				string dataSourceId = request["xid"];
				args = new AjaxGetDataHandlerEventArgs(requestType, dataSourceId, 0, -2, null, null);
			}

			if (args != null)
			{
				IDataProvider provider = getDataProviderForGetRequest(request, args);
				if (provider !=  null)
				{
					dataSource = provider.getDataSource(request, args);
					if (dataSource != null)
					{
						columns = getRequestColumns(request);
						if (realDataSourceId != null)
							args.DataSourceId = realDataSourceId;

						// write out the compressed xml of the next page
						response.ContentType = "text/xml";
						response.Charset = "utf-8";
						generateCompressedXml(response.Output, columns, dataSource, provider.getTotalDataSize(request, args), args);
						response.Flush();
						response.End();
					}
				}
			}
		}

		protected virtual IDataProvider getDataProviderForGetRequest(HttpRequest request, AjaxGetDataHandlerEventArgs info)
		{
			IDataProvider provider;
			m_dataProviders.TryGetValue(info.DataSourceId, out provider);
			return provider;
		}

		protected virtual ColumnsEntity getRequestColumns(HttpRequest request)
		{
			ColumnsEntity ce = ColumnsNeededForResponse;
			if (ce == null)
			{
				string xml = request["NitCols"];
				ce = ColumnsEntity.createFromXml(Cmn.FromBase64(xml));
			}
			return ce;
		}

		//Tree Request Example:
		//http://www.nitobi.com/products/completeui/demos/explorer/demos/tree/asp/simple/
		//simplegethandler.asp?id=2&label=%C3%85land%20Islands&nodetype=node&haschildren=true&treeId=tree1&nitobi_cachebust=1222301339317

		//Tree Grid Get Request Example:
		//http://www.nitobi.com/products/completeui/demos/explorer/demos/treegrid/asp/treedata/
		//load_orders.asp?GridId=TreeGrid&RequestType=GET&TableId=0_3&CustomerID=4&ContactName=Alise%20Cash&ContactEmail=alcash%40caridonet.ca&ContactTitle=Business%20Development%20Manager&CustomerName=Swirl%20Enterprises%20Ltd.&PhoneNumber=(794)%20718-7652&Address=15%20Maudest%20Place%2C%20Sarles%2C%20Nd%2C%2075376&_xk=4&StartRecordIndex=0&start=0&PageSize=21&SortColumn=&SortDirection=Asc&uid=1222301392431&nitobi_cachebust=1222301392431

		//Tree Grid Save Request Example:
		//http://localhost:8087/
		//save_products.asp?GridId=TreeGrid&RequestType=SAVE&TableId=0_0_0&TableId=0_0_0&uid=1222303542201&nitobi_cachebust=1222303542201
		protected virtual int calcAjaxRequestType(HttpRequest request)
		{
			int reqType =  AjaxRequestTypes.NotAjaxRequest;
			m_requestColumnControlId = request["GridId"];
			if (m_requestColumnControlId != null)
			{
				string gridTableId = request["TableId"];
				string requestType = request["RequestType"];
				if (string.Compare(requestType, "save", true) == 0)
					reqType = AjaxRequestTypes.GridSaveDataRequest;
				else
					reqType = AjaxRequestTypes.GridGetDataRequest;
			}
			else
			{
				m_requestColumnControlId = request["treeId"];
				if (m_requestColumnControlId != null)
					reqType = AjaxRequestTypes.TreeGetDataRequest;
				else
				{
					m_requestColumnControlId = request["CalId"];
					if (m_requestColumnControlId != null)
						reqType = AjaxRequestTypes.CalendarGetDataRequest;
					else
					{
						m_requestColumnControlId = request["ComboId"];
						if (m_requestColumnControlId != null)
							reqType = AjaxRequestTypes.ComboGetDataRequest;
						else
						{
							m_requestColumnControlId = request["xid"];
							if (m_requestColumnControlId != null)
								reqType = AjaxRequestTypes.XmlIslandGetDataRequest;
						}
					}
				}
			}
			return reqType;
		}
	}
}
