/**
 * Globals
 *
 */
var editorMap = {}
editorMap["none"] = "";
editorMap["checkbox"] = "<ntb:checkboxeditor></ntb:checkboxeditor>";
editorMap["image"] = "<ntb:imageeditor></ntb:imageeditor>";
editorMap["lookup"] = "<ntb:lookupeditor></ntb:lookupeditor>";
editorMap["listbox"] = "<ntb:listboxeditor></ntb:listboxeditor>";
editorMap["password"] = "<ntb:passwordeditor></ntb:passwordeditor>";
editorMap["link"] = "<ntb:linkeditor></ntb:linkeditor>";
editorMap["textarea"] = "<ntb:textareaeditor></ntb:textareaeditor>";
var columnRegExp =/<ntb:(?:text|date|number)column.*?>[\s\S]*?<\/ntb:(?:text|date|number)column>/gi;

var MODE_DIV = document.mode_div.document;
var GRID_PROPS = document.grid_props.document;
var COLUMNS_DIV = document.columns_div.document;
var COLUMN_PROPS = document.column_props.document;
//var EDITORS_DIV = document.editors_div.document;

var MODE_LIST = MODE_DIV.mode_list;
var WIDTH_INPUT = GRID_PROPS.width_input;
var HEIGHT_INPUT = GRID_PROPS.height_input;
var GETHANDLER_INPUT = GRID_PROPS.gethandler_input;
var SAVEHANDLER_INPUT = GRID_PROPS.savehandler_input;

var COL_LABEL_INPUT = COLUMN_PROPS.label_input;
var COL_DATAFLD_INPUT = COLUMN_PROPS.xdatafld_input;
var COL_WIDTH_INPUT = COLUMN_PROPS.width_input;

var COLUMNS_LIST = COLUMNS_DIV.columns_list;

function displayHelp()
{
	dw.browseDocument("http://support.nitobi.com/?build=6087&product=all&type=art&a=10344");
}

function canInspectSelection()
{
	var currentDOM = dw.getDocumentDOM();
	var offsets = currentDOM.getSelection();
	var theSelection = currentDOM.offsetsToNode(offsets[0],offsets[0]+1);
	
	if (theSelection.nodeType == Node.ELEMENT_NODE && theSelection.getAttribute('type') == 'ntb:grid')
	{
    	return true;
	}
	else
	{
    	return false
	}
}

function inspectSelection()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	if (origMarkup == null)
	{
		return;
	}
	var columns = origMarkup.match(columnRegExp);
	
	clearInputs();
	populateColumnList(columns);
	populateGridInfo(origMarkup);
}

function clearInputs()
{
	WIDTH_INPUT.value = "";
	HEIGHT_INPUT.value = "";
	GETHANDLER_INPUT.value = "";
	SAVEHANDLER_INPUT.value = "";
	MODE_LIST.selectedIndex = 0;
	
	COL_LABEL_INPUT.value = "";
	COL_DATAFLD_INPUT.value = "";
	COL_WIDTH_INPUT.value = "";
	
}

function populateColumnList(columns)
{
	var list = COLUMNS_LIST;
	list.innerHTML = "";
	
	if (columns != null)
	{
		for (var i = 0; i < columns.length; i++)
		{
			// Now iterate through the list of column elements and add <option> elements to the select list of columns
			var columnStr = columns[i];
			var label = nitobi.util.getAttribute(columnStr, "label");
			var optionNode = "<option>";
			if (label != null)
			{
				optionNode += label;
			}
			else
			{
				optionNode += "** No Label **";
			}
			optionNode += "</option>";
			list.innerHTML += optionNode;
		}
	}
}

