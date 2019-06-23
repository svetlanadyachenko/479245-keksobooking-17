'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_QUANTITY = 8;
var AD_WIDTH = 50;
var AD_HEIGHT = 70;
var X_FIRST_COORDINATE = 0;
var X_LAST_COORDINATE = 1200;
var Y_FIRST_COORDINATE = 130;
var Y_LAST_COORDINATE = 630;

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
      offer: getRandomElement(TYPES),
      location: {
        x: getRandomNumber(X_FIRST_COORDINATE, X_LAST_COORDINATE),
        y: getRandomNumber(Y_FIRST_COORDINATE, Y_LAST_COORDINATE)
      }
    };
    ads[i] = ad;
  }
  return ads;
};

var ads = getAdsData(AD_QUANTITY);

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.style.left = ad.location.x - (AD_WIDTH / 2) + 'px';
  adElement.style.top = ad.location.y - AD_HEIGHT + 'px';
  adElement.querySelector('.map__pin img').src = ad.author;
  adElement.querySelector('.map__pin img').alt = ad.offer;
  adElement.setAttribute('class', 'map__pin pin');

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
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
var fieldsetInAdForm = adForm.querySelectorAll('fieldset');
var filtersForm = mapElement.querySelector('.map__filters');
var filtersSelect = filtersForm.querySelectorAll('select');
var resetButton = document.querySelector('.ad-form__reset');
var mapPinMainXPosition = 570;
var mapPinMainYPosition = 375;
var addressInput = adForm.querySelector('input[name="address"]');

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

getDisabledElements(fieldsetInAdForm);
getDisabledElements(filtersSelect);


var getActiveMap = function () {
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeDisabledElements(fieldsetInAdForm);
  removeDisabledElements(filtersSelect);
  similarListElement.appendChild(getFragment(ads));
};

var getDisabledMap = function () {
  mapElement.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  getDisabledElements(fieldsetInAdForm);
  getDisabledElements(filtersSelect);
  var pins = document.querySelectorAll('.pin');
  for (var i = pins.length - 1; i >= 0; i--) {
    var pin = pins[i];
    pin.parentElement.removeChild(pin);
  }
};

var mapPinMainPosition = mapPinMainXPosition + ', ' + mapPinMainYPosition;

mapPinMain.addEventListener('click', function () {
  getActiveMap();
  addressInput.value = mapPinMainPosition;
});

resetButton.addEventListener('click', function () {
  getDisabledMap();
});
