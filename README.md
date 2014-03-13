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
	  
	  ttcontainer: $("#tooltip"),  // JQuery object, default is $("#tooltip")
	}
	
	
Usage
=====
  Before using tttext, the function 'init()' should be called like mentioned below.
  Options set during 'init()' will be set as default and be used on all future uses.
  tttext.init({position: "top"});
  
  Attach tooltiptext to an element like shown below. Options provided will override default options.
    ttttext.attach($("p"), {
    	message:"Hello World", 
    	position: "bottom", 
    	type: "click", 
    	condition: function() {
    		if(1==1)return true;
    		return false;
    		
    	} 
    	});
    
