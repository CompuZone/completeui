<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<%@ Page language="c#" Inherits="Compact.Compact" CodeFile="Compact.aspx.cs" %>
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
      <p>This sample illustrates the use of the Compact Search Mode. In this mode, no dropdown will appear. All the same paging behaviors will occur and you can access all the events as you would in a normal combobox, but the only autocompletion happening is type-ahead.</p>
      <p><strong>Instructions</strong></strong>: put your cursor in the text box and start typing.</p>
      <ntb:Combo id="myCombo" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" PreconfiguredStylesheet="WinOfficeXP"
										Mode="Compact">
        <List DatasourceUrl="Compact.aspx" ></List>
        <TextBox DataFieldIndex="1"></TextBox>
      </ntb:Combo>
</form>
</body>
</HTML>
