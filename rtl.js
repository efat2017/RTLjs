/*-----------------------------------------------
|	Made by Uri Goren, 2013, www.goren4u.com	|
-------------------------------------------------*/
var allStyles=['azimuth','background','background-attachment','background-color','background-image','background-position','background-repeat','border','border-collapse',
'border-color','border-spacing','border-style','border-top','border-right','border-bottom','border-left','border-top-color','border-right-color','border-bottom-color',
'border-left-color','border-top-style','border-right-style','border-bottom-style','border-left-style','border-top-width','border-right-width','border-bottom-width',
'border-left-width','border-width','bottom','caption-side','clear','clip','color','content','counter-increment','counter-reset','cue','cue-after','cue-before',
'cursor','direction','display','elevation','empty-cells','float','font','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant',
'font-weight','height','left','letter-spacing','line-height','list-style','list-style-image','list-style-position','list-style-type','margin-top',
'margin-right','margin-bottom','margin-left','marker-offset','marks','max-height','max-width','min-height','min-width','orphans','outline','outline-color',
'outline-style','outline-width','overflow','padding-top','padding-right','padding-bottom','padding-left','page','page-break-after','page-break-before',
'page-break-inside','pause','pause-after','pause-before','pitch','pitch-range','play-during','position','quotes','richness','right','size','speak','speak-header',
'speak-numeral','speak-punctuation','speech-rate','stress','table-layout','text-align','text-decoration','text-indent','text-shadow','text-transform','top',
'unicode-bidi','vertical-align','visibility','voice-family','volume','white-space','widows','width','word-spacing','z-index','border-radius','border-top-left-radius',
'border-top-right-radius','border-bottom-left-radius','border-bottom-right-radius','border-image','border-image-outset','border-image-repeat','border-image-source',
'border-image-slice','border-image-width','break-after','break-before','break-inside','columns','column-count','column-fill','column-gap','column-rule',
'column-rule-color','column-rule-style','column-rule-width','column-span','column-width','@keframes','animation','animation-delay','animation-direction',
'animation-duration','animation-fill-mode','animation-iteration-count','animation-name','animation-play-state','animation-timing-function','backface-visibility',
'perspective','perspective-origin','transform','transform-origin','transform-style','transition','transition-delay','transition-duration','transition-timing-function',
'transition-property','background-clip','background-origin','background-size','overflow-x','overflow-y','overflow-style','marquee-direction','marquee-play-count',
'marquee-speed','marquee-style','box-shadow','box-decoration-break','opacity']
//'margin','padding'
function applyStyles($el,css_props,css_vals)
{
    $el.removeAttr('style');
    var i=0;
    for (i=0;i<css_props.length;i++)
    {
        $el.css(css_props[i],css_vals[i]);
    }
}

function str_swap(str,a,b)
{
    return str.replace(b,"tovtov").replace(a,b).replace("tovtov",a);
}

function isCSSEmpty(val)
{
    return (val == undefined)||(val == '')||(val == 'none')||(val == 'normal');
}

function transform_rtl($el)
{
	var css_props = [];
	var css_vals = [];
	var i;
	for (i=0;i<allStyles.length;i++)
	{
		var css_prop=allStyles[i];
		var css_val=$el.css(css_prop);
		if (!isCSSEmpty(css_val)){
			if (css_prop.indexOf("left")>=0)
			{
				css_prop=css_prop.replace("left","right");
			}
			else if(css_prop.indexOf("right")>=0)
			{
				css_prop=css_prop.replace("right","left");
			}
			else
			{
				css_val=str_swap(css_val,"right","left");
				css_val=str_swap(css_val,"rtl","ltr");
			}
			css_props.push(css_prop)
			css_vals.push(css_val)
			$el.css(css_prop,'');//clear styling
		}
	}
	applyStyles($el,css_props,css_vals);
	$el.css('diretion','rtl');
}

function mark_down($start)
{
	$el=$start;
	if ($el==undefined)
		$el=jQuery('body');
	$el.children().each(function() {
		if (jQuery(this).children().length>0)
			mark_down(jQuery(this));
		else
			jQuery(this).addClass('rtl_node');
	});

}

function traverse_up(action_fn)
{
	jQuery('.rtl_node').each(function() {
		$el=jQuery(this);
		$el.removeClass('rtl_node');
		while ($el.parents().length>0)
		{
			if (!($el.hasClass('rtl_done')))
			{
				action_fn($el);
				$el.addClass('rtl_done');
			}
			$el=$el.parent();
		}
	});
}

jQuery(document).ready(function () {
	mark_down(jQuery('body'));
	traverse_up(transform_rtl);
	//jQuery('.rtl_done').removeClass('rtl_done');
});