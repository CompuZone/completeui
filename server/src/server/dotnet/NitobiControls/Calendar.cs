using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Globalization;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Permissions;
using System.Text;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.calendar.js", "application/x-javascript")]
namespace Nitobi
{
	/// <summary>
	/// Displays a drop down calendar that allows a user to either type in a date, or pick one
	/// from the month style drop down calendar.
	/// </summary>
	/// <remarks>Use the calendar control to display a drop down calendar on a web page.  You can
	/// control the language used to render the month and day names by setting the Culture property
	/// with a System.Globalization.CultureInfo object.  .NET has many culture definitions that
	/// contain the proper spelling for the month and days names for the culture's language.  The
	/// CultureInfo properties for the names can be set to new values if they are not exactly
	/// how you would like them to be.
	/// 
	/// The calendar can be displayed in the standard drop down mode, calendar only or text field only
	/// by setting the Mode property.
	/// 
	/// The calendar can show dates that are disabled and cannot be selected as well as display
	/// calendar event information.  Calendar events can control the css and tooltip used for the day.
	/// The BaseCalendarEvent class contains all of the properties that can be set for a given event.
	/// 
	/// The calendar control can use any data source for the list of events and disabled dates that
	/// it should use as long as its elements have at least one date  and can specify the type (either "event" 
	/// or "disabled").  The calendar control is a kind of ColumnControlBase which means you can specify
	/// columns for the calendar.  The calendar uses the columns to map from the data source field names
	/// to the specific fields needed by the calendar such as the start and end dates.
	/// </remarks>
	[Themeable(true)]
    [Description("Nitobi Calendar")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Calendar), "calendar_16.png")]
	public class Calendar : ColumnControlBase
	{
		/// <summary>
		/// Changing this static value will affect all instances of the Calendar to use the current
		/// active .NET CultureInfo.  Setting this value to true will cause all Calendar control
		/// instances to use the active CultureInfo.
		/// </summary>
		public static bool DefaultUserCurrentCulture = false;
		protected static CalendarThemeName s_defaultTheme = CalendarThemeName.None;


		protected CalendarEvents m_events = new CalendarEvents();

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public CalendarEvents ClientEvents { get { return m_events; } }

		[Category("Appearance")]
		public CalendarThemeName Theme { get { return (CalendarThemeName)getObj("theme", s_defaultTheme); } set { setObj("theme", value); } }

		[Category("Appearance")]
		public CalendarShowHideEffect Effect { get { return (CalendarShowHideEffect)getObj("shEffect", CalendarShowHideEffect.Shade); } set { setObj("shEffect", value); } }

		[Category("Appearance")]
		public int MonthColumns { get { return (int)getObj("mcol", 1); } set { setObj("mcol", value); } }

		[Category("Appearance")]
		public int MonthRows { get { return (int)getObj("mrow", 1); } set { setObj("mrow", value); } }

		public CalendarMode Mode { get { return (CalendarMode)getObj("mode", CalendarMode.Standard); } set { setObj("mode", value); } }

		/// <summary>
		/// Setting UseCurrentCulture to true will cause the calendar to use the current thread's active 
		/// .NET CultureInfo object (as provided by the CultureInfo.CurrentCulture static method) to get the
		/// various date display strings used by the calendar.  
		/// The default calendar language is English, but can be changed to any supported language.  If
		/// th Culture property is set to a specific culture, this property is ignored and the provided
		/// culture will be used instead.
		/// </summary>
		[Category("Appearance")]
		public bool UseCurrentCulture { get { return (bool)getObj("useCC", DefaultUserCurrentCulture); } set { setObj("useCC", value); } }

		public CultureInfo Culture { get { return (CultureInfo)getObj("cul", null); } set { setObj("cul", value); } }
        
		public DateTime MinSelectableDate { get { return (DateTime)getObj("minDate", DateTime.MinValue); } set { setObj("minDate", value); } }
		public DateTime MaxSelectableDate { get { return (DateTime)getObj("maxDate", DateTime.MaxValue); } set { setObj("maxDate", value); } }
		public DateTime SelectedDate { get { return (DateTime)getObj("selDate", DateTime.MinValue); } set { setObj("selDate", value); } }

		protected override string RootClientControlName { get { return "ntb:datepicker"; } }

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			base.writeClientInnerContents(writer);
			if(Mode != CalendarMode.CalendarOnly)
			{
				writer.Write("<ntb:dateinput ");
				ClientEvents.writeColumnAttributes(writer, "f_");
				writer.Write("></ntb:dateinput>");
			}
			if (Mode != CalendarMode.TextFieldOnly)
			{
				writer.Write("<ntb:calendar ");
				Cmn.writeAttr(writer, "effectenabled", Effect != CalendarShowHideEffect.None ? "true" : "false", "true");
				Cmn.writeAttr(writer, "monthcolumns", MonthColumns, 1);
				Cmn.writeAttr(writer, "monthrows", MonthRows, 1);
				ClientEvents.writeColumnAttributes(writer, "c_"); 
				writer.Write("></ntb:calendar>");
			}
		}

		protected override void writeRootClientAttributes(HtmlTextWriter writer)
		{
			base.writeRootClientAttributes(writer);
			Cmn.writeAttr(writer, "theme", Theme.ToString().ToLower(), s_defaultTheme.ToString().ToLower());
			Cmn.writeAttr(writer, "mindate", MinSelectableDate, DateTime.MinValue);
			Cmn.writeAttr(writer, "maxdate", MaxSelectableDate, DateTime.MaxValue);
			Cmn.writeAttr(writer, "selecteddate", SelectedDate, DateTime.MinValue);

			if (GetDataUrl != null)
			{
				string piece = GetDataUrl.Contains("?") ? "&" : "?";
				string url;
				if(IncludeColumnsInUrl)
					url = string.Format("{0}{1}CalId={2}&did={3}&NitCols={4}", GetDataUrl, piece, ClientID, DataSourceId, Uri.EscapeDataString(Cmn.ToBase64(Columns.Xml)));
				else
					url = string.Format("{0}{1}CalId={2}&did={3}", GetDataUrl, piece, ClientID, DataSourceId);

				Cmn.writeAttr(writer, "eventsurl", Page.Response.ApplyAppPathModifier(url));
			}

			CultureInfo cul = Culture;
			if (UseCurrentCulture && cul == null)
				cul = CultureInfo.CurrentCulture;

			if (cul != null)
			{
				writeJsArray(writer, "longmonthnames", cul.DateTimeFormat.MonthNames);
				writeJsArray(writer, "shortmonthnames", cul.DateTimeFormat.AbbreviatedMonthNames);
				writeJsArray(writer, "longdaynames", cul.DateTimeFormat.DayNames);
				writeJsArray(writer, "shortdaynames", cul.DateTimeFormat.AbbreviatedDayNames);
				writeJsArray(writer, "mindaynames", cul.DateTimeFormat.ShortestDayNames);
			}

			ClientEvents.writeColumnAttributes(writer, "b_");
		}

		protected void writeJsArray(HtmlTextWriter writer, string name, string[] vals)
		{
			writer.Write(" {0}=\"[", name);
			for (int pos = 0; pos < vals.Length; pos++)
			{
				writer.Write("'{0}'", vals[pos]);
				if (pos != vals.Length - 1)
					writer.Write(", ");
			}
			writer.Write("]\" ");
		}
		
		protected override bool IsAjaxData
		{
			get { return true; }
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Calendar), "Nitobi.scripts.nitobi.calendar.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.CalendarScript", scriptUrl);
            Page.ClientScript.RegisterStartupScript(typeof(Calendar), "Nitobi.CalendarStartup_" + ClientID, string.Format(
				@"try {{ if(window.attachEvent){{	window.attachEvent( ""onload"", function(){{nitobi.loadComponent('{0}')}} );}}else{{window.addEventListener(""load"",function(){{nitobi.loadComponent('{0}')}},false);}}}} catch(e) {{alert(""Nitobi: Calendar Javascript file not found""); }}",
				ClientID), true);

			if (Page.Header != null && Theme != CalendarThemeName.None)
			{
				//string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(DropDownCalendar), string.Format(s_baseCssInfo, m_styleClassName));
				string appPath = Page.Request.ApplicationPath;
				string linkUrl = string.Format("{0}{1}{2}/calendar/nitobi.reset.css", appPath, appPath.Length == 1 ? "" : "/", this.StyleDirectory);
				string csslink = "<link href='" + linkUrl + "' rel='stylesheet' type='text/css' ></link>";
				linkUrl = string.Format("{0}{1}{3}/calendar/{2}/calendar.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(), this.StyleDirectory);
				csslink = "<link href='" + linkUrl + "' rel='stylesheet' type='text/css' ></link>";
                setupPageCssLinks(Page, linkUrl, csslink);
			}

		}
	}

	/// <summary>
	/// Defines all of the know properties that can be specified for a calendar event.  The data source the calendar
	/// is bound to for its events could be a list of these objects, but isnt required.
	/// </summary>
	public class BaseCalendarEvent
	{
		protected string m_location = null;
		protected string m_description = null;
		protected string m_type = "event";
		protected string m_tooltip = null;
		protected string m_cssClass = null;
		protected string m_cssStyle = null;
		protected DateTime m_startDate = DateTime.MinValue;
		protected DateTime m_endDate = DateTime.MinValue;

		public BaseCalendarEvent()
		{
		}

		public BaseCalendarEvent(DateTime sdate, string loc, string desc, string ty, string tip, string cssClass, string cssStyle)
		{
			StartDate = sdate;
			Location = loc;
			Description = desc;
			EventType = ty;
			Tooltip = tip;
			CssClass = cssClass;
			CssStyle = cssStyle;
		}
		/// <summary>
		/// Specifies the physical location the event takes place at.  Currently, the
		/// calendar control will only use this for the tooltip if the Tooltip property
		/// isnt specified.
		/// </summary>
		public string Location { get { return m_location; } set { m_location = value; } }

		/// <summary>
		///  Specifies a basic description of the event.  Currently, the calendar control
		///  will only use this for the tooltip if the Tooltip property isnt specified.
		/// </summary>
		public string Description { get { return m_description; } set { m_description = value; } }

		public DateTime StartDate { get { return m_startDate; } set { m_startDate = value; } }
		public DateTime EndDate { get { return m_endDate; } set { m_endDate = value; } }
		/// <summary>
		/// Currently, only "event" and "disabled" can be specified.  Disabled events cannot
		/// be selected in the calendar control by the user.  Both standard and disabled events 
		/// can control their css and tooltip with the other properties of this class.
		/// </summary>
		public string EventType { get { return m_type; } set { m_type = value; } }
		/// <summary>
		/// The specific tooltip to use for the event.  If not specified, the calendar will
		/// use the Location and Description properties for the day's tooltip.  If those
		/// are not specified, then the tooltip will be the given date.
		/// </summary>
		public string Tooltip { get { return m_tooltip; } set { m_tooltip = value; } }
		/// <summary>
		/// The CSS class name to use for the day.
		/// </summary>
		/// <remarks>Because events are represented as
		/// an html anchor, the name specified here are just the simple class name, but 
		/// the CSS definition of the class needs to be very specific to the theme being used
		/// by the control.  For example, if you specify the CssClass <code>CalEvent_Birthday</code>,
		/// your css file sould have an element named <code>.[ThemeName] .ntb-calendar a.CalEvent_Birthday:link</code>
		/// or many style properties will not work properly.  For example, if you are using 
		/// the lepord theme, your css file will contain a class named
		/// <code>.leopard .ntb-calendar a.CalEvent_Birthday:link</code>.</remarks>
		public string CssClass { get { return m_cssClass; } set { m_cssClass = value; } }
		/// <summary>
		/// Provides the specific css style information to use on the anchor element for the given date.
		/// </summary>
		/// <remarks>If you dont want to deal with the complexities of using CSS class names
		/// and having to provide class names for each nitobi theme you want to use, specifing
		/// style information here will override everything provided in the CSS class
		/// definitions.</remarks>
		public string CssStyle { get { return m_cssStyle; } set { m_cssStyle = value; } }
	}

	public enum CalendarShowHideEffect
	{
		/// <summary>
		/// No effect - the calendar just appears and disappears.
		/// </summary>
		None,
		Shade,
		Blind
	}
	public enum CalendarMode
	{
		/// <summary>
		/// Displays the text field to type in a date and the button to drop down the calendar to pick a date.
		/// </summary>
		Standard,
		/// <summary>
		/// Displays only the text field, which will not allow the user to pick a date in the calendar but will still
		/// use the display masks and date validation of the calendar control.
		/// </summary>
		TextFieldOnly,
		/// <summary>
		/// Displays the calendar control directly, and the user will not be able to type in a date.  The 
		/// calendar is always displayed and doesnt drop down with a button.
		/// </summary>
		CalendarOnly
	}
	
}
