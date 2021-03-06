/*
** @Domain: Modal
** @Require: jQuery
*/

try{
  mui.modal = (function(mui, $, undefined){
    "use strict";

    var $modal = $('[data-role="modal"]'),
          $modalBackdrop = $('<div class="modal-backdrop"></div>'),
          $btnModalCall = $('[data-toggle="modal"]'),
          $btnModalDestroy = $('[data-rel="back"]'),
          $btnModalClose = $('.modal__close'),
          $btnModalBack = $('[data-history-back]'),
          $el;

    var ref = null,
          tmpPos = 0,
          openMotion = '';

    /*
    ** @method: getVerticalMiddleValue
    ** @desc: 모달 영역이 브라우저 창 높이 기준으로 중앙에 위치하기 위한 값을 리턴
    ** @param: none
    */
    var getVerticalMiddleValue = function(){
      return (mui.common.getWindowHeight() > $('.modal-content', $el).innerHeight() + getCloseButtonHeight())? 
                  -($('.modal-content', $el).innerHeight() / 2 ): 
                  ( ( mui.common.getWindowHeight() / 2 - getCloseButtonHeight() ) - ($(window).innerHeight() * 0.02) ) * -1;
    };

    /*
    ** @method: getHorizontalMiddleValue
    ** @desc: 모달 영역이 브라우저 창 넓이 기준으로 중앙에 위치하기 위한 값을 리턴
    ** @param: none
    */
    var getHorizontalMiddleValue = function(){
      return -($('.modal-content', $el).outerWidth() / 2);
    };

    /*
    ** @method: getCloseButtonHeight
    ** @desc: getVerticalMiddleValue 에서 모달 닫기버튼이 모달영역 밖에 위치 할 경우, 그 높이 값을 리턴
    ** @param: none
    */
    var getCloseButtonHeight = function(){
      var $closeButton = $('.modal__close', $el);
      var height = parseInt( $closeButton.css('top') );    

      if(height < 0)
        return height * -1;
      return 0;
    };

    /*
    ** @method: isSmallWindow
    ** @desc: 모달 영역의 높이 값이 브라우저 창 보다 큰 경우 
    ** (모달 영역이 브라우저 보다 높이값이 크면 모달 영역이 하단에 붙여서 엉성하게 나오는 것에 대한 처리를 하기 위함)
    ** @param: none
    */
    var isSmallWindow = function(){
      return ( mui.common.getWindowHeight() < $('.modal-content', $el).innerHeight() + getCloseButtonHeight() );
    };

    /*
    ** @method: openModal
    ** @desc: 모달 영역 열기
    ** @param: id (id value)
    */
    var openModal = function (id){
      $el = $('#'+id);

      if(typeof ref === "undefined"){
        /*
        ** @desc
        ** 레이어 팝업 1 에서 2로 바로 갈 경우, 1의 History 를 기억해야 함
        ** 현재는 바로 전 단계만 이동하는 프로세스 (3단계 이상 일 경우 추적 X, history 배열 사용 해야 함)
        ** 16.01.04 추가 > ref에 대한 기능을 다시 체크
        */
        $('[data-rel="back"]', $el).attr('data-target', ref);
        /*
        ** @desc: 레이어 팝업 제거 후 false 로 만들기 (버퍼)
        */
        closeModal(ref);
      }

      /*
      ** @desc: 팝업 오픈 시 현재 Y값을 저장, fixed position이 된 viewport에다가 fake로 페이지가 내려 온 것처럼 보이게 함 (페이스북 스타일)
      */

      tmpPos = $(window).scrollTop();
      $('#viewport').css('top', tmpPos * -1);

      if(mui.modal.openMotion === '')
        mui.modal.openMotion = 'modal-scale';

      if($modal.length && $el.length){
        $el.css({
          'visible': 'hidden',
          'display': 'block'
        });
        
        if($el.attr('data-view') == 'full'){
          //$('body').css('overflow','hidden');
          $('.modal-content', $el).css({
            'margin-top': 0,
            'margin-left': 0
          });
        } else {
          $('.modal-content', $el).delay(100).css({
            'margin-top': getVerticalMiddleValue(),
            'margin-left': getHorizontalMiddleValue()
          }).addClass(mui.modal.openMotion);

          /*
          ** @desc: 레이어팝업의 높이가 브라우저 창 보다 클 경우 어색해 보이지 않기 위하여 하단 여백을 상단과 동일하게 줌
          */
          if(isSmallWindow()){
            setTimeout(function(){
              $('.modal-content', $el).css({
                'margin-bottom': $('.modal-content', $el).offset().top
              });
            }, 100);
          }
          $modalBackdrop.height($(document).innerHeight()).show();
        }
        
        $('body').append($modalBackdrop).addClass('modal-open');

        $el.removeAttr('style').fadeIn('fast');
      }
    };

    /*
    ** @method: closeModal
    ** @desc: 모달 영역 닫기
    ** @param: id (id value)
    */
    var closeModal = function(id, destroy){
      var $el = $('#'+id);     
      
      $el.hide();

      $('.modal-content').removeClass(mui.modal.openMotion);
      /*
      @date: 16.01.06
      @anchor: 정명학
      @창 닫을 시 구분없이 모달 창 종류와 관계없이 공통적인 액션을 취함
      if(ref !== 'modal') {
        $('body .modal-backdrop').fadeOut(0, function(){
          $('body').removeClass('modal-open').removeAttr('style');

           $('#viewport').removeAttr('style');
           $(window).scrollTop(tmpPos);

         });
        $(this).remove();
      } else if( ref === 'modal'){

      }

      if($('body').hasClass('modal-open'))
        $('body').removeClass('modal-open').css('overflow', 'auto');
      */

      $('body .modal-backdrop').fadeOut(100, function(){
        $('body').removeClass('modal-open');

        $('#viewport').removeAttr('style');
        $(window).scrollTop(tmpPos);
      });

      //$(this).remove();

      ref = false;
    };


    /*
    ** @event: 모달 오픈
    ** @anchor: 정명학
    */
    $btnModalCall.on('click', function(e){
      var target = $(this).attr('href').replace("#", '');
      e.preventDefault();

      ref = $(this).parents('[data-role="modal"]').attr('id');

      /*
      ** @date: 160106
      ** @bugfix: openModal 함수에서 undefined 다 계속 걸려 closeModal 함수가 실행되어 tmpPos 값 갱신이 되지않아 먼저 null 값으로 type 을 object 로 변경
      */
      if(typeof ref === "undefined")
        ref = null;

      openModal(target);
    });

    /*
    ** @event: 모달 닫기
    ** @anchor: 정명학
    */
    $btnModalDestroy.on('click', function(e){
      var target = $(this).closest($modal).attr('id');
      var refTarget = $(this).attr('data-target');

      e.preventDefault();

      if(typeof refTarget !== "undefined"){
        if(refTarget === "false"){
          closeModal(target);

          return true;
        }

        $(this).closest('[data-role="modal"]').hide();
        $(this).removeAttr('data-target');

        openModal(refTarget);

        return true;
      }

      closeModal(target);
    });

    /*
    ** @event: data-target 이 꼬이는 현상 (X버튼 누르면 )
    ** @date: 2015.08.10
    ** @anchor: 정명학
    */
    $btnModalClose.on('click', function(){
      $('.modal [data-rel="back"]').removeAttr('data-target');
    });

    /*
    ** @event: 레이어 팝업 1 > 레이어 팝업 2 > 레이어 팝업 1
    ** @date: 2015.11.03
    ** @anchor: 정명학
    */
     $btnModalBack.on('click', function(){
      var _this = $(this).attr('href'),
            _target = $(this).attr('data-history-back').replace('#', '');
      var $el = $(_this);

      $(this).closest('[data-role="modal"]').hide();
      $el.find('[data-rel]').attr('data-target', _target);
    });

    /*
    ** @event: 윈도우 창 크기 조절
    ** @desc
    ** 1. 현재 오픈 된 모달 영역이 창 크기가 조절 될 시에도 중앙 위치에 맞춰지게 설정
    ** 2. 브라우저 높이가 문서 높이보다 작은경우 모달 암막높이를 브라우저 높이만큼 조절
    */
    $(window).resize(function(){

      var _windowWidth = mui.common.getWindowWidth(),
            _windowHeight = mui.common.getWindowHeight();

      if($modal.css('display') === "block"){
        $('.modal-content', $el).delay(100).css({
          'margin-top': getVerticalMiddleValue(),
          'margin-left': getHorizontalMiddleValue(),
          'margin-bottom': $('.modal-content', $el).offset().top
        });
      }

      if(_windowHeight < $(document).innerHeight())
        $modalBackdrop.height(_windowHeight);
    });

    return {
      open : openModal,
      close : closeModal,
      openMotion : openMotion
    };

  })(mui, jQuery);
}catch(e){
  console.log(e);
}finally{
  
}