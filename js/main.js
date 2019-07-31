'use strict';
(function () {

  window.render.map.classList.add('map--faded');

  window.main = {
    activated: false,
    mapPinMain: document.querySelector('.map__pin--main'),
    getDisabledElements: function (elements) {
      elements.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
      });
    },
    removeDisabledElements: function (elements) {
      elements.forEach(function (it) {
        it.removeAttribute('disabled');
      });
    },
    getActiveMap: function () {
      window.main.mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
      window.render.map.classList.remove('map--faded');
      window.pins.appendNewAds();
      window.form.formAd.classList.remove('ad-form--disabled');
      window.main.removeDisabledElements(window.form.fieldsetsInAdForm);
      window.form.addEventListenersOnForm();
      window.pins.addEventListenersOnFilters();
      window.main.activated = true;
    },
    getDisabledMap: function () {
      window.main.mapPinMain.addEventListener('keydown', onMainPinEnterPress);
      window.render.map.classList.add('map--faded');
      window.render.removePins();
      getMapPinMainPosition();
      window.resetPhoto();
      window.form.formAd.classList.add('ad-form--disabled');
      window.main.getDisabledElements(window.form.fieldsetsInAdForm);
      window.main.getDisabledElements(window.pins.filters);
      window.form.removeEventListenersOnForm();
      window.pins.removeEventListenerOnFilters();
      window.main.activated = false;
    },
    getClearPage: function () {
      window.form.formAd.reset();
      window.pins.mapFilters.reset();
      window.render.closeCard();
      window.main.getDisabledMap();
    }
  };

  var getMapPinMainPosition = function () {
    window.main.mapPinMain.style.left = (window.constants.MAP_PIN_MAIN_X) + 'px';
    window.main.mapPinMain.style.top = (window.constants.MAP_PIN_MAIN_Y) + 'px';
    window.form.addressInput.value = (window.constants.MAP_PIN_MAIN_X + window.constants.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (window.constants.MAP_PIN_MAIN_Y + window.constants.MAP_PIN_MAIN_HEIGHT);
  };

  getMapPinMainPosition();

  window.main.getDisabledElements(window.form.fieldsetsInAdForm);
  window.main.getDisabledElements(window.pins.filters);

  var onMainPinEnterPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      window.main.getActiveMap();
    }
  };

  window.main.mapPinMain.addEventListener('keydown', onMainPinEnterPress);

})();
