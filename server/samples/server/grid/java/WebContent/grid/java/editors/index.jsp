<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>

<title>Nitobi Grid Demos - Editors</title>
</head>
<body>
      <p class="intro">Each column in a Grid can have its own editor and datatype. An editor is 
      something that changes data, like a textbox, or a checkbox. Certain kinds of editors can change 
      data from different data types. For example textboxes and lookups can edit dates, 
      alphanumeric strings, and numeric strings.  This sample demonstrates each of the available
      editors in Nitobi Grid.</p>
      <ul class="instructions">
      	<li>Edit a cell by double-clicking on it with the mouse, or navigate to the cell and begin typing. </li>
      	<li>Pressing <code>ENTER</code> will signal that your edit has completed.
      	<li>Pressing <code>ESC</code> will cancel your edit.
      </ul>
      <p class="notes">Saving is not enabled for this sample</p>
	<ntb:grid id="EditorsGrid"
		width="630"
		height="407"
		mode="livescrolling"
		gethandler="get"
		toolbarenabled="true"
		rowhighlightenabled="true"
		toolkitjsurl="../../../common/script/nitobi.toolkit.js"
		componentcssurl="../../../common/style/nitobi.grid.css"
		componentjsurl="../../../common/script/nitobi.grid.js">
		  <ntb:columns>
			<ntb:textcolumn		label="Image"		xdatafld="ProductIcon"	sortenabled="false"	width="75" initial="docicon.gif">
				<ntb:imageeditor></ntb:imageeditor>
			</ntb:textcolumn>
			<ntb:textcolumn		label="Checkbox"	xdatafld="BulkAction"	sortenabled="false"	width="75">
				<ntb:checkboxeditor datasource="[{value:'yes',display:'Yes!'},{value:'no',display:'No'}]" checkedvalue="yes" uncheckedvalue="no" displayfields="display" valuefield="value"></ntb:checkboxeditor>
			</ntb:textcolumn>
			<ntb:textcolumn		label="Text"		xdatafld="ProductName"	width="200"></ntb:textcolumn>
			<ntb:textcolumn		label="Lookup"		xdatafld="ProductCategoryName" width="150">
				<ntb:lookupeditor  gethandler="lookup" displayfields="ProductCategoryName" valuefield="ProductCategoryName" ></ntb:lookupeditor>
			</ntb:textcolumn>
			<ntb:numbercolumn 	label="Number (with mask)"	xdatafld="ProductSku" mask="#,##0"	width="150"></ntb:numbercolumn>
			<ntb:numbercolumn 	label="Number (with currency mask)"	xdatafld="ProductPrice" mask="$#,##0.00"	width="150"></ntb:numbercolumn>
			<ntb:textcolumn 	label="Text Area"  	xdatafld="ProductQuantityPerUnit"   width="200"><ntb:textareaeditor></ntb:textareaeditor></ntb:textcolumn>
			<ntb:datecolumn 	label="Date"  		xdatafld="LastUpdated"		sortenabled="false"		mask="yyyy.MM.dd G 'at' hh:mm:ss z"	width="100"></ntb:datecolumn>
			<ntb:textcolumn 	label="Hyperlink"  	xdatafld="ProductLink"		sortenabled="false"  width="240"><ntb:linkeditor openwindow="true" ></ntb:linkeditor></ntb:textcolumn>
			<ntb:textcolumn 	label="Password"  	xdatafld="ProductPassword"	sortenabled="false"  width="240"><ntb:passwordeditor></ntb:passwordeditor></ntb:textcolumn>
		</ntb:columns>
	</ntb:grid>


</body>
</html>