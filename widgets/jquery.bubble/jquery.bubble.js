(function($){
	/**
	//TODO
	To create a defaulting mechanismt for the various options instead of hard coding them in the CSS.
	To create finalize the naming convention for the css classes to avoid class naming conflicts.
	To add a focus event to the event handler list.
	To create a wiki page for this widget on github.
	
	Options
	useTitle	:	To allow the user to use the element's title as the content of the bubble. Default : false - TODO
	content		:	The html that will be visible in the bubble
	display		: 	The event based upon which the bubble will appear
	duration	:	The duration in milliseconds for which the bubble should be visible
	position	:	The position where the bubble should appear. Valid values are 'top','right','left','bottom' --TODO
	maxWidth	:	The maximum allowed width in pixels to which the bubble is allowed to expand until it wraps the content.
	distance	:	The horizontal or vertical distance from the dom container where the bubble should appear.  --TODO
	autoClose	:	A boolean indicating if bubble autocloses after a duration or the user needs to close it manually. Default True -- TODO
	color		:	The css color for the bubble and the arrow
	*/

 var myBubblePrototype={
  options:{
	useTitle:false,
	content:'Default Text Default Text Default Text Default Text Default Text ',
	event:'click',
	duration:2000,
	position:'left',
	maxWidth:200,
	distance:0,
	autoClose:true,
	color:'#fafafa'
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
	widget._setupLayout();
	
	widget._handleEvents();
	/*Bind the event of the browser to the dom element*/
	$domElement.bind(options.event,function(event){
		//console.log("as");
		//widget._show();
	});
	
	//console.log("asd : "+$container.html());
	
	//console.log($bubble);
	//console.log($domElement.data('bubble'));
  },
  _init:function(){
	//console.log('init');
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
  _setupLayout:function(){
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	var $container = widget.container;
	var $bubble = $container.find('[name="bubbleSpan"]');
	var $pointer = $container.find('[name="pointerSpan"]');
	var $closeButton = $container.find('[name="closeButtonSpan"]');
	
	
	/*The css class for the bubble*/
	$bubble.addClass('bubble-visible');

	/*Get the actual position of the domElement*/
	var position = widget._getPosition($domElement[0]);
	
	/*
		The distance of the bubble from the DOM element in x or y coordinates depends upon the position where
		the bubble is placed relative to the DOM element., i.e. left, right, top or bottom
	*/
	/*Default coordinates of 0*/
	var bubbleCoord = {x:0,y:0};
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
		$pointer.css({'border-top-width':options.distance,'border-top-color':options.color});
		
		bubbleCoord.y=position.y-($bubble.outerHeight()+options.distance);
		bubbleCoord.x=position.x+($domElement.outerWidth()/2-$bubble.outerWidth()/2);
		
		pointerCoord.x=$bubble.outerWidth()/2-$pointer.outerWidth()/2;
		pointerCoord.y=$bubble.outerHeight()-1;
	}
	else{
		if(options.position=='bottom'){
			$pointer.addClass('triangle-point-top');
			$pointer.css({'border-bottom-width':options.distance,'border-bottom-color':options.color});
			
			pointerCoord.x=$bubble.outerWidth()/2-$pointer.outerWidth()/2;
			pointerCoord.y=-(options.distance-1);
			
			bubbleCoord.y=(position.y+$domElement.outerHeight())+options.distance;
			bubbleCoord.x=position.x+($domElement.outerWidth()/2-$bubble.outerWidth()/2);
		}
		else{
			if(options.position=='left'){
			
				$pointer.addClass('triangle-point-right');
				$pointer.css({'border-left-width':options.distance,'border-left-color':options.color});
				
				pointerCoord.x=$bubble.outerWidth()-1;
				pointerCoord.y=$container.outerHeight()/2-($pointer.outerHeight()/2);
				bubbleCoord.x=position.x-($bubble.outerWidth()+options.distance);
				bubbleCoord.y=position.y+($domElement.outerHeight()/2-$bubble.outerHeight()/2);
			}
			else{
				if(options.position=='right'){
					$pointer.addClass('triangle-point-left');
					$pointer.css({'border-right-width':options.distance,'border-right-color':options.color});
					
					pointerCoord.x=-(options.distance-1);
					pointerCoord.y=$container.outerHeight()/2-($pointer.outerHeight()/2);
					bubbleCoord.x=position.x+($domElement.outerWidth()+options.distance);
					bubbleCoord.y=position.y+($domElement.outerHeight()/2-$bubble.outerHeight()/2);
				}
			}
		}
	}
	
	
	$closeButton.html('Close').addClass('bubble-close-button');
	$bubble.css({'padding-top':'10px','background-color':options.color})
	

	$pointer.css('top',pointerCoord.y);
	$pointer.css('left',pointerCoord.x);
	
	$container.css('left',bubbleCoord.x);
	$container.css('top',bubbleCoord.y);

	
	/*By default, the container is hidden*/
	$container.hide();
	
  },
  _handleEvents:function(){
	/*This function will bind the events for all components of the widget*/
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	var $container = widget.container;
	var $bubble = $container.find('[name="bubbleSpan"]');
	var $pointer = $container.find('[name="pointerSpan"]');
	var $closeButton = $container.find('[name="closeButtonSpan"]');
	
	//A function to validate the event types allowed for the widget
	//TODO
	
	if(options.event=='hover'){
		var timerId=0;
		$domElement.hover(
			function(){
				//console.log("inside");
				$container.stop();
				$container.show();
				$container.animate({'opacity':'1'},100);
				
				if(options.autoClose){
					//console.log(options.autoClose);
					timerId = setTimeout(function(){
						$container.animate({'opacity':'0'},options.duration,function(){
							$container.hide();
						});
						
					},options.duration);
				}
			},		
			function(){
				if(!autoClose){
					if(timerId){
						clearTimeout(timerId);
					}
						$container.animate({'opacity':'0'},options.duration,function(){
						$container.hide();
					});
				}
				
			}
		);
	}
	else{
		if(options.event=='click'){
			$domElement.click(function(){
			
				$container.show();
				$container.animate({'opacity':'1'},500);
				
				if(options.autoClose){
					var timerId = setTimeout(function(){
						$container.animate({'opacity':'0'},1000,function(){
							$container.hide();
						});
						
					},options.duration);
				}
				
			});
		}
	}
	
	//if(!isNaN(options.duration)){
	$closeButton.click(function(){
		$container.hide();
	});
	
  }
  
};

 $.widget('ui.bubble',myBubblePrototype);
 
})(jQuery);