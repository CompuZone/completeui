using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.spotlight.js", "application/x-javascript")]
namespace Nitobi
{
	[Themeable(true)]
	[ParseChildren(true, "Steps")]
    [Description("Nitobi Spotlight")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Spotlight), "spotlight_16.png")]
	public class Spotlight : ScriptOnlyControlBase
	{
		protected static CalloutThemeName s_defaultTheme = CalloutThemeName.None;
		protected static CalloutIconStyle s_defaultIconStyle = CalloutIconStyle.None;
		protected static SpotlightStartupEffect s_defaultEffect = SpotlightStartupEffect.GreySwipe;
		protected static SpotlightShape s_defaultShape = SpotlightShape.Round;
		protected static int s_defaultSize = 2;

		protected List<SpotlightStep> m_steps = new List<SpotlightStep>();
		[Category("Appearance")]
		public CalloutThemeName Theme { get { return (CalloutThemeName)getObj("theme", s_defaultTheme); } set { setObj("theme", value); } }

		[Category("Appearance")]
		public CalloutIconStyle IconStyle { get { return (CalloutIconStyle)getObj("istyle", s_defaultIconStyle); } set { setObj("istyle", value); } }

		[Category("Appearance")]
		public SpotlightStartupEffect StartupEffect { get { return (SpotlightStartupEffect)getObj("ssef", s_defaultEffect); } set { setObj("ssef", value); } }

		[Category("Appearance")]
		public SpotlightShape SpotlightShape { get { return (SpotlightShape)getObj("sshape", s_defaultShape); } set { setObj("sshape", value); } }

		[Category("Appearance")]
		public int SpotliteSize { get { return (int)getObj("ssize", s_defaultSize); } set { setObj("ssize", value); } }

		public CalloutAutorunOption AutoRun { get { return (CalloutAutorunOption)getObj("ar", CalloutAutorunOption.Never); } set { setObj("ar", value); } }

		public List<SpotlightStep> Steps { get { return m_steps; } }

		protected void setupInstanceScripts()
		{
			StringBuilder buff = new StringBuilder(500);

			buff.AppendFormat(@"
function runTour_{0}() 
{{
	var t = new nitobi.spotlight.Spotlight('{1}', '{2}', '{3}', {4});
", ClientID, StartupEffect.ToString().ToUpper(), Callout.calculatedClientStyleName(Theme, IconStyle), SpotlightShape.ToString().ToLower(), "." + SpotliteSize);

			foreach (SpotlightStep step in Steps)
				step.writeStepScript(buff,"t", this);

			buff.Append("	t.play();\n}");

			Page.ClientScript.RegisterClientScriptBlock(typeof(Spotlight), ClientID, buff.ToString(), true);

			if (AutoRun == CalloutAutorunOption.Always || (AutoRun == CalloutAutorunOption.NonPostback && !Page.IsPostBack))
			{
				Page.ClientScript.RegisterStartupScript(typeof(Callout), "CalloutStartup." + ClientID,
					string.Format(@"try {{ if(window.attachEvent){{window.attachEvent( ""onload"", runTour_{0} );}}else{{window.addEventListener(""load"",runTour_{0},false);}}}} catch(e) {{alert(""Nitobi: Callout Javascript file not found""); }}",
					ClientID), true);
			}
		}

		public static void SetupScriptsAndStyleSheets(Page Page, CalloutThemeName Theme, CalloutIconStyle IconStyle, string styleDirectory)
		{
			Callout.SetupScriptsAndStyleSheets(Page, Theme, IconStyle, styleDirectory);
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Spotlight), "Nitobi.scripts.nitobi.spotlight.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.SpotlightScript", scriptUrl);

			//It appears that the spotlight css isnt used in the nitobi demo sites, but the callout is.
			//if (Page.Header != null && Theme != CalloutThemeName.None)
			//{
			//    string appPath = Page.Request.ApplicationPath;
			//    string linkUrl = string.Format("{0}{1}NitobiStyles/callout/{2}/nitobi.callout.css", appPath, appPath.Length == 1 ? "" : "/", calculatedClientStyleName(Theme, IconStyle));
			//    string csslink = "<link href='" + linkUrl + "' rel='stylesheet' type='text/css' />";
			//    LiteralControl include = new LiteralControl(csslink);
			//    Page.Header.Controls.Add(include);
			//}

		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			SetupScriptsAndStyleSheets(Page, Theme, IconStyle, this.StyleDirectory);
			setupInstanceScripts();
		}
	}

	public class ButtonSpotlight : Spotlight
	{
		[Category("Appearance")]
		public string ImageUrl { get { return (string)getObj("iurl", ""); } set { setObj("iurl", value); } }

		[Category("Appearance")]
		public string CssStyle { get { return (string)getObj("cstyle", ""); } set { setObj("cstyle", value); } }

		public string ToolTip { get { return (string)getObj("ttip", ""); } set { setObj("ttip", value); } }

		protected override void Render(HtmlTextWriter writer)
		{
			base.Render(writer);
			if(!Cmn.IsEmpty(ImageUrl))
				writer.Write("<a href='javascript:runTour_{0}();' style='border:none;'><img src='{1}' style='{2}' /></a>",
					ClientID, ImageUrl, CssStyle);
		}
	}

	public enum SpotlightStartupEffect { None, GreySwipe }
	public enum SpotlightShape { None, Round, Square, Burst }
}
