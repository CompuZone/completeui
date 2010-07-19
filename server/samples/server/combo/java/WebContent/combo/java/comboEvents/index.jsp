<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>


<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Nitobi ComboBox V3 Demos</title>
<script type="text/javascript">
	// This code is specific to displaying our event text and is not essential for normal operation
	var EventCount = 1;
	var myTimer;
	function ReportEventTextBox(EventName)
	{
		document.DemoForm.EventTextBox.value = '[' + EventCount + '] ' + EventName + '\n' + document.DemoForm.EventTextBox.value;
		EventCount += 1;
		window.clearTimeout(myTimer);
		myTimer = window.setTimeout('document.DemoForm.EventTextBox.value= "";', 2500);
	}


	// EBA Combo automatically looks for the following function after initialization. It is not required though.

	function OnAfterIntializeEbaCombos()
	{
		ReportEventTextBox('onAfterInitialize();');
	}
</script>
</head>
<body>
<p class="intro">This sample illustrates how to access public events that fire with the ComboBox.</p>
      <ul class="instructions">
      	<li>Put your cursor in the text box and start typing.</li>
      	<li>The listbox will contain selections from the database based on your search string.</li>
      	<li>Try typing 'shar' - watch how the listbox changes as you type</li>
      </ul>
      <form name="DemoForm">
        <h3 style="padding-top: 0px;">Select a Customer</h3>
        <ntb:combo id="cmbCustomers"
				   onblurevent="ReportEventTextBox('OnBlurEvent();')"
				   onfocusevent="ReportEventTextBox('OnFocusEvent();')"
				   onbeforeselectevent="ReportEventTextBox('OnBeforeSelectEvent();')"
				   onselectevent="ReportEventTextBox('OnAfterSelectEvent();')"
				   ontabevent="ReportEventTextBox('OnTabEvent();')"
				   mode="classic" 
				   toolkitjsurl="../../../common/script/nitobi.toolkit.js"
				  componentcssurl="../../../common/style/nitobi.combo.css"
				  componentjsurl="../../../common/script/nitobi.combo.js">
				  <ntb:combotextbox
				   width="250px"
				   datafieldindex="0"
				   oneditkeyupevent="ReportEventTextBox('OnEditKeyUpEvent();')"></ntb:combotextbox>
          <!-- A list which allows paging and search. The datasource is a separate asp file. -->
          <ntb:combolist
				   width="360px"
				   height="205px"
				   datasourceurl="get"
				   pagesize="12"
				   onhideevent="ReportEventTextBox('OnHideEvent();')"
				   onshowevent="ReportEventTextBox('OnShowEvent();')"
				   onbeforesearchevent="ReportEventTextBox('OnBeforeSearchEvent();')"
				   onaftersearchevent="ReportEventTextBox('OnAfterSearchEvent();')">
            <ntb:combocolumndefinition columntype="IMAGE" width="16px" datafieldindex="4" headerlabel="<img src='scustomerimage.gif'>"></ntb:combocolumndefinition>
            <ntb:combocolumndefinition width="130px" headerlabel="Customer Name" datafieldindex="0" ></ntb:combocolumndefinition>
            <ntb:combocolumndefinition width="200px" datafieldindex="1"></ntb:combocolumndefinition>
          </ntb:combolist>
        </ntb:combo>

        <p>Public Events firing:</p>
        <textarea name="EventTextBox" cols="80" rows="10"></textarea>
      </form>

</body>
</html>