if (typeof nitobi == "undefined")
	nitobi = {};
if (typeof nitobi.dw == "undefined")
	nitobi.dw = {};

nitobi.dw.SpotlightStep = function(paramsObj)
{
	this.type = paramsObj.type;
	this.paramsObj = paramsObj;
}

nitobi.dw.SpotlightStep.prototype.getFunctionDef = function(tourName)
{
	var func = "";
	var argList = "";
	var params = this.paramsObj.params;
	switch (this.type)
	{
		case "createCalloutStep":
		{
			argList += (params[0] != "null"?"'" + params[0] + "'":params[0]) + ", ";
			argList += "'" + nitobi.util.escapeSingleQuotes(params[1]) + "', ";
			argList += "'" + nitobi.util.escapeSingleQuotes(params[2]).replace(/\n/g, "<br/>").replace(/\r/g, "") + "'";
			break;
		}
		case "createCodeStep":
		{
			argList += "'" + nitobi.util.escapeSingleQuotes(params[0]) + "', ";
			argList += params[1];
			break;
		}
		case "createFocusStep":
		{
			argList += (params[0] != "null"?"'" + params[0] + "'":param) + ", ";
			argList += params[1];
			break;
		}
		case "createMouseStep":
		{
			argList += "'" + params[0] + "', ";
			argList += "'" + params[1] + "', ";
			argList += params[2];
			break;
		}
		case "createFormHelperStep":
		{
			argList += "$('" + params[0] + "'), ";
			argList += "'" + params[1] + "', ";
			argList += params[2] + ", ";
			argList += "'" + nitobi.util.escapeSingleQuotes(params[3]) + "'";
			break;
		}
	}
	func += tourName + "." + this.type + "(" + argList + ");\n";
	return func;
}