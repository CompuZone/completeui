<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleComboLocalHandler.aspx.cs" Inherits="test.SimpleComboLocalHandler" MasterPageFile="Site1.Master"  %>
<%@ Register src="WebUserControl1.ascx" tagname="WebUserControl1" tagprefix="uc1" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
    <div>
		<ntb:Combo ID="c" runat="server" Theme="Outlook" DataTextField="ProductName">
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
</asp:Content>