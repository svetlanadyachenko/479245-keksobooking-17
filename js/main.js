'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_QUANTITY = 8;
var AD_WIDTH = 50;
var AD_HEIGHT = 70;
var X_FIRST_COORDINATE = 0;
var X_LAST_COORDINATE = 1200;
var Y_FIRST_COORDINATE = 130;
var Y_LAST_COORDINATE = 630;

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

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
  adElement.style.top = ad.location.y - (AD_HEIGHT / 2) + 'px';
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

similarListElement.appendChild(getFragment(ads));
