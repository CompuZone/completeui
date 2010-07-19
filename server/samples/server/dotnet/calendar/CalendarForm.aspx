<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CalendarForm.aspx.cs" Inherits="calendar_CalendarForm" MasterPageFile="~/NitobiExample.master" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<h2>Calendar in a Form</h2>
<p>This example shows how easy it is to grab the selected date from Calendar components on a postback. The selected date is always available via the Page's Form Request hash, with the Calendar's Client ID as the key. Check out the code-behind for details.</p>

<ntb:Calendar ID="formCal" Mode="Standard" runat="server" Theme="Flex" Visible="true" >
</ntb:Calendar>
    
<p>Click the button below to see the selected date.</p>
<asp:Button runat="server" ID="SubmitBtn" Text="Submit this form!" OnClick="SubmitBtn_Click" Visible="true" Width="200" />
<div id="ContentsDiv" runat="server" style="background-color:#DDDDDD;color:#222222;font-size:15px;"></div>
</asp:Content>
