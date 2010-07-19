using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Nitobi
{
	[ParseChildren(true)]
	public abstract class SpotlightStep : ScriptingBaseEntity
	{
		protected internal abstract void writeStepScript(StringBuilder buff, string spotId, Spotlight spot);
	}

	public class CalloutStep : SpotlightStep
	{
		static CalloutStep() { BaseEntity.registerChildType(typeof(CalloutStep)); }

		public Unit Height { get { return (Unit)getObj("height", new Unit(0)); } set { setObj("height", value); } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public string Title { get { return (string)getObj("title", null); } set { setObj("title", value); } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public string Body { get { return (string)getObj("body", null); } set { setObj("body", value); } }

		public string AttachedTo { get { return (string)getObj("att", ""); } set { setObj("att", value); } }

		protected internal override void writeStepScript(StringBuilder buff, string spotId, Spotlight spot)
		{
			string body = Body.Replace("\r\n", "").Replace("'","\\'");
			if (Height.Value != 0 && !Cmn.IsEmpty(Body))
				Callout.setupBodyWithScrollWrapper(ref body, Height);
			buff.AppendFormat("	{0}.createCalloutStep({1}, '{2}', '{3}');\n", spotId, spot.calcControlName(AttachedTo, true), Title==null?"":Title.Replace("'","\\'").Replace("\r\n"," "), body);
		}
	}

	public class MouseStep : SpotlightStep
	{
		public enum MouseAction { AppearOnObject, ClickOnObject, MoveToObject }
		static MouseStep() { BaseEntity.registerChildType(typeof(MouseStep)); }
		public static int DefaultDelay = 400;

		public string AttachedTo { get { return (string)getObj("att", ""); } set { setObj("att", value); } }

		public MouseAction Action { get { return (MouseAction)getObj("act", MouseAction.AppearOnObject); } set { setObj("act", value); } }

		public int Delay { get { return (int)getObj("dly", DefaultDelay); } set { setObj("dly", value); } }
	
		protected internal override void writeStepScript(StringBuilder buff, string spotId, Spotlight spot)
		{
			buff.AppendFormat("	{0}.createMouseStep('{1}', {2}, {3});\n", spotId, Action.ToString().ToUpper(), spot.calcControlName(AttachedTo, true), Delay);
		}
	}

	[ParseChildren(true, "Value")]
	public class CodeStep : SpotlightStep
	{
		static CodeStep() { BaseEntity.registerChildType(typeof(CodeStep)); }
		public static int DefaultDelay = 400;

		public int Delay { get { return (int)getObj("dly", DefaultDelay); } set { setObj("dly", value); } }

		[PersistenceModeAttribute(PersistenceMode.EncodedInnerDefaultProperty)]
		public string Value { get { return (string)getObj("val", ""); } set { setObj("val", value); } }

		protected internal override void writeStepScript(StringBuilder buff, string spotId, Spotlight spot)
		{
			buff.AppendFormat("	{0}.createCodeStep('{1}', {2});\n", spotId, Value.Replace("'", "\\'").Replace("\r\n", " "), Delay);
		}
	}

	public class FormHelperStep : SpotlightStep
	{
		public enum ActionType { TypeText }
		static FormHelperStep() { BaseEntity.registerChildType(typeof(FormHelperStep)); }

		public static int DefaultDelay = 400;
		public static bool DefaultSetFocus = true;

		public string AttachedTo { get { return (string)getObj("att", ""); } set { setObj("att", value); } }

		public ActionType Action { get { return (ActionType)getObj("act", ActionType.TypeText); } set { setObj("act", value); } }

		public int Delay { get { return (int)getObj("dly", DefaultDelay); } set { setObj("dly", value); } }

		public string Value { get { return (string)getObj("val", ""); } set { setObj("val", value); } }

		public bool SetFocus { get { return (bool)getObj("sfocus", DefaultSetFocus); } set { setObj("sfocus", value); } }

		protected internal override void writeStepScript(StringBuilder buff, string spotId, Spotlight spot)
		{
			buff.AppendFormat("	{0}.createFormHelperStep({1}, '{2}', {3}, '{4}', {5});\n", spotId, spot.calcControlName(AttachedTo, true), Action.ToString().ToUpper(), Delay, Value.Replace("'", "\\'").Replace("\r\n", " "), SetFocus.ToString().ToLower());
		}
	}

}
