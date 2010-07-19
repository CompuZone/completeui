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
	public class GridClientEvents : BaseEntity
	{
		static GridClientEvents() { BaseEntity.registerChildType(typeof(GridClientEvents)); }

		protected Hashtable m_events = new Hashtable();
		protected internal Hashtable Events { get { return m_events; } }


		public string DataReady { get { return (string)m_events["ondatareadyevent"]; } set { m_events["ondatareadyevent"] = value; } }
		public string CellCblClick { get { return (string)m_events["oncelldblclickevent"]; } set { m_events["oncelldblclickevent"] = value; } }
		public string BeforeLoadPreviousPage { get { return (string)m_events["onbeforeloadpreviouspageevent"]; } set { m_events["onbeforeloadpreviouspageevent"] = value; } }
		public string BeforeLoadNextPage { get { return (string)m_events["onbeforeloadnextpageevent"]; } set { m_events["onbeforeloadnextpageevent"] = value; } }
		public string BeforeLoadDataPage { get { return (string)m_events["onbeforeloaddatapageevent"]; } set { m_events["onbeforeloaddatapageevent"] = value; } }
		public string AfterloadPreviousPage { get { return (string)m_events["onafterloadpreviouspageevent"]; } set { m_events["onafterloadpreviouspageevent"] = value; } }
		public string AfterLoadNextPage { get { return (string)m_events["onafterloadnextpageevent"]; } set { m_events["onafterloadnextpageevent"] = value; } }
		public string AfterLoadDataPage { get { return (string)m_events["onafterloaddatapageevent"]; } set { m_events["onafterloaddatapageevent"] = value; } }
		public string BeforeResize { get { return (string)m_events["onbeforeresizeevent"]; } set { m_events["onbeforeresizeevent"] = value; } }
		public string AfterResize { get { return (string)m_events["onafterresizeevent"]; } set { m_events["onafterresizeevent"] = value; } }
		public string HandlerError { get { return (string)m_events["onhandlererrorevent"]; } set { m_events["onhandlererrorevent"] = value; } }
		public string BeforeRefresh { get { return (string)m_events["onbeforerefreshevent"]; } set { m_events["onbeforerefreshevent"] = value; } }
		public string AfterRefresh { get { return (string)m_events["onafterrefreshevent"]; } set { m_events["onafterrefreshevent"] = value; } }
		public string BeforeCellEdit { get { return (string)m_events["onbeforecelleditevent"]; } set { m_events["onbeforecelleditevent"] = value; } }
		public string AfterCellEdit { get { return (string)m_events["onaftercelleditevent"]; } set { m_events["onaftercelleditevent"] = value; } }
		public string BeforeRowInsert { get { return (string)m_events["onbeforerowinsertevent"]; } set { m_events["onbeforerowinsertevent"] = value; } }
		public string AfterRowInsert { get { return (string)m_events["onafterrowinsertevent"]; } set { m_events["onafterrowinsertevent"] = value; } }
		public string BeforeSort { get { return (string)m_events["onbeforesortevent"]; } set { m_events["onbeforesortevent"] = value; } }
		public string AfterSort { get { return (string)m_events["onaftersortevent"]; } set { m_events["onaftersortevent"] = value; } }
		public string BeforeSave { get { return (string)m_events["onbeforesaveevent"]; } set { m_events["onbeforesaveevent"] = value; } }
		public string AfterSave { get { return (string)m_events["onaftersaveevent"]; } set { m_events["onaftersaveevent"] = value; } }
		public string RowBlur { get { return (string)m_events["onrowblurevent"]; } set { m_events["onrowblurevent"] = value; } }
		public string CellFocus { get { return (string)m_events["oncellfocusevent"]; } set { m_events["oncellfocusevent"] = value; } }
		public string AfterRowDelete { get { return (string)m_events["onafterrowdeleteevent"]; } set { m_events["onafterrowdeleteevent"] = value; } }
		public string BeforeRowDelete { get { return (string)m_events["onbeforerowdeleteevent"]; } set { m_events["onbeforerowdeleteevent"] = value; } }
		public string CellUpdate { get { return (string)m_events["oncellupdateevent"]; } set { m_events["oncellupdateevent"] = value; } }
		public string RowFocus { get { return (string)m_events["onrowfocusevent"]; } set { m_events["onrowfocusevent"] = value; } }
		public string BeforeCopy { get { return (string)m_events["onbeforecopyevent"]; } set { m_events["onbeforecopyevent"] = value; } }
		public string AfterCopy { get { return (string)m_events["onaftercopyevent"]; } set { m_events["onaftercopyevent"] = value; } }
		public string BeforePaste { get { return (string)m_events["onbeforepasteevent"]; } set { m_events["onbeforepasteevent"] = value; } }
		public string AfterPaste { get { return (string)m_events["onafterpasteevent"]; } set { m_events["onafterpasteevent"] = value; } }
		public string Error { get { return (string)m_events["onerrorevent"]; } set { m_events["onerrorevent"] = value; } }
		public string ContextMenu { get { return (string)m_events["oncontextmenuevent"]; } set { m_events["oncontextmenuevent"] = value; } }
		public string CellValidate { get { return (string)m_events["oncellvalidateevent"]; } set { m_events["oncellvalidateevent"] = value; } }
		public string HtmlReady { get { return (string)m_events["onhtmlreadyevent"]; } set { m_events["onhtmlreadyevent"] = value; } }
		public string KeyDown { get { return (string)m_events["onkeydownevent"]; } set { m_events["onkeydownevent"] = value; } }
		public string KeyUp { get { return (string)m_events["onkeyupevent"]; } set { m_events["onkeyupevent"] = value; } }
		public string KeyPress { get { return (string)m_events["onkeypressevent"]; } set { m_events["onkeypressevent"] = value; } }
		public string MouseOver { get { return (string)m_events["onmouseoverevent"]; } set { m_events["onmouseoverevent"] = value; } }
		public string MouseOut { get { return (string)m_events["onmouseoutevent"]; } set { m_events["onmouseoutevent"] = value; } }
		public string MouseMove { get { return (string)m_events["onmousemoveevent"]; } set { m_events["onmousemoveevent"] = value; } }
		public string Focus { get { return (string)m_events["onfocusevent"]; } set { m_events["onfocusevent"] = value; } }
		public string HitRowEnd { get { return (string)m_events["onhitrowendevent"]; } set { m_events["onhitrowendevent"] = value; } }
		public string HitRowStart { get { return (string)m_events["onhitrowstartevent"]; } set { m_events["onhitrowstartevent"] = value; } }

		public virtual void writeColumnAttributes(HtmlTextWriter writer)
		{
			foreach (DictionaryEntry e in m_events)
			{
				string v = (string)e.Value;
				if (v != null)
					v = v.Replace("=", "/*EQ*/");
				Cmn.writeAttr(writer, (string)e.Key, v);
			}
		}
	}
}
