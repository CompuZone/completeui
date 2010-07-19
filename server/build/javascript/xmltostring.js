
function stringify(inFilename, outFilename, name, namespace)
{
	inFilename = inFilename.replace(/\//g, "\\");
	var path = inFilename.substr(0, inFilename.lastIndexOf("\\"));
	name = name || inFilename.substr(inFilename.lastIndexOf("\\")+1).replace(/\./,"");
	if (outFilename == null || outFilename == "..\\")
	{
		outFilename = path+"\\..\\"+ name + ".js";
	}
	else
	{
		outFilename = outFilename.replace(/\//g, "\\");
	}
	namespace = namespace || "";

	WScript.Echo("Converting " + inFilename + " to " + outFilename);

	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var f = fs.OpenTextFile(inFilename, 1)

//	var numberXslt = fs.OpenTextFile(path + '\\numberFormatTemplates.xslt').ReadAll();
//	var dateXslt = fs.OpenTextFile(path + '\\dateFormatTemplates.xslt').ReadAll();

	var tempName = "temp_ntb_"+name;
	var s = 'var '+tempName+'=\'';

	s+=f.ReadAll().replace(/\r\n/g,'').replace(/'/g,"\\'");
	
	s+='\';\n';

	s+= 'nitobi.lang.defineNs("'+namespace+'");\n';
	s+= namespace+'.'+name+' = nitobi.xml.createXmlDoc(' + tempName + ');\n';

	f.close();
	
	f = fs.CreateTextFile(outFilename, true)
	f.Write(s);
	f.close();

//	WScript.Echo(s);
}

function escapeXslt(sXslt)
{
	return sXslt.replace(/\&lt\;/g, '&amp;lt;').replace(/\&gt\;/g, '&amp;gt;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}