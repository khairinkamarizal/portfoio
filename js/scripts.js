/**
Khairinkamarizal
khairin.xyz

khairinkamarizal@gmail.com
**/

( function( $ ) {
	'use strict';

	window.onpageshow = function(event) {if (event.persisted) {window.location.reload() }};

	$(window).on("load", function() {

		/*
			Preloader
		*/
		var preload = $('.preloader');
		preload.find('.spinner').fadeOut(function(){
			preload.fadeOut();
		});

		/*
			Lines Animations
		*/
		$('.lines').addClass('finish');
		setTimeout(function(){
			$('.lines').addClass('ready');
		}, 2000);

		/*
			Typed Subtitle
		*/
		if(($('.typed-subtitle').length) && ($('.h-subtitle p').length > 1)){
			$('.typed-subtitle').each(function(){
				$(this).typed({
					stringsElement: $(this).prev('.typing-subtitle'),
					loop: true
				});
			});
		}
		
		/*
			Typed Breadcrumbs
		*/
		setTimeout(function(){
			$('.h-subtitles').addClass('ready');
			if($('.typed-bread').length){
				$('.typed-bread').typed({
					stringsElement: $('.typing-bread'),
					showCursor: false
				});
			}
		}, 1000);

		/*
			One Page Nav
		*/
		var url_hash = location.hash;
		var sectionElem = $(url_hash);
		if(url_hash.indexOf('#section-') == 0 && sectionElem.length){
			$('body, html').animate({scrollTop: $(url_hash).offset().top - 68}, 400);
		}

		/*
			Jarallax
		*/
		if($('.jarallax').length){
			$('.jarallax').jarallax();
		}

		/*
			Started Slider
		*/
		if($('.started-carousel').length){
			var started_slider = new Swiper ('.started-carousel .swiper-container', {
				init: false,
				loop: false,
				spaceBetween: 0,
				effect: 'fade',
				slidesPerView: 1,
				simulateTouch: false,
				autoplay: {
					delay: 6000,
					disableOnInteraction: false,
					waitForTransition: false,
				},
				navigation: {
					nextEl: '.started .swiper-button-next',
					prevEl: '.started .swiper-button-prev',
				},
			});
			started_slider.on('slideChange', function () {
				var index = started_slider.realIndex;
				var total = started_slider.slides.length;

				$('.started-carousel .swiper-slide').removeClass('first');
				$('.started-carousel .swiper-slide').each(function(i, slide){
					if((index-1)>=i) {
						$(slide).addClass('swiper-clip-active');
					} else {
						$(slide).removeClass('swiper-clip-active');
					}
				});
				$('.started-carousel .swiper-slide').each(function(i, slide){
					$(slide).css({'z-index': total - i});
				});
			});
			started_slider.init();
		}

		/*
			Testimonials Slider
		*/
		if($('.reviews-carousel').length){
			var rev_slider = new Swiper ('.reviews-carousel .swiper-container', {
				loop: true,
				spaceBetween: 70,
				slidesPerView: 2,
				autoplay: {
					delay: 6000
				},
				navigation: {
					nextEl: '.reviews-carousel .swiper-button-next',
					prevEl: '.reviews-carousel .swiper-button-prev',
				},
				breakpoints: {
					720: {
						slidesPerView: 1,
						spaceBetween: 40,
					},
					1200: {
						slidesPerView: 2,
						spaceBetween: 70,
					},
				}
			});
		}

		/*
			Refresh Scroll
		*/
		function scroll_refresh(){
			$(window).scrollTop($(window).scrollTop()+1);
		}
		setTimeout(scroll_refresh, 100);

	});

	/*
		Set full height in blocks
	*/
	var width = $(window).width();
	var height = $(window).height();

	/*
		Set Height Started Section
	*/
	$('.section.started').css({'height': height});
	$('.logged-in .section.started').css({'height': height-32});
	if(width < 783) {
		$('.section.started').css({'height': height});
		$('.logged-in .section.started').css({'height': height-46});
	}

	/*
		Grained
	*/
	if(!$('.grained-off').length){
	var grained_options = {
		'animate': true,
		'patternWidth': 400,
		'patternHeight': 400,
		'grainOpacity': 0.15,
		'grainDensity': 3,
		'grainWidth': 1,
		'grainHeight': 1
	}
	grained('#grained_container', grained_options);
	}
	
	/*
		Cursor Effects
	*/
	if(width > 1199) {
		$(document).on('mousemove', function(e){ 
			var x = e.pageX;
			var y = e.pageY;
			var newposX = x;
			var newposY = y;
			$('.cursor-follower').css('transform','translate3d('+newposX+'px,'+newposY+'px,0px)');
		});
		$('a, .btn-group').on({
			mouseenter: function (e) {
				cursor_over();
			},
			mouseleave: function (e) {
				cursor_out();
			}
		});
	}
	function cursor_over(){
		$(".cursor-follower").stop().animate({width: 86, height: 86, opacity: 0.1, margin: '-43px 0 0 -43px'}, 500);
	}
	function cursor_out(){
		$(".cursor-follower").stop().animate({width: 26, height: 26, opacity: 0.4, margin: '-13px 0 0 -13px'}, 500);
	}

	/*
		Hover Masks
	*/
	$('.hover-masks a').each(function() {
		var mask_val = $(this).html();
		$(this).wrapInner('<span class="mask-lnk"></span>');
		$(this).append('<span class="mask-lnk mask-lnk-hover">' + mask_val + '</span>');
	});

	/*
		Hover Button Effect
	*/
	$('.hover-animated .circle').on({
		mouseenter: function (e) {
			if ($(this).find(".ink").length === 0) {
				$(this).prepend("<span class='ink'></span>");
			}
			var ink = $(this).find(".ink");
			ink.removeClass("animate");
			if (!ink.height() && !ink.width()) {
				var d = Math.max($(this).outerWidth(), $(this).outerHeight());
				ink.css({
					height: d,
					width: d
				});
			}
			var x = e.pageX - $(this).offset().left - ink.width() / 2;
			var y = e.pageY - $(this).offset().top - ink.height() / 2;
			ink.css({
				top: y + 'px',
				left: x + 'px'
			}).addClass("ink-animate");
			$('.cursor-follower').addClass('hide');
		},
		mouseleave: function (e) {
			var ink = $(this).find(".ink");
			var x = e.pageX - $(this).offset().left - ink.width() / 2;
			var y = e.pageY - $(this).offset().top - ink.height() / 2;
			ink.css({
				top: y + 'px',
				left: x + 'px'
			}).removeClass("ink-animate");
			$('.cursor-follower').removeClass('hide');
		}
	});
	
	/*
		Animation Between Pages
	*/
	$('header .top-menu, .typed-bread, .popup-box .bts, .animate-to-page').on('click', 'a', function(){
		var link = $(this).attr('href');
		if(link.indexOf('#section-') == 0){
			if(!$('body').hasClass('home')){
				location.href = '/'+link;
			}

			$('body, html').animate({scrollTop: $(link).offset().top - 68}, 400);
			if($('header').hasClass('active')){
				$('.menu-btn').trigger('click');
			}
		} else {
			$('.lines').removeClass('finish');
			$('.lines').removeClass('ready');
			$('.lines').addClass('no-lines');
			setTimeout(function() {
				location.href = "" + link;
			}, 2500);
		}
		return false;
	});
	
	/*
		On Scroll 
	*/
	$(window).on('scroll', function(){

		/* add/remove background-enabled class */
		if ($(this).scrollTop() >= $('.section.started').height()) {
			$('body').removeClass('background-enabled');
		} else {
			if((!$('header').hasClass('active')) && $('.video-bg').length) {
				$('body').addClass('background-enabled');
			}
		}

		/* add/remove header/footer fixed class */
		if (($(this).scrollTop() >= 100) && ($('.section').length>1)) {
			$('.header').addClass('fixed');
			$('.footer').addClass('fixed');
			$('.mouse_btn').fadeOut();
		}
		if (($(this).scrollTop() <= 100) && ($('.section').length>1)) {
			$('.header').removeClass('fixed');
			$('.footer').removeClass('fixed');
			$('.mouse_btn').fadeIn();
		}
		
	});

	/*
		Menu on Mobile
	*/
	$('header').on('click', '.menu-btn', function(){
		if($('header').hasClass('active')){
			$('header').removeClass('active');
			$('.footer .soc').fadeIn();
			$('body').addClass('loaded');
			if($('.video-bg').length) {
				$('body').addClass('background-enabled');
			}
		} else {
			$('header').addClass('active');
			$('.footer .soc').hide();
			$('body').removeClass('loaded');
			$('body').removeClass('background-enabled');
		}
		
		return false;
	});

	/*
		Download CV on Mobile
	*/
	$('.section.about').on('click touchstart', '.btn', function(){
		location.href = $(this).attr('href');
	});
	
	/*
		Mouse Button Scroll
	*/
	$('.section').on('click', '.mouse_btn', function(){
		$('body, html').animate({
			scrollTop: height - 150
		}, 800);
	});
	if($('.section').length>1){
		$('.mouse_btn').show();
	}
	
	/*
		Initialize Portfolio
	*/
	var $container = $('.portfolio-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			percentPosition: true,
			itemSelector: '.box-item'
		});

		/*
			Portfolio items parallax
		*/
		if($('.portfolio-items').length){
			var s_parallax = document.getElementsByClassName('wp-post-image');
			new simpleParallax(s_parallax);
		}

	});

	/*
		Filter items on button click
	*/
	$('.filters').on( 'click', '.btn-group', function() {
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: filterValue });
		$('.filters .btn-group label').removeClass('glitch-effect');
		$(this).find('label').addClass('glitch-effect');
	});
	
	/*
		Gallery popup
	*/
	if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}

	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});

	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});
	
	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
            patterns: {
                youtube_short: {
                  index: 'youtu.be/',
                  id: 'youtu.be/',
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});
	
	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
        var gallery = $(this).attr('href');
    
        $(gallery).magnificPopup({
            delegate: 'a',
            type:'image',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery: {
                enabled: true
            }
        }).magnificPopup('open');

        return false;
    });

	/*
		Background enabled
	*/
	var video_unmuted_length = $('.video-unmuted-bg').length;
	var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)) { 
		isMobile = true;
	}

	if($('.video-bg').length) {
		$('body').addClass('background-enabled');
		if(!isMobile) {
			if($('.jarallax-video').length){
				$('.jarallax-video').each(function(){
					var volume = $(this).data('volume');
					if(!is_safari) {
					$(this).jarallax({
						videoVolume: volume
					});
					}
					if(is_safari) {
					$(this).jarallax();
					}
				});
			}
		} else {
			$('.video-mobile-bg').each(function(){
				$(this).css('background-image', 'url('+ $(this).data('mobile-preview') +')');
			});
		}
	}

	/*
		One Page Menu Nav
	*/
	if($('.section').length && $('.top-menu li a').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				if($(this).attr('href').indexOf('#section-') == 0){
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if(refElement.length){
						if (refElement.offset().top <= scrollPos + 70) {
							$('.top-menu ul li').removeClass("current-menu-item");
							currLink.closest('li').addClass("current-menu-item");
						}
					}
					if(scrollPos == 0) {
						$('.top-menu ul li').removeClass("current-menu-item");
					}
				}
			});
		});
	}

	/*
		Iframe margins
	*/
	$('.single-post-text').each(function(){
		$(this).find('iframe').wrap('<div class="embed-container"></div>');
	});

	/*
		Dotted Skills Line
	*/
	function skills(){
		var skills_dotted = $('.skills.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/
	var skills_circles = $('.skills.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}

	/*
		Resize
	*/
	$(window).resize(function() {

		/* Set full height in blocks */
		var width = $(window).width();
		var height = $(window).height();
		
		/* Set full height in started blocks */
		$('.section.started').css({'height': height});
		if(width < 783) {
			$('.section.started').css({'height': height});
		}

		/* Dotted skills line on resize */
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}

	});

	/*
		Validate Contact Form
	*/
	$('#cform').validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: 'valid',
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {
				
				},
				complete: function() {
				
				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});

	/*
		Google Maps
	*/
	if($('#map').length) {
		initMap();
	}
	
} )( jQuery );

