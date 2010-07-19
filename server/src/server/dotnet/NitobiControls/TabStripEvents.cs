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
	public class TabStripClientEvents : BaseEntity
	{
		static TabStripClientEvents() { BaseEntity.registerChildType(typeof(TabStripClientEvents)); }

		protected Hashtable m_events = new Hashtable();
		protected internal Hashtable Events { get { return m_events; } }


		public string Click { get { return (string)m_events["onclick"]; } set { m_events["onclick"] = value; } }
		public string MouseOut { get { return (string)m_events["onmouseout"]; } set { m_events["onmouseout"] = value; } }
		public string MouseOver { get { return (string)m_events["onmouseover"]; } set { m_events["onmouseover"] = value; } }
		public string Focus { get { return (string)m_events["onfocus"]; } set { m_events["onfocus"] = value; } }
		public string Blur { get { return (string)m_events["onblur"]; } set { m_events["onblur"] = value; } }
		public string Activate { get { return (string)m_events["onactivate"]; } set { m_events["onactivate"] = value; } }
		public string Deactivate { get { return (string)m_events["ondeactivate"]; } set { m_events["ondeactivate"] = value; } }
		public string Load { get { return (string)m_events["onload"]; } set { m_events["onload"] = value; } }

		public virtual void writeColumnAttributes(HtmlTextWriter writer, string delayLoad)
		{
			if(delayLoad != null)
				Load = string.Format("{0};$({1}).style.display='block'", Load, delayLoad);
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
