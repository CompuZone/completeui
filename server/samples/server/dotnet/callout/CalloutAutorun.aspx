<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CalloutAutorun.aspx.cs" Inherits="callout_CalloutAutorun" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <ntb:Callout AutoRun="Always" CalloutDirection="BottomLeft" IconStyle="Info" ID="AutorunCallout"
     runat="server" Theme="Impact" Visible="true">
        <Title>Welcome!</Title>
        <Body>This is an Autorun callout. You can control whether it runs on page load simply by defining the AutoRun property on the Callout object.</Body>
    </ntb:Callout>
    <h2>Autorun Callout Example</h2>
    <p>In this example, as soon as the page is done loading, a Callout component will pop up. You can also <a onclick="showctl00_ContentPlaceHolder1_AutorunCallout();" href="#">click here</a> to run it again.</p>
</asp:Content>