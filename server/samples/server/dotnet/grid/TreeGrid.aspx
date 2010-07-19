<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="TreeGrid.aspx.cs" Inherits="TreeGrid" MasterPageFile="~/NitobiExample.master" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <ntb:Grid id="g" runat="server" Mode="Standard" Width="800" Height="300" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Nitobi" GroupOffset="40" 
		  SelectionMode="Multi" MinHeight="300" MinWidth="400"
          GetDataUrl="Editors.ashx" ShowToolbar="false" DataSourceId="unbound">
	<Columns>
		<ntb:ExpandColumn Name="unbound" GetDataUrl="Editors.ashx" Width="20" ShowHeader="false" >
			<ntb:BoundColumn HeaderText="First Name" DataField="CityName" Width="150" ReadOnly="false" />
		</ntb:ExpandColumn>
		<ntb:BoundColumn DataField="Id" />
		<ntb:TextColumn TextMode="SingleLine" MaxLength="25" HeaderText="Text" DataField="CityName" Width="200" ReadOnly="false" />
	</Columns>
</ntb:Grid>
</asp:Content>