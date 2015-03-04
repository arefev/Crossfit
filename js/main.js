// MAIN JavaScript

function runAnimationSection(section) {
	section.find(".animation-block").each(function(){
		runAnimationBlock($(this));
	});
	
}

function runAnimationBlock(animationBlock) {
	var animationTimeOut = parseInt(animationBlock.data("animation-timestart")),
		animationTimePlus = 100;
		
	if (isNaN(animationTimeOut))
		animationTimeOut = 0;
	
	var animationClass = animationBlock.data("animation-class");
	
	animationBlock.find(".animation").each(function(index){
		var element = $(this);
		
		setTimeout(function(){
			element.addClass(animationClass);
		}, animationTimeOut);
		
		animationTimeOut = animationTimeOut + animationTimePlus;
	});
}


$(function(){
	runAnimationBlock($(".top-menu"));
	runAnimationBlock($(".header__bottom"));
	runAnimationSection($(".main-slider"));
	
	// HEADER LOGO
	$(".header-logo").hover(function(){
		$(this).removeClass("slideDown");
		$(this).find(".header-logo__item").addClass("slideDownShowFromTop");
	}, function(){
		$(this).find(".header-logo__item").removeClass("slideDownShowFromTop");
	});
	
	/* TOP MENU */
	var topMenu = $(".top-menu"),
		topMenuHidden = topMenu.clone(),
		topMenuTimeOut, topMenuTime = 300;
	
	topMenuHidden.removeClass(".animation-block")
		.find(".animation")
		.removeClass("animation");
		
	topMenuHidden.find(".top-menu__item-bg").remove();
	
	// top menu animation
	topMenu.find(".top-menu__item").hover(function(){
		var left = $(this).position().left + 22,
			width = $(this).width(),
			bg = topMenu.find(".top-menu__item-bg"),
			activeItem = topMenu.find(".top-menu__item.active");
			
		if (activeItem.length) {
			var activeLeft = activeItem.position().left + 22,
				activeWidth = activeItem.width();
				
			bg.css({
				left: activeLeft,
				width: activeWidth
			});
			
			activeItem.removeClass("active")
					  .addClass("noactive");
		}

		clearTimeout(topMenuTimeOut);	
		bg.stop();	
		
		bg.animate({
			left: left,
			width: width
		}, topMenuTime).show();
		
	}, function(){
		var bg = topMenu.find(".top-menu__item-bg"),
			activeItem = topMenu.find(".top-menu__item.noactive");
			
		clearTimeout(topMenuTimeOut);

		if (activeItem.length) {
			var activeLeft = activeItem.position().left + 22,
				activeWidth = activeItem.width();
			
			topMenuTimeOut = setTimeout(function(){
				bg.stop();
				bg.animate({
					left: activeLeft,
					width: activeWidth
				}, topMenuTime).show();
			}, topMenuTime);
		} else {
			topMenuTimeOut = setTimeout(function(){
				bg.hide();
			}, topMenuTime);
		}
	});
	
	
		
	$(".top-menu_hidden").prepend(topMenuHidden);
	
	$(".top-menu-icon, .top-menu__close").click(function(){
		if ($(".top-menu_hidden").is(":visible")) {
			var top = $(".main__inner").data("top");
			
			$(".top-menu_hidden").hide();
			$(".header__fixed").removeClass("header__fixed_margin");
			
			$(".main__inner")
				.removeClass("main__inner_fixed")
				.css("top", "auto");
				
			$("html, body").scrollTop(top);
			
		} else {
			var scrollTop = $(window).scrollTop();
			
			$(".main__inner")
				.addClass("main__inner_fixed")
				.css("top", -scrollTop)
				.data("top", scrollTop);
				
			$(".top-menu_hidden").show();
			$(".header__fixed").addClass("header__fixed_margin");
			$("html, body").scrollTop(0);
		}
	});
	
		/* SUB MENU */
			$(".top-menu__item").hover(function(){
				var width = $(this).width() + 28;
				$(this).find(".sub-menu").width(width);
			});
		/* --END-- SUB MENU */
	/* --END-- TOP MENU */
	
	/*$(".index-section").each(function(){
		var minHeight = 766,
			windowHeight = $(window).height();
			
		if (windowHeight > minHeight) {
			$(this).height(windowHeight);
		}
	});*/
	
	/* FADE-IN SLIDER */
	$(".fade-in-slider__arrow").click(function(){
		var slider = $(this).closest(".fade-in-slider"),
			itemActive = slider.find(".fade-in-slider__item:visible"),
			itemNext = itemActive.next(".fade-in-slider__item");
		
		slider.stop();
		
		if (slider.is(".active")) {
			return false;
		}
		
		slider.addClass("active");
		itemActive.find(".animation, .animationRun, .animation-block")
				  .removeClass("animation animationRun animation-block slideLeft opacity rotate3DFadeIn");
		
		if (!itemNext.length) {
			itemNext = slider.find(".fade-in-slider__item").first();
		}	
		
		if ($(this).is(".fade-in-slider__arrow_left")) {
			itemNext = itemActive.prev(".fade-in-slider__item");
			if (!itemNext.length) {
				itemNext = slider.find(".fade-in-slider__item").last();
			}
		}
		
		itemActive.fadeOut();
		itemNext.fadeIn(function(){
			slider.removeClass("active");
		});
	});
	/* --END-- FADE-IN SLIDER */
	
	/* POPUP */
		$(".popup__close, #windowFill").click(function(){
			hidePopup($(this).closest(".popup"));
		});
	/* --END-- POPUP */
	
	/* OPENING BLOCKS */
		$(".opening-block__show-info").click(function(){
			hideOpenendBlock();
			
			var id = $(this).data("opened-block"),
				openingBlock = $(this).closest(".opening-block"),
				openingBlockHeight = openingBlock.height(),
				openingBlockTop = openingBlock.offset().top,
				marginBottom = parseFloat(openingBlock.css("margin-bottom")),
				openedBlock = $(".opened-block[data-opened-block=" + id + "]"),
				openedBlockHeight = openedBlock.height() + 132,
				openedBlockTop = openingBlockTop + openingBlockHeight + 26;
				
			if (!openedBlock.length) return false;
			
			var newMarginBottom = 26 + openedBlockHeight;
			
			openingBlock
				.data("margin-bottom", marginBottom)
				.css("margin-bottom", newMarginBottom)
				.addClass("active");
				
			openedBlock.css("top", openedBlockTop).show();
		});
		
		$(".opened-block__hide-link").click(function(){
			hideOpenendBlock();
		});
		
		function hideOpenendBlock() {
			var openingBlock = $(".opening-block.active"),
				marginBottom = openingBlock.data("margin-bottom"),
				id = openingBlock.find(".opening-block__show-info").data("opened-block"),
				openedBlock = $(".opened-block[data-opened-block=" + id + "]");
				
			openingBlock
				.css("margin-bottom", marginBottom)
				.removeClass("active");
				
			openedBlock.hide();
		}
	/* --END-- OPENING BLOCKS */
	
	var maxWidth = 980;
	$(".hor-list").each(function(){
		var itemSize = $(this).find(".hor-list__item").size(),
			itemWidth = maxWidth/itemSize - 16;
		
		if ($(this).find(".hor-list__item").first().is(".hor-list__item_num")) {
			itemSize--;
			itemWidth = maxWidth/itemSize - 19;
		}
			
		$(this).find(".hor-list__item:not(.hor-list__item_num)").width(itemWidth);
	});
	
	//showPopup($('#orderCall'));
	$( "#selectTrainingList" ).selectmenu();
	
	// PRODUCTS
	$(".products .services-special__item").colorbox({
		inline:true,
		className: "colorbox-product-detail",
		innerWidth:"70%", 
		maxWidth: 920,
		title:false,
		current: '',
		onComplete: function(e){
			var element = $("#colorbox"),
				width = element.width(),
				windowWidth = $(window).width(),
				left = (windowWidth - width)/2;
				
			element.css("left", left)
		}
	});
	
	/* PREVIEW SLIDER */
		$("body").on("click", ".slider-preview__item", function(){
			if ($(this).is(".active"))
				return false;
			
			var slider = $(this).closest(".slider-preview"),
				index = $(this).index(),
				mainPhoto = slider.find(".slider-preview__main-item").eq(index);
			
			slider.find(".slider-preview__main-item").fadeOut();
			mainPhoto.fadeIn();
			
			slider.find(".slider-preview__item.active").removeClass("active");
			$(this).addClass("active");
		});
	/* --END-- PREVIEW SLIDER */
});


