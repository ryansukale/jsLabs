(function(jQuery){

/*Get the path to import the CSS file for the plugin into the main HTML files*/
var jsFilePath = $("head").find("script:last").attr('src');
var cssFilePath = jsFilePath.substring(0,jsFilePath.lastIndexOf('/')+1)  + 'css/jquery.highlighter.css'
$('head').append('<link rel="stylesheet" href="'+cssFilePath+'" />');


jQuery.fn.highlighter=function(){
	return this.each(function(){
		var $this =$(this);
		
		/*Remove the existing border styles if any*/
		$this.css({'border':'none','outline':'none','background-color':'transparent'});
		
		/*Create a container to wrap the fields*/
		var $wrapper = $('<span></span>');
		
		/*Add styling to the wrapper*/
		$wrapper.addClass("round-all-5px field-normal");
		
		/*Steal the positioning properties of the field and apply them to the wrapper*/
		$wrapper.css('position',$this.css('position'));
		$wrapper.css('top',$this.css('top'));
		$wrapper.css('left',$this.css('left'));
		$wrapper.css('margin',$this.css('margin'));
		$wrapper.css('clear',$this.css('clear'));
		$wrapper.css('float',$this.css('float'));
		
		$this.css({'position':'relative','top':'0px','left':'0px','float':'none','margin':'0px','clear':'none'});
		
		/*Wrap the fields with the styled wrapper*/
		$this.wrap($wrapper);
		
		/*Associate the custom css classes with the wrapper on field focus*/
		$this.focus(function(){
			var $this =$(this);
			$this.parent().addClass('field-highlighted');
		}).blur(function(){
			var $this =$(this);
			$this.parent().removeClass('field-highlighted');
		});
		
	});
};

})(jQuery);

