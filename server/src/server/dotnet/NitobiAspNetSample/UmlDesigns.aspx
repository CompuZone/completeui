<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UmlDesigns.aspx.cs" Inherits="test.UmlDesigns" MasterPageFile="DocuMaster.Master" %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
<ntb:XmlDataIsland ID="XmlDataIsland1" runat="server" />
<iframe id="frame1"  runat="server" src="nitobi design1.htm?a%3D" width="100%" height="100%" style="background-color:Transparent"/>
</asp:Content>