$(window).scroll(function() {
	// ANIMATATE
	var windowHeight = $(window).height();
	var topOfWindow = $(window).scrollTop() + windowHeight;
    $('.animation-block').each(function(){
        var imagePos = $(this).offset().top;
		if (imagePos <= topOfWindow) {
			runAnimationBlock($(this));
		}
	});
	
	$('.animationRun').each(function(){
        var imagePos = $(this).offset().top,
			animateName = $(this).data("animation-class"),
			timeStart = $(this).data("animation-timestart"),
			element = $(this);
 
		if (imagePos < topOfWindow) {
			if (!isNaN(timeStart)) {
				setTimeout(function(){
					element.addClass(animateName);
					
				}, timeStart);
			} else {
				$(this).addClass(animateName);
			}
		}
	});
});


$(window).resize(function(){
	centerPopup($(".popup"));
});

function showPopup(element)
{
	element.show();
	$("#windowFill").show();
	
	centerPopup(element);
}

function hidePopup(element)
{
	if (!element.length)
	{
		element = $(".popup:visible");
	}
	
	element.hide();
	$("#windowFill").hide();
}

function centerPopup(element)
{
	var elWidth = element.width();
	var elHeight = element.height();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var scrollTop = $(window).scrollTop();
	var left = windowWidth/2 - elWidth/2;
	var top = windowHeight/2 - elHeight/2 + scrollTop;
	
	if (left < 0) left = 0;
	if (top < 0) top = 0;
	
	element.css({
		left:left,
		top:top
	});
}