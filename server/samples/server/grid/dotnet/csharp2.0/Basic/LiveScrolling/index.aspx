<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<%@ Page language="c#" Inherits="GridCSharpSamples.Basic.LiveScrolling.WebForm1" CodeFile="index.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Nitobi Grid V3 Demos - LiveScrolling</title>
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
		<script>


/*function GetNewRecordID()
{
		// Use the native cross-browser nitobi Ajax object
		var myAjaxRequest = new nitobi.ajax.HttpRequest();
		
		// Define the url for your generatekey script
		myAjaxRequest.handler = 'getnextrecord.asp?rnd=' + Math.random();
		myAjaxRequest.async = false;
		myAjaxRequest.get();
		
		// return the result to the grid
		return myAjaxRequest.httpObj.responseText;
}*/
		</script>
	</HEAD>
	<body>
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->
					<p>Grid V3 makes it easy to handle very large datasets. By taking a big dataset and 
						rendering it on-demand blocks, we're able to dramatically improve the 
						performance. With Grid, you're able to use LiveScrolling mode on both <strong>static</strong>
						(embedded in the HTML) or <strong>dynamic</strong> data (via ajax requests).</p>
					<ul>
						<li class="BodyList">
							<a href="#1">Local-data LiveScrolling </a>
						<li class="BodyList">
							<a href="#2">Remote-data LiveScrolling</a></li>
					</ul>
					<h3><a class="anch" name="2">Remote-data LiveScrolling</a></h3>
					<p>To bind to a remote datasource using the declarative markup seen above, we just 
						specify a <strong>gethandler</strong> instead of a datasourceid. The gethandler 
						refers to a script on the server (in this case load_data.asp). As the grid 
						needs data from the server, it calls the gethandler with the following 
						parameters:</p>
					<ul>
						<li class="BodyList">
							<strong>StartRecordIndex</strong>
						- Which record (ordinally) to start returning data on.
						<li class="BodyList">
							<strong>PageSize</strong>
						- How many records to return
						<li class="BodyList">
							<strong>SortColumn</strong>
						- Which is the currently sorted column (could be blank)
						<li class="BodyList">
							<strong>SortDirection</strong>
						- (Asc or Desc) The direction of sorting
						<li class="BodyList">
							<strong>TableId</strong> - The datatable being used (by default is _default)</li>
					</ul>
					<ntb:grid id="LiveScrollingGrid" runat="server" Height="200px" Width="630px" Mode="LiveScrolling">
						<ntb:datasources xmlns:ntb="http://www.nitobi.com">
							<ntb:datasource id="_default">
								<ntb:datasourcestructure></ntb:datasourcestructure>
								<ntb:data></ntb:data>
							</ntb:datasource>
						</ntb:datasources>
						<ntb:columns xmlns:ntb="http://www.nitobi.com"></ntb:columns>
					</ntb:grid>
	</body>
</HTML>
