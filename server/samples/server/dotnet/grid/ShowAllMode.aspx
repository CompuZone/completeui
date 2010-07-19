<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="ShowAllMode.aspx.cs" Inherits="ShowAllMode" MasterPageFile="~/NitobiExample.master" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <ntb:Grid id="g" runat="server" Mode="nonpaging" PageSize="15" Width="640" Height="400" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Nitobi" Effect="Shade" GroupOffset="40" 
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="Editors.ashx" SaveDataUrl="Editors.ashx" ShowToolbar="True">
		  <Columns>
		        <ntb:BoundColumn DataField="ProductID" Visible="false" />
		        <ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="ProductName" Width="200" ReadOnly="false" HorizontalAlign="Right">
		        </ntb:TextColumn>		
		        <ntb:CheckboxColumn HeaderText="Check" DataField="BulkAction" ReadOnly="false" />
		        <ntb:NumberColumn HeaderText="Number" DataField="ProductSKU" Width="150" Mask="#,##0" />
	      </Columns>
        </ntb:Grid>
</asp:Content>
