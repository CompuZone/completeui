Imports System
Imports System.Collections
Imports System.ComponentModel
Imports System.Data
Imports System.Drawing
Imports System.Web
Imports System.Web.SessionState
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.UI.HtmlControls
Imports System.Data.OleDb


Namespace EBAWebComboVisualBasicSamples



Partial Class DataGrid
    Inherits System.Web.UI.Page

    Private Const nameCol As Integer = 1    ' Database column containing contact name 
    Private Const emailCol As Integer = 2   ' Database column containing contact email
    Private Const compCol As Integer = 4    ' Database column containing contact company name
    Private Const dbPath As String = "\data\customerdb.mdb" ' path to database file

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub

    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
    End Sub

#End Region

    Private Sub BindGrid()

        Dim dbConn As OleDbConnection
        Dim dAdapter As OleDbDataAdapter
        Dim ds As DataSet
        Dim serverPath As String = Server.MapPath("")
        ' Create a DB connection to the MDB.
        dbConn = New OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" & serverPath & dbPath)
        ' Create a dataset and add the tables to it.
        ds = New DataSet
        ds.Tables.Add("tblCustomers")
        ' Fill the tables from the dataset with the data from the database.
        dAdapter = New OleDbDataAdapter("SELECT * FROM tblCustomers WHERE ContactId  >= 47000 AND ContactId <= 47020", dbConn)
        dAdapter.Fill(ds, "tblCustomers")
        DataGrid1.DataSource = ds.Tables("tblCustomers").DefaultView
        ' Bind the grid to the datasource
        Me.DataBind()
    End Sub

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        If (Not Page.IsPostBack) Then

            BindGrid()
        End If

        ' if datagrid is in edit mode, bind events to comboboxes
        If (DataGrid1.EditItemIndex <> -1) Then
            BindCombo(DataGrid1.EditItemIndex)
        End If
    End Sub

    Private Sub DataGrid1_EditCommand(ByVal source As Object, ByVal e As System.Web.UI.WebControls.DataGridCommandEventArgs) Handles DataGrid1.EditCommand
        ' Set the EditItemIndex property to the index of the item clicked 
        ' in the DataGrid control to enable editing for that item. 
        Dim currText As String = DirectCast(DataGrid1.Items(e.Item.ItemIndex).Cells(2).Controls(0), DataBoundLiteralControl).Text
        DataGrid1.EditItemIndex = e.Item.ItemIndex
        BindGrid()
        ' Set the combobox's text field to selected contact name
            Dim cmbName As Nitobi.Combo = DirectCast(DataGrid1.Items(e.Item.ItemIndex).FindControl("cmbName"), Nitobi.Combo)
        cmbName.TextValue = currText.Trim()
    End Sub

    Private Sub DataGrid1_UpdateCommand(ByVal source As Object, ByVal e As System.Web.UI.WebControls.DataGridCommandEventArgs) Handles DataGrid1.UpdateCommand

        ' Update info and return grid to non-edit mode. Here, the label control at the bottom of the page
        ' displays the updated info. In a functioning datagrid, the mdb file would be updated through SQL.
        Dim txtEmail, txtComp As System.Web.UI.WebControls.TextBox
            Dim cmbName As Nitobi.Combo
            ' Use the event argument and FindControl function to retrieve references to cmbName, and textboxes
            cmbName = DirectCast(e.Item.Cells(nameCol).FindControl("cmbName"), Nitobi.Combo)
        txtEmail = DirectCast(e.Item.Cells(emailCol).FindControl("txtEmail"), System.Web.UI.WebControls.TextBox)
        txtComp = DirectCast(e.Item.Cells(compCol).FindControl("txtComp"), System.Web.UI.WebControls.TextBox)
        ' Update label with new data
        lblUpdate.Text = "Row: " & e.Item.ItemIndex & " has been updated with values of: Name=" & cmbName.TextBox.Value & ", Email= " & txtEmail.Text & ", Company= " & txtComp.Text
        lblUpdate.Visible = True
        DataGrid1.EditItemIndex = -1
        BindGrid()
    End Sub

    Private Sub DataGrid1_CancelCommand(ByVal source As Object, ByVal e As System.Web.UI.WebControls.DataGridCommandEventArgs) Handles DataGrid1.CancelCommand
        ' On a cancel request, return datagrid to non-edit mode.
        DataGrid1.EditItemIndex = -1
        BindGrid()
    End Sub

    Protected Function GetInitialDataSource(ByVal pageSize As Integer) As DataSet
        ' Called from within the aspx page using databind syntax
        GetInitialDataSource = GetComboDs(pageSize, "a", 0, "")
    End Function

    Private Function GetComboDs(ByVal PageSize As Integer, ByVal SubString As String, ByVal CurrentRecord As Integer, ByVal LastString As String) As DataSet
        Dim dbConn As OleDbConnection
        Dim dbAdapter As OleDbDataAdapter
        Dim ds As DataSet
        Dim serverPath As String = Server.MapPath("")

        ' Create a DB connection to the MDB.
        dbConn = New OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" & serverPath & dbPath)

        ' Create a dataset and add the table to it.
        ds = New DataSet
        ds.Tables.Add("tblCustomers")
        ' Fill the dataset with data.  Match the query to the substring and only fetch the page
        ' starting at CurrentRecord.
        dbAdapter = New OleDbDataAdapter("SELECT TOP " & PageSize & " * FROM tblCustomers WHERE ContactName > '" & LastString & "' AND ContactName LIKE '" & SubString & "%' ORDER BY ContactName", dbConn)
        dbAdapter.Fill(ds, "tblCustomers")
        Return ds
    End Function

        Private Sub cmbName_GetPage(ByVal sender As Object, ByVal e As Nitobi.ComboGetPageEventArgs)

            ' Getpage event handler. This will send a new page of data to combobox.
            e.NextPage = GetComboDs(e.PageSize, e.SearchSubstring, e.StartingRecordIndex, e.LastString)
        End Sub

        Private Sub cmbName_Select(ByVal sender As Object, ByVal e As EventArgs)

            ' Called when a name is selected from cmbName.
            Dim txtEmail, txtComp As System.Web.UI.WebControls.TextBox
            Dim cmbName As Nitobi.Combo = Nothing
            ' Retrieving the combobox from sender
            cmbName = DirectCast(sender, Nitobi.Combo)
            ' Using the sender object to retrieve its parent row.
            Dim dgi As DataGridItem = DirectCast(cmbName.Parent.Parent, DataGridItem)
            ' Using FindControl to retrieve references to both textboxes
            txtEmail = DirectCast(dgi.FindControl("txtEmail"), System.Web.UI.WebControls.TextBox)
            txtComp = DirectCast(dgi.FindControl("txtComp"), System.Web.UI.WebControls.TextBox)
            If (cmbName.SelectedItem Is Nothing) Then
                ' Retrieve associated email and company name
                txtEmail.Text = cmbName.SelectedRowValues(emailCol)
                txtComp.Text = cmbName.SelectedRowValues(compCol)
            End If
        End Sub

        Private Sub BindCombo(ByVal curRow As Integer)
            ' This function is called on each postback caused by the select or getpage events. 
            ' It is necessary to rebind the combobox on each postback.
            Dim cmbName As Nitobi.Combo
            ' Locate the row being edited and use FindControl function to retrieve combobox
            cmbName = DirectCast(DataGrid1.Items(curRow).FindControl("cmbName"), Nitobi.Combo)
            If (Not (cmbName Is Nothing)) Then
                ' Bind combobox to appropriate datasource
                cmbName.DataSource = GetComboDs(cmbName.List.PageSize, "a", 0, "")
                ' Bind comboxes events to appropriate event handlers
                Dim GetPageHandler As Nitobi.ComboGetPageEventHandler
                GetPageHandler = AddressOf Me.cmbName_GetPage
                AddHandler cmbName.GetPage, GetPageHandler

                Dim SelectHandler As System.EventHandler
                SelectHandler = AddressOf Me.cmbName_Select
                AddHandler cmbName.Select, SelectHandler

            End If
        End Sub
End Class

End Namespace
