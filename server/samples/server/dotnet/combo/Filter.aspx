<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Filter.aspx.cs" Inherits="combo_Filter" MasterPageFile="~/NitobiExample.master"%>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Filter ComboBox</h2>
    <p>In this mode, the dropdown element is bound 'tightly' to the remote dataset. It only appears as the user types and returns a concise list of suggestions. Features used include type-ahead and autosizing listbox. No clickable button appears in this mode.</p>
    <p>Select a Customer:</p>
    
    <ntb:Combo ID="c" Mode="Filter" Theme="outlook" runat="server" AutoPostBack="true" GetDataUrl="DataHandler.ashx" DataSourceId="combo" DataTextField="ContactName">
            <TextBox Width="250" />
            <List Width="360" Height="205" />
            <Columns>
                <ntb:ImageColumn Width="16" DataField="img" HeaderText="<img src=images/add.gif />"  />
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Email" DataField="ContactEmail" />
            </Columns>
        </ntb:Combo>
        
        <p><em>(Try typing 'shar' - watch how the listbox changes as you type)</em></p>
        
        <p>Select a Customer:</p>
        
   <ntb:Combo ID="c2" Mode="Filter" Theme="winxpsilver" runat="server" AutoPostBack="true" GetDataUrl="DataHandler.ashx" DataSourceId="combo" DataTextField="ContactName">
            <TextBox Width="250" />
            <List Width="360" Height="205" />
            <Columns>
                <ntb:ImageColumn Width="16" DataField="img" HeaderText="<img src=images/add.gif />"  />
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Email" DataField="ContactEmail" />
            </Columns>
        </ntb:Combo>

</asp:Content>