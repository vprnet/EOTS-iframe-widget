$(document).ready(function() {
	adjustSize();
	$(window).resize(function() {
		adjustSize();
	});
});

function adjustSize() {
	var width = $(window).width();
	if(width<=320) {
		$("#jp-eos-logo").addClass("small");
	}
	else {
		$("#jp-eos-logo").removeClass("small");	
	}
}