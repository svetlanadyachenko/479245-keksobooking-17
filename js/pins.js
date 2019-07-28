'use strict';
(function () {
  window.pins = {
    mapFilters: document.querySelector('.map__filters'),
    appendNewAds: function () {
      window.backend.load(loadHandler, errorPinHandler);
    },
    removeEventListenersInPins: function () {
      window.pins.mapFilters.removeEventListener('change', onFilterChange);
    }
  };

  var ads = [];

  var updateAds = function () {
    var nodesFilters = window.pins.mapFilters.querySelectorAll('.map__filters option:checked:not([value="any"]), .map__filters input:checked');

    var getFilterParams = function (nodes) {
      var nodesArray = [].slice.call(nodes);
      var getParams = function (node) {
        return {
          name: node.checked ? node.value : node.parentNode.name,
          value: node.checked || node.value
        };
      };
      return nodesArray.map(getParams);
    };

    var filterParams = getFilterParams(nodesFilters);

    var filteredPins = ads.filter(function (ad) {
      var getFeature = function (features, feature) {
        return Object.assign({}, features, {[feature] : true});
      };
      var housingFeatures = ad.offer.features.reduce(getFeature, {});
      var getPrice = function (price) {
        switch (true) {
          case price < 10000:
            return 'low';
          case price > 50000:
            return 'high';
          default:
            return 'middle';
        }
      };
      var housingParams = {
        'housing-type': ad.offer.type,
        'housing-price': getPrice(ad.offer.price),
        'housing-rooms': '' + ad.offer.rooms,
        'housing-guests': '' + ad.offer.guests
      };
      var assignedParams = Object.assign({}, housingParams, housingFeatures);
      return filterParams.every(function (param) {
        return assignedParams[param.name] === param.value;
      });
    });

    window.render.removePins();
    window.render.renderPins(filteredPins);
  };

  var onFilterChange = function () {
    window.render.closeCard();
    updateAds();
  };

  window.pins.mapFilters.addEventListener('change', onFilterChange);

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
