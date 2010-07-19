nitobi.lang.defineNs("robotreplay");

robotreplay.Geometry = {
	scrollbarWidth: 0,
	scrollbarHeight: 0,
	
	// This will return the full current geometry.
	// Makes use of all the other methods.
	
	get: function() {
		var scrollCoords = this.getScrollPosition();
		var windowCoords = this.getWindowSize();
		if (windowsCoords == false)	{
			return {scrollLeft: scrollCoords.scrollLeft, scrollTop: scrollCoords.scrollTop,windowWidth: windowCoords.windowWidth, windowHeight: windowCoords.windowHeight, scrollbarWidth:robotreplay.Window.scrollbarWidth,scrollbarHeight:robotreplay.Window.scrollbarHeight, bodyWidth:windowCoords.bodyWidth,bodyHeight:windowCoords.bodyHeight, overflowX:windowCoords.overflowX, overflowY:windowCoords.overflowY};
		} else {
			return false;			
		}
	},
	
	// Just gets the scroll position
	
	getScrollPosition: function() {
		var scrollLeft = 0;
		var scrollTop = 0;	
		var doc = robotreplay.Browser.isStandards; // Is standards mode
		var client = robotreplay.browser; // Browser type
		var maj = robotreplay.Browser.version.maj; // The major version number
		var db = document.body; // Shorten this for brevity
		var dd = document.documentElement; // Shorten this for brevity
		if (doc==true) {
			// Standards Mode
			if ((client == "ie") || (client == "mozilla") || (client == "opera")) {
				// All internet explorer's
				scrollLeft = dd.scrollLeft;
				scrollTop = dd.scrollTop;
			} else if (client == "webkit") {
				scrollLeft = db.scrollLeft;
				scrollTop = db.scrollTop;				
			}
		} else {
			// Quirks Mode
			scrollLeft = db.scrollLeft;
			scrollTop = db.scrollTop;
		};			
		return {scrollLeft: scrollLeft, scrollTop: scrollTop};	
	},
	
	// Gets the accurate window size
	
	getWindowSize: function(){
		var overflowX = false;
		var overflowY = false;
		var browserWidth = 0; var browserHeight = 0; var bodyWidth = 0; var bodyHeight = 0;
		var dwo = robotreplay.Geometry;
		var doc = nitobi.lang.isStandards(); // Is standards mode
		//var client = robotreplay.browser; // Browser type
		//var maj = robotreplay.Browser.version.maj; // The major version number
		var db = document.body; // Shorten this for brevity
		var dd = document.documentElement; // Shorten this for brevity
		if (db) {
			if (doc == true) {
				// Standards Mode
				if (nitobi.browser.IE) {
				
					bodyWidth = dd.scrollWidth;
					bodyHeight = dd.scrollHeight;
					
					if (nitobi.brwoser.IE7) {
						// IE 7
						var _ho = dwo.scrollbarHeight;
						if (bodyWidth < dd.offsetWidth) {
							bodyWidth = dd.offsetWidth;
							_ho = 0;
							var isNarrower = true;
						}
						if (bodyHeight < dd.offsetHeight - _ho) 
							bodyHeight = dd.offsetHeight - _ho;
						browserWidth = dd.offsetWidth + 4 + dwo.scrollbarWidth;
						browserHeight = dd.offsetHeight + 4;
						if (bodyHeight > browserHeight) {
							overflowY = true;
						}
						if (bodyWidth > browserWidth) {
							overflowX = true;
							browserHeight += dwo.scrollbarHeight;
						}
						
					}
					else {
						// IE 6
						if (bodyWidth < dd.clientWidth) {
							bodyWidth = dd.clientWidth;
							var isNarrower = true;
						}
						if (bodyHeight < dd.clientHeight) 
							bodyHeight = dd.clientHeight;
						
						browserWidth = dd.offsetWidth;
						browserHeight = dd.offsetHeight;
						
					};
					
									}
				else 
					if (nitobi.browser.MOZ) {
					
						// FIREFOX - MOZ
						bodyWidth = dd.scrollWidth;
						bodyHeight = dd.scrollHeight;
						browserWidth = dd.clientWidth;
						browserHeight = dd.clientHeight;
						if (bodyHeight > browserHeight) {
							overflowY = true;
							
							browserWidth += dwo.scrollbarWidth;
						}
						if (bodyWidth > browserWidth) {
							overflowX = true;
							browserHeight += dwo.scrollbarHeight;
						}
						
					}
					else 
						if (nitobi.browser.SAFARI) {
							// SAFARI
							bodyWidth = db.scrollWidth;
							bodyHeight = db.scrollHeight;
							browserWidth = window.innerWidth;
							browserHeight = window.innerHeight;
							if (bodyHeight > browserHeight) {
								overflowY = true;
							//browserWidth += dwo.scrollbarWidth;
							}
							if (bodyWidth > browserWidth) {
								overflowX = true;
							//browserHeight += dwo.scrollbarHeight;					
							}
						}
						else 
							if (nitobi.browser.OPERA) {
								// OPERA
								bodyWidth = db.scrollWidth;
								bodyHeight = db.scrollHeight;
								browserWidth = db.clientWidth;
								browserHeight = db.clientHeight;
								if (bodyHeight > browserHeight) {
									overflowY = true;
									browserWidth += dwo.scrollbarWidth;
								}
								if (bodyWidth > browserWidth) {
									overflowX = true;
									browserHeight += dwo.scrollbarHeight;
								}
							}
			}
			else {
				// Quirks Mode
				if (nitobi.browser.IE) {
					// Note these are not abreviated for debugging purposes
					bodyWidth = db.scrollWidth;
					bodyHeight = document.body.scrollHeight;
					browserWidth = dd.offsetWidth;
					browserHeight = dd.offsetHeight;
					if (bodyHeight < db.clientHeight) 
						bodyHeight = db.clientHeight;
					if (bodyHeight > browserHeight) 
						overflowY = true;
					
					if (bodyWidth > browserWidth) 
						overflowX = true;
					
				}
				else 
					if (nitobi.browser.MOZ) {
					
						// FIREFOX - MOZ
						
						bodyWidth = db.scrollWidth;
						bodyHeight = db.scrollHeight;
						browserWidth = db.clientWidth; // This is our base 'browser width'
						browserHeight = db.clientHeight; // This is our base 'browser height'
						if (bodyHeight > browserHeight) {
							overflowY = true;
							browserWidth += dwo.scrollbarWidth;
						}
						if (bodyWidth > browserWidth) {
							overflowX = true;
							browserHeight += dwo.scrollbarHeight;
						}
						
					}
					else 
						if (nitobi.browser.SAFARI) {
							// SAFARI
							
							bodyWidth = db.scrollWidth;
							bodyHeight = db.scrollHeight;
							browserWidth = window.innerWidth;
							browserHeight = window.innerHeight;
							if (bodyHeight > browserHeight) {
								overflowY = true;
							//browserWidth += dwo.scrollbarWidth;
							}
							if (bodyWidth > browserWidth) {
								overflowX = true;
							//browserHeight += dwo.scrollbarHeight;					
							}
						}
						else 
							if (nitobi.browser.OPERA) {
								// OPERA
								bodyWidth = db.scrollWidth;
								bodyHeight = db.scrollHeight;
								browserWidth = db.clientWidth;
								browserHeight = db.clientHeight;
								if (bodyHeight > browserHeight) {
									overflowY = true;
									browserWidth += dwo.scrollbarWidth;
								}
								if (bodyWidth > browserWidth) {
									overflowX = true;
									browserHeight += dwo.scrollbarHeight;
								}
							}
			}
			return {windowWidth: browserWidth, windowHeight: browserHeight, bodyWidth:bodyWidth, bodyHeight:bodyHeight, overflowX:overflowX, overflowY:overflowY};	
		} else {
			return false;
		}		
	},
	
	
	// Gets the width and height of the scrollbar
	
	getScrollbarSize: function() {
		var rw = robotreplay.Geometry;
		if (rw.scrollbarWidth==0) {
			// Outer scrolling div
		    var scr = document.createElement('div');
			scr.style.position = 'absolute';
			scr.style.left = '-1000px';scr.style.top = '-1000px';
			scr.style.width = '100px';scr.style.height = '100px';
			scr.style.padding = '0px'; scr.style.margin = '0px';
			scr.style.overflow = 'scroll';
			scr.style.border = '0px';
			// Inner div to deform the scrolling div and create a scroll bar
		    var inn = document.createElement('div');
			inn.style.position = 'relative';
			inn.style.border = '0px';
			inn.style.height = '200px';
			inn.style.padding = '0px'; inn.style.margin = '0px';		
			scr.appendChild(inn);
			try {
				document.body.appendChild(scr);
				rw.scrollbarWidth = 100-inn.offsetWidth;
				rw.scrollbarHeight = rw.scrollbarWidth;
				document.body.removeChild(scr);				
			} catch(e) {
				setTimeout("robotreplay.Geometry.getScrollbarSize()", 500);
			}

		}
		return {scrollbarWidth:rw.scrollbarWidth,scrollbarHeight:rw.scrollbarHeight}
	},
	init: function() {
		if (document.body)
			this.getScrollbarSize();
		else
			setTimeout("robotreplay.Geometry.init();", 500);
	}
};