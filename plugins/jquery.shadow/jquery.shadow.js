/**
* Copyright 2011 Ryan Sukale
* This program is distributed under the terms of the GNU General Public License Version 3.
* Please check license.txt for details or log on to http://www.gnu.org/licenses/gpl.html
*/

(function(jQuery){

	/*
	4 Parts of the parameter
	The horizontal offset of the shadow, positive means the shadow will be on the right of the box, a negative offset will put the shadow on the left of the box.
	The vertical offset of the shadow, a negative one means the box-shadow will be above the box, a positive one means the shadow will be below the box.
	The blur radius, if set to 0 the shadow will be sharp, the higher the number, the more blurred it will be.
	Color
	*/

	//Set up the keys for the plugin as per the different browsers
	var defaultShadow='0 0 10px #000000';
		
	jQuery.fn.shadow=function(params){
		return this.each(function(){
			
			var properties = {};
			params=params?params:defaultShadow;
			properties['-webkit-box-shadow']=params;
			properties['-box-shadow']=params;
			properties['-moz-box-shadow']=params;
			
			$(this).css(properties);
			
		});
	};

})(jQuery);