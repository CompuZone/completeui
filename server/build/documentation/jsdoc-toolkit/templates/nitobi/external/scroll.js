nitobi.lang.defineNs('nitobi.effects');

/**
 * Creates a scaling effect.  After the effect is created it can be started by calling 
 * <code>start()</code>.
 * @class A class that facilitates animated scaling.  Each instance is a different 
 * scaling effect on a different element with its own set of parameters.
 * @constructor
 * @param {HTMLElement} element the HTML element that will be affected by this effect
 * @param {Map} params initial values for the effect's fields - ie 
 * <code>{@link nitobi.effects.Effect#duration} = params.duration</code> 
 * @param {Number} percent the percentage (0-100) of size to which the effect should Scroll <code>element</code>
 * @extends nitobi.effects.Effect
 */
nitobi.effects.Scroll = function(element, params, percent)
{
	nitobi.effects.Scroll.baseConstructor.call(this,element,params);
	
	if (params.elemRelative)
	{
		this.elemRelative = params.elemRelative;
		this.scrollFrom = params.elemRelative.scrollTop;
	}
	else
	{
		this.scrollFrom = nitobi.html.getScroll().top;
	}
	this.scrollTo = nitobi.html.getCoords(this.element).y + (params.elemRelative?this.scrollFrom:0) - 15;
	
	this.scrollDistance = this.scrollFrom - this.scrollTo;
};

nitobi.lang.extend(nitobi.effects.Scroll, nitobi.effects.Effect);

/**
 * @private
 */
nitobi.effects.Scroll.prototype.update = function( pos )
{
	var delta = this.scrollDistance * pos;
	delta = this.scrollFrom - delta;
	
	if (this.elemRelative)
	{
		this.elemRelative.scrollTop = delta;
	}
	else
	{
		if ((nitobi.browser.OPERA == false)) {
			document.documentElement.scrollTop = delta;
		} else {
			document.body.scrollTop = delta;
		}
	}

	
};

	
