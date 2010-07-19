Imports System.Collections
Imports System.ComponentModel
Imports System.Data
Imports System.Drawing
Imports System.Web
Imports System.Web.SessionState
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports System.Web.UI.HtmlControls
Imports Nitobi.Components.Grid
Imports Nitobi.Components.Model





Partial Class index
    Inherits System.Web.UI.Page
    Public Shared dbConn As OleDbConnection

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

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' It is important that the key be specified.
        EditorsGrid.DataSources.PrimaryData.DatasourceStructure.Keys.Add("ProductID")
    End Sub

    Private Sub EditorsGrid_GetData(ByVal sender As Object, ByVal e As Nitobi.Components.Grid.GetEventArgs) Handles EditorsGrid.GetData
        Dim dAdapter As OleDbDataAdapter
        Dim serverPath As String = ""
        serverPath = Server.MapPath(serverPath)
        dbConn = New OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" & serverPath & "\data\generalproducts.mdb")

        dbConn.Open()
        Dim cmd As OleDbCommand
        cmd = New OleDbCommand("select count(*) from tblProducts", dbConn)
        Dim count As Integer
        count = DirectCast(cmd.ExecuteScalar(), Int32)

        If (count > e.NumRowsRequested + e.StartingRecordIndex) Then
            count = e.NumRowsRequested + e.StartingRecordIndex
        End If
        Dim numRows As Integer = count - e.StartingRecordIndex
        Dim query As String
        If (EditorsGrid.RowsPerPage = 0) Then EditorsGrid.RowsPerPage = 20
        Dim sortField As String = "ProductID"
        Dim sortOrder As SortOrder = sortOrder.Asc
        If ((Not e Is Nothing) AndAlso (Not e.Sort Is Nothing) AndAlso (Not e.Sort.SortField Is Nothing)) Then
            sortField = e.Sort.SortField
            sortOrder = e.Sort.SortOrder
        End If

        Dim ReverseDirection As String
        If (sortOrder <> sortOrder.Asc) Then ReverseDirection = sortOrder.Desc.ToString() Else ReverseDirection = sortOrder.Asc.ToString()
        Dim tableName As String
        If (e.DataSourceId = DataSources.PrimaryDataSourceId) Then

            ' The reason for this overly complicated SQL query is due to the fact that MDB does not support proper paging.
            ' Using a server such as Oracle or MySql would eliminate the complexity of this query, and most of the 
            ' preceeding code.
            query = "SELECT * FROM (SELECT TOP " & numRows & " * FROM (SELECT TOP " & count & "  * FROM tblProducts ORDER BY " & sortField & " " & sortOrder.ToString() & ") ORDER BY " & sortField & " " & ReverseDirection & ") ORDER BY " & sortField & " " & sortOrder.ToString()
            tableName = "tblProducts"
        Else

            query = "SELECT * FROM tblProductCategories"
            If (e.SearchString <> "") Then
                query &= " WHERE ProductCategoryName LIKE '" & e.SearchString & "%'"
            End If
            tableName = "tblProductCategories"

        End If

        ' Fill the tables from the dataset with the data from the database.
        Dim ds As DataSet = New DataSet
        ds.Tables.Add(tableName)
        dAdapter = New OleDbDataAdapter(query, dbConn)
        dAdapter.Fill(ds.Tables(tableName))
        e.DataSource = ds
    End Sub

    ' <summary>
    ' Executed when the row is updated. This allows us to capture the 
    ' key assigned by the database.
    ' </summary>
    Protected Shared Sub RowUpdated(ByVal sender As Object, ByVal args As OleDbRowUpdatedEventArgs)
        Dim idCMD As OleDbCommand = New OleDbCommand("SELECT @@IDENTITY", dbConn)
        If (args.StatementType = StatementType.Insert) Then
            Dim newID As Integer = DirectCast(idCMD.ExecuteScalar(), Integer)
            args.Row("ProductID") = newID
        End If
    End Sub

    Private Sub EditorsGrid_SaveData(ByVal sender As Object, ByVal e As Nitobi.Components.Grid.GridSaveEventArgs) Handles EditorsGrid.SaveData
        Dim dAdapter As OleDbDataAdapter = New OleDbDataAdapter
        Dim serverPath As String = ""
        serverPath = Server.MapPath(serverPath)
        dbConn = New OleDbConnection("provider=Microsoft.Jet.OLEDB.4.0; data source=" + serverPath + "\data\generalproducts.mdb")
        dAdapter.SelectCommand = New OleDbCommand("SELECT * FROM tblProducts", dbConn)
        ' The following line required for updates and inserts.
        Dim cb As OleDbCommandBuilder = New OleDbCommandBuilder(dAdapter)
        Dim ds As DataSet = New DataSet
        ds.Tables.Add("tblProducts")
        dAdapter.TableMappings.Add("Table", "tblProducts")
        dbConn.Open()
        dAdapter.Fill(ds.Tables("tblProducts"))
        ds.Tables("tblProducts").PrimaryKey = New DataColumn() {ds.Tables("tblProducts").Columns("ProductID")}
        ' Ensure that we capture the key assigned by the db in order to send it back to the grid.
        AddHandler dAdapter.RowUpdated, AddressOf index.RowUpdated
        Dim ht As Hashtable = New Hashtable
        Dim MDB_WORKAROUND As Integer = 0, i As Integer = 0
        Dim gRow As Row
        For Each gRow In EditorsGrid.DataSources.PrimaryData.Rows
            Dim xac As UpdateAction = gRow.EditAction
            Select Case xac

                Case UpdateAction.INSERT

                    Dim r As DataRow = ds.Tables("tblProducts").NewRow()
                    ' The first field is an auto-increment field.
                    r(0) = MDB_WORKAROUND
                    MDB_WORKAROUND = MDB_WORKAROUND - 1
                    ' Keep the row so that we can update the key later.
                    ht(i) = r

                    Dim j As Integer
                    For j = 1 To gRow.Count - 1

                        If (Not ds.Tables("tblProducts").Columns(j).AutoIncrement) Then
                            r.Item(j) = gRow(j)
                        End If
                    Next j
                    ds.Tables("tblProducts").Rows.Add(r)


                Case UpdateAction.DELETE

                    Dim r As DataRow = ds.Tables("tblProducts").Rows.Find(gRow(0))
                    r.Delete()


                Case UpdateAction.UPDATE

                    Dim r As DataRow = ds.Tables("tblProducts").Rows.Find(gRow(0))
                    Dim j As Integer
                    For j = 0 To gRow.Count - 1
                        r(j) = gRow(j)
                    Next j

            End Select
            i = i + 1
        Next gRow

        dAdapter.Update(ds.Tables("tblProducts"))

        ' Update the rows that were inserted with the keys that were returned
        ' by the db.
        Dim rs As Rows = EditorsGrid.DataSources.PrimaryData.Rows
        Dim key As Integer
        For Each key In ht.Keys
            Dim s As String = DirectCast(ht(key), DataRow)(0).ToString()
            rs(key)(0) = s
        Next

        dbConn.Close()
    End Sub
End Class


