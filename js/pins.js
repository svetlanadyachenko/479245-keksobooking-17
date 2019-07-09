'use strict';
(function () {

  var similarListElement = document.querySelector('.map__pins');
  var similarAdTemplate = document.querySelector('#pin').content;
  var filtersForm = document.querySelector('.map__filters');
  window.pins = {
    filtersSelect: filtersForm.querySelectorAll('select')
  };
  var housingType = document.querySelector('select[name="housing-type"]');
  var ads = [];

  var renderAd = function (ad) {
    var element = similarAdTemplate.cloneNode(true);
    var adElement = element.querySelector('.map__pin');
    adElement.style.left = ad.location.x - (window.constants.AD_WIDTH / 2) + 'px';
    adElement.style.top = ad.location.y - window.constants.AD_HEIGHT + 'px';
    adElement.querySelector('.map__pin img').src = ad.author.avatar;
    adElement.querySelector('.map__pin img').alt = ad.offer.title;
    return element;
  };

  var getFragment = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderAd(data[i]));
    }
    return fragment;
  };

  var render = function (data) {
    var limitData = data.slice(0, 5);
    similarListElement.appendChild(getFragment(limitData));
  };

  var updateAds = function () {
    var sameTypeAds = ads.filter(function (it) {
      return it.typeOfHouse === housingType;
    });

    var filteredAds = sameTypeAds.concat(ads);
    var uniqueAds = filteredAds.filter(function (it, i) {
      return filteredAds.indexOf(it) === i;
    });

    render(uniqueAds);
  };

  var getTypeChange = function (type) {
    housingType = type;
    updateAds();
  };

  housingType.addEventListener('change', function () {
    var newType = housingType.options.selectedIndex;
    housingType.options.value = newType;
    getTypeChange(newType);
  });

  var loadHandler = function (data) {
    ads = data;
    updateAds();
  };

  var errorPinHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.appendNewAds = function () {
    window.backend.load(loadHandler, errorPinHandler);
  };

})();
