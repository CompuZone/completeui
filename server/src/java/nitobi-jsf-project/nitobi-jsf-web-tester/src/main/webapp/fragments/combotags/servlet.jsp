<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head><title>Combo Box Servlet Sample</title>
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
</head>
<body>
    <div id="maincontent">
        <h1>Combo Box Servlet Sample</h1>
        <p>
            This Combo Box takes its data from a traditional Servlet. For this type of data,
            you can use the same Servlet code style as is demonstrated in the other Nitobi
            JSP samples. If you are migrating your application, you can still use your old
            Servlets with the Nitobi JSF components.
        </p>
        <f:view>
            <h:outputLabel for="managedBeanCombo" value="Servlet based combo: "/>
            <n:combo id="managedBeanCombo" theme="flex" mode="classic" initialSearch="James" autoInitialize="true">
                <n:comboTextBox dataFieldIndex="0" width="175px"/>
                <n:comboList width="360px" height="200px" pageSize="15" datasourceUrl="servletComboGet">
                    <n:comboColumnDefinition width="130px" dataFieldIndex="0"/>
                    <n:comboColumnDefinition width="200px" dataFieldIndex="1"/>
                </n:comboList>
            </n:combo>
        </f:view>
        <div class="instructions">
            <h3>JSP Code</h3>
            <code>
                <%
                    out.println(
                            "&lt;h:outputLabel for=\"managedBeanCombo\" value=\"Servlet based combo: \"/&gt;<br/>" +
                            "&lt;n:combo id=\"managedBeanCombo\" theme=\"flex\" mode=\"classic\" initialSearch=\"James\" autoInitialize=\"true\"&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboTextBox dataFieldIndex=\"0\" width=\"175px\"/&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboList width=\"360px\" height=\"200px\" pageSize=\"15\" datasourceUrl=\"servletComboGet\"&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboColumnDefinition width=\"130px\" dataFieldIndex=\"0\"/&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboColumnDefinition width=\"200px\" dataFieldIndex=\"1\"/&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;/n:comboList&gt;<br/>" +
                            "&lt;/n:combo&gt"
                    );
                %>
            </code>
        </div>

    </div>
</body>
</html>