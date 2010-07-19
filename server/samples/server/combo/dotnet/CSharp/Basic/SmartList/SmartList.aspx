<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<%@ Page language="c#" Codebehind="SmartList.aspx.cs" AutoEventWireup="false" Inherits="SmartList.SmartList" ValidateRequest="false" %>
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<META http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css">
BODY { FONT-SIZE: 12px; FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif }
	TD { FONT-SIZE: 12px; FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif }
	TH { FONT-SIZE: 12px; FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif }
	</style>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
  <p>This sample illustrates the search mode 'SmartList' (with <em>Intelligent Autocomplete</em>) which allows the developer to assist the formation of data driven lists in a text-area.</p>
  <p><strong>Instructions</strong>: put your cursor in the &quot;To:&quot; field and start typing. The listbox will contain selections from the database based on your search string and the <em>order of priority</em> (in this case, the frequency of emails for that contact). Select a contact and press enter. Notice you may perform multiple searches and add multiple records to the text area.</p>
  <p><em>(hint: try typing 'jacob', 'pope', or 'moon') </em></p>
  <div style="background-image: url(mailbackground.png);background-position: top left; background-repeat: no-repeat; padding-top:3px; padding-left: 59px; height: 322px; width:568px;">
    <!-- Here is our Combo Tag using SmartList mode -->
    <ntb:combo id="cmbContacts" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" PostBackOnSelectEvent="False"
		Mode="SmartList" PreconfiguredStylesheet="Outlook" Width="600px" Height="100px">
      <List EnableDatabaseSearch="True" Width="580px" ></List>
      <ListColumnDefinitionItems>
        <ntb:ListColumnDefinition DataFieldIndex="1" Width="100%"></ntb:ListColumnDefinition>
      </ListColumnDefinitionItems>
      <TextBox DataFieldIndex="1"></TextBox>
    </ntb:combo>
  </div>
</form>
</body>
</HTML>
