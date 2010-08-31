<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MainMenu.ascx.cs" Inherits="test.MainMenu" %>
<div style="z-index:1000000;position:relative">
<asp:Menu ID="mainMenu" runat="server" Orientation="Horizontal"
DynamicMenuStyle-CssClass="PopupMenu" DynamicMenuItemStyle-CssClass="PopupMenuItems"
        DynamicHoverStyle-CssClass="MenuItemsHover" StaticHoverStyle-CssClass="MainMenuItemsHover"
        StaticMenuStyle-CssClass="MainMenu" StaticMenuItemStyle-CssClass="MainMenuItems">
	<Items>
			<asp:MenuItem Text="Control Demos" ImageUrl="/images/nitlogo.gif">
				<asp:MenuItem Text="Grid" ImageUrl="images/grid.png">
					<asp:MenuItem Text="Test Controls" NavigateUrl="~/default.aspx" />
					<asp:MenuItem Text="Test Bound to Objects" NavigateUrl="~/GridBoundToListOfObjects.aspx" />
					<asp:MenuItem Text="Grid with custom toolbar items" NavigateUrl="~/GridWithCustomToolbars.aspx" />
					<asp:MenuItem Text="Grid with indented data" NavigateUrl="~/GridWithIndentedText.aspx" />
					<asp:MenuItem Text="Expandable child columns (Tree Grid)" NavigateUrl="~/SimpleTreeGrid.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Combobox" ImageUrl="images/combobox.png" NavigateUrl="~/SimpleCombo.aspx">
					<asp:MenuItem Text="Remote, Custom Data Handler" NavigateUrl="~/SimpleCombo.aspx" />
					<asp:MenuItem Text="Remote, Page Data Provider" NavigateUrl="~/SimpleComboLocalHandler.aspx" />
					<asp:MenuItem Text="Xml Data Island, Multiple Combos" NavigateUrl="~/MultipleComboOnXmlDataIsland.aspx" />
					<asp:MenuItem Text="With Indented Data" NavigateUrl="~/ComboWithIndentedText.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Tree" ImageUrl="images/tree.png">
					<asp:MenuItem Text="Data bound tree" NavigateUrl="~/SimpleTree.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Calendar" ImageUrl="images/calendar.png">
					<asp:MenuItem Text="Calendar With Options" NavigateUrl="~/SimpleCalendar.aspx" />
					<asp:MenuItem Text="Calendar Events" NavigateUrl="~/CalendarEvents.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Callout" ImageUrl="images/callout.png">
					<asp:MenuItem Text="Autorun Callout" NavigateUrl="~/CalloutAutorun.aspx" />
					<asp:MenuItem Text="Button Callout" NavigateUrl="~/SimpleButtonCallout.aspx" />
					<asp:MenuItem Text="YouTube Callout" NavigateUrl="~/YouTubeCallout.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Spotlight" ImageUrl="images/spotlight.png">
					<asp:MenuItem Text="Autorun Spotlight Tour" NavigateUrl="~/SpotlightStory.aspx" />
					<asp:MenuItem Text="Button Start Spotlight Tour" NavigateUrl="~/ButtonSpotlightStory.aspx" />
					<asp:MenuItem Text="Spotlight Form Help"  NavigateUrl="~/FormAssist.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Tabstrip" ImageUrl="images/tabstrip.png">
					<asp:MenuItem Text="IFrame Tabs" NavigateUrl="~/SimpleTabStrip.aspx" />
					<asp:MenuItem Text="DOM Element Tabs" NavigateUrl="~/SimpleDomTabStrip.aspx" />
					<asp:MenuItem Text="Advanced Tab Usage" NavigateUrl="~/AdvancedDomTabStrip.aspx" />
				</asp:MenuItem>
				<asp:MenuItem Text="Fisheye" ImageUrl="images/fisheye.png">
					<asp:MenuItem Text="Basic Menu" NavigateUrl="~/SimpleFisheye.aspx" />
					<asp:MenuItem Text="Photo Album" NavigateUrl="~/FisheyePhotoAlbum.aspx" />
				</asp:MenuItem>
            </asp:MenuItem>
            <asp:MenuItem Text="Site Themes" ImageUrl="images/theme.png">
				<asp:MenuItem Value="Theme_DarkIce" Text="Dark Ice" />
				<asp:MenuItem Value="Theme_Tiger" Text="Safari Tiger" />
            </asp:MenuItem>
            <asp:MenuItem Text="Documentation" ImageUrl="images/doc.png">
				<asp:MenuItem Text="UML Designs" NavigateUrl="~/UmlDesigns.aspx" />
				<asp:MenuItem Text="API Documentation" NavigateUrl="~/ApiDocumentation.aspx" />
            </asp:MenuItem>
	</Items>
</asp:Menu>
</div>