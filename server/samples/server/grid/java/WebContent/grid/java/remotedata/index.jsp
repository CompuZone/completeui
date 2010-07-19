<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>

<title>Nitobi Grid Demos - Remote Data</title>
</head>
<body>
<p class="intro">Nitobi Grid uses <code>XMLHttpRequest</code>s to load and save data to a database. 
	An API is provided to format data according to the Nitobi XML schema on a variety of platforms 
	including Java, PHP, Classic ASP, and Coldfusion.</p>
	<ul class="instructions">
		<li class="heading">A grid's server resources:</li>
		<li><code>gethandler</code> - As the page loads, the grid makes a call to its <code>getHandler</code> for its initial page of data.  Whenever the user requests more data (a paging event, or scrolling into unloaded rows) the <code>getHandler</code> is called again.</li>
		<li><code>savehandler</code> - When the user makes changes to the grid and clicks the <code>SAVE</code> button, the <code>saveHandler</code> is invoked and the grid's log of changes is posted to the server.</li>
		<li><code>keygenerator</code> - When a row is inserted, the <code>keyGenerator</code> is invoked to request a primary key for this new row.</li>
	</ul>
	<ntb:grid id="DataboundGrid" 	
		width="630"
		height="407"
		mode="livescrolling"	
		autosaveenabled="false"
		gethandler="get"
		savehandler="save"
		toolbarenabled="true"
		toolkitjsurl="../../../common/script/nitobi.toolkit.js"
		componentcssurl="../../../common/style/nitobi.grid.css"
		componentjsurl="../../../common/script/nitobi.grid.js">
	</ntb:grid>
</body>
</html>