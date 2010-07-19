<%@ Page Language="C#" MasterPageFile="~/NitobiExample.master" AutoEventWireup="true" CodeFile="Alignment.aspx.cs" Inherits="fisheye_Alignment" Title="Nitobi: Fisheye Demo" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <h2>Fisheye Alignment</h2>
    <p>This example demonstrate the different open and expand direction options available.</p>
    <div>
        <p>This Fisheye uses an 'up' open direction and a 'right' expand direction.</p>
        <ntb:Fisheye ID="f1" GrowPercent="200" OpenDirection="Up" ExpandDirection="Right" IconWidth="50" Theme="Nitobi" runat="server">
            <ntb:FisheyeItem ImageUrl="images/file_new.png" Tooltip="New File" />
            <ntb:FisheyeItem ImageUrl="images/file_edit.png" Tooltip="Edit File" />
            <ntb:FisheyeItem ImageUrl="images/file_explore.png" Tooltip="Search Files" />
            <ntb:FisheyeItem ImageUrl="images/file_del.png" Tooltip="Delete File" />
            <ntb:FisheyeItem ImageUrl="images/file_attention.png" Tooltip="Flag File" />
            <ntb:FisheyeItem ImageUrl="images/file.png" Tooltip="New Sheet" />
            <ntb:FisheyeItem ImageUrl="images/cut.png" Tooltip="Cut" />
            <ntb:FisheyeItem ImageUrl="images/info.png" Tooltip="Information" />
        </ntb:Fisheye>
    </div>
    
    <div style="margin-top:80px" align="right">
        <p>This Fisheye uses an 'down' open direction and a 'left' expand direction.</p>
        <ntb:Fisheye ID="f2" GrowPercent="150" OpenDirection="Down" ExpandDirection="Left" IconWidth="80" Theme="Nitobi" runat="server">
            <ntb:FisheyeItem ImageUrl="images/computer.png" Tooltip="My Home" />
            <ntb:FisheyeItem ImageUrl="images/ooo_calc.png" Tooltip="Calc" />
            <ntb:FisheyeItem ImageUrl="images/ooo_draw.png" Tooltip="Draw" />
            <ntb:FisheyeItem ImageUrl="images/kontact.png" Tooltip="Contact Organizer" />
            <ntb:FisheyeItem ImageUrl="images/korganizer.png" Tooltip="Organizer" />
            <ntb:FisheyeItem ImageUrl="images/kthememgr.png" Tooltip="Storage" />
            <ntb:FisheyeItem ImageUrl="images/ktimer.png" Tooltip="Timer" />
            <ntb:FisheyeItem ImageUrl="images/logout.png" Tooltip="Logout" />            
        </ntb:Fisheye>
    </div>
    
    <div style="margin-top: 80px;" align="center">
        <p>This Fisheye uses an 'up' open direction and a 'center' expand direction.</p>
        <ntb:Fisheye ID="f3" GrowPercent="250" OpenDirection="Up" ExpandDirection="Center" IconWidth="40" Theme="Nitobi" runat="server">
            <ntb:FisheyeItem ImageUrl="images/Address_Book.png" Tooltip="Address Book" />
            <ntb:FisheyeItem ImageUrl="images/App-empty.png" Tooltip="My Application" />
            <ntb:FisheyeItem ImageUrl="images/App.png" Tooltip="Another App" />
            <ntb:FisheyeItem ImageUrl="images/Black_iTunes.png" Tooltip="Music" />
            <ntb:FisheyeItem ImageUrl="images/iChat.png" Tooltip="Messaging" />
            <ntb:FisheyeItem ImageUrl="images/iPhoto.png" Tooltip="Pictures" />
            <ntb:FisheyeItem ImageUrl="images/preview.png" Tooltip="Preview" />
            <ntb:FisheyeItem ImageUrl="images/mail.png" Tooltip="Inbox" />
            <ntb:FisheyeItem ImageUrl="images/pages.png" Tooltip="Writing" />
            <ntb:FisheyeItem ImageUrl="images/quicktime.png" Tooltip="Quicktime" />
            <ntb:FisheyeItem ImageUrl="images/Sites.png" Tooltip="Bookmarks" />            
        </ntb:Fisheye>
    </div>

</asp:Content>

