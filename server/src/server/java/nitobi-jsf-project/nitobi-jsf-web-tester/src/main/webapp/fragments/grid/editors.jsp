<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@taglib prefix="n" uri="http://www.nitobi.com/jsf" %>
<%@taglib prefix="ntb" uri="http://www.nitobi.com/jsf" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<f:view>
<div id="maincontent">
<p>All the editor types have been completed for the JSF platform, and they work pretty much the same way you are used to :)</p>
<n:grid id="SimpleGrid"
        autoInitialize="true"
        mode="locallivescrolling"
        width="700"
        dataSourceId="data"
        toolbarEnabled="true"
        theme="nitobi">
	<n:dataSources>
		<n:dataSource id="data">
			<n:dataSourceStructure fieldNames="ContactName|ContactEmail|JobTitle|Image|Homepage|Country|Citizen|Password|EmpNum|Salary|StartDt" keys="ContactName"></n:dataSourceStructure>
			<n:data>
				<n:e data="{xi:'97382', a:'Tammara Farley', b:'tamfarley@halifax.com', c:'Media Director', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'yes',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97383', a:'Dwana Barton', b:'dwabarton@ebadev.com', c:'Budget Analyst', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'yes',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97384', a:'Mercedes Carpenter', b:'mcarpenter@purosync.net', c:'Finance Manager', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'yes',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97385', a:'Lucas Blake', b:'lblak@freeinterweb.com', c:'Marketing Manager', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'no',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97386', a:'Lilli Bender', b:'lbender@sharesync.com', c:'Purchaser', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'no',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97387', a:'Jose Bishop', b:'josebishop@voxcom.ca', c:'Branch Manager', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'no',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97388', a:'Emilia Foster', b:'efoster@extreme.net', c:'Payroll Manager', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'yes',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97389', a:'Vernice Young', b:'veyoung@glue.it.com', c:'Developer', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'no',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
				<n:e data="{xi:'97390', a:'Cyrstal House', b:'chouse@universalweb.com', c:'Product Manager', d:'docicon.gif', e:'http://google.com', f:'Canada',g:'yes',h:'password123',i:'62235',j:'78231.98',k:'2008-05-04 18:33:44'}"></n:e>
			</n:data>
		</n:dataSource>
	</n:dataSources>
		<n:columns>
			
			<n:textColumn label="Contact Name" xmlDataField="ContactName" width="100">
				<n:textareaEditor onChangeEvent="alert('value changed');"/>
			</n:textColumn>
			<n:textColumn label="Email" xmlDataField="ContactEmail" width="150"></n:textColumn>
			<n:textColumn label="Title" xmlDataField="ContactName" width="100"></n:textColumn>
			<n:textColumn label="Image" xmlDataField="Image" width="40" sortEnabled="false" initial="docicon.gif">
				<n:imageEditor/>
			</n:textColumn>
			<n:textColumn label="Homepage" width="150" xmlDataField="Homepage" >
				<n:linkEditor openWindow="true"/>
			</n:textColumn>
			<n:textColumn label="Country Lookup" xmlDataField="Country" initial="USA" width="100">
				<n:lookupEditor delay="100"  getHandler="../../servletComboGet" displayFields="Country" valueField="Country" ></n:lookupEditor>
			</n:textColumn>
			<n:textColumn label="Citizen" xmlDataField="Citizen" width="75">
				<n:checkBoxEditor checkedValue="yes" uncheckedValue="no" valueField="value" dataSource="[{value:'yes',display:'Yes!'},{value:'no',display:'No'}]" displayFields="display" />
			</n:textColumn>
			<n:textColumn label="Password" xmlDataField="Password" width="75">
				<n:passwordEditor/>
			</n:textColumn>
			<n:numberColumn label="Employee Number" width="50" xmlDataField="EmpNum" mask="#"></n:numberColumn>
			<n:numberColumn label="Salary" xmlDataField="Salary" width="100" mask="$#,##0.00"></n:numberColumn>
			<n:dateColumn xmlDataField="StartDt" width="250" label="Start Date" mask="yyyy.MM.dd G 'at' hh:mm:ss z" ></n:dateColumn>
		</n:columns>
</n:grid>
</div>
</f:view>
</body>
</html>