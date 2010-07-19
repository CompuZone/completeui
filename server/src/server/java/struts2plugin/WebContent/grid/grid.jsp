<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<n:grid id="grid1" gethandler="gethandler.action" mode="standard"
		savehandler="savehandler.action"
		onhandlererrorevent="alert('server error occurred')"
		width="500"
		toolkitjsurl="../resources/nitobi/script/nitobi.toolkit.js"
		componentjsurl="../resources/nitobi/script/nitobi.grid.js"
		componentcssurl="../resources/nitobi/style/nitobi.grid.css"></n:grid>
</body>
</html>