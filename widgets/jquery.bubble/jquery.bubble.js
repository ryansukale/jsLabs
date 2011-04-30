(function($){
 var myBubblePrototype={
  options:{
	content:'Default Text as das da sd asd a sd a sd as',
	display:'click',
	duration:1000
  },
  _create:function(){
	//console.log('create');
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	
	/*Create the dom element that will be used to hold the details of the bubble*/
	var $bubble = $('<span></span>');
	
	/**/
	$bubble.addClass('bubble-visible');
	$bubble.html(options.content);
	
	
	$bubble.css('left',$domElement[0].offsetLeft+$domElement.outerWidth());
	$bubble.css('top',$domElement[0].offsetTop-($domElement.height()/1.2));
	
	/*By default, the bubble is hidden*/
	//$bubble.css({'opacity':0,'display':'none'});
	//$bubble.css({'opacity':0,'display':'none'});
	$('body').append($bubble);
	
	
	/*Bind the event of the browser to the dom element*/
	$domElement.bind(options.display,function(event){
		widget._show(event);
	});
	
	widget.bubble=$bubble;
	
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
	
	
	console.log($domElement[0].offsetLeft+$domElement.outerWidth());
	console.log($domElement[0].offsetTop+$domElement.height());
	
	//$bubble.css('left','10px');
	//$bubble.css('top','10px');
	
	//console.log($bubble.css('left'));
	
	//console.log($bubble);
	$bubble.show();
	$bubble.animate({'opacity':'1'},options.duration);
	
	console.log('show');
	
	
	
  },
  
};
 
 $.widget('ui.bubble',myBubblePrototype);
 
})(jQuery);