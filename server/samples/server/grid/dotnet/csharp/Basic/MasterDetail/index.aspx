<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<%@ Page language="c#" Codebehind="index.aspx.cs" AutoEventWireup="false" Inherits="GridCSharpSamples.Basic.MasterDetail.index" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Nitobi Grid V3 Demos - Master Detail</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		
		<!-- The following includes is just for the demo template -->
		<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
		</link>	
		<!-- End of Demo-related Includes -->
		<script>


function ChooseCustomer(eventArgs)
{
	var myRow = eventArgs.cell.getRow();
	
	var myMasterGrid = nitobi.getComponent('MasterGrid');
	
	var myCustomerID = myMasterGrid.getCellObject(myRow,0).getValue();
	var myCustomerName = myMasterGrid.getCellObject(myRow, 1).getValue();
	var myContactName = myMasterGrid.getCellObject(myRow, 2).getValue();
	var myCustomerEmail = myMasterGrid.getCellObject(myRow, 3).getValue();
	var myCustomerTitle = myMasterGrid.getCellObject(myRow, 4).getValue();		
	var myCustomerAddress = myMasterGrid.getCellObject(myRow, 5).getValue();		
	var myCustomerCountry = myMasterGrid.getCellObject(myRow, 6).getValue();
	
	var myCustomerImageIndex = Math.round((Math.random()*3) + 0.5);
	
	var myBusinessCard = document.getElementById('BusinessCard');
	myBusinessCard.innerHTML = '<p class=AppHeading style="padding-left:10px;">' + myCustomerName + '</p>';
	myBusinessCard.innerHTML += '<img src="personicon' + myCustomerImageIndex + '.gif" align=right hspace=20><p style="padding-left:10px;"><strong>' + myContactName + '</strong> - <a href="mailto:' + myCustomerEmail + '">' + myCustomerEmail + '</a><br>(' + myCustomerTitle + ')</p>';
	myBusinessCard.innerHTML += '<p style="padding-left:10px; color: #666666">' + myCustomerAddress + '<br>' + myCustomerCountry + '</p>';
	
	var myDetailGrid = nitobi.getComponent('DetailGrid');
	myDetailGrid.getDataSource().setGetHandlerParameter('CustomerID', myCustomerID);
	myDetailGrid.dataBind();
	
	return true;
}

		</script>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->
					<p>In a master-detail use case, you have at least two grids, one somehow linked to the 
						other. In this demo, we have a list of customers and sales for each 
						customer.</p>
					<p><b>***Click on a customer name and watch the sales update.***</b></p>
					<table cellSpacing="0" cellPadding="0">
						<tr>
							<td style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; PADDING-TOP: 0px">
								<p class="AppHeading">Customer List</p>
							</td>
							<td style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; PADDING-TOP: 0px">
								<p class="AppHeading">Sales for Customer</p>
							</td>
						<tr>
							<td style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; PADDING-TOP: 0px"
								vAlign="top"><ntb:grid id="MasterGrid" runat="server" Width="400px" Height="457px" Mode="LiveScrolling"
									RowInsertEnabled="False" RowDeleteEnabled="False" ToolbarEnabled="False" OnCellClickEvent="ChooseCustomer(eventArgs)">
									<ntb:datasources xmlns:ntb="http://www.nitobi.com">
										<ntb:datasource id="_default">
											<ntb:datasourcestructure></ntb:datasourcestructure>
											<ntb:data></ntb:data>
										</ntb:datasource>
									</ntb:datasources>
									<ntb:columns xmlns:ntb="http://www.nitobi.com">
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="25" sortenabled="true"
											label="ID" xdatafld="CustomerID"></ntb:textcolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="true" width="120" label="Customer"
											xdatafld="CustomerName" sortenabled="true"></ntb:textcolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" xdatafld="ContactName"
											label="Contact" sortenabled="true"></ntb:textcolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" xdatafld="ContactEmail"
											label="Email" sortenabled="true"></ntb:textcolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" xdatafld="ContactTitle"
											label="Title" sortenabled="true"></ntb:textcolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" xdatafld="Address"
											label="Address" sortenabled="true"></ntb:textcolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="50" xdatafld="Country"
											label="Country" sortenabled="true"></ntb:textcolumn>
									</ntb:columns>
								</ntb:grid></td>
							<td style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; PADDING-TOP: 0px"
								vAlign="top" align="left"><ntb:grid id="DetailGrid" runat="server" Width="250px" Height="250px" Mode="LiveScrolling"
									RowInsertEnabled="False" RowDeleteEnabled="False" ToolbarEnabled="False" DataSources="(Collection)">
									<ntb:datasources xmlns:ntb="http://www.nitobi.com">
										<ntb:datasource id="_default1">
											<ntb:datasourcestructure></ntb:datasourcestructure>
											<ntb:data></ntb:data>
										</ntb:datasource>
										<ntb:datasource id="_default">
											<ntb:datasourcestructure />
											<ntb:data />
										</ntb:datasource>
									</ntb:datasources>
									<ntb:columns xmlns:ntb="http://www.nitobi.com">
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="120" xdatafld="ProductName"
											label="Product" sortenabled="true"></ntb:textcolumn>
										<ntb:numbercolumn editable="True" sortdirection="asc" visible="True" width="100" xdatafld="ProductPrice"
											label="Price" mask="$#,##0.00" sortenabled="true"></ntb:numbercolumn>
										<ntb:numbercolumn editable="True" sortdirection="asc" visible="True" width="100" xdatafld="Quantity"
											label="Quantity" sortenabled="true"></ntb:numbercolumn>
										<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" xdatafld="OrderDate"
											label="Order Date" sortenabled="true"></ntb:textcolumn>
									</ntb:columns>
								</ntb:grid>
								<div id="BusinessCard" style="BORDER-RIGHT: #999999 1px solid; WIDTH: 250px; BORDER-BOTTOM: #999999 1px solid; HEIGHT: 207px; BACKGROUND-COLOR: #f0f0f0">
									<p style="PADDING-LEFT: 10px">Instructions: Select a customer from the list.</p>
								</div>
							</td>
						</tr>
					</table>
	</body>
</HTML>
