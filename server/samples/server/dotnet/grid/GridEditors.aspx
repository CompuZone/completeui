<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="GridEditors.aspx.cs" Inherits="GridEditors" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>

<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Editor Types Grid</h2>
    <p>This extensive example shows off each type of advanced editor column type that is available for use in Grid. These editors are:</p>
    <ul>
        <li><b>ntb:TextColumn</b> - a 'standard' column that supports displaying most data types.</li>
        <li><b>ntb:NumberColumn</b> - similar to the textcolumn above, the number column assumes that displayed data is numeric and thus supports a variety of numerical masks as attributes.</li>
        <li><b>ntb:DateColumn</b> - this column supports a miniature Calendar component that is accessible when editing a cell. Furthermore, the column supports various date masks, so the way this data is formatted and exposed can be controlled too.</li>
        <li><b>ntb:CheckboxColumn</b> - this column renders a checkbox control in each cell. By specifying values for checked and unchecked states (via the CheckedValue and UncheckedValue attributes, respectively) you can control how this editor behaves.</li>
        <li><b>ntb:ImageColumn</b> - this column will render the data fed into each cell as an image URL.</li>
        <li><b>ntb:HyperLinkColumn</b> - takes the value passed into each cell and encloses it in an &lt;a&gt; tag, enabling single-click links directly from within Grid.</li>
        <li><b>ntb:ComboColumn</b> - enables incorporating a mini ComboBox control into each cell of the Grid. You can also specify the DisplayType attribute as either Search or Dropdown, adding finer control to the Combo's behaviour within Grid.</li>
    </ul>
        <ntb:Grid id="g" runat="server" Mode="LiveScrolling" PageSize="15" Width="640" Height="400" AllowDeleteRow="false" 
		  AllowAddRow="false" Theme="Nitobi" Effect="Shade" GroupOffset="40"
		  SelectionMode="Multi" LiveScollingMode="Leap" MinHeight="300" MinWidth="400"
		  Resizable="HeightOnly" GetDataUrl="Editors.ashx" SaveDataUrl="Editors.ashx" ShowToolbar="True" >
		  <Columns>
			<ntb:numbercolumn		HeaderText="Contact ID (Number)"		DataField="ContactID"		width="75" ReadOnly="false">
			</ntb:numbercolumn>
			<ntb:CheckboxColumn HeaderText="Male? (Checkbox)" DataField="Gender" CheckedValue="False" UncheckedValue="True" ReadOnly="false"></ntb:CheckboxColumn>
			<ntb:textcolumn	HeaderText="Contact Name" DataField="ContactName" width="200" TextMode="SingleLine" ReadOnly="false" MaxLength="255"></ntb:textcolumn>
			<ntb:ImageColumn HeaderText="Image" DataField="img" ></ntb:ImageColumn>
			<ntb:textcolumn  TextMode="MultiLine"	HeaderText="Company Name (Text Area)"  	DataField="CompanyName"   width="200" ReadOnly="false"></ntb:textcolumn>
			<ntb:datecolumn 	HeaderText="Birthday (Date)"  		DataField="Birthday"				mask="yyyy.MM.dd"	width="100" ReadOnly="false"></ntb:datecolumn>
            <ntb:HyperLinkColumn HeaderText="Email (Hyperlink)" DataField="ContactEmail" OpenWindow="true" Width="150" ReadOnly="false"></ntb:HyperLinkColumn>
            <ntb:ComboColumn GetDataUrl="Dropdown.ashx" DataSourceId="lookup" DataField="JobTitle" HeaderText="Job Title (Lookup)" DisplayType="Search" ValueField="JobTitle" Width="150" ReadOnly="false">
                <ntb:TextColumn DataField="JobTitle" HeaderText="Title" Width="100"></ntb:TextColumn>
            </ntb:ComboColumn>
            <ntb:ComboColumn GetDataUrl="Dropdown.ashx" DataSourceId="listbox" DataField="JobTitle" HeaderText="Job Title (Listbox)" DisplayType="DropDown" ValueField="JobTitle" Width="150" ReadOnly="false">
                <ntb:TextColumn DataField="JobTitle" HeaderText="Title" Width="100"></ntb:TextColumn>
            </ntb:ComboColumn>
	      </Columns>
        </ntb:Grid>
</asp:Content>



