'use strict';
(function () {

  var mapElement = document.querySelector('.map');
  mapElement.classList.add('map--faded');
  var filtersForm = mapElement.querySelector('.map__filters');
  var filtersSelect = filtersForm.querySelectorAll('select');
  window.form.adForm.classList.add('ad-form--disabled');


  var getDisabledElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
    return elements;
  };

  var removeDisabledElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled', 'disabled');
    }
    return elements;
  };

  window.main = {
    mapPinMain: document.querySelector('.map__pin--main'),
    addressInput: document.querySelector('input[name="address"]'),
    resetButton: document.querySelector('.ad-form__reset'),
    getActiveMap: function () {
      mapElement.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      removeDisabledElements(window.form.fieldsetInAdForm);
      removeDisabledElements(filtersSelect);
      window.appendNewAds();
    },
    getDisabledMap: function () {
      mapElement.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');
      getDisabledElements(window.form.fieldsetInAdForm);
      getDisabledElements(filtersSelect);
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];
        pin.remove();
      }
      getMapPinMainPosition();
    }
  };

  var getMapPinMainPosition = function () {
    window.main.mapPinMain.style.left = (window.constants.MAP_PIN_MAIN_X) + 'px';
    window.main.mapPinMain.style.top = (window.constants.MAP_PIN_MAIN_Y) + 'px';
    window.main.addressInput.value = (window.constants.MAP_PIN_MAIN_X + window.constants.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (window.constants.MAP_PIN_MAIN_Y + window.constants.MAP_PIN_MAIN_HEIGHT);
  };

  getMapPinMainPosition();

  getDisabledElements(window.form.fieldsetInAdForm);
  getDisabledElements(filtersSelect);

  // resetButton.addEventListener('click', function () {
  //   if (activated) {
  //     activated = false;
  //   }
  //   getDisabledMap();
  // });
})();
