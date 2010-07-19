<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<%@ Page language="c#" Codebehind="index.aspx.cs" AutoEventWireup="false" Inherits="GridCSharpSamples.Basic.LiveScrolling.WebForm1" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Nitobi Grid V3 Demos - LiveScrolling</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		
		
		<!-- The following includes is just for the demo template -->
		<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
		</link>	
		<!-- End of Demo-related Includes -->
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->
					<p>Grid V3 makes it easy to handle very large datasets. By taking a big dataset and 
						rendering it on-demand blocks, we're able to dramatically improve the 
						performance.</p>
					<h3>Remote-data LiveScrolling</h3>
					<p>Binding to a remote datasource in .NET can be done in two different ways. The 
						first option is to use the GetData and the SaveData events supplied by the grid 
						on the .aspx page.&nbsp; The second option is to specify a getHandler URL and 
						saveHandler URL that specify a web application such as an ASHX page or any 
						other data access layer.&nbsp; As the grid needs data from the server, it will 
						post an HTTP request which can be handled using one of the two options 
						specified above.&nbsp; Using the GetData event, all the arguments will be 
						specified in GetEventArgs.&nbsp; If you're not using the events, you'll need 
						to&nbsp;get the specific URL arguments:</p>
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
							<strong>TableId</strong> - The datatable being used (by default is _default)
						</li>
					</ul>
					<ntb:grid id="LiveScrollingGrid" runat="server" Height="200px" Width="630px" Mode="LiveScrolling">
						<ntb:datasources xmlns:ntb="http://www.nitobi.com">
							<ntb:datasource id="_default">
								<ntb:datasourcestructure></ntb:datasourcestructure>
								<ntb:data></ntb:data>
							</ntb:datasource>
						</ntb:datasources>
						<ntb:columns xmlns:ntb="http://www.nitobi.com">
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="140" sortenabled="true"
								label="Contact Name" xdatafld="ContactName"></ntb:textcolumn>
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="160" sortenabled="true"
								label="Contact Email" xdatafld="ContactEmail"></ntb:textcolumn>
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="140" sortenabled="true"
								label="Job Title" xdatafld="JobTitle"></ntb:textcolumn>
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="100" sortenabled="true"
								label="Company Name" xdatafld="CompanyName"></ntb:textcolumn>
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="100" sortenabled="true"
								label="Phone Number" xdatafld="PhoneNumber"></ntb:textcolumn>
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="160" sortenabled="true"
								label="Address" xdatafld="Address"></ntb:textcolumn>
							<ntb:textcolumn editable="True" sortdirection="asc" visible="True" width="100" sortenabled="true"
								label="Country" xdatafld="Country"></ntb:textcolumn>
						</ntb:columns>
					</ntb:grid>
					
	</body>
</HTML>
