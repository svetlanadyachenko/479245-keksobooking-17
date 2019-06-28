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
      if ((startCoords.x > window.X_LAST_COORDINATE) ||
          (startCoords.x < window.X_FIRST_COORDINATE) ||
          (startCoords.y > window.Y_LAST_COORDINATE) ||
          (startCoords.y < window.Y_FIRST_COORDINATE)) {
        dragged = false;
      } else {
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

        var mapPinLastXCoords = window.mapPinMain.offsetLeft - shift.x;
        var mapPinLastYCoords = window.mapPinMain.offsetTop - shift.y;
        window.mapPinMain.style.left = (mapPinLastXCoords) + 'px';
        window.mapPinMain.style.top = (mapPinLastYCoords) + 'px';
        window.addressInput.value = (mapPinLastXCoords - window.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (mapPinLastYCoords - window.MAP_PIN_MAIN_HEIGHT);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        window.getActiveMap();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
