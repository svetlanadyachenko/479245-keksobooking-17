'use strict';
(function () {

  window.form = {
    adForm: document.querySelector('.ad-form'),
    fieldsetInAdForm: document.querySelectorAll('fieldset'),
    addressInput: document.querySelector('input[name="address"]')
  };

  window.form.adForm.classList.add('ad-form--disabled');

  var select = document.querySelector('select[name="type"]');
  var price = document.querySelector('input[name="price"]');

  var setAttributeForPrice = function (type) {
    price.setAttribute('placeholder', type);
    price.setAttribute('min', type);
  };

  select.addEventListener('change', function () {
    setAttributeForPrice(window.constants.PRICE_BY_TYPE[select.value]);
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

  var saveHandler = function () {
    window.main.getDisabledMap();
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var errorHandler = function () {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = error.querySelector('.error__button');
    var closeErrorMessage = function () {
      error.remove();
      document.removeEventListener('keydown', onErrorMessageEscPress);
    };
    var onErrorMessageEscPress = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeErrorMessage();
      }
    };
    errorButton.addEventListener('click', function () {
      closeErrorMessage();
    });
    error.addEventListener('click', function () {
      closeErrorMessage();
    });
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  window.form.adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.form.adForm), saveHandler, errorHandler);
    evt.preventDefault();
  });

})();
