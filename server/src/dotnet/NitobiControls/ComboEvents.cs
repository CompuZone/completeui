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
	public class ComboClientEvents : BaseEntity
	{
		static ComboClientEvents() { BaseEntity.registerChildType(typeof(ComboClientEvents)); }
		protected Hashtable m_events = new Hashtable();
		protected internal Hashtable Events { get { return m_events; } }

		public string BeforeSelect { get { return (string)m_events["OnBeforeSelectEvent"]; } set { m_events["OnBeforeSelectEvent"] = value; } }
		public string Blur { get { return (string)m_events["OnBlurEvent"]; } set { m_events["OnBlurEvent"] = value; } }
		public string Focus { get { return (string)m_events["OnFocusEvent"]; } set { m_events["OnFocusEvent"] = value; } }
		public string Load { get { return (string)m_events["OnLoadEvent"]; } set { m_events["OnLoadEvent"] = value; } }
		public string Select { get { return (string)m_events["OnSelectEvent"]; } set { m_events["OnSelectEvent"] = value; } }
		public string Tab { get { return (string)m_events["OnTabEvent"]; } set { m_events["OnTabEvent"] = value; } }

		public virtual void writeColumnAttributes(HtmlTextWriter writer, string baseonload, string postbackscript)
		{
			bool wroteonload = false;
			foreach (DictionaryEntry e in m_events)
			{
				string val = "";
				if (postbackscript != null && string.Compare("OnSelectEvent", (string)e.Key, true) == 0)
					continue;

				if (baseonload != null && string.Compare("OnLoadEvent", (string)e.Key, true) == 0)
				{
					val += ";" + baseonload;
					wroteonload = true;
				}
				val += e.Value;

				Cmn.writeAttr(writer, (string)e.Key, val);
			}
			if (!wroteonload && baseonload != null)
				Cmn.writeAttr(writer, "OnLoadEvent", baseonload);
			if (postbackscript != null)
				Cmn.writeAttr(writer, "OnSelectEvent", postbackscript);
		}
	}
}
