using System;
using System.Collections.Generic;
using System.Text;
using System.Web.UI;

namespace Nitobi
{
	public class ScriptOnlyControlBase : NitobiControlBase
	{
		protected override void Render(System.Web.UI.HtmlTextWriter writer)
		{
		}
		protected override string RootClientControlName
		{
			get { return null; }
		}
	}

	public class ScriptingBaseEntity : BaseEntity
	{
	}
}
