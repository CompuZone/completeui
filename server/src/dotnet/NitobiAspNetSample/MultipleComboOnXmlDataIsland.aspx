<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultipleComboOnXmlDataIsland.aspx.cs" Inherits="test.MultipleComboOnXmlDataIsland" MasterPageFile="Site1.Master"  %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content runat="server" ContentPlaceHolderID="head">
<title>Multiple Combos using Common Xml Data Island</title>
</asp:Content>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	<ntb:XmlDataIsland ID="testIsland" runat="server"  GetDataUrl="MultipleComboOnXmlDataIsland.aspx" />
	<asp:CheckBox ID="useRemote" runat="server" Text="Use remote data for XML Data Island." AutoPostBack="true" />
    <div>
		Favorite Product 1:
		<ntb:Combo ID="c1" runat="server" Theme="Outlook" XmlDataIslandId="testIsland" DataTextField="ProductName">
			<TextBox Width="250" />
			<List Width="600" Height="300" />
			<Columns>
				<ntb:ImageColumn DataField="img" Width="20" />
				<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
				<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
				<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />				
			</Columns>
		</ntb:Combo>
		<br />Favorite Product 2:
		<ntb:Combo ID="c2" runat="server" Theme="Outlook" XmlDataIslandId="testIsland" DataTextField="ProductName">
			<TextBox Width="250" />
			<List Width="600" Height="300" />
			<Columns>
				<ntb:ImageColumn DataField="img" Width="20" />
				<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
				<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
				<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />				
			</Columns>
		</ntb:Combo>
		<br />Favorite Product 3:
		<ntb:Combo ID="c3" runat="server" Theme="Outlook" XmlDataIslandId="testIsland" DataTextField="ProductName">
			<TextBox Width="250" />
			<List Width="600" Height="300" />
			<Columns>
				<ntb:ImageColumn DataField="img" Width="20" />
				<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
				<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
				<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />				
			</Columns>
		</ntb:Combo>
		<br />Favorite Product 4:
   		<ntb:Combo ID="c4" runat="server" Theme="Outlook" XmlDataIslandId="testIsland" DataTextField="ProductName">
			<TextBox Width="250" />
			<List Width="600" Height="300" />
			<Columns>
				<ntb:ImageColumn DataField="img" Width="20" />
				<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
				<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
				<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />				
			</Columns>
		</ntb:Combo>
</div>
<button onclick="xmlout.innerText = testIsland.XMLDocument.documentElement.xml">Show Xml Data Island Data</button>
<div id="xmlout"></div>
</asp:Content>

<asp:Content ContentPlaceHolderID="codeExamples" runat="server">
<div style="width:1000px"><textarea name="code" class="html">
&lt;ntb:XmlDataIsland ID="testIsland" runat="server"  GetDataUrl="MultipleComboOnXmlDataIsland.aspx" />

&lt;ntb:Combo ID="Combo1" runat="server" Theme="Outlook" XmlDataIslandId="testIsland" DataTextField="ProductName">
	<TextBox Width="250" />
	<List Width="600" Height="300" />
	<Columns>
		<ntb:ImageColumn DataField="img" Width="20" />
		<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
		<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
		<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" width="150" />				
	</Columns>
</ntb:Combo>

&lt;ntb:Combo ID="Combo2" runat="server" Theme="Outlook" XmlDataIslandId="testIsland" DataTextField="ProductName">
	&lt;TextBox Width="250" />
	&lt;List Width="600" Height="300" />
	&lt;Columns>
		&lt;ntb:ImageColumn DataField="img" Width="20" />
		&lt;ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
		&lt;ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
		&lt;ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" width="150" />				
	&lt;/Columns>
&lt;/ntb:Combo>
</textarea></div>
</asp:Content>

<asp:Content ContentPlaceHolderID="docs" runat="server">
<p class=MsoNormal>This page demonstrates multiple Nitobi combo controls
sharing the same data from a single xml data island.<span
style='mso-spacerun:yes'>  </span>When a page has more than one combo using the
same data source for the user to choose from, this is the more efficient way to
manage the data for them.<span style='mso-spacerun:yes'>  </span>If each of
these combo boxes were using ajax for a remote data call, there would be 4 separate
calls.<span style='mso-spacerun:yes'>  </span>If they each embedded the list of
data within their control, it would bulk up the page size.</p>

<p class=MsoNormal>The xml data island approach can be used in either a local
or remote fashion.<span style='mso-spacerun:yes'>  </span>When used in local
mode, the xml data island is populated with its data directly in the page.<span
style='mso-spacerun:yes'>  </span>When used in remote mode, the data island
will use the src attribute and make a remote call back to the same data handler
used for all the other various control data handling.</p>
</asp:Content>