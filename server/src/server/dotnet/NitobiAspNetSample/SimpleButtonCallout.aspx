<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleButtonCallout.aspx.cs" Inherits="test.SimpleButtonCallout" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	<span>Your Info:
	<%-- The Theme, ImageUrl and CssStyle attributes for the ButtonCallout are coming from the ASP.NET theme --%>
	<ntb:ButtonCallout ID="co1" runat="server" CalloutDirection="LeftTop" AttachedTo="d" >
		<Title>Basic Help about: Your Info</Title>
		<Body>Your information can be anything you want because this is just a demo!</Body>
	</ntb:ButtonCallout>
	</span>
	<asp:TextBox ID="d" runat="server"></asp:TextBox>
</asp:Content>