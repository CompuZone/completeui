<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>
<title>Linked Combos</title>

<script type="text/javascript">
	// Fires when the user clicks on the country combo.
	function cmbCountry_Select(){
		// Get the combo objects using their ids.
		provinceCombo = document.getElementById("cmbProvince").object;
		countryCombo = document.getElementById("cmbCountry").object;

		// Get the selected country id.
		var countryId = countryCombo.GetFieldFromActiveRow("CountryId");

		// Clear the list and any other selected values.
		provinceCombo.GetList().Clear();

		// Use a postback to get data from the datasource.
		provinceCombo.GetList().SetDatasourceUrl("detail?table=tblprovinces&whereClause=" + escape("CountryId=" + countryId) );
		provinceCombo.GetList().GetPage(0,0,"");

		provinceCombo.SetTextValue("[Select a province]");
	}
</script>
</head>
<body>
<p class="intro">This sample illustrates how to set up two combos that have a master-detail relationship.</p>
<ul class="instructions">
	<li>Select a value from the first combo</li>
	<li>Notice that the values in the second combo change based on your selection.</li>
</ul>

<!-- The country combo -->
<!-- Note the DataFieldIndex bindings on the textbox and list. These
are references to the table columns index. -->
<ntb:combo id="cmbCountry" onselectevent="cmbCountry_Select()" mode="classic"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	<ntb:combotextbox width="175px" datafieldindex="1"
		editable="false" value="[Select Value]"></ntb:combotextbox>
	<ntb:combolist width="250px" datasourceurl="master">
		<ntb:combocolumndefinition headerlabel="Country" width="100%" datafieldindex="1"></ntb:combocolumndefinition>
	</ntb:combolist>
</ntb:combo>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<!-- The province combo -->
<ntb:combo id="cmbProvince" mode="classic"
	toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	componentcssurl="../../../common/style/nitobi.combo.css"
	componentjsurl="../../../common/script/nitobi.combo.js">
	
	<ntb:combotextbox width="175px" datafieldindex="1" editable="false" value=""></ntb:combotextbox>
	<ntb:combolist width="250px" datasourceurl="detail">
		<ntb:combocolumndefinition headerlabel="Province" width="100%" datafieldindex="1"></ntb:combocolumndefinition>
	</ntb:combolist>
</ntb:combo>
</body>
</html>