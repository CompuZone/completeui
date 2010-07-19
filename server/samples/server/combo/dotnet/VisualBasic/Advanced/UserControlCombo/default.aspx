<%@ Register TagPrefix="uc1" TagName="ComboUC" Src="ComboUC.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="default.aspx.vb" Inherits="EBAWebComboVisualBasicSamples._default" ValidateRequest="false"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
<HEAD>
<title>Nitobi ComboBox V3 Demo</title>
<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
</link>
</HEAD>
<body>
      <p> This demonstration illustrates how the EBA ComboBox can be used in a user 
        control. In this case, the two Address fields are user controls consisting of several textboxes and 
        two linked comboboxes.</P>
      <P><STRONG>Instructions</STRONG> : Start by selecting a country in the "Country" combobox. You will see it populate the "Province" combobox with the appropriate regions. Once you have completed filling out the forms, click "Submit". The results will be displayed in a label located at the bottom of the screen.</P>
      </font>
      <h2>Address</h2>
      <form id="Form1" method="post" runat="server">
        <span style="FONT-WEIGHT: bold; FONT-SIZE: 10pt; FONT-FAMILY: Tahoma; TEXT-DECORATION: underline"> Residential Address</span><br>
        <uc1:ComboUC id="ResidentialAddress" runat="server"></uc1:ComboUC>
        <br>
        <span style="FONT-WEIGHT: bold; FONT-SIZE: 10pt; FONT-FAMILY: Tahoma; TEXT-DECORATION: underline"> Mailing Address</span><br>
        <uc1:ComboUC id="MailingAddress" runat="server"></uc1:ComboUC>
        <br>
        <br>
        <br>
        <asp:Button id="btnSubmit" style="Z-INDEX: 101" runat="server" Text="Submit"></asp:Button>
        <br>
        <asp:Label id="Addresses" style="FONT-SIZE: 10pt; Z-INDEX: 101; LEFT: 488px; FONT-FAMILY: Tahoma"
							runat="server" Width="392px" Height="208px"></asp:Label>
      </form>
</body>
</HTML>
