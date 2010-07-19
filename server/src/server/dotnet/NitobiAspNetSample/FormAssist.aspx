<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FormAssist.aspx.cs" Inherits="test.FormAssist" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<%@ Register src="CustomerInfoDetails.ascx" tagname="CustomerInfo" tagprefix="site" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
<site:CustomerInfo ID="cust1" runat="server" />
<ntb:ButtonSpotlight runat="server" ID="tour" ImageUrl="images/Spotlight.png" SpotlightShape="Square">
	<ntb:CalloutStep AttachedTo="cust1">
		<Title>Customer Details Information</Title>
		<Body>Use this area to view and edit the customers name and address.</Body>
	</ntb:CalloutStep>
	<ntb:CodeStep>
		if(document.getElementById('ctl00_main_cust1_firstName').value == "")
			alert('hello');
		else
			alert('hello ' + document.getElementById('ctl00_main_cust1_firstName').value);
	</ntb:CodeStep>
	<ntb:MouseStep AttachedTo="cust1_firstName" />
	<ntb:FormHelperStep AttachedTo="cust1_firstName" Value="Matt" />
	<ntb:FormHelperStep AttachedTo="cust1_lastName" Value="Denman"  />
	<ntb:FormHelperStep AttachedTo="cust1_street" Value="25 Caleb Street"  />	
</ntb:ButtonSpotlight>
</asp:Content>