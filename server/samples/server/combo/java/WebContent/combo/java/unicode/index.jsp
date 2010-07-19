<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Unicode</title>

<script type="text/javascript">
	function ShowDetails()
	{
		// need to execute form value assignments in a separate thread
		// (i.e. setTimeout()) or else form value assignments will not
		// render
		window.setTimeout("Populate();",0);
	}

	function Populate()
	{

		var combo    = document.getElementById("comboFlags").object;
		var myValues = combo.GetSelectedRowValues();
		var myCountryCode = myValues[0];
		var myCountryFlag = myValues[1];
		var myCountryNameUTF8 = myValues[2];

		//clear the details
		document.getElementById("CountryCode").innerHTML  	= "";
		document.getElementById("CountryName").innerHTML 	= "";

		document.getElementById("CountryName").innerHTML = myCountryNameUTF8;
		document.getElementById("CountryCode").innerHTML = "www.google."+ myCountryCode;

		document.getElementById("flagImage").innerHTML = '<img src="http://www.google.ca/'+
			myCountryFlag +
			'" border="0" >';

	}
</script>
</head>
<body>
<p class="intro">This sample illustrates the use of the Classic Search 
Mode with Unicode strings.<br/>
In this demo the <strong>GetFieldFromActiveRow</strong> method is being 
used with the <strong>OnAfterSearch</strong> event to populate a 
'details' area with the data for that record.</p>

<ul class="instructions">
	<li>Put your cursor in the text box and start typing.</li>
</ul>

<ntb:combo id="comboFlags" mode="classic" onselectevent="ShowDetails()"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="160" datafieldindex="2"></ntb:combotextbox>
  	<!-- A list which allows paging and search. The datasource is a separate.jsp file. -->
  	<ntb:combolist width ="260px"
				 height="205px"
				 datasourceurl="get"
				 pagesize="95">
    	<ntb:combocolumndefinition width="100px" datafieldindex="2"></ntb:combocolumndefinition>
  	</ntb:combolist>
</ntb:combo>
<p>Country Details:</p>
<table style="padding-top:0px; padding-right:5px; padding-bottom:5px; padding-left: 5px;">
  <tr align=center>
    <td style="padding:0px;"><div id="Container"  style="width: 202px; height: 125px; border: 1px solid #CCCCCC; padding-top:10px; padding-right:5px; padding-bottom:5px; padding-left: 5px;">
        <div id="CountryName" style="font-family: arial, verdana; font-size: 24px; padding-top:10px">Country&nbsp;Name</div>
        <div id="flagImage"></div>
        <div id="CountryCode" ></div>
      </div></td>
    <td width="95%">&nbsp;</td>
  </tr>
</table>
</body>
</html>