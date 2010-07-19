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
	public class ComboTextBox : BaseEntity
	{
		internal static Unit s_defaultUnit = new Unit();
		static ComboTextBox() { BaseEntity.registerChildType(typeof(ComboTextBox)); }

		protected Unit m_width, m_height;
		protected string m_value = null;
        protected Hashtable m_options = new Hashtable();
        protected internal Hashtable Options { get { return m_options; } }

		public Unit Width { get { return m_width; } set { m_width = value; } }
		public Unit Height { get { return m_height; } set { m_height = value; } }
		public string Value { get { return m_value; } set { m_value = value; } }
        public string CSSClassName { get { return (string)m_options["CSSClassName"]; } set { m_options["CSSClassName"] = value; } }
        public string OnEditKeyUpEvent { get { return (string)m_options["OnEditKeyUpEvent"]; } set { m_options["OnEditKeyUpEvent"] = value; } }

		public virtual void getClientDefHtml(HtmlTextWriter writer, int dataTextFieldIndex)
		{
			writer.Write("<ntb:ComboTextBox ");
			writeColumnAttributes(writer, null, dataTextFieldIndex);
			writer.Write(">");
			writer.WriteLine("</ntb:ComboTextBox>");
		}

		public virtual void writeColumnAttributes(HtmlTextWriter writer, string newValue, int dataTextFieldIndex)
		{
			Cmn.writeAttr(writer, "Width", Width, ComboTextBox.s_defaultUnit);
			Cmn.writeAttr(writer, "Height", Height, ComboTextBox.s_defaultUnit);
			Cmn.writeAttr(writer, "Value", Cmn.IsEmpty(newValue)?m_value:newValue);
			if (dataTextFieldIndex >= 0)
				Cmn.writeAttr(writer, "DataFieldIndex", dataTextFieldIndex);

            foreach (DictionaryEntry e in m_options)
            {
                Cmn.writeAttr(writer,(string)e.Key, e.Value);
            }
		}
	}

	public class ComboList : BaseEntity
	{
		static ComboList() { BaseEntity.registerChildType(typeof(ComboList)); }

		protected Unit m_width, m_height;
		protected bool m_allowPaging = true;
        protected Hashtable m_options = new Hashtable();
        protected internal Hashtable Options { get { return m_options; } }

		public Unit Width { get { return m_width; } set { m_width = value; } }
		public Unit Height { get { return m_height; } set { m_height = value; } }
		public bool AllowPaging { get { return m_allowPaging; } set { m_allowPaging = value; } }
        public string OnAfterSearchEvent { get { return (string)m_options["OnAfterSearchEvent"]; } set { m_options["OnAfterSearchEvent"] = value; } }
        public string OnBeforeSearchEvent { get { return (string)m_options["OnBeforeSearchEvent"]; } set { m_options["OnAfterSearchEvent"] = value; } }
        public string OnHideEvent { get { return (string)m_options["OnHideEvent"]; } set { m_options["OnHideEvent"] = value; } }
        public string OnShowEvent { get { return (string)m_options["OnShowEvent"]; } set { m_options["OnShowEvent"] = value; } }
        public string BackgroundHighlightColor { get { return (string)m_options["BackgroundHighlightColor"]; } set { m_options["BackgroundHighlightColor"] = value; } }
        public string ForegroundHighlightColor { get { return (string)m_options["ForegroundHighlightColor"]; } set { m_options["ForegroundHighlightColor"] = value; } }
        public string ClipLength { get { return (string)m_options["ClipLength"]; } set { m_options["ClipLength"] = value; } }


		public virtual void writeColumnAttributes(HtmlTextWriter writer)
		{
			Cmn.writeAttr(writer, "Width", Width, ComboTextBox.s_defaultUnit);
			Cmn.writeAttr(writer, "Height", Height, ComboTextBox.s_defaultUnit);
			Cmn.writeAttr(writer, "AllowPaging", AllowPaging.ToString().ToLower());

            foreach (DictionaryEntry e in m_options)
            {
                Cmn.writeAttr(writer, (string)e.Key, e.Value);
            }
		}
	}

	public class MenuItem : BaseEntity
	{
		static MenuItem(){BaseEntity.registerChildType(typeof(MenuItem));}

		protected string m_icon = null;
		protected string m_clientClickEvent = null;
		protected string m_text = null;

		public string Icon { get { return m_icon; } set { m_icon = value; } }
		public string ClientOnClick { get { return m_clientClickEvent; } set { m_clientClickEvent = value; } }
		public string Text { get { return m_text; } set { m_text = value; } }

		public virtual void getClientDefHtml(HtmlTextWriter writer)
		{
			writer.Write("<ntb:ComboMenu ");
			writeColumnAttributes(writer);
			writer.Write(">");
			writer.WriteLine("</ntb:ComboMenu>");
		}

		public virtual void writeColumnAttributes(HtmlTextWriter writer)
		{
			Cmn.writeAttr(writer, "Icon", m_icon);
			Cmn.writeAttr(writer, "OnClickEvent", m_clientClickEvent);
			Cmn.writeAttr(writer, "Text", m_text);
		}
	}
}
