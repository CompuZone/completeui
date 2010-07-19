<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<%@ Page language="c#" Inherits="SmartSearch.SmartSearch" ValidateRequest="false" CodeFile="SmartSearch.aspx.cs" %>
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<!-- This page is the main page in the sample. It places the combo on the webpage. -->
<!-- Note the namespace defined in the HTML tag. -->
<style type="text/css">
BODY { FONT-SIZE: 12px; FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif }
	</style>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
      <p>This sample illustrates the search mode 'SmartSearch' (with <em>Intelligent Autocomplete</em>) which allows the developer to provide 'fuzzy search' wildcard autocompletion.</p>
      <p><strong>Instructions</strong>: put your cursor in the &quot;Choose a Folder :&quot; field and start typing. The listbox will contain selections from the database based on your search string in some order that you specify (ie: the order of priority). </p>
      <p><strong>Hint</strong>: You can press enter to select the top record and then keep typing for a subfolder.</p>
      <p>Try starting by typing &quot;temp&quot; in the text box. </p>
      <!-- Here's our Combo tag using SmartSearch mode -->
      <!-- See the SmartSearch.aspx.cs backend to see how submitButton_Click gets the value of the Combo -->
      <ntb:Combo id="myCombo" style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" PreconfiguredStylesheet="Outlook"
										Mode="SmartSearch" Width="400px">
        <List DatasourceUrl="SmartSearch.aspx" Width="550px" ></List>
        <ListColumnDefinitionItems>
          <ntb:ListColumnDefinition DataFieldIndex="1" Width="100%"></ntb:ListColumnDefinition>
        </ListColumnDefinitionItems>
        <TextBox DataFieldIndex="1"></TextBox>
      </ntb:Combo>
      <asp:Button id="submitButton" runat="server" Text=">" onClick="submitButton_Click" />
      <p>Selected Folder:</p>
      <asp:Label id="submitLabel" runat="server" />
</form>
</body>
</HTML>
