<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Paging.aspx.cs" Inherits="combo_Paging" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Paging ComboBox</h2>
    <p>This example shows how the ComboBox can also be set up to have paging controls. Open the ComboBox dropdown list button below, and then click on the arrow in the bottom-right of the ComboBox list to retrieve more results.</p>
        <ntb:Combo ID="c" Mode="Classic" Theme="outlook" runat="server" AutoPostBack="true" GetDataUrl="DataHandler.ashx" DataSourceId="combo">
            <TextBox Width="200" />
            <List Width="370" Height="205" />
            <Columns>
                <ntb:ImageColumn Width="16" DataField="img" HeaderText="<img src=images/add.gif />"  />
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Email" DataField="ContactEmail" />
            </Columns>
        </ntb:Combo>
        
</asp:Content>
