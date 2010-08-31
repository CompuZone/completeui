if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};
	
nitobi.dw.ComboColumn = function(name, label, width)
{
	this.name = name;
	this.label = label;
	this.width = width;
}

nitobi.dw.ComboColumn.prototype.getTag = function(index)
{
	var declaration = "<ntb:ComboColumnDefinition HeaderLabel=\"" + this.label + "\" Width=\"" + this.width + "\" ";
	declaration += "DataFieldIndex=\"" + index + "\">";
	declaration += "</ntb:ComboColumnDefinition>";
	return declaration;
}