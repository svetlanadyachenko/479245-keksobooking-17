'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var similarAdTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_QUANTITY = 8;

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getAdsData = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    // var LOCATIONS_X = getRandomNumber(0, 1200);
    // var LOCATIONS_Y = getRandomNumber(130, 630);
    var tag = {
      author: getRandomElement(AVATARS),
      offer: getRandomElement(TYPES),
      location: {
        left: getRandomNumber(0, 1200) + 'px' + ';',
        top: getRandomNumber(130, 630) + 'px' + ';'
      }
    };
    ads[i] = tag;
  }
  return ads;
};

var ads = getAdsData(AD_QUANTITY);

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('.map__pin').style.left = ad.location.left;
  adElement.querySelector('.map__pin').style.top = ad.location.top;
  adElement.querySelector('.map__pin').picture.src = ad.author;
  adElement.querySelector('.map__pin').picture.alt = ad.offer;


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
