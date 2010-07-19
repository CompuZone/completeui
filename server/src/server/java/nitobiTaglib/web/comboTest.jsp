<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Combo Test</title>
</head>
<body>

<n:combo id="combo1" mode="classic" initialsearch="Brent">
	<n:combotextbox width="175px" datafieldindex="0"></n:combotextbox>
	<n:combolist width="360px" height="200px" datasourceurl="combosampledata.xml" pagesize="15">
		<n:combocolumndefinition width="130px" headerlabel="Customer Name" datafieldindex="0"></n:combocolumndefinition>
		<n:combocolumndefinition width="200px" datafieldindex="1"></n:combocolumndefinition>
	</n:combolist>
</n:combo>

<n:combo id="combo2" mode="classic" initialsearch="Brent">
	<n:combotextbox width="175px" datafieldindex="0" editable="false"></n:combotextbox>
	<n:combolist width="360px" height="200px" datasourceurl="combosampledata.xml" pagesize="15">
		<n:combocolumndefinition width="130px" headerlabel="Customer Name" datafieldindex="0"></n:combocolumndefinition>
		<n:combocolumndefinition width="200px" datafieldindex="1"></n:combocolumndefinition>
	</n:combolist>
</n:combo>

<n:combo id="myCombo" mode="unbound" >
  <n:combotextbox  datafieldindex="0" ></n:combotextbox>
  <n:combolist width="200px" allowpaging="false" height="180px" >
    <n:combocolumndefinition width="100px" datafieldindex="0"></n:combocolumndefinition>
    <n:combocolumndefinition width="70px" datafieldindex="1"></n:combocolumndefinition>
  </n:combolist>
  <n:combovalues fields="City|Population">

    <n:combovalue data="{a:'Vancouver', b:'3,000,000'}" ></n:combovalue>
    <n:combovalue data="{a:'Toronto', b:'4,500,000'}" ></n:combovalue>
    <n:combovalue data="{a:'Ottawa', b:'1,000,000'}" ></n:combovalue>

  </n:combovalues>
</n:combo>
</body>
</html>