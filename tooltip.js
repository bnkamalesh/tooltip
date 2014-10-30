var tttext = (function() {
	// The following variables save the default values

	var tooltip_point = $('<span class="point"></span>'), tinst = null,
		ttcontainer = $('<div id="tooltip"></div>'), html_cont = $("html"),
		win_height = $(window).outerHeight(true), doc_height = html_cont.outerHeight(true), options = {};


	/* 
	tooltip_point: This is used simply to display the pointer
	ttcontainer: The container in which tooltip is displayed
	tinst: This instance
	*/

	return {
		init: function (opts) {
				tinst = this;
				if(!opts)
					opts = {};

				options = {
					type: opts.type || "hover", // Type of action with which tool tip is triggered. Available types: "hover", "click", "follow". Default: "hover"
					position: opts.position || "top", // Position at which the tooltip appears. Available positions: "top", "right", "bottom", "left". Default: "bottom"
					duration: opts.duration || 300, // Animation duration. Default: 300
					offset: opts.offset || 0, // Offset. Tooltip appears 'offset' pixels away from the actual position. Default: 1
					horizontal_centre: (typeof opts.horizontal_centre=="undefined")? true : opts.horizontal_centre, // If true, tooltip appears at the horizontal centre of the target element. Default: true
					vertical_centre: (typeof options.vertical_centre=="undefined")? true : opts.vertical_centre, // If true, tooltip appears at the vertical centre of the target element. Default: true
					condition: (typeof options.condition=="function")? options.condition : function(){ return true; }, // A function, which will be checked before displaying the tooltip
					allow_body_overflow: (typeof options.allow_body_overflow=="undefined")? true :  options.allow_body_overflow,
					custom_class: opts.custom_class || ""
				};

				if($("body #tooltip").length===0)
					$('body').append(ttcontainer);
		},
		attach: function(item, opts) {
			if(!item) return;

			item.data("type", opts.type || options.type);
			item.data("duration", opts.duration || options.duration);
			item.data("position", opts.position || options.position);
			item.data("offset", opts.offset || options.offset);
			item.data("condition", opts.condition || options.condition);
			item.data("message", opts.message); // Content of the Tooltip, this can be HTML too.
			item.data("h_centre", (typeof opts.horizontal_centre=="undefined") ? options.horizontal_centre : opts.horizontal_centre );
			item.data("v_centre", (typeof opts.vertical_centre=="undefined") ? options.vertical_centre : opts.vertical_centre);
			item.data("allow_body_overflow", (typeof opts.allow_body_overflow=="undefined") ? opts.allow_body_overflow : options.allow_body_overflow);
			item.data("custom_class", opts.custom_class || options.custom_class);

			// type: used to set the action upon which the tooltip appears
			switch( item.data("type") ) {
				case "follow": // tooltip follows the cursor
					item.mousemove(function(e) {
						item.data("position", e.pageX+"#"+e.pageY);
						tinst.show($(this));
					});

					item.mouseout(function() {
						tinst.hide(type="follow");
					});
				break;

				case "click":
					item.click(function() {
						( ttcontainer.hasClass("active") )? tinst.hide(): tinst.show( $(this) );
					});

				break;

				default:
					// Default type, hover
					item.hover(function() {
						tinst.show( $(this) );
					}, function() {
						tinst.hide();
					});
			}
			return item;
		},
		show: function(item) {
			// show the tool tip container
			if(!item.data("condition").call()) return item;

			var item_offset = item.offset(), left=item_offset.left, top=item_offset.top,item_type = item.data("type"),
				pos_class=((item_type=="follow")?item_type:item.data("position"));

			ttcontainer.html(item.data("message")).append(tooltip_point).attr("class","active "+pos_class+" "+item.data("custom_class"));

			switch(item.data("position")) {
				case "left":
					left -= (ttcontainer.outerWidth(true)+item.data("offset"));
					if(item.data("v_centre")) {
						var h = item.outerHeight(true) - (parseInt(item.css("margin-bottom")));
						h = (h/2) - (ttcontainer.outerHeight(true) / 2);
						if(h<0)
							h*=-1;
						top+=h;
					}
					else
						top += ( parseInt(item.css("padding-top")) - parseInt(ttcontainer.css("padding-top")) );
				break;

				case "top":
					top -= (ttcontainer.outerHeight(true)+item.data("offset"));

					(item.data("h_centre")===true)? left += ( ( (item.outerWidth(true) - (parseInt(item.css("margin-left")) + parseInt(item.css("margin-right")) ) ) - ttcontainer.outerWidth(true) ) / 2) : 
					left -= ttcontainer.outerWidth(true) /2;
					
				break;

				case "right":
					left += (item.outerWidth(true) - parseInt(item.css("margin-right")) )+item.data("offset");
					if(item.data("v_centre")) {
						var h = item.outerHeight(true) - (parseInt(item.css("margin-bottom")));
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
						left = (item.data("h_centre"))? left += ( (item.outerWidth(true) / 2) - (ttcontainer.outerWidth(true) / 2) ): left;
						top += (item.outerHeight(true) - parseInt(item.css("margin-bottom")) ) + item.data("offset");
					}
			}

			ttcontainer.css("left", (left<0) ? 0 : left);
			ttcontainer.css("top", (top<0) ? 0 : top);

			tooltip_point.css("left", (ttcontainer.outerWidth(true)/2) - (tooltip_point.outerWidth(true)/2) );

			if((win_height > doc_height) && item.data("allow_body_overflow")===false )
				html_cont.addClass("no-overflow");

			(item_type=="follow")? ttcontainer.stop(true, true).fadeIn(item.data("duration")) : ttcontainer.stop(true, true).fadeIn(item.data("duration"));
		},
		hide: function(type) {
			html_cont.removeClass("no-overflow");
			var opt = (type=="follow")? false : true;
			ttcontainer.stop(opt, opt).fadeOut(options.duration).removeClass("active");
		}
	};
}());