/*
	Google Map Options
*/
function initMap() {
	var myLatlng = new google.maps.LatLng(48.859003, 2.345275); // <- Your latitude and longitude
	var styles = [
		{
			"stylers": [
				{
					"hue": "#ff1a00"
				},
				{
					"invert_lightness": true
				},
				{
					"saturation": -100
				},
				{
					"lightness": 33
				},
				{
					"gamma": 0.5
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#2D333C"
				}
			]
		},
		{
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
	    	]
	  	},
		{
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.land_parcel",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.neighborhood",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
	]

	var mapOptions = {
		zoom: 16,
		center: myLatlng,
		mapTypeControl: false,
		disableDefaultUI: true,
		zoomControl: false,
		scrollwheel: false,
		styles: styles
	}
	
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	/*var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'We are here!'
	});*/
}

/*
	Typed
*/

! function($) {

    "use strict";

    var Typed = function(el, options) {

        // chosen element to manipulate text
        this.el = $(el);

        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // attribute to type into
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;

        // show cursor
        this.showCursor = this.isInput ? false : this.options.showCursor;

        // text content of element
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()

        // html or plain text
        this.contentType = this.options.contentType;

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // add a delay before typing starts
        this.startDelay = this.options.startDelay;

        // backspacing speed
        this.backSpeed = this.options.backSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // div containing strings
        this.stringsElement = this.options.stringsElement;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;

        // for stopping
        this.stop = false;

        // custom cursor
        this.cursorChar = this.options.cursorChar;

        // shuffle the strings
        this.shuffle = this.options.shuffle;
        // the order of strings
        this.sequence = [];

        // All systems go!
        this.build();
    };

    Typed.prototype = {

        constructor: Typed

        ,
        init: function() {
            // begin the loop w/ first current string (global self.strings)
            // current string will be passed as an argument each time after this
            var self = this;
            self.timeout = setTimeout(function() {
                for (var i=0;i<self.strings.length;++i) self.sequence[i]=i;

                // shuffle the array if true
                if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                // Start typing
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        }

        ,
        build: function() {
            var self = this;
            // Insert cursor
            if (this.showCursor === true) {
                this.cursor = $("<span class=\"typed-cursor\">" + this.cursorChar + "</span>");
                this.el.after(this.cursor);
            }
            if (this.stringsElement) {
                self.strings = [];
                this.stringsElement.hide();
                var strings = this.stringsElement.find('p');
                $.each(strings, function(key, value){
                    self.strings.push($(value).html());
                });
            }
            this.init();
        }

        // pass current string state to each function, types 1 char per call
        ,
        typewrite: function(curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            // ------------- optional ------------- //
            // backpaces a certain string faster
            // ------------------------------------ //
            // if (self.arrayPos == 1){
            //  self.backDelay = 50;
            // }
            // else{ self.backDelay = 500; }

            // contain typing function in a timeout humanize'd delay
            self.timeout = setTimeout(function() {
                // check for an escape character before a pause value
                // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
                // single ^ are removed from string
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1; // skip atleast 1
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }

                    // strip out the escape character and pause value so they're not printed
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }

                if (self.contentType === 'html') {
                    // skip over html tags while typing
                    var curChar = curString.substr(curStrPos).charAt(0)
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>'
                        } else {
                            endTag = ';'
                        }
                        while (curString.substr(curStrPos).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }

                // timeout for any pause after a character
                self.timeout = setTimeout(function() {
                    if (curStrPos === curString.length) {
                        // fires callback function
                        self.options.onStringTyped(self.arrayPos);

                        // is this the final string
                        if (self.arrayPos === self.strings.length - 1) {
                            // animation that occurs on the last typed string
                            self.options.callback();

                            self.curLoop++;

                            // quit if we wont loop back
                            if (self.loop === false || self.curLoop === self.loopCount)
                                return;
                        }

                        self.timeout = setTimeout(function() {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    } else {

                        /* call before functions if applicable */
                        if (curStrPos === 0)
                            self.options.preStringTyped(self.arrayPos);

                        // start typing each new char into existing string
                        // curString: arg, self.el.html: original text inside element
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }

                        // add characters one by one
                        curStrPos++;
                        // loop the function
                        self.typewrite(curString, curStrPos);
                    }
                    // end of character pause
                }, charPause);

                // humanized value for typing
            }, humanize);

        }

        ,
        backspace: function(curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;

            self.timeout = setTimeout(function() {

                // ----- this part is optional ----- //
                // check string array position
                // on the first string, only delete one word
                // the stopNum actually represents the amount of chars to
                // keep in the current string. In my case it's 14.
                // if (self.arrayPos == 1){
                //  self.stopNum = 14;
                // }
                //every other time, delete the whole typed string
                // else{
                //  self.stopNum = 0;
                // }

                if (self.contentType === 'html') {
                    // skip over html tags while backspacing
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }

                // ----- continue important stuff ----- //
                // replace text with base text + typed characters
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }

                // if the number (id of character in current string) is
                // less than the stop number, keep going
                if (curStrPos > self.stopNum) {
                    // subtract characters one by one
                    curStrPos--;
                    // loop the function
                    self.backspace(curString, curStrPos);
                }
                // if the stop number has been reached, increase
                // array position to next string
                else if (curStrPos <= self.stopNum) {
                    self.arrayPos++;

                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;

                        // Shuffle sequence again
                        if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                        self.init();
                    } else
                        self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                }

                // humanized value for typing
            }, humanize);

        }
        /**
         * Shuffles the numbers in the given array.
         * @param {Array} array
         * @returns {Array}
         */
        ,shuffleArray: function(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }

        // Start & Stop currently not working

        // , stop: function() {
        //     var self = this;

        //     self.stop = true;
        //     clearInterval(self.timeout);
        // }

        // , start: function() {
        //     var self = this;
        //     if(self.stop === false)
        //        return;

        //     this.stop = false;
        //     this.init();
        // }

        // Reset and rebuild the element
        ,
        reset: function() {
            var self = this;
            clearInterval(self.timeout);
            var id = this.el.attr('id');
            this.el.after('<span id="' + id + '"/>')
            this.el.remove();
            if (typeof this.cursor !== 'undefined') {
                this.cursor.remove();
            }
            // Send the callback
            self.options.resetCallback();
        }

    };

    $.fn.typed = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('typed'),
                options = typeof option == 'object' && option;
            if (!data) $this.data('typed', (data = new Typed(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        // typing speed
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 5000,
        // loop
        loop: false,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
    };


}(window.jQuery);

/*
	simpleParallax
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("simpleParallax", [], factory);
	else if(typeof exports === 'object')
		exports["simpleParallax"] = factory();
	else
		root["simpleParallax"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/helpers/viewport.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Viewport =
/*#__PURE__*/
function () {
  function Viewport() {
    _classCallCheck(this, Viewport);

    this.positions = {
      top: 0,
      bottom: 0,
      height: 0
    };
  }

  _createClass(Viewport, [{
    key: "setViewportTop",
    value: function setViewportTop() {
      this.positions.top = window.pageYOffset;
      return this.positions;
    }
  }, {
    key: "setViewportBottom",
    value: function setViewportBottom() {
      this.positions.bottom = this.positions.top + this.positions.height;
      return this.positions;
    }
  }, {
    key: "setViewportHeight",
    value: function setViewportHeight() {
      this.positions.height = document.documentElement.clientHeight;
      return this.positions;
    }
  }, {
    key: "setViewportAll",
    value: function setViewportAll() {
      this.positions.top = window.pageYOffset;
      this.positions.bottom = this.positions.top + this.positions.height;
      this.positions.height = document.documentElement.clientHeight;
      return this.positions;
    }
  }]);

  return Viewport;
}();

/* harmony default export */ var viewport = (Viewport);
// CONCATENATED MODULE: ./src/helpers/convertToArray.js
// check wether the element is a Node List, a HTML Collection or an array
// return an array of nodes
var convertToArray = function convertToArray(elements) {
  if (NodeList.prototype.isPrototypeOf(elements) || HTMLCollection.prototype.isPrototypeOf(elements)) return Array.from(elements);
  if (typeof elements === 'string' || elements instanceof String) return document.querySelectorAll(elements);
  return [elements];
};

/* harmony default export */ var helpers_convertToArray = (convertToArray);
// CONCATENATED MODULE: ./src/helpers/cssTransform.js
// Detect css transform
var cssTransform = function cssTransform() {
  var prefixes = 'transform webkitTransform mozTransform oTransform msTransform'.split(' ');
  var transform;
  var i = 0;

  while (transform === undefined) {
    transform = document.createElement('div').style[prefixes[i]] !== undefined ? prefixes[i] : undefined;
    i += 1;
  }

  return transform;
};

/* harmony default export */ var helpers_cssTransform = (cssTransform());
// CONCATENATED MODULE: ./src/helpers/isImageLoaded.js
// check if image is fully loaded
var isImageLoaded = function isImageLoaded(image) {
  // check if image is set as the parameter
  if (!image) {
    return false;
  } // check if image has been 100% loaded


  if (!image.complete) {
    return false;
  } // check if the image is displayed


  if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth === 0) {
    return false;
  }

  return true;
};

