<%@ Register TagPrefix="ntb" Namespace="Nitobi" Assembly="Nitobi.Grid" %>
<%@ Page language="c#" Inherits="GridCSharpSamples.Basic.ASHX.index" CodeFile="index.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Nitobi Grid V3 Demos - ASHX</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<!-- The following includes is just for the demo template -->
		<link type="text/css" rel="stylesheet" href="http://www.nitobi.com/products/completeui/demos/explorer/demo.css">
		</link>		
		<!-- End of Demo-related Includes -->
	</HEAD>
	<body>
		<!--_NRS_--> <!-- #Include File="..\..\..\..\..\Test\DotNet\Tests\TestLib\TestLib.inc" -->  <!--_NRE_-->
					<p>Hooking the grid to an ASHX dataprovider is faster than ASPX.</p>
					<ntb:grid id="EditorsGrid" runat="server" width="630" height="407" mode="livescrolling" rowhighlightenabled="true"
						toolbarenabled="true" AutoKeyEnabled="True" gethandlerurl="datahandler.ashx" SaveHandlerUrl="datahandler.ashx">
						<ntb:datasources xmlns:ntb="http://www.nitobi.com">
							<ntb:datasource id="_default">
								<ntb:datasourcestructure></ntb:datasourcestructure>
								<ntb:data></ntb:data>
							</ntb:datasource>
						</ntb:datasources>
						<ntb:columns xmlns:ntb="http://www.nitobi.com">
							<ntb:textcolumn width="200" label="Text" xdatafld="ProductName"></ntb:textcolumn>
						</ntb:columns>
					</ntb:grid>
	</body>
</HTML>
