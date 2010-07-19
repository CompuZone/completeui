<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GridWithCustomToolbars.aspx.cs" Inherits="test.GridWithCustomToolbars" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>


<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Grid Paging Mode:
	<div style="float:left;">
	<asp:DropDownList ID="gridMode" runat="server" AutoPostBack="true">
		<asp:ListItem Value="LiveScrolling" />
		<asp:ListItem Value="Standard" />
	</asp:DropDownList>
	</div>
<div style="clear:both"></div>

<ntb:Grid id="g" runat="server" Mode="LiveScrolling" PageSize="15" Width="640" Height="400" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista" Effect="Shade" GroupOffset="40" 
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx">
	<Toolbars>
		<ntb:GridToolbar Title="Standard">
			<ntb:ButtonItem Id="power" ImageUrl="/images/power.png" Tooltip="Power Mode!" Click="alert('grid ' + this.grid.ID + ' in Power Mode!' + this.grid.getPagingMode());" Height="17" />
			<ntb:SeparatorItem /> <ntb:SaveButtonItem Tooltip="Save them there changes of yours" /> <ntb:SeparatorItem  />
			<ntb:TotalRowsInfoItem CssStyle="margin-top:4px;float:left;">
				Total records <b>{0}</b>
			</ntb:TotalRowsInfoItem>
		</ntb:GridToolbar>
		<ntb:GridToolbar Title="Paging" Width="200">
			<ntb:PrevPageButtonItem />		
			<ntb:NextPageButtonItem />
			<ntb:PagingInfoItem CssStyle="margin-top:4px;float:left;">
				Page: <b>{0}</b> of <b>{1}</b>
			</ntb:PagingInfoItem>
		</ntb:GridToolbar>
	</Toolbars>
	<Columns>
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















<asp:Content ContentPlaceHolderID="docs" runat="server">
<p>
The Grid below is using custom toolbar items as well as new toolbar items unique to the ASP.NET version of the Nitobi grid.  The first button on the left is a totally custom button for this page, while the total records info area is a new toolbar item type.  When the grid is in paging mode, the paging toolbar will appear on the right, which on this page has been customized to show the current page and the total number of pages for the given data.
</p>
</asp:Content>

<asp:Content ContentPlaceHolderID="codeExamples" runat="server">
In the Grid server side html definition below, notice on lines 5-20 the two toolbars being defined for this page.  Line 7 represents a new custom button that will display an alert message when selected.  Line 10 is a custom format for the output for the total number of rows display added.  The ntb:TotalRowsInfoItem type toolbar item is unique to the Nitobi ASP.NET library.
<div style="width:98em"><textarea name="code" class="html">
&lt;ntb:Grid id="Grid1" runat="server" Mode="LiveScrolling" PageSize="35" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista" Effect="Shade" GroupOffset="40" 
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="DataHandler.ashx" SaveDataUrl="DataHandler.ashx">
	&lt;Toolbars>
		&lt;ntb:GridToolbar Title="Standard">
			&lt;ntb:ButtonItem Id="ButtonItem1" ImageUrl="/images/power.png" Tooltip="Power Mode!" Click="alert('grid ' + this.grid.ID + ' in Power Mode!' + this.grid.getPagingMode());" Height="17" />
			&lt;ntb:SeparatorItem /> &lt;ntb:SaveButtonItem Tooltip="Save them there changes of yours" /> &lt;ntb:SeparatorItem  />
			&lt;ntb:TotalRowsInfoItem CssStyle="margin-top:4px;float:left;">
				Total records &lt;b>{0}&lt;/b>
			&lt;/ntb:TotalRowsInfoItem>
		&lt;/ntb:GridToolbar>
		&lt;ntb:GridToolbar Title="Paging">
			&lt;ntb:PrevPageButtonItem />		
			&lt;ntb:NextPageButtonItem />
			&lt;ntb:PagingInfoItem CssStyle="margin-top:4px;float:left;">
				Page: &lt;b>{0}&lt;/b> of &lt;b>{1}&lt;/b>
			&lt;/ntb:PagingInfoItem>
		&lt;/ntb:GridToolbar>
	&lt;/Toolbars>
	&lt;Columns>
		&lt;ntb:BoundColumn DataField="ProductID" Visible="false" />
		&lt;ntb:ImageColumn DataField="img" Width="20" CssStyle="padding-top:4px;">
		&lt;/ntb:ImageColumn>
		&lt;ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="ProductName" Width="200" ReadOnly="false" HorizontalAlign="Right" CssStyle="background-color:yellow;color:blue;">
		&lt;/ntb:TextColumn>		
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