<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GridWithIndentedText.aspx.cs" Inherits="test.IndentedGrid" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	<ntb:Grid ID="g" runat="server" Width="347" Height="300" Mode="LocalNonPaging" GetDataUrl="DataHandler.ashx"  DataSourceId="indentedProductNames">
		<Columns>
			<ntb:ImageColumn DataField="img" Width="20" />
			<ntb:BoundColumn HeaderText="Text" DataField="ProductName" Width="200" />		
			<ntb:NumberColumn HeaderText="Number (with currency mask)" DataField="ProductPrice" width="75" Mask="$#,##0.00" />
			<ntb:DateColumn HeaderText="Date" DataField="LastUpdated" mask="MM/dd/yyyy" ReadOnly="false" width="150" />				
		</Columns>
	</ntb:Grid>
	
</asp:Content>

<asp:Content ContentPlaceHolderId="codeExamples" runat="server">
</asp:Content>