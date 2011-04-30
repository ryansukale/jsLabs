(function($){
 var myWidgetPrototype={
  options:{
	level:1
  },
  _create:function(){
	   //console.log('create');
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
 
 $.widget('ui.myWidget',myWidgetPrototype);
 
})(jQuery);