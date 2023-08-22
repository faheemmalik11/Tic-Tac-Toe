(function($) {
	"use strict";
	
	//P-scrolling
	
	 if($(window).width() < 992){
			const ps12 = new PerfectScrollbar('.hor-menu', {
			  useBothWheelAxes:true,
			  suppressScrollX:true,
			});
	 }
	
	
	
})(jQuery);

