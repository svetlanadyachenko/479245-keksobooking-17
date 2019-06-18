'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_QUANTITY = 8;
var AD_WIDTH = 50;

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
        x: getRandomNumber(0, 1200),
        y: getRandomNumber(130, 630)
      }
    };
    ads[i] = ad;
  }
  return ads;
};

var ads = getAdsData(AD_QUANTITY);

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.style.left = ad.location.x + (AD_WIDTH / 2) + 'px';
  adElement.style.top = ad.location.y + 'px';
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
