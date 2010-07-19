<%--
  User: eric
  Date: Mar 28, 2008
  Time: 6:11:04 AM
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head><title>Combo Box Servlet and Calendar Form Sample</title>
    <link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
</head>
<body>
<div id="maincontent">
    <h1>Combo Box Servlet and Calendar Form Sample</h1>

    <p>
        This Combo Box demonstrates the ease of including Nitobi components with traditional JSF components. Although
        the list of
        possible combo items are in this case taken from a Servlet, notice the selected values get included with the
        rest
        of the input for processing and ultimately for injection into the backing bean. The list of possible values
        could just as easily be taken from another (or the same) bean as demonstrated in the Bean Backed page.
    </p>

    <p>
        There is nothing special you need to do in the bean other than declaring a member variable for the set value of
        the selected DatePicker or Combo value (and provide a getter/setter, of course).
    </p>
    <p>
        Notice that if you go away from this page and come back, the values will still set in the Combo Box fields just
        as they do in the h:inputText fields. The state of the selected data in the Combo box is in sync with that of the
        managed bean.
    </p>


    <f:view>
        <h:outputFormat escape="false" value="
        <div>
            <ul>
                <li>First Name: #{signup_backing.firstName}</li>
                <li>Last Name: #{signup_backing.lastName}</li>
                <li>Supervisor: #{signup_backing.supervisor}</li>
                <li>Country of Origin: #{signup_backing.countryOfOrigin}</li>
                <li>City: #{signup_backing.city}</li>
                <li>Date of Birth: #{signup_backing.dateOfBirth}</li>
            </ul>
        </div>

        "/>

        <div>
            <h:form id="signupForm">
                <h:panelGrid columns="3">
                    <f:facet name="header">
                        <h:outputText value="Nitobi JSF components within an h:panelGrid tag"/>
                    </f:facet>

                    <!-- First Name -->
                    <h:outputLabel for="firstNameInput" value="First Name"/>
                    <h:inputText value="#{signup_backing.firstName}" required="true"
                                 requiredMessage="Please enter your first name." label="Name" id="firstNameInput"/>
                    <h:message for="firstNameInput"/>

                    <!-- Last Name -->
                    <h:outputLabel for="lastNameInput" value="Last Name"/>
                    <h:inputText value="#{signup_backing.lastName}" required="true"
                                 requiredMessage="Please enter your last name." label="Name" id="lastNameInput"/>
                    <h:message for="lastNameInput"/>

                    <!-- Supervisor -->
                    <h:outputLabel for="supervisor" value="Supervisor"/>
                    <n:combo id="supervisor" theme="flex" value="#{signup_backing.supervisor}" mode="classic"
                             autoInitialize="true">
                        <n:comboTextBox dataFieldIndex="0" width="175px"/>
                        <n:comboList width="360px" height="200px" pageSize="15" datasourceUrl="servletComboGet">
                            <n:comboColumnDefinition width="130px" dataFieldIndex="0"/>
                            <n:comboColumnDefinition width="200px" dataFieldIndex="1"/>
                        </n:comboList>
                    </n:combo>
                    <h:message for="supervisor"/>

                    <!-- Country of Origin -->
                    <h:outputLabel for="countryOfOrigin" value="Country of Origin"/>
                    <n:combo id="countryOfOrigin" theme="flex" value="#{signup_backing.countryOfOrigin}" mode="classic"
                             initialSearch="#{signup_backing.defaultCountryOfOrigin}" autoInitialize="true">
                        <n:comboTextBox dataFieldIndex="0" width="175px"/>
                        <n:comboList width="360px" height="200px" pageSize="15" datasourceUrl="countryCombo">
                            <n:comboColumnDefinition width="130px" dataFieldIndex="0"/>
                            <n:comboColumnDefinition width="200px" dataFieldIndex="1"/>
                        </n:comboList>
                    </n:combo>
                    <h:message for="countryOfOrigin"/>

                    <!-- City of Residency -->
                    <h:outputLabel for="city" value="City"/>
                    <n:combo id="city"
                             theme="flex"
                             value="#{signup_backing.city}"
                             mode="classic"
                             autoInitialize="true">
                        <n:comboTextBox dataFieldIndex="0" width="175px"/>
                        <n:comboList width="360px" height="200px" pageSize="15" datasourceUrl="citiesCombo">
                            <n:comboColumnDefinition width="130px" dataFieldIndex="0"/>
                            <n:comboColumnDefinition width="200px" dataFieldIndex="2"/>
                        </n:comboList>
                    </n:combo>
                    <h:message for="city"/>

                    <!-- Date of Birth -->
                    <h:outputLabel for="dateOfBirth" value="Date of Birth"/>
                    <n:datePicker id="dateOfBirth" selectedDate="#{signup_backing.dateOfBirth}" value="#{signup_backing.dateOfBirth}"
                                  theme="flex"
                                  autoInitialize="true">
                        <n:dateInput />
                        <n:calendar effectEnabled="true" monthColumns="2" monthRows="1"/>
                    </n:datePicker>
                    <h:message for="dateOfBirth"/>


                    <f:facet name="footer">
                        <h:commandButton action="#{signup_backing.submit}" value="Submit"/>
                    </f:facet>
                </h:panelGrid>
            </h:form>
        </div>
    </f:view>


</div>
</body>
</html>