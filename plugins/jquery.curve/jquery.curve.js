(function(jQuery){
	//Set up the keys for the plugin as per the different browsers
	var defaultRadius='5px';

	var webkit = {
		'all':'webkit-border-radius',
		'top-left':'webkit-border-top-left-radius',
		'top-right':'webkit-border-top-right-radius',
		'bottom-right':'webkit-border-bottom-right-radius',
		'bottom-left':'webkit-border-bottom-left-radius',
		},
		css3 = {
		'all':'border-radius',
		'top-left':'border-top-left-radius',
		'top-right':'border-top-right-radius',
		'bottom-right':'border-bottom-right-radius',
		'bottom-left':'border-bottom-left-radius',
		},
		mozilla = {
			'all':'-moz-border-radius',
			'top-left':'-moz-border-radius-topleft',
			'top-right':'-moz-border-radius-topright',
			'bottom-right':'-moz-border-radius-bottomright',
			'bottom-left':'-moz-border-radius-bottomleft',
		};
		
	jQuery.fn.curve=function(radius1, radius2, radius3, radius4){
		return this.each(function(){
			
			var properties = {};
			
			if(radius4){
				properties[webkit['top-left']]=radius1;
				properties[css3['top-left']]=radius1;
				properties[mozilla['top-left']]=radius1;
				
				properties[webkit['top-right']]=radius2;
				properties[css3['top-right']]=radius2;
				properties[mozilla['top-right']]=radius2;
				
				properties[webkit['bottom-right']]=radius3;
				properties[css3['bottom-right']]=radius3;
				properties[mozilla['bottom-right']]=radius3;
				
				properties[webkit['bottom-left']]=radius4;
				properties[css3['bottom-left']]=radius4;
				properties[mozilla['bottom-left']]=radius4;
			}
			else
				if(radius2)
				{
					//console.log("asd");
					properties[webkit['top-left']]=radius1;
					properties[css3['top-left']]=radius1;
					properties[mozilla['top-left']]=radius1;
					
					properties[webkit['top-right']]=radius2;
					properties[css3['top-right']]=radius2;
					properties[mozilla['top-right']]=radius2;
					
					properties[webkit['bottom-right']]=radius1;
					properties[css3['bottom-right']]=radius1;
					properties[mozilla['bottom-right']]=radius1;
					
					properties[webkit['bottom-left']]=radius2;
					properties[css3['bottom-left']]=radius2;
					properties[mozilla['bottom-left']]=radius2;
					
				}
				else
					if(radius1){
						properties[webkit.all]=radius1;
						properties[css3.all]=radius1;
						properties[mozilla.all]=radius1;
					}
					else{
						properties[webkit.all]=defaultRadius;
						properties[css3.all]=defaultRadius;
						properties[mozilla.all]=defaultRadius;
					}
			var $this =$(this);
			//console.log(properties);
			$this.css(properties);
			
		});
	};

})(jQuery);