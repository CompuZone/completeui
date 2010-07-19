<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Basic</title>
</head>
<body>
<p class="intro">Getting started with a basic grid involves just a little preparation of your page.</p>
<ul class="instructions">
	<li>Put a Combo Tag on the Page</li>
	<li>Write a Data Handler</li>
</ul>
<p class="notes">The Nitobi Taglib will automatically look for the required scripts and stylesheets
					in the ./resources/nitobi/script and ./resources/nitobi/style directories respectively.
					If you need to override these locations, use the toolkitjsurl, componentjsurl and componentcssurl
					attributes of the combo element</p>
					
<ntb:combo id="cmbCustomers" mode="classic" initialsearch="James"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="175px" datafieldindex="0" ></ntb:combotextbox>
	<!-- A list which allows paging and search. The datasource is a separate asp file. -->
	<ntb:combolist width="360px" height="200px" datasourceurl="get" pagesize="15" >
		<ntb:combocolumndefinition width="130px" headerlabel="Customer Name" datafieldindex="0" ></ntb:combocolumndefinition>
		<ntb:combocolumndefinition width="200px" datafieldindex="1"></ntb:combocolumndefinition>
	</ntb:combolist>
</ntb:combo>
</body>
</html>