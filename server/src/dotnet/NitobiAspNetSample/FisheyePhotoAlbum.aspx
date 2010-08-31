<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FisheyePhotoAlbum.aspx.cs" Inherits="test.FisheyePhotoAlbum" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
<div style="background-color:Gray; padding-top:5px; padding-bottom:5px">
	<div style="margin: 10px 0px 80px 80px;height:45;">
			<ntb:Fisheye ID="fish" runat="server" SkinID="None" BounceOnSelect="false" ExpandDirection="Center" OpenDirection="Down" GrowPercent="800" IconWidth="40">
				<ntb:FisheyeItem ImageUrl="/images/fishdemo1.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo2.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo3.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo4.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo5.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo6.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo7.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo8.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo9.jpg" />
				<ntb:FisheyeItem ImageUrl="/images/fishdemo10.jpg" />
			</ntb:Fisheye>
	</div>
</div>	
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="codeExamples" runat="server">
<div style="width:800px"><textarea name="code" class="html">
&lt;div style="background-color:Gray; padding-top:5px; padding-bottom:5px">
	&lt;div style="margin: 10px 0px 80px 80px;height:45;">
			&lt;ntb:Fisheye ID="Fisheye1" runat="server" SkinID="None" BounceOnSelect="false" 
				ExpandDirection="Center" OpenDirection="Down" GrowPercent="800" IconWidth="40">
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo1.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo2.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo3.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo4.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo5.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo6.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo7.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo8.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo9.jpg" />
				&lt;ntb:FisheyeItem ImageUrl="/images/fishdemo10.jpg" />
			&lt;/ntb:Fisheye>
	&lt;/div>
&lt;/div>	
</textarea></div>
</asp:Content>