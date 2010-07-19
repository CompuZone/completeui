<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GridBoundToListOfObjects.aspx.cs" Inherits="test.GridBoundToListOfObjects" MasterPageFile="Site1.Master"  %>
<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="main">
	<ntb:Grid ID="g" runat="server" Width="347" Height="300" Mode="LocalNonPaging" AllowAddRow="true" AllowDeleteRow="true">
		<Columns>
			<ntb:BoundColumn DataField="Id" Width="30" />
			<ntb:BoundColumn HeaderText="First Name" DataField="FirstName" Width="150" ReadOnly="false" />
			<ntb:BoundColumn HeaderText="Last Name" DataField="LastName" Width="150" ReadOnly="false" />
		</Columns>
	</ntb:Grid>
	
	<p>Remember to use the save button in the grid toolbar to save your changes.</p>
</asp:Content>

<asp:Content ContentPlaceHolderId="codeExamples" runat="server">
<div style="width:65em"><textarea name="code" class="html">
	&lt;ntb:Grid ID="Grid1" runat="server" Width="347" Height="300" Mode="LiveScrolling" AllowAddRow="true" AllowDeleteRow="true"
			SaveDataUrl="GridBoundtoListOfObjects.aspx" GetDataUrl="GridBoundtoListOfObjects.aspx">
		&lt;Columns>
			&lt;ntb:BoundColumn DataField="Id" Width="30" />
			&lt;ntb:BoundColumn HeaderText="First Name" DataField="FirstName" Width="150" ReadOnly="false" />
			&lt;ntb:BoundColumn HeaderText="Last Name" DataField="LastName" Width="150" ReadOnly="false" />
		&lt;/Columns>
	&lt;/ntb:Grid>
</textarea></div>

<div style="width:55em"><textarea name="code" class="c#">
	/// <summary>
	/// This ASPX code behind class creates a simple list of Customer objects and puts
	/// them into session state to use during AJAX event call backs.
	/// </summary>
	public partial class GridBoundToListOfObjects : BasePage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (Session["customers"] == null)
			{
				ArrayList l = new ArrayList();
				l.Add(new Customer("0", "John", "Smith"));
				l.Add(new Customer("1", "Mark", "Aldrin"));
				l.Add(new Customer("2", "Matthew", "Jones"));
				l.Add(new Customer("3", "Luke", "Kettle"));
				Session["customers"] = l;
			}
			g.Data.provider().GetData += new Nitobi.GetDataHandler(GridBoundToListOfObjects_GetData);
			g.Data.provider().SaveData += new Nitobi.SaveDataHandler(GridBoundToListOfObjects_SaveData);
			g.Data.checkForAndProcessAjaxRequest(Request, Response);
		}

		object GridBoundToListOfObjects_GetData(HttpRequest request, Nitobi.AjaxGetDataHandlerEventArgs args)
		{
			return Session["customers"];
		}

		void GridBoundToListOfObjects_SaveData(HttpRequest request, Nitobi.AjaxSaveDataHandlerEventArgs args)
		{
			ArrayList l = (ArrayList)Session["customers"];
			for (int p = 0; p < args.Count; p++)
			{
				IRow r = args[p];
				switch (r.UpdateAction)
				{
					case UpdateAction.Update:
						Customer c = (Customer)l[Convert.ToInt32(r["Id"])];
						c.FirstName = (string)r["FirstName"];
						c.LastName = (string)r["LastName"];
						break;
					case UpdateAction.Insert:
						l.Add(new Customer(l.Count.ToString(), (string)r["FirstName"], (string)r["LastName"]));
						break;
					case UpdateAction.Delete:
						l.RemoveAt(Convert.ToInt32(r["Id"]));
						break;
				}
			}

		}
	}


	public class Customer
	{
		public string Id;
		public string FirstName;
		public string LastName;

		public Customer(string id, string fn, string ln)
		{
			Id = id;
			FirstName = fn;
			LastName = ln;
		}
	}
</textarea></div>	
</asp:Content>