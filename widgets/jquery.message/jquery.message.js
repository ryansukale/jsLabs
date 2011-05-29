/**
*
* Copyright 2011 Ryan Sukale
*
*/
(function($){
	/**
	//TODO
	To create a defaulting mechanismt for the various options instead of hard coding them in the CSS.
	To create finalize the naming convention for the css classes to avoid class naming conflicts.
	To add a focus event to the event handler list.
	To create a wiki page for this widget on github.
	To offset the shadow based upon the positioning of the container.
	
	Options
	useTitle	:	To allow the user to use the element's title as the content of the message. Default : false - TODO
	content		:	The html that will be visible in the message
	display		: 	The event based upon which the message will appear
	duration	:	The duration in milliseconds for which the message should be visible
	position	:	The position where the message should appear. Valid values are 'top','right','left','bottom' --TODO
	maxWidth	:	The maximum allowed width in pixels to which the message is allowed to expand until it wraps the content.
	distance	:	The horizontal or vertical distance from the dom container where the message should appear.  --TODO
	autoClose	:	A boolean indicating if message autocloses after a duration or the user needs to close it manually. Default True -- TODO
	color		:	The css color for the message and the arrow
	shadow		:	boolean value indicating if a shadow should be present around the message. Or a string that specifies the shadow properties. Default: true
	*/


 var myMessagePrototype={
 
  options:{
	useTitle:false,
	content:'Default Text Default Text Default Text Default Text Default Text ',
	event:'click',
	duration:2000,
	position:'left',
	maxWidth:200,
	distance:0,
	autoClose:true,
	color:'#4a4a4a',
	shadow:true,
	maxOpacity:0.9
  },
  _create:function(){
	//console.log('create');
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	
	/*Create the dom containers that will be used to hold the details of the message*/
	var $container=$('<div class="message-container"></div>');
	
	var $closeButton=$('<span name="closeButtonSpan"></span>');
	var $message = $('<span name="messageSpan"></span>');
	var $pointer = $('<span name="pointerSpan"></span>');
	
	
	/*Add the elements to the DOM*/	
	$container.append($closeButton);
	$container.append($message);
	$container.append($pointer);
	
	
	$message.html(options.content);
	
	$('body').append($container);
	
	widget.container=$container;
	
	/*Now that the message has been added to the DOM, you can make several calculations 
	for its positioning based upon its initial rendering*/
	
	if($message.width()>options.maxWidth){
		/*since the max-width property does not work in IE, 
		we set the max width by comparison after the element is added to the dom*/
		
		$container.css({'opacity':'0','width':options.maxWidth});
		$message.css({'width':options.maxWidth});
	}
	widget._setupLayout();
	
	widget._handleEvents();
	widget._addSpecialEffects();
	
	
	//console.log("asd : "+$container.html());
	
	//console.log($message);
	//console.log($domElement.data('message'));
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
	var $message = $container.find('[name="messageSpan"]');
	var $pointer = $container.find('[name="pointerSpan"]');
	var $closeButton = $container.find('[name="closeButtonSpan"]');
	
	
	/*The css class for the message*/
	$message.addClass('message-visible');
	$container.addClass('message-container-visible');

	/*Get the actual position of the domElement*/
	var position = widget._getPosition($domElement[0]);
	
	/*
		The distance of the message from the DOM element in x or y coordinates depends upon the position where
		the message is placed relative to the DOM element., i.e. left, right, top or bottom
	*/
	/*Default coordinates of 0*/
	var messageCoord = {x:0,y:0};
	var pointerCoord={x:0,y:0};
	
	
	options.position = options.position?options.position:'top';
	options.distance = options.distance?options.distance:20;

	var domCenter={};
	domCenter.x=position.x+$domElement.outerWidth()/2;
	domCenter.y=position.y+$domElement.outerHeight()/2;	
	
	
	/*
		Calculate the coordinates of the div elements to center align the message along the domElement
	
		The message uses triangles to point to the DOM element for which it was initialized.
		This Triangle should point in the direction based upon the direction of the message relative to the element.
		We create these triangles using pure CSS.
		For now, the triangles are center aligned on the message.
		
		We also calculate the coordinates of the triangle to center align it along the domElement
	*/
	
	if(options.position=='top'){
		$pointer.addClass('triangle-point-bottom');
		$pointer.css({'border-top-width':options.distance,'border-top-color':options.color});
		
		messageCoord.y=position.y-($message.outerHeight()+options.distance);
		messageCoord.x=position.x+($domElement.outerWidth()/2-$message.outerWidth()/2);
		
		pointerCoord.x=$message.outerWidth()/2-$pointer.outerWidth()/2;
		pointerCoord.y=$message.outerHeight()-1;
	}
	else{
		if(options.position=='bottom'){
			$pointer.addClass('triangle-point-top');
			$pointer.css({'border-bottom-width':options.distance,'border-bottom-color':options.color});
			
			pointerCoord.x=$message.outerWidth()/2-$pointer.outerWidth()/2;
			pointerCoord.y=-(options.distance-1);
			
			messageCoord.y=(position.y+$domElement.outerHeight())+options.distance;
			messageCoord.x=position.x+($domElement.outerWidth()/2-$message.outerWidth()/2);
		}
		else{
			if(options.position=='left'){
			
				$pointer.addClass('triangle-point-right');
				$pointer.css({'border-left-width':options.distance,'border-left-color':options.color});
				
				pointerCoord.x=$message.outerWidth()-1;
				pointerCoord.y=$container.outerHeight()/2-($pointer.outerHeight()/2);
				messageCoord.x=position.x-($message.outerWidth()+options.distance);
				messageCoord.y=position.y+($domElement.outerHeight()/2-$message.outerHeight()/2);
			}
			else{
				if(options.position=='right'){
					$pointer.addClass('triangle-point-left');
					$pointer.css({'border-right-width':options.distance,'border-right-color':options.color});
					
					pointerCoord.x=-(options.distance-1);
					pointerCoord.y=$container.outerHeight()/2-($pointer.outerHeight()/2);
					messageCoord.x=position.x+($domElement.outerWidth()+options.distance);
					messageCoord.y=position.y+($domElement.outerHeight()/2-$message.outerHeight()/2);
				}
			}
		}
	}
	
	
	$closeButton.html('Close').addClass('message-close-button');
	$message.css({'padding-top':'10px','background-color':options.color})
	

	$pointer.css('top',pointerCoord.y);
	$pointer.css('left',pointerCoord.x);
	
	$container.css({'left':messageCoord.x,'top':messageCoord.y});

	
	/*By default, the container is hidden*/
	$container.hide();
	
  },
  _handleEvents:function(){
	/*This function will bind the events for all components of the widget*/
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	var $container = widget.container;
	var $message = $container.find('[name="messageSpan"]');
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
				$container.animate({'opacity':options.maxOpacity},100);
				
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
				if(!options.autoClose){
					if(timerId){
						clearTimeout(timerId);
					}
						$container.animate({'opacity':0},options.duration,function(){
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
				$container.animate({'opacity':options.maxOpacity},500);
				
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
	
  },
  _addSpecialEffects:function(){
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	var $container = widget.container;
	var $message = $container.find('[name="messageSpan"]');
	var $pointer = $container.find('[name="pointerSpan"]');
	var $closeButton = $container.find('[name="closeButtonSpan"]');
	
	/*	
		Add a shadow if shadow option is set to true. 
		If the user specifies the shadow values, use the user defined values.
		TODO - The offset of the shadow should depend upon the position of the message container.
	*/
	if(options.shadow){
		var defaultShadow='0 0 10px #000000',shadow='';
		var shadowProperties = {};
		if(typeof options.shadow == 'boolean'){
			shadow=defaultShadow;
		}
		else{
			if(typeof options.shadow == 'string'){
				shadow=options.shadow.length==0?defaultShadow:options.shadow;
			}
		}
		shadowProperties['-webkit-box-shadow']=shadow;
		shadowProperties['-box-shadow']=shadow;
		shadowProperties['-moz-box-shadow']=shadow;
		
		$container.css(shadowProperties);
	}

  }
  
};

 $.widget('ui.message',myMessagePrototype);
 
})(jQuery);