<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="nitobi.combo" %>
<%@ Page language="c#" Codebehind="DataGrid.aspx.cs" AutoEventWireup="false" Inherits="DataGridDemo.DataGrid" EnableViewState="True" ValidateRequest="false"%>
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
<form id="Form1" method="post" runat="server">
      <p>This sample illustrates the use of combobox within the ASP DataGrid control.</P>
      <P><STRONG>Instructions</STRONG>: Click "Edit" to change the information stored in 
        its respective row. The text in the row will be repaced by a combobox and two 
        textboxes. Selecting a name in the combobox will automatically place the 
        corresponding values into the email and company name textboxes. Clicking 
        "Update" will cause a label at the bottom to show the updated row values. 
        Clicking "Cancel" will return the datagrid to normal mode, without changing any 
        information in the row. </P>
      <P> Note: This sample datagrid does not save the updated information&nbsp;to the 
        database.</P>
      <asp:datagrid id="DataGrid1" runat="server" Font-Size="10pt" Font-Name="Verdana" HorizontalAlign="Center"
							Width="85%" BackColor="#EEEEEE" Font-Names="Verdana" OnEditCommand="DataGrid1_Edit" OnUpdateCommand="DataGrid1_Update"
							OnCancelCommand="DataGrid1_Cancel" AutoGenerateColumns="False">
        <AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" ForeColor="White" BackColor="Black"></HeaderStyle>
        <Columns>
        <asp:EditCommandColumn ButtonType="LinkButton" UpdateText="Update" CancelText="Cancel" EditText="Edit">
          <ItemStyle HorizontalAlign="Center"></ItemStyle>
        </asp:EditCommandColumn>
        <asp:BoundColumn Visible="False" DataField="ContactID"></asp:BoundColumn>
        <asp:TemplateColumn HeaderText="Name">
          <ItemTemplate> <%# DataBinder.Eval(Container.DataItem, "ContactName") %> </ItemTemplate>
          <EditItemTemplate>
            <ntb:Combo id=cmbName style="PADDING-BOTTOM: 1px; PADDING-TOP: 1px" runat="server" PostBackOnSelectEvent="True" DataSource="<%# GetInitialDataSource(10) %>" DataMember="tblCustomers" PreconfiguredStylesheet="EBACombo" Mode="Classic">
              <List Width="280px" PageSize="10" EnableDatabaseSearch="True" AllowPaging="True"></List>
              <TextBox DataFieldIndex="1"></TextBox>
              <ListColumnDefinitionItems>
                <ntb:ListColumnDefinition DataFieldIndex="1" Width="100%"></ntb:ListColumnDefinition>
              </ListColumnDefinitionItems>
            </ntb:Combo>
          </EditItemTemplate>
        </asp:TemplateColumn>
        <asp:TemplateColumn HeaderText="Email">
          <ItemTemplate> <%# DataBinder.Eval(Container.DataItem, "ContactEmail") %> </ItemTemplate>
          <EditItemTemplate>
            <asp:TextBox id="txtEmail" runat="server" Width="180px" Text='<%# DataBinder.Eval(Container.DataItem, "ContactEmail") %>'> </asp:TextBox>
          </EditItemTemplate>
        </asp:TemplateColumn>
        <asp:TemplateColumn HeaderText="Company Name">
          <ItemTemplate> <%# DataBinder.Eval(Container.DataItem, "CompanyName") %> </ItemTemplate>
          <EditItemTemplate>
            <asp:TextBox id="txtComp" runat="server" Width="180px" Text='<%# DataBinder.Eval(Container.DataItem, "CompanyName") %>'> </asp:TextBox>
          </EditItemTemplate>
        </asp:TemplateColumn>
        </Columns>
      </asp:datagrid>
      <asp:Label id="lblUpdate" runat="server" Font-Names="Verdana" Visible="False"></asp:Label></TD>
</form>
</body>
</HTML>
