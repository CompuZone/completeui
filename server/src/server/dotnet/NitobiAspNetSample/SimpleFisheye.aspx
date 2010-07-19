<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleFisheye.aspx.cs" Inherits="test.SimpleFisheye" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Fisheye Theme:<asp:DropDownList runat="server" ID="theme" AutoPostBack="true" />&nbsp;&nbsp;&nbsp;
	Open Direction: <asp:DropDownList runat="server" ID="openDir" AutoPostBack="true" />&nbsp;&nbsp;&nbsp;
	Expand Direction: <asp:DropDownList runat="server" ID="expandDir" AutoPostBack="true" /><br />
	Icon Width: <asp:TextBox runat="server" ID="iwidth" AutoPostBack="true" Width="3em" />&nbsp;&nbsp;&nbsp;
	Grow Percent: <asp:TextBox runat="server" ID="gperc" AutoPostBack="true" Width="3em" /><br />
	<asp:CheckBox runat="server" ID="checkPos" AutoPostBack="true" Text="Continuously check if fisheye needs to be moved/resized" />
	<div style="height:25px"></div>
	
<ntb:Grid id="g" runat="server" Mode="LiveScrolling" PageSize="35" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista" Effect="Shade" GroupOffset="40" 
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx">
	<Columns>
		<ntb:ExpandColumn Name="xmlCustomers" GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx" Width="20" ShowHeader="false">
			<ntb:BoundColumn DataField="Id" Width="30" />
			<ntb:BoundColumn HeaderText="First Name" DataField="FirstName" Width="150" ReadOnly="false" />
			<ntb:BoundColumn HeaderText="Last Name" DataField="LastName" Width="150" ReadOnly="false" />
		</ntb:ExpandColumn>
		<ntb:BoundColumn DataField="ProductID" Visible="false" />
		<ntb:ImageColumn DataField="img" Width="20" CssStyle="padding-top:4px;">
		</ntb:ImageColumn>
		<ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="ProductName" Width="200" ReadOnly="false" HorizontalAlign="Right" CssStyle="background-color:yellow;color:blue;">
		</ntb:TextColumn>		
		<ntb:CheckboxColumn HeaderText="Check" DataField="BulkAction" ReadOnly="false" />
		<ntb:NumberColumn HeaderText="Number" DataField="ProductSKU" Width="150" Mask="#,##0" />
		<ntb:ComboColumn HeaderText="Listbox" DataField="ProductCategoryID" Width="200" ValueField="ProductCategoryID" GetDataUrl="default.aspx" DataSourceId="productIds" ReadOnly="false">
			<ClientEvents AfterCellEdit="alert('Product changed')" />
			<Columns>
				<ntb:BoundColumn DataField="ProductCategoryName" />
				<ntb:BoundColumn DataField="ProductCategoryID" />
			</Columns>
		</ntb:ComboColumn>
	</Columns>
</ntb:Grid>

	<div style="margin: 10px 0px 0px 100px;">
			<ntb:Fisheye ID="fish" runat="server">
				<ntb:FisheyeItem ImageUrl="/images/file_new.png" Tooltip="New" />
				<ntb:FisheyeItem ImageUrl="/images/file_explore.png" Tooltip="Explore" />
				<ntb:FisheyeItem ImageUrl="/images/nitlogoicon.gif" Tooltip="Navigate - Nitobi Home" NavigateUrl="http://www.nitobi.com" />
			</ntb:Fisheye>
	</div>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="codeExamples" runat="server">
<div style="width:800px"><textarea name="code" class="html">
&lt;ntb:Fisheye ID="Fisheye1" runat="server">
	&lt;ntb:FisheyeItem ImageUrl="/images/file_new.png" Tooltip="New" />
	&lt;ntb:FisheyeItem ImageUrl="/images/file_explore.png" Tooltip="Explore" />
&lt;/ntb:Fisheye>
</textarea></div>
</asp:Content>