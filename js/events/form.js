/** @namespace  Events/form */
try {
  (function(mui, $, undefined) {
    "use strict";

    /**
     * @memberOf Events/form
     * @event label click
     * @description 
     * - 해당 label 태그에 checked 클래스를 Toggle <br/>
     * - 체크박스 인 경우 for 가 향하는 체크박스에 checked 속성을 True <br/>
     * - 라디오 버튼 인 경우 for 가 향하는 라디오 버튼에 checked 속성을 True
     * 
     * @example 
     * // 체크박스
     * <label for='checkbox'>
     *   <i></i>
     * </label>
     * <input type="checkbox" id="checkbox" class="is-custom"/>
     * 
     * @example 
     * // 라디오 버튼
     * <label for='radio'>
     *   <i></i>
     * </label>
     * <input type="radio" id="radio" name="radio" class="is-custom"/>
     */
    $(document).on('click', 'label', function(e) {
      if ($(this).attr("for") !== "") {
        var
          target = $('#' + $(this).attr("for"));

        e.preventDefault();

        if (target.attr('type') === "checkbox" && target.hasClass('is-custom')) {
          var
            isChecked = target.is(':checked'),
            isDisabled = target.attr('disabled');

          if (isChecked === false)
            target.prop('checked', true);
          else
            target.prop('checked', false);

          $(this).toggleClass('checked');

        } else if (target.attr('type') === "radio" && target.hasClass('is-custom')) {
          var
            radioName = target.attr('name'),
            radioValue = target.val();

          $('[name="' + radioName + '"] ~ label').removeClass('checked');
          $('input:radio[name="' + radioName + '"][value="' + radioValue + '"]').prop('checked', true);

          $(this).toggleClass('checked');
        }
      }
    });

    /**
     * @memberOf Events/form
     * @event input[data-input="tel"] keypress
     * @description 
     * - 키보드로 숫자만 입력
     * 
     * @example 
     * <input type="text" data-input="tel"/>
     */
    var $target = $('input[data-input="tel"]');
    $target.keypress(function(e) {
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    });
    $target.keyup(function(e) {
      var telMaxlength = 11;
      var $this = $(this);

      $(this).val($(this).val().replace(/[^0-9]/gi, ""));

      if (!!telMaxlength) {
        var text = $this.val();

        if (text.length > telMaxlength) {
          $this.val(text.substring(0, telMaxlength));
          e.preventDefault();
        }
      }
    });

    /**
     * @memberOf Events/form
     * @event input focusin
     * @description 
     * - Input 클릭 시 Placeholder 내용이 사라짐
     */
    $('input').focusin(function() {
      var input = $(this);

      input.data('place-holder-text', input.attr('placeholder'));
      input.attr('placeholder', '');
    });

    /**
     * @memberOf Events/form
     * @event input focusout
     * @description 
     * - Input 클릭 시 Placeholder 내용이 사라짐
     */
    $('input').focusout(function() {
      var input = $(this);
      input.attr('placeholder', input.data('place-holder-text'));
    });

    /**
     * @memberOf Events/form
     * @event input keypress
     * @description 
     * - Enter 키 입력 시 해당 폼이 Submit
     */
    $("input").keypress(function(event) {
      if (event.which == 13) {
        $(this).closest("form").submit();
      }
    });

  })(mui, $, undefined);
} catch (e) {
  console.log(e);
} finally {

}
