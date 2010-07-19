<%--
  User: Eric Buitenhuis
  Date: Apr 29, 2008
  Time: 5:21:58 PM
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
            color:blue;
            background-color:beige;
        }
    </style>
</head>
<body>
<div id="maincontent">
<f:view>
    <n:tree id="test" expanded="false" autoinitialize="true" rootEnabled="false" cssClass="documents" cssStyle="width:200px;height:350px;border:1px solid silver;">
        <n:children>
            <n:node label="Trucks"/>
            <n:node label="Cars">
                <n:children>
                    <n:node label="Chrysler"/>
                    <n:node label="Chevy">
                        <n:children>
                            <n:node label="Malibu"/>
                            <n:node label="Lumina"/>
                        </n:children>
                    </n:node>
                    <n:node label="Ford">
                        <n:children>
                            <n:node label="Mustang"/>
                            <n:node label="Escort"/>
                            <n:node label="Taurus"/>
                        </n:children>
                    </n:node>
                </n:children>
            </n:node>
        </n:children>
    </n:tree>
</f:view>
</div>
</body>
</html>