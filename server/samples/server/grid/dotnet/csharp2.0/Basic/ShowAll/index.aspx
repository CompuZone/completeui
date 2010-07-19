<%@ Page language="c#" Inherits="GridCSharpSamples.Basic.ShowAll.index" CodeFile="index.aspx.cs" %>
<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
		<title>Nitobi Grid V3 Demos - ShowAll</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<!-- EBA_REMOVE_START --><link type="text/css" rel="stylesheet" href="../../../Source/Common/styles/lightblue/nitobi.grid.css"><!-- EBA_REMOVE_END -->
		<!-- Now we include the CSS for the grid -->
		<link type="text/css" rel="stylesheet" href="styles/lightblue/nitobi.grid.css">
		</link>
		<!-- Now we include the grid JavaScript -->
		<script language="javascript" src="nitobi.grid.js"></script>
		<!-- The following includes is just for the demo template -->
		<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
		</link>	
		<!-- End of Demo-related Includes -->
  </HEAD>
	<body>
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->
					<p>To bind to a remote datasource using the declarative markup seen above, we just 
						specify a <strong>gethandler</strong> instead of a datasourceid. The gethandler 
						refers to a script on the server (in this case load_data.asp). As the grid 
						needs data from the server, it calls the gethandler with the following 
						parameters:</p>
					<ul>
						<li class="BodyList">
							<strong>SortColumn</strong>
						- Which is the currently sorted column (could be blank)
						<li class="BodyList">
							<strong>SortDirection</strong>
						- (Asc or Desc) The direction of sorting
						<li class="BodyList">
							<strong>TableId</strong> - The datatable being used (by default is _default)</li>
					</ul>
					<p>None of the normal paging parameters like StartRecordIndex or PageSize are used 
						in ShowAll mode - because the grid will render how ever many rows are returned.</p>
					<ntb:grid id="ShowAllGrid" runat="server" Mode="NonPaging" Width="630px" Height="210px">
<ntb:datasources xmlns:ntb="http://www.nitobi.com">
<ntb:datasource id="_default">
<ntb:datasourcestructure></ntb:datasourcestructure>
<ntb:data></ntb:data></ntb:datasource></ntb:datasources>
<ntb:columns xmlns:ntb="http://www.nitobi.com">
<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" xdatafld="ContactName" label="Contact Name" sortenabled="true" />
<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" sortenabled="true" label="Contact Email" xdatafld="ContactEmail" />
<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="200" sortenabled="true" label="Job Title" xdatafld="JobTitle" /></ntb:columns>
					</ntb:grid>
	</body>
</HTML>
