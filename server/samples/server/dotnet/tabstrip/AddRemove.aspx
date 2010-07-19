<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AddRemove.aspx.cs" Inherits="tabstrip_AddRemove" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Add/Remove Tabs</h2>
        <ntb:TabStrip ID="ts" Height="400" Width="640" Theme="Nitobi" runat="server" TabOverlap="15" TabAlignment="Center" >
            <TabItems>
                <ntb:TabItem Width="120" ToolTip="nitobi.com" Name="Home" NavigationUrl="http://www.nitobi.com" />
                <ntb:TabItem Width="120" ToolTip="api.nitobi.com" Name="API" NavigationUrl="http://api.nitobi.com" />
                <ntb:TabItem Width="120" ToolTip="bbc.co.uk" Name="News" NavigationUrl="http://www.bbc.co.uk" />
            </TabItems>
        </ntb:TabStrip>
        
        <p>This sample demonstrates adding and removing tabs.</p>
        
        <ul>
            <li>Click <a href="#" onclick="add()">add</a> to add a tab.</li>
            <li>Click <a href="#" onclick="remove()">remove</a> to remove a tab.</li>
            <li>Note that the content of the existing tabs don't change when adding and removing tabs.</li>
        </ul>
        
        <script>
            // code to add a tab to tabstrip1  
            function add()  
 {  
     var t1 = nitobi.getComponent("ctl00_ContentPlaceHolder1_ts");  
     var tabs = t1.getTabs();  
     var tab = new nitobi.tabstrip.Tab();  
     tab.setLabel("W3C");  
     tab.setContainerType("iframe");   
     tab.setSource("http://www.w3.org/");  
     tab.setWidth("190px");  
     tabs.add(tab);  
     t1.render();  
     return false;  
 }  
   
 // code to remove a tab from tabstrip1  
 function remove()  
 {  
     var t1 = nitobi.getComponent("ctl00_ContentPlaceHolder1_ts");  
     var tabs = t1.getTabs();  
     tabs.remove(3);  
     t1.render();  
     return false;  
 }     
    </script>
        
</asp:Content>