<%--
  User: Eric Buitenhuis
  Date: Apr 29, 2008
  Time: 10:32:38 PM
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@ taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<html>
<head>
    <title>Simple jsp page</title>
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
    <style type="text/css">
        .favorite {
            color: blue;
            background-color: beige;
        }
    </style>
</head>
<body>
<div id="maincontent">
    <f:view>
        <p>This tree is fed by a standard servlet, which in turn gets its data from the database. Each time you open a
            node, a new request hits the server and gets the appropriate child nodes.</p>
        <n:tree id="servletTree"
                expanded="false"
                autoinitialize="true"
                getHandler="treeServlet"
                cssClass="documents"/>


    </f:view>
</div>
</body>
</html>