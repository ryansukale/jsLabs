(function($){
	/**
	Options
	useTitle	:	To allow the user to use the element's title as the content of the bubble. Default : false - TODO
	content		:	The html that will be visible in the bubble
	display		: 	The event based upon which the bubble will appear
	duration	:	The duration in milliseconds for which the bubble should be visible
	position	:	The position where the bubble should appear. Valid values are 'top','right','left','bottom' --TODO
	maxWidth	:	The maximum allowed width in pixels to which the bubble is allowed to expand until it wraps the content.
	distance	:	The horizontal or vertical distance from the dom container where the bubble should appear.  --TODO
	autoClose	:	A boolean indicating if bubble autocloses after a duration or the user needs to close it manually. Default True -- TODO
	*/

 var myBubblePrototype={
  options:{
	useTitle:false,
	content:'Default Text as das da sd asd a sd a sd as sad asd as das d ',
	display:'click',
	duration:2000,
	position:'left',
	maxWidth:200,
	distance:0,
	autoClose:true
  },
  _create:function(){
	//console.log('create');
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	
	/*Create the dom containers that will be used to hold the details of the bubble*/
	var $container=$('<div class="bubble-container"></div>');
	
	var $closeButton=$('<span name="closeButtonSpan"></span>');
	var $bubble = $('<span name="bubbleSpan"></span>');
	var $pointer = $('<span name="pointerSpan"></span>');
	
	
	/*Add the elements to the DOM*/	
	$container.append($closeButton);
	$container.append($bubble);
	$container.append($pointer);
	
	/*The css class for the bubble*/
	$bubble.addClass('bubble-visible');
	$bubble.html(options.content);
	
	$('body').append($container);
	
	widget.container=$container;
	
	/*Now that the bubble has been added to the DOM, you can make several calculations 
	for its positioning based upon its initial rendering*/
	
	if($bubble.width()>options.maxWidth){
		/*since the max-width property does not work in IE, 
		we set the max width by comparison after the element is added to the dom*/
		
		$container.css({'opacity':'0','width':options.maxWidth});
		$bubble.css({'width':options.maxWidth});
	}
	widget._setup();
	
	/*By default, the container is hidden*/
	$container.hide();

	if($bubble.width()>options.maxWidth){
		/*since the max-width property does not work in IE, 
		we set the max width by comparison after the element is added to the dom*/
		//$bubble.css({'width':options.maxWidth,'opacity':'0'});
	}
	
	/*Bind the event of the browser to the dom element*/
	$domElement.bind(options.display,function(event){
		//console.log("as");
		widget._show(event);
	});
	//console.log("asd : "+$container.html());
	
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
	var $container=widget.container;
	
	//console.log('show');
	
	$container.show();
	
	$container.animate({'opacity':'1'},500);
	
	//console.log('show');
	
	if(!isNaN(options.duration)){
		var timerId = setTimeout(function(){
			$container.animate({'opacity':'0'},1000,function(){
				$container.hide();
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
  _setup:function(){
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	var $container = widget.container;
	var $bubble = $container.find('[name="bubbleSpan"]');
	var $pointer = $container.find('[name="pointerSpan"]');
	var $closeButton = $container.find('[name="closeButtonSpan"]');
	

	/*This function will be used to set up the presets for the widget*/

	
	var position = widget._getPosition($domElement[0]);
	
	/*
		The distance of the bubble from the DOM element in x or y coordinates depends upon the position where
		the bubble is placed relative to the DOM element., i.e. left, right, top or bottom
	*/
	
	/*Default coordinates of 0*/
	var coord = {x:0,y:0};
	var pointerCoord={x:0,y:0};
	
	
	options.position = options.position?options.position:'top';
	options.distance = options.distance?options.distance:20;

	var domCenter={};
	domCenter.x=position.x+$domElement.outerWidth()/2;
	domCenter.y=position.y+$domElement.outerHeight()/2;	
	
	
	/*
		Calculate the coordinates of the div elements to center align the bubble along the domElement
	
		The bubble uses triangles to point to the DOM element for which it was initialized.
		This Triangle should point in the direction based upon the direction of the bubble relative to the element.
		We create these triangles using pure CSS.
		For now, the triangles are center aligned on the bubble.
		
		We also calculate the coordinates of the triangle to center align it along the domElement
	*/
	
	if(options.position=='top'){
		$pointer.addClass('triangle-point-bottom');
		$pointer.css('border-top-width',options.distance);
		
		coord.y=position.y-($bubble.outerHeight()+options.distance);
		coord.x=position.x+($domElement.outerWidth()/2-$bubble.outerWidth()/2);
		
		pointerCoord.x=$bubble.outerWidth()/2-$pointer.outerWidth()/2;
		pointerCoord.y=$bubble.outerHeight()-1;
	}
	else{
		if(options.position=='bottom'){
			$pointer.addClass('triangle-point-top');
			$pointer.css('border-bottom-width',options.distance);
			
			pointerCoord.x=$bubble.outerWidth()/2-$pointer.outerWidth()/2;
			pointerCoord.y=-(options.distance-1);
			
			coord.y=(position.y+$domElement.outerHeight())+options.distance;
			coord.x=position.x+($domElement.outerWidth()/2-$bubble.outerWidth()/2);
		}
		else{
			if(options.position=='left'){
			
				$pointer.addClass('triangle-point-right');
				$pointer.css('border-left-width',options.distance);
				
				pointerCoord.x=$bubble.outerWidth()-1;
				pointerCoord.y=$container.outerHeight()/2-($pointer.outerHeight()/2);
				coord.x=position.x-($bubble.outerWidth()+options.distance);
				coord.y=position.y+($domElement.outerHeight()/2-$bubble.outerHeight()/2);
			}
			else{
				if(options.position=='right'){
					$pointer.addClass('triangle-point-left');
					$pointer.css('border-right-width',options.distance);
					
					pointerCoord.x=-(options.distance-1);
					pointerCoord.y=$container.outerHeight()/2-($pointer.outerHeight()/2);
					coord.x=position.x+($domElement.outerWidth()+options.distance);
					coord.y=position.y+($domElement.outerHeight()/2-$bubble.outerHeight()/2);
				}
			}
		}
	}
	
	if(!options.autoClose){
		$closeButton.html('Close').addClass('bubble-close-button');
		$bubble.css({'padding-top':'10px'})
	}

	$pointer.css('top',pointerCoord.y);
	$pointer.css('left',pointerCoord.x);
	
	$container.css('left',coord.x);
	$container.css('top',coord.y);

	
	
	return {
		coordinates : coord
	}
	
  }
  
};

 $.widget('ui.bubble',myBubblePrototype);
 
})(jQuery);