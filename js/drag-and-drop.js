'use strict';
(function () {

  window.main.mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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

      var mapPinNewXCoords = window.main.mapPin.offsetLeft - shift.x;
      var mapPinNewYCoords = window.main.mapPin.offsetTop - shift.y;

      if ((mapPinNewXCoords > window.constants.X_LAST_COORDINATE - window.constants.MAP_PIN_MAIN_WIDTH / 2) ||
            (mapPinNewXCoords < window.constants.X_FIRST_COORDINATE - window.constants.MAP_PIN_MAIN_WIDTH / 2) ||
            (mapPinNewYCoords > window.constants.Y_LAST_COORDINATE - window.constants.MAP_PIN_MAIN_HEIGHT) ||
            (mapPinNewYCoords < window.constants.Y_FIRST_COORDINATE - window.constants.MAP_PIN_MAIN_HEIGHT)) {
        return;
      }

      window.main.mapPin.style.left = (mapPinNewXCoords) + 'px';
      window.main.mapPin.style.top = (mapPinNewYCoords) + 'px';
      window.form.addressInput.value = (mapPinNewXCoords + window.constants.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (mapPinNewYCoords + window.constants.MAP_PIN_MAIN_HEIGHT);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!window.main.activated) {
        window.main.getActiveMap();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
