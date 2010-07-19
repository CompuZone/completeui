<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@ taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Nitobi JSF Component Explorer</title>
<link type="text/css" rel="stylesheet" href="style/layout-noframes.css">

<script type="text/javascript">

function selectDemo(demoUrl, demoName) {
	document.getElementById('subtitle').innerHTML = demoName;
	document.getElementById('exampleHolder').src = demoUrl;
	
	
//	var hr = new nitobi.ajax.HttpRequest();
//	hr.handler = demoUrl;
//	hr.onGetComplete.subscribe(loadMain);
//	hr.get();
}

function loadMain(data) {
	if(data.status == 404) {
		$('errors').innerHTML = "The page  '" + data.statusText + "' could not be found.";
	} else {
		$('main').innerHTML=data.response;
	}
}

</script>
</head>
<body>
<f:view>
	<div id="container">
		<div id="top">
			<div id="rocks"/>
			<div id="header">
				<div id="logo"/>
				<div id="title">Nitobi JSF Component Explorer</div>
			</div>
		</div>
		<div id="bottom">
			<div id="left">
                <n:tree id="navigationTree" expanded="false"
					autoinitialize="true" rootEnabled="false" theme="folders">
					<n:children>
						<n:node label="ComboBox">
							<n:children>
								<n:node label="Basic" onSelect="selectDemo('fragments/combo/basic.jsp','Basic Combo Example');"/>
								<n:node label="JSF Form" onSelect="selectDemo('fragments/combo/jsfForm.jsp','JSF Form Example');"/>
							</n:children>
						</n:node>
						<n:node label="Callout">
							<n:children>
								<n:node label="Hints"  onSelect="selectDemo('fragments/callout/hints.jsp','Callout Hints Example');"/>
								<n:node label="JSF Messaging Callout"  onSelect="selectDemo('fragments/callout/jsfMessaging.jsp','Using Callouts for JSF Messages');"/>
								<n:node label="Callout"  onSelect="selectDemo('fragments/callout/callout.jsp','Basic Callout Example');"/>
							</n:children>
						</n:node>
						<n:node label="Grid">
							<n:children>
								<n:node label="Static Data" onSelect="selectDemo('fragments/grid/local_livescrolling.jsp','Basic Static Grid');" />
								<n:node label="Livescrolling Servlet" onSelect="selectDemo('fragments/grid/livescrollingServlet.jsp','Livescrolling Servlet Grid');" />
								<n:node label="Livescrolling Listener" onSelect="selectDemo('fragments/grid/livescrolling.jsp','Livescrolling Listener Grid (NEW!)');" />
								<n:node label="Editor Types" onSelect="selectDemo('fragments/grid/editors.jsp','Grid Editors');" />
								<n:node label="Tree Grid" onSelect="selectDemo('fragments/grid/treegrid.jsp','Tree Grid');" />
							</n:children>
						</n:node>
						<n:node label="Tree">
							<n:children>
								<n:node label="Static" onSelect="selectDemo('fragments/tree/staticTree.jsp','Static Tree');" />
								<n:node label="Servlet Based" onSelect="selectDemo('fragments/tree/serverBackedTree.jsp','Servlet Backed');" />
							</n:children>
						</n:node>
						<n:node label="Calendar" >
							<n:children>
								<n:node label="Form" onSelect="selectDemo('fragments/calendar/form.jsp','Calendar Form Example');"/>
							</n:children>
						</n:node>
						<n:node label="Fisheye" >
							<n:children>
								<n:node label="Fisheye Example" onSelect="selectDemo('fragments/fisheye/fisheye.jsp','Fisheye Example');"/>
							</n:children>
						</n:node>
						<n:node label="Spotlight" >
							<n:children>
								<n:node label="Spotlight Example" onSelect="selectDemo('fragments/spotlight/spotlight.jsp','Spotlight Example');"/>
							</n:children>
						</n:node>
						<n:node label="Tabstrip" >
							<n:children>
								<n:node label="Tabstrip Example" onSelect="selectDemo('fragments/tabstrip/basic.jsp','Tabstrip');"/>
							</n:children>
						</n:node>
					</n:children>
				</n:tree>
            </div>
			<div id="right">
				<div id="subtitle">Nitobi JSF Components Overview</div>
				<div id="errors" style="color:red"></div>
				<div id="main"></div>
				<iframe id="exampleHolder" style="border:none; width:95%; height:679px;" src="intro.jsp"></iframe>
			</div>
		</div>
	</div>
</f:view>
</body>
</html>