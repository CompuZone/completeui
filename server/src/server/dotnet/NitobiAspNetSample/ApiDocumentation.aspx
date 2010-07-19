<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ApiDocumentation.aspx.cs" Inherits="test.ApiDocumentation" MasterPageFile="DocuMaster.Master" %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
<ntb:XmlDataIsland runat="server" />
<iframe name="frame1" id="frame1" runat="server" src="ApiDocs/index.html"
	frameborder="0" width="100%"  style="background-color:Transparent;border:none;" />
</asp:Content>