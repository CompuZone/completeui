if (typeof(nitobi) == "undefined")
	nitobi = {};
if (typeof(nitobi.dw) == "undefined")
	nitobi.dw = {};

nitobi.dw.MenuItem = function(label, source, onclick)
{
	this.label = label;
	this.source = source;
	this.onclick = onclick;
}

nitobi.dw.MenuItem.prototype.getTag = function()
{
	var declaration = "<ntb:menuitem label=\"" + nitobi.util.escapeDoubleQuotes(this.label) + "\" imagesrc=\"" + this.source + "\" onclick=\"" + this.onclick + "\">";
	declaration += "</ntb:menuitem>";
	return declaration;
}