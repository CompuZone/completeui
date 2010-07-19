<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>SmartSearch</title>
</head>
<body>
<p class="intro">This sample illustrates the search mode 'SmartSearch' 
(with <em>Intelligent Autocomplete</em>) which allows the developer 
to provide 'fuzzy search' wildcard autocompletion.</p>

<ul class="instructions">
	<li>Try starting by typing &quot;temp&quot; in the text box.  The listbox 
	will contain selections from the database based on your search 
	string in some order that is specified in the servlet (eg: the order 
	of priority). </li>
</ul>

<p class="notes">You can press enter to select the top record and then 
keep typing for a subfolder.</p>

<ntb:combo id="cmbMySearch" mode="smartsearch"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="400px" datafieldindex="0"></ntb:combotextbox>
	<!-- A list which allows paging and search. The datasource is a separate asp file. -->
	<ntb:combolist width="550px" datasourceurl="get" pagesize="10">
		<ntb:combocolumndefinition width="100%" datafieldindex="0"></ntb:combocolumndefinition>
	</ntb:combolist>
</ntb:combo>
</body>
</html>