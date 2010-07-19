<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compact.aspx.cs" Inherits="combo_Compact" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Compact ComboBox</h2>
    <p>The ComboBox's Compact mode is a good control for tight forms or any limited web real estate. It incorporates filter-as-you-type with no listing of results, for quick and direct searching.</p>
        <ntb:Combo ID="c" DataTextField="ContactName" Mode="Compact" Theme="outlook" runat="server" AutoPostBack="true" GetDataUrl="DataHandler.ashx" DataSourceId="combo">
            <TextBox Width="250" />
            <List Width="370" Height="205" OnAfterSearchEvent="ShowTopCustomer()" />
            <Columns>
                <ntb:TextColumn DataField="ContactName" />
                <ntb:TextColumn DataField="ContactEmail" />
                <ntb:TextColumn DataField="JobTitle" />
                <ntb:TextColumn DataField="CompanyName" />
            </Columns>
        </ntb:Combo>
        
        <h3>Customer Details:</h3>
        <table style="border: 1px solid #CCCCCC; width: 300px; height: 125px;" id="myBusinessCard">
            <tr>
                <td valign="top" style="padding: 10px 10px 10px 50px; background: #ffffff">
                  <div id="ContactName" name="ContactName" style="font-family: arial, verdana; font-size: 24px;">Customer Name</div>
			      <div id="JobTitle" name="JobTitle" style="font-family: arial, verdana; font-size: 14px;">Job Title</div>
			      <div id="CompanyName" name="CompanyName" style="font-family: arial, verdana; font-size: 14px;">Company</div>
			      <br/>
			      <div id="ContactEmail" name="ContactEmail"></div>
                </td>
            </tr>
        </table>
        
        <script>
             function ShowTopCustomer(){  
     // need to execute form value assignments in a separate thread  
     // (i.e. setTimeout()) or else form value assignments won't  
     // render  
     window.setTimeout("PopulateBusinessCard();",0);  
 }  
   
 function PopulateBusinessCard()  
 {  
     var name = window.document.getElementById("ContactName");  
     var email = window.document.getElementById("ContactEmail");  
     var jobtitle = window.document.getElementById("JobTitle");  
     var company = window.document.getElementById("CompanyName");  
     var combo = nitobi.getComponent("ctl00_ContentPlaceHolder1_c"); 
   
     var vname = combo.GetFieldFromActiveRow("ContactName");  
     if(vname!=null && name.innerHTML !=vname)  
         name.innerHTML  = vname || "";  
     var vemail = combo.GetFieldFromActiveRow("ContactEmail");  
     if(vemail!=null && email.innerHTML !=vemail)  
         email.innerHTML  = vemail || "";  
     var vjobtitle = combo.GetFieldFromActiveRow("JobTitle");  
     if(vjobtitle!=null && jobtitle.innerHTML !=vjobtitle)  
         jobtitle.innerHTML  = vjobtitle || "";  
     var vcompany = combo.GetFieldFromActiveRow("CompanyName");  
     if(vcompany!=null && company.innerHTML !=vcompany)  
         company.innerHTML  = vcompany || "";  
 }  
        </script>
        
</asp:Content>
