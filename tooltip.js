var $ = jQuery;
var tttext = new function() {

	// The following variables save the default values

	var type="hover", duration = 300, position = "bottom", offset = 0, 
		horizontal_centre = true, vertical_centre = true,
		condition = function(){return true;}, 
		tooltip_point = $('<span class="point"></span>'), ttcontainer = $('<div id="tooltip"></div>');

	/* 
	tooltip_point: This is used simply to display the pointer
	ttcontainer: The container in which tooltip is displayed
	*/

	this.init = function (options) {
		if(!options || !options.container)
			$('body').append(ttcontainer);
		this.setDefaults(options);
	};

	// setDefaults can be called explicitly to set the default behaviour throughout the page.
	this.setDefaults = function(options) {
		if(options) {
			type = options.type || ''; // Type of action with which tool tip is triggered. Available types: "hover", "click", "follow". Default: "hover"
			position = options.position || position; // Position at which the tooltip appears. Available positions: "top", "right", "bottom", "left". Default: "bottom"
			duration = options.duration || duration; // Animation duration. Default: 300
			ttcontainer = options.container || ttcontainer; // Tooltip container
			offset = options.offset || offset; // Offset. Tooltip appears 'offset' pixels away from the actual position. Default: 0
			horizontal_centre = options.horizontal_centre || horizontal_centre; // If true, tooltip appears at the horizontal centre of the target element. Default: true
			vertical_centre = options.vertical_centre || vertical_centre; // If true, tooltip appears at the vertical centre of the target element. Default: true
			condition = options.condition || condition; // A function, which will be checked before displaying the tooltip
		}
	};

	// attach() is used to attach the tool tip to required elements
	this.attach = function(item, options) {
		item.data("type", options.type || type);
		item.data("duration", options.duration || duration);
		item.data("position", options.position || position);
		item.data("offset", options.offset || offset);
		item.data("condition", options.condition || condition);
		item.data("message", options.message); // Content of the Tooltip, this can be HTML too.
		item.data("h_centre", (typeof options.horizontal_centre == "undefined")? horizontal_centre : options.horizontal_centre);
		item.data("v_centre", (typeof options.vertical_centre == "undefined")? vertical_centre : options.vertical_centre);

		// type: used to set the action upon which the tooltip appears
		switch( item.data("type") ) {
			case "follow": // tooltip follows the cursor
				item.mousemove(function(e) {
					$(this).data("position", e.pageX+"#"+e.pageY);
					show($(this));
					return;
				});

				item.mouseout(function() {
					hide(type="follow");
					return;
				});
			break;

			case "click":
				item.click(function() {
					if( ttcontainer.hasClass("active") )
						hide();
					else
						show( $(this) );
					return;
				});

			break;

			default:
				item.hover(function() {
					show( $(this) );
					return;
				}, function() {
					hide();
					return;
				});
			break;
		}
		return item;
	};

	// show the tool tip container
	function show(item) {
		if(!item.data("condition")()) return;

		var item_offset = item.offset(), left=item_offset.left, top=item_offset.top,
			i_offset = item.data("offset"), h_centre = item.data("h_centre"),
			v_centre = item.data("v_centre"), pos = item.data("position"),
			item_height = item.outerHeight(true), item_width = item.outerWidth(true);

		ttcontainer.html(item.data("message")).append(tooltip_point.attr("class", "point "+pos));
		ttcontainer.attr("class", "");
		if( item.data("type") != "follow" )
			ttcontainer.addClass(pos);

		switch(pos) {
			case "left":
				left -= (ttcontainer.outerWidth(true)+i_offset);
				if(v_centre) {
					var h = item_height - (parseInt(item.css('margin-bottom')));
					h = (h/2) - (ttcontainer.outerHeight(true) / 2);
					if(h<0)
						h*=-1;
					top+=h;
				}
				else
					top += ( parseInt(item.css("padding-top")) - parseInt(ttcontainer.css("padding-top")) );
			break;

			case "top":
				top -= (ttcontainer.outerHeight(true)+i_offset);

				if(h_centre)
					left += ( ( (item_width - (parseInt(item.css("margin-left")) + parseInt(item.css("margin-right")) ) ) - ttcontainer.outerWidth(true) ) / 2);
				else
					left -= ttcontainer.outerWidth(true) /2;
			break;

			case "right":
				left += (item_width - parseInt(item.css('margin-right')) )+i_offset;
				if(v_centre) {
					var h = item_height - (parseInt(item.css('margin-bottom')));
					h = (h/2) - (ttcontainer.outerHeight(true) / 2);
					if(h<0)
						h*=-1;
					top+=h;
				}
				else
					top += ( parseInt(item.css("padding-top")) - parseInt(ttcontainer.css("padding-top")) );

			break;

			default: //bottom
				var split_pos = item.data("position").split("#"); // Split is used incase of follow, to get x,y of cursor.

				if( split_pos[1] ) {
					left = parseInt(split_pos[0]) + 5;
					top = parseInt(split_pos[1]) + 5;
				}
				else {
					left = (h_centre)? left += ( (item_width / 2) - (ttcontainer.outerWidth(true) / 2) ): left;
					top += (item_height - parseInt(item.css('margin-bottom')) ) + i_offset;
				}

			break;
		}

		left = (left<0) ? 0 : left;
		top = (top<0) ? 0 : top;

		ttcontainer.css("left", left);
		ttcontainer.css("top", top);

		
		if(item.data("type")=="follow")
			ttcontainer.fadeIn(duration).addClass("active");
		else
			ttcontainer.stop(true, true).fadeIn(duration).addClass("active");
	}

	function hide(type) {
		var opt = (type=='follow')? false : true;
		ttcontainer.stop(opt, opt).fadeOut(duration).removeClass("active");
	}

	this.manual_hide = function() { hide(); };
	this.manual_show = function(item) { show(item); };
};
