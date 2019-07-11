'use strict';
(function () {
  window.mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('select[name="housing-type"]');
  var ads = [];

  // var getRemovePins = function (data) {
  //   for (var i = 0; i < data.length; i++) {
  //     var pin = data[i];
  //     pin.remove();
  //   }
  // };

  var updateAds = function () {
    var sameTypeAds = ads.filter(function (ad) {
      if (housingType.value === 'any') {
        return ads;
      }
      return ad.offer.type === housingType.value;
    });
    window.render(sameTypeAds);
  };

  var getTypeChange = function (typeOfHouse) {
    housingType = typeOfHouse;
    updateAds();
  };

  housingType.addEventListener('change', function () {
    var index = housingType.selectedIndex;
    var newType = housingType[index];
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
