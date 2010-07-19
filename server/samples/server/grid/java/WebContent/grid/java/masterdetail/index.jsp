<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>

<title>Nitobi Grid Demos - Master Detail</title>
<script>

	function init()
	{
		var myMasterGrid = nitobi.loadComponent('MasterGrid');
		var myDetailGrid = nitobi.loadComponent('DetailGrid');	
	}

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
		myBusinessCard.innerHTML = '<p class=AppHeading style="margin:0px;padding:0px;padding-left:10px;">' + myCustomerName + '</p>';
		myBusinessCard.innerHTML += '<img src="personicon' + myCustomerImageIndex + '.gif" align=right hspace=20><p style="margin:0px;padding:0px;padding-left:10px;"><strong>' + myContactName + '</strong> - <a href="mailto:' + myCustomerEmail + '">' + myCustomerEmail + '</a><br>(' + myCustomerTitle + ')</p>';
		myBusinessCard.innerHTML += '<p style="margin:0px;padding:0px;padding-left:10px; color: #666666">' + myCustomerAddress + '<br>' + myCustomerCountry + '</p>';
		
		var myDetailGrid = nitobi.getComponent('DetailGrid');
		myDetailGrid.getDataSource().setGetHandlerParameter('CustomerID', myCustomerID);
		myDetailGrid.dataBind();
		
		return true;
	}

</script>
</head>
<body>
<p class="intro">In a master-detail use case you have at least two grids. One is linked to 
	the other somehow. In this demo, we have a list of customers, and sales for each customer.</p>
	<ul class="instructions">
		<li>Click on a customer name in the left grid.</li> 
		<li>Watch as the right grid updates to reflect your decision.</li>
	</ul>
	<table cellpadding=0 cellspacing=0><tr><td style="padding:0px;"><p class=AppHeading>Customer List</p></td><td style="padding:0px;"><p class=AppHeading>Sales for Customer</p></td><tr><td valign=top style="padding:0px;">  
	<ntb:grid id="MasterGrid" 	
		width="400"
		height="457"
		mode="livescrolling"	
		rowinsertenabled="false"
		rowdeleteenabled="false"		
		gethandler="master"
		frozenleftcolumncount="2"
		oncellclickevent="ChooseCustomer(eventArgs)"
		toolbarenabled="false"
		rowhighlightenabled="true"
		toolkitjsurl="../../../common/script/nitobi.toolkit.js"
		componentcssurl="../../../common/style/nitobi.grid.css"
		componentjsurl="../../../common/script/nitobi.grid.js">
		<ntb:columns>		
			  <ntb:textcolumn 	label="ID"  		xdatafld="CustomerID"    	width="25"></ntb:textcolumn>
			  <ntb:textcolumn   label="Customer"    xdatafld="CustomerName"		width="120"></ntb:textcolumn>
			  <ntb:textcolumn 	label="Contact"  	xdatafld="ContactName"      width="200"></ntb:textcolumn>
			  <ntb:textcolumn 	label="Email"  		xdatafld="ContactEmail"		width="200"></ntb:textcolumn>
			  <ntb:textcolumn 	label="Title"  		xdatafld="ContactTitle"		width="200"></ntb:textcolumn>			  	
			  <ntb:textcolumn 	label="Address"  	xdatafld="Address"    		width="200"></ntb:textcolumn>	
			  <ntb:textcolumn 	label="Country"  	xdatafld="Country"    		width="50"></ntb:textcolumn>				  				  
		  </ntb:columns>	  
	</ntb:grid>
	</td><td valign=top align=left style="padding:0px;">
	<ntb:grid id="DetailGrid" 	
		width="250"
		height="250"
		mode="livescrolling"	
		rowinsertenabled="false"
		rowdeleteenabled="false"		
		gethandler="detail"
		toolbarenabled="false"
		rowsperpage="10"
		toolkitjsurl="../../../common/script/nitobi.toolkit.js"
		componentcssurl="../../../common/style/nitobi.grid.css"
		componentjsurl="../../../common/script/nitobi.grid.js">
		  <ntb:columns>
		  	  <ntb:textcolumn   label="Product"     xdatafld="ProductName"	 width="120"></ntb:textcolumn>
			  <ntb:numbercolumn label="Price"  		xdatafld="ProductPrice"  width="100"	mask="$#,##0.00"></ntb:numbercolumn>
			  <ntb:numbercolumn label="Quantity"  	xdatafld="Quantity"      width="100"></ntb:numbercolumn>			  
			  <ntb:textcolumn 	label="Order Date"  xdatafld="OrderDate"	 width="200"></ntb:textcolumn>			  				  				  
		  </ntb:columns>		
	</ntb:grid>	
	<div id="BusinessCard" style="background-color:#F0F0F0; border-right: 1px solid #999999; border-bottom: 1px solid #999999; width: 250px; height:207px; margin:0px;">
	<p style="margin:0px;padding:0px;padding-left: 10px;">Instructions: Select a customer from the list.</p>
	</div>
	</td></tr></table>
</body>
</html>