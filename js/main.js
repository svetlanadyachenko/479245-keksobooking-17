'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pin');
var similarAdTemplate = document.querySelector('#pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var LOCATIONS_X = getRandomNumber(0, 1200);
var LOCATIONS_Y = getRandomNumber(130, 630);
var AD_QUANTITY = 8;

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getAdsData = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var tag = {
      author: getRandomElement(AVATARS),
      offer: getRandomElement(TYPES),
      location: 'left' + ':' + ' ' + LOCATIONS_X + 'px, ' + 'top' + ':' + ' ' + LOCATIONS_Y + 'px'
    };
    ads[i] = tag;
  }
  return ads;
};

var ads = getAdsData(AD_QUANTITY);

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('#pin').style = ad.location;
  adElement.querySelector('#pin').picture.src = ad.author;
  adElement.querySelector('#pin').picture.alt = ad.offer;

  return adElement;
};

var getFragment = function (tags) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < tags.length; i++) {
    similarListElement.appendChild(renderAd(tags[i]));
  }
  return fragment;
};

similarListElement.appendChild(getFragment(ads));
