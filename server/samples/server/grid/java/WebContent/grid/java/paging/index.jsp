<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<title>Nitobi Grid Demos - Paging</title>
</head>
<body>
<p class="intro">Even with the seamless access to large data that LiveScrolling provides, 
	there are still circumstances where traditional Paging is appropriate. Paging can be performed 
	on <strong>dynamic</strong> data (via ajax requests).</p>  
	<ul class="instructions">
		<li>Use the paging buttons to page forward and back through the data.</li>
		<li>Notice that whenever a new page is loaded a request is made to the server.</li>
	</ul>
	<p class="notes">Saving is <strong>enabled</strong> for this demo</p>
    <ntb:grid id="PagingGrid2" 
	  width="630"
	  height="210"
	  mode="standard"
	  rowsperpage="6"
	  gethandler="get"
	  savehandler="save"
	  toolbarenabled="true"
	  toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	  componentcssurl="../../../common/style/nitobi.grid.css"
	  componentjsurl="../../../common/script/nitobi.grid.js">
	</ntb:grid>
</body>
</html>