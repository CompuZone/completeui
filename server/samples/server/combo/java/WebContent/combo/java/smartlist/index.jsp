<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>SmartList</title>
</head>
<body>
<p class="intro">This sample illustrates the search mode 'SmartList' 
(with <em>Intelligent Autocomplete</em>) which allows the developer 
to assist the formation of data driven lists in a text-area.</p>
<ul class="instructions">
	<li>Put your cursor in the &quot;To:&quot; field and start typing.</li>
	<li>The listbox will contain selections from the database based on 
	your search string and the <em>order of priority</em> (in this case, 
	the frequency of emails for that contact). </li>
	<li>Select a contact and press enter. Notice you may perform 
	multiple searches and add multiple records to the text area.</li>
</ul>
<p class="notes">(hint: try typing 'jacob', 'pope', or 'moon')</p>
<div style="background-image: url(mailbackground.png);background-position: top left; background-repeat: no-repeat; padding-top:3px; padding-left: 59px; height: 322px; width:568px;">
<ntb:combo id="cmbEmail" mode="smartlist"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="505" height="50" datafieldindex="0"></ntb:combotextbox>
	<!-- A list which allows paging and search. The datasource is a separate asp file. -->
	<ntb:combolist width="400px" datasourceurl="get" pagesize="10"
			backgroundhighlightcolor="#C4E4FF" 
			foregroundhighlightcolor="#0000CC">
		<ntb:combocolumndefinition width="100%" datafieldindex="0" textcolor="#0000CC"></ntb:combocolumndefinition>
	</ntb:combolist>
</ntb:combo>
</div>
</body>
</html>