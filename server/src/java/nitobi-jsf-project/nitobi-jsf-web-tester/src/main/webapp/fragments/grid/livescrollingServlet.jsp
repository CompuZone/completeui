<%--
  User: eric
  Date: Apr 24, 2008
  Time: 9:18:56 PM
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@taglib prefix="n" uri="http://www.nitobi.com/jsf" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head><title>Remote Live Scrolling</title>
		<link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/></head>
  <body>
    <f:view>
    	<div id="maincontent">
        <h2>Livescrolling Grid - Servlet Based</h2>
        <p>This is fed by the exact same servlet we use in our traditional Java samples. Notice in the source
        code listing that you don't have to be concerned about paths (relative or static) to the servlet; just write the servlet just
        as you declared it in the web.xml and it will work just fine.</p>
        <n:grid id="livescrollingGrid_servlet"
                height="200"
                width="630"
                autoInitialize="true"
                mode="livescrolling"
                getHandler="servletGrid"
                saveHandler="servletGrid"
                toolbarEnabled="true"
                theme="nitobi">

        </n:grid>
        </div>
    </f:view>
  </body>
</html>