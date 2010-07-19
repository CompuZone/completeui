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

</head>
<body>
<div id="maincontent">
    <p>A basic tabstrip</p>
    <f:view>
        <n:tabstrip id="basicTab" autoInitialize="true" width="800px" height="600px">
            <n:tabs align="left" overlap="10" activateEffect="fade" height="">
                <n:tab width="600" label="Tabstrip Details" tooltip="Click here to see the details." source="details"/>
                <n:tab width="600" label="Source Code" tooltip="Click here to see the source." source="codesnippets"/>
            </n:tabs>
        </n:tabstrip>
    </f:view>
</div>

<div id="details">
    This is the details tab
</div>

<div id="codesnippets">
    This is the code.
</div>

</body>
</html>
