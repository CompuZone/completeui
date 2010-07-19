// ALL PATHS HAVE TRAILING SLASH
var PUBLIC = "../../public/"
var fileList = "";
var componentRegEx = /(?:calendar|callout|combo|fisheye|grid|spotlight|tabstrip|toolkit|tree|treegrid)/;
var relativeThemePath = "";
var dwExtPath = "../src/tools/Dreamweaver Extensions/Package/";
var dwExtFile = dwExtPath + "extensions.mxi";

function getFileList(dirName)
{
	var file = new java.io.File(dirName);
	if (dirName.indexOf(".svn") >= 0)
	{
		print("skipping svn!!");
		return;
	}
	if (file.isFile())
	{ 
		var absPath = file.getAbsolutePath();
		var canPath = file.getCanonicalPath();
		var componentName = canPath.match(componentRegEx);
		var pathToThemeDir = componentName + relativeThemePath;
		var dwPath = canPath.substr(canPath.indexOf(pathToThemeDir) + pathToThemeDir.length);
		
		var includeNode = "<file source=\"Shared/Assets/style/" + componentName + dwPath + "\" destination=\"$Dreamweaver/configuration/Shared/Nitobi/Assets/style/" + componentName +  dwPath + "\"/>\n";
		fileList += includeNode;
		return;
	}
	if (file.isDirectory())
	{
		var files = file.listFiles();
		for (var i = 0; i < files.length; i++)
		{
			getFileList(files[i].getAbsolutePath());
		}
	}
}

function writeIncludesToFile()
{
	var extFile = new java.io.File(dwExtFile);
	var extDef = readFile(extFile);
	
	extDef = extDef.replace(/<!-- \$CUISTYLESOURCE\$ -->/, fileList);
	
	var destFile = new java.io.File(dwExtPath + "/cui.mxi");
	var output = new java.io.BufferedWriter(new java.io.FileWriter(new java.io.File(destFile)));
	output.write(extDef);
	output.close();
	return;
}

getFileList(dwExtPath + "Shared/Assets/style/calendar");
getFileList(dwExtPath + "Shared/Assets/style/callout");
getFileList(dwExtPath + "Shared/Assets/style/combo");
getFileList(dwExtPath + "Shared/Assets/style/fisheye");
getFileList(dwExtPath + "Shared/Assets/style/grid");
getFileList(dwExtPath + "Shared/Assets/style/spotlight");
getFileList(dwExtPath + "Shared/Assets/style/tabstrip");
getFileList(dwExtPath + "Shared/Assets/style/tree");
getFileList(dwExtPath + "Shared/Assets/style/treegrid");
writeIncludesToFile();