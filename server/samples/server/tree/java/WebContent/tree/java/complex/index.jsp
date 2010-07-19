<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Complex</title>
</head>
<body>
<p class="intro">
In this sample we use a pre-populated tree with a single gethandler.  The gethandler uses two pieces of metadata 
we've attached to each node. The @type attribute describes what kind of node it is: continent, region, country, 
district, or city.  The @key attribute acts as a key for looking up the node's children in the database. When the 
page loads only the first level of nodes, those pre-populated in the declaration, are displayed.
</p>
<ul class="instructions">
<li>We use the @key attribute rather than the @id attribute to store the node's database lookup key because in this 
particular dataset the keys are not guaranteed to be unique.  For example, 'Antarctica' serves as the name for a 
continent, region, and country.</li>  
<li>Check out the gethandler's source code for a look at how we pulled data out of two
separate tables to populate the tree.</li>
</ul>
<br />
<ntb:tree id="tree1" cssclass="folders" gethandler="get"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.tree.css"
	componentjsurl="../../../common/script/nitobi.tree.js">
	<ntb:children>
		<ntb:node keyvalue="Africa" label="Africa" type="continent" nodetype="node" haschildren="true"></ntb:node>
		<ntb:node keyvalue="Antarctica" label="Antarctica" type="continent" nodetype="node" haschildren="true"></ntb:node>
		<ntb:node keyvalue="Asia" label="Asia" type="continent" nodetype="node" haschildren="true"></ntb:node>
		<ntb:node keyvalue="Europe" label="Europe" type="continent" nodetype="node" haschildren="true"></ntb:node>
		<ntb:node keyvalue="North America" label="North America" type="continent" nodetype="node" haschildren="true"></ntb:node>
		<ntb:node keyvalue="Oceania" label="Oceana" type="continent"nodetype="node" haschildren="true"></ntb:node>
		<ntb:node keyvalue="South America" label="South America" type="continent" nodetype="node" haschildren="true"></ntb:node>
	</ntb:children>
</ntb:tree>
</body>
</html>