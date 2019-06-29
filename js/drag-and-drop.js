'use strict';
(function () {

  window.mainNew.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var activated = false;

    if (!activated) {
      activated = true;
      window.mainNew.getActiveMap();
    }

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinNewXCoords = window.mainNew.mapPinMain.offsetLeft - shift.x;
      var mapPinNewYCoords = window.mainNew.mapPinMain.offsetTop - shift.y;

      if ((mapPinNewXCoords > window.main.X_LAST_COORDINATE - window.main.MAP_PIN_MAIN_WIDTH / 2) ||
            (mapPinNewXCoords < window.main.X_FIRST_COORDINATE - window.main.MAP_PIN_MAIN_WIDTH / 2) ||
            (mapPinNewYCoords > window.main.Y_LAST_COORDINATE - window.main.MAP_PIN_MAIN_HEIGHT) ||
            (mapPinNewYCoords < window.main.Y_FIRST_COORDINATE - window.main.MAP_PIN_MAIN_HEIGHT)) {
        activated = false;
      } else {
        window.mainNew.mapPinMain.style.left = (mapPinNewXCoords) + 'px';
        window.mainNew.mapPinMain.style.top = (mapPinNewYCoords) + 'px';
        window.mainNew.addressInput.value = (mapPinNewXCoords + window.main.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (mapPinNewYCoords + window.main.MAP_PIN_MAIN_HEIGHT);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
