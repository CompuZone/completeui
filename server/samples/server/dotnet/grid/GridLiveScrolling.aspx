<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="GridLiveScrolling.aspx.cs" Inherits="GridLiveScrolling" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>LiveScrolling Grid</h2>
    <p>The LiveScrolling Grid's main feature is it's on-demand loading of data. Instead of retrieving a full data set and displaying that in the Grid
    the LiveScrolling Grid will retrieve just the number of records that should be currently visible in the Grid's viewport. As you scroll through the
    Grid, requests are being made behind-the-scenes and the retrieved data is being rendered on-the-fly.</p>
        <ntb:Grid id="g" runat="server" Mode="LiveScrolling" PageSize="15" Width="640" Height="100" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Flex" Effect="Shade" GroupOffset="40" 
		  SelectionMode="Multi" LiveScollingMode="Peek" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="Editors.ashx" SaveDataUrl="Editors.ashx" ShowToolbar="True">
		  <Columns>
		        <ntb:BoundColumn DataField="ContactID" Visible="true" HeaderText="ID" />
		        <ntb:TextColumn TextMode="SingleLine" MaxLength="255" HeaderText="Name" DataField="ContactName" Width="200" ReadOnly="false" />
		        <ntb:TextColumn TextMode="SingleLine" MaxLength="255" HeaderText="E-mail" DataField="ContactEmail" Width="200" ReadOnly="false" />
		        <ntb:TextColumn TextMode="SingleLine" MaxLength="255" HeaderText="Job Title" DataField="JobTitle" Width="200" ReadOnly="false" HorizontalAlign="Right" />
	      </Columns>
        </ntb:Grid>
</asp:Content>
