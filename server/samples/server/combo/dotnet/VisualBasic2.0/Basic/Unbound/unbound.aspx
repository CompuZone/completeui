<%@ Page Language="vb" AutoEventWireup="false" Inherits="EBAWebComboVisualBasicSamples.Unbound" CodeFile="Unbound.aspx.vb" %>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
      <p>This demo shows a basic unbound combobox. The buttons at the bottom make modifications to the list data. </p>
      <p><strong>Unbound Search Mode</strong>: In this mode, all the data for the list is contained inside the combo tag (much like an HTML select control). Type-ahead and autocompletion are utilized to enhance search capabilities.</p>
      <p><strong> Instructions</strong>: put your cursor in the text box and start typing. Use the hyperlinks at the bottom to make changes to the list data.</p>
      <strong>Select Branch Office</strong>:
      <ntb:Combo id="myCombo" runat="server" PreconfiguredStylesheet="BlueTrim" Mode="Unbound">
        <List ></List>
      </ntb:Combo>
      <br>
      <br>
      <A onClick="alert(document.getElementById('myCombo').object.GetSelectedRowValues());"
									href="#">Click here to see the selected value (in a JavaScript <b>alert()</b>).</A>
</form>
</body>
</HTML>
