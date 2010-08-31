using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Permissions;
using System.Xml.Serialization;

namespace Nitobi
{
	/// <summary>
	/// Used for the Grid only, columns can have client events specified for them that can have javascript
	/// written for them.  Each of the events defined in this class is for javascript code snippents.
	/// </summary>
	/// <remarks>
	/// The grid control exposes a ColumnClientEvents via its ColumnEvents property which is used as the default
	/// for every column in the grid unless overridden by the ClientEvents property exposed by every column
	/// as well.  When you want to use the same javascript for the same event for every column in the grid,
	/// define the javascript on the ClientEvents property of the grid itself.
	/// 
	/// When you want to handle events for a specific column of the grid only, use the ClientEvent property 
	/// of the individual column.
	/// </remarks>
	public class ColumnClientEvents : BaseEntity
	{
		static ColumnClientEvents() { BaseEntity.registerChildType(typeof(ColumnClientEvents)); }
		protected Hashtable m_events = new Hashtable();
		protected internal Hashtable Events { get { return m_events; } }

		public string CellClick { get { return (string)m_events["OnCellClickEvent"]; } set { m_events["OnCellClickEvent"] = value; } }
		public string BeforeCellClick { get { return (string)m_events["OnBeforeCellClickEvent"]; } set { m_events["OnBeforeCellClickEvent"] = value; } }
		public string CellDblClick { get { return (string)m_events["OnCellDblClickEvent"]; } set { m_events["OnCellDblClickEvent"] = value; } }
		public string HeaderDoubleClick { get { return (string)m_events["OnHeaderDoubleClickEvent"]; } set { m_events["OnHeaderDoubleClickEvent"] = value; } }
		public string HeaderClick { get { return (string)m_events["OnHeaderClickEvent"]; } set { m_events["OnHeaderClickEvent"] = value; } }
		public string BeforeResize { get { return (string)m_events["OnBeforeResizeEvent"]; } set { m_events["OnBeforeResizeEvent"] = value; } }
		public string AfterResize { get { return (string)m_events["OnAfterResizeEvent"]; } set { m_events["OnAfterResizeEvent"] = value; } }
		public string CellValidate { get { return (string)m_events["OnCellValidateEvent"]; } set { m_events["OnCellValidateEvent"] = value; } }
		public string BeforeCellEdit { get { return (string)m_events["OnBeforeCellEditEvent"]; } set { m_events["OnBeforeCellEditEvent"] = value; } }
		public string AfterCellEdit { get { return (string)m_events["OnAfterCellEditEvent"]; } set { m_events["OnAfterCellEditEvent"] = value; } }
		public string CellBlur { get { return (string)m_events["OnCellBlurEvent"]; } set { m_events["OnCellBlurEvent"] = value; } }
		public string CellFocus { get { return (string)m_events["OnCellFocusEvent"]; } set { m_events["OnCellFocusEvent"] = value; } }
		public string BeforeSort { get { return (string)m_events["OnBeforeSortEvent"]; } set { m_events["OnBeforeSortEvent"] = value; } }
		public string AfterSort { get { return (string)m_events["OnAfterSortEvent"]; } set { m_events["OnAfterSortEvent"] = value; } }
		public string CellUpdate { get { return (string)m_events["OnCellUpdateEvent"]; } set { m_events["OnCellUpdateEvent"] = value; } }
		public string KeyDown { get { return (string)m_events["OnKeyDownEvent"]; } set { m_events["OnKeyDownEvent"] = value; } }
		public string KeyUp { get { return (string)m_events["OnKeyUpEvent"]; } set { m_events["OnKeyUpEvent"] = value; } }
		public string KeyPress { get { return (string)m_events["OnKeyPressEvent"]; } set { m_events["OnKeyPressEvent"] = value; } }
		public string Change { get { return (string)m_events["OnChangeEvent"]; } set { m_events["OnChangeEvent"] = value; } }

		public virtual void writeColumnAttributes(HtmlTextWriter writer, ColumnClientEvents defaultValues)
		{
			if(defaultValues != null)
				foreach(DictionaryEntry e in defaultValues.Events)
					if(!m_events.ContainsKey(e.Key))
						Cmn.writeAttr(writer, (string)e.Key, (string)e.Value);

			foreach (DictionaryEntry e in m_events)
				Cmn.writeAttr(writer, (string)e.Key, (string)e.Value);
		}
	}
}
