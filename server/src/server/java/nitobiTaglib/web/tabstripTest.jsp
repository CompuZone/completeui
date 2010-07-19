<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tabstrip test</title>

</head>
<body>


<div id="domTarget1">
<h1>Loaded from a div on page!</h1>
</div>
<n:tabstrip id="tabstrip1" width="800px" height="400px">
	<n:tabs overlap="30">
		<n:tab label="Yahoo" source="http://www.yahoo.ca" containertype="iframe" width="300px"></n:tab>
		<n:tab label="Google" source="http://www.google.ca" containertype="iframe" loadondemandenabled="true" width="320px"></n:tab>
		<n:tab label="DOM" source="domTarget" width="200px"></n:tab>
	</n:tabs>
</n:tabstrip>
<div id="domTarget">
<h1>Loaded from a div on page!</h1>
</div>

<n:tabstrip id="tabstrip2" width="800px" height="400px">
	<n:tabs overlap="30">
		<n:tab label="Yahoo" source="http://www.yahoo.ca" containertype="iframe" width="300px"></n:tab>
		<n:tab label="Google" source="http://www.google.ca" containertype="iframe" loadondemandenabled="true" width="320px"></n:tab>
		
	</n:tabs>
</n:tabstrip>
</body>
</html>