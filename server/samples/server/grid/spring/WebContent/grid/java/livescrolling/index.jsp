<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<title>Spring Grid Demo</title>

</head>
<body>
<p class="intro">From the client side, there is not much difference between using Grid
      (or any other databound Nitobi component) in a Spring environment and using it in
      a plain servlet environment.  You include the declaration
      as normal and for the gethandler and savehandler attributes, you simply supply the url
      that maps to the server side controller that will return xml back to the component.  In this
      example, we have a controller defined by the class GetHandlerController mapped to gethandler.htm.
      <br/>
      Have a look at the source files in examples.grid.spring.GetHandlerController.java to see
      how this happens.
</p>
      
    <ntb:grid id="LiveScrollingGrid2" 
				  width="630"
				  height="200"
				  mode="livescrolling"
				  gethandler="gethandler.htm"
				  savehandler="savehandler.htm"
				  toolbarenabled="true"
				  toolkitjsurl="../../../common/script/nitobi.toolkit.js"
				  componentcssurl="../../../common/style/nitobi.grid.css"
				  componentjsurl="../../../common/script/nitobi.grid.js">
		</ntb:grid>

</body>
</html>