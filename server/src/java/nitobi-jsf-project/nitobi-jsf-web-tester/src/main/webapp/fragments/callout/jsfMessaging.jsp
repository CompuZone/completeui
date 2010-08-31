<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@ taglib prefix="h" uri="http://java.sun.com/jsf/html"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>JSF Messaging</title>       
		<link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
</head>
<body>
	<f:view>
		<div id="maincontent">
			<p>Here is an example of the callout utilizing the JSF
			FacesMessage. If you include an attachToElement, it will output only
			the messages related to that element, like saying &lt;h:message
			for="myInput"/&gt; (the element must be a JSF component id or nothing
			will happen). If attachToElement is blank, it will output all messages
			for the page. If there are no messages, the component will not render
			at all.</p>
			
			<p>For this example, press the Submit button without entering anything in the field. Then
			try the same thing with something in there.</p>
			
			<div style="margin:100px;">
				<h:form id="myForm">
					<h:outputLabel for="myInput">Name</h:outputLabel>
					<h:inputText id="myInput" required="true" />
					<n:callout displayJSFMessage="true" theme="" direction="4" attachToElement="myForm:myInput" />
					<h:commandButton type="submit" value="Submit" />
				</h:form>
			</div>
		</div>
	</f:view>
</body>
</html>