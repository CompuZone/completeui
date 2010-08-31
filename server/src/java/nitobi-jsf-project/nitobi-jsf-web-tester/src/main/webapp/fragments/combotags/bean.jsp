<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head><title>Combo Bean Sample</title>
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
</head>
<body>
<f:view>
    <div id="maincontent">
        <h1>Combo Box Bean Sample</h1>

        <p>
            This Combo Box takes its data from a JSF
            Managed Bean.Using a JSF managed bean, you can take advantage of scoping, implement
            simpler unit testing, and keep all your "page" data in one class. When
            taking your data from a bean, use the standard EL expressions as you would in
            any other JSF component.
        </p>

         <h:outputLabel for="managedBeanCombo" value="Managed Bean Combo: "/>
            <n:combo id="managedBeanCombo" theme="flex" mode="classic" initialSearch="James" autoInitialize="true">
                <n:comboTextBox dataFieldIndex="0" width="175px"/>
                <n:comboList width="360px" height="200px" pageSize="15" datasourceUrl="#{combobean.populateNames}">
                    <n:comboColumnDefinition width="130px" dataFieldIndex="0"/>
                    <n:comboColumnDefinition width="200px" dataFieldIndex="1"/>
                </n:comboList>
            </n:combo>

        <div class="instructions">
            <h3>JSP Code</h3>
            <code>
                <%
                    out.println(
                            "&lt;h:outputLabel for=\"managedBeanCombo\" value=\"Managed Bean Combo: \"/&gt;<br/>" +
                            "&lt;n:combo id=\"managedBeanCombo\" theme=\"flex\" mode=\"classic\" initialSearch=\"James\" autoInitialize=\"true\"&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboTextBox dataFieldIndex=\"0\" width=\"175px\"/&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboList width=\"360px\" height=\"200px\" pageSize=\"15\" datasourceUrl=\"#{combobean.populateNames}\"&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboColumnDefinition width=\"130px\" dataFieldIndex=\"0\"/&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;n:comboColumnDefinition width=\"200px\" dataFieldIndex=\"1\"/&gt;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;/n:comboList&gt;<br/>" +
                            "&lt;/n:combo&gt"
                    );
                %>
            </code>
        </div>

        <div class="instructions">
            <h3>Managed Bean Code</h3>
            <code>
                <%
                    out.println(
                            "public String populateNames(NitobiGetEvent event) {<br/>" +
                            "<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;Map parameterMap = event.getParams();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;GetHandler gethandler = event.getGethandler();<br/>" +
                            "<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;ComboParams params = new ComboParams(<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(String) parameterMap.get(ComboParams.COMBO_ID),<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(String) parameterMap.get(ComboParams.LAST_STRING),<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(String) parameterMap.get(ComboParams.PAGE_SIZE),<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(String) parameterMap.get(ComboParams.SEARCH_SUBSTRING),<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(String) parameterMap.get(ComboParams.STARTING_RECORD_INDEX));<br/>" +
                            "<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;/*<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;* Grab the combo parameters from the base class<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;*/<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;ResultSet rs = null;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;Statement st = null;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;Connection conn = null;<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;try {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// get the database connection<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class.forName(\"com.mysql.jdbc.Driver\").newInstance();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn = DriverManager.getConnection(\"jdbc:mysql://localhost/nitobi_testdb_v1?user=nitobi\");<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;st = conn.createStatement();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String newQuery = \"SELECT * FROM tblcontacts3k WHERE ContactName LIKE '\"<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ params.getSearchSubstring()<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ \"%' LIMIT \"<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ params.getStartingRecordIndex()<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ \",\"<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ params.getPageSize();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rs = st.executeQuery(newQuery);<br/>" +
                            "<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// The GetHandler acts as a intermediary class to help you<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// go from a ResultSet to XML response.  Here we populate the handler<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// from the SQL ResultSet.  You can also choose to define the fields<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// and add the records manually. Using method expressions, you don't<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// need to write the results back manually; it's done for you.<br/>" +
                            "<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gethandler.populate(rs, \"ContactID\");<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;} catch (Exception ex) {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gethandler.setErrorMessage(ex.getMessage());<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;} finally {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// clean up<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (rs != null) {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rs.close();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (st != null) {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;st.close();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (conn != null) {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.close();<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} catch (SQLException e) {<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;}<br/>" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;return null;<br/>" +
                            "}"
                    );
                %>

            </code>
        </div>



    </div>
</f:view>
</body>
</html>