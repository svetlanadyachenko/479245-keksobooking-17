'use strict';
(function () {

  window.form = {
    adForm: document.querySelector('.ad-form'),
    fieldsetInAdForm: document.querySelectorAll('fieldset'),
    addressInput: document.querySelector('input[name="address"]')
  };

  window.form.adForm.classList.add('ad-form--disabled');

  var typeSelect = document.querySelector('select[name="type"]');
  var price = document.querySelector('input[name="price"]');

  var setAttributeForPrice = function (type) {
    price.setAttribute('placeholder', type);
    price.setAttribute('min', type);
  };

  typeSelect.addEventListener('change', function () {
    setAttributeForPrice(window.constants.PRICE_BY_TYPE[typeSelect.value]);
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

  var rooms = document.querySelector('select[name="rooms"]');
  var capacity = document.querySelector('select[name="capacity"]');

  var validateCapacity = function (evt) {
    var selectedIndex = evt.target.selectedIndex;
    var allowed = window.constants.CAPACITY_BY_ROOMS[rooms.value].allowed;
    var valid = allowed.includes(selectedIndex);
    var validity = valid ? '' : 'Выбранное количество гостей не подходит. Выберите другой вариант.';
    capacity.setCustomValidity(validity);
    capacity.reportValidity();
  };

  capacity.addEventListener('change', validateCapacity);

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var saveHandler = function () {
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var closeSuccessMessage = function () {
      success.remove();
      document.removeEventListener('keydown', onSuccessMessageEscPress);
    };
    var onSuccessMessageEscPress = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeSuccessMessage();
      }
    };
    success.addEventListener('click', function () {
      closeSuccessMessage();
    });
    document.addEventListener('keydown', onSuccessMessageEscPress);

    window.form.adForm.reset();
    window.pins.mapFilters.reset();
    window.render.closeCard();
    window.main.getDisabledMap();
  };

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
