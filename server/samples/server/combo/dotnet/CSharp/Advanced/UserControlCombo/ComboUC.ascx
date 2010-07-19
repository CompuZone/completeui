<%@ Control Language="c#" AutoEventWireup="false" Codebehind="ComboUC.ascx.cs" Inherits="UserControlCombo.ComboUC" TargetSchema="http://schemas.microsoft.com/intellisense/ie5"%>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<%
	// Only write out this code once per page.
	if( !this.Page.IsClientScriptBlockRegistered( "ComboUCJSCode" ) )  
	{
		string script = 
		"<script type='text/javascript'>"
			// This function is called for each combo that loads.
			// Never use OnAfterIntializeEbaCombos in a user control.
			+"function OnUserControlComboLoad(Combo)\n"
			+"{\n"
			// Add any initialization code you need here.
			// E.g. alert(Combo.GetId());
			+"}"

			// Fires when the user clicks on the country combo.
			+"function Country_Select(countryComboList)"
			+"{"
				// Since the Select event is fired by the list, get the combo object.
			+"	var countryCombo = countryComboList.GetCombo();"
				// In a user control, each control has a compound id consisting of the
				// id itself plus the ids of the controls it is embedded in.
				// Get the prefix.
			+"	var compoundId = countryCombo.GetId();"
			+"	var idPrefix=compoundId.substring(0,compoundId.lastIndexOf(':'));"
			+"	"
				// Get the province combo using its unique compound id.
			+"	var provinceCombo = document.getElementById(idPrefix+':Province').object;"
			+"	"
				// Get the selected country id.
			+"	var CountryArr = countryCombo.GetSelectedRowValues();"
			+"	"
				// Get a page.
			+"	provinceCombo.GetList().GetPage(0, 0, CountryArr[0]);"
			+"	provinceCombo.GetList().SetSelectedRowIndex(-1);"
			+"	provinceCombo.GetTextBox().SetValue('[Choose Province]');"
			+"}"
		+"</script>";
		this.Page.RegisterClientScriptBlock( "ComboUCJSCode", script );
		Response.Write(script);
	}

%>

	<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">St. Address</span><br>
	<asp:TextBox id="StAddress" runat="server" Width="300px"></asp:TextBox><br>
	<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">City</span><br>
	<asp:TextBox id="City" runat="server" Width="300px"></asp:TextBox><br>
	<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">Country</span><br>
	<ntb:Combo id="Country" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" OnLoadEvent="OnUserControlComboLoad(this)"
		OnSelectEvent="Country_Select(this)" Width="300px">
		<List Width="200px" ></List>
		<TextBox DataFieldIndex="1" Value="[Choose Country]"></TextBox>
		<ListColumnDefinitionItems>
			<ntb:ListColumnDefinition DataFieldIndex="1" HeaderLabel="Country" Width="100%"></ntb:ListColumnDefinition>
		</ListColumnDefinitionItems>
	</ntb:Combo><br>
	<span style="FONT-SIZE: 10pt; FONT-FAMILY: Tahoma">Province</span><br>
	<ntb:Combo id="Province" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" Width="300px">
		<List Width="200px" ></List>
		<TextBox DataFieldIndex="2"></TextBox>
		<ListColumnDefinitionItems>
			<ntb:ListColumnDefinition DataFieldIndex="2" HeaderLabel="Province" Width="100%"></ntb:ListColumnDefinition>
		</ListColumnDefinitionItems>
	</ntb:Combo>

