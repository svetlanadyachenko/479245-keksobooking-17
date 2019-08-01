'use strict';
(function () {

  window.render.map.classList.add('map--faded');

  window.main = {
    activated: false,
    mapPin: document.querySelector('.map__pin--main'),
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
      window.main.mapPin.removeEventListener('keydown', onMainPinEnterPress);
      window.render.map.classList.remove('map--faded');
      window.pins.appendNewAds();
      window.form.newAd.classList.remove('ad-form--disabled');
      window.main.removeDisabledElements(window.form.fieldsets);
      window.form.addEventListenersOnSelects();
      window.pins.addEventListenersOnFilters();
      window.main.activated = true;
    },
    getDisabledMap: function () {
      window.main.mapPin.addEventListener('keydown', onMainPinEnterPress);
      window.render.map.classList.add('map--faded');
      window.render.removePins();
      getMapPinPosition();
      window.resetPhoto();
      window.form.newAd.classList.add('ad-form--disabled');
      window.main.getDisabledElements(window.form.fieldsets);
      window.main.getDisabledElements(window.pins.filters);
      window.form.removeEventListenersOnSelects();
      window.pins.removeEventListenerOnFilters();
      window.main.activated = false;
    },
    getClearPage: function () {
      window.form.newAd.reset();
      window.pins.mapFilters.reset();
      window.render.closeCard();
      window.main.getDisabledMap();
    }
  };

  var getMapPinPosition = function () {
    window.main.mapPin.style.left = (window.constants.MAP_PIN_MAIN_X) + 'px';
    window.main.mapPin.style.top = (window.constants.MAP_PIN_MAIN_Y) + 'px';
    window.form.addressInput.value = (window.constants.MAP_PIN_MAIN_X + window.constants.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (window.constants.MAP_PIN_MAIN_Y + window.constants.MAP_PIN_MAIN_HEIGHT);
  };

  getMapPinPosition();

  window.main.getDisabledElements(window.form.fieldsets);
  window.main.getDisabledElements(window.pins.filters);

  var onMainPinEnterPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      window.main.getActiveMap();
    }
  };

  window.main.mapPin.addEventListener('keydown', onMainPinEnterPress);

})();
