'use strict';
(function () {

  var resetButton = document.querySelector('.ad-form__reset');
  window.render.mapElement.classList.add('map--faded');

  window.main = {
    activated: false,

    mapPinMain: document.querySelector('.map__pin--main'),

    getDisabledElements: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'disabled');
      }
      return elements;
    },

    removeDisabledElements: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled');
      }
      return elements;
    },

    getActiveMap: function () {
      window.render.mapElement.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.main.removeDisabledElements(window.form.fieldsetInAdForm);
      window.main.removeDisabledElements(window.pins.mapFilters);
      window.pins.appendNewAds();
      window.main.activated = true;
    },

    getDisabledMap: function () {
      window.render.mapElement.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');
      window.main.getDisabledElements(window.form.fieldsetInAdForm);
      window.main.getDisabledElements(window.pins.mapFilters);
      window.render.removePins();
      getMapPinMainPosition();
      window.main.activated = false;
    }
  };

  var getMapPinMainPosition = function () {
    window.main.mapPinMain.style.left = (window.constants.MAP_PIN_MAIN_X) + 'px';
    window.main.mapPinMain.style.top = (window.constants.MAP_PIN_MAIN_Y) + 'px';
    window.form.addressInput.value = (window.constants.MAP_PIN_MAIN_X + window.constants.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (window.constants.MAP_PIN_MAIN_Y + window.constants.MAP_PIN_MAIN_HEIGHT);
  };

  getMapPinMainPosition();

  window.main.getDisabledElements(window.form.fieldsetInAdForm);
  window.main.getDisabledElements(window.pins.mapFilters);

  resetButton.addEventListener('click', function () {
    window.form.adForm.reset();
    window.pins.mapFilters.reset();
    window.render.removeCard();
    window.main.getDisabledMap();
  });

})();
