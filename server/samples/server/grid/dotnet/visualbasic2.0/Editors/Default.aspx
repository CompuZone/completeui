<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="Basic_Editors_Default" %>

<%@ Register Assembly="Nitobi.Grid" Namespace="Nitobi" TagPrefix="ntb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <ntb:Grid ID="Grid1" runat="server" Style="position: absolute"><ntb:datasources xmlns:ntb="http://www.nitobi.com"><ntb:datasource id="_default"><ntb:datasourcestructure /><ntb:data /></ntb:datasource></ntb:datasources><ntb:columns xmlns:ntb="http://www.nitobi.com" /></ntb:Grid>
    
    </div>
    </form>
</body>
</html>
