Imports System.Data.OleDb

Public Class ComboUC
    Inherits System.Web.UI.UserControl

    Protected dbConn As OleDbConnection
    Protected countryAdapter As OleDbDataAdapter
    Protected provinceAdapter As OleDbDataAdapter
    Protected ds As DataSet

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub
    Public WithEvents StAddress As System.Web.UI.WebControls.TextBox
    Public WithEvents City As System.Web.UI.WebControls.TextBox
    Public WithEvents Country As Nitobi.Combo
    Public WithEvents Province As Nitobi.Combo

    'NOTE: The following placeholder declaration is required by the Web Form Designer.
    'Do not delete or move it.
    Private designerPlaceholderDeclaration As System.Object

    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
    End Sub

#End Region

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' Retrieve the current path of the ASPX page.
        Dim serverPath As String = ""
        serverPath = Server.MapPath(serverPath)

        ' Create a DB connection to the MDB.
        dbConn = New OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" & serverPath & "\data\countryProvince.mdb")

        ' Create a dataset and add the tables to it.
        ds = New DataSet
        ds.Tables.Add("tblCountries")
        ds.Tables.Add("tblProvinces")

        ' Fill the tables from the dataset with the data from the database.
        countryAdapter = New OleDbDataAdapter("SELECT * FROM tblCountries", dbConn)
        countryAdapter.Fill(ds.Tables("tblCountries"))

        provinceAdapter = New OleDbDataAdapter("SELECT * FROM tblProvinces", dbConn)
        provinceAdapter.Fill(ds.Tables("tblProvinces"))

        ' Set the Combo's Datasources
        Me.Country.DataSource = ds.Tables("tblCountries").DefaultView
        Me.Province.DataSource = ds.Tables("tblProvinces").DefaultView

        If (Me.Country.TextValue.CompareTo("[Choose Country]") = 0) Then
            ' just an invalid value to ensure that no province is shown
            ds.Tables("tblProvinces").DefaultView.RowFilter = "CountryID=-1"
        Else
            ds.Tables("tblProvinces").DefaultView.RowFilter = String.Concat("CountryID = ", Me.Country.SelectedRowValues(0))
        End If

        ' Bind the datasources to the controls.
        If (Not Me.IsPostBack And Not Me.Province.IsPaging) Then
            Me.DataBind()
        End If
    End Sub

    Private Sub Province_GetPage(ByVal sender As Object, ByVal e As Nitobi.ComboGetPageEventArgs) Handles Province.GetPage
        ' When user changes the value of country, the old value of the province must be deleted.
        Me.Province.ClearSelectedValues()

        Me.ds.Tables("tblProvinces").DefaultView.RowFilter = "CountryID=" & e.SearchSubstring
        e.NextPage = ds.Tables("tblProvinces").DefaultView
    End Sub
End Class
