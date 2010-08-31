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
	/// This is the inner element for the calendar control's client side events, allowing the developer to
	/// specify javascript to be executed with the various calendar events occur.
	/// </summary>
	public class CalendarEvents : BaseEntity
	{
		static CalendarEvents() { BaseEntity.registerChildType(typeof(CalendarEvents)); }

		protected Hashtable m_events = new Hashtable();
		protected internal Hashtable Events { get { return m_events; } }

		public string InvalidDate { get { return (string)m_events["b_onsetinvaliddate"]; } set { m_events["b_onsetinvaliddate"] = value; } }
		public string OutOfRangeDateSelected { get { return (string)m_events["b_onsetoutofrangedate"]; } set { m_events["b_onsetoutofrangedate"] = value; } }
		public string DisabledDateSelected { get { return (string)m_events["b_onsetdisableddate"]; } set { m_events["b_onsetdisableddate"] = value; } }
		public string ValidDateSelected { get { return (string)m_events["b_ondateselected"]; } set { m_events["b_ondateselected"] = value; } }
		public string EventDateSelected { get { return (string)m_events["b_oneventdateselected"]; } set { m_events["b_oneventdateselected"] = value; } }

		public string MonthChanged { get { return (string)m_events["c_onmonthchanged"]; } set { m_events["c_onmonthchanged"] = value; } }
		public string YearChanged { get { return (string)m_events["c_onyearchanged"]; } set { m_events["c_onyearchanged"] = value; } }
		public string Hide { get { return (string)m_events["c_onhide"]; } set { m_events["c_onhide"] = value; } }
		public string Show { get { return (string)m_events["c_onshow"]; } set { m_events["c_onshow"] = value; } }

		public string Blur { get { return (string)m_events["f_onblur"]; } set { m_events["f_onblur"] = value; } }
		public string Focus { get { return (string)m_events["f_onfocus"]; } set { m_events["f_onfocus"] = value; } }


		public virtual void writeColumnAttributes(HtmlTextWriter writer, string prefix)
		{
			foreach (DictionaryEntry e in m_events)
			{
				string k = (string)e.Key;
				if (!Cmn.IsEmpty(prefix) && !k.StartsWith(prefix))
					continue;
				else if(!Cmn.IsEmpty(prefix))
					k = k.Substring(prefix.Length);

				string v = (string)e.Value;
				if (v != null)
					v = v.Replace("=", "/*EQ*/");
				Cmn.writeAttr(writer, k, v);
			}
		}
	}
}
