<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="CalendarDateRange.aspx.cs" Inherits="calendar_CalendarDateRange" MasterPageFile="~/NitobiExample.master" %>

<%@ Register Assembly="NitobiControls" Namespace="Nitobi" TagPrefix="ntb" %>
<asp:Content ID="yes" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript">
function setMin(e)
{
	var start = e.source;
	var minDate = start.getSelectedDate();
	nitobi.base.DateMath.add(minDate, 'd', 1);
	var end = nitobi.getComponent("<%= endCal.ClientID %>");
	end.setMinDate(minDate);
	end.render();
}

function setMax(e)
{
	var end = e.source;
	var maxDate = end.getSelectedDate();
	nitobi.base.DateMath.subtract(maxDate, 'd', 1);
	var start = nitobi.getComponent("<%= startCal.ClientID %>");
	start.setMaxDate(maxDate);
	start.render();
}
</script>
<h2>Calendar Date Range</h2>
<p>The Nitobi Calendar comes replete with a robust javascript API. Using that API, it is easy to wire together two (or more) Calendar components to create a composite date range selector.</p>
<p>Using the javascript API, we are going to set the mindate of the second Calendar to be the selected date of the first, and vice-versa as well (so selecting a date in the second
Calendar will set the maximum date of the first). That way, we can ensure the selected range will be valid.</p>
    <ntb:Calendar ID="startCal" Mode="Standard" runat="server" Theme="Flex" Visible="true" >
        <ClientEvents
            ValidDateSelected="setMin(eventArgs);"
        />
    </ntb:Calendar>
    <ntb:Calendar ID="endCal" Mode="Standard" runat="server" Theme="Flex" Visible="true">
        <ClientEvents
            ValidDateSelected="setMax(eventArgs);"
        />
    </ntb:Calendar>
</asp:Content>
