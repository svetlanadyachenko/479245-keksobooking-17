'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_QUANTITY = 8;
var AD_WIDTH = 50;
var AD_HEIGHT = 70;
var X_FIRST_COORDINATE = 0;
var X_LAST_COORDINATE = 1200;
var Y_FIRST_COORDINATE = 130;
var Y_LAST_COORDINATE = 630;
var MAP_PIN_MAIN_X_POSITION = 570;
var MAP_PIN_MAIN_Y_POSITION = 375;

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

var mapPinMainPosition = MAP_PIN_MAIN_X_POSITION + ', ' + MAP_PIN_MAIN_Y_POSITION;
addressInput.value = mapPinMainPosition;

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
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];
    pin.remove();
  }
};

mapPinMain.addEventListener('click', function () {
  getActiveMap();
});

resetButton.addEventListener('click', function () {
  getDisabledMap();
});

var price = document.querySelector('input[name="price"]');

var options = document.querySelectorAll('select[name="type"] option');
for (var i = 0; i < options.length; i++) {
  options[i].addEventListener('change', function () {
    if (options[i].value === 'bungalo') {
      price.setAttribute('min', '0');
      price.placeholder = 0;
    } else
    if (options[i].value === 'flat') {
      price.setAttribute('min', '1000');
      price.placeholder = 1000;
    } else
    if (options[i].value === 'house') {
      price.setAttribute('min', '5000');
      price.placeholder = 5000;
    } else
    if (options[i].value === 'palace') {
      price.setAttribute('min', '10000');
      price.placeholder = 10000;
    }
  });
}
// var typeOfSelect = {
//   bungalo: 0,
//   flat: 1000,
//   house: 5000,
//   palace: 10000
// };
//
// var getMinPriceByType = function (select) {
//   var selectedOption = select.options[select.selectedIndex];
//
// };
// getMinPriceByType();
// var typeOfSelect = document.querySelector('select[name="type"]').value;
// typeOfSelect.addEventListener('change', function () {
// });


// type.onchange = getMinPriceByType();

// var getMinPrice = function (data) {
//   for (var i = 0; i < data.length; i++) {
//     var type = data[i];
//     if (type === 'bungalo') {
//       price.setAttribute('min', '0');
//       price.placeholder = 0;
//     } else if (type === 'flat') {
//       price.setAttribute('min', '1000');
//       price.placeholder = 1000;
//     } else if (type === 'house') {
//       price.setAttribute('min', '5000');
//       price.placeholder = 5000;
//     } else if (type === 'palace') {
//       price.setAttribute('min', '10000');
//       price.placeholder = 10000;
//     }
//   }
// };
// getMinPrice(TYPES);