function populateGridInfo(declaration)
{
	var grid = nitobi.util.getTag(declaration, "ntb:grid", 0);
	
	var mode = nitobi.util.getAttribute(grid, "mode");
	var width = nitobi.util.getAttribute(grid, "width");
	var height = nitobi.util.getAttribute(grid, "height");
	var gethandler = nitobi.util.getAttribute(grid, "gethandler");
	var savehandler = nitobi.util.getAttribute(grid, "savehandler");
	
	WIDTH_INPUT.value = (width?width:"");
	HEIGHT_INPUT.value = (height?height:"");
	GETHANDLER_INPUT.value = (gethandler?gethandler:"");
	SAVEHANDLER_INPUT.value = (savehandler?savehandler:"");
	
	var modeElement = MODE_LIST;
	for (var i = 0; i < modeElement.options.length; i++)
	{
		if (modeElement.options[i].value == mode)
		{
			modeElement.selectedIndex = i;
			break;
		}
	}
}

function updateTag(name, value, tag)
{
	if (name == "width" || name == "height")
	{
		if (isNaN(value))
		{
			alert("Invalid value.  " + name + " must be a number.");
			inspectSelection();
			return;
		}
	}
	var newMarkup = nitobi.util.updateTag(name, value, tag);
	if (newMarkup)
	{
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function addColumn(type)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var columns = origMarkup.match(columnRegExp);
	
	var columnNode = "";
	if (type == "text")
	{
		columnNode = "<ntb:textcolumn label=\"Column" + (columns?columns.length:"0") + "\"></ntb:textcolumn>\n";
	}
	if (type == "number")
	{
		columnNode = "<ntb:numbercolumn label=\"Column" + (columns?columns.length:"0") + "\"></ntb:numbercolumn>\n";
	}
	if (type == "date")
	{
		columnNode = "<ntb:datecolumn label=\"Column" + (columns?columns.length:"0") + "\"></ntb:datecolumn>\n";
	}
	
	var insertIndex = origMarkup.search(/<\/ntb:columns>/);
	var newMarkup;
	if (insertIndex > -1)
	{
		newMarkup = origMarkup.substring(0, insertIndex) + columnNode + origMarkup.substring(insertIndex);
	}
	nitobi.util.setNewMarkup(newMarkup);
}

function removeColumn()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var columns = origMarkup.match(columnRegExp);
	if (columns == null)
	{
		return;
	}
	
	var listElement = COLUMNS_LIST;
	var columnToRemove = columns[listElement.selectedIndex];
	
	var newMarkup = origMarkup.replace(columnToRemove, "");
	nitobi.util.setNewMarkup(newMarkup);
}

function populateColumnInfo(selectElement)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var columns = origMarkup.match(columnRegExp);
	if (columns == null)
	{
		return;
	}
	
	var selectedColumn = columns[selectElement.selectedIndex];
	var label = nitobi.util.getAttribute(selectedColumn, "label");
	var xdatafld = nitobi.util.getAttribute(selectedColumn, "xdatafld");
	var width = nitobi.util.getAttribute(selectedColumn, "width");
	
	COL_LABEL_INPUT.value = (label?label:"");
	COL_DATAFLD_INPUT.value = (xdatafld?xdatafld:"");
	COL_WIDTH_INPUT.value = (width?width:"");
	
	// Populate editors select field
	/*var editorType = selectedColumn.match(/<ntb:(\w*)editor/);
	if (editorType != null && editorType.length >= 2)
	{
		var editorTypeStr = editorType[1];
		var editorList = EDITORS_LIST;
		for (var i = 1; i < editorList.options.length; i++)
		{
			if (editorList.options[i].value == editorTypeStr)
			{
				editorList.selectedIndex = i;
				break;
			}
		}
	}
	else
	{
		var editorList = EDITORS_LIST;
		editorList.selectedIndex = 0;
	}*/
}

