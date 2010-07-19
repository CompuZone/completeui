<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EmbeddedMenu.aspx.cs" Inherits="combo_EmbeddedMenu" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Embedded Menu in ComboBox</h2>
    <p>Combobox supports the addition of simple menus right inside the dropdown. This can be useful for giving quick access to application features that relate to the list data (for example, adding a new record, or performing a different kind of search). See the examples below for a demonstration.</p>

    <p>Find a Customer (classic)</p>
    
    <ntb:Combo ID="c1" Mode="Classic" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="combo">
            <MenuItems>
                <ntb:MenuItem ClientOnClick="alert('You clicked add customer')" Icon="images/add.gif" Text="Add customer..." />
                <ntb:MenuItem ClientOnClick="alert('You clicked Fulltext search')" Icon="images/search.gif" Text="Perform fulltext search..." />
            </MenuItems>
            <TextBox Width="200" />
            <List Width="370" Height="205" />
            <Columns>
                <ntb:ImageColumn Width="16" DataField="img" HeaderText="<img src=images/scustomerimage.gif />"  />
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Email" DataField="ContactEmail" />
            </Columns>
        </ntb:Combo>
    
    <p>Find a Customer (filter)</p>
    
    <ntb:Combo ID="c2" Mode="Filter" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="combo" DataTextField="ContactName">
            <MenuItems>
                <ntb:MenuItem ClientOnClick="alert('You clicked Fulltext search')" Icon="images/search.gif" Text="Perform fulltext search..." />
                <ntb:MenuItem ClientOnClick="alert('You clicked add dept')" Icon="images/add.gif" Text="Add department..." />                
            </MenuItems>
            <TextBox Width="250" />
            <List Width="360" Height="205" />
            <Columns>
                <ntb:ImageColumn Width="16" DataField="img" HeaderText="<img src=images/scustomerimage.gif />"  />
                <ntb:TextColumn Width="130" HeaderText="Contact" DataField="ContactName" />
                <ntb:TextColumn Width="200" HeaderText="Email" DataField="ContactEmail" />
            </Columns>
        </ntb:Combo>
    
    <p>Find a Customer (smartsearch)</p>
    
    <ntb:Combo ID="c3" Mode="smartsearch" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="smartsearch" DataTextField="FolderAbsolute">
        <MenuItems>
                <ntb:MenuItem ClientOnClick="alert('You clicked add directory')" Icon="images/add.gif" Text="Add directory..." />
                <ntb:MenuItem ClientOnClick="alert('You clicked add drive')" Icon="images/add.gif" Text="Add drive..." />
            </MenuItems>
        <TextBox Width="400" />
        <List Width="550" ClipLength="10" AllowPaging="false" />
        <Columns>
            <ntb:TextColumn Width="550" DataField="FolderAbsolute" />
        </Columns>
    </ntb:Combo>
    
    <p>Find a Contact (smartlist)</p>
    
    <ntb:Combo ID="c4" Mode="smartlist" Theme="outlook" runat="server" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="smartlist" DataTextField="ContactInfo">
        <MenuItems>
                <ntb:MenuItem ClientOnClick="alert('You clicked add contact')" Icon="images/add.gif" Text="Add contact..." />
                <ntb:MenuItem ClientOnClick="alert('You clicked find')" Icon="images/add.gif" Text="Find a contact..." />
            </MenuItems>
        <TextBox Height="50" Width="505" />
        <List Width="400" BackgroundHighlightColor="#C4E4FF" ForegroundHighlightColor="#0000CC" AllowPaging="false"  ClipLength="10" />
        <Columns>
            <ntb:TextColumn DataField="ContactInfo" Width="400" />
        </Columns>
    </ntb:Combo>
    
    <p>Find a City (unbound)</p>
    
    <ntb:Combo ID="c5" Mode="Unbound" Theme="Outlook" AutoPostBack="true" GetDataUrl="DataHandler.ashx" DataSourceId="unbound" DataTextField="CityName" runat="server" >
        <MenuItems>
                <ntb:MenuItem ClientOnClick="alert('You clicked add city')" Icon="images/add.gif" Text="Add city..." />
            </MenuItems>
        <TextBox Width="200" />
        <List Width="200" AllowPaging="false" Height="180" />
        <Columns>
            <ntb:TextColumn DataField="CityName" Width="100" />
            <ntb:TextColumn DataField="Population" Width="70" />
        </Columns>
    </ntb:Combo>

</asp:Content>