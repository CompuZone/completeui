<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SmartList.aspx.cs" Inherits="combo_SmartList" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<h2>SmartList ComboBox</h2>
<p>This example shows off the SmartList ComboBox mode. Enter a few letters into the To: field to see how it behaves.</p>
<div style="background-image: url(images/mailbackground.png);background-position: top left; background-repeat: no-repeat; padding-top:3px; padding-left: 59px; height: 322px; width:568px;">
    <ntb:Combo ID="c" Mode="smartlist" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="smartlist" DataTextField="ContactInfo">
        <TextBox Height="50" Width="505" />
        <List Width="400" BackgroundHighlightColor="#C4E4FF" ForegroundHighlightColor="#0000CC" AllowPaging="false"  ClipLength="10" />
        <Columns>
            <ntb:TextColumn DataField="ContactInfo" Width="400" />
        </Columns>
    </ntb:Combo>
</div>

</asp:Content>