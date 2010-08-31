var SOURCE_INPUT = document.forms[0].source_input;

function canAcceptCommand()
{
	return true;
}

function commandButtons() {
	return new Array("OK", "updateAssetSourceDir()", "Cancel", "window.close()");
}

function browseForDir()
{
	SOURCE_INPUT.value = nitobi.util.assetSourceDir;
	if (SOURCE_INPUT.value == "")
	{
		var folder = dw.browseForFolderURL("Select Asset Source", dw.getConfigurationPath() + "/Shared/Nitobi");
	}
	else
	{
		var folder = dw.browseForFolderURL("SelectAssetSource", SOURCE_INPUT.value);
	}
	if (folder)
	{
		SOURCE_INPUT.value = folder;
	}
}

function updateAssetSourceDir()
{
	var sourceDir = SOURCE_INPUT.value;
	
	DWfile.write(dw.getConfigurationPath() + "/Shared/Nitobi/config/assetSourceDir.txt", sourceDir);
	
	// Also need to store this value in mem.
	nitobi.util.assetSourceDir = sourceDir;
	window.close();
}