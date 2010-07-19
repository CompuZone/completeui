<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Compact</title>
<script type="text/javascript">
	function ShowTopCustomer(){
		// need to execute form value assignments in a separate thread
		// (i.e. setTimeout()) or else form value assignments won't
		// render
		window.setTimeout("PopulateBusinessCard();",0);
	}

	function PopulateBusinessCard()
	{
		var name = window.document.getElementById("ContactName");
		var email = window.document.getElementById("ContactEmail");
		var jobtitle = window.document.getElementById("JobTitle");
		var company = window.document.getElementById("CompanyName");
		var combo = window.document.getElementById("cmbCustomers").object;

		var vname = combo.GetFieldFromActiveRow("ContactName");
		if(vname!=null && name.innerHTML !=vname)
			name.innerHTML  = vname || "";
		var vemail = combo.GetFieldFromActiveRow("ContactEmail");
		if(vemail!=null && email.innerHTML !=vemail)
			email.innerHTML  = vemail || "";
		var vjobtitle = combo.GetFieldFromActiveRow("JobTitle");
		if(vjobtitle!=null && jobtitle.innerHTML !=vjobtitle)
			jobtitle.innerHTML  = vjobtitle || "";
		var vcompany = combo.GetFieldFromActiveRow("CompanyName");
		if(vcompany!=null && company.innerHTML !=vcompany)
			company.innerHTML  = vcompany || "";
	}
</script>
</head>
<body>
<p class="intro">This sample illustrates the use of the Compact Search Mode. 
In this mode, no dropdown will appear. All the same paging behaviors will occur 
and you can access all the events as you would in a normal combobox, but the 
only autocompletion happening is type-ahead.<br/>
</p>
<ul class="instructions">
	<li>Put your cursor in the text box and start typing.</li>
</ul>
<p class="notes">In this demo the <strong>GetFieldFromActiveRow</strong> method is being used with 
the <strong>OnAfterSearch</strong> event to populate a 'business card' area 
with the data for that record. </p>
<!-- The combo -->
<!-- Note the DataFieldIndex bindings on the textbox and list. These
		are references to the table columns index. -->
<ntb:combo id="cmbCustomers" mode="compact"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="250px" datafieldindex="0"></ntb:combotextbox>
	<ntb:combolist onaftersearchevent="ShowTopCustomer()" datasourceurl="get"></ntb:combolist>
</ntb:combo>

<h3>Customer Details:</h3>
<table style=" border: 1px solid #CCCCCC; width: 300px; height: 125px;" id="myBusinessCard">
  <tr>
    <td valign=top style="padding-top:10px; padding-right:10px; padding-bottom:10px; padding-left: 50px; background-image:url(resources/contacticong.gif); background-position:left top; background-repeat:no-repeat;">
    <div id="ContactName" style="font-family: arial, verdana; font-size: 24px;">Customer Name</div>
      <div id="JobTitle" style="font-family: arial, verdana; font-size: 14px;">Job Title</div>
      <div id="CompanyName" style="font-family: arial, verdana; font-size: 14px;">Company</div>
      <br>
      <div id="ContactEmail"></div></td>
  </tr>
</table>
</body>
</html>