<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleTabStrip.aspx.cs" Inherits="test.SimpleTabStrip" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Theme:<asp:DropDownList runat="server" ID="theme" AutoPostBack="true"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
	<asp:CheckBox ID="autosize" runat="server" AutoPostBack="true" Text="Auto size tabs to page" />

	<ntb:TabStrip ID="tab1" runat="server" Width="600" Height="400">
		<AutoSize WidthDomId="pagewidth" FixedHeightMargin="250"  />
		<TabItems>
			<ntb:TabItem Name="Ajaxian" NavigationUrl="http://ajaxian.com/" Width="150px" />
			<ntb:TabItem Name="UML Designs" NavigationUrl="nitobi design1.htm?a%3D" Width="150px" />
			<ntb:TabItem Name=".NET Docs" NavigationUrl="/ApiDocs/index.html" Width="150px" />
		</TabItems>
	</ntb:TabStrip>
	<div id="pagewidth"></div>	
</asp:Content>