/* harmony default export */ var helpers_isImageLoaded = (isImageLoaded);
// CONCATENATED MODULE: ./src/instances/parallax.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function parallax_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parallax_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function parallax_createClass(Constructor, protoProps, staticProps) { if (protoProps) parallax_defineProperties(Constructor.prototype, protoProps); if (staticProps) parallax_defineProperties(Constructor, staticProps); return Constructor; }





var parallax_ParallaxInstance =
/*#__PURE__*/
function () {
  function ParallaxInstance(element, options) {
    parallax_classCallCheck(this, ParallaxInstance);

    // set the element & settings
    this.element = element;
    this.elementContainer = element;
    this.settings = options;
    this.isVisible = true;
    this.isInit = false;
    this.oldTranslateValue = -1;
    this.init = this.init.bind(this); // check if images has not been loaded yet

    if (helpers_isImageLoaded(element)) {
      this.init();
    } else {
      this.element.addEventListener('load', this.init);
    }
  }

  parallax_createClass(ParallaxInstance, [{
    key: "init",
    value: function init() {
      // for some reason, <picture> are init an infinite time on windows OS
      if (this.isInit) return; // check if element has not been already initialized with simpleParallax

      if (this.element.closest('.simpleParallax')) return;

      if (this.settings.overflow === false) {
        // if overflow option is set to false
        // wrap the element into a div to apply overflow
        this.wrapElement(this.element);
      } // apply the default style on the image


      this.setStyle(); // get the current element offset

      this.getElementOffset(); // init the Intesection Observer

      this.intersectionObserver(); // get its translated value

      this.getTranslateValue(); // apply its translation even if not visible for the first init

      this.animate(); // for some reason, <picture> are init an infinite time on windows OS

      this.isInit = true;
    } // if overflow option is set to false
    // wrap the element into a .simpleParallax div and apply overflow hidden to hide the image excedant (result of the scale)

  }, {
    key: "wrapElement",
    value: function wrapElement() {
      // check is current image is in a <picture> tag
      var elementToWrap = this.element.closest('picture') || this.element; // create a .simpleParallax wrapper container

      var wrapper = document.createElement('div');
      wrapper.classList.add('simpleParallax');
      wrapper.style.overflow = 'hidden'; // append the image inside the new wrapper

      elementToWrap.parentNode.insertBefore(wrapper, elementToWrap);
      wrapper.appendChild(elementToWrap);
      this.elementContainer = wrapper;
    } // unwrap the element from .simpleParallax wrapper container

  }, {
    key: "unWrapElement",
    value: function unWrapElement() {
      var wrapper = this.elementContainer;
      wrapper.replaceWith.apply(wrapper, _toConsumableArray(wrapper.childNodes));
    } // apply default style on element

  }, {
    key: "setStyle",
    value: function setStyle() {
      if (this.settings.overflow === false) {
        // if overflow option is set to false
        // add scale style so the image can be translated without getting out of its container
        this.element.style[helpers_cssTransform] = "scale(".concat(this.settings.scale, ")");
      }

      if (this.settings.delay > 0) {
        // if delay option is set to true
        // add transition option
        this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition);
      } // add will-change CSS property to improve perfomance


      this.element.style.willChange = 'transform';
    } // remove style of the element

  }, {
    key: "unSetStyle",
    value: function unSetStyle() {
      // remove will change inline style
      this.element.style.willChange = '';
      this.element.style[helpers_cssTransform] = '';
      this.element.style.transition = '';
    } // get the current element offset

  }, {
    key: "getElementOffset",
    value: function getElementOffset() {
      // get position of the element
      var positions = this.elementContainer.getBoundingClientRect(); // get height

      this.elementHeight = positions.height; // get offset top

      this.elementTop = positions.top + simpleParallax_viewport.positions.top; // get offset bottom

      this.elementBottom = this.elementHeight + this.elementTop;
    } // build the Threshold array to cater change for every pixel scrolled

  }, {
    key: "buildThresholdList",
    value: function buildThresholdList() {
      var thresholds = [];

      for (var i = 1.0; i <= this.elementHeight; i++) {
        var ratio = i / this.elementHeight;
        thresholds.push(ratio);
      }

      return thresholds;
    } // create the Intersection Observer

  }, {
    key: "intersectionObserver",
    value: function intersectionObserver() {
      var options = {
        root: null,
        threshold: this.buildThresholdList()
      };
      this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), options);
      this.observer.observe(this.element);
    } // Intersection Observer Callback to set the element at visible state or not

  }, {
    key: "intersectionObserverCallback",
    value: function intersectionObserverCallback(entries) {
      for (var i = entries.length - 1; i >= 0; i--) {
        if (entries[i].isIntersecting) {
          this.isVisible = true;
        } else {
          this.isVisible = false;
        }
      }
    } // check if the current element is visible in the Viewport
    // for browser that not support Intersection Observer API

  }, {
    key: "checkIfVisible",
    value: function checkIfVisible() {
      return this.elementBottom > simpleParallax_viewport.positions.top && this.elementTop < simpleParallax_viewport.positions.bottom;
    } // calculate the range between image will be translated

  }, {
    key: "getRangeMax",
    value: function getRangeMax() {
      // get the real height of the image without scale
      var elementImageHeight = this.element.clientHeight; // range is calculate with the image height by the scale

      this.rangeMax = elementImageHeight * this.settings.scale - elementImageHeight;
    } // get the percentage and the translate value to apply on the element

  }, {
    key: "getTranslateValue",
    value: function getTranslateValue() {
      // calculate the % position of the element comparing to the viewport
      // rounding percentage to a 1 number float to avoid unn unnecessary calculation
      var percentage = ((simpleParallax_viewport.positions.bottom - this.elementTop) / ((simpleParallax_viewport.positions.height + this.elementHeight) / 100)).toFixed(1); // sometime the percentage exceeds 100 or goes below 0

      percentage = Math.min(100, Math.max(0, percentage)); // sometime the same percentage is returned
      // if so we don't do aything

      if (this.oldPercentage === percentage) {
        return false;
      } // if not range max is set, recalculate it


      if (!this.rangeMax) {
        this.getRangeMax();
      } // transform this % into the max range of the element
      // rounding translateValue to a non float int - as minimum pixel for browser to render is 1 (no 0.5)


      this.translateValue = (percentage / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0); // sometime the same translate value is returned
      // if so we don't do aything

      if (this.oldTranslateValue === this.translateValue) {
        return false;
      } // store the current percentage


      this.oldPercentage = percentage;
      this.oldTranslateValue = this.translateValue;
      return true;
    } // animate the image

  }, {
    key: "animate",
    value: function animate() {
      var translateValueY = 0;
      var translateValueX = 0;
      var inlineCss;

      if (this.settings.orientation.includes('left') || this.settings.orientation.includes('right')) {
        // if orientation option is left or right
        // use horizontal axe - X axe
        translateValueX = "".concat(this.settings.orientation.includes('left') ? this.translateValue * -1 : this.translateValue, "px");
      }

      if (this.settings.orientation.includes('up') || this.settings.orientation.includes('down')) {
        // if orientation option is up or down
        // use vertical axe - Y axe
        translateValueY = "".concat(this.settings.orientation.includes('up') ? this.translateValue * -1 : this.translateValue, "px");
      } // set style to apply to the element


      if (this.settings.overflow === false) {
        // if overflow option is set to false
        // add the scale style
        inlineCss = "translate3d(".concat(translateValueX, ", ").concat(translateValueY, ", 0) scale(").concat(this.settings.scale, ")");
      } else {
        inlineCss = "translate3d(".concat(translateValueX, ", ").concat(translateValueY, ", 0)");
      } // add style on the element using the adequate CSS transform


      this.element.style[helpers_cssTransform] = inlineCss;
    }
  }]);

  return ParallaxInstance;
}();

