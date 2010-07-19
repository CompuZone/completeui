/** Handle the creation of HTML links to documented symbols.
	@constructor
*/
function Link() {
	this.alias = "";
	this.src = "";
	this.file = "";
	this.text = "";
	this.innerName = "";
	this.classLink = false;
	this.targetName = "";
	
	this.makeInternal = function(internalLink)
	{
		if (defined(internalLink)) this.internalLink = internalLink;
		return this;
	}
	
	this.target = function(targetName) {
		if (defined(targetName)) this.targetName = targetName;
		return this;
	}
	this.inner = function(inner) {
		if (defined(inner)) this.innerName = inner;
		return this;
	}
	this.withText = function(text) {
		if (defined(text)) this.text = text;
		return this;
	}
	this.toSrc = function(filename) {
		if (defined(filename)) this.src = filename;
		return this;
	}
	this.toSymbol = function(alias) {
		if (defined(alias)) this.alias = new String(alias);
		return this;
	}
	this.toClass = function(alias) {
		this.classLink = true;
		return this.toSymbol(alias);
	}
	this.toFile = function(file) {
		if (defined(file)) this.file = file;
		return this;
	}
	
	this.toString = function() {
		var linkString;
		var thisLink = this;

		if (this.alias) {
			linkString = this.alias.replace(/(^|[^a-z$0-9_#.:^-])([|a-z$0-9_#.:^-]+)($|[^a-z$0-9_#.:^-])/i,
				function(match, prematch, symbolName, postmatch) {
					var symbolNames = symbolName.split("|");
					var links = [];
					for (var i = 0, l = symbolNames.length; i < l; i++) {
						thisLink.alias = symbolNames[i];
						links.push(thisLink._makeSymbolLink(symbolNames[i]));
					}
					return prematch+links.join("|")+postmatch;
				}
			);
		}
		else if (this.src) {
			linkString = thisLink._makeSrcLink(this.src);
		}
		else if (this.file) {
			linkString = thisLink._makeFileLink(this.file);
		}

		return linkString;
	}
}

/** prefixed for hashes */
Link.hashPrefix = "";

/** Appended to the front of relative link paths. */
Link.base = "";

Link.symbolNameToLinkName = function(symbol) {
	var linker = "";
	if (symbol.isStatic) linker = ".";
	else if (symbol.isInner) linker = "-";
	
	return Link.hashPrefix+linker+symbol.name;
}

/** Create a link to a snother symbol. */
Link.prototype._makeSymbolLink = function(alias) {
	var linkBase = Link.base+publish.conf.symbolsDir;
	var linkTo = Link.symbolSet.getSymbol(alias);
	var linkPath;
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";

	// is it an internal link?
	if (alias.charAt(0) == "#") var linkPath = alias;
	
	// if there is no symbol by that name just return the name unaltered
	else if (!linkTo) return this.text || alias;
	
	// it's a symbol in another file
	else {

		if (!linkTo.is("CONSTRUCTOR") && !linkTo.isNamespace) { // it's a method or property
			linkPath = escape(linkTo.memberOf) || "_global_";
			linkPath += publish.conf.ext + "#" + Link.symbolNameToLinkName(linkTo);
		}
		else {
			linkPath = escape(linkTo.alias);
			linkPath += publish.conf.ext + (this.classLink? "":"#" + Link.hashPrefix + "constructor");
		}
		linkPath = linkBase + linkPath
	}
	
	var linkText = this.text || alias;
	
	var link = {linkPath: linkPath, linkText: linkText};
	
	if (typeof JSDOC.PluginManager != "undefined") {
		JSDOC.PluginManager.run("onSymbolLink", link);
	}
	
	return "<a href=\""+link.linkPath+"\""+target+">"+link.linkText+"</a>";
}

Link.prototype._makeTargetLink = function(target)
{
	return "<a href=\"#" + target + "\">" + this.alias + "</a>";
}

Link.prototype._makeAjaxLink = function(alias)
{
	var linkBase = Link.base+publish.conf.symbolsDir;
	var linkTo = Link.symbolSet.getSymbol(alias);
	var linkPath;
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";

	// is it an internal link?
	if (alias.charAt(0) == "#") 
	{
		var linkPath = alias;
		return "<a onclick=\"scrollToElement(event, '" + alias.substr(1) + "');return false;\" href=\""+linkPath+"\""+target+">"+ (this.text||alias) +"</a>";
	}
	
	else if (this.internalLink)
	{
		return "<a onclick=\"scrollToElement('" + (linkTo.isStatic && this.internalLink != "constructor"?"." + this.internalLink:this.internalLink) + "');return false;\" href=\"#" + this.internalLink + "\""+target+">"+ (this.text||alias) +"</a>";
	}
	
	// if there is no symbol by that name just return the name unaltered
	else if (!linkTo) 
	{
		return this.text || alias;
	}
	
	// it's a symbol in another file
	else 
	{
	
		if (!linkTo.is("CONSTRUCTOR") && !linkTo.isNamespace) 
		{ 
			// it's a method or property
			linkPath = escape(linkTo.memberOf) || "_global_";
			linkPath += publish.conf.ext + "#" + Link.symbolNameToLinkName(linkTo);
		}
		else 
		{
			linkPath = escape(linkTo.alias);
			linkPath += publish.conf.ext + (this.classLink? "":"#" + Link.hashPrefix + "constructor");
		}
		// TODO: Ridiculous...
		if (linkTo.isStatic && !linkTo.is("CONSTRUCTOR"))
		{
			return "<a onclick=\"scrollToElement('." + linkTo.name + "');return false;\" href=\"#" + linkPath + "\""+target+">"+ (this.text||alias) +"</a>";
		}
		else
		{
			return "<a href=\"symbols/" + linkPath + "\" onclick=\"handleAjaxLink(event);return false\" alias=\"" + linkTo.alias + "\">" + (this.text||alias) + "</a>";
		}
		
	}
}

/** Create a link to a source file. */
Link.prototype._makeSrcLink = function(srcFilePath) {
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";
		
	// transform filepath into a filename
	var srcFile = srcFilePath.replace(/\.\.?[\\\/]/g, "").replace(/[:\\\/]/g, "_");
	var outFilePath = Link.base + publish.conf.srcDir + srcFile + publish.conf.ext;

	if (!this.text) this.text = FilePath.fileName(srcFilePath);
	return "<a href=\""+outFilePath+"\""+target+">"+this.text+"</a>";
}

Link.prototype._makeAjaxSrcLink = function(srcFilePath)
{
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";
		
	// transform filepath into a filename
	var srcFile = srcFilePath.replace(/\.\.?[\\\/]/g, "").replace(/[:\\\/]/g, "_");
	var outFilePath = publish.conf.srcDir + srcFile + publish.conf.ext;

	if (!this.text) this.text = FilePath.fileName(srcFilePath);
	return "<a onclick=\"handleSrcLink(event);return false;\" href=\""+outFilePath+"\""+target+">"+this.text+"</a>";
}

/** Create a link to a source file. */
Link.prototype._makeFileLink = function(filePath) {
	var target = (this.targetName)? " target=\""+this.targetName+"\"" : "";
		
	var outFilePath =  Link.base + filePath;

	if (!this.text) this.text = filePath;
	return "<a href=\""+outFilePath+"\""+target+">"+this.text+"</a>";
}