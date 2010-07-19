<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="test._Default" MasterPageFile="Site1.Master" %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content runat="server" ContentPlaceHolderID="main">
	<uc1:WebUserControl1 ID="wc1" runat="server"></uc1:WebUserControl1>
	<button onclick="debugger;CodeBlock.innerText = document.getElementById('ctl00_main_wc1_g_ToolbarInfo').value;">show</button>
    <div id="CodeBlock" class="CodeBlock">
    </div>
	<script>
		//This script is needed because the maintain scroll position doesnt work proeprly with a grid 
		//on the page.  This is due to the fact that the grid is not at its proper size when the 
		//restorescrollposition method is origionally setup by asp.net.  This helps to overcome that
		//but has a potential timing issue.
		var oldHandler = InitializeEbaCombos;
		InitializeEbaCombos = newInitializeEbaCombos;
		function newInitializeEbaCombos()
		{
			oldHandler();
			window.setTimeout("try{WebForm_RestoreScrollPosition()}catch(){}", 200);
		}
	</script>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="docs">


<p class=MsoNormal>This page demonstrates many different abilities of the
Nitobi controls.<span style='mso-spacerun:yes'>  </span>This page (and all the
others) uses an ASP.NET master page.<span style='mso-spacerun:yes'>  </span>It
also uses a ASCX user control to contain the Grid and Combo controls. Both the
grid and combo sections of this page have standard ASP.NET controls to change
how the Grid and Combo will operate.<span style='mso-spacerun:yes'> 
</span>Because the controls support view state properly, as you use the ASP.NET
controls to change the options of the Nitobi controls, the settings will be
remembered between event post backs.<span style='mso-spacerun:yes'>  </span></p>

<p class=MsoNormal>The Nitobi controls also support ASP.NET themes and skin
files to control the various display aspects of the controls site wide.<span
style='mso-spacerun:yes'>  </span>This demo site has a themes menu to choose between
the themes created, which will change the way the Grid and Combo are displayed
throughout this demo.<span style='mso-spacerun:yes'>  </span>This page does
allow you to change the display theme used by the Grid and Combo to one of the
support Nitobi themes.<span style='mso-spacerun:yes'>  </span>This change is
only for this page and does not change the actual ASP.NET theme for the site.</p>

</asp:Content>