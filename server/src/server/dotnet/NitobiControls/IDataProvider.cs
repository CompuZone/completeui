using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;

namespace Nitobi
{
	public interface IDataProvider
	{
		string DataId { get; }
		object getDataSource(HttpRequest request, AjaxGetDataHandlerEventArgs info);
		void saveData(HttpRequest request, AjaxSaveDataHandlerEventArgs info);
		int getTotalDataSize(HttpRequest request, AjaxGetDataHandlerEventArgs info);
	}

	public class GeneralDataProvider : IDataProvider
	{
		protected string m_dataId;
		protected object m_dataSource = null;

		public GeneralDataProvider(string dataId)
		{
			m_dataId = dataId;
		}

		public void setDataSource(object dataSource)
		{
			m_dataSource = dataSource;
		}
		public object getDataSource()
		{
			return m_dataSource;
		}

		public string DataId { get { return m_dataId; } }

		public object getDataSource(HttpRequest request, AjaxGetDataHandlerEventArgs info)
		{
			if (m_dataSource != null)
				return m_dataSource;

			if (GetData != null)
				return GetData(request, info);
			return null;
		}

		public virtual int getTotalDataSize(HttpRequest request, AjaxGetDataHandlerEventArgs info)
		{
			if (GetTotalRowCount != null)
				return (int)GetTotalRowCount(request, info);
			else if (m_dataSource != null && m_dataSource is IList)
				return ((IList)m_dataSource).Count;

			return -1;
		}

	
		public void saveData(HttpRequest request, AjaxSaveDataHandlerEventArgs info)
		{
			if (SaveData != null)
				SaveData(request, info);
		}

		public event SaveDataHandler SaveData;
		public event GetDataHandler GetData;
		public event GetDataHandler GetTotalRowCount;
	}

	/// <summary>
	/// If a row in a datasource was modified, this enum is used
	/// to indicate what type of action was performed.
	/// </summary>
	public enum UpdateAction
	{
		/// <summary>
		/// The row was inserted.
		/// </summary>
		Insert,
		/// <summary>
		/// The row was updated. 
		/// </summary>
		Update,
		/// <summary>
		/// The row was deleted.
		/// </summary>
		Delete,
		/// <summary>
		/// No action was taken on the row.
		/// </summary>
		None
	}
}
