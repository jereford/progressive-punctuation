//
// NAMESPACE (NAMESPACE)
//



(function( NAMESPACE, $, undefined ) {

	NAMESPACE.property = '';
	var privateProperty  = '';

	// Global Marks Array (Important: Match these to the order of Marks Slider and Marks Modal)
	var marksArray = [
		"acclamation",
		"exclamation-comma",
		"interrobang",
		"elrey",
		"irony",
		"love-point",
		"friendly-period",
		"authority",
		"certitude",
		"sarcmark",
		"rhetorical-question",
		"doubt",
		"question-comma",
		"snark-mark"
	];

	// getUrlParam
	//
	// Utility function to snag a query string value when passed the parameter
	//
	function getUrlParam(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (!results) {
			return 0;
		}
		return results[1] || 0;
	}

	function sliderLoader(slideNumber) {
		$('.mark-slider').slick({
			dots: false,
			infinite: true,
			speed: 300,
			arrows: true,
			slidesToShow: 1,
			adaptiveHeight: true,
			variableWidth: false,
			draggable: true,
			swipe: false,
			fade: true,
			cssEase: 'linear',
			prevArrow: "<svg class='icon slick-arrow slick-prev'>\
  								<use xlink:href='#left-chevron'/>\
								</svg>",
			nextArrow: "<svg class='icon slick-arrow slick-next'>\
  								<use xlink:href='#right-chevron'/>\
								</svg>",
			initialSlide: slideNumber,
			appendArrows: $('.mark-container .arrows-container')
		});
		// console.log('Load slider');
	}

	function updateSlide(slideNumber) {
		$('.mark-slider').slick('slickGoTo', slideNumber, true);
		console.log('Starts at slide 0')
		console.log('Going to slide ' + slideNumber);
		console.log('Do not worry, this is only printing 3 times because we are currently using duplicate marks');
	};

	// Load slider and set initial slide
	function loadMarks() {
		var mark = window.location.hash.substring(1);

		if (mark) {
			$.each(marksArray, function(index, value) {
				if (mark == value) {
					sliderLoader(index);
					return false;
				}
			});
		} else {
			sliderLoader();
		}
	}

	// color shift on header
	function headerShift() {
		aboveFold = $('.mark-hero').outerHeight() - 50;
		if ( $(window).scrollTop() > aboveFold ) {
			$('header').addClass('color-shift');
		} else {
			$('header').removeClass('color-shift');
		}
	}


	// twitter api
	function handleTweets(tweets) {
	    var x = tweets.length;
	    var n = 0;
	    var element = document.getElementById('twitterContainer');
	    var html = '<ul>';
	    while(n < x) {
	      html += '<li>' + tweets[n] + '</li>';
	      n++;
	    }
	    html += '</ul>';
	    element.innerHTML = html;
			// swap out twitter handle with icon
			setTimeout(function(){
				$('.twitter-container .user').html('<img src="assets/img/icons/twitter_icon_launch_banner.svg">');
			}, 350);
	}


	function twitterAPI() {
		$.getScript('assets/js/twitterFetch.js', function() {
			//script is loaded and executed put your dependent JS here
			var configProfile = {
				"profile": {"screenName": 'PunctuationTalk'},
				"domId": 'twitterContainer',
				"maxTweets": 1,
				"enableLinks": false,
				"showUser": true,
				"showTime": false,
				"showImages": false,
				"showRetweet": false,
				"customCallback": handleTweets,
				"showInteraction": false
			};
			twitterFetcher.fetch(configProfile);

		});
	}

	// -----------------------------------------
	// PUBLIC
	//
	// Methods
	//


	//
	// init
	//
	NAMESPACE.init = function() {

		// Put document ready code here!
		console.log('Document Ready!');


		// Parallax Baby
		var rellax = new Rellax('.parallax');

		if ( $('body').hasClass('home') ) {

			twitterAPI();

			$(window).on('resize', function () {
				var headerHeight = $('.header').height();
				$('.main-container').css('padding-top', headerHeight);
			});

		}

		if ( $('body').hasClass('mark') ) {

			// $(window).on('scroll', headerShift);

			loadMarks();

			$('.mark-slider').find('.slick-active').find('.mark-background, .mark-name, .description').addClass('fadeInUp');

		}

		// Trigger Slide Arrows
		$('body').on('click', '.slick-next', function() {
			console.log('left');
			// $('.mark-slider').slick('slickPrev');
		});

		// Update Current Slide
		$('.mark-slider').on('beforeChange', function(event, slick, currentSlide){
			var currentMark = $('.slick-active').find('.mark-background, .mark-name, .description');
			currentMark.removeClass('fadeInUp');
			currentMark.addClass('fadeOutUp');
			$('.slick-active').find('.dots li:first-child').trigger('click');
			$('.slide-indicator').removeClass('active');
		});

		// Update Next Slide
		$('.mark-slider').on('afterChange', function(event, slick, currentSlide){
			var nextMark = $('.slick-active').find('.mark-background, .mark-name, .description');
			nextMark.removeClass('fadeOutUp');
			nextMark.addClass('fadeInUp');

			window.location.hash = marksArray[currentSlide];
 		});

		// About Nav Switch
		$('body').on('click', '.about-left h1', function() {
			var selectedRaw = $(this).text();
			var selected = selectedRaw.toLowerCase();

			$(this).closest('.modal-content').removeClass('info process contact credits');
			$(this).closest('.modal-content').addClass(selected);
		});

		// Quote Container Dots Switch
		$('body').on('click', '.dots li', function() {
			var quoteIndex = $(this).index() + 1;
			var quoteDots = $(this).siblings();
			var quoteWrapper = $(this).closest('.quote-container').find('.quote-wrapper');
			var activeSlide = quoteWrapper.find('.quote-slide.active');

			quoteDots.removeClass('active');
			activeSlide.removeClass('active');
			activeSlide.children().removeClass('fadeInLeft');

			$(this).addClass('active');
			quoteWrapper.find('.quote-slide:nth-child(' + quoteIndex + ')').addClass('active');
			quoteWrapper.find('.quote-slide:nth-child(' + quoteIndex + ')').children().addClass('fadeInLeft');

			// If want to change animation style (don't forget to remove animation delays on elements in quote slide)
			// quoteDots.removeClass('active');
			// activeSlide.removeClass('active');
			// // activeSlide.children().removeClass('fadeInLeft');
			//
			// $(this).addClass('active');
			// quoteWrapper.find('.quote-slide:nth-child(' + quoteIndex + ')').addClass('active zoomIn');
			// // quoteWrapper.find('.quote-slide:nth-child(' + quoteIndex + ')').children().addClass('fadeInLeft');
		});

		// Open Modals
		$('body').on('click', '.nav-menu .modal-trigger', function() {
			var modalTrigger= $(this).attr('id');
			var modal = modalTrigger.replace('Trigger', '');
			$('#' + modal).addClass('zoomIn modal-on');

			setTimeout(function(){
			  $('#' + modal).removeClass('zoomIn');
			}, 2000);

			$('body').addClass('modal-open');
		});

		$('body').on('click', '.close-marksModal, .close-aboutModal', function() {
			$(this).parents('.modal').fadeOut(400, function() {
				$(this).removeClass('modal-on');
				$(this).css('display', 'unset');
			});
			$('body').removeClass('modal-open');
		});

		$('body').on('click', '.modal-overlay', function() {
			$('.close-aboutModal').click();
		});


		// Marks Hover
		$('body').on({
			mouseenter: function() {
				var originalImg = $(this).find('img').attr('src');
				var newImageRaw = originalImg.split("blue.svg").join('');
				var newImage = newImageRaw + 'hover.svg';
				// console.log(originalImg);
				// console.log(newImage);
				$(this).find('img').data('original-image', originalImg);
				$(this).find('img').attr('src', newImage);

			},
			mouseleave: function() {
				var originalImg = $(this).find('img').data('original-image');
				$(this).find('img').attr('src', originalImg);
			}

		}, '.modal-box');

		// Go To Specific Slide
		$('body.mark').on('click', '.modal-box', function() {
			var slideNumber = $(this).data('slide-number');
			$('.close-marksModal').trigger('click');
			$('body').removeClass('modal-open');
			window.scrollTo(0, 0);
			updateSlide(slideNumber);
		});

		// Get rid of double scroll
		$('body').on('click', '.close-twitter', function() {
			var headerHeight = $('.header').height();
			$('.main-container').css('padding-top', headerHeight);
			$('.twitter-wrapper').addClass('closed');
		});

		// Slider Arrows Hover
		var tap = ("ontouchstart" in document.documentElement);

		if (!tap) {
			$('.slick-arrow').mouseenter( function(){
				var prevArrow = $(this).is('.slick-prev');
				var nextArrow = $(this).is('.slick-next');
				var currentMarkIndex = $('.slick-active').data('slick-index');
				if (prevArrow) {
					// if the current slide is the first slide
					if (currentMarkIndex == 0) {
						var prevSlide = marksArray[marksArray.length - 1];
					} else {
						var prevMarkIndex = currentMarkIndex - 1;
						var prevSlide = marksArray[prevMarkIndex];
					}

					// console.log(prevSlide);
					var prevMark = prevSlide.replace('-', ' ');
					$('.prev-slide-indicator').html('\
						<div class="indicator-container">\
							<img src="../assets/img/slider-icons/' + prevSlide + '.svg">\
							<p>' + prevMark + '</p>\
						</div>\
					');
					$('.prev-slide-indicator').addClass('active');
				}

				if (nextArrow) {
					// if the current slide is the last slide
					if (currentMarkIndex == marksArray.length - 1) {
						var nextSlide = marksArray[0];
					} else {
						var nextMarkIndex = currentMarkIndex + 1;
						var nextSlide = marksArray[nextMarkIndex];
					}

					// console.log(nextSlide);
					var nextMark = nextSlide.replace('-', ' ');
					$('.next-slide-indicator').html('\
					<div class="indicator-container">\
						<p>' + nextMark + '</p>\
						<img src="../assets/img/slider-icons/' + nextSlide + '.svg">\
					</div>\
					');
					$('.next-slide-indicator').addClass('active');
				}

			}).mouseleave( function(){
				$('.slide-indicator').removeClass('active');
			});
		}

	};


	// -----------------------------------------
	// DOCUMENT READY
	//
	$(document).ready(function() { NAMESPACE.init(); });

}(window.NAMESPACE = window.NAMESPACE || {}, jQuery));
