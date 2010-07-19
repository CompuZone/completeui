<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tree Test</title>

</head>
<body>
<n:tree id="tree1" cssclass="folders" hoverhighlight="true" expanded="false">
	<n:children>
		<n:node label="Oh yeah baby!" nodetype="leaf" onclick="alert('oh yeah baby')" onselect="alert('something was selected')"></n:node>
		<n:node label="Carcassone">
			<n:children>
				<n:node label="Hunters and Gatherers"></n:node>
				<n:node label="Original Carcassone"></n:node>
			</n:children>
		</n:node>
	</n:children>
</n:tree>
<div style="margin-top:25px">
<n:tree id="tree2" cssclass="folders" hoverhighlight="true">
	<n:children>
		<n:node label="Tree no. 2"></n:node>
		<n:node label="Magic: The Gathering">
			<n:children>
				<n:node label="4th Edition"></n:node>
				<n:node label="Ice Age"></n:node>
			</n:children>
		</n:node>
		<n:node label="Wii"></n:node>
		<n:node label="PS3"></n:node>
	</n:children>
</n:tree>
</div>

<n:tree id="tree3" cssclass="folders" hoverhighlight="true">
	<n:children>
		<n:node label="Childless node"></n:node>
		<n:node label="This node has children">

			<n:children>
				<n:node label="Child 1"></n:node>
				<n:node label="Child2 "></n:node>
			</n:children>
		</n:node>
	</n:children>
</n:tree>


</body>
</html>