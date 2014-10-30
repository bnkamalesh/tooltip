tttext
======

A jquery plugin to display tooltip text/html.
This plugin lets you choose the position where you want to display the tooltip text 
and a few other customizations.


Available options
=================
	{
	  type: "hover" / "click" / "follow", // String. default is "hover"
	  
	  message: "The message to be displayed inside the tooltip", // String/HTML. This is mandatory
	  
  	  duration: 300, // Integer. Animation time in milliseconds, default is 300
  	  
	  position: "left"/"top"/"right"/"bottom", // String. default is "bottom"
	  
	  offset: 0, // Integer. The tool tip is displayed this many pixels away from its normal position. Default 0.
 
	  condition: function() // A function which should return either true or false.
	  
	  horizontal_centre: true, // Boolean. If true, tool tip is displayed at horizontal centre of the target 					      element. default true
	  
	  vertical_centre: true, // Boolean. If true, tool tip is displayed at vertical centre of the target 						    element.Default true
	  
	  custom_class: "tip", // A custom class can be added to the tool tip container, can be used to define
	                          individual styles for the tooltip, for respective targets. Default ''
	                          
	  body_overflow: false, // If set to true, whenever the tool tip is displayed, scrolling will be disabled
	                          on body. Default, false. This is done by adding class "no-overflow" to body.
	                          
	  ttcontainer: $("#tooltip"),  // JQuery object, default is $("#tooltip")
	}

Available Methods
=================

	tttext.init(options)       	   : options - JSON OBJECT, same as the options mentioned above. Can be called 					     any number of times to reset default options.
	
	tttext.attach(target, options)     : target - JQuery object of the target element.
					     options - JSON OBJECT, same as the options mentioned above

	tttext.show(target)	   : target - JQuery object of the target element.
					    -show the tooltip attached to an element manually.

	tttext.hide()		   : Manually hide currently visible tooltip.
	
	
Usage
=====
  Before using tttext, the function 'init()' should be called like mentioned below.
  Options set during 'init()' will be set as default and be used on all the target elements unless inidivual options    are provided for each.
  
  tttext.init({position: "top"});
  
  Attach tooltiptext to an element like shown below. Options provided here will override default options.
  
    tttext.attach($("p"), {
    	message:"Hello World", 
    	position: "bottom", 
    	type: "click", 
    	condition: function() {
    		if(1==1)return true;
    		return false;
    		
    	} 
    	});
    
