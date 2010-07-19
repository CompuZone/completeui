<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Static.aspx.cs" Inherits="combo_Static" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Static Data ComboBox</h2>
    <p>This example's data handler script simply loads an arbitrary, row dataset XML file and returns it to the ComboBox. The attributes of each XML node are then mapped to data fields that Complete UI components can display.</p>
    <ntb:Combo ID="c" Mode="Unbound" Theme="Outlook" AutoPostBack="true" GetDataUrl="DataHandler.ashx" DataSourceId="unbound" DataTextField="CityName" runat="server" >
        <TextBox Width="200" />
        <List Width="200" AllowPaging="false" Height="180" />
        <Columns>
            <ntb:TextColumn DataField="CityName" Width="100" />
            <ntb:TextColumn DataField="Population" Width="70" />
        </Columns>
    </ntb:Combo>

</asp:Content>