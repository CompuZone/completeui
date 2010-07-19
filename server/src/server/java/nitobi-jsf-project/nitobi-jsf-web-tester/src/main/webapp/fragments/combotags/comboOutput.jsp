<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head><title>All Attributes</title>
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
</head>
<body>
<f:view>
    <div id="maincontent">
        <h1>All Attributes</h1>

        <p>This test page prints out all possible combo attributes. It will not work, since the values are not valid.
            Check the source code to see that all attributes our printed properly. Autoinitialize is set to false.</p>

        <n:combo id="managedBeanCombo"
                 cssClassName="CSSCLASSNAME"
                 dataTextField="DATATEXTFIELD"
                 dataValueField="DATAFIELDVALUE"
                 disabledWarningMessages="DISABLEDWARNINGMESSAGE"
                 enabled="true"
                 errorLevel="EBAERRORLEVEL_LEVEL_DEBUG"
                 height="HEIGHT"
                 httpRequestMethod="HTTP_REQUEST_METHOD"
                 listZIndex="1"
                 onBeforeSelectEvent="ON_BEFORE_SELECT_EVENT"
                 onBlurEvent="ON_BLUR_EVENT"
                 onFocusEvent="ON_FOCUS_EVENT"
                 onLoadEvent="ON_LOAD_EVENT"
                 onSelectEvent="ON_SELECT_EVENT"
                 onTabEvent="ON_TAB_EVENT"
                 smartListSeparator="SMART_LEST_SEPARATOR"
                 theme="THEME"
                 tabIndex="TAB_INDEX"
                 value="VALUE"
                 width="WIDTH"
                 mode="MODE"
                 initialSearch="INITIAL_SEARCH"
                 autoInitialize="false">

        </n:combo>


    </div>
</f:view>
</body>
</html>