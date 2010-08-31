<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@taglib prefix="n" uri="http://www.nitobi.com/jsf" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <link type="text/css" rel="stylesheet" href="../../style/common.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Servlet Based Tree Grid</title>
</head>
<body>
<f:view>
    <div id="maincontent">
        <h1>Servlet Based Tree Grid</h1>
        <p></p>

        <n:treeGrid id="TreeGrid"
                    width="630"
                    height="500"
                    mode="standard"
                    rowsPerPage="5"
                    getHandler="treeGridServlet"
                    saveHandler="treeGridServlet"
                    toolbarEnabled="true"
                    rootColumns="customers"
                    theme="vista"
                    groupOffset="20"
                    autoInitialize="true">
            <n:columns id="customers">
                <n:expandColumn childColumnSet="orders" width="50"/>
                <n:textColumn label="Customer Name" xmlDataField="CustomerName" width="130"/>
                <n:textColumn label="Contact Name" xmlDataField="ContactName" width="130"/>
                <n:textColumn label="Email" xmlDataField="ContactEmail" width="150"/>
                <n:textColumn label="Phone Number" xmlDataField="PhoneNumber"/>
            </n:columns>
            <n:columns id="orders" getHandler="#{orders.getOrders}" saveHandler="#{orders.saveOrders}">
                <n:textColumn label="Order ID" editable="false" xmlDataField="OrderID" width="100"/>
                <n:textColumn label="Product Name" xmlDataField="ProductName" width="200"/>
                <n:textColumn label="Order Date" xmlDataField="OrderDate" width="120"/>
                <n:textColumn label="Shipped Date" xmlDataField="ShippedDate" width="120"/>
            </n:columns>
        </n:treeGrid>
    </div>
</f:view>
</body>
</html>