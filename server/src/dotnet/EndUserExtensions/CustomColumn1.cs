using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

using Nitobi;

namespace EndUserExtensions
{
	public enum CustomChoice { Apple, Orange, Pear };

	public class CustomColumn1 : BoundColumn
	{
		static CustomColumn1() { BaseEntity.registerChildType(typeof(CustomColumn1)); }
		protected string m_field1 = null;
		protected CustomChoice m_choice1 = CustomChoice.Apple;

		public string Field1
		{
			get { return m_field1; }
			set { m_field1 = value; }
		}
		public CustomChoice Choice1
		{
			get { return m_choice1; }
			set { m_choice1 = value; }
		}

		public override bool ReadOnly
		{
			get { return true; }
			set	{}
		}

		public override object getValueForRow(string ctlType, object rowData)
		{
			object val = base.getValueForRow(ctlType, rowData);
			string style = null;
			switch (Choice1)
			{
				case CustomChoice.Apple:
					style = "i";
					break;
				case CustomChoice.Orange:
					style = "u";
					break;
				case CustomChoice.Pear:
					style = "b";
					break;
			}
			return string.Format("#&lt;#{0}#&gt;#{1}#&lt;#/{0}#&gt;#", style, val);
		}

	}
}
