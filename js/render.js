'use strict';
(function () {

  var similarAdTemplate = document.querySelector('#pin').content;
  var similarListElement = document.querySelector('.map__pins');

  var renderAd = function (ad) {
    var element = similarAdTemplate.cloneNode(true);
    var adElement = element.querySelector('.map__pin');
    var card = document.createElement('div');
    card.classList.add('type-of-house');
    adElement.appendChild(card);

    adElement.style.left = ad.location.x - (window.constants.AD_WIDTH / 2) + 'px';
    adElement.style.top = ad.location.y - window.constants.AD_HEIGHT + 'px';
    adElement.querySelector('.map__pin img').src = ad.author.avatar;
    adElement.querySelector('.map__pin img').alt = ad.offer.title;
    adElement.querySelector('.type-of-house').textContent = ad.offer.type;

    return element;
  };

  var getFragment = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderAd(data[i]));
    }
    return fragment;
  };

  window.render = function (data) {
    var limitData = data.slice(0, 5);
    similarListElement.appendChild(getFragment(limitData));
  };

})();
