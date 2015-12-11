var mui = window.mui || {};
var console = window.console || {log:function(){}};

/*
** @Domain: Common
** @Require: jQuery
*/  
try{
  mui.common = (function(mui, $, undefined){
  "use strict";
    /*
    ** @method: getWindowWidth
    ** @desc: 브라우저 넓이 값 리턴 (IE, FF, Chrome)
    ** @param: none
    */
    var getWindowWidth = function(){
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    /*
    ** @method: getWindowHeight
    ** @desc: 브라우저 높이 값 리턴 (IE, FF, Chrome)
    ** @param: none
    */
    var getWindowHeight = function(){
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };

    return {
      getWindowWidth: getWindowWidth,
      getWindowHeight: getWindowHeight
    };
  })(mui, $);
}catch(e){
  console.log(e);
}finally{
  
}