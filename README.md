tttext
======

A jquery plugin to display tooltip text/html.
This plugin lets you choose the position where you want to display the tooltip text 
and a few other customizations.


Available options
=================
	{
	  type: "hover"/"click"/"follow", // String. default is "hover"
	  message: "The message to be displayed inside the tooltip", // String
  	  duration: 300, // Integer. Animation time in milliseconds, default is 300
	  position: "left"/"top"/"right"/"bottom", // String. default is "bottom"
	  offset: 0, // Integer. The tool tip is displayed this many pixels away from its normal position. Default 0.
	  horizontal_centre: true, // Boolean. If true, tool tip is displayed at horizontal centre of the target element.
	  vertical_centre: true, // Boolean. If true, tool tip is displayed at vertical centre of the target element.
	  ttcontainer: $("#tooltip"),  // JQuery object, default is $("#tooltip")
	}
	
	
Usage
=====
  Before using tttext, the function 'init()' should be called like mentioned below.
  The options are optional. But these options will be defaulted to all future attachments.
  
    tttext.init({position: "top"});
  
  Attaching tooltip text to an element. The options provided while attaching will
  override the default options.
    
    ttttext.attach($("p"), {message:"Hello World", position: "bottom"});
    
