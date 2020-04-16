$('.carousel').carousel({
  interval:0,

})

$(document).ready(function(){
	$(".carousel").swipe( {
		swipeLeft: function() {
			$(this).carousel("next");
		},
		swipeRight: function() {
			$(this).carousel("prev");
		},
		allowPageScroll: "vertical"
	});

	const button = $('#navbar-toggler');
	const header = $('#header-descr');

	button.on('click', () => header.toggleClass('header-descr-open'));
});

