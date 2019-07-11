'use strict';
(function () {

  var similarAdTemplate = document.querySelector('#pin').content;
  var similarListElement = document.querySelector('.map__pins');

  var renderAd = function (ad) {
    var adElement = similarAdTemplate.cloneNode(true);

    adElement.querySelector('.map__pin').style.left = ad.location.x - (window.constants.AD_WIDTH / 2) + 'px';
    adElement.querySelector('.map__pin').style.top = ad.location.y - window.constants.AD_HEIGHT + 'px';
    adElement.querySelector('.map__pin img').src = ad.author.avatar;
    adElement.querySelector('.map__pin img').alt = ad.offer.title;

    return adElement;
  };

  var getFragment = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderAd(data[i]));
    }
    return fragment;
  };

  window.render = function (data) {
    var limitData = (data.slice(0, 5));
    similarListElement.appendChild(getFragment(limitData));
  };

})();
