<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Databound.aspx.cs" Inherits="tree_Databound" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<h2>Databound Tree</h2>
<p>This tree is bound to a handler script (DataHandler.ashx), which returns an ArrayList of WorldNode instances. These objects extend the BaseTreeNode class, and are used by the tree.</p>
<ntb:tree ID="tree1" Theme="Folders" runat="server" GetDataUrl="DataHandler.ashx" DataSourceId="regions" >
    <Columns>
 		<ntb:BoundColumn Name="label" DataField="Label" />
		<ntb:BoundColumn Name="nodetype" DataField="NodeType" />
		<ntb:BoundColumn Name="haschildren" DataField="HasChildren" />
		<ntb:BoundColumn Name="RegionID" DataField="RegionID" />
		<ntb:BoundColumn DataField="RegionOwner" />
    </Columns>
</ntb:tree>

</asp:Content>