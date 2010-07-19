<%@ Page Language="vb" AutoEventWireup="false" Codebehind="LinkedCombos.aspx.vb" Inherits="EBAWebComboVisualBasicSamples.LinkedCombos" ValidateRequest="false"%>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<script type="text/javascript">
			// Called automatically after combos initialize
			function OnAfterIntializeEbaCombos()
			{
				var countryCombo = document.getElementById("cmbCountry").object;
				countryCombo.SetOnSelectEvent("cmbCountry_Select()");
			}
		
			// Fires when the user clicks on the country combo.
			function cmbCountry_Select()
			{
				// Get the combo objects using their ids.
				var provinceCombo = document.getElementById("cmbProvince").object;
				var countryCombo = document.getElementById("cmbCountry").object;

				// Get the selected country id.
				var CountryArr = countryCombo.GetSelectedRowValues();
				
				provinceCombo.GetList().GetPage(0, 0, CountryArr[0]);
				provinceCombo.GetList().SetSelectedRowIndex(-1);
				provinceCombo.GetTextBox().SetValue("[Choose Province]");
			}
		</script>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body MS_POSITIONING="GridLayout">
<form id="Form1" method="post" runat="server">
      <p>This sample illustrates how to set up two combos that have a master-detail relationship.</p>
      <p><strong>Instructions</strong>: Select a value from the first combo, then notice that the values in the second combo change based on your selection.</p>
      <strong>Select a Country</strong>:
      <ntb:Combo id="cmbCountry" runat="server" PreconfiguredStylesheet="Ice">
        <List Width="300px" Height="160px"></List>
        <TextBox Value="[Choose Country]" Editable="False" DataFieldIndex="1"></TextBox>
        <ListColumnDefinitionItems>
          <ntb:ListColumnDefinition DataFieldIndex="1" HeaderLabel="Country" Width="100%"></ntb:ListColumnDefinition>
        </ListColumnDefinitionItems>
      </ntb:Combo>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <ntb:Combo id="cmbProvince" runat="server" PreconfiguredStylesheet="Ice">
        <ListColumnDefinitionItems>
          <ntb:ListColumnDefinition DataFieldIndex="2" HeaderLabel="Province" Width="100%"></ntb:ListColumnDefinition>
        </ListColumnDefinitionItems>
        <List Width="300px" Height="160px"></List>
        <TextBox Editable="False" DataFieldIndex="2"></TextBox>
      </ntb:Combo>
</form>
</body>
</HTML>
