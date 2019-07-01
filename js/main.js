'use strict';

var similarListElement = document.querySelector('.map__pins');
var similarAdTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomElement = function (array) {
  return array[(getRandomNumber() * array.length)];
};

var getAdsData = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {
      author: 'img/avatars/user0' + (i + 1) + '.png',
      offer: getRandomElement(window.constants.TYPES),
      location: {
        x: getRandomNumber(window.constants.X_FIRST_COORDINATE, window.constants.X_LAST_COORDINATE),
        y: getRandomNumber(window.constants.Y_FIRST_COORDINATE, window.constants.Y_LAST_COORDINATE)
      }
    };
    ads[i] = ad;
  }
  return ads;
};

var ads = getAdsData(window.constants.AD_QUANTITY);

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.style.left = ad.location.x - (window.constants.AD_WIDTH / 2) + 'px';
  adElement.style.top = ad.location.y - window.constants.AD_HEIGHT + 'px';
  adElement.querySelector('.map__pin img').src = ad.author;
  adElement.querySelector('.map__pin img').alt = ad.offer;

  return adElement;
};

var getFragment = function (data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderAd(data[i]));
  }
  return fragment;
};

var mapElement = document.querySelector('.map');
mapElement.classList.add('map--faded');
var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
var fieldsetInAdForm = adForm.querySelectorAll('fieldset');
var filtersForm = mapElement.querySelector('.map__filters');
var filtersSelect = filtersForm.querySelectorAll('select');
var resetButton = document.querySelector('.ad-form__reset');

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
  getActiveMap: function () {
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisabledElements(fieldsetInAdForm);
    removeDisabledElements(filtersSelect);
    similarListElement.appendChild(getFragment(ads));
  }
};

var getMapPinMainPosition = function () {
  window.main.mapPinMain.style.left = (window.constants.MAP_PIN_MAIN_X) + 'px';
  window.main.mapPinMain.style.top = (window.constants.MAP_PIN_MAIN_Y) + 'px';
  window.main.addressInput.value = (window.constants.MAP_PIN_MAIN_X + window.constants.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (window.constants.MAP_PIN_MAIN_Y + window.constants.MAP_PIN_MAIN_HEIGHT);
};

getMapPinMainPosition();

getDisabledElements(fieldsetInAdForm);
getDisabledElements(filtersSelect);

var getDisabledMap = function () {
  mapElement.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  getDisabledElements(fieldsetInAdForm);
  getDisabledElements(filtersSelect);
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];
    pin.remove();
  }
  getMapPinMainPosition();
};

resetButton.addEventListener('click', function () {
  getDisabledMap();
});
