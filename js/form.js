'use strict';
(function () {

  var select = document.querySelector('select[name="type"]');
  var price = document.querySelector('input[name="price"]');

  var priceByType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var setAttributeForPrice = function (type) {
    price.setAttribute('placeholder', type);
    price.setAttribute('min', type);
  };

  select.addEventListener('change', function () {
    setAttributeForPrice(priceByType[select.value]);
    price.value = '';
  });

  var timeIn = document.querySelector('select[name="timein"]');
  var timeOut = document.querySelector('select[name="timeout"]');

  timeIn.addEventListener('change', function () {
    var timeInSelectedIndex = timeIn.options.selectedIndex;
    timeOut.value = timeOut.options[timeInSelectedIndex].value;
  });

  timeOut.addEventListener('change', function () {
    var timeOutSelectedIndex = timeOut.options.selectedIndex;
    timeIn.value = timeIn.options[timeOutSelectedIndex].value;
  });

})();
