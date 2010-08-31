<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CalendarEvents.aspx.cs" Inherits="test.CalendarEvents" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Calendar Mode:
	<asp:DropDownList ID="calMode" runat="server" AutoPostBack="true"></asp:DropDownList>
	Display:
	<asp:DropDownList ID="calDisp" runat="server" AutoPostBack="true">
		<asp:ListItem Text="Standard - 1x1" Value="1,1" />
		<asp:ListItem Text="2 Mo. - 1x2" Value="1,2" />
		<asp:ListItem Text="4 Mo. - 2x2" Value="2,2" />
		<asp:ListItem Text="6 Mo. - 3x2" Value="3,2" />
		<asp:ListItem Text="9 Mo. - 3x3" Value="3,3" />
		<asp:ListItem Text="1 Year - 3x4" Value="3,4" />
	</asp:DropDownList>&nbsp;&nbsp;
	<div style="height:5px;"></div>

	<table><tr><td valign="top">
	<ntb:Calendar ID="cal1" runat="server" Theme="Leopard" Effect="Blind" GetDataUrl="DataHandler.ashx" DataSourceId="roomAvailability">
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
	</td><td valign="top">
		<h3>Calendar Events</h3>
		<ntb:Grid ID="det" runat="server" Mode="LiveScrolling" Width="600" Height="250" FrozenLeftColumns="1"
			AllowAddRow="true" AllowDeleteRow="true" EnableAutoSave="true" Resizable="Both"
			GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx" DataSourceId="roomAvailability">
			<Columns>
				<ntb:DateColumn HeaderText="Date" DataField="StartDate" Width="100" ReadOnly="false" />
				<ntb:BoundColumn HeaderText="Location" DataField="Location" Width="120" ReadOnly="false" />
				<ntb:BoundColumn HeaderText="Description" DataField="Description" Width="300" ReadOnly="false" />
				<ntb:BoundColumn HeaderText="Tooltip" DataField="Tooltip" Width="200" ReadOnly="false" />
				<ntb:ComboColumn HeaderText="CSS Class" DataField="CssClass" Width="100" ReadOnly="false" DataSourceId="eventTypes" GetDataUrl="DataHandler.ashx" ValueField="Value">
					<ntb:BoundColumn DataField="Display" />
					<ntb:BoundColumn DataField="Value" Visible="false" />
				</ntb:ComboColumn>
				<ntb:BoundColumn HeaderText="CSS Style" DataField="CssStyle" Width="200" ReadOnly="false" /> 
			</Columns>
		</ntb:Grid>
		<script type="text/javascript">	
			function gridSavecomplete(cal)
			{
				if (cal.eventsManager)
				{
					cal.eventsManager.dates = {events: {}, disabled: {}};
					cal.eventsManager.getFromServer();
				}
			}
		</script>
	</td></tr></table>
</asp:Content>

<asp:Content ContentPlaceHolderID="codeExamples" runat="server">
<div style="width:1000px"><textarea name="code" class="html">

</textarea></div>
</asp:Content>

<asp:Content ContentPlaceHolderID="docs" runat="server">
<p class=MsoNormal>This page demonstrates the calendar control’s powerful event
management system.<span style='mso-spacerun:yes'>  </span>The grid on the right
is editable, and changes made to the calendar events shown in it will
immediately be reflected in the calendar on the left.<span
style='mso-spacerun:yes'>  </span>As changes to the grid’s data occurs, the
grid uses AJAX to submit the changes to the server.<span
style='mso-spacerun:yes'>  </span>The calendar then does its own AJAX call to
get the new list of events to show.</p>

<p class=MsoNormal>Events will always show a tooltip, either a combination of
the location and description or the more specific tooltip element.<span
style='mso-spacerun:yes'>  </span>The CSS class names shown are just those
provided in this demo and your application would have its own set of event CSS
classes to help control the look of the day.<span style='mso-spacerun:yes'> 
</span>You can also just provide direct CSS style information.</p>

</asp:Content>