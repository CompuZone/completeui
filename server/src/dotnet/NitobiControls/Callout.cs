using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.callout.js", "application/x-javascript")]
namespace Nitobi
{
	[Themeable(true)]
	[ParseChildren(true)]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Combo), "combo_16.png")]
	public class Callout : ScriptOnlyControlBase
	{
		protected static CalloutThemeName s_defaultTheme = CalloutThemeName.Vista;

		[Category("Appearance")]
		public CalloutThemeName Theme { get { return (CalloutThemeName)getObj("theme", s_defaultTheme); } set { setObj("theme", value); } }

		[Category("Appearance")]
		public CalloutDirection CalloutDirection { get { return (CalloutDirection)getObj("dir", CalloutDirection.None); } set { setObj("dir", value); } }

		[Category("Appearance")]
		public CalloutIconStyle IconStyle { get { return (CalloutIconStyle)getObj("istyle", s_defaultTheme); } set { setObj("istyle", value); } }

		[Category("Appearance")]
		public Unit Height { get { return (Unit)getObj("height", new Unit(0)); } set { setObj("height", value); } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public string Title { get { return (string)getObj("title", null); } set { setObj("title", value); } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public string Body { get { return (string)getObj("body", null); } set { setObj("body", value); } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public string Buttons { get { return (string)getObj("but", null); } set { setObj("but", value); } }

		public string AttachedTo { get { return (string)getObj("att", null); } set { setObj("att", value); } }

		public CalloutAutorunOption AutoRun { get { return (CalloutAutorunOption)getObj("ar", CalloutAutorunOption.Never); } set { setObj("ar", value); } }

		protected internal static void setupBodyWithScrollWrapper(ref string body, Unit height)
		{
			StringBuilder b2 = new StringBuilder(200);
			b2.Append("<div style='margin-bottom:10px;border-top:solid 1px grey;border-bottom:solid 1px grey;padding:1px 0px 1px 0px;'><div style='height:").Append(height).Append(";overflow:auto;'>");
			b2.Append(body);
			b2.Append("</div></div>");
			body = b2.ToString();
		}

		protected virtual string modifyBody(string body) { return body; }

		protected virtual void setupInstanceScripts()
		{
			StringBuilder buff = new StringBuilder(500);
			string body = modifyBody(Body);

			if (Height.Value != 0 && !Cmn.IsEmpty(Body))
				setupBodyWithScrollWrapper(ref body, Height);

			buff.AppendFormat(@"
var {0} = null;
function show{0}() 
{{
	if({0} != null && {0}.MasterContainer != null && {0}.MasterContainer.style.display != 'none')
	{{
		{0}.destroy();
		return;
	}}
	{0} = new nitobi.callout.Callout('{1}');
    {0}.setTitle('{2}');
    {0}.setBody('{3}');
	{0}.moveTo(450,450);
	{4}
	{0}.setCalloutDirection({5});
	{0}.show();
}}
",
				ClientID, calculatedClientStyleName(Theme,IconStyle), Title, (body + Buttons).Replace("\r\n", "").Replace("'","\\'"),
				Cmn.IsEmpty(AttachedTo)?"":string.Format("{0}.attachToElement('{1}');", ClientID, calcControlName(AttachedTo,false)), (int)CalloutDirection );
			Page.ClientScript.RegisterClientScriptBlock(typeof(Callout), ClientID, buff.ToString(), true);

			if (AutoRun == CalloutAutorunOption.Always || (AutoRun == CalloutAutorunOption.NonPostback && !Page.IsPostBack))
			{
				Page.ClientScript.RegisterStartupScript(typeof(Callout), "CalloutStartup." + ClientID,
					string.Format(@"try {{ if(window.attachEvent){{window.attachEvent( ""onload"", show{0} );}}else{{window.addEventListener(""load"",show{0},false);}}}} catch(e) {{alert(""Nitobi: Callout Javascript file not found""); }}",
					ClientID), true);
			}
		}

		protected internal static string calculatedClientStyleName(CalloutThemeName Theme, CalloutIconStyle IconStyle)
		{
			if (Theme != CalloutThemeName.Peanut)
				return Theme.ToString().ToLower();

			if (IconStyle == CalloutIconStyle.None)
				return "peanut_talkbubble";

			return "peanut_" + IconStyle.ToString().ToLower();
		}

		public static void SetupScriptsAndStyleSheets(Page Page, CalloutThemeName Theme, CalloutIconStyle IconStyle, string styleDirectory)
		{
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Combo), "Nitobi.scripts.nitobi.callout.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.CalloutScript", scriptUrl);

			if (Page.Header != null && Theme != CalloutThemeName.None)
			{
				string appPath = Page.Request.ApplicationPath;
				string linkUrl = string.Format("{0}{1}{2}/nitobi.callout.css", appPath, appPath.Length == 1 ? "" : "/", styleDirectory);
				string csslink = "<link href='" + linkUrl + "' rel='stylesheet' type='text/css' ></link>";
                setupPageCssLinks(Page, linkUrl, csslink);
			}
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			SetupScriptsAndStyleSheets(Page, Theme, IconStyle, this.StyleDirectory);
			setupInstanceScripts();
		}
	}

	public class ButtonCallout : Callout
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
				writer.Write("<a href='javascript:show{0}();' style='border:none;'><img src='{1}' style='{2}' /></a>",
					ClientID, ImageUrl, CssStyle);
		}
	}

	public class YouTubeCallout : ButtonCallout
	{
		public static string YouTubeHtml = "<object width='250' height='225'><param name='movie' value='http://www.youtube.com/v/{0}&hl=en&fs=1'></param><param name='allowFullScreen' value='true'></param><embed src='http://www.youtube.com/v/{0}&hl=en&fs=1' type='application/x-shockwave-flash' allowfullscreen='true' width='250' height='225'></embed></object>{1}";

		public string VideoId { get { return (string)getObj("vidid", ""); } set { setObj("vidid", value); } }
		
		protected override string modifyBody(string body)
		{
			if (Cmn.IsEmpty(VideoId))
				return body;
			return string.Format(YouTubeHtml, VideoId, body);
		}
	}

	public enum CalloutAutorunOption { Never, NonPostback, Always }

	public enum CalloutDirection {
		None, BottomRight, BottomLeft, TopLeft, TopRight, LeftTop, LeftBottom, RightTop, RightBottom }

}
