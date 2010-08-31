<%--
  Created by IntelliJ IDEA.
  User: eric
  Date: Mar 28, 2008 
  Time: 6:11:04 AM
  To change this template use File | Settings | File Templates.
--%>   
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
            "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head><title>populateMethod Types</title>
		<link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/></head>
  <body>
    <f:view>
    <div id="maincontent">
        <p>The populateMethod attribute can take three possible values:</p>
        <ul class="instructions">
            <li>servlet - Using a standard servlet as declared in the web.xml.</li>
            <li>listener - Using a JSF phase listener, which will provide convenience methods for grabbing the GET parameters
            passed in the AJAX call.</li>
            <li>component - All data is populated from inside the managed bean using the JSF event system. <em>NOTE: Although the component mode works, it is not yet complete and may not be stable.</em></li>
        </ul>
        <table align=left style="background-image:url(background.jpg);" width="600" height="400" cellpadding=20>
            <tr>
                <td align=center valign=bottom>
                    <n:fisheye id="fisheyeOne" growPercent="200" autoInitialize="true" expandDirection="right" iconWidth="50" openDirection="up" theme="nitobi">
                        <n:menuItem imageSrc="icons/chat.png" label="Chat" onClick="alert('You just clicked the Chat icon');"/>
                        <n:menuItem imageSrc="icons/fer.png" label="Address Book" onClick="alert('You just clicked the Address Book icon');"/>
                        <n:menuItem imageSrc="icons/id.png" label="Draw" onClick="alert('You just clicked the Draw icon');"/>
                        <n:menuItem imageSrc="icons/info.png" label="More Information" onClick="alert('You just clicked the More Information icon');"/>
                        <n:menuItem imageSrc="icons/home.png" label="My Applications" onClick="alert('You just clicked the My Applications icon');"/>
                    </n:fisheye>
                </td>
            </tr>
        </table>
    </div>
    </f:view>
  </body>
</html>