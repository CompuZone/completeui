<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="n" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<% String test = "fdsdf"; %>
<n:grid id="ResizeGrid1" 
	  width="630"
	  height="200"
	  mode="localnonpaging" 
	  datasourceid="data" 
	  toolbarenabled="true"
	  gridresizeenabled="true"
	  autosaveenabled="false"
	  >
		<n:datasources>
	  		<n:datasource id="data">
	  			<n:datasourcestructure fieldnames="ContactName|ContactEmail|Checkbox" keys="ContactName"></n:datasourcestructure>
	  			<n:data>
	  				<n:e data="{'xi': '1',
	  							'a': 'Tammara Farley',
	  							'b': 'tamfarley@halifax.com',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '2',
	  							'a': 'Dwana Barton',
	  							'b': 'dwabarton@ebadev.com',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '3',
	  							'a': 'Lucas Blake',
	  							'b': 'lblak@freeinterweb.com',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '4',
	  							'a': 'Lilli Bender',
	  							'b': 'lbender@sharesync.com',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '5',
	  							'a': 'Emilia Foster',
	  							'b': 'efoster@extreme.net',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '6',
	  							'a': 'Vernice Young',
	  							'b': 'veyoung@glue.it.com',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '7',
	  							'a': 'Cyrstal House',
	  							'b': 'chouse@universalweb.com',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '8',
	  							'a': 'Lindsay Cohen',
	  							'b': 'lindsaycohen@jitterbug.org',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '9',
	  							'a': 'Amalia Oneal',
	  							'b': 'amaoneal@flashpoint.org',
	  							'c': 'yes'}"></n:e>
	  				<n:e data="{'xi': '10',
	  							'a': 'Pasty Rosario',
	  							'b': 'prosario@sfx.ca',
	  							'c': 'yes'}"></n:e>
	  			</n:data>
	  		</n:datasource>
	  	</n:datasources>
	  	<n:columns>
	  		<n:textcolumn label="<%= test %>" xdatafld="ContactName" width="200"></n:textcolumn>
	  		<n:textcolumn label="Contact Email" xdatafld="ContactEmail" width="200"></n:textcolumn>
	  		<n:textcolumn label="Checkbox" xdatafld="Checkbox" sortenabled="false" width="75">
				<n:checkboxeditor datasource="[{value:'yes',display:'Yes!'},{value:'no',display:'No'}]" checkedvalue="yes" uncheckedvalue="no" displayfields="display" valuefield="value"></n:checkboxeditor>
			</n:textcolumn>
	  	</n:columns>
</n:grid>
</body>
</html>