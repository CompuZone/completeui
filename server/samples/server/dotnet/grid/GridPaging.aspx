<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="GridPaging.aspx.cs" Inherits="GridPaging" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Paging Grid</h2>
    <p>This example shows the set up for a standard Grid instance: the Paging Grid. By setting the Grid's PageSize property, you can control the number
    of records the Grid should display per page. This parameter is also passed to your data get handler by the component, so that you as the developer
    can easily write any data access functions necessary for your Grid with pagination parameters at your fingertips.</p>
        <ntb:Grid id="g" runat="server" Mode="Standard" PageSize="5" Width="640" Height="200" Theme="Nitobi"
         GetDataUrl="Editors.ashx" SaveDataUrl="Editors.ashx" ShowToolbar="True" >
		  <Columns>
		        <ntb:TextColumn TextMode="SingleLine" HeaderText="ContactID" DataField="ContactID" Width="50" />
		        <ntb:TextColumn TextMode="SingleLine" MaxLength="255" HeaderText="Name" DataField="ContactName" Width="200" />
		        <ntb:TextColumn TextMode="SingleLine" MaxLength="255" HeaderText="E-mail" DataField="ContactEmail" Width="200" />
	      </Columns>
        </ntb:Grid>
</asp:Content>