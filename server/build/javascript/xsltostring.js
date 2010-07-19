//stringify("somefile", "someotherfile");

nitobi_defineNs = function(namespace)
{
	var names = namespace.split(".");
	var currentNamespace ="";
	var dot="";
	for (var i=0; i < names.length; i++)
	{
		currentNamespace += dot + names[i];
		dot=".";
		if (typeof(eval(currentNamespace)) == "undefined")
		{
			eval(currentNamespace + "={}");
		}
	}
}


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

	// Read in the source XSLT and single line it and encode the single quotes
	var sourceString = f.ReadAll();
	sourceString = sourceString.replace(/'/g,"\\\\\\'") //some crazy stuff goin on there ...
		.replace(/\/\*/g,"/\'+\'*")
		.replace(/\*\//g,"*\'+\'/")
		.replace(/\t/g,' ')
		.replace(/\r\n/g,'')
		.replace(/\n/g,'')
		.replace(/\s+/g,' ');

	eval(namespace.replace(/\./g, "_") + "_" + name + " = '" + sourceString + "';");
	sourceString = importXslt(eval(namespace.replace(/\./g, "_") + "_" + name)); 

	//	First we need to check if there is any reference to any imported XSLT templates ... like date and number formatters ...
//	sourceString = sourceString.replace('&lt;!--NUMBER-FORMATTING-TEMPLATES--&gt;', escapeXslt(numberXslt));
//	sourceString = sourceString.replace('&lt;!--DATE-FORMATTING-TEMPLATES--&gt;', escapeXslt(dateXslt));
//	sourceString = sourceString.replace('<!--NUMBER-FORMATTING-TEMPLATES-->', numberXslt);
//	sourceString = sourceString.replace('<!--DATE-FORMATTING-TEMPLATES-->', dateXslt);
	
	// Replace existing "&" with &amp;
	// Replace single quotes with escaped quotes
	// Replace /* and */ expressions with /'+'* (so they won't be interpreted as comments)
	// Replace whitespace
	// Replace newline characters
	// Don't do this	.replace(/\&/g,"&amp;")
	
	s += sourceString
		.replace(/xsl\:attribute/gi, 'x:a-')
		.replace(/xsl\:template/gi, 'x:t-')
		.replace(/xsl\:apply-templates/gi, 'x:at-')
		.replace(/xsl\:choose/gi, 'x:c-')
		.replace(/xsl\:when/gi, 'x:wh-')
		.replace(/xsl\:otherwise/gi, 'x:o-')
		.replace(/\sname\=\"/gi, 'x:n-')
		.replace(/\sselect\=\"/gi, 'x:s-')
		.replace(/xsl\:variable/gi, 'x:va-')
		.replace(/xsl\:value-of/gi, 'x:v-')
		.replace(/xsl\:call-template/gi, 'x:ct-')
		.replace(/xsl\:with-param/gi, 'x:w-')
		.replace(/xsl\:param/gi, 'x:p-');
	
	s+='\';\n';

	s+= 'nitobi.lang.defineNs("'+namespace+'");\n';
	s+= namespace+'.'+name+' = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(' + tempName + '));\n';

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

function importXslt(xsl1)
{
	// Do a replace on <!--nitobi.grid.xslProcessorName--> and merge the contents
	// The second block does this for escaped XSL
	var re = new RegExp('\<\!--(.*?)--\>', 'gi');
	var exprMatches = xsl1.match(re);

	xsl2 = "";
	if (exprMatches != null)
	{
		for (var i=0; i<exprMatches.length; i++)
		{
			var incl = exprMatches[i].replace("<!--","").replace("-->","").replace(/\./g,"_");
			// Get the imported stylesheet and remove the outer stylesheet element
			try {
				xsl2 = eval(incl);
			} catch(e) {
				continue;
			}

			if (xsl2 == null || typeof(xsl2) != "string")
				continue;

			xsl2 = xsl2.replace(/\<xsl:stylesheet.*?\>/g,'');
			xsl2 = xsl2.replace(/\<\/xsl:stylesheet\>/g,'');

			xsl1 = xsl1.replace('<!--'+incl.replace(/\_/g,'.')+'-->', xsl2);
		}
	}

	var re = new RegExp('\&lt;\!--(.*?)--\&gt;', 'gi');
	var exprMatches = xsl1.match(re);
	
	if (exprMatches != null)
	{
		for (var i=0; i<exprMatches.length; i++)
		{
			var incl = exprMatches[i].replace("&lt;!--","").replace("--&gt;","").replace(/\./g,"_");

			// Get the imported stylesheet and remove the outer stylesheet element
			try {
				xsl2 = eval(incl);
			} catch(e) {
				WScript.echo("Could not find variable named " + incl);
				continue;
			}

			if (xsl2 == null || typeof(xsl2) != "string")
				continue;

			xsl2 = xsl2.replace(/\<xsl:stylesheet.*?\>/g,'');
			xsl2 = xsl2.replace(/\<\/xsl:stylesheet\>/g,'');
			xsl2 = escapeXslt(xsl2);
			xsl1 = xsl1.replace('&lt;!--'+incl.replace(/\_/g,'.')+'--&gt;', xsl2);
		}
	}
	return xsl1;
}