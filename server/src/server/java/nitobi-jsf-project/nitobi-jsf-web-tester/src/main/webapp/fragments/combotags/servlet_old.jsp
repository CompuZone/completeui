<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@ taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Insert title here</title>
</head>
<body>
<f:view>
    <n:combo id="citiesCombo" autoInitialize="true" mode="classic">
        <n:comboTextBox dataFieldIndex="1" width="175px"/>
        <n:comboList datasourceUrl="#{livescrollingBean.doFoo}">
            <n:comboColumnDefinition width="130px" dataFieldIndex="0"/>
            <n:comboColumnDefinition width="200px" dataFieldIndex="1"/>
        </n:comboList>
    </n:combo>
</f:view>
</body>
</html>