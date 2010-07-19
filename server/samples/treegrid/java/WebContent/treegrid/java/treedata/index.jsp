<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script src="../../../common/script/nitobi.toolkit.js"></script>
<script src="../../../common/script/nitobi.treegrid.js"></script>
<link type="text/css" rel="stylesheet" href="../../../common/style/nitobi.grid.css"/>
<title>Insert title here</title>
</head>
<body onload="nitobi.loadComponent('TreeGrid')">
<ntb:treegrid id="TreeGrid" 
				  width="630"
				  height="500"
				  mode="standard"
				  rowsperpage="20"  
				  gethandler="get"
				  toolbarenabled="true"
				  rootcolumns="customers"
				  theme="vista" 
				  groupoffset="20">
		  <ntb:columns id="customers">
			<ntb:expandcolumn childcolumnset="orders" width="50"></ntb:expandcolumn>
			<ntb:textcolumn label="Customer Name" xdatafld="CustomerName" width="130"></ntb:textcolumn>
	   		<ntb:textcolumn label="Contact Name" xdatafld="ContactName" width="130"></ntb:textcolumn>
		  	<ntb:textcolumn label="Email" xdatafld="ContactEmail" width="150"></ntb:textcolumn>
		  	<ntb:textcolumn label="Phone Number" xdatafld="PhoneNumber"></ntb:textcolumn>
		  </ntb:columns>
		  
		   <ntb:columns id="orders" gethandler="getorders" savehandler="saveorders">
		  	<ntb:expandcolumn childcolumnset="products" width="50"></ntb:expandcolumn>
		  	<ntb:textcolumn label="Order ID" editable="false" xdatafld="OrderID" width="100"></ntb:textcolumn>
		  	<ntb:textcolumn label="Product Name" xdatafld="ProductName" width="200"></ntb:textcolumn>
		  	<ntb:textcolumn label="Order Date" xdatafld="OrderDate" width="120"></ntb:textcolumn>
		  	<ntb:textcolumn label="Shipped Date" xdatafld="ShippedDate" width="120"></ntb:textcolumn>
		  </ntb:columns>
	</ntb:treegrid>
</body>
</html>