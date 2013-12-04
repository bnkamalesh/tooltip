var $ = jQuery;
var tttext = new function() {
	var type = "hover", message= " ", duration = 300, position = "bottom", offset = 0, horizontal_centre = true, vertical_centre = true;
	var tooltip_point = '<span class="point"></span>', ttcontainer = null;

	this.init = function (options) {
		if(ttcontainer===null) {
			$('body').append('<div id="tooltip"></div>');
			ttcontainer = $("#tooltip");
		}
		this.setDefaults(options);
	};

	// setDefaults can be called explicitly to set the default behaviour throughout the page.
	this.setDefaults = function(options) {
		if( typeof options != "undefined" ) {
			type = options.type || type;
			position = options.position || position;
			duration = options.duration || duration;
			ttcontainer = options.container || ttcontainer;
			offset = options.offset || offset;
			if(typeof(options.horizontal_centre)!="undefined")
				horizontal_centre = options.horizontal_centre;

			if(typeof(options.vertical_centre)!="undefined")
				vertical_centre = options.vertical_centre;
		}
	};

	// attach() is used to attach the tool tip to required elements
	this.attach = function(item, options) {

		if( typeof options != "undefined") {
			item.data("type", options.type || type);
			item.data("message", options.message || message);
			item.data("duration", options.duration || duration);
			item.data("position", options.position || position);
			item.data("offset", options.offset || offset);

			if(typeof(options.horizontal_centre)!="undefined")
				item.data("horizontal_centre", options.horizontal_centre);
			else
				item.data("horizontal_centre", horizontal_centre);

			if(typeof(options.vertical_centre)!="undefined")
				item.data("vertical_centre", options.vertical_centre);
			else
				item.data("vertical_centre", vertical_centre);
		}

		// type: used to set the action upon which the tooltip appears
		switch( item.data("type") ) {
			case "hover":
				item.hover(function() {
					show( $(this) );
				}, function() {
					hide();
				});

			break;

			case "follow": // tooltip follows the cursor
				item.mousemove(function(e) {
					$(this).data("position", e.pageX+"#"+e.pageY);
					show($(this), type="follow");
				});

				item.mouseout(function(){
					hide(type="follow");
				});

			break;

			case "click":
				item.click(function() {
					if( ttcontainer.hasClass("active") )
						hide();
					else
						show( $(this) );
				});

			break;

			case "hide":
				hide();
			break;
		}
	};

	// show the tool tip container
	function show(item, type) {
		var item_offset = item.offset(), left, top;
		var width, height, pointer;
		
		ttcontainer.html(item.data("message") + tooltip_point);

		width = ttcontainer.outerWidth(true);
		height = ttcontainer.outerHeight(true);

		left = item_offset.left;
		top = item_offset.top;

		pointer = ttcontainer.find(".point");
		var i_offset = item.data("offset");
		var h_centre = item.data("horizontal_centre");
		var v_centre = item.data("vertical_centre");
		var pos = item.data("position");

		ttcontainer.attr("class", "");
		if( item.data("type") != "follow" )
			ttcontainer.addClass(pos);

		switch(pos) {
			case "left":
				left -= (width+i_offset);
				if(v_centre===true) {
					var h = item.outerHeight(true) - (parseInt(item.css('margin-bottom')));
					h = (h/2) - (ttcontainer.outerHeight(true) / 2);
					if(h<0)
						h*=-1;
					top+=h;
				}
				else {
					top += ( parseInt(item.css("padding-top")) - parseInt(ttcontainer.css("padding-top")) );
				}
				pointer.css("top", (ttcontainer.outerHeight(true) - pointer.outerHeight(true))/2 ).addClass("left");;
			break;

			case "top":
				top -= (height+i_offset);
				if( h_centre === true ) {
						left += ( ( (item.outerWidth(true) - (parseInt(item.css("margin-left")) + parseInt(item.css("margin-right")) ) ) - ttcontainer.outerWidth(true) ) / 2);
				}
				else {
					left -= ttcontainer.outerWidth(true) /2;
				}
				pointer.css("left", (ttcontainer.outerWidth(true) - pointer.outerWidth(true))/2 ).addClass("top");
			break;

			case "right":
				left += (item.outerWidth(true) - parseInt(item.css('margin-right')) )+i_offset;
				if(v_centre===true) {
					var h = item.outerHeight(true) - (parseInt(item.css('margin-bottom')));
					h = (h/2) - (ttcontainer.outerHeight(true) / 2);
					if(h<0)
						h*=-1;
					top+=h;
				}
				else {
					top += ( parseInt(item.css("padding-top")) - parseInt(ttcontainer.css("padding-top")) );
				}
				pointer.css("top", (ttcontainer.outerHeight(true) - pointer.outerHeight(true))/2 ).addClass("right");;

			break;

			default: //bottom, follow
				var split_pos = item.data("position").split("#");

				if( split_pos[1] ) {
					left = parseInt(split_pos[0]) + 5;
					top = parseInt(split_pos[1]) + 5;
				}
				else {
					if( h_centre === true ) {
						left += ( (item.outerWidth(true) / 2) - (ttcontainer.outerWidth(true) / 2) );
					}
					top += (item.outerHeight(true) - parseInt(item.css('margin-bottom')) ) + i_offset;
					pointer.css("left", (ttcontainer.outerWidth(true) - pointer.outerWidth(true))/2 ).addClass("bottom");
				}

			break;
		}

		ttcontainer.css("left", left);
		ttcontainer.css("top", top);

		if(type=="follow")
			ttcontainer.fadeIn(duration).addClass("active");
		else
			ttcontainer.stop(true, true).fadeIn(duration).addClass("active");
	}

	function hide(type) {
		var opt = true;
		if(type=='follow')
			opt = false;
		ttcontainer.stop(opt, opt).fadeOut(duration).removeClass("active");
	}

	this.manual_hide = function() {
		hide();
	};
	this.manual_show = function(item) {
		show(item);
	};
};