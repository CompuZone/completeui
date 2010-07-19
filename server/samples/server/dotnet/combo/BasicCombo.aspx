<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BasicCombo.aspx.cs" Inherits="BasicCombo" MasterPageFile="~/NitobiExample.master"%>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Basic ComboBox</h2>
    <p>This is a simple example of a Classic ComboBox. The data is populated from the server via a data handler script.</p>
        <ntb:Combo ID="c" Mode="Classic" Theme="Flex" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="combo" DataValueField="ContactName">
            <TextBox Width="175" />
            <List Width="360" Height="200" />
            <Columns>
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Job" DataField="JobTitle" />
            </Columns>
        </ntb:Combo>
        
</asp:Content>
