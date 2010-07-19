Public Class _default
    Inherits System.Web.UI.Page

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub
    Protected WithEvents btnSubmit As System.Web.UI.WebControls.Button
    Protected WithEvents Addresses As System.Web.UI.WebControls.Label
    Protected WithEvents Form1 As System.Web.UI.HtmlControls.HtmlForm

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
        'Put user code to initialize the page here
    End Sub

    Private Sub btnSubmit_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnSubmit.Click
        Dim residentialAddress As ComboUC = DirectCast(Me.FindControl("ResidentialAddress"), ComboUC)
        Dim mailingAddress As ComboUC = DirectCast(Me.FindControl("MailingAddress"), ComboUC)
        Addresses.Text = "Residential Address<BR>" & _
              "St. Address: " & residentialAddress.StAddress.Text & "<BR>" & _
              "City: " & residentialAddress.City.Text & "<BR>" & _
              "Province: " & residentialAddress.Province.TextValue & "<BR>" & _
              "Country: " & residentialAddress.Country.TextValue & "<BR>" & _
              "Mailing Address<BR>" & _
              "St. Address: " & mailingAddress.StAddress.Text & "<BR>" & _
              "City: " & mailingAddress.City.Text & "<BR>" & _
              "Province: " & mailingAddress.Province.TextValue & "<BR>" & _
              "Country: " & mailingAddress.Country.TextValue & "<BR>"
    End Sub
End Class
