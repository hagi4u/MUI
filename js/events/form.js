/*
** @Domain: Event - Form
** @Require: jQuery
*/
try{
  (function(mui, $, undefined){
    "use strict";
    /*
    ** @event: Label Click
    ** @desc: Toggle for Checkbox & Radio Button Custom Design
    */
    /*
     * modal.js 에서 modal-content 의 e.stopPropragation 으로 인하여 상위 DOM 의 이벤트 버블을 막음으로
     * document에서 on 을 해주는것이 아니라, label 태그에 on 으로 진행 함      
     * @date 16.03.24
    $(document).on('click', 'label', function(e){
      if ($(this).attr("for") !== ""){
        var 
        target = $('#'+$(this).attr("for"));
        
        e.preventDefault();

        if( target.attr('type') === "checkbox" && target.hasClass('is-custom') ){
          var 
          isChecked = target.is(':checked'),
          isDisabled = target.attr('disabled');

          if(isChecked === false) 
            target.prop('checked', true);
          else
            target.prop('checked', false);

          $(this).toggleClass('checked');

        } else if ( target.attr('type') === "radio" && target.hasClass('is-custom') ){
          var
          radioName = target.attr('name'),
          radioValue = target.val();

          $('[name="'+radioName+'"] ~ label').removeClass('checked');
          $('input:radio[name="'+radioName+'"][value="'+radioValue+'"]').prop('checked', true);

          $(this).toggleClass('checked');
        }
      }
    });
    */
   $('label').on('click', function(e){
      if ($(this).attr("for") !== ""){
        var 
        target = $('#'+$(this).attr("for"));
        
        e.preventDefault();

        if( target.attr('type') === "checkbox" && target.hasClass('is-custom') ){
          var 
          isChecked = target.is(':checked'),
          isDisabled = target.attr('disabled');

          if(isChecked === false) 
            target.prop('checked', true);
          else
            target.prop('checked', false);

          $(this).toggleClass('checked');

        } else if ( target.attr('type') === "radio" && target.hasClass('is-custom') ){
          var
          radioName = target.attr('name'),
          radioValue = target.val();

          $('[name="'+radioName+'"] ~ label').removeClass('checked');
          $('input:radio[name="'+radioName+'"][value="'+radioValue+'"]').prop('checked', true);

          $(this).toggleClass('checked');
        }
      }
    });
   
    /*
    ** @desc: 키보드로 숫자만 입력
    */
    var $target = $('input[data-input="tel"]');
    $target.keypress(function(e){
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    });
    $target.keyup(function(e){
      var telMaxlength = 11;
      var $this = $(this);
      
      $(this).val( $(this).val().replace(/[^0-9]/gi,"") );
      
      if(!!telMaxlength){
        var text = $this.val();
        
        if(text.length > telMaxlength){
          $this.val(text.substring(0, telMaxlength));
          e.preventDefault();
        }
      }
    });

    /*
    ** @desc: Input 클릭 시 Placeholder 내용이 사라짐
    */
    $('input, textarea').focusin(function(){
      var input = $(this);
      
      input.data('place-holder-text', input.attr('placeholder'));
      input.attr('placeholder', '');
    });

    /*
    ** @desc: Input 영역 외 클릭 시 Placeholder 내용이 노출 (내용이 비어있는 경우)
    */
    $('input, textarea').focusout(function(){
      var input = $(this);
      input.attr('placeholder', input.data('place-holder-text'));
    });

    /*
    ** @desc: Input 영역에서 엔터키 입력 시 해당 form 이 submit 
    ** @date: 2015.12.24 
    */      
    $("input, textarea").keypress(function(event) {
      if (event.which == 13) {
          $(this).closest("form").submit();
      }
    });

   })(mui, $, undefined);
}catch(e){
  console.log(e);
}finally{
  
}