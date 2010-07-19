<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Unicode.aspx.cs" Inherits="combo_Unicode" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Unicode ComboBox</h2>
    <p>Select a Country</p>
    
    <ntb:Combo ID="c" Mode="Classic" Theme="Outlook" AutoPostBack="false" GetDataUrl="DataHandler.ashx" DataSourceId="unicode" DataTextField="Nation" runat="server" >
        <TextBox Width="160" />
        <List Width="260" AllowPaging="false" Height="205" />
        <ClientEvents Select="ShowDetails()" />
        <Columns>
            <ntb:TextColumn DataField="Nation" Width="260" />
            <ntb:TextColumn DataField="CountryCode" Width="0" />
            <ntb:TextColumn DataField="FlagImage" Width="0" />
        </Columns>
    </ntb:Combo>
    
    <p>Country Details:</p>
    
    			<table style="padding-top:0px; padding-right:5px; padding-bottom:5px; padding-left: 5px;">

			  <tr align=center>
			    <td style="padding:0px;"><div id="Container"  style="width: 202px; height: 125px; border: 1px solid #CCCCCC; padding-top:10px; padding-right:5px; padding-bottom:5px; padding-left: 5px; background-color:#ffffff">
			        <div id="CountryName" name="CountryName" style="font-family: arial, verdana; font-size: 24px; padding-top:10px">Country&nbsp;Name</div>
			        <div id="flagImage"></div>
			        <div id="CountryCode" name="CountryCode"></div>
			      </div></td>
			    <td width="95%">&nbsp;</td>
			  </tr>

			</table>
			
    <script>
    
     function ShowDetails()  
        {  
     // need to execute form value assignments in a separate thread  
     // (i.e. setTimeout()) or else form value assignments will not  
     // render  
     window.setTimeout("Populate();",0);  
 }  
   
 function Populate()  
 {  
   
     var combo    = nitobi.getComponent("ctl00_ContentPlaceHolder1_c");
     var myValues = combo.GetSelectedRowValues();  
     var myCountryCode = myValues[1];  
     var myCountryFlag = myValues[2];  
     var myCountryNameUTF8 = myValues[0];  
   
     //clear the details  
     document.getElementById("CountryCode").innerHTML    = "";  
     document.getElementById("CountryName").innerHTML    = "";  
   
     document.getElementById("CountryName").innerHTML = myCountryNameUTF8;  
     document.getElementById("CountryCode").innerHTML = "www.google."+ myCountryCode;  
   
     document.getElementById("flagImage").innerHTML = '<img src="http://www.google.ca/'+  
         myCountryFlag +  
         '" border="0" >';  
   
 }  
    
    </script>

</asp:Content>