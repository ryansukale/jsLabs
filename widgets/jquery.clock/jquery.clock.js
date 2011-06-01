(function($){
 var clockPrototype={
  options:{
  },
  _create:function(){
	   console.log('clock create');
	   var widget=this;
	   var $domElement=widget.element;
	   var options=widget.options;
	   
	   //Create the dom for the clock widget
	   var $clockContainer = widget._createClock();
	   
	   
	   $('body').append($clockContainer);
	   $clockContainer.hide();
	   
	   $domElement.click(function(){
		$clockContainer.show();
	   });
	   
	   $('.widget-clock-controls .control-selection',$clockContainer).click(function(event){
		var $this = $(this);
		
		//console.log('selected hand');
		$this.addClass('widget-clock-selected-hand')
			.siblings().removeClass('widget-clock-selected-hand');
	   });
	   
	   var time = {hours:10,mins:10};	
	   $(".widget-clock-dial",$clockContainer).bind('click',function(event){
			//console.log("x : " + event.pageX+ " y : " + event.pageY);
			
			var $hourHand = $('.widget-hour-hand',$(this));
			var $minuteHand = $('.widget-minute-hand',$(this));
			
			var hourHandOffset = widget._getPosition($hourHand[0]);
			
			//console.dir(hourHandOffset);
			
			var angle = widget._getDegreeAngle(event,hourHandOffset);
			//console.log($hourHand.css('-moz-transform'));
			
			var $controls = $('.widget-clock-controls .control-selection',$clockContainer);
			
			if($controls.eq(0).hasClass('widget-clock-selected-hand')){
				$hourHand.css({'-moz-transform':'rotate('+angle+'deg)'});
				time.hours = widget._getTime(angle,true);
			}
			else{
				console.log(angle);
				$minuteHand.css({'-moz-transform':'rotate('+angle+'deg)'});
				var newMins = widget._getTime(angle,false);
				
				time.mins=newMins;
				
				
				var hourAngle = widget._getInfluencedHourAngle(time);
				$hourHand.css({'-moz-transform':'rotate('+hourAngle+'deg)'});
				
			}
			
			console.log(time);
			
	   });
	 
  },
  _init:function(){
   //console.log('init');
  },
  _getDegreeAngle:function(event,originOffset){
	//console.log('calculating angle');
	var x = event.pageX - originOffset.x;
	var y = event.pageY - originOffset.y;
	
	var actualAngle = Math.atan2(y,x)*180/Math.PI;
	var remainder=actualAngle%30;
	var floor = actualAngle-remainder;
	var ceil = floor+30;
	
	console.log('floor : '+floor);
	if(actualAngle<0)
	{
		floor=floor-30;
		ceil=floor+30;
		remainder= (30+remainder);
	}
	
	var roundedOffAngle = remainder < 14?floor:ceil;
	
	roundedOffAngle=roundedOffAngle==-180?180:roundedOffAngle;
	//console.log('remainder : '+remainder);
	console.log('actualAngle : '+actualAngle);
	console.log('floor : '+floor);
	console.log('ceil : '+ceil);
	//console.log('roundedOffAngle : '+roundedOffAngle);
	
	return roundedOffAngle;
	
  },
  _createClock:function(){
  
	/*
	var $clockContainer=$('<div class="widget-clock-container"></div>');
	var $dial=$('<div class="widget-dial"></div>');
	var $controls=$('<div class="widget-clock-controls"></div>');
	
	var $controls=$('<div class="widget-clock-dial-center"></div>');
	*/
	
	return $('<div class="widget-clock-container">'+
				'<div class="widget-clock-dial">'+
				'	<div class="widget-clock-dial-center"></div>'+
				'	<div class="widget-hour-hand"></div>'+
				'	<div class="widget-minute-hand"></div>'+
				'	<div class="time-0">|</div>'+
				'	<div class="time-1">|</div>'+
				'	<div class="time-2">|</div>'+
				'	<div class="time-3">|</div>'+
				'	<div class="time-4">|</div>'+
				'	<div class="time-5">|</div>'+
				'	<div class="time-6">|</div>'+
				'	<div class="time-7">|</div>'+
				'	<div class="time-8">|</div>'+
				'	<div class="time-9">|</div>'+
				'	<div class="time-10">|</div>'+
				'	<div class="time-11">|</div>'+
				'</div>'+
				'<div class="widget-clock-controls">'+
				'	<div class="control-selection">HOUR</div>'+
				'	<div class="control-selection">MINUTES</div>'+
				'</div>'+
				'<div class="widget-clock-display">'+
				'</div>'+
			'</div>');
	
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
  _getTime:function(angle,isHours){
	var time='';
	//Positive angle indicates that the time is inside the third and fourth quadrant
	//Negative angle indicates that the time is inside the first and second quadrant
	if(angle<0){
		//Quandrant 1 has time from 12 to 2
		var diff = Math.floor(angle/30);
		var hours = diff>-3?3+diff:15+diff;
		time = hours;
	}
	else{
		//Quadrant 3 and 4 have time from 3hours to 6 hours.
		var hours = 3 + Math.floor(angle/30);
		time = hours;
	}
	
	//if it is hours, then return the value directly, else return the minutes by multiplying by 5
	return isHours?time:time*5;
	
  },
  _getInfluencedHourAngle:function(time){
	var minutesAngle = time.mins*6;
	
	var currentHourAngle = time.hours*30;
	
	if(minutesAngle==360){
	time.hours=time.hours+1;
	
	}
	currentHourAngle=currentHourAngle==360?0:currentHourAngle;
	
	var newHourAngle = currentHourAngle + (minutesAngle/360)*30;
	
	//console.log('currentHourAngle : '+currentHourAngle);
	//console.log('newHourAngle : '+newHourAngle);
	//console.log('minutesAngle : '+minutesAngle);
	
	var cssAngle = 0;
	if(newHourAngle>90&&newHourAngle<270){
		cssAngle =  newHourAngle-90;
	}else
	{
		cssAngle = newHourAngle<90?newHourAngle-90:newHourAngle-450; 
	}
	
	console.log('cssAngle : '+cssAngle);
	
	return cssAngle;
  }
 };
 
 $.widget('ui.clock',clockPrototype);
 
})(jQuery);