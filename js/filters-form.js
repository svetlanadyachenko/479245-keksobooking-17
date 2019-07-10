'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  window.filtersForm = {
    filtersSelect: mapFilters.querySelectorAll('select'),
    ads: [],
    updateAds: function () {
      var sameTypeAds = window.filtersForm.ads.filter(function (it) {
        return it.typeOfHouse === housingTypeFilter.value;
      });
      window.render(sameTypeAds);
    }
  };

  var housingTypeFilter = mapFilters.querySelector('select[name="housing-type"]');

  var getTypeChange = function (typeOfHouse) {
    housingTypeFilter.value = typeOfHouse;
    window.filtersForm.updateAds();
  };

  housingTypeFilter.addEventListener('change', function () {
    // housingTypeFilter.value = housingTypeFilter[housingTypeFilter.selectedIndex];
    var newType = housingTypeFilter.selected.value;
    getTypeChange(newType);
  });

})();