function applyColumnAttributes()
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var columns = origMarkup.match(columnRegExp);
	
	if (columns == null)
	{
		return;
	}
	
	var label = COL_LABEL_INPUT.value;
	var xdatafld = COL_DATAFLD_INPUT.value;
	var width = COL_WIDTH_INPUT.value;
	
	var selectElement = COLUMNS_LIST;
	var selectedColumn = columns[selectElement.selectedIndex];
	
	if (selectedColumn != null)
	{
		var startIndex = origMarkup.indexOf(selectedColumn);
		var endIndex = startIndex + selectedColumn.length;
		
		if (label != "")
		{
			selectedColumn = nitobi.util.setAttribute(selectedColumn, "label", label);
		}
		if (xdatafld != "")
		{
			selectedColumn = nitobi.util.setAttribute(selectedColumn, "xdatafld", xdatafld);
		}
		if (width != "")
		{
			selectedColumn = nitobi.util.setAttribute(selectedColumn, "width", width);
		}
		
		var newMarkup = origMarkup.substring(0, startIndex) + selectedColumn + origMarkup.substring(endIndex);
		nitobi.util.setNewMarkup(newMarkup);
	}
}

function setColumnEditor(editorList)
{
	var origMarkup = nitobi.util.getOriginalMarkup();
	var columns = origMarkup.match(columnRegExp);
	if (columns == null)
	{
		return;
	}
	
	var selectElement = COLUMNS_LIST;
	var selectedColumn = columns[selectElement.selectedIndex];
	if (selectedColumn == null)
	{
		return;
	}
	
	var startIndex = origMarkup.indexOf(selectedColumn);
	var endIndex = startIndex + selectedColumn.length;
	
	var beforeColumn = origMarkup.substring(0, startIndex);
	var afterColumn = origMarkup.substring(endIndex);
	
	var editorType = editorList.options[editorList.selectedIndex].value;
	var editorMarkup = editorMap[editorType];
	
	// If there is an existing editor, remove it before inserting the new editor.
	if (/<ntb:\w*editor/.test(selectedColumn))
	{
		selectedColumn = selectedColumn.replace(/<ntb:\w*editor.*?><\/.*?>/, "");
	}
	var insertIndex = selectedColumn.search(/<\/ntb:(?:text|date|number)column/i);
	selectedColumn = selectedColumn.substring(0, insertIndex) + editorMarkup + selectedColumn.substring(insertIndex);
	
	var newMarkup = beforeColumn + selectedColumn + afterColumn;
	nitobi.util.setNewMarkup(newMarkup);
}

function disableButtons()
{
	// Disable move up
	if (document.getElementById)
	{
		var upButton = document.getElementById("elemUp");
		upButton.src = "../Shared/MM/Images/btnUpSmall_dis.png";
		// Disable move down
		var downButton = document.getElementById("elemDown");
		downButton.src = "../Shared/MM/Images/btnDownSmall_dis.png";
	}
}

function moveColumnUp()
{
	var selectElement = COLUMNS_LIST;
	var index = selectElement.selectedIndex;
	
	if (index > 0)
	{
		var dom = dreamweaver.getDocumentDOM();
		var grid = dom.getSelectedNode();
		
		if (grid.getElementsByTagName("ntb:columns").length == 0)
			return;
		var columnsElement = grid.getElementsByTagName("ntb:columns")[0];
		
		var columnList = columnsElement.childNodes;
		var tempColumn = columnList[index].outerHTML;
		columnList[index].outerHTML = columnList[index-1].outerHTML;
		columnList[index-1].outerHTML = tempColumn;
		
		dom.setSelectedNode(grid);
	}
}

function moveColumnDown()
{
	var selectElement = COLUMNS_LIST;
	var index = selectElement.selectedIndex;
	
	if (index < selectElement.length - 1)
	{
		var dom = dreamweaver.getDocumentDOM();
		var grid = dom.getSelectedNode();
		
		if (grid.getElementsByTagName("ntb:columns").length == 0)
			return;
		var columnsElement = grid.getElementsByTagName("ntb:columns")[0];
		
		var columnList = columnsElement.childNodes;
		var tempColumn = columnList[index].outerHTML;
		columnList[index].outerHTML = columnList[index+1].outerHTML;
		columnList[index+1].outerHTML = tempColumn;
		
		dom.setSelectedNode(grid);
	}
}

