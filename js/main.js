'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_QUANTITY = 8;
var AD_WIDTH = 50;
var AD_HEIGHT = 70;
window.X_FIRST_COORDINATE = 100;
window.X_LAST_COORDINATE = 1200;
window.Y_FIRST_COORDINATE = 130;
window.Y_LAST_COORDINATE = 630;
var MAP_PIN_MAIN_X = 570;
var MAP_PIN_MAIN_Y = 375;
window.MAP_PIN_MAIN_WIDTH = 65;
window.MAP_PIN_MAIN_HEIGHT = 65;

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
        x: getRandomNumber(window.X_FIRST_COORDINATE, window.X_LAST_COORDINATE),
        y: getRandomNumber(window.Y_FIRST_COORDINATE, window.Y_LAST_COORDINATE)
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
window.mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
var fieldsetInAdForm = adForm.querySelectorAll('fieldset');
window.addressInput = adForm.querySelector('input[name="address"]');
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

var getMapPinMainPosition = function () {
  window.mapPinMain.style.left = (MAP_PIN_MAIN_X) + 'px';
  window.mapPinMain.style.top = (MAP_PIN_MAIN_Y) + 'px';
  window.addressInput.value = (MAP_PIN_MAIN_X - window.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (MAP_PIN_MAIN_Y - window.MAP_PIN_MAIN_HEIGHT);
};

getMapPinMainPosition();

getDisabledElements(fieldsetInAdForm);
getDisabledElements(filtersSelect);

window.getActiveMap = function () {
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

var select = document.querySelector('select[name="type"]');
var price = document.querySelector('input[name="price"]');

var priceByType = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var setAttributeForPrice = function (type) {
  price.setAttribute('min', type);
  price.setAttribute('placeholder', type);
};

select.addEventListener('change', function () {
  setAttributeForPrice(priceByType[select.value]);
});

var timeIn = document.querySelector('select[name="timein"]');
var timeOut = document.querySelector('select[name="timeout"]');

timeIn.addEventListener('change', function () {
  var timeInSelectedIndex = document.querySelector('select[name="timein"]').options.selectedIndex;
  timeOut.value = timeOut.options[timeInSelectedIndex].value;
});


timeOut.addEventListener('change', function () {
  var timeOutSelectedIndex = document.querySelector('select[name="timeout"]').options.selectedIndex;
  timeIn.value = timeIn.options[timeOutSelectedIndex].value;
});
