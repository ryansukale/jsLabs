/**
* Copyright 2011 Ryan Sukale
* This program is distributed under the terms of the GNU General Public License Version 3.
* Please check license.txt for details or log on to http://www.gnu.org/licenses/gpl.html
*/

(function(jQuery){

/*Get the path to import the CSS file for the plugin into the main HTML files*/
var jsFilePath = $("head").find("script:last").attr('src');
var cssFilePath = jsFilePath.substring(0,jsFilePath.lastIndexOf('/')+1)  + 'css/jquery.highlighter.css'
$('head').append('<link rel="stylesheet" href="'+cssFilePath+'" ></link>');


jQuery.fn.highlighter=function(){
	return this.each(function(){
		var $this =$(this);
		
		var borderColor='#7F9DB9';    //The default border color of input elements
		var highlightColor='#dddd00'; //bright yellow color for the border on field highlighting
		
		/*Create a container to wrap the fields*/
		var $wrapper = $('<span></span>');
		
		/*Add styling to the wrapper*/
		$wrapper.addClass("round-all field-normal");
		
		/*Steal the positioning properties of the field and apply them to the wrapper*/
		var properties = {
			'position':$this.css('position'),
			'top':$this.css('top'),
			'left':$this.css('left'),
			'margin-top':$this.css('margin-top'),
			'margin-right':$this.css('margin-right'),
			'margin-bottom':$this.css('margin-bottom'),
			'margin-left':$this.css('margin-left'),
			'clear':$this.css('clear'),
			'float':$this.css('float'),
			'border-color':borderColor
		};
		
		$wrapper.css(properties);
		
		/*Remove the existing border styles if any*/
		$this.css({'border':'none','outline':'none','background-color':'transparent'});
		
		/*Clear the positional properties*/
		$this.css({'position':'relative','top':'0px','left':'0px','float':'none','margin':'0px','clear':'none'});
		
		/*Wrap the fields with the styled wrapper*/
		$this.wrap($wrapper);
		
		/*Associate the custom css classes with the wrapper on field focus*/
		$this.focus(function(){
			var $this =$(this);
			$this.parent().addClass('field-highlighted')
							.css('border-color',highlightColor);
		}).blur(function(){
			var $this =$(this);
			$this.parent().removeClass('field-highlighted')
							.css('border-color',borderColor);
		});
		
	});
};

})(jQuery);