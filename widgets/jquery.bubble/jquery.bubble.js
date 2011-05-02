(function($){
	/**
	Options
	content		:	The html that will be visible in the bubble
	display		: 	The event based upon which the bubble will appear
	duration	:	The duration in milliseconds for which the bubble should be visible
	position	:	The position where the bubble should appear. Valid values are 'top','right','left','bottom' --TODO
	maxWidth	:	The maximum allowed width in pixels to which the bubble is allowed to expand until it wraps the content.
	distance	:	The horizontal or vertical distance from the dom container where the bubble should appear.  --TODO
	*/

 var myBubblePrototype={
  options:{
	content:'Default Text as das da sd asd a sd a sd as',
	display:'click',
	duration:2000,
	position:'left',
	maxWidth:200,
	distance:0
  },
  _create:function(){
	//console.log('create');
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	
	/*Create the dom element that will be used to hold the details of the bubble*/
	var $bubble = $('<span></span>');
	
	/*The css class for the bubble*/
	$bubble.addClass('bubble-visible');
	$bubble.html(options.content);
	
	
	var position = widget._getPosition($domElement[0]);
	
	/*By default, the bubble is hidden*/
	//$bubble.css({'opacity':0,'display':'none'});
	//$bubble.css({'opacity':0,'display':'none'});
	$('body').append($bubble);
	widget.bubble=$bubble;
	
	/*Now that the bubble has been added to the DOM, you can make several calculations 
	for its positioning based upon its initial rendering*/

	if($bubble.width()>options.maxWidth){
		/*since the max-width property does not work in IE, 
		we set the max width by comparison after the element is added to the dom*/
		$bubble.css({'width':options.maxWidth,'opacity':'0'});
	}
	var presets = widget._getPresets();
	
	//console.log('presets.coordinates.x ' + presets.coordinates.x);
	//console.log('presets.coordinates.y ' + presets.coordinates.y);
	
	//$bubble.css('left',position.x+$domElement.outerWidth());
	$bubble.css('left',presets.coordinates.x);
	$bubble.css('top',presets.coordinates.y);

	$bubble.hide();
	if($bubble.width()>options.maxWidth){
		/*since the max-width property does not work in IE, 
		we set the max width by comparison after the element is added to the dom*/
		$bubble.css({'width':options.maxWidth,'opacity':'0'});
	}
	
	/*Bind the event of the browser to the dom element*/
	$domElement.bind(options.display,function(event){
		widget._show(event);
	});
	
	
	//console.log($bubble);
	//console.log($domElement.data('bubble'));
  },
  _init:function(){
	//console.log('init');
  },
  _show:function(event){
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	
	var $bubble = widget.bubble;
	
	
	$bubble.show();
	$bubble.animate({'opacity':'1'},500);
	
	//console.log('show');
	
	if(!isNaN(options.duration)){
		var timerId = setTimeout(function(){
			$bubble.animate({'opacity':'0'},1000,function(){
				$bubble.hide();
			});
			
		},options.duration);
	}
  },
  _getPosition:function(obj){
	/*Snippet Taken from http://www.quirksmode.org/js/findpos.html */
	/*This will help us calculate the actual position where a dom element is being displayed*/
	var curleft=curtop=0;
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	
	return {
		x:curleft,
		y:curtop
	};
  },
  _getPresets:function(){
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	var $bubble = widget.bubble;
	

	/*This function will be used to set up the presets for the widget*/

	
	var position = widget._getPosition($domElement[0]);
	
	/*
		The distance of the bubble from the DOM element in x or y coordinates depends upon the position where
		the bubble is placed relative to the DOM element., i.e. left, right, top or bottom
	*/
	
	/*Default coordinates of 0*/
	var coord = {x:0,y:0};
	
	options.position = options.position?options.position:'top';
	options.distance = options.distance?options.distance:20;
	
	//console.log(options.distance);
	//console.log(0==false);
	//console.log(''==false);
	
	/*Calculate the coordinates of the div elements to center align the bubble along the domElement*/
	if(options.position=='top'){
		coord.y=position.y-($bubble.outerHeight()+options.distance);
		coord.x=position.x+($domElement.outerWidth()/2-$bubble.outerWidth()/2);
	}
	else{
		if(options.position=='bottom'){
			coord.y=(position.y+$domElement.outerHeight())+options.distance;
			coord.x=position.x+($domElement.outerWidth()/2-$bubble.outerWidth()/2);
		}
		else{
			if(options.position=='left'){
				coord.x=position.x-($bubble.outerWidth()+options.distance);
				coord.y=position.y+($domElement.outerHeight()/2-$bubble.outerHeight()/2);
			}
			else{
				if(options.position=='right'){
					coord.x=position.x+($domElement.outerWidth()+options.distance);
					coord.y=position.y+($domElement.outerHeight()/2-$bubble.outerHeight()/2);
				}
			}
		}
	}
	
	
	/*
		The bubble uses triangles to point to the DOM element for which it was initialized.
		This Triangle should point in the direction based upon the direction of the bubble relative to the element.
		We create these triangles using pure CSS.
		For now, the triangles are center aligned on the bubble.
	*/
	/*Calculate the coordinates of the pointers elements to center align the bubble along the domElement*/
	var domCenter={};
	domCenter.x=position.x+$domElement.outerWidth()/2;
	domCenter.y=position.x+$domElement.outerHeight()/2;
	//var pointerCoord={};
	
	var $pointer=$('<span></span>');
	
	$('body').append($pointer);
	
	
	if(options.position=='top'){
		//Since the bubble is at the top, the pointer is in the opposite direction.
		$pointer.addClass('triangle-point-bottom');
		$pointer.css('border-top-width',options.distance);
	}
	else{
		if(options.position=='bottom'){
		}
		else{
			if(options.position=='left'){
			}
			else{
				if(options.position=='right'){
				}
			}
		}
	}
	
	return {
		coordinates : coord
	}
	
  }
  
};

 $.widget('ui.bubble',myBubblePrototype);
 
})(jQuery);