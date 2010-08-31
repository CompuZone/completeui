<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CustomerInfoDetails.ascx.cs" Inherits="test.CustomerInfoDetails" %>
<table>
<tr>
	<td><asp:Label runat="server" ID="fnlbl">First Name:</asp:Label></td>
	<td><asp:TextBox runat="server" ID="firstName" Width="7em"></asp:TextBox></td>
	<td><asp:Label runat="server" ID="lnlbl">Last Name:</asp:Label></td>
	<td><asp:TextBox runat="server" ID="lastName" Width="7em"></asp:TextBox></td>
</tr>
<tr>
	<td><asp:Label runat="server" ID="stLbl">Street:</asp:Label></td>
	<td colspan="3"><asp:TextBox runat="server" ID="street"></asp:TextBox></td>
</tr>
<tr>
	<td><asp:Label runat="server" ID="ctlbl">City:</asp:Label></td>
	<td colspan="3"><asp:TextBox runat="server" ID="city"></asp:TextBox></td>
</tr>
</table>