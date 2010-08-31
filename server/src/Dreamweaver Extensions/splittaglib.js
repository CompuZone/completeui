function splitTags(source)
{
	var xml = new ActiveXObject("Microsoft.XMLDOM");
	xml.load(source);
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var tagNodes = xml.selectNodes("//tag");
	for (var i = 0; i < tagNodes.length; i++)
	{
		var tag = tagNodes[i];
		var tagName = tag.getAttribute("name")
		var file = fs.OpenTextFile("Package\\TagLibraries\\" + tagName + ".vtm", 2, true);
		file.Write(tag.xml);
	}
}

splitTags("temp/temp.xml");