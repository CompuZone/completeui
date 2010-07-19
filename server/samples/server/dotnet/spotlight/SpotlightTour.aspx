<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SpotlightTour.aspx.cs" Inherits="spotlight_SpotlightTour" MasterPageFile="~/NitobiExample.master"%>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <ntb:Spotlight AutoRun="Always" IconStyle="TalkBubble" ID="Tour" runat="server" SpotlightShape="Round"
     StartupEffect="GreySwipe" Theme="Impact">
        <ntb:CalloutStep>
            <Title>Centered</Title>
            <Body>Welcome to the Spotlight tour, which will demonstrate the capabilities of our Spotlight component.</Body>
        </ntb:CalloutStep>
        <ntb:CalloutStep AttachedTo="ntb_logo">
            <Title>Attached to an Image!</Title>
            <Body>You can attach a callout to an object by providing the client ID of the control, as the value to the CalloutStep's AttachedTo property.</Body>
        </ntb:CalloutStep>
        <ntb:CalloutStep>
            <Title>Centered</Title>
            <Body>By not providing a DOM ID or object to a callout step, you create a centered callout in the tour.</Body>
        </ntb:CalloutStep>
        <ntb:CalloutStep AttachedTo="footer">
            <Title>Scrolling is Automatic</Title>
            <Body>Spotlight will automatically scroll an object into view. You can turn this off by setting the allowScrolling attribute to <u>false</u>.</Body>
        </ntb:CalloutStep>
        <ntb:CalloutStep AttachedTo="header">
            <Title>Each item occurs in Sequence</Title>
            <Body>Each item will occur in sequence according to the order in which they were scripted.</Body>
        </ntb:CalloutStep>
        <ntb:CalloutStep AttachedTo="product-icon">
            <Title>Maybe</Title>
            <Body>It's not necessary to have titles in callouts.  In this example we simply specified an empty string as the title ('').</Body>
        </ntb:CalloutStep>
        <ntb:CalloutStep>
            <Title>That's all folks!</Title>
            <Body>Hope you enjoyed the tour ;)</Body>
        </ntb:CalloutStep>
    </ntb:Spotlight>
    <h2>Spotlight Tour</h2>
    <img id="product-icon" src="../i/products/spotlight.png" style="display:block;position:relative;" />
    <p>Spotlight allows the developer to visually highlight parts of a webpage, provide a guided tour for a user, and mimick user interactions, all through a Nitobi ASP.NET declaration and/or simple JavaScript API interface.</p>
    <p>This example shows off how to set up a Spotlight tour. Spotlight is essentially a series of Callout
    components, that you can script together to create a rich user experience.</p>
</asp:Content>