function popAll(tags)
{
	for (var i=tags.length-1;i>=0;i--)
	{
		var t = tags.pop();
		WScript.Echo("</"+t.match(/@(.*)/i)[1]+">");
	}
}

function popTill(tag,tags)
{
	for (var i=tags.length-1;i>=0;i--)
	{
		if (tags[i] == tag)
		{
			break;
		}
		
		var t = tags.pop();
		WScript.Echo("</"+t.match(/@(.*)/i)[1]+">");
	}
}

function closeTag(tag, tags)
{
	switch(tag)
	{
		case "@class":
		{
			popAll(tags);
			break;
		}
		case "@property":
		case "@function":
		{
			popTill("@class",tags);	
			break;
		}
		case "@param":
		{
			//WScript.Echo(" ** Close @param");
			popTill("@function",tags);
			break;
		}
		default:
		{
			return false;
		}
	}
	return true;
}

var args = WScript.Arguments;
var inFilename = args.Item(0);
var outFilename;

var fs = new ActiveXObject("Scripting.FileSystemObject");
var f = fs.OpenTextFile(inFilename, 1)

var tags = new Array();
WScript.Echo ("<classes>");
while (f.AtEndOfStream == false)
{
	var line = f.ReadLine();
	//var at = line. line.indexOf("@");
	
	var groups = line.match(/.*(@.*?\s)(.*?)($|[< $].*)/i);
	if (null != groups)
	{
		
		var name = RegExp.$2;
		var text = RegExp.$3;
		var tag = RegExp.$1.replace(/\s/g,"");
		if (!closeTag(tag,tags))
		{
			WScript.Echo ("<description>" + line + "</description>");	
		}
		else
		{
			tags.push(tag);
			WScript.Echo("<"+tag.match(/@(.*)/i)[1]+" name=\""+name+"\">");
			WScript.Echo("<description>" + text + "</description>");
		}
	}
	else
	{
		WScript.Echo ("<description>" + line + "</description>");
	}
	
}
popAll(tags);
WScript.Echo ("</classes>");
f.close();

