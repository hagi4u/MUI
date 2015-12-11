/*
** @Domain: Validate
** @Require: jQuery
*/
try{
  mui.validate = (function(mui, $, undefined){
    "use strict";

    /*
    ** @method: isTel - Private
    ** @desc: 정규표현식을 이용 한 전화번호 검증 함수
    ** @param: String
    */
    var isTel = function (value){
      var regExpPhone = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
      if(regExpPhone.test(value)) {
        if(value.length > 9 && value.length < 12)
          return true;
      }
      return false;
    };

    var initForm = function($el, e){
      $("form").each(function() {  
        if(this.className === $el.attr('class'))
          this.reset();  
        else if(this.id === $el.attr('id'))
          this.reset();
      });
      $el.find('input[type="radio"]').prop('checked', false);
      $el.find('input[type="checkbox"]').prop('checked', false);
      $el.find('label').removeClass('checked');
    };

    /*
    ** @method: getInputState
    ** @desc: Input box 상태 검증
    ** @param: String
    */
    var getInputState = function($el, cond, e){
      if($el.val().length === 0)
        return false;
      else if(cond === 'tel' && isTel($el.val()) !== true) 
        return false;
      else 
        return true;
    };

    /*
    ** @method: getCheckBoxState
    ** @desc: CheckBox 상태 검증
    ** @param: String
    */
    var getCheckBoxState = function($el, e){
      var isChecked = $el.is(":checked");//.attr('checked');
      
      if(isChecked) 
        return true;
      else 
        return false;
    };

    /*
    ** @method: getRadioValue
    ** @desc: Radio Button 상태 검증 및 값 리턴
    ** @param: String
    */
    var getRadioValue = function(name, e){
      var value = $('input:radio[name="'+name+'"]:checked').val();
      
      if(typeof value == "undefined") 
        return false;
      
      return value;
    };

    return {
      init : initForm,
      input : getInputState,
      checkbox : getCheckBoxState,
      radio : getRadioValue
    };  
    
  })(mui, jQuery);
}catch(e){
  console.log(e);
}finally{
  
}