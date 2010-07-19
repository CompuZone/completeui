Public Class Unbound
    Inherits System.Web.UI.Page

    Protected data As SortedList
    Protected WithEvents myCombo As Nitobi.Combo

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
        data = New SortedList
        data("AR") = "Argentina"
        data("BF") = "Burkina Faso"
        data("CA") = "Canada"
        data("DE") = "Germany"
        data("FR") = "France"
        data("HK") = "Hong Kong"
        data("KZ") = "Kazakhstan"
        data("MX") = "Mexico"
        data("NP") = "Nepal"
        data("SA") = "Saudi Arabia"
        data("US") = "United States"

        ' TextField is what appears in the combo, and ValueField could be a more machine-readable value, ID# etc.
        Me.myCombo.DataSource = data
        Me.myCombo.DataTextField = "Value"
        Me.myCombo.DataValueField = "Key"

        Me.DataBind()
    End Sub

    Private Sub myCombo_GetPage(ByVal sender As Object, ByVal e As Nitobi.ComboGetPageEventArgs) Handles myCombo.GetPage
        Me.myCombo.DataSource = data
    End Sub
End Class
