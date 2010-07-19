<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SmartSearch.aspx.cs" Inherits="combo_SmartSearch" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <p><strong>Instructions:</strong> put your cursor in the "Choose a Folder" field and start typing. The listbox will contain selections from the database based on your search string in some order that you specify</p>

    <ntb:Combo ID="c" Mode="smartsearch" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="smartsearch" DataTextField="FolderAbsolute">
        <TextBox Width="400" />
        <List Width="550" ClipLength="10" AllowPaging="false" />
        <Columns>
            <ntb:TextColumn Width="550" DataField="FolderAbsolute" />
        </Columns>
    </ntb:Combo>

</asp:Content>