<%@ Control Language="vb" AutoEventWireup="false" Inherits="EBAWebComboVisualBasicSamples.ComboUC" CodeFile="ComboUC.ascx.vb" %>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<%
	' Only write out this code once per page.
	if( not me.Page.IsClientScriptBlockRegistered( "ComboUCJSCode" ) )  
		dim script as string = "<script type='text/javascript'>"  
			' This function is called for each combo that loads.
			' Never use OnAfterIntializeEbaCombos in a user control.
		script = script & "function OnUserControlComboLoad(Combo)" & VBCRLF 
		script = script & "{" & VBCRLF 
		' Add any initialization code you need here. 
		' E.g. alert(Combo.GetId());
		script = script & "}" 

		' Fires when the user clicks on the country combo.
		script = script & "function Country_Select(countryComboList)" 
		script = script & "{" 
			' Since the Select event is fired by the list, get the combo object.
		script = script & "	var countryCombo = countryComboList.GetCombo();" 
			' In a user control, each control has a compound id consisting of the
			' id itself plus the ids of the controls it is embedded in.
			' Get the prefix.
		script = script & "	var compoundId = countryCombo.GetId();" 
		script = script & "	var idPrefix=compoundId.substring(0,compoundId.lastIndexOf(':'));" 
		script = script & "	" 
			' Get the province combo using its unique compound id.
        script = script & "	var provinceCombo = document.getElementById(idPrefix+':cmbProvince').object;"
		script = script & "	" 
			' Get the selected country id.
		script = script & "	var CountryArr = countryCombo.GetSelectedRowValues();" 
		script = script & "	" 
			' Get a page.
		script = script & "	provinceCombo.GetList().GetPage(0, 0, CountryArr[0]);" 
		script = script & "	provinceCombo.GetList().SetSelectedRowIndex(-1);" 
		script = script & "	provinceCombo.GetTextBox().SetValue('[Choose Province]');" 
		script = script & "}" 
		script = script & "</script>"
		me.Page.RegisterClientScriptBlock( "ComboUCJSCode", script )
		Response.Write(script)
	end if

%>
<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">St. Address</span><br>
<asp:TextBox id="txtStAddress" runat="server" Width="300px"></asp:TextBox><br>
<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">City</span><br>
<asp:TextBox id="txtCity" runat="server" Width="300px"></asp:TextBox><br>
<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">Country</span><br>
<ntb:Combo id="cmbCountry" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" OnLoadEvent="OnUserControlComboLoad(this)"
	OnSelectEvent="Country_Select(this)" Width="300px">
	<List Width="200px" ></List>
	<TextBox DataFieldIndex="1" Value="[Choose Country]"></TextBox>
	<ListColumnDefinitionItems>
		<ntb:ListColumnDefinition DataFieldIndex="1" HeaderLabel="Country" Width="100%"></ntb:ListColumnDefinition>
	</ListColumnDefinitionItems>
</ntb:Combo><br>
<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">Province</span><br>
<ntb:Combo id="cmbProvince" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" Width="300px">
	<List Width="200px" ></List>
	<TextBox DataFieldIndex="2"></TextBox>
	<ListColumnDefinitionItems>
		<ntb:ListColumnDefinition DataFieldIndex="2" HeaderLabel="Province" Width="100%"></ntb:ListColumnDefinition>
	</ListColumnDefinitionItems>
</ntb:Combo>
