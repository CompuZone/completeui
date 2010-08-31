if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};
	
nitobi.dw.TabstripTab = function(label, width)
{
	this.label = label;
	this.width = width;
	this.source = "";
}

nitobi.dw.TabstripTab.prototype.getTag = function()
{
	var tabDeclaration = "<ntb:tab label=\"" + this.label + "\" width=\"" + this.width + "\" ";
	if (nitobi.util.isUrl(this.source))
	{
		tabDeclaration += "containertype=\"iframe\" ";
	}
	tabDeclaration += "source=\"" + this.source + "\">";
	tabDeclaration += "</ntb:tab>";
	return tabDeclaration;
}