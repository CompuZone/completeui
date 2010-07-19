<%@ Page language="c#" Codebehind="index.aspx.cs" AutoEventWireup="false" Inherits="GridCSharpSamples.Basic.LocalData.index" %>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Nitobi Grid V3 Demos - LocalData</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<!-- The following includes is just for the demo template -->
		<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
		</link>			
		<!-- End of Demo-related Includes -->
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->
					<p>The grid can display data that is specified on the ASPX page. In this sample, we 
						disable AutoSpecifyDataHandlerUrls, specify a local datasource, set the mode to 
						locallivescrolling, and bind a secondary datasource to a dataset.</p>
					<ntb:grid id="LocalDataGrid" runat="server" width="630" height="407" mode="LocalLiveScrolling"
						rowhighlightenabled="true" toolbarenabled="False" AutoKeyEnabled="True" rowsperpage="42"
						datasourceid="LocalData" DataSources="(Collection)" AutoSpecifyDataHandlerUrls="False">
						<ntb:datasources xmlns:ntb="http://www.nitobi.com">
							<ntb:datasource id="_default">
								<ntb:datasourcestructure></ntb:datasourcestructure>
								<ntb:data></ntb:data>
							</ntb:datasource>
							<ntb:datasource id="LocalData">
								<ntb:datasourcestructure></ntb:datasourcestructure>
								<ntb:data></ntb:data>
							</ntb:datasource>
						</ntb:datasources>
						<ntb:columns xmlns:ntb="http://www.nitobi.com">
							<ntb:textcolumn width="75" sortenabled="false" initial="docicon.gif" editable="True" sortdirection="asc"
								visible="True" label="Image" xdatafld="">
								<ntb:imageeditor imageurl="docicon.gif"></ntb:imageeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="75" sortenabled="false" editable="True" sortdirection="asc" visible="True"
								label="Checkbox" xdatafld="BulkAction">
								<ntb:checkboxeditor datasource="[{value:'True',display:'Yes!'},{value:'False',display:'No'}]" checkedvalue="True"
									uncheckedvalue="False" displayfields="display" valuefield="value"></ntb:checkboxeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="200" label="Text" xdatafld="ProductName"></ntb:textcolumn>
							<ntb:numbercolumn width="150" label="Number (with mask)" xdatafld="ProductSku" mask="#,##0"></ntb:numbercolumn>
							<ntb:numbercolumn width="150" label="Number (with currency mask)" xdatafld="ProductPrice" mask="$#,##0.00"></ntb:numbercolumn>
							<ntb:textcolumn width="200" label="Text Area" xdatafld="ProductQuantityPerUnit">
								<ntb:textareaeditor></ntb:textareaeditor>
							</ntb:textcolumn>
							<ntb:datecolumn width="100" sortenabled="false" label="Date" xdatafld="LastUpdated" mask="yyyy.MM.dd"></ntb:datecolumn>
							<ntb:textcolumn width="240" sortenabled="false" label="Hyperlink" xdatafld="ProductLink">
								<ntb:linkeditor></ntb:linkeditor>
							</ntb:textcolumn>
							<ntb:textcolumn width="240" sortenabled="false" label="Password" xdatafld="ProductPassword">
								<ntb:passwordeditor></ntb:passwordeditor>
							</ntb:textcolumn>
						</ntb:columns>
				</ntb:grid>
	</body>
</HTML>
