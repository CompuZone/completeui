if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};
	
nitobi.dw.GridColumn = function(name, label, type, width)
{
	this.name = name;
	this.label = label;
	this.type = type;
	this.width = width;
}

nitobi.dw.GridColumn.prototype.getTag = function()
{
	return "<ntb:" + this.type + " xdatafld=\"" + this.name + "\" label=\"" + this.label + "\" width=\"" + this.width + "\"></ntb:" + this.type + ">";
}