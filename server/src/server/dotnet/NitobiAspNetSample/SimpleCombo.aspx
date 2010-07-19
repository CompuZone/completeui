<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleCombo.aspx.cs" Inherits="test.SimpleCombo" MasterPageFile="Site1.Master"  %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	<div>
    <table><tr><td width="300px" valign="top">
		<h2>Choose Product</h2>
		<ntb:Combo ID="c" runat="server" DataTextField="ProductName" AutoPostBack="true" Mode="Classic" GetDataUrl="DataHandler.ashx">
			<TextBox Width="250" />
			<List Width="600" Height="300" />
			<Columns>
				<ntb:ImageColumn DataField="img" Width="20" />
				<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
				<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
				<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />				
			</Columns>
		</ntb:Combo>
</td><td valign="top">
		<table><tr><td>
		<h2>Your Product choices</h2>
		</td><td><asp:Button ID="clr" Text="Clear List" runat="server" /></td></tr></table>
		<div id="chosenProd" runat="server" />
</td></tr></table>
		
		<ntb:Combo ID="c2" runat="server" AutoPostBack="true" Mode="Unbound">
			<List Height="200" />
			<Columns>
				<ntb:BoundColumn />		
			</Columns>
		</ntb:Combo>
		<div runat="server" id="chosenTheme" />
    </div>
</asp:Content>

<asp:Content ContentPlaceHolderID="docs" runat="server">
<p class=MsoNormal>This page demonstrates the Nitobi Combo used with ASP.NET page
post backs on selection of an item.<span style='mso-spacerun:yes'>  </span>Both
combo controls are using the <b style='mso-bidi-font-weight:normal'>Unbound</b>
mode, where the data for its items are embedded directly within the page.<span
style='mso-spacerun:yes'>   </span></p>

<p class=MsoNormal>Selecting an item in the first grid will cause a server side
C# event handler to get called which updates the contents of the div to its
right with the item selected.<span style='mso-spacerun:yes'>  </span>The second
combo is being bound to a standard .NET enumeration, showing one of the
flexibilities of the data binding options.</p>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderId="codeExamples" runat="server">
<div style="width:65em"><textarea name="code" class="html">
&lt;div id="chosenProd" runat="server" />

&lt;ntb:Combo ID="c" runat="server" DataTextField="ProductName" AutoPostBack="true">
	&lt;TextBox Width="250" />
	&lt;List Width="600" Height="300" />
	&lt;Columns>
		&lt;ntb:ImageColumn DataField="img" Width="20" />
		&lt;ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
		&lt;ntb:NumberColumn HeaderText="Number" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
		&lt;ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" width="150" />				
	&lt;/Columns>
&lt;/ntb:Combo>
</textarea></div>

<div style="width:60em"><textarea name="code" class="c#">
public partial class SimpleCombo : BasePage
{
	protected void Page_Load(object sender, EventArgs e)
	{
		c.Data = new TestDataHandler();
		c.Select += new EventHandler(c_Select);
	}

	void c_Select(object sender, EventArgs e)
	{
		if (c.SelectedValues.Count > 0)
		{
			bool first = true;
			foreach (string v in c.SelectedValues)
			{
				if (first)
					chosenProd.InnerHtml += "<img src='" + v + "'>&nbsp;";
				else
					chosenProd.InnerHtml += v + ", ";
				first = false;
			}
			chosenProd.InnerHtml = chosenProd.InnerText.Substring(0, chosenProd.InnerText.Length - 2) + "<br/>";
		}
	}
}
</textarea></div>	
</asp:Content>