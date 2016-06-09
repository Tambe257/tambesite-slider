jQuery(document).ready(function($){
  var slidesWrapper = $('.cd-hero-slider');

  //check if a .cd-hero-slider exists in the DOM 
  if ( slidesWrapper.length > 0 ) {
    var primaryNav = $('.cd-primary-nav'),
        sliderNav = $('.cd-slider-nav'),
        navigationMarker = $('.cd-marker');

    //on mobile - open/close primary navigation clicking/tapping the menu icon
    primaryNav.on('click', function(event){
      if($(event.target).is('.cd-primary-nav')){
        $(this).children('ul').toggleClass('is-visible');
      }
    });

    //change visible slide
    sliderNav.on('click', 'li', function(event){
      event.preventDefault();
      var selectedItem = $(this);
      if(!selectedItem.hasClass('selected')) {
        // if it's not already selected
        var selectedPosition = selectedItem.index(),
            activePosition = slidesWrapper.find('li.selected').index();

        if( activePosition < selectedPosition) {
            nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        } else {
            prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        }

        updateSliderNavigation(sliderNav, selectedPosition);
        updateNavigationMarker(navigationMarker, selectedPosition+1);
      }
    });
  }

  function nextSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
  }

  function prevSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
  }

  function updateSliderNavigation(pagination, n) {
    var navigationDot = pagination.find('.selected');
    navigationDot.removeClass('selected');
    pagination.find('li').eq(n).addClass('selected');
  }

  function updateNavigationMarker(marker, n) {
    marker.removeClassPrefix('item').addClass('item-'+n);
  }

  $.fn.removeClassPrefix = function(prefix) {
    //remove all classes starting with 'prefix'
    this.each(function(i, el) {
      var classes = el.className.split(" ").filter(function(c) {
          return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = $.trim(classes.join(" "));
    });
    return this;
  };
});

/* ------

Show content when nav is clicked

----*/

function hideContentDivs(){
  $('main.cd-main-content').each(function(){
    $(this).hide();
  });
}
hideContentDivs();

$('nav a').click(function(){
   hideContentDivs();
   var tmp_div = $(this).parent().index();
   $('main.cd-main-content').eq(tmp_div).show();
});

$('#home').show();

/* ------

Animated Hamburger Menu

------- */

$(function () {
	$('.hamburger-menu').on('click', function() {
		$('.bar').toggleClass('animate');
	});
})();

/* ----

Sticky Nav On Scroll

------ */
$(function(){
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 545) {
      $('div.cd-slider-nav').addClass('stickytop');
    } else {
      $('div.cd-slider-nav').removeClass('stickytop');
    }
  });
});
