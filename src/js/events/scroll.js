/*
** @Domain: Event - Scroll
** @Require: jQuery
*/
try{
  (function(mui, $, undefined){
    /*
    ** @event: Scrolling
    ** @desc: 모바일 버전에서 사용되는 Scroll To Top
    */
    var uiScrollTop = $('.ui__scroll-top');  

    if(uiScrollTop.length > 0){
      $('a', uiScrollTop).click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: 0 + "px"}, 700);
      });

      $(window).on("scroll", function () { 
        if($(window).scrollTop() > window.outerHeight / 2)
          uiScrollTop.fadeIn();
        else 
          uiScrollTop.fadeOut();
      });
      $(window).scrollEnd(function(){
        uiScrollTop.fadeOut();
      }, 1500);
    }

    /*
    ** @event: End Scroll
    ** @desc: 스크롤 이벤트 종료 시(Timeout 기준)
    */
    $.fn.scrollEnd = function(callback, timeout) {          
      $(this).scroll(function(){
        var $this = $(this);

        if ($this.data('scrollTimeout') )
          clearTimeout($this.data('scrollTimeout'));
        }
        
        $this.data( 'scrollTimeout', setTimeout(callback, timeout) );

      });
    };

    /*
    ** @desc: ScrollSpy
    */
   $(document).on('click', '[data-toggle="scrollspy"]', function(e){
      e.preventDefault();

      var 
      target = $(this).attr('href'),
      avoidTarget = $(this).attr('data-avoid-target'),
      value = $(target).offset().top;

      if(typeof avoidTarget !== undefined)
        value -= $(avoidTarget).innerHeight();

      mui.util.goToPosition(value);   
    });
  })(mui, $, undefined);

}catch(e){
  console.log(e);
}finally{
}