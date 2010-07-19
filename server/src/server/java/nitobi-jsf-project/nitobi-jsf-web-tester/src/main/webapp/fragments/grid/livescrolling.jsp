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
        <h2>Livescrolling Grid - Managed Bean</h2>
        <p>The content of this grid is the exact same as the Livescrolling Servlet page, except the content
        of this grid is obtained from a user-created managed bean. Using managed beans, you can take advantage
        of scoping capabilities AND have the convenience of setting up a page->backing-bean paradigm.</p>
        
        <n:grid id="livescrollingGrid_listener"
                getHandler="#{livescrollingBean.handleGet}"
                saveHandler="#{livescrollingBean.handleSave}"
                height="200"
                width="630"
                autoInitialize="true"
                mode="livescrolling"
                toolbarEnabled="true"
                theme="nitobi">
            <n:columns>
                <n:textColumn xmlDataField="ContactName" label="Name"/>
                    
                <n:textColumn xmlDataField="JobTitle" label="Job" width="250" editable="false" />
                <n:textColumn xmlDataField="PhoneNumber" label="Phone Number"/>
                <n:textColumn xmlDataField="Address" label="Address" width="400"/>
                <n:textColumn xmlDataField="Country" label="Country" align="right"/>
            </n:columns>
        </n:grid>
		</div>
    </f:view>
  </body>
</html>