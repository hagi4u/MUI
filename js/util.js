/*
** @Domain: Utility
** @Require: jQuery
*/
try{
  mui.util = (function(mui, $, undefined){
    "use strict";
    var _doScroll = false;

    /*
    ** @method: ie8PNGFix
    ** @desc: 익스플로러 8 이하에서 그림자가 있는 PNG 파일 로딩 시 깨짐 현상 방지
    ** @param: $el (jQuery DOM)
    */
    var ie8PNGFix = function($el) {
      var c = [];
      $(' img', $el).each( function(j) {
        c[j] = new Image();
        c[j].src = this.src;
        if ( $.browser.msie ) {
          this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='"+ this.src +"')"; 
        }
      });
    };

    /*
    ** @method: imageLoader
    ** @desc: 브라우저에 이미지 로딩 해 주는 기능
    ** @param: Array (이미지 경로)
    */
    var imageLoader = function(arr){
      var length = arr.length;
      var imgArr = [];

      for(var i=0; i<length; i++){
        imgArr[i] = new Image();
        imgArr[i].src = arr[i];
      }

      return imgArr;
    };

    /*
    ** @method: disableScrolling
    ** @desc: 브라우저 스크롤 이벤트 차단 (PC/모바일)
    ** @param: none
    */
    var disableScrolling = function(){
      $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
          e.preventDefault();
          return;
      });
      $(window).on("keydown.disableScroll", function(e) {
          var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
          for (var i = 0; i < eventKeyArray.length; i++) {
              if (e.keyCode === eventKeyArray [i]) {
                  e.preventDefault();
                  return;
              }
          }
      });
    };

    /*
    ** @method: enableScrolling
    ** @desc: 브라우저 스크롤 이벤트 활성화 (PC/모바일)
    ** @param: none
    */
    var enableScrolling = function(){
      $(window).off(".disableScroll");
    };

    /*
    ** @method: goToPosition
    ** @desc: Y값으로 위치 이동
    ** @param: value(int) callback(function)
    */
    var goToPosition = function(value, callback){

      if(_doScroll) return true;

      disableScrolling();
      _doScroll = true;

      $('html, body').animate({scrollTop: value + "px"}, 700, function(){
        enableScrolling();
        
        _doScroll = false;
        if(typeof callback === "function") callback();
      });
    };

    /*
    ** @method: getBetween
    ** @desc: 최대, 최소 값 사이에 포함되는 지 확인
    ** @param: x(int), minimum(int), maximum(int)
    */
    var getBetween = function(x, min, max){
        return x >= min && x <= max;
    };

    /*
    ** @method: getOffset
    ** @desc: 엘리먼트의 Y 위치값
    ** @param: el($selector)
    */
    var getOffset = function($el){
      return $el.offset().top;
    };

    /*
    ** @method: getHeight
    ** @desc: 엘리먼트의 높이
    ** @param: el($selector)
    */
    var getHeight = function($el){
      return $el.innerHeight();
    };

    return {
      ie8PNGFix : ie8PNGFix,
      imageLoader : imageLoader,

      disableScrolling : disableScrolling,
      enableScrolling : enableScrolling,
      goToPosition : goToPosition,

      getBetween : getBetween,
      getOffset : getOffset,
      getHeight : getHeight,

      doScroll : _doScroll
    };
  })(mui, jQuery);
}catch(e){
  console.log(e);
}finally{
  
}
