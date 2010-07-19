<%-- 
    Document   : calendarTest
    Created on : Dec 22, 2007, 10:30:07 AM
    Author     : eric
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@taglib prefix="n" uri="http://www.nitobi.com/jsf" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
    <title>JSP Page</title>
</head>
<body>
<div id="maincontent">
    <p>This example simply hides a calendar object inside a div and appears when you click the image.</p>

    <f:view>
        <n:datePicker id="mydatepicker"
                      autoInitialize="true"
                      theme="leopard"
                      minDate="today"
                      submitMask="yyyy-MMM-dd">
            <n:dateInput/>
            <n:calendar/> 
        </n:datePicker>
    </f:view>
</div>
</body>
</html>
