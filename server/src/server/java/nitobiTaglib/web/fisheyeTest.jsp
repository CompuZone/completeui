<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

</head>
<body>
<n:fisheye id="fisheye1" growpercent="200" opendirection="down" expanddirection="right" iconwidth="50">
	<n:menuitem imagesrc="resources/images/file_new.png" 	 label="New File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_edit.png"  	 label="Edit File" 	onclick="alert('test');"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_explore.png" label="Search File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_export.png"  label="Export File"></n:menuitem>

	<n:menuitem imagesrc="resources/images/file_del.png"  	 label="Delete File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_attention.png" label="Flag File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file.png" 		 label="New Sheet"></n:menuitem>
	<n:menuitem imagesrc="resources/images/cut.png"  		 label="Cut"></n:menuitem>
	<n:menuitem imagesrc="resources/images/info.png"  		 label="Information"></n:menuitem>
</n:fisheye>

<n:fisheye id="fisheye2" growpercent="200" opendirection="down" expanddirection="right" iconwidth="50">
	<n:menuitem imagesrc="resources/images/file_new.png" 	 label="New File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_edit.png"  	 label="Edit File" 	onclick="alert('test');"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_explore.png" label="Search File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_export.png"  label="Export File"></n:menuitem>

	<n:menuitem imagesrc="resources/images/file_del.png"  	 label="Delete File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file_attention.png" label="Flag File"></n:menuitem>
	<n:menuitem imagesrc="resources/images/file.png" 		 label="New Sheet"></n:menuitem>
	<n:menuitem imagesrc="resources/images/cut.png"  		 label="Cut"></n:menuitem>
	<n:menuitem imagesrc="resources/images/info.png"  		 label="Information"></n:menuitem>
</n:fisheye>
</body>
</html>