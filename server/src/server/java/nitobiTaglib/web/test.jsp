<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Nitobi Taglib Test</title>

<style TYPE="text/css"> 

	a:link, a:visited { width:49px; height:49px; border:1px solid transparent; float:left;}
	a:hover { border:1px solid #FFFFFF;}

</style>
</head>
<body>
<p class="intro">Callout can be used to provide tooltip-like hints on any DOM object.</p>
	  <ul class="instructions">
	  	<li>Use your mouse to hover over the toolbar items below - wait 1 second to see the 'hint'.</li>
	  </ul>
	  <div style="background-image: url(resources/toolbar_back.png); background-repeat:no-repeat; width:410px; height:54px; padding-left:12px; padding-top: 2px;">
		  <a href="#"><img src="resources/blank.gif" border=0 id="left"></a>
		  <a href="#"><img src="resources/blank.gif" border=0 id="right"></a>
		  <a href="#"><img src="resources/blank.gif" border=0 id="refresh"></a>
		  <a href="#"><img src="resources/blank.gif" border=0 id="up"></a>
		  <a href="#"><img src="resources/blank.gif" border=0 id="down"></a>
		  <a href="#"><img src="resources/blank.gif" border=0 id="into"></a>
		  <a href="#"><img src="resources/blank.gif" border=0 id="cancel"></a>
	  </div>
	  
	  <n:hint target="left" title="Go Back" body="This will take you back a page"/>
		<n:hint target="right" title="Go Forward" body="Go forward a page in history"/>
		<n:hint target="refresh" title="Refresh Page" body="Refresh the page"/>
		<n:hint target="up" title="Move Up A Record"/>
		<n:hint target="down" title="Move Down A Record"/>
		<n:hint target="into" title="Step Into Function"/>
		<n:hint target="cancel" title="Cancel Action" body="Cancel current action"/>
		
</body>
</html>