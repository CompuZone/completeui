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
        <button id="startButton">Press to Start</button>
        <div id="uselessarea" style="width:100; float:right; background-color:blue; color:white;">This is a useless div just to have something to point at.</div>
        <div id="formArea" style="margin:50px; background-color:silver; height:200px; width:300px;" >
            <p>JSF FORM</p>
            <h:form id="jsfform">
                <h:outputLabel id="nameLabel" for="nameField" value="Name:"/> <h:inputText id="nameField"/><br/>
                <h:commandButton type="submit" value="Submit"/>
            </h:form>
        </div>
        <div id="formArea" style="margin:50px; background-color:beige; height:200px; width:300px;" >
            <p>NON-JSF FORM</p>
            <form id="plainform">
                <Label for="nameField2">Name:</Label> <input type="text"id="nameField2"/><br/>
                <input id="submitbutton" type="submit"/>
            </form>
        </div>

        <script type="text/javascript">
            function codeStepTest() {
                alert('code step works!');
            }
        </script>

        <n:spotlight startingObject="startButton" startingEvent="click" allowScrolling="false" precache="false" lensOversize=".3" lensType="BURST" stylesheet="peanut_exclam" thisEffect="GREYSWIPE">
            <n:calloutStep elementId="uselessarea" stepTitle="Useless" stepBody="This area serves no purpose other than to be pointed at."/>
            <n:calloutStep stepTitle="" stepBody="Your first step is to write your name. Select the name field and begin typing."/>
            <n:formHelperStep formId="plainform" fieldId="nameField2" action="TYPETEXT" text="Joe Snuffy" setFocus="true" delayAfter="5000"/>
            <n:formHelperStep formId="jsfform" fieldId="nameField" action="TYPETEXT" text="Joe Snuffy" setFocus="true" delayAfter="5000"/>
            <n:calloutStep stepTitle="Complete" stepBody="Your first line is complete"/>
            <n:focusStep elementId="uselessarea" delayAfter="3000"/>
            <n:calloutStep stepTitle="Repeat Instructions" stepBody="To repeat this tour, press the start button again."/>
            <n:mouseStep action="CLICKONOBJECT" target="startButton" delayAfter="3000"/>
            <n:codeStep code="alert('hello world')" />
        </n:spotlight>
    </div>
                 
    </f:view>


  </body>
</html>