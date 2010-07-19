<%--
  User: Eric Buitenhuis
  Date: Mar 28, 2008 
  Time: 6:11:04 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@ taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
            "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head><title>Hints Example</title>       
		<link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/></head>
  <body>
  	<div id="maincontent">
        <p>Move your mouse over the buttons to see the hints.</p>
		<div style="margin-left:200px;margin-top:100px;">
	        <button id="thebutton">The Button</button>
	        <button id="theOtherButton">The Other Button</button>
	    </div>
    <f:view>
        <n:hints expireTimeout="5000" timerLength="1000" >
            <n:hint objId="thebutton" text="This is the text." title="The Title"/>
            <n:hint objId="theOtherButton" text="This is the other text." title="The Other Title"/>
        </n:hints>
    </f:view>
    </div>

  </body>
</html>