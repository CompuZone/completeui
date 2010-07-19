<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Simple</title>
</head>
<body>
<p class="intro">
In this sample we use a simple tree with a single gethandler.  When the page loads, the tree calls the gethandler
with only the tree ID as a parameter in the query string.  The gethandler returns the top level of nodes, those 
without a parent.  Attached to each node is metadata describing whether or not they have children.
</p>
<ul class="instructions">
<li>If the user attempts to expand a 
node whose metadata indicates has children and there are no children loaded, another call is made to the 
gethandler.</li>
<li>Calls to the gethandler are made with query string containing parameters for the tree's id, the node's id, and all other 
metadata associated with the node.</li> 
</ul>
<br />
<ntb:tree id="tree1" cssclass="folders" gethandler="get"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.tree.css"
	componentjsurl="../../../common/script/nitobi.tree.js">
</ntb:tree>

</body>
</html>