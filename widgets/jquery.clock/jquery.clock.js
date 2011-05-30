(function($){
 var clockPrototype={
  options:{
	level:1
  },
  _create:function(){
	   //console.log('clock create');
	   var widget=this;
	   var $domElement=widget.element;
	   var options=widget.options;
	 
  },
  _init:function(){
   //console.log('init');
  },
  setLevel:function(level){
	var widget=this;
	var $domElement=widget.element;
	var options=widget.options;
	
	
	
  }
 };
 
 $.widget('ui.clock',clockPrototype);
 
})(jQuery);