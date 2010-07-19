<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CalendarEventsUrl.aspx.cs" Inherits="calendar_CalendarEventsUrl" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<h2>Calendar Events</h2>
<p>This example demonstrates adding events to the Calendar. Simply put, a handler needs to be assigned to the Calendar.
This handler function is then used to retrieve an enumerable of BaseCalendarEvent objects, which describe the events with a start and optional end date, descriptions, locations, types. CSS classes and styles can also be assigned to individual events.</p>
<p>Events will always show a tooltip, either a combination of the location and description or the more specific tooltip element.</p>
<p>The Calendar component below uses a separate ASP.NET script (CalendarHandler.ashx) to provide event data. The handler currently only returns the current date as an event (which will show up with a blue border around the date in the Calendar).</p>
    <ntb:Calendar ID="eventsCal" Mode="Standard" runat="server" Theme="Vista" Visible="true" GetDataUrl="CalendarHandler.ashx" DataSourceId="roomavailability" >
        <Columns>
			<ntb:DateColumn DataField="StartDate" />
			<ntb:DateColumn DataField="EndDate" />
			<ntb:BoundColumn DataField="Location" />
			<ntb:BoundColumn DataField="Description" />
			<ntb:BoundColumn DataField="EventType" />
			<ntb:BoundColumn DataField="Tooltip" />
			<ntb:BoundColumn DataField="CssClass" />
			<ntb:BoundColumn DataField="CssStyle" /> 
		</Columns>
    </ntb:Calendar>
</asp:Content>
