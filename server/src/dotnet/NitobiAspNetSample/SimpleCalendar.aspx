<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleCalendar.aspx.cs" Inherits="test.SimpleCalendar" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Calendar Theme:
	<asp:DropDownList ID="calTheme" runat="server" AutoPostBack="true" />&nbsp;&nbsp;
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
	Calendar Culture:
	<asp:DropDownList ID="calCul" runat="server" AutoPostBack="true"></asp:DropDownList>
	<div style="height:5px;"></div>

	<table width="100%"><tr><td valign="top">
	<ntb:Calendar ID="cal1" runat="server" Theme="Leopard" Effect="Blind" GetDataUrl="EventTestData.xml" DataSourceId="RoomAvailability">
		<ClientEvents 
			DisabledDateSelected="alert('you cannot select that date')" 
			OutOfRangeDateSelected="alert('out of range')" 
			EventDateSelected="var e = eventArgs.events[0];$(ctl00_main_msgArea).innerHTML+='event date selected:&nbsp;&nbsp;Location: ' + e.location + '&nbsp;&nbsp;Description: ' + e.description + '';" 
			ValidDateSelected="$(ctl00_main_msgArea).innerHTML+='valide date ' + this.getSelectedDate() + ' selected';"
			Show="$(ctl00_main_msgArea).innerHTML+='calendar drop down occured<br/>';"
			Hide="$(ctl00_main_msgArea).innerHTML+='calendar roll up occured<br/>';"
			MonthChanged="$(ctl00_main_msgArea).innerHTML+='calendar month has changed<br/>';"
			YearChanged="$(ctl00_main_msgArea).innerHTML+='calendar year has changed<br/>';"
			  />
		<Columns>
			<ntb:DateColumn DataField="StartDate" />
			<ntb:BoundColumn DataField="Location" />
			<ntb:BoundColumn DataField="Description" />
			<ntb:BoundColumn DataField="Type" />
			<ntb:BoundColumn DataField="Tooltip" />
			<ntb:BoundColumn DataField="CssClass" />
			<ntb:BoundColumn DataField="CssStyle" /> 
		</Columns>
	</ntb:Calendar>
	</td><td width="60%" valign="top">
	<div id="msgArea" runat="server"></div>
	</td></tr></table>
</asp:Content>

<asp:Content ContentPlaceHolderID="codeExamples" runat="server">
<div style="width:1000px"><textarea name="code" class="html">

</textarea></div>
</asp:Content>