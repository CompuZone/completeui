<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Filter.aspx.vb" Inherits="EBAWebComboVisualBasicSamples.Filter" ValidateRequest="false" %>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
      <p>This sample illustrates the search mode 'Filter' which allows the developer to 
        provide compact autocompeting listboxes across many browsers. Both comboboxes 
        are bound to a database of 1,000 customer records.</p>
      <p><strong>Filter Search Mode- </strong>In this mode, the dropdown element is bound 
        'tightly' to the remote dataset. It only appears as the user types and returns 
        a concise list of suggestions. Features used include type-ahead and autosizing 
        listbox. No clickable button appears in this mode. </p>
      <p><strong>One additional note:</strong> The first combobox below is using the <strong>InitialSearch</strong> attribute which specifies a search string to use to select a record from the 
        dynamic dataset. You don't have to specify a complete string with Initial 
        Search. In the example below we use 'Rosalyn' as the initial search. 'Rosalyn 
        Cline' is selected from the remote dataset. InitialSearch is different from 
        merely specifying a default value because you have access to all the columns of 
        data that are associated with that record. </p>
      <p><strong> Instructions</strong>: put your cursor in the text box and start typing. 
        Gradually type more and more letters to see the list shrink to fit the 
        recordset. </p>
      <strong>Select a Customer</strong>:
      <ntb:Combo id="cmbCustomers" Width="250px" style="Z-INDEX: 200; LEFT: 344px; PADDING-BOTTOM: 1px; PADDING-TOP: 1px"
									Mode="filter" InitialSearch="Rosalyn" runat="server" PreconfiguredStylesheet="Suggests">
        <List Width="360px" PageSize="10" ></List>
        <TextBox DataFieldIndex="1"></TextBox>
        <ListColumnDefinitionItems>
          <ntb:ListColumnDefinition ColumnType="IMAGE" DataFieldIndex="4" HeaderLabel="<img src=resources/scustomerimage.gif>"
											Width="16px" ImageHandlerURL="resources/scustomerimage.gif"></ntb:ListColumnDefinition>
          <ntb:ListColumnDefinition DataFieldIndex="1" HeaderLabel="Customer Name" Width="130px"></ntb:ListColumnDefinition>
        </ListColumnDefinitionItems>
      </ntb:Combo>
      <br>
      <em>(Try typing 'shar' - watch how the listbox changes as you type)</em> <br>
      <br>
      <strong>Select a Customer</strong>:
      <ntb:Combo Width="250px" id="cmbCustomers2" Mode="filter" style="Z-INDEX: 200; LEFT: 344px; PADDING-BOTTOM: 1px; PADDING-TOP: 1px"
									runat="server" PreconfiguredStylesheet="Suggests">
        <List Width="360px" PageSize="20" ></List>
        <TextBox DataFieldIndex="1"></TextBox>
        <ListColumnDefinitionItems>
          <ntb:ListColumnDefinition ColumnType="IMAGE" DataFieldIndex="4" Width="16px" ImageHandlerURL="resources/scustomerimage.gif"></ntb:ListColumnDefinition>
          <ntb:ListColumnDefinition DataFieldIndex="1" Width="200px"></ntb:ListColumnDefinition>
        </ListColumnDefinitionItems>
      </ntb:Combo>
      <br>
      <em>(Without header labels)</em> <br>
</form>
</body>
</HTML>
