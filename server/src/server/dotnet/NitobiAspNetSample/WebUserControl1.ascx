<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WebUserControl1.ascx.cs" Inherits="test.WebUserControl1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<%@ Register Assembly="EndUserExtensions" Namespace="EndUserExtensions" TagPrefix="eue" %>

<div id="gridArea">
<table width="100%"><tr><td valign="top">
	<div style="border:solid 1px gray">
		<asp:CheckBox ID="gridResize" runat="server" Text="Allow grid resizing." AutoPostBack="true" /><br />
		<asp:Panel ID="minSizes" runat="server" style="margin-left:20px">
			Min Width:<asp:TextBox ID="minWidth" runat="server" Width="3em" />&nbsp;
			Min Height:<asp:TextBox ID="minHeight" runat="server" Width="3em" /><br />
			<asp:Button ID="updateMinSizes" runat="server" Text="Update" />
		</asp:Panel>
	</div>
	<asp:CheckBox ID="autoSave" runat="server" Text="Auto save changes." AutoPostBack="true" /><br />
	<asp:CheckBox ID="allowAdd" runat="server" Text="Allow add." AutoPostBack="true" />
	<asp:CheckBox ID="allowDelete" runat="server" Text="Allow delete." AutoPostBack="true" /><br />
	<asp:CheckBox ID="showToolbar" runat="server" Text="Show toolbar." AutoPostBack="true" /><br />
	<asp:CheckBox ID="showHeaders" runat="server" Text="Show column headers." AutoPostBack="true" /><br />
	<asp:CheckBox ID="showCellTips" runat="server" Text="Show cell tooltips." AutoPostBack="true" /><br />
	<asp:CheckBox ID="allowSort" runat="server" Text="Allow column sorting." AutoPostBack="true" />
</td><td valign="top">
	Grid Theme:
	<asp:DropDownList ID="gridTheme" runat="server" AutoPostBack="true" /><br />
	Number of Frozen Left Columns:
	<asp:DropDownList ID="numFrozen" runat="server" AutoPostBack="true">
		<asp:ListItem Value="0" />
		<asp:ListItem Value="1" />
		<asp:ListItem Value="2" />
	</asp:DropDownList><br />
	Row Selection option:
	<asp:DropDownList ID="rowSelect" runat="server" AutoPostBack="true" /><br />
	Enter Key Cursor Movement:
	<asp:DropDownList ID="entrAction" runat="server" AutoPostBack="true" /><br />
	Data Row Height:<asp:TextBox ID="rowHeight" runat="server"  AutoPostBack="true" Width="5em" /><br />
	Header Row Height:<asp:TextBox ID="hdrHeight" runat="server"  AutoPostBack="true" Width="5em" /><br />
</td></tr></table>

<div style="margin:25px 0px 25px 0px">
<asp:Panel ID="GridButtonArea" runat="server"/>
</div>
<ntb:Grid id="g" runat="server" Mode="LiveScrolling" PageSize="50" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista"
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="default.aspx" SaveDataUrl="DataHandler.ashx">
	<ClientEvents AfterRowInsert="alert('new row added')" AfterRowDelete="alert('row deleted')" 
	              ContextMenu="alert('context menu')" CellUpdate="alert('cell updated')" />
	<ColumnEvents AfterResize="alert('some column resized')" HeaderClick="alert('some header clicked')" />
	<Toolbars>
		<ntb:GridToolbar Title="ExtraInfo">
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
		<ntb:KeyColumn DataField="ProductSku" />
		<ntb:ImageColumn DataField="img" Width="20" CssStyle="padding-top:4px;">
			<ClientEvents CellClick="alert('image selected')" HeaderClick="alert('image header clicked')" />
		</ntb:ImageColumn>
		<ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="ProductName" Width="200" ReadOnly="false" HorizontalAlign="Right" CssStyle="background-color:yellow;color:blue;">
			<ClientEvents AfterResize="alert('text column resized')" />
		</ntb:TextColumn>		
		<ntb:CheckboxColumn HeaderText="<img src='images/scustomerimage1.gif' /> <span style='color:red'>C</span>heck" DataField="BulkAction" ReadOnly="false" />
		<ntb:NumberColumn HeaderText="Number" DataField="ProductSKU" Width="150" Mask="#,##0" />
		<ntb:NumberColumn HeaderText="Currency" DataField="ProductPrice" width="150" Mask="$#,##0.00" />
		<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM.dd.yyyy" ReadOnly="false" CssStyle="padding-left:5px;border-left: solid 1px gray;" />
		<ntb:ComboColumn HeaderText="Listbox" DataField="ProductCategoryID" ValueField="ProductCategoryID" GetDataUrl="default.aspx" DataSourceId="productIds" ReadOnly="false">
			<ClientEvents AfterCellEdit="alert('Product changed')" />
			<Columns>
				<ntb:BoundColumn DataField="ProductCategoryName" />
				<ntb:BoundColumn DataField="ProductCategoryID" />
			</Columns>
		</ntb:ComboColumn>
		<eue:CustomColumn1 HeaderText="Custom Column" DataField="ProductCategoryName" Width="300" Choice1="Orange" />
	</Columns>
</ntb:Grid>
</div>
<hr />
<div id="comboArea">
Combo Theme:
<asp:DropDownList ID="comboTheme" runat="server" AutoPostBack="true" /><br />

<div style="margin:25px 0px 25px 0px">
<asp:Panel ID="ButtonArea" runat="server"/>
</div>
Pick Your product:
<ntb:Combo ID="c" AutoPostBack="true" Mode="Unbound" runat="server" 
				DataTextField="ProductName" GetDataUrl="DataHandler.ashx" PageSize="40" Theme="Vista">
	<TextBox Width="150" />
	<List Width="575" Height="300" />
	<MenuItems>
		<ntb:MenuItem Icon="images/add.gif" Text="Add Product..." ClientOnClick="alert('You clicked on add new product...')" />
	</MenuItems>
	<Columns>
		<ntb:BoundColumn HeaderText="<img src='images/scustomerimage1.gif' /> Text" DataField="ProductName" Width="200" />		
		<ntb:ImageColumn DataField="img" Width="20" />
		<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
		<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />
		<eue:CustomColumn1 HeaderText="Custom Column" DataField="ProductCategoryName" Width="150" Choice1="Orange" />
	</Columns>
</ntb:Combo>
</div>