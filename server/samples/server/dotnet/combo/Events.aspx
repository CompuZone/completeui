<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Events.aspx.cs" Inherits="combo_Events" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>ComboBox Events</h2>
        <p>Select a Customer:</p>
    
        <ntb:Combo ID="c" Mode="Classic" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="combo" DataTextField="ContactName">
            <ClientEvents Blur="ReportEventTextBox('OnBlurEvent();')" Focus="ReportEventTextBox('OnFocusEvent();')" BeforeSelect="ReportEventTextBox('OnBeforeSelectEvent();')" Tab="ReportEventTextBox('OnTabEvent();')" Select="ReportEventTextBox('OnSelectEvent();')" />
            <TextBox Width="200" OnEditKeyUpEvent="ReportEventTextBox('OnTabEvent();')"/>
            <List Width="370" Height="205"  OnAfterSearchEvent="ReportEventTextBox('OnAfterSearchEvent();')"
                OnBeforeSearchEvent="ReportEventTextBox('OnBeforeSearchEvent();')"
                OnHideEvent="ReportEventTextBox('OnHideEvent();')" 
                OnShowEvent="ReportEventTextBox('OnShowEvent();')"/>
            <Columns>
                <ntb:ImageColumn Width="16" DataField="img" HeaderText="<img src=images/add.gif />"  />
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Email" DataField="ContactEmail" />
            </Columns>
        </ntb:Combo>
        
        <form name="DemoForm">
        <p>Public Events firing:</p>
        <textarea id="events_textbox" name="EventTextBox" cols="80" rows="10"></textarea>
        </form>

        <script>
        // This code is specific to displaying our event text and is not essential for normal operation
	var EventCount = 1;
	var myTimer;
	function ReportEventTextBox(EventName)
	{
		document.getElementById("events_textbox").value = '[' + EventCount + '] ' + EventName + '\n' + document.getElementById("events_textbox").value;
		EventCount += 1;
		window.clearTimeout(myTimer);
		myTimer = window.setTimeout('document.getElementById("events_textbox").value= "";', 2500);
	}


	// The ComboBox automatically looks for the following function after initialization. It is not required though.

	function OnAfterIntializeEbaCombos()
	{
		ReportEventTextBox('onAfterInitialize();');
	}

        </script>
        
</asp:Content>