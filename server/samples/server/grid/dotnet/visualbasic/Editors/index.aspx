<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="index.aspx.vb" Inherits="GridVBSamples.index"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Nitobi Grid V3 Demos - Editors</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<!-- The following includes is just for the demo template -->
		<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
		</link>			
		<!-- End of Demo-related Includes -->
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->

					<p>The following example demonstrates each of the available editors in Grid 3.2. To 
						edit a cell, simply double-click on it with the mouse, or click and begin 
					typing. Each column uses a different cell type or editor type.</p>
					<ntb:grid id="EditorsGrid" runat="server" width="630" height="407" mode="livescrolling" rowhighlightenabled="true"
						toolbarenabled="true" AutoKeyEnabled="True">
						<ntb:datasources xmlns:ntb="http://www.nitobi.com">
							<ntb:datasource id="_default">
								<ntb:datasourcestructure></ntb:datasourcestructure>
								<ntb:data></ntb:data>
							</ntb:datasource>
						</ntb:datasources>
						<ntb:columns xmlns:ntb="http://www.nitobi.com">
							<ntb:textcolumn width="75" xdatafld="" label="Image" visible="True" sortdirection="asc" editable="True"
								initial="docicon.gif" sortenabled="false">
								<ntb:imageeditor imageurl="docicon.gif"></ntb:imageeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="75" xdatafld="BulkAction" label="Checkbox" visible="True" sortdirection="asc"
								editable="True" sortenabled="false">
								<ntb:checkboxeditor valuefield="value" displayfields="display" uncheckedvalue="False" checkedvalue="True"
									datasource="[{value:'True',display:'Yes!'},{value:'False',display:'No'}]"></ntb:checkboxeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="200" xdatafld="ProductName" label="Text"></ntb:textcolumn>
							<ntb:numbercolumn width="150" xdatafld="ProductSku" label="Number (with mask)" mask="#,##0"></ntb:numbercolumn>
							<ntb:numbercolumn width="150" xdatafld="ProductPrice" label="Number (with currency mask)" mask="$#,##0.00"></ntb:numbercolumn>
							<ntb:textcolumn width="200" xdatafld="ProductQuantityPerUnit" label="Text Area">
								<ntb:textareaeditor></ntb:textareaeditor>
							</ntb:textcolumn>
							<ntb:datecolumn width="100" xdatafld="LastUpdated" label="Date" sortenabled="false" mask="yyyy.MM.dd"></ntb:datecolumn>
							<ntb:textcolumn width="240" xdatafld="ProductLink" label="Hyperlink" sortenabled="false">
								<ntb:linkeditor></ntb:linkeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="240" xdatafld="ProductPassword" label="Password" sortenabled="false">
								<ntb:passwordeditor></ntb:passwordeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="150" xdatafld="ProductCategoryID" label="Listbox" visible="True" sortdirection="asc"
								editable="True">
								<ntb:listboxeditor valuefield="ProductCategoryID" displayfields="ProductCategoryName" gethandler="index.aspx"></ntb:listboxeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="150" xdatafld="ProductCategoryName" label="Lookup">
								<ntb:lookupeditor displayfields="ProductCategoryName" gethandler="index.aspx"></ntb:lookupeditor>
							</ntb:textcolumn>
						</ntb:columns>
					</ntb:grid>

	</body>
</HTML>
