<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Menus</title>
</head>
<body>
<p class="intro">Combobox supports the addition of simple menus right 
inside the dropdown. This can be useful for giving quick access to 
application features that relate to the list data (for example, adding 
a new record, or performing a different kind of search).</p>
<p>Find a Customer (classic):

	<ntb:combo id="cmbCustomers" mode="classic"
		toolkitjsurl="../../../common/script/nitobi.toolkit.js"
		componentcssurl="../../../common/style/nitobi.combo.css"
		componentjsurl="../../../common/script/nitobi.combo.js">
		<ntb:combotextbox width="175px" datafieldindex="0" ></ntb:combotextbox>
		<!-- A list which allows paging and search. The datasource is a separate.jsp file. -->
		<ntb:combolist width="360px" height="200px" datasourceurl="get" pagesize="10" >
			<ntb:combomenu icon="add.gif" onclickevent="alert('You clicked add customer')" text=" &nbsp;Add customer..."></ntb:combomenu>
			<ntb:combomenu icon="search.gif" onclickevent="alert('You clicked Fulltext search')" text="Perform fulltext search.."></ntb:combomenu>		
			<ntb:combocolumndefinition width="130px" headerlabel="Customer Name" datafieldindex="0" ></ntb:combocolumndefinition>
			<ntb:combocolumndefinition width="200px" datafieldindex="1"></ntb:combocolumndefinition>
		</ntb:combolist>
	</ntb:combo>
</p>
</body>
</html>