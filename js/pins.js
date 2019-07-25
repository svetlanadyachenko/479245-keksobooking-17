'use strict';
(function () {
  window.pins = {
    mapFilters: document.querySelector('.map__filters'),
    housingType: document.querySelector('select[name="housing-type"]'),
    appendNewAds: function () {
      window.backend.load(loadHandler, errorPinHandler);
    },
    removeChangeListenersInPins: function () {
      window.pins.housingType.removeEventListener('change', function () {
        window.render.closeCard();
        updateAds();
      });
    }
  };

  var ads = [];

  var updateAds = function () {
    var sameTypeAds = ads.filter(function (ad) {
      return window.pins.housingType.value === 'any' || ad.offer.type === window.pins.housingType.value;
    });
    window.render.removePins();
    window.render.renderPins(sameTypeAds);
  };

  window.pins.housingType.addEventListener('change', function () {
    window.render.closeCard();
    updateAds();
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

})();
