
nitobi.ui.Toolbars.prototype.initialize=_gToolbarInit;
function _gToolbarInit()
{
	this.enabled=true;
	var hiddenField = document.getElementById(this.grid.ID + "_ToolbarInfo");
	if(hiddenField != null && hiddenField.value.length != 0)
	{
		var custTB = hiddenField.value.split("#|#");
		if(custTB.length == 2)
		{
			this.toolbarXml=nitobi.xml.createXmlDoc(custTB[0].length==0?nitobi.xml.serialize(nitobi.grid.toolbarDoc):custTB[0]);
			this.toolbarPagingXml=nitobi.xml.createXmlDoc(custTB[1].length==0?nitobi.xml.serialize(nitobi.grid.pagingToolbarDoc):custTB[1]);
			return;
		}
	}
	
	this.toolbarXml=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.toolbarDoc));
	this.toolbarPagingXml=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.pagingToolbarDoc));
}

if(nitobi.initGrids)
	nitobi.grid.Grid.prototype.selectGridRow = _gSelectGridRow;
if(nitobi.initTreeGrids)
	nitobi.grid.TreeGrid.prototype.selectGridRow = _gSelectGridRow;
function _gSelectGridRow(rowIndex,forceActive)
{
	this._selectingGridRow = true;
//debugger;
	var dd= this.datatable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xk='"+rowIndex+"']");
	var rows = this.getSelectedRows();
	if(dd != null)
	{
		var k = dd.getAttribute("xk");
		var ri = dd.getAttribute("xi");
		if(ri > this.getRowsPerPage())
			ri -= this.getCurrentPageIndex() * this.getRowsPerPage();
		var givenRow = nitobi.grid.Row.getRowElement(this, ri);
		if(givenRow != null)
		{
			var setActive = true;
			for(var p = 0; p < rows.length;p++)
				if(rows[p] == givenRow)
				{
					setActive = false;
					break;
				}
				
			if(setActive)
				this.setActiveRow(givenRow, true);
		}
	}
	this._selectingGridRow = false;
}

if(nitobi.initGrids)
	nitobi.grid.Grid.prototype.processGridSelected = _gProcessGridSelected;
if(nitobi.initTreeGrids)
	nitobi.grid.TreeGrid.prototype.processGridSelected = _gProcessGridSelected;
function _gProcessGridSelected()
{
	var hiddenField = document.getElementById(this.ID + "_SelRowInfo");
	var selectedRows = hiddenField.value;
	this.clearActiveRows();
	if(selectedRows.length != 0)
	{
		var rowIndexes = selectedRows.split("|");
		for(var p = 0; p < rowIndexes.length; p++)
		{
			//rowIndexes[p] = new Number(rowIndexes[p]);
			this.selectGridRow(rowIndexes[p],false);			
		}	
	}
}

if(nitobi.initGrids)
	nitobi.grid.Grid.prototype.processRowFocus = _gProcessRowFocus;
if(nitobi.initTreeGrids)
	nitobi.grid.TreeGrid.prototype.processRowFocus = _gProcessRowFocus;
function _gProcessRowFocus(args)
{
	if(this._selectingGridRow)
		return;

	var hiddenField = document.getElementById(this.ID + "_SelRowInfo");
	if(!this.isRowSelectEnabled())
	{
		hiddenField.value = "";
		return;	
	}
	var rowNum = args.row.row;
	//rowNum += (this.getCurrentPageIndex() * this.getRowsPerPage());
	var dd= this.datatable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi="+rowNum+"]");
	var k = dd.getAttribute("xk");
	var rows = this.getSelectedRows();
	var rowSelected = false;
	for(var p = 0; p < rows.length; p++)
	{
		var n = nitobi.grid.Row.getRowNumber(rows[p]);
		if(n == rowNum)
		{
			rowSelected = true;
			break;
		}
	}

	if(!this.isMultiRowSelectEnabled())
	{
		hiddenField.value = rowSelected?/*rowNum*/k:"";
		return;
	}		

	var newSelectedRows = "";
	var selectedRows = hiddenField.value;
	var rowIndexes = selectedRows.split("|");
	var found = false;
	for(var p = 0; p < rowIndexes.length; p++)
		if(rowIndexes[p] != /*rowNum*/k)
			newSelectedRows+= rowIndexes[p] + "|";
		else
			found = true;
			
	if(!args.event.ctrlKey)
		newSelectedRows = /*rowNum*/k + "|";
	else if(!found)
		newSelectedRows += /*rowNum*/k + "|";
	hiddenField.value = newSelectedRows.substring(0, newSelectedRows.length-1)
}

if(nitobi.initGrids)
	nitobi.grid.Grid.prototype.setupGridScrollPosition = _gsetupGridScrollPosition;
if(nitobi.initTreeGrids)
	nitobi.grid.TreeGrid.prototype.setupGridScrollPosition = _gsetupGridScrollPosition;
function _gsetupGridScrollPosition(pos)
{
	var posInfo = pos.split(",");
	if(posInfo.length == 2)
	{
		this.vScrollbar.setScrollPercent(posInfo[0]);
		this.hScrollbar.setScrollPercent(posInfo[1]);
	}
}

if(nitobi.initGrids)
	nitobi.grid.Grid.prototype.setupGridSize = _gsetupGridSize;
if(nitobi.initTreeGrids)
	nitobi.grid.TreeGrid.prototype.setupGridSize = _gsetupGridSize;
function _gsetupGridSize(sizeInfo)
{
	var sizes = sizeInfo.split(",");
	if(sizes.length == 2)
	{
		this.setWidth(sizes[0]);
		this.setHeight(sizes[1]);
	}
}

function InitNetGrids()
{
	if(nitobi.initGrids != null)
		nitobi.initGrids();
	if(nitobi.initTreeGrids != null)
	nitobi.initTreeGrids();	
}

nitobi.oldInitGrid = nitobi.initGrid;
nitobi.initGrid = function(id)
{
	return extendedSetupGrid(nitobi.oldInitGrid(id));
}

nitobi.oldInitTreeGrid = nitobi.initTreeGrid;
nitobi.initTreeGrid = function(id)
{
	return extendedSetupGrid(nitobi.oldInitTreeGrid(id));
}

function extendedSetupGrid(grid)
{
	/*
	var sizeHidField = document.getElementById(grid.ID + "_ScrollInfo");
	var hiddenField = document.getElementById(grid.ID + "_SizeInfo");
	grid.subscribe('AfterGridResize', function() {hiddenField.value = grid.getWidth() + ',' + grid.getHeight();}, null, new Array());
	grid.subscribe('HtmlReady', function() {grid.processGridSelected(); } ,null, new Array());
	grid.subscribe('RowFocus', function(args) {grid.processRowFocus(args); } ,null, new Array());
	grid.subscribe('ScrollVertical', function() {sizeHidField.value = grid.vScrollbar.getScrollPercent() + ',' + grid.hScrollbar.getScrollPercent();}, null, new Array());
	grid.subscribe('ScrollHorizontal', function() {sizeHidField.value = grid.vScrollbar.getScrollPercent() + ',' + grid.hScrollbar.getScrollPercent();}, null, new Array());
	grid.subscribeOnce('HtmlReady', function() {grid.setupGridScrollPosition(sizeHidField.value); } ,null, new Array());
	*/
	return grid;
}