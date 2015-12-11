/*
** @Domain: Ajax
** @Require: jQuery
*/
try{
  mui.ajax = (function(mui, $, undefined){
    "use strict";
    
    var config = {
      url : '',
      type : '',
      param : {}
    };

    var call = function (type ,url, param, callback, errCallback){

      this.type = type;
      this.param = param;
      this.url = url;

      $.ajax({
        type: this.type,
        url: this.url,
        data: this.param,
        error: errCallback,
        success: callback
      });
    };

    return {
      call:call
    };

  })(mui, jQuery); 
}catch(e){
  console.log(e);
}finally{
  
}