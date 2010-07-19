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
<head>
    <title>Nitobi JSF Themes Example</title>
    <link type="text/css" rel="stylesheet" href="../../style/common.css"/>
</head>
<body>
<f:view>
    <div class="subtitle">Nitobi JSF Themes Example</div>
    <div id="maincontent">
        <p>Select a theme from the dropdown to change the look and feel of the example.</p>
        <div style="margin:20px">
        <h:form id="comboThemeForm">
            <h:outputLabel for="themeselector" value="Select Theme: "/>
            <h:selectOneListbox id="themeselector" label="Select Theme" size="1" value="#{calloutThemeBean.selectedTheme}" onchange="document.forms['comboThemeForm'].submit()">
                <f:selectItems value="#{availableCalloutThemesBean.themes}"/>
            </h:selectOneListbox>
        </h:form>
        </div>


        <n:tabstrip id="themesTabstrip" autoInitialize="true">
            <n:tabs align="left" overlap="10">
                <n:tab label="Example" source="example" scriptEvaluationEnabled="true"/>
                <n:tab label="JSP Source" source="jspSource"/>
            </n:tabs>
        </n:tabstrip>

    </div>
    <div style="display:none;">
        <div id="example" style="padding:50px">
            <button id="sourceButton">Click Here to Show Callout</button>
            <div id="theTarget"
                 style="margin-left: 300px; margin-bottom: 200px; width: 50px; height: 50px; background-color: tan">
                This is the target.
            </div>
            <n:callout id="myCallout" displayJSFMessage="false" triggerEvent="click"
                       triggerSourceDOM="sourceButton"  theme="xp"
                       attachToElement="theTarget" movetoX="100" movetoY="200" direction="1"
                       title="The Title" body="<ul><li>One</li><li>Two</li></ul>"/>
        </div>
        <div id="jspSource" style="padding:50px;">

            <pre>
<span class="s0">&lt;</span><span class="s1">n:callout </span><span
        class="s2">displayJSFMessage=</span><span class="s3">&quot;false&quot; </span><span class="s2">triggerEvent=</span><span
        class="s3">&quot;click&quot;</span>
    <span class="s2">triggerSourceDOM=</span><span class="s3">&quot;sourceButton&quot; </span><span
        class="s2">style=</span><span class="s3">&quot;</span><span class="s4">vista</span><span class="s3">&quot;</span>
    <span class="s2">attachToElement=</span><span class="s3">&quot;theTarget&quot; </span><span class="s2">movetoX=</span><span
        class="s3">&quot;100&quot; </span><span class="s2">movetoY=</span><span
        class="s3">&quot;200&quot; </span><span class="s2">direction=</span><span
        class="s3">&quot;1&quot;</span>
    <span class="s2">title=</span><span class="s3">&quot;The Title&quot; </span><span
        class="s2">body=</span><span class="s3">&quot;&lt;ul&gt;&lt;li&gt;One&lt;/li&gt;&lt;li&gt;Two&lt;/li&gt;&lt;/ul&gt;&quot; </span><span
        class="s0">/&gt;</span>
            </pre>
        </div>
    </div>
</f:view>
</body>
</html>