<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleTreeGrid.aspx.cs" Inherits="test.SimpleTreeGrid" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
<ntb:Grid id="g" runat="server" Mode="LiveScrolling" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista" Effect="Shade" GroupOffset="40" 
		  SelectionMode="Multi" MinHeight="300" MinWidth="400"
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
<asp:Button ID="try" runat="server" />
</asp:Content>

<asp:Content ContentPlaceHolderID="codeExamples" runat="server">
In the ASP.NET environment, the Grid control can be used as the Grid Tree simply by adding a ntb:ExpandColumn in the list of columns for the Grid.  Note that the syntax for the inner columns is the same between the ExpandColumn and the ComboColumn in the code shown below.
<div style="width:98em"><textarea name="code" class="html">
&lt;ntb:Grid id="Grid1" runat="server" Mode="LiveScrolling" PageSize="35" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista" Effect="Shade" GroupOffset="40"
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx">
	&lt;Columns>
		&lt;ntb:ExpandColumn Name="customers" GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx" Width="20" ShowHeader="false">
			&lt;ntb:BoundColumn DataField="Id" Width="30" />
			&lt;ntb:BoundColumn HeaderText="First Name" DataField="FirstName" Width="150" ReadOnly="false" />
			&lt;ntb:BoundColumn HeaderText="Last Name" DataField="LastName" Width="150" ReadOnly="false" />
		&lt;/ntb:ExpandColumn>
		&lt;ntb:BoundColumn DataField="ProductID" Visible="false" />
		&lt;ntb:ImageColumn DataField="img" Width="20" CssStyle="padding-top:4px;" />
		&lt;ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="ProductName" Width="200" ReadOnly="false" HorizontalAlign="Right" CssStyle="background-color:yellow;color:blue;" />
		&lt;ntb:CheckboxColumn HeaderText="Check" DataField="BulkAction" ReadOnly="false" />
		&lt;ntb:NumberColumn HeaderText="Number" DataField="ProductSKU" Width="150" Mask="#,##0" />
		&lt;ntb:ComboColumn HeaderText="Listbox" DataField="ProductCategoryID" Width="200" ValueField="ProductCategoryID" GetDataUrl="default.aspx" DataSourceId="productIds" ReadOnly="false">
			&lt;ClientEvents AfterCellEdit="alert('Product changed')" />
			&lt;Columns>
				&lt;ntb:BoundColumn DataField="ProductCategoryName" />
				&lt;ntb:BoundColumn DataField="ProductCategoryID" />
			&lt;/Columns>
		&lt;/ntb:ComboColumn>
	&lt;/Columns>
&lt;/ntb:Grid>
</textarea></div>
</asp:Content>