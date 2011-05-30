/**
* Copyright 2011 Ryan Sukale
* This program is distributed under the terms of the GNU General Public License Version 3.
* Please check license.txt for details or log on to http://www.gnu.org/licenses/gpl.html
*/

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