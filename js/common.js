var mui = window.mui || {};
var console = window.console || {
  log: function() {}
};

/*
 ** @Domain: Common
 ** @Require: jQuery
 */
try {
  mui.common = (function(mui, $, undefined) {
    "use strict";
    /*
     ** @method: getWindowWidth
     ** @desc: 브라우저 넓이 값 리턴 (IE, FF, Chrome)
     ** @param: none
     */
    var getWindowWidth = function() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    /*
     ** @method: getWindowHeight
     ** @desc: 브라우저 높이 값 리턴 (IE, FF, Chrome)
     ** @param: none
     */
    var getWindowHeight = function() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };


    /*
     ** @method: disabledDefaultMouseEvents
     ** @desc: 마우스 오른쪽 버튼 및 드래그 제한
     ** @param: none;
     ** @usage : window.attachEvent( "onload" , disabledDefaultMouseEvents );
     */
    var disabledDefaultMouseEvents = function() {
      document.body.oncontextmenu = function() {
        return false
      };
      document.body.ondragstart = function() {
        return false
      };
      document.body.onselectstart = function() {
        return false
      };
    };

    /*
     ** @method: isDomain
     ** @desc: URL 검증
     ** @param: Strong;
     ** @usage : isDomain(url)
     */
    var isDomain = function(url) {
      var currentURL = location.href.split('//');
      currentURL = currentURL[1].substr(0, currentURL[1].indexOf('/'));
      return (currentURL.indexOf(url) > -1);
    }

    return {
      getWindowWidth: getWindowWidth,
      getWindowHeight: getWindowHeight,
      disabledDefaultMouseEvents: disabledDefaultMouseEvents,
      isDomain: isDomain
    };
  })(mui, $);
} catch (e) {
  console.log(e);
} finally {

}

/*
 ** @method: requestAnimationFrame
 ** @desc: Inherit Default Method for Cross-browsing
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 17 /*~ 1000/60*/ );
    });
}

/*
 ** @method: cancelAnimationFrame
 ** @desc: Inherit Default Method for Cross-browsing
 */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}
