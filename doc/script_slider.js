$(document).ready(function(){
	$('.slider').slick({
		arrows:true,

		slidesToShow:2,
		speed:1000,
		centerPadding: 20,
		autoplaySpeed:3000,
		touchThreshold:1,
		responsive:[
		{
			breakpoint: 768,
			settings: {
				slidesToShow:1
			},

			breakpoint: 992,
			settings: {
				slidesToShow:1
			}
		}
		]
	});

});