'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  window.filtersForm = {
    filtersSelect: mapFilters.querySelectorAll('select'),
    ads: [],
    updateAds: function () {
      var sameTypeAds = window.filtersForm.ads.filter(function (it) {
        return it.type === housingTypeFilter.value;
      });
      window.render(sameTypeAds);
    }
  };

  var housingTypeFilter = mapFilters.querySelector('select[name="housing-type"]');

  var getTypeChange = function (type) {
    housingTypeFilter.value = type;
    window.filtersForm.updateAds();
  };

  housingTypeFilter.addEventListener('change', function () {
    var housingTypeSelectedIndex = housingTypeFilter.selectedIndex;
    housingTypeFilter.value = housingTypeFilter[housingTypeSelectedIndex];
    var newType = housingTypeFilter.value;
    getTypeChange(newType);
  });

})();
