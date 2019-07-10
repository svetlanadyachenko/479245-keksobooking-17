'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  var type = document.querySelector('.type-of-house');
  var housingTypeFilter = mapFilters.querySelector('select[name="housing-type"]');

  window.filtersForm = {
    filtersSelect: mapFilters.querySelectorAll('select'),
    ads: [],
    updateAds: function () {
      var sameTypeAds = window.filtersForm.ads.filter(function (it) {
        return it.ad.offer.type === type;
      });
      window.render(sameTypeAds);
    }
  };

  var getTypeChange = function (typeOfHouse) {
    type = typeOfHouse;
    window.filtersForm.updateAds();
  };

  housingTypeFilter.addEventListener('change', function () {
    var newType = housingTypeFilter;
    getTypeChange(newType);
  });

})();
