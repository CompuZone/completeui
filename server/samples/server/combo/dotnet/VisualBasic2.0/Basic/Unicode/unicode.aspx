<%@ Page Language="vb" AutoEventWireup="false" Inherits="EBAWebComboVisualBasicSamples._Unicode" CodeFile="Unicode.aspx.vb" %>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
<HEAD>
<title>映画</title>
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
<meta name="CODE_LANGUAGE" Content="C#">
<meta name="vs_defaultClientScript" content="JavaScript">
<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
      <p>This sample illustrates the use of the Classic Search Mode with Unicode strings. </p>
      <p>In this demo the <strong>GetFieldFromActiveRow</strong> method is being used with the <strong>OnAfterSearch</strong> event to populate a 'details' area with the data for that record.</p>
      <p><strong>Instructions</strong></strong>: put your cursor in the text box and start typing.</p>
      <p><strong>映画:</strong></p>
      <script src="LanguagePacks/ebacombolanguagepack_ja.utf8.js"></script>
      <ntb:Combo id="Combo1" style="Z-INDEX: 200; LEFT: 56px; PADDING-BOTTOM: 1px; PADDING-TOP: 1px; TOP: 56px"
										runat="server">
        <ListColumnDefinitionItems>
          <ntb:ListColumnDefinition DataFieldIndex="1" Width="300px" HeaderLabel="映画"></ntb:ListColumnDefinition>
        </ListColumnDefinitionItems>
        <List PageSize="5" AllowPaging="True" Width="300px" ></List>
        <TextBox DataFieldIndex="1"></TextBox>
      </ntb:Combo>
</form>
</body>
</HTML>
