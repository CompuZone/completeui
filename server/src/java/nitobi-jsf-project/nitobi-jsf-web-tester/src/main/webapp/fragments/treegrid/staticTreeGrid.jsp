<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@taglib prefix="n" uri="http://www.nitobi.com/jsf" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
    <style type="text/css"><!--
    .syntax0 {
        color: #000000;
    }

    .syntax1 {
        color: #cc0000;
    }

    .syntax2 {
        color: #ff8400;
    }

    .syntax3 {
        color: #6600cc;
    }

    .syntax4 {
        color: #cc6600;
    }

    .syntax5 {
        color: #ff0000;
    }

    .syntax6 {
        color: #9966ff;
    }

    .syntax7 {
        background: #ffffcc;
        color: #ff0066;
    }

    .syntax8 {
        color: #006699;
        font-weight: bold;
    }

    .syntax9 {
        color: #009966;
        font-weight: bold;
    }

    .syntax10 {
        color: #0099ff;
        font-weight: bold;
    }

    .syntax11 {
        color: #66ccff;
        font-weight: bold;
    }

    .syntax12 {
        color: #02b902;
    }

    .syntax13 {
        color: #ff00cc;
    }

    .syntax14 {
        color: #cc00cc;
    }

    .syntax15 {
        color: #9900cc;
    }

    .syntax16 {
        color: #6600cc;
    }

    .syntax17 {
        color: #0000ff;
    }

    .syntax18 {
        color: #000000;
        font-weight: bold;
    }

    .gutter {
        background: #dbdbdb;
        color: #000000;
    }

    .gutterH {
        background: #dbdbdb;
        color: #990066;
    }

    --></style>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>JSF Tree Grid</title>
</head>
<body>
<f:view>
    <div id="maincontent">
        <h1>JSF Tree Grid</h1>

        <p>This Tree Grid has the top level set as static while the second layer of nodes are taken from a managed
            bean.</p>

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
    <div class="instructions">

<pre><span class="syntax0"><span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">treeGrid</span><span class="syntax17"> </span><span
        class="syntax17">id</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">TreeGrid</span><span class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">630</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">height</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">500</span><span
        class="syntax13">&quot;</span>
<span class="gutterH"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">mode</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">standard</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">rowsPerPage</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">5</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">getHandler</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">treeGridServlet</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">saveHandler</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">treeGridServlet</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">toolbarEnabled</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">true</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">rootColumns</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">customers</span><span
        class="syntax13">&quot;</span>
<span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">theme</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">vista</span><span
        class="syntax13">&quot;</span>
<span class=""> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">groupOffset</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">20</span><span
        class="syntax13">&quot;</span>
<span class=""> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span
        class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17"> </span><span class="syntax17">autoInitialize</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">true</span><span
        class="syntax13">&quot;</span><span class="syntax17">&gt;</span>
<span class=""> </span>            <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">columns</span><span class="syntax17"> </span><span
        class="syntax17">id</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">customers</span><span class="syntax13">&quot;</span><span class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">expandColumn</span><span class="syntax17"> </span><span
        class="syntax17">childColumnSet</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">orders</span><span class="syntax13">&quot;</span><span class="syntax17"> </span><span
        class="syntax17">width</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">50</span><span class="syntax13">&quot;</span><span class="syntax17">/</span><span
        class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Customer</span><span class="syntax13"> </span><span class="syntax13">Name</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">CustomerName</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">130</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Contact</span><span class="syntax13"> </span><span class="syntax13">Name</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">ContactName</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">130</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Email</span><span class="syntax13">&quot;</span><span class="syntax17"> </span><span
        class="syntax17">xmlDataField</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">ContactEmail</span><span class="syntax13">&quot;</span><span class="syntax17"> </span><span
        class="syntax17">width</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">150</span><span class="syntax13">&quot;</span><span class="syntax17">/</span><span
        class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Phone</span><span class="syntax13"> </span><span class="syntax13">Number</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">PhoneNumber</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>            <span class="syntax17">&lt;</span><span class="syntax17">/</span><span
        class="syntax17">n</span><span class="syntax18">:</span><span class="syntax6">columns</span><span
        class="syntax17">&gt;</span>
<span class=""> </span>            <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">columns</span><span class="syntax17"> </span><span
        class="syntax17">id</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">orders</span><span class="syntax13">&quot;</span><span class="syntax17"> </span><span
        class="syntax17">getHandler</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">#</span><span class="syntax13">{</span><span class="syntax13">orders</span><span
        class="syntax13">.</span><span class="syntax13">getOrders</span><span class="syntax13">}</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">saveHandler</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">#</span><span
        class="syntax13">{</span><span class="syntax13">orders</span><span class="syntax13">.</span><span
        class="syntax13">saveOrders</span><span class="syntax13">}</span><span class="syntax13">&quot;</span><span
        class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Order</span><span class="syntax13"> </span><span class="syntax13">ID</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">editable</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">false</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">OrderID</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">100</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Product</span><span class="syntax13"> </span><span class="syntax13">Name</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">ProductName</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">200</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Order</span><span class="syntax13"> </span><span class="syntax13">Date</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">OrderDate</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">120</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>                <span class="syntax17">&lt;</span><span class="syntax17">n</span><span
        class="syntax18">:</span><span class="syntax6">textColumn</span><span class="syntax17"> </span><span
        class="syntax17">label</span><span class="syntax17">=</span><span class="syntax13">&quot;</span><span
        class="syntax13">Shipped</span><span class="syntax13"> </span><span class="syntax13">Date</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">xmlDataField</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">ShippedDate</span><span
        class="syntax13">&quot;</span><span class="syntax17"> </span><span class="syntax17">width</span><span
        class="syntax17">=</span><span class="syntax13">&quot;</span><span class="syntax13">120</span><span
        class="syntax13">&quot;</span><span class="syntax17">/</span><span class="syntax17">&gt;</span>
<span class=""> </span>            <span class="syntax17">&lt;</span><span class="syntax17">/</span><span
        class="syntax17">n</span><span class="syntax18">:</span><span class="syntax6">columns</span><span
        class="syntax17">&gt;</span>
<span class=""> </span>        <span class="syntax17">&lt;</span><span class="syntax17">/</span><span
        class="syntax17">n</span><span class="syntax18">:</span><span class="syntax6">treeGrid</span><span
        class="syntax17">&gt;</span>
</span></pre>

    </div>
</f:view>
</body>
</html>