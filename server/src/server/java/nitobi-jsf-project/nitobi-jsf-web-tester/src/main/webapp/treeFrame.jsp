<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@ taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Nitobi JSF Example Listing</title>
    <script type="text/javascript" src="script/navigationTree.js"></script>
    <link type="text/css" rel="stylesheet" href="style/common.css"/>
</head>
<body>
<f:view>
    <n:tree id="navigationTree"
            expanded="false"
            targetFrame="contentFrame"
            autoinitialize="true"
            rootEnabled="false"
            theme="folders">
        <n:children>
            <n:node label="ComboBox">
                <n:children>
                    <n:node label="Bean" url="fragments/combotags/bean.faces"/>
                    <n:node label="Servlet" url="fragments/combotags/servlet.faces"/>
                    <n:node label="JSF Form" url="fragments/combotags/form.faces"/>
                </n:children>
            </n:node>
            <n:node label="Callout">
                <n:children>
                    <n:node label="Hints" url="fragments/callout/hints.faces"/>
                    <n:node label="JSF Messaging Callout" url="fragments/callout/jsfMessaging.faces"/>
                </n:children>
            </n:node>
            <n:node label="Grid">
                <n:children>
                    <n:node label="Static Data" url="fragments/grid/local_livescrolling.faces"/>
                    <n:node label="Livescrolling Servlet" url="fragments/grid/livescrollingServlet.faces"/>
                    <n:node label="Livescrolling Managed Bean" url="fragments/grid/livescrolling.faces"/>
                    <n:node label="Editor Types" url="fragments/grid/editors.faces"/>
                </n:children>
            </n:node>
            <n:node label="Tree Grid">
                <n:children>
                    <n:node label="Basic Tree Grid" url="fragments/treegrid/staticTreeGrid.faces"/>
                    
                </n:children>
            </n:node>
            <n:node label="Tree">
                <n:children>
                    <n:node label="Static" url="fragments/tree/staticTree.faces"/>
                    <n:node label="Servlet Based" url="fragments/tree/servletBackedTree.faces"/>
                    <n:node label="Bean Based" url="fragments/tree/beanBackedTree.faces"/>
                </n:children>
            </n:node>
            <n:node label="Calendar">
                <n:children>
                    <n:node label="Form" url="fragments/calendar/form.faces"/>
                </n:children>
            </n:node>
            <n:node label="Fisheye">
                <n:children>
                    <n:node label="Fisheye Example" url="fragments/fisheye/fisheye.faces"/>
                </n:children>
            </n:node>
            <n:node label="Spotlight">
                <n:children>
                    <n:node label="Spotlight Example" url="fragments/spotlight/spotlight.faces"/>
                </n:children>
            </n:node>
            <n:node label="Tabstrip">
                <n:children>
                    <n:node label="Tabstrip Example" url="fragments/tabstrip/basic.faces"/>
                </n:children>
            </n:node>
        </n:children>
    </n:tree>

</f:view>
</body>
</html>