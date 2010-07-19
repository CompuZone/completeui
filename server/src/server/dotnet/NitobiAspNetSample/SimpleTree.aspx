<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SimpleTree.aspx.cs" Inherits="test.SimpleTree" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	Tree Theme:<asp:DropDownList runat="server" ID="theme" AutoPostBack="true" />
	Depth of Local Data in Tree:
	<asp:DropDownList ID="depth" runat="server" AutoPostBack="true">
		<asp:ListItem Value="0" />
		<asp:ListItem Value="1" />
		<asp:ListItem Value="2" />
		<asp:ListItem Value="3" />
	</asp:DropDownList><br />
	
	<ntb:Tree ID="t" runat="server" Theme="Folders" GetDataUrl="DataHandler.ashx" DataSourceId="fileSys"
	CssStyle="width:400px; height:600px" Effect="None">
		<Columns>
			<ntb:BoundColumn Name="label" DataField="Label" />
			<ntb:BoundColumn Name="nodetype" DataField="NodeType" />
			<ntb:BoundColumn Name="haschildren" DataField="HasChildren" />
			<ntb:BoundColumn Name="icon" DataField="Icon" />
			<ntb:BoundColumn Name="expanded" DataField="Expanded" />
			<ntb:BoundColumn DataField="ParentPath" />
		</Columns>
	</ntb:Tree>
</asp:Content>

<asp:Content ContentPlaceHolderID="codeExamples" runat="server">
<div style="width:1000px"><textarea name="code" class="html">
&lt;ntb:Tree ID="Tree1" runat="server" Theme="Folders" GetDataUrl="DataHandler.ashx" DataSourceId="fileSys"
	CssStyle="width:400px; height:600px" Effect="None">
	&lt;Columns>
		&lt;ntb:BoundColumn Name="label" DataField="Label" />
		&lt;ntb:BoundColumn Name="nodetype" DataField="NodeType" />
		&lt;ntb:BoundColumn Name="haschildren" DataField="HasChildren" />
		&lt;ntb:BoundColumn Name="icon" DataField="Icon" />
		&lt;ntb:BoundColumn Name="expanded" DataField="Expanded" />
		&lt;ntb:BoundColumn DataField="ParentPath" />
	&lt;/Columns>
&lt;/ntb:Tree>
</textarea></div>


<div>The file system data structure shown in the tree above is created by the following handler from TestDataProvider.cs.  Note how it is binding to a simple .NET ArrayList filled with FileSysInfo objects.</div>
<div style="width:65em"><textarea name="code" class="c#">
		public static object fileSys_GetData(HttpRequest request, AjaxGetDataHandlerEventArgs args)
		{
			ArrayList files = new ArrayList();
			try
			{
				string serverPath = System.Web.HttpContext.Current.Server.MapPath("~");
				string parentPath = args.ParentRow == null?"":(string)args.ParentRow["ParentPath"];
				string curPath = args.ParentRow == null ? "" : (string)args.ParentRow["label"];
				DirectoryInfo di = new DirectoryInfo(Cmn.pathCombine(serverPath, parentPath, curPath));
				if (di.Exists)
				{
					string parentName = di.FullName;
					parentName = di.FullName.Substring(serverPath.Length);
					foreach (DirectoryInfo cdi in di.GetDirectories())
					{
						FileSysInfo fs = new FileSysInfo(parentName, cdi.Name, true);
						if (string.Compare(cdi.Name, "App_Themes", true) == 0 || string.Compare(curPath, "App_Themes", true) == 0)
							fs.Icon = "images/theme.png";
						files.Add(fs);
					}
					foreach (FileInfo cfi in di.GetFiles())
					{
						FileSysInfo fs = new FileSysInfo(parentName, cfi.Name, false);
						if (File.Exists(Cmn.pathCombine(serverPath, "images", cfi.Extension.Substring(1) + ".png")))
							fs.Icon = "images/" + cfi.Extension.Substring(1) + ".png";

						files.Add(fs);
					}
				}
			}
			catch (Exception e)
			{
				FileSysInfo fs = new FileSysInfo("", e.ToString(), false);
				files.Add(fs);
			}
			return files;
		}

	public class FileSysInfo : Nitobi.BaseTreeNode
	{
		public string ParentPath = "";
		public FileSysInfo(string parentPath, string fileName, bool isDirectory)
		{
			Label = fileName;
			ParentPath = parentPath;
			NodeType = isDirectory ? TreeNodeType.Node : TreeNodeType.Leaf;
			HasChildren = isDirectory ? TreeNodeChildren.True : TreeNodeChildren.False;
		}
	}

</textarea></div>

</asp:Content>