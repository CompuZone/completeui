<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Unbound</title>
</head>
<body>
<p class="intro">This demo shows a basic unbound combobox. The buttons at 
the bottom make modifications to the list data.<br/>
In Unbound mode, all the data for the list is contained inside the combo 
tag (much like an HTML select control). Type-ahead and autocompletion 
are utilized to enhance search capabilities.</p>
<ul class="instructions">
	<li>Put your cursor in the text box and start typing.</li> 
</ul>

<ntb:combo id="mycombo" mode="unbound" 
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox  datafieldindex="0" ></ntb:combotextbox>
  	<ntb:combolist width="200px" allowpaging="false" height="180px" >
    	<ntb:combocolumndefinition width="100px" datafieldindex="0"></ntb:combocolumndefinition>
    	<ntb:combocolumndefinition width="70px" datafieldindex="1"></ntb:combocolumndefinition>
  	</ntb:combolist>
  	<ntb:combovalues fields="City|Population">
    	<ntb:combovalue data="{a:'Vancouver', b:'3,000,000'}" ></ntb:combovalue>
    	<ntb:combovalue data="{a:'Toronto', b:'4,500,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Ottawa', b:'1,000,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'California', b:'4,500,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Halifax', b:'900,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Calgary', b:'1,500,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Red Deer', b:'100,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Prince George', b:'200,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Portland', b:'1,500,000'}" ></ntb:combovalue>
	    <ntb:combovalue data="{a:'Atlanta', b:'4,500,000'}" ></ntb:combovalue>
	</ntb:combovalues>
</ntb:combo>
</body>
</html>