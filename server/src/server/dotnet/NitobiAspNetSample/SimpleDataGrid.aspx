<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleDataGrid.aspx.cs" Inherits="test.SimpleDataGrid" %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
	<ntb:Grid ID="g" runat="server" Width="347" Height="300" Mode="LocalNonPaging" AllowAddRow="true" AllowDeleteRow="true">
		<Columns>
			<ntb:BoundColumn DataField="Id" Width="30" />
			<ntb:BoundColumn HeaderText="First Name" DataField="FirstName" Width="150" ReadOnly="false" />
			<ntb:BoundColumn HeaderText="Last Name" DataField="LastName" Width="150" ReadOnly="false" />
		</Columns>
	</ntb:Grid>
    </div>
    </form>
</body>
</html>
