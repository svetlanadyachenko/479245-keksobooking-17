'use strict';
(function () {

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

  window.appendNewAds = function () {
    similarListElement.appendChild(getFragment(ads));
  };

})();
