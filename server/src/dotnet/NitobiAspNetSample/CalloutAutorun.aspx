<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CalloutAutorun.aspx.cs" Inherits="test.CalloutAutorun" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Auto Start: <asp:DropDownList runat="server" ID="autostart" AutoPostBack="true"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
	Theme:<asp:DropDownList runat="server" ID="theme" AutoPostBack="true"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
	Icon Type:<asp:DropDownList runat="server" ID="iconType" AutoPostBack="true"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
	<asp:CheckBox runat="server" ID="includeVid" AutoPostBack="true" Text="Include YouTube video in callout." />
	<div style="height:5px"></div>
	Direction:<asp:DropDownList runat="server" ID="direction" AutoPostBack="true"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
	Content Height:
	<asp:DropDownList runat="server" ID="coHeight" AutoPostBack="true">
		<asp:ListItem Text="- Not Set -" Value="" />
		<asp:ListItem Value="100px" />
		<asp:ListItem Value="150px" />
		<asp:ListItem Value="200px" />
		<asp:ListItem Value="300px" />
	</asp:DropDownList>
	<div style="height:20px;"></div>
	<button onclick='showctl00_main_co1()' type="button">Show/Hide Callout</button>

	<ntb:Callout ID="co1" runat="server" AutoRun="Always"  Theme="Impact" IconStyle="Exclam">
		<Title>Basic Help about: Your Info</Title>
		<Body>
			<p>Your information can be anything you want because this is just a demo!</p>
			This basic help can have complex HTML within it, including a table like this one:
			<table border="1"><tr><td>Cell 1</td><td>Cell 2</td></tr></table>
			<p>It can also have buttons that can close this callout like a popoup dialog.</p>
		</Body>
		<Buttons>
			<table><tr><td><button onclick="nitobi.callout.destroyAll()">Ok</button></td>
			<td><button onclick="nitobi.callout.destroyAll()">Cancel</button></td></tr></table>
		</Buttons>
	</ntb:Callout>
</asp:Content>