'use strict';
(function () {

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      window.getActiveMap();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';
      window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      window.addressInput.value = ((window.mapPinMain.offsetLeft - shift.x) - window.MAP_PIN_MAIN_WIDTH / 2) + ', ' + ((window.mapPinMain.offsetTop - shift.y) - window.MAP_PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (draggedEvt) {
          draggedEvt.preventDefault();
          window.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
