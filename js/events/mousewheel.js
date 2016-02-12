;
(function(window) {
  function MouseWheel(selector, directionUpFunc, directionDownFunc) {
    var self = this;


    // Mozilla 계열 브라우저에서 DOMMouseScroll 에 대한 이벤트 추가
    if (window.addEventListener){
      selector.addEventListener('DOMMouseScroll', function(ev) {
        self.eventCallback(ev, self);
      }, false);
    }

    selector.onmousewheel = function(ev) {
      self.eventCallback(ev, self);
    }
    this.isUpFunction = directionUpFunc;
    this.isDownFunction = directionDownFunc;
  };

  /*
   * @method: eventCallback
   * @param: event, constructor
   * @desc: 스크롤 이벤트 추가 후 콜백함수 실행
   */
  MouseWheel.prototype.eventCallback = function(ev, self) {
    ev.preventDefault();
    ev.stopPropagation();

    var delta = 0;

    if( !ev ) { ev = window.event; }
    if( ev.wheelDelta ){  //  Internet Explorer & Opera
      delta = ev.wheelDelta / 60;
    } else if( ev.detail ){ // W3C Standards
      delta = -ev.detail / 2;
    }

    if(self.getDirection(delta) > 0){
      this.isUpFunction();
    }else{
      this.isDownFunction();
    }
  };

  /*
   * @method: eventCallback
   * @param: delta
   * @desc: 스크롤 방향값 반환 (위, 아래)
   */
  MouseWheel.prototype.getDirection = function(delta){
    if(delta > 0){
      return 1;
    } else {
      return -1;
    }
  }
  
  window.MouseWheel = MouseWheel;
})(window);
