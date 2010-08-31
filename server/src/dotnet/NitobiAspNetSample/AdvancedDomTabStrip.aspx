<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdvancedDomTabStrip.aspx.cs" Inherits="test.AdvancedDomTabStrip" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Theme:<asp:DropDownList runat="server" ID="theme" AutoPostBack="true"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
	<asp:CheckBox ID="autosize" runat="server" AutoPostBack="true" Text="Auto size tabs to page" />

	<ntb:TabStrip ID="tab1" runat="server" Width="600" Height="400" DelayLoad="true">
		<AutoSize WidthDomId="pagewidth" FixedHeightMargin="250"  />
		<TabItems>
			<ntb:TabItem Name="Page 1" NamedId="tabInfo1" Width="150px" />
			<ntb:TabItem Name="Page 2" NamedId="tabInfo2" Width="150px" />
			<ntb:TabItem Name="Page 3" NamedId="tabInfo3" Width="150px" />
		</TabItems>
	</ntb:TabStrip>
	<div id="pagewidth"></div>	
	<div id="tabInfo1" style="display:none;overflow:hidden;">
		<uc1:WebUserControl1 runat="server" ID="wc1" />		
	</div>
	<div id="tabInfo2" style="display:none;overflow:hidden;">
		<uc1:WebUserControl1 runat="server" ID="wc2" />		
	</div>
	<div id="tabInfo3" style="display:none;overflow:hidden;">
		<uc1:WebUserControl1 runat="server" ID="wc3" />		
	</div>
</asp:Content>