<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StandAlongGrid.aspx.cs" Inherits="test.StandAlongGrid"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<%@ Register Assembly="EndUserExtensions" Namespace="EndUserExtensions" TagPrefix="eue" %>

<html >
<head id="Head1" runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
<ntb:Grid id="g" runat="server" Mode="LiveScrolling" PageSize="35" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Vista"
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="StandAlongGrid.aspx" SaveDataUrl="StandAlongGrid.aspx">
	<ClientEvents AfterRowInsert="alert('new row added')" AfterRowDelete="alert('row deleted')" 
	              ContextMenu="alert('context menu')" CellUpdate="alert('cell updated')"  AfterLoadNextPage="alert('d')" />
	<ColumnEvents AfterResize="alert('some column resized')" HeaderClick="alert('some header clicked')" />
	<Columns>
		<ntb:BoundColumn DataField="ProductID" Visible="false" />
		<ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="ProductName" Width="200" ReadOnly="false" HorizontalAlign="Right" CssStyle="background-color:yellow;color:blue;">
			<ClientEvents AfterResize="alert('text column resized')" />
		</ntb:TextColumn>		
		<ntb:CheckboxColumn HeaderText="Check" DataField="BulkAction" ReadOnly="false" />
		<ntb:NumberColumn HeaderText="Number" DataField="ProductSKU" Width="150" Mask="#,##0" />
		<ntb:NumberColumn HeaderText="Currency" DataField="ProductPrice" width="150" Mask="$#,##0.00" />
		<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM.dd.yyyy" ReadOnly="false" CssStyle="padding-left:5px;border-left: solid 1px gray;" />
		<ntb:ComboColumn HeaderText="Listbox" DataField="ProductCategoryID" ValueField="ProductCategoryID" GetDataUrl="StandAlongGrid.aspx" DataSourceId="productIds" ReadOnly="false">
			<ClientEvents AfterCellEdit="alert('Product changed')" />
			<Columns>
				<ntb:BoundColumn DataField="ProductCategoryName" />
				<ntb:BoundColumn DataField="ProductCategoryID" />
			</Columns>
		</ntb:ComboColumn>
		<eue:CustomColumn1 HeaderText="Custom Column" DataField="ProductCategoryName" Width="300" Choice1="Orange" />
	</Columns>
</ntb:Grid>
<button onclick="debugger;nitobi.getComponent('g').selectCellByCoords(36,1)">Do it</button>
    </form>
</body>
</html>
