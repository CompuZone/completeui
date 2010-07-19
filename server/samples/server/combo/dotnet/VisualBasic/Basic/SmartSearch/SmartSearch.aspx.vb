Imports System.Data.OleDb

Public Class SmartSearch
    Inherits System.Web.UI.Page

    Protected dbConn As OleDbConnection
    Protected dbAdapter As OleDbDataAdapter
    Protected ds As DataSet
    Protected WithEvents MyCombo As Nitobi.Combo
    Protected WithEvents submitButton As System.Web.UI.WebControls.Button
    Protected submitLabel As System.Web.UI.WebControls.Label

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub

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
        Me.myCombo.DataSource = Me.GetPage(Me.myCombo.List.PageSize, "a", 0, "")

        ' Bind the datasources to the controls.
        If (Not Me.IsPostBack) Then
            Me.DataBind()
        End If
    End Sub

    ' <summary>
    ' Returns a page of data from the database.
    ' </summary>
    ' <param name="PageSize">Number of records in the page.</param>
    ' <param name="SubString">The substring to match if the user is trying to find an entry</param>
    ' <param name="CurrentRecord">The index of CurrentRecord the combo wants. This is 
    ' equal to the number of records the combo currently has cached, i.e., this number
    ' does not refer to an index in your database.</param>
    ' <param name="LastString">The last string in the Combo's local data</param>
    ' <returns>A dataset with the requested page.</returns>
    Private Function GetPage(ByVal PageSize As Integer, ByVal SubString As String, ByVal CurrentRecord As Integer, ByVal LastString As String) As DataSet

        ' Retrieve the current path of the ASPX page.
        Dim serverPath As String = ""
        serverPath = Server.MapPath(serverPath)

        ' Create a DB connection to the MDB.
        dbConn = New OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" & serverPath & "\data\folders.mdb")

        ' Create a dataset and add the table to it.
        ds = New DataSet
        ds.Tables.Add("tblFolderInfo")

        ' LastString is the last element in the last page received, so we take data only from after it.
        ' The knowledgebase has more information on constructing SQL queries for different database technologies
        dbAdapter = New OleDbDataAdapter("SELECT TOP " & PageSize & " * FROM tblFolderInfo WHERE FolderAbsolute LIKE '%" & SubString & "%' ORDER BY AccessAttempts", dbConn)
        dbAdapter.Fill(ds, "tblFolderInfo")

        GetPage = ds
    End Function


    Private Sub MyCombo_GetPage(ByVal sender As Object, ByVal e As Nitobi.ComboGetPageEventArgs) Handles MyCombo.GetPage
        e.NextPage = Me.GetPage(e.PageSize, e.SearchSubstring, e.StartingRecordIndex, e.LastString)
    End Sub

    Protected Sub submitButton_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles submitButton.Click
        submitLabel.Text = MyCombo.TextValue
    End Sub
End Class
