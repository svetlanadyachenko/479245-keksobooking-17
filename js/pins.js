'use strict';
(function () {
  window.pins = {
    mapFilters: document.querySelector('.map__filters'),
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

  var housingType = document.querySelector('select[name="housing-type"]');
  // var housingPrice = document.querySelector('select[name="housing-price"]');
  var housingRooms = document.querySelector('select[name="housing-rooms"]');
  // var housingGuests =  document.querySelector('select[name="housing-guests"]');
  // var housingFeatures =  document.querySelector('select[name="housing-features"]');

  var ads = [];

  var updateAds = function () {
    var sameTypeAds = ads.filter(function (ad) {
      return housingType.value === 'any' || ad.offer.type === housingType.value;
    });
    window.render.removePins();
    window.render.renderPins(sameTypeAds);
  };

  var updateRoomsAds = function () {
    var sameRoomsAds = ads.filter(function (ad) {
      return housingRooms.value === 'any' || ad.offer.type === housingRooms.value;
    });
    window.render.removePins();
    window.render.renderPins(sameRoomsAds);
  };

  housingType.addEventListener('change', function () {
    window.render.closeCard();
    updateAds();
  });

  housingRooms.addEventListener('change', function () {
    window.render.closeCard();
    updateRoomsAds();
  });

  var loadHandler = function (data) {
    ads = data;
    updateAds();
    updateRoomsAds();
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