/* harmony default export */ var parallax = (parallax_ParallaxInstance);
// CONCATENATED MODULE: ./src/simpleParallax.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewport", function() { return simpleParallax_viewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return simpleParallax_SimpleParallax; });
function simpleParallax_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simpleParallax_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function simpleParallax_createClass(Constructor, protoProps, staticProps) { if (protoProps) simpleParallax_defineProperties(Constructor.prototype, protoProps); if (staticProps) simpleParallax_defineProperties(Constructor, staticProps); return Constructor; }




var simpleParallax_viewport = new viewport();
var intersectionObserverAvailable = true;
var isInit = false;
var instances = [];
var instancesLength;
var frameID;
var resizeID;

var simpleParallax_SimpleParallax =
/*#__PURE__*/
function () {
  function SimpleParallax(elements, options) {
    simpleParallax_classCallCheck(this, SimpleParallax);

    if (!elements) return;
    this.elements = helpers_convertToArray(elements);
    this.defaults = {
      delay: 0.4,
      orientation: 'up',
      scale: 1.3,
      overflow: false,
      transition: 'cubic-bezier(0,0,0,1)',
      breakpoint: false
    };
    this.settings = Object.assign(this.defaults, options); // check if breakpoint is set and superior to user browser width

    if (this.settings.breakpoint && document.documentElement.clientWidth <= this.settings.breakpoint) {
      return;
    } // check if the browser handle the Intersection Observer API


    if (!('IntersectionObserver' in window)) intersectionObserverAvailable = false;
    this.lastPosition = -1;
    this.resizeIsDone = this.resizeIsDone.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this);
    this.init();
  }

  simpleParallax_createClass(SimpleParallax, [{
    key: "init",
    value: function init() {
      simpleParallax_viewport.setViewportAll();

      for (var i = this.elements.length - 1; i >= 0; i--) {
        var instance = new parallax(this.elements[i], this.settings);
        instances.push(instance);
      } // update the instance length


      instancesLength = instances.length; // only if this is the first simpleParallax init

      if (!isInit) {
        // init the frame
        this.proceedRequestAnimationFrame();
        window.addEventListener('resize', this.resizeIsDone);
        isInit = true;
      }
    } // wait for resize to be completely done

  }, {
    key: "resizeIsDone",
    value: function resizeIsDone() {
      clearTimeout(resizeID);
      resizeID = setTimeout(this.handleResize, 500);
    } // handle the resize process, some coordonates need to be re-calculate

  }, {
    key: "handleResize",
    value: function handleResize() {
      // re-get all the viewport positions
      simpleParallax_viewport.setViewportAll();

      if (this.settings.breakpoint && document.documentElement.clientWidth <= this.settings.breakpoint) {
        this.destroy();
      }

      for (var i = instancesLength - 1; i >= 0; i--) {
        // re-get the current element offset
        instances[i].getElementOffset(); // re-get the range if the current element

        instances[i].getRangeMax();
      } // force the request animation frame to fired


      this.lastPosition = -1;
    } // animation frame

  }, {
    key: "proceedRequestAnimationFrame",
    value: function proceedRequestAnimationFrame() {
      // get the offset top of the viewport
      simpleParallax_viewport.setViewportTop();

      if (this.lastPosition === simpleParallax_viewport.positions.top) {
        // if last position if the same than the curent one
        // callback the animationFrame and exit the current loop
        frameID = window.requestAnimationFrame(this.proceedRequestAnimationFrame);
        return;
      } // get the offset bottom of the viewport


      simpleParallax_viewport.setViewportBottom(); // proceed with the current element

      for (var i = instancesLength - 1; i >= 0; i--) {
        this.proceedElement(instances[i]);
      } // callback the animationFrame


      frameID = window.requestAnimationFrame(this.proceedRequestAnimationFrame); // store the last position

      this.lastPosition = simpleParallax_viewport.positions.top;
    } // proceed the element

  }, {
    key: "proceedElement",
    value: function proceedElement(instance) {
      var isVisible = false; // is not support for Intersection Observer API
      // use old function to check if element visible

      if (!intersectionObserverAvailable) {
        isVisible = instance.checkIfVisible(); // if support
        // use response from Intersection Observer API Callback
      } else {
        isVisible = instance.isVisible;
      } // if element not visible, stop it


      if (!isVisible) return; // if percentage is equal to the last one, no need to continue

      if (!instance.getTranslateValue()) {
        return;
      } // animate the image


      instance.animate();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this = this;

      var instancesToDestroy = []; // remove all instances that need to be destroyed from the instances array

      instances = instances.filter(function (instance) {
        if (_this.elements.includes(instance.element)) {
          // push instance that need to be destroyed into instancesToDestroy
          instancesToDestroy.push(instance);
        } else {
          return instance;
        }
      });

      for (var i = instancesToDestroy.length - 1; i >= 0; i--) {
        // unset style
        instancesToDestroy[i].unSetStyle();

        if (this.settings.overflow === false) {
          // if overflow option is set to false
          // unwrap the element from .simpleParallax wrapper container
          instancesToDestroy[i].unWrapElement();
        }
      } // update the instance length var


      instancesLength = instances.length; // if no instances left, remove the raf and resize event = simpleParallax fully destroyed

      if (!instancesLength) {
        // cancel the animation frame
        window.cancelAnimationFrame(frameID); // detach the resize event

        window.removeEventListener('resize', this.handleResize);
      }
    }
  }]);

  return SimpleParallax;
}();



/***/ })
/******/ ])["default"];
});

