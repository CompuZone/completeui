<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Filter</title>
</head>
<body>
<p class="intro">This sample illustrates the search mode 'Filter' which 
allows the developer to provide compact autocompeting listboxes across 
many browsers. This ComboBox is bound to a database of 1,000 customer records.</p>
<ul class="instructions">
	<li>Just start typing a name like Mathew</li>
</ul>
<p class="notes">In Filter mode, the dropdown element is bound 'tightly' to the 
remote dataset. It only appears as the user types and returns a concise list 
of suggestions. Features used include type-ahead and autosizing listbox. No 
clickable button appears in this mode. </p>
<ntb:combo id="cmbCustomers" mode="filter" initialsearch="Alex"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="250px" datafieldindex="0" ></ntb:combotextbox>
	<!-- A list which allows paging and search. The datasource is a separate asp file. -->
	<ntb:combolist width="360px" datasourceurl="get" pagesize="10" >
		<ntb:combocolumndefinition columntype="IMAGE" width="16px" datafieldindex="2" headerlabel="<img src=scustomerimage.gif>"></ntb:combocolumndefinition>
		<ntb:combocolumndefinition width="130px" headerlabel="Customer Name" datafieldindex="0" ></ntb:combocolumndefinition>
		<ntb:combocolumndefinition width="200px" datafieldindex="1"></ntb:combocolumndefinition>
	</ntb:combolist>
</ntb:combo>
</body>
</